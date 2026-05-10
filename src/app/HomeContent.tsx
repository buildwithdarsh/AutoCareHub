"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, formatCurrency, formatDistance } from "@/lib/utils";
import { workshops, serviceCategories } from "@/lib/mock-data";
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Shield,
  Clock,
  ChevronRight,
  ChevronLeft,
  Wrench,
  Car,
  Smartphone,
  CheckCircle,
  Award,
  MessageSquare,
  ClipboardList,
  BarChart3,
  Zap,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

// ============================================================================
// Hero Section
// ============================================================================
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1600&q=80"
          alt="Modern car workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/75 to-primary-dark/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
            <BadgeCheck className="w-4 h-4 text-accent" />
            Trusted by 2 Million+ car owners across India
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-5">
            India&apos;s Verified{" "}
            <span className="text-accent">Car Service</span> Marketplace
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/85 mb-6 sm:mb-8 leading-relaxed max-w-xl">
            Transparent pricing. Genuine spare parts. Real-time tracking.
            Compare quotes from verified workshops and book your car service in
            minutes.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Enter your location or car issue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted"
                />
              </div>
              <Link
                href="/workshops"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 px-2 pb-1">
              {["Periodic Service", "AC Repair", "Denting", "Battery"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="text-xs text-muted hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full border border-border transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/workshops"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
            >
              <MapPin className="w-4 h-4" />
              Find Workshops Near You
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl transition-colors border border-white/25 backdrop-blur-sm"
            >
              <Wrench className="w-4 h-4" />
              List Your Workshop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// How It Works Section
// ============================================================================
const steps = [
  {
    icon: ClipboardList,
    title: "Describe Your Issue",
    description:
      "Tell us what your car needs - from a routine service to a specific repair. Select your car model for accurate pricing.",
    color: "bg-blue-50 text-primary",
  },
  {
    icon: BarChart3,
    title: "Compare Quotes",
    description:
      "Get transparent quotes from multiple verified workshops near you. Compare prices, ratings, and turnaround time.",
    color: "bg-amber-50 text-accent-dark",
  },
  {
    icon: Clock,
    title: "Book & Track",
    description:
      "Book your preferred slot, opt for pickup/drop-off, and track every stage of your service in real-time.",
    color: "bg-emerald-50 text-success",
  },
  {
    icon: MessageSquare,
    title: "Rate & Review",
    description:
      "Share your experience to help other car owners. Earn loyalty points with every completed service.",
    color: "bg-purple-50 text-purple-600",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
            How It Works
          </h2>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            Get your car serviced in 4 simple steps. No hidden charges, no
            surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative group">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-border" />
              )}
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
                    step.color
                  )}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-muted mb-2">
                  STEP {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-primary-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Service Categories Section
// ============================================================================
function ServiceCategoriesSection() {
  const displayCategories = serviceCategories.slice(0, 8);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
            What Does Your Car Need?
          </h2>
          <p className="text-muted mt-3 max-w-lg mx-auto">
            From routine maintenance to major repairs - we have you covered with
            50,000+ verified workshops.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/services?category=${category.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative h-36 md:h-44 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm md:text-base">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <p className="text-xs text-muted line-clamp-2 mb-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">
                    Starting{" "}
                    {formatCurrency(category.priceRange.hatchback[0])}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Key Stats Section
// ============================================================================
const stats = [
  {
    icon: Car,
    value: "350M+",
    label: "Vehicles in India",
    description: "And growing every year",
  },
  {
    icon: Wrench,
    value: "50,000+",
    label: "Verified Workshops",
    description: "Across 500+ cities",
  },
  {
    icon: Star,
    value: "4.7",
    label: "Average Rating",
    description: "Based on 2M+ reviews",
  },
  {
    icon: CheckCircle,
    value: "2M+",
    label: "Services Completed",
    description: "With quality guarantee",
  },
];

function KeyStatsSection() {
  return (
    <section className="py-16 bg-primary-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-4">
                <stat.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/90 font-semibold text-sm md:text-base">
                {stat.label}
              </div>
              <div className="text-white/50 text-xs mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Featured Workshops Section (with loading delay)
// ============================================================================
function WorkshopSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border min-w-[260px] sm:min-w-[300px] max-w-[340px] shrink-0">
      <div className="skeleton h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-5 w-24" />
          <div className="skeleton h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function FeaturedWorkshopsSection() {
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const featured = workshops.filter((w) => w.rating >= 4.3).slice(0, 6);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Top Rated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Featured Workshops
            </h2>
            <p className="text-muted mt-2">
              Handpicked workshops with exceptional ratings and service quality.
            </p>
          </div>
          {loaded && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-xl border border-border hover:bg-surface transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-xl border border-border hover:bg-surface transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {!loaded
            ? Array.from({ length: 4 }).map((_, i) => (
                <WorkshopSkeletonCard key={i} />
              ))
            : featured.map((workshop) => (
                <Link
                  key={workshop.id}
                  href={`/workshops/${workshop.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 min-w-[260px] sm:min-w-[300px] max-w-[340px] shrink-0 snap-start animate-fade-in"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={workshop.image}
                      alt={workshop.name}
                      fill
                      sizes="(max-width: 640px) 260px, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {workshop.verified && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-success">
                        <Shield className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                    {workshop.openNow && (
                      <div className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-white">
                        Open Now
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary-dark group-hover:text-primary transition-colors mb-1">
                      {workshop.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        {workshop.rating} ({workshop.reviewCount})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {formatDistance(workshop.distance)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {workshop.expertiseTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/5 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted">
                        {workshop.turnaroundTime}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline flex items-center gap-1">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
          >
            Browse All Workshops
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// AMC Plans Teaser Section
// ============================================================================
const amcBenefits = [
  "Unlimited periodic services for the year",
  "Priority booking with zero wait time",
  "Free roadside assistance (RSA) - 24x7",
  "Genuine OEM spare parts at discounted rates",
  "Dedicated relationship manager",
  "Complimentary car wash with every service",
];

function AMCPlansSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-3xl overflow-hidden relative">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />

          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-light text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                Save up to 40% annually
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Annual Maintenance Contracts
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Let go of service worries for an entire year. Our AMC plans
                cover everything from periodic maintenance to emergency
                breakdowns - all at a fixed annual price.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {amcBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors"
                >
                  Explore AMC Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
                >
                  Calculate Savings
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/15 w-full max-w-sm">
                <div className="text-center mb-6">
                  <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                    Starting from
                  </p>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-white">
                      {formatCurrency(7999)}
                    </span>
                    <span className="text-white/60 text-sm">/year</span>
                  </div>
                  <p className="text-accent-light text-xs mt-1">
                    For hatchbacks. Sedan & SUV plans also available.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {["Basic", "Standard", "Premium"].map((plan, idx) => (
                    <div
                      key={plan}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border transition-colors",
                        idx === 1
                          ? "border-accent bg-accent/10"
                          : "border-white/15 hover:border-white/30"
                      )}
                    >
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {plan}
                        </p>
                        <p className="text-white/50 text-xs">
                          {idx === 0 && "2 services/year"}
                          {idx === 1 && "4 services/year + RSA"}
                          {idx === 2 && "Unlimited + Priority"}
                        </p>
                      </div>
                      <span className="text-white font-bold text-sm">
                        {formatCurrency([7999, 13999, 22999][idx])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Download App CTA Section
// ============================================================================
function DownloadAppSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              Your Entire Garage in Your Pocket
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Book services, track repairs live, manage your vehicle documents,
              get service reminders, and access exclusive app-only discounts.
              Everything you need to keep your car running perfectly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: Clock,
                  title: "Real-Time Tracking",
                  text: "Watch every stage of your car service live",
                },
                {
                  icon: Shield,
                  title: "Digital Service Book",
                  text: "All service records in one place",
                },
                {
                  icon: Zap,
                  title: "Instant SOS",
                  text: "One-tap emergency roadside assistance",
                },
                {
                  icon: Award,
                  title: "Reward Points",
                  text: "Earn points on every service booking",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-primary-dark">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted mt-0.5">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.64a1 1 0 010 1.74l-2.834 1.64-2.635-2.636 2.635-2.384zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                Google Play
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-52 h-[400px] sm:w-64 sm:h-[500px] md:w-72 md:h-[560px] bg-gradient-to-br from-primary to-primary-dark rounded-[40px] p-3 shadow-2xl">
                <div className="w-full h-full bg-surface rounded-[32px] overflow-hidden flex items-center justify-center">
                  <div className="text-center px-6">
                    <Smartphone className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-sm font-semibold text-primary-dark">
                      AutoCare Hub
                    </p>
                    <p className="text-xs text-muted mt-1">
                      App Preview Coming Soon
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -left-4 sm:-left-8 top-20 bg-white rounded-xl shadow-lg p-2.5 sm:p-3 border border-border animate-pulse-slow hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Service Complete</p>
                    <p className="text-[10px] text-muted">AC Gas Top-up</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 sm:-right-8 bottom-32 bg-white rounded-xl shadow-lg p-2.5 sm:p-3 border border-border animate-pulse-slow hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">4.8 Rating</p>
                    <p className="text-[10px] text-muted">847 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Footer Section
// ============================================================================
const footerLinks = {
  Services: [
    { label: "Periodic Service", href: "/services?category=svc-periodic" },
    { label: "AC Service & Repair", href: "/services?category=svc-ac" },
    { label: "Denting & Painting", href: "/services?category=svc-denting" },
    { label: "Tyres & Wheel", href: "/services?category=svc-tyres" },
    { label: "Car Wash & Detailing", href: "/services?category=svc-wash" },
    { label: "EV Service", href: "/services?category=svc-ev" },
    { label: "Insurance Claims", href: "/services?category=svc-insurance" },
  ],
  "For Workshops": [
    { label: "List Your Workshop", href: "/dashboard" },
    { label: "Workshop Dashboard", href: "/dashboard" },
    { label: "Mechanic Panel", href: "/mechanic" },
  ],
  Explore: [
    { label: "Find Workshops", href: "/workshops" },
    { label: "AMC Plans", href: "/plans" },
    { label: "Emergency SOS", href: "/emergency" },
  ],
};

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                AutoCare<span className="text-accent">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India&apos;s verified car service marketplace. Transparent
              pricing, genuine parts, and real-time service tracking.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://facebook.com/autocarehub" },
                { Icon: Instagram, href: "https://instagram.com/autocarehub" },
                { Icon: Twitter, href: "https://twitter.com/autocarehub" },
                { Icon: Youtube, href: "https://youtube.com/@autocarehub" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AutoCare Hub. All rights reserved.
            Made with care in India.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/workshops" className="hover:text-white transition-colors">
              Workshops
            </Link>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/plans" className="hover:text-white transition-colors">
              Plans
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================
export default function HomeContent() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <ServiceCategoriesSection />
      <KeyStatsSection />
      <FeaturedWorkshopsSection />
      <AMCPlansSection />
      <DownloadAppSection />
      <Footer />
    </div>
  );
}
