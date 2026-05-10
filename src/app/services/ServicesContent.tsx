"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { serviceCategories, userCars, type ServiceCategory, type CarProfile } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  Wrench,
  Thermometer,
  Paintbrush,
  Zap,
  Circle,
  ShieldAlert,
  Settings,
  Droplets,
  BatteryCharging,
  FileCheck,
  Car,
  ChevronRight,
  Clock,
  Camera,
  MessageSquare,
  Star,
  ChevronLeft,
} from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

// Icon mapping from string names in mock data to lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Thermometer,
  Paintbrush,
  Zap,
  Circle,
  ShieldAlert,
  Settings,
  Droplets,
  BatteryCharging,
  FileCheck,
};

type CarType = "hatchback" | "sedan" | "suv" | "luxury";

function getCarType(car: CarProfile): CarType {
  const model = car.model.toLowerCase();
  const make = car.make.toLowerCase();

  if (
    make.includes("bmw") ||
    make.includes("mercedes") ||
    make.includes("audi") ||
    make.includes("porsche") ||
    make.includes("jaguar")
  ) {
    return "luxury";
  }
  if (
    model.includes("creta") ||
    model.includes("nexon") ||
    model.includes("seltos") ||
    model.includes("xuv") ||
    model.includes("hector") ||
    model.includes("harrier") ||
    model.includes("fortuner") ||
    model.includes("scorpio")
  ) {
    return "suv";
  }
  if (
    model.includes("city") ||
    model.includes("verna") ||
    model.includes("ciaz") ||
    model.includes("slavia") ||
    model.includes("virtus") ||
    model.includes("amaze")
  ) {
    return "sedan";
  }
  // Default hatchbacks: Swift, i20, Baleno, Alto, WagonR, etc.
  return "hatchback";
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function CarSelectorSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-40 rounded-xl shrink-0" />
      ))}
    </div>
  );
}

function PopularServiceSkeleton() {
  return (
    <div className="shrink-0 w-48 sm:w-56 bg-white rounded-xl border border-border p-3 sm:p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

interface CategoryCardProps {
  category: ServiceCategory;
  carType: CarType;
}

function CategoryCard({ category, carType }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || Wrench;
  const [minPrice, maxPrice] = category.priceRange[carType];
  const visibleSubs = category.subServices.slice(0, 3);
  const moreCount = category.subServices.length - 3;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in">
      {/* Category Image */}
      <div className="relative aspect-[3/2] bg-gray-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted" />
          <span className="text-xs font-medium text-gray-700">{category.estimatedTime}</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Category name with icon */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed">{category.description}</p>

        {/* Sub-services */}
        <div className="space-y-1.5">
          {visibleSubs.map((sub, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
              {sub}
            </div>
          ))}
          {moreCount > 0 && (
            <p className="text-xs font-medium text-primary ml-3.5">+{moreCount} more</p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(minPrice)}</p>
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors">
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const popularServices = [
  { name: "Basic Periodic Service", category: "Periodic Service", rating: 4.8, reviews: 2340, prices: { hatchback: 2200, sedan: 3000, suv: 3500, luxury: 5000 } },
  { name: "AC Gas Top-up", category: "AC Service", rating: 4.7, reviews: 1890, prices: { hatchback: 1200, sedan: 1500, suv: 1800, luxury: 2500 } },
  { name: "Wheel Alignment", category: "Tyres & Wheel", rating: 4.6, reviews: 1450, prices: { hatchback: 400, sedan: 500, suv: 600, luxury: 900 } },
  { name: "Brake Pad Replacement", category: "Brakes", rating: 4.7, reviews: 980, prices: { hatchback: 1200, sedan: 1800, suv: 2200, luxury: 4000 } },
  { name: "Premium Car Wash", category: "Detailing", rating: 4.5, reviews: 3200, prices: { hatchback: 500, sedan: 700, suv: 900, luxury: 1200 } },
  { name: "Battery Replacement", category: "Electrical", rating: 4.6, reviews: 1100, prices: { hatchback: 3500, sedan: 4500, suv: 5500, luxury: 8000 } },
  { name: "Clutch Plate Replacement", category: "Clutch", rating: 4.5, reviews: 670, prices: { hatchback: 4500, sedan: 6000, suv: 7000, luxury: 12000 } },
];

export default function ServicesContent() {
  const [carsLoading, setCarsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCarId, setSelectedCarId] = useState(userCars[0]?.id || "");
  const [customDescription, setCustomDescription] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carTimer = setTimeout(() => setCarsLoading(false), 500);
    const catTimer = setTimeout(() => setCategoriesLoading(false), 900);
    return () => {
      clearTimeout(carTimer);
      clearTimeout(catTimer);
    };
  }, []);

  const selectedCar = userCars.find((c) => c.id === selectedCarId) || userCars[0];
  const carType = selectedCar ? getCarType(selectedCar) : "hatchback";

  function scrollPopular(direction: "left" | "right") {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -240 : 240, behavior: "smooth" });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
          <Wrench className="w-8 h-8 text-primary" />
          Car Services
        </h1>
        <p className="text-muted mt-1">Choose a service category to get started</p>
      </div>

      {/* Car Selector */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Select your car</h2>
        {carsLoading ? (
          <CarSelectorSkeleton />
        ) : (
          <div className="flex flex-wrap gap-3">
            {userCars.map((car) => (
              <button
                key={car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={cn(
                  "flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all",
                  selectedCarId === car.id
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-gray-700 border-border hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <Car className="w-4 h-4" />
                <span>
                  {car.make} {car.model}
                </span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded",
                    selectedCarId === car.id ? "bg-white/20" : "bg-gray-100"
                  )}
                >
                  {car.year}
                </span>
              </button>
            ))}
          </div>
        )}
        {!carsLoading && selectedCar && (
          <p className="text-xs text-muted mt-2">
            Showing prices for: <span className="font-medium capitalize">{carType}</span> segment
          </p>
        )}
      </div>

      {/* Service Category Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Service Categories</h2>
        {categoriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {serviceCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} carType={carType} />
            ))}
          </div>
        )}
      </div>

      {/* Popular Services - Horizontal Scroll */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Popular Services</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollPopular("left")}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollPopular("right")}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        {categoriesLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <PopularServiceSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {popularServices.map((svc, i) => (
              <div
                key={i}
                className="shrink-0 w-52 sm:w-60 bg-white rounded-xl border border-border p-3 sm:p-4 hover:shadow-md transition-shadow animate-fade-in"
              >
                <p className="text-sm font-semibold text-gray-900">{svc.name}</p>
                <p className="text-xs text-muted mt-0.5">{svc.category}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-xs font-medium text-gray-700">{svc.rating}</span>
                  <span className="text-xs text-muted">({svc.reviews.toLocaleString("en-IN")})</span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {formatCurrency(svc.prices[carType])}
                </p>
                <button className="w-full mt-3 px-3 py-2 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Service Request */}
      <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-accent-dark" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Custom Service Request</h2>
            <p className="text-sm text-muted">Can&apos;t find what you need? Describe your issue</p>
          </div>
        </div>
        <textarea
          value={customDescription}
          onChange={(e) => setCustomDescription(e.target.value)}
          placeholder="Describe the issue you're facing with your car... e.g. 'There's a rattling noise from the front left wheel when driving above 60 km/h'"
          className="w-full px-4 py-3 border border-border rounded-xl text-sm resize-none h-28 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <Camera className="w-4 h-4" />
            Attach Photos
          </button>
          <button
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors",
              customDescription.trim()
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            disabled={!customDescription.trim()}
          >
            Submit Request
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
