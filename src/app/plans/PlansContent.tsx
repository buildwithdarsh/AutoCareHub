"use client";

import { useState, useEffect, useMemo } from "react";
import { amcPlans } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Check,
  X,
  Star,
  Shield,
  Crown,
  Zap,
  ChevronDown,
  ChevronUp,
  Calculator,
  Car,
  Wrench,
  Clock,
  Truck,
} from "lucide-react";

// ---- Types ----

type CarType = "hatchback" | "sedan" | "suv" | "luxury";

const CAR_TYPES: { value: CarType; label: string }[] = [
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
];

const TIER_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Basic: Shield,
  Standard: Star,
  Premium: Crown,
};

const TIER_COLORS: Record<string, { badge: string; border: string; bg: string; btn: string }> = {
  Basic: {
    badge: "bg-gray-100 text-gray-700",
    border: "border-gray-200",
    bg: "bg-white",
    btn: "bg-gray-800 hover:bg-gray-900",
  },
  Standard: {
    badge: "bg-blue-100 text-blue-700",
    border: "border-blue-400 ring-2 ring-blue-100",
    bg: "bg-blue-50/30",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  Premium: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-300",
    bg: "bg-white",
    btn: "bg-amber-600 hover:bg-amber-700",
  },
};

// ---- FAQ Data ----

const FAQ_ITEMS = [
  {
    question: "Can I choose any workshop?",
    answer:
      "Yes, you can choose from any workshop in our network. AMC plans are accepted at all AutoCare Hub verified workshops across India. You can pick a workshop near your home or office, and even switch workshops between services.",
  },
  {
    question: "What happens to unused services?",
    answer:
      "Unused services do not carry over to the next year. We recommend scheduling your services evenly throughout the year. However, you can use multiple services in a single visit if needed, as long as they are within your plan limit.",
  },
  {
    question: "Can I upgrade mid-year?",
    answer:
      "Absolutely! You can upgrade your plan at any time. You will only pay the prorated difference for the remaining months. Downgrades are not permitted mid-year, but you can choose a different plan at renewal.",
  },
  {
    question: "What's not covered?",
    answer:
      "AMC plans cover scheduled maintenance and the specific items listed in each plan. Accident repairs, cosmetic damage, modifications, and wear items beyond what is listed (e.g., clutch plates, body parts) are not covered. Pre-existing issues at the time of subscription are also excluded.",
  },
];

// ---- How It Works Steps ----

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Choose Plan",
    description: "Select a plan that fits your car type and driving habits.",
    icon: Car,
  },
  {
    step: 2,
    title: "Select Workshop",
    description: "Pick any verified workshop from our pan-India network.",
    icon: Wrench,
  },
  {
    step: 3,
    title: "Enjoy Hassle-free Service",
    description: "Walk in, get serviced, walk out. No bills, no surprises.",
    icon: Clock,
  },
];

// ---- Savings Calculator Defaults ----

const AVG_SERVICE_COSTS: Record<CarType, number> = {
  hatchback: 3500,
  sedan: 4500,
  suv: 5500,
  luxury: 8500,
};

// ---- Skeleton ----

function PlanCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
      <div className="h-6 w-24 bg-gray-200 rounded-full" />
      <div className="h-8 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="space-y-2 pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-3 flex-1 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="h-11 w-full bg-gray-200 rounded-lg mt-4" />
    </div>
  );
}

// ---- Page Component ----

