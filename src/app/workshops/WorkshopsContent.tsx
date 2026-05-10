"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { workshops, type Workshop } from "@/lib/mock-data";
import { cn, formatDistance } from "@/lib/utils";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  Check,
  BadgeCheck,
  Truck,
  Home,
  Zap,
  X,
} from "lucide-react";

// ---- Constants ----

const SERVICE_TYPES = [
  "Periodic Service",
  "AC Repair",
  "Denting & Painting",
  "Electrical",
  "Tyres",
  "Brakes",
  "Car Wash",
  "EV Service",
] as const;

const CAR_BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Honda",
  "Toyota",
  "Kia",
  "Tata",
  "BMW",
  "Mercedes",
  "Audi",
] as const;

const PRICE_RANGES = ["budget", "mid-range", "premium"] as const;

const FEATURES = [
  { key: "pickupDrop", label: "Pickup & Drop", icon: Truck },
  { key: "doorstepService", label: "Doorstep Service", icon: Home },
  { key: "evReady", label: "EV Ready", icon: Zap },
  { key: "verified", label: "Verified", icon: BadgeCheck },
] as const;

const SORT_OPTIONS = [
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Rating" },
  { value: "price-low", label: "Price Low-High" },
  { value: "reviews", label: "Reviews Count" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

// ---- Filter State ----

interface FilterState {
  search: string;
  serviceTypes: string[];
  carBrands: string[];
  maxDistance: number;
  minRating: number;
  priceRanges: string[];
  features: string[];
  sort: SortOption;
}

const defaultFilters: FilterState = {
  search: "",
  serviceTypes: [],
  carBrands: [],
  maxDistance: 50,
  minRating: 0,
  priceRanges: [],
  features: [],
  sort: "distance",
};

// ---- Skeleton Components ----

function CardSkeleton({ grid }: { grid: boolean }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl border border-gray-200 bg-white overflow-hidden",
        grid ? "" : "flex flex-col sm:flex-row"
      )}
    >
      <div
        className={cn(
          "bg-gray-200",
          grid ? "aspect-video w-full" : "aspect-video sm:aspect-auto sm:w-48 md:w-64 lg:w-72 sm:h-auto w-full"
        )}
      />
      <div className="flex-1 p-5 space-y-3">
        <div className="h-5 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-14 bg-gray-200 rounded-full" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-9 w-28 bg-gray-200 rounded-lg" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ---- Workshop Card ----

function WorkshopCard({
  workshop,
  grid,
  selected,
  onToggleCompare,
  compareCount,
}: {
  workshop: Workshop;
  grid: boolean;
  selected: boolean;
  onToggleCompare: (id: string) => void;
  compareCount: number;
}) {
  const priceLabel =
    workshop.priceRange === "budget"
      ? "₹"
      : workshop.priceRange === "mid-range"
        ? "₹₹"
        : "₹₹₹";

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white overflow-hidden transition-shadow hover:shadow-lg",
        selected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200",
        grid ? "" : "flex flex-col sm:flex-row"
      )}
    >
      {/* Compare checkbox */}
      <button
        onClick={() => onToggleCompare(workshop.id)}
        disabled={!selected && compareCount >= 3}
        className={cn(
          "absolute top-3 right-3 z-10 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors",
          selected
            ? "bg-blue-600 border-blue-600 text-white"
            : compareCount >= 3
              ? "border-gray-300 bg-white/80 text-gray-300 cursor-not-allowed"
              : "border-white bg-white/80 text-transparent hover:border-blue-400"
        )}
        title={selected ? "Remove from compare" : "Add to compare"}
      >
        <Check className="h-4 w-4" />
      </button>

      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100",
          grid
            ? "aspect-video w-full"
            : "aspect-video sm:aspect-auto sm:w-48 md:w-56 lg:w-72 sm:shrink-0 w-full"
        )}
      >
        <Image
          src={workshop.image}
          alt={workshop.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={grid ? "(max-width: 768px) 100vw, 50vw" : "288px"}
        />
        {/* Open/Closed badge */}
        <span
          className={cn(
            "absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold",
            workshop.openNow
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {workshop.openNow ? "Open Now" : "Closed"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2.5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate">
              {workshop.name}
            </h3>
            {workshop.verified && (
              <BadgeCheck className="h-4.5 w-4.5 text-blue-600 shrink-0" />
            )}
          </div>
          <span className="text-sm font-bold text-gray-700 shrink-0">
            {priceLabel}
          </span>
        </div>

        {/* Rating + distance */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-900">{workshop.rating}</span>
            <span className="text-gray-500">({workshop.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            {formatDistance(workshop.distance)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {workshop.openingHours}
          </span>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-500 truncate">
          {workshop.address}, {workshop.area}, {workshop.city}
        </p>

        {/* Brand expertise pills */}
        <div className="flex flex-wrap gap-1.5">
          {workshop.brandExpertise.slice(0, 4).map((brand) => (
            <span
              key={brand}
              className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
            >
              {brand}
            </span>
          ))}
          {workshop.brandExpertise.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
              +{workshop.brandExpertise.length - 4}
            </span>
          )}
        </div>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5">
          {workshop.services.slice(0, 3).map((svc) => (
            <span
              key={svc}
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {svc}
            </span>
          ))}
          {workshop.services.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
              +{workshop.services.length - 3}
            </span>
          )}
        </div>

        {/* Next slot */}
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">Next slot:</span>{" "}
          {workshop.nextAvailableSlot}
        </p>

        {/* Feature indicators */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          {workshop.pickupDrop && (
            <span className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-blue-500" />
              Pickup & Drop
            </span>
          )}
          {workshop.doorstepService && (
            <span className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5 text-green-500" />
              Doorstep
            </span>
          )}
          {workshop.evReady && (
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-yellow-500" />
              EV Ready
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
            Get Quote
          </button>
          <a
            href={`tel:${workshop.phone}`}
            className="ml-auto p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Call workshop"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ---- Main Page ----

export default function WorkshopsContent() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showMap, setShowMap] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Filter helpers
  const toggleArrayFilter = useCallback(
    (key: keyof Pick<FilterState, "serviceTypes" | "carBrands" | "priceRanges" | "features">, value: string) => {
      setFilters((prev) => {
        const arr = prev[key] as string[];
        return {
          ...prev,
          [key]: arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value],
        };
      });
    },
    []
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }, []);

  // Apply filters
  const filtered = workshops.filter((ws) => {
    if (
      filters.search &&
      !ws.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ws.area.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ws.city.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    if (
      filters.serviceTypes.length > 0 &&
      !filters.serviceTypes.some((st) =>
        ws.services.some((s) => s.toLowerCase().includes(st.toLowerCase()))
      )
    )
      return false;

    if (
      filters.carBrands.length > 0 &&
      !filters.carBrands.some((b) =>
        ws.brandExpertise.some(
          (be) =>
            be.toLowerCase().includes(b.toLowerCase()) ||
            b.toLowerCase().includes(be.toLowerCase())
        )
      ) &&
      !ws.brandExpertise.includes("All Brands")
    )
      return false;

    if (ws.distance > filters.maxDistance) return false;

    if (filters.minRating > 0 && ws.rating < filters.minRating) return false;

    if (
      filters.priceRanges.length > 0 &&
      !filters.priceRanges.includes(ws.priceRange)
    )
      return false;

    if (filters.features.length > 0) {
      for (const f of filters.features) {
        if (f === "pickupDrop" && !ws.pickupDrop) return false;
        if (f === "doorstepService" && !ws.doorstepService) return false;
        if (f === "evReady" && !ws.evReady) return false;
        if (f === "verified" && !ws.verified) return false;
      }
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "distance":
        return a.distance - b.distance;
      case "rating":
        return b.rating - a.rating;
      case "price-low": {
        const order = { budget: 0, "mid-range": 1, premium: 2 };
        return order[a.priceRange] - order[b.priceRange];
      }
      case "reviews":
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const activeFilterCount =
    filters.serviceTypes.length +
    filters.carBrands.length +
    filters.priceRanges.length +
    filters.features.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxDistance < 50 ? 1 : 0);

  // ---- Sidebar Content ----
  const sidebarContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Search
        </label>
        <input
          type="text"
          placeholder="Location or workshop name..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Service Type */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Service Type</h4>
        <div className="space-y-1.5">
          {SERVICE_TYPES.map((st) => (
            <label
              key={st}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={filters.serviceTypes.includes(st)}
                onChange={() => toggleArrayFilter("serviceTypes", st)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {st}
            </label>
          ))}
        </div>
      </div>

      {/* Car Brand */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Car Brand</h4>
        <div className="space-y-1.5">
          {CAR_BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={filters.carBrands.includes(brand)}
                onChange={() => toggleArrayFilter("carBrands", brand)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Distance: {filters.maxDistance} km
        </h4>
        <input
          type="range"
          min={1}
          max={50}
          value={filters.maxDistance}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxDistance: Number(e.target.value),
            }))
          }
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
        <div className="flex gap-2">
          {[
            { label: "4+", value: 4 },
            { label: "3+", value: 3 },
            { label: "Any", value: 0 },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                setFilters((prev) => ({ ...prev, minRating: opt.value }))
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                filters.minRating === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
              )}
            >
              {opt.label}
              {opt.value > 0 && (
                <Star className="inline h-3 w-3 ml-0.5 -mt-0.5 fill-current" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((pr) => (
            <button
              key={pr}
              onClick={() => toggleArrayFilter("priceRanges", pr)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium border capitalize transition-colors",
                filters.priceRanges.includes(pr)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
              )}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
        <div className="space-y-1.5">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <label
                key={feat.key}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={filters.features.includes(feat.key)}
                  onChange={() => toggleArrayFilter("features", feat.key)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Icon className="h-3.5 w-3.5 text-gray-400" />
                {feat.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => setFilters(defaultFilters)}
          className="w-full py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Slide-Over */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">{sidebarContent}</div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Find Car Workshops
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {loading
                ? "Searching workshops..."
                : `Showing ${sorted.length} workshop${sorted.length !== 1 ? "s" : ""} near Noida, UP`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile filter button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Map toggle */}
            <button
              onClick={() => setShowMap((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium border rounded-lg transition-colors",
                showMap
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              )}
            >
              <MapPin className="h-4 w-4" />
              Map
            </button>

            {/* View toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                )}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                )}
                title="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sort
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, sort: opt.value }));
                          setSortOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between",
                          filters.sort === opt.value
                            ? "text-blue-600 font-medium"
                            : "text-gray-700"
                        )}
                      >
                        {opt.label}
                        {filters.sort === opt.value && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Compare bar */}
        {compareIds.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-blue-800">
              {compareIds.length}/3 selected for comparison
            </span>
            <button
              disabled={compareIds.length < 2}
              className={cn(
                "ml-auto px-4 py-1.5 text-sm font-medium rounded-lg transition-colors",
                compareIds.length >= 2
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-200 text-blue-400 cursor-not-allowed"
              )}
            >
              Compare
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="p-1 rounded hover:bg-blue-100 text-blue-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Map placeholder */}
        {showMap && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-100 h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin className="h-10 w-10 mx-auto mb-2" />
              <p className="text-sm font-medium">Map View</p>
              <p className="text-xs">
                Interactive map will be displayed here
              </p>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-6 bg-white rounded-xl border border-gray-200 p-5 max-h-[calc(100vh-3rem)] overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Filters
              </h3>
              {sidebarContent}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div
                className={cn(
                  "gap-4",
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2"
                    : "flex flex-col"
                )}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} grid={viewMode === "grid"} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  No workshops found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "gap-4",
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2"
                    : "flex flex-col"
                )}
              >
                {sorted.map((ws) => (
                  <WorkshopCard
                    key={ws.id}
                    workshop={ws}
                    grid={viewMode === "grid"}
                    selected={compareIds.includes(ws.id)}
                    onToggleCompare={toggleCompare}
                    compareCount={compareIds.length}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
