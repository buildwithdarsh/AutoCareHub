"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { workshops, workshopReviews, serviceCategories } from "@/lib/mock-data";
import { cn, formatCurrency, delay } from "@/lib/utils";
import { Skeleton } from "@/components/Skeleton";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  CalendarCheck,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  Users,
  Wrench,
  Zap,
  Truck,
  Building2,
  Award,
  Camera,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
  Package,
  Shield,
  Crown,
  CircleDot,
  Timer,
  IndianRupee,
  Sparkles,
  Car,
  ImageIcon,
  Info,
} from "lucide-react";

type TabId = "services" | "reviews" | "gallery" | "about";

const tabs: { id: TabId; label: string }[] = [
  { id: "services", label: "Services & Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  "multi-brand": { label: "Multi-brand", color: "bg-blue-100 text-blue-800" },
  authorized: { label: "Authorized", color: "bg-green-100 text-green-800" },
  independent: { label: "Independent", color: "bg-purple-100 text-purple-800" },
  franchise: { label: "Franchise", color: "bg-orange-100 text-orange-800" },
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating)
              ? "fill-accent text-accent"
              : i < rating
                ? "fill-accent/50 text-accent"
                : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Skeleton Loaders
// ============================================================================

function HeroSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="w-full h-64 md:h-80 rounded-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickInfoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-border p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="w-6 h-6 rounded" />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-6 space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 flex-1 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function WorkshopDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [mainLoading, setMainLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("services");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [useGenuine, setUseGenuine] = useState(true);

  const workshop = useMemo(
    () => workshops.find((w) => w.slug === slug) || workshops[0],
    [slug]
  );

  const reviews = useMemo(
    () => workshopReviews.filter((r) => r.workshopId === workshop.id),
    [workshop.id]
  );

  const workshopServices = useMemo(
    () => serviceCategories.filter((sc) => workshop.services.includes(sc.name)),
    [workshop.services]
  );

  useEffect(() => {
    setMainLoading(true);
    setReviewsLoading(true);
    delay(1000).then(() => setMainLoading(false));
    delay(1800).then(() => setReviewsLoading(false));
  }, [slug]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Computed review stats
  const ratingBreakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      const bucket = Math.min(Math.max(Math.floor(r.rating) - 1, 0), 4);
      counts[bucket]++;
    });
    return counts.reverse(); // 5-star first
  }, [reviews]);

  const avgSubRatings = useMemo(() => {
    if (reviews.length === 0) return { quality: 0, price: 0, timeliness: 0, communication: 0, cleanliness: 0 };
    const sum = reviews.reduce(
      (acc, r) => ({
        quality: acc.quality + r.qualityRating,
        price: acc.price + r.priceRating,
        timeliness: acc.timeliness + r.timelinessRating,
        communication: acc.communication + r.communicationRating,
        cleanliness: acc.cleanliness + r.cleanlinessRating,
      }),
      { quality: 0, price: 0, timeliness: 0, communication: 0, cleanliness: 0 }
    );
    const n = reviews.length;
    return {
      quality: +(sum.quality / n).toFixed(1),
      price: +(sum.price / n).toFixed(1),
      timeliness: +(sum.timeliness / n).toFixed(1),
      communication: +(sum.communication / n).toFixed(1),
      cleanliness: +(sum.cleanliness / n).toFixed(1),
    };
  }, [reviews]);

  // Gallery images
  const galleryImages = useMemo(() => {
    const imgs = [workshop.image, ...workshop.interiorImages];
    const reviewPhotos = reviews.flatMap((r) => r.photos);
    return [...imgs, ...reviewPhotos];
  }, [workshop, reviews]);

  // Package tiers for service pricing
  const packageTiers = [
    {
      tier: "Basic",
      icon: Package,
      color: "border-gray-200",
      bg: "bg-gray-50",
      badge: "bg-gray-200 text-gray-700",
      description: "Essential maintenance to keep your car running",
      features: ["Oil & Filter Change", "Top-up Fluids", "Visual Inspection", "Battery Check"],
      multiplier: 1,
    },
    {
      tier: "Standard",
      icon: Shield,
      color: "border-primary/30",
      bg: "bg-primary/5",
      badge: "bg-primary text-white",
      description: "Comprehensive service with deeper checks",
      features: [
        "Everything in Basic",
        "Air & Cabin Filter",
        "Brake Inspection",
        "Suspension Check",
        "Wiper Blades",
      ],
      multiplier: 1.5,
      popular: true,
    },
    {
      tier: "Premium",
      icon: Crown,
      color: "border-accent/30",
      bg: "bg-accent/5",
      badge: "bg-accent text-white",
      description: "Full bumper-to-bumper service with warranty",
      features: [
        "Everything in Standard",
        "Spark Plugs",
        "Coolant Flush",
        "Throttle Clean",
        "Full Diagnostics",
        "90-Day Warranty",
      ],
      multiplier: 2.2,
    },
  ];

  // ====== RENDER ======

  if (mainLoading) {
    return (
      <div className="animate-fade-in">
        <HeroSkeleton />
        <QuickInfoSkeleton />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
          <div className="flex gap-2 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-lg" />
            ))}
          </div>
          <ServicesSkeleton />
        </div>
      </div>
    );
  }

  const typeBadge = typeLabels[workshop.type] || typeLabels.independent;

  return (
    <div className="animate-fade-in pb-16">
      {/* ================================================================ */}
      {/* HERO / HEADER */}
      {/* ================================================================ */}
      <div className="relative">
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <Image
            src={workshop.image}
            alt={workshop.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-24 relative z-10">
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-border">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
                    {workshop.name}
                  </h1>
                  {workshop.verified && (
                    <BadgeCheck className="w-6 h-6 text-primary shrink-0" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                      typeBadge.color
                    )}
                  >
                    {typeBadge.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={workshop.rating} size="sm" />
                    <span className="text-sm font-semibold text-gray-900">
                      {workshop.rating}
                    </span>
                    <span className="text-sm text-muted">
                      ({workshop.reviewCount.toLocaleString("en-IN")} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    {workshop.address}, {workshop.area}, {workshop.city} -{" "}
                    {workshop.pincode}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 shrink-0" />
                    {workshop.openingHours}
                    {workshop.openNow ? (
                      <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success">
                        Open Now
                      </span>
                    ) : (
                      <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-danger/10 text-danger">
                        Closed
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={`tel:${workshop.phone}`}
                  className="flex items-center justify-center gap-2 flex-1 sm:flex-initial px-5 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Workshop
                </a>
                <button className="flex items-center justify-center gap-2 flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
                  <CalendarCheck className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* QUICK INFO BAR */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-border">
            {[
              {
                icon: Building2,
                label: "Established",
                value: workshop.yearEstablished.toString(),
                color: "text-blue-600 bg-blue-50",
              },
              {
                icon: Users,
                label: "Team Size",
                value: `${workshop.teamSize} experts`,
                color: "text-indigo-600 bg-indigo-50",
              },
              {
                icon: Wrench,
                label: "Service Bays",
                value: workshop.bayCount.toString(),
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                icon: CircleDot,
                label: "Monthly Orders",
                value: workshop.monthlyOrders.toLocaleString("en-IN"),
                color: "text-amber-600 bg-amber-50",
              },
              {
                icon: Truck,
                label: "Pickup & Drop",
                value: workshop.pickupDrop ? "Available" : "Not Available",
                color: workshop.pickupDrop
                  ? "text-green-600 bg-green-50"
                  : "text-gray-400 bg-gray-50",
              },
              {
                icon: Zap,
                label: "EV Ready",
                value: workshop.evReady ? "Yes" : "No",
                color: workshop.evReady
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-400 bg-gray-50",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 sm:p-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    item.color.split(" ")[1]
                  )}
                >
                  <item.icon className={cn("w-5 h-5", item.color.split(" ")[0])} />
                </div>
                <div>
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TAB NAVIGATION */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-border overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 sm:flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* TAB CONTENT */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        {/* ============ SERVICES & PRICING TAB ============ */}
        {activeTab === "services" && (
          <div className="animate-fade-in space-y-6">
            {/* Genuine vs Aftermarket toggle */}
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-border">
              <div>
                <p className="text-sm font-semibold text-gray-900">Parts Pricing</p>
                <p className="text-xs text-muted mt-0.5">
                  {useGenuine
                    ? "Showing genuine OEM parts pricing"
                    : "Showing aftermarket parts pricing (10-30% lower)"}
                </p>
              </div>
              <button
                onClick={() => setUseGenuine(!useGenuine)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span className={cn(!useGenuine && "text-primary font-semibold")}>
                  Aftermarket
                </span>
                {useGenuine ? (
                  <ToggleRight className="w-10 h-10 text-primary" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-muted" />
                )}
                <span className={cn(useGenuine && "text-primary font-semibold")}>
                  Genuine
                </span>
              </button>
            </div>

            {/* Service Categories */}
            {workshopServices.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const priceMultiplier = useGenuine ? 1 : 0.75;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted mt-0.5">
                          {category.subServices.length} services &middot;{" "}
                          {category.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted hidden sm:inline">
                        From{" "}
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(
                            Math.round(category.priceRange.hatchback[0] * priceMultiplier)
                          )}
                        </span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border animate-fade-in">
                      {/* Price header */}
                      <div className="hidden md:grid grid-cols-[1fr_80px_100px_100px_100px_100px_90px] gap-2 px-5 py-3 bg-gray-50 text-xs font-semibold text-muted">
                        <span>Service</span>
                        <span className="text-center">Est. Time</span>
                        <span className="text-center">Hatchback</span>
                        <span className="text-center">Sedan</span>
                        <span className="text-center">SUV</span>
                        <span className="text-center">Luxury</span>
                        <span />
                      </div>

                      {category.subServices.map((sub, i) => {
                        // Distribute price range across sub-services
                        const fraction = (i + 1) / category.subServices.length;
                        const hatch = Math.round(
                          (category.priceRange.hatchback[0] +
                            fraction *
                              (category.priceRange.hatchback[1] -
                                category.priceRange.hatchback[0])) *
                            priceMultiplier
                        );
                        const sedan = Math.round(
                          (category.priceRange.sedan[0] +
                            fraction *
                              (category.priceRange.sedan[1] - category.priceRange.sedan[0])) *
                            priceMultiplier
                        );
                        const suv = Math.round(
                          (category.priceRange.suv[0] +
                            fraction *
                              (category.priceRange.suv[1] - category.priceRange.suv[0])) *
                            priceMultiplier
                        );
                        const luxury = Math.round(
                          (category.priceRange.luxury[0] +
                            fraction *
                              (category.priceRange.luxury[1] -
                                category.priceRange.luxury[0])) *
                            priceMultiplier
                        );
                        const time =
                          category.estimatedTime.includes("-")
                            ? `${parseInt(category.estimatedTime)}+ hrs`
                            : category.estimatedTime;

                        return (
                          <div
                            key={sub}
                            className={cn(
                              "px-5 py-3.5 md:grid md:grid-cols-[1fr_80px_100px_100px_100px_100px_90px] md:gap-2 md:items-center",
                              i < category.subServices.length - 1 && "border-b border-border"
                            )}
                          >
                            {/* Mobile layout */}
                            <div className="md:hidden space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">{sub}</p>
                                <span className="text-xs text-muted flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  {time}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex justify-between bg-gray-50 rounded-lg p-2">
                                  <span className="text-muted">Hatch</span>
                                  <span className="font-semibold">{formatCurrency(hatch)}</span>
                                </div>
                                <div className="flex justify-between bg-gray-50 rounded-lg p-2">
                                  <span className="text-muted">Sedan</span>
                                  <span className="font-semibold">{formatCurrency(sedan)}</span>
                                </div>
                                <div className="flex justify-between bg-gray-50 rounded-lg p-2">
                                  <span className="text-muted">SUV</span>
                                  <span className="font-semibold">{formatCurrency(suv)}</span>
                                </div>
                                <div className="flex justify-between bg-gray-50 rounded-lg p-2">
                                  <span className="text-muted">Luxury</span>
                                  <span className="font-semibold">{formatCurrency(luxury)}</span>
                                </div>
                              </div>
                              <button className="w-full py-2 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                                Get Quote
                              </button>
                            </div>

                            {/* Desktop layout */}
                            <p className="hidden md:block text-sm font-medium text-gray-900">
                              {sub}
                            </p>
                            <p className="hidden md:block text-xs text-muted text-center">
                              {time}
                            </p>
                            <p className="hidden md:block text-sm font-semibold text-center">
                              {formatCurrency(hatch)}
                            </p>
                            <p className="hidden md:block text-sm font-semibold text-center">
                              {formatCurrency(sedan)}
                            </p>
                            <p className="hidden md:block text-sm font-semibold text-center">
                              {formatCurrency(suv)}
                            </p>
                            <p className="hidden md:block text-sm font-semibold text-center">
                              {formatCurrency(luxury)}
                            </p>
                            <button className="hidden md:block text-xs font-semibold text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors">
                              Get Quote
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Package Tiers */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Service Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageTiers.map((pkg) => {
                  const basePrice = workshopServices[0]
                    ? workshopServices[0].priceRange.hatchback[0]
                    : 2200;
                  const price = Math.round(basePrice * pkg.multiplier * (useGenuine ? 1 : 0.75));

                  return (
                    <div
                      key={pkg.tier}
                      className={cn(
                        "relative rounded-xl border-2 p-6 transition-shadow hover:shadow-md",
                        pkg.color,
                        pkg.bg
                      )}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-white text-xs font-semibold rounded-full">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <pkg.icon
                          className={cn(
                            "w-5 h-5",
                            pkg.tier === "Premium"
                              ? "text-accent"
                              : pkg.tier === "Standard"
                                ? "text-primary"
                                : "text-gray-500"
                          )}
                        />
                        <h3 className="text-lg font-bold text-gray-900">{pkg.tier}</h3>
                      </div>
                      <div className="mb-3">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(price)}
                        </span>
                        <span className="text-xs text-muted ml-1">onwards</span>
                      </div>
                      <p className="text-sm text-muted mb-4">{pkg.description}</p>
                      <ul className="space-y-2 mb-5">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={cn(
                          "w-full py-2.5 rounded-lg text-sm font-semibold transition-colors",
                          pkg.popular
                            ? "bg-primary text-white hover:bg-primary-dark"
                            : "border border-primary/30 text-primary hover:bg-primary/5"
                        )}
                      >
                        Select {pkg.tier}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============ REVIEWS TAB ============ */}
        {activeTab === "reviews" && (
          <div className="animate-fade-in">
            {reviewsLoading ? (
              <ReviewsSkeleton />
            ) : (
              <div className="space-y-6">
                {/* Rating Overview */}
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Overall + bar chart */}
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-gray-900">
                            {workshop.rating}
                          </p>
                          <StarRating rating={workshop.rating} size="md" />
                          <p className="text-xs text-muted mt-1">
                            {workshop.reviewCount.toLocaleString("en-IN")} reviews
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {ratingBreakdown.map((count, i) => {
                          const starNum = 5 - i;
                          const pct =
                            reviews.length > 0
                              ? Math.round((count / reviews.length) * 100)
                              : 0;
                          return (
                            <div key={starNum} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted w-3">
                                {starNum}
                              </span>
                              <Star className="w-3 h-3 fill-accent text-accent" />
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-accent rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted w-6 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Category ratings */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Detailed Ratings
                      </h3>
                      {(
                        [
                          { key: "quality", label: "Quality" },
                          { key: "price", label: "Value for Money" },
                          { key: "timeliness", label: "Timeliness" },
                          { key: "communication", label: "Communication" },
                          { key: "cleanliness", label: "Cleanliness" },
                        ] as const
                      ).map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{
                                  width: `${(avgSubRatings[item.key] / 5) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 w-7">
                              {avgSubRatings[item.key]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Cards */}
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-muted">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium">No reviews yet</p>
                    <p className="text-sm">Be the first to review this workshop.</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl border border-border shadow-sm p-6"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={review.customerAvatar}
                            alt={review.customerName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-gray-900">
                              {review.customerName}
                            </span>
                            {review.verified && (
                              <span className="flex items-center gap-0.5 text-xs text-success font-medium">
                                <BadgeCheck className="w-3.5 h-3.5" />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap text-xs text-muted mt-0.5">
                            <span className="flex items-center gap-1">
                              <Car className="w-3 h-3" />
                              {review.carModel}
                            </span>
                            <span>&middot;</span>
                            <span>{review.serviceType}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <StarRating rating={review.rating} size="sm" />
                          <p className="text-xs text-muted mt-1">
                            {new Intl.DateTimeFormat("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(review.date))}
                          </p>
                        </div>
                      </div>

                      {/* Review text */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {review.review}
                      </p>

                      {/* Photos */}
                      {review.photos.length > 0 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto">
                          {review.photos.map((photo, i) => (
                            <div
                              key={i}
                              className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0"
                            >
                              <Image
                                src={photo}
                                alt={`Review photo ${i + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Helpful + Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <button className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Helpful ({review.helpful})
                        </button>
                      </div>

                      {/* Workshop Reply */}
                      {review.workshopReply && (
                        <div className="mt-3 bg-primary/5 rounded-lg p-3">
                          <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            Workshop Reply
                          </p>
                          <p className="text-sm text-gray-700">{review.workshopReply}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ============ GALLERY TAB ============ */}
        {activeTab === "gallery" && (
          <div className="animate-fade-in">
            {galleryImages.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No photos yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${workshop.name} photo ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs font-medium rounded-md flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        Exterior
                      </span>
                    )}
                    {i > 0 && i <= workshop.interiorImages.length && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs font-medium rounded-md flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        Interior
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ ABOUT TAB ============ */}
        {activeTab === "about" && (
          <div className="animate-fade-in space-y-6">
            {/* Brand Expertise */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Brand Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {workshop.brandExpertise.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-lg border border-primary/10"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {workshop.expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-accent/10 text-accent-dark text-sm font-medium rounded-lg border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-success" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {workshop.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/10"
                  >
                    <Shield className="w-5 h-5 text-success shrink-0" />
                    <span className="text-sm font-medium text-gray-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workshop Info */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-info" />
                Workshop Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Established", value: workshop.yearEstablished.toString() },
                  { label: "Team Size", value: `${workshop.teamSize} professionals` },
                  { label: "Service Bays", value: `${workshop.bayCount} bays` },
                  { label: "Monthly Orders", value: workshop.monthlyOrders.toLocaleString("en-IN") },
                  { label: "Turnaround Time", value: workshop.turnaroundTime },
                  { label: "Price Range", value: workshop.priceRange.charAt(0).toUpperCase() + workshop.priceRange.slice(1) },
                  { label: "Pickup & Drop", value: workshop.pickupDrop ? "Available" : "Not Available" },
                  { label: "Doorstep Service", value: workshop.doorstepService ? "Available" : "Not Available" },
                  { label: "EV Ready", value: workshop.evReady ? "Yes" : "No" },
                  { label: "Phone", value: workshop.phone },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