export default function PlansContent() {
  const [loading, setLoading] = useState(true);
  const [carType, setCarType] = useState<CarType>("sedan");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Savings calculator state
  const [calcCarType, setCalcCarType] = useState<CarType>("sedan");
  const [calcServicesPerYear, setCalcServicesPerYear] = useState(4);

  // Simulate 800ms loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Savings calculation
  const savings = useMemo(() => {
    const payPerService = AVG_SERVICE_COSTS[calcCarType] * calcServicesPerYear;
    // Find best matching plan
    const standardPlan = amcPlans.find((p) => p.tier === "Standard");
    const planCost = standardPlan?.prices[calcCarType] ?? 0;
    const saved = payPerService - planCost;
    return { payPerService, planCost, saved: Math.max(0, saved) };
  }, [calcCarType, calcServicesPerYear]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Save up to 40% on car maintenance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Annual Maintenance Contracts
          </h1>
          <p className="text-blue-200 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Save more with pre-paid service plans. Transparent coverage, no surprises.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Car Type Selector */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            {CAR_TYPES.map((ct) => (
              <button
                key={ct.value}
                onClick={() => setCarType(ct.value)}
                className={cn(
                  "px-2.5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200",
                  carType === ct.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <PlanCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start overflow-visible">
            {amcPlans.map((plan) => {
              const TierIcon = TIER_ICON[plan.tier] || Shield;
              const colors = TIER_COLORS[plan.tier] || TIER_COLORS.Basic;
              const price = plan.prices[carType];
              const monthlyPrice = Math.round(price / 12);

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-2xl border-2 p-6 sm:p-7 transition-shadow hover:shadow-lg",
                    colors.border,
                    colors.bg,
                    plan.popular && "md:scale-105 md:z-10 shadow-lg"
                  )}
                >
                  {/* Most Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Tier badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold",
                        colors.badge
                      )}
                    >
                      <TierIcon className="h-4 w-4" />
                      {plan.tier}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/year</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-5">
                    {formatCurrency(monthlyPrice)}/month &bull;{" "}
                    {plan.servicesPerYear} services/year
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-start gap-2 text-sm"
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                        )}
                        <span
                          className={cn(
                            feature.included
                              ? "text-gray-700"
                              : "text-gray-400"
                          )}
                        >
                          {feature.name}
                          {feature.detail && feature.included && (
                            <span className="text-xs text-gray-500 ml-1">
                              ({feature.detail})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={cn(
                      "w-full py-3 text-sm font-semibold rounded-lg text-white transition-colors",
                      colors.btn
                    )}
                  >
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Comparison Table */}
        {!loading && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Detailed Plan Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Feature
                    </th>
                    {amcPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className={cn(
                          "py-3 px-4 font-semibold text-center",
                          plan.popular ? "text-blue-700 bg-blue-50/50" : "text-gray-700"
                        )}
                      >
                        {plan.tier}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price row */}
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      Price ({carType})
                    </td>
                    {amcPlans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "py-3 px-4 text-center font-semibold",
                          plan.popular ? "bg-blue-50/30" : ""
                        )}
                      >
                        {formatCurrency(plan.prices[carType])}
                      </td>
                    ))}
                  </tr>
                  {/* Services per year */}
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      Services/Year
                    </td>
                    {amcPlans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "py-3 px-4 text-center",
                          plan.popular ? "bg-blue-50/30" : ""
                        )}
                      >
                        {plan.servicesPerYear}
                      </td>
                    ))}
                  </tr>
                  {/* Feature rows */}
                  {amcPlans[0].features.map((_, fi) => (
                    <tr
                      key={fi}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="py-3 px-4 text-gray-600">
                        {amcPlans[0].features[fi].name}
                      </td>
                      {amcPlans.map((plan) => {
                        const feature = plan.features[fi];
                        return (
                          <td
                            key={plan.id}
                            className={cn(
                              "py-3 px-4 text-center",
                              plan.popular ? "bg-blue-50/30" : ""
                            )}
                          >
                            {feature.included ? (
                              feature.detail ? (
                                <span className="text-green-700 font-medium text-xs">
                                  {feature.detail}
                                </span>
                              ) : (
                                <Check className="h-4 w-4 text-green-500 mx-auto" />
                              )
                            ) : (
                              <X className="h-4 w-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* How AMC Works */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            How AMC Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative text-center bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Connector line (desktop) */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-gray-300" />
                  )}
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold absolute top-4 right-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base pr-4">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 animate-fade-in">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Savings Calculator */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Savings Calculator
          </h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Car type select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Car Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CAR_TYPES.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => setCalcCarType(ct.value)}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
                        calcCarType === ct.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                      )}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services per year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services per Year: {calcServicesPerYear}
                </label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={calcServicesPerYear}
                  onChange={(e) =>
                    setCalcServicesPerYear(Number(e.target.value))
                  }
                  className="w-full accent-blue-600 mt-2"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>6</span>
                  <span>12</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Pay-per-Service</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(savings.payPerService)}
                </p>
                <p className="text-xs text-gray-400">
                  {calcServicesPerYear} x {formatCurrency(AVG_SERVICE_COSTS[calcCarType])}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                <p className="text-xs text-blue-600 mb-1">AMC Standard Plan</p>
                <p className="text-lg font-bold text-blue-700">
                  {formatCurrency(savings.planCost)}
                </p>
                <p className="text-xs text-blue-400">/year fixed</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <p className="text-xs text-green-600 mb-1">You Save</p>
                <p className="text-lg font-bold text-green-700">
                  {formatCurrency(savings.saved)}
                </p>
                <p className="text-xs text-green-500">
                  {savings.payPerService > 0
                    ? `${Math.round((savings.saved / savings.payPerService) * 100)}% savings`
                    : "0%"}
                </p>
              </div>
            </div>

            {savings.saved <= 0 && (
              <p className="text-xs text-amber-600 mt-4 text-center flex items-center justify-center gap-1">
                <Truck className="h-3.5 w-3.5" />
                Consider increasing services or upgrading your plan for better savings.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
