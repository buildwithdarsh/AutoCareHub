"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { serviceHistory, userCars } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  FileText,
  Download,
  Star,
  Shield,
  ShieldCheck,
  ShieldX,
  ChevronDown,
  ChevronUp,
  Clock,
  Wrench,
  Camera,
  User,
} from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

function WarrantyBadge({ status }: { status: string }) {
  if (status === "warranty-active") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <ShieldCheck className="w-3 h-3" />
        Warranty Active
      </span>
    );
  }
  if (status === "warranty-expired") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        <ShieldX className="w-3 h-3" />
        Warranty Expired
      </span>
    );
  }
  return null;
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < rating ? "text-accent fill-accent" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-48 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
      <Skeleton className="h-6 w-40" />
      {Array.from({ length: 3 }).map((_, carIdx) => (
        <div key={carIdx} className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <div className="ml-4 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HistoryContent() {
  const [loading, setLoading] = useState(true);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const listTimer = setTimeout(() => setLoading(false), 1000);
    const timelineTimer = setTimeout(() => setTimelineLoading(false), 2000);
    return () => {
      clearTimeout(listTimer);
      clearTimeout(timelineTimer);
    };
  }, []);

  // Build filter options
  const carOptions = [
    { value: "all", label: "All Cars" },
    ...userCars.map((c) => ({
      value: c.id,
      label: `${c.make} ${c.model}`,
    })),
  ];

  // Filter records
  const filteredRecords =
    selectedCar === "all"
      ? serviceHistory
      : serviceHistory.filter((r) => r.carId === selectedCar);

  // Summary stats
  const totalServices = filteredRecords.length;
  const totalSpent = filteredRecords.reduce((sum, r) => sum + r.totalCost, 0);
  const activeWarranties = filteredRecords.filter((r) => r.status === "warranty-active").length;
  const ratedRecords = filteredRecords.filter((r) => r.rating !== undefined);
  const averageRating =
    ratedRecords.length > 0
      ? (ratedRecords.reduce((sum, r) => sum + (r.rating ?? 0), 0) / ratedRecords.length).toFixed(1)
      : "N/A";

  // Group records by car for timeline
  const groupedByCar = userCars
    .filter((c) => selectedCar === "all" || c.id === selectedCar)
    .map((car) => ({
      car,
      records: serviceHistory
        .filter((r) => r.carId === car.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }))
    .filter((g) => g.records.length > 0);

  const getCarLabel = (carId: string) => {
    const car = userCars.find((c) => c.id === carId);
    return car ? `${car.make} ${car.model}` : "";
  };

  if (loading) return <HistorySkeleton />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Service History</h1>
          <p className="text-muted mt-1">
            Complete record of all services across your vehicles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="appearance-none bg-white border border-border rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              {carOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white text-sm font-medium rounded-xl px-4 py-2.5 hover:bg-primary-dark transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Service History (PDF)</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Total Services</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalServices}</p>
          <p className="text-xs text-muted mt-0.5">across all vehicles</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalSpent)}</p>
          <p className="text-xs text-muted mt-0.5">lifetime spending</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Active Warranties</p>
          <p className="text-2xl font-bold text-success mt-1">{activeWarranties}</p>
          <p className="text-xs text-muted mt-0.5">services covered</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">Average Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
            {averageRating !== "N/A" && <Star className="w-5 h-5 text-accent fill-accent" />}
          </div>
          <p className="text-xs text-muted mt-0.5">given by you</p>
        </div>
      </div>

      {/* Service Records List */}
      <div className="space-y-4 mb-10">
        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-700">No service records found</p>
            <p className="text-sm text-muted mt-1">
              No services have been recorded for this vehicle yet.
            </p>
          </div>
        )}

        {filteredRecords
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((record) => {
            const isExpanded = expandedId === record.id;
            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-border overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Collapsed row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {record.workshopName}
                      </p>
                      <WarrantyBadge status={record.status} />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-sm text-muted">{record.serviceType}</span>
                      {selectedCar === "all" && (
                        <>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-muted">{getCarLabel(record.carId)}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(record.date)}
                      </span>
                      {record.rating !== undefined && <RatingStars rating={record.rating} />}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-base font-bold text-gray-900 hidden sm:block">
                      {formatCurrency(record.totalCost)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted" />
                    )}
                  </div>
                </button>

                {/* Mobile price */}
                <div className="px-5 -mt-3 mb-3 sm:hidden">
                  <span className="text-base font-bold text-gray-900">
                    {formatCurrency(record.totalCost)}
                  </span>
                </div>

                {/* Expanded view */}
                {isExpanded && (
                  <div className="border-t border-border px-5 py-5 space-y-5 animate-fade-in">
                    {/* Cost Breakdown */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Cost Breakdown</h4>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Labor</span>
                          <span className="font-medium">{formatCurrency(record.laborCost)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Parts</span>
                          <span className="font-medium">{formatCurrency(record.partsCost)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="font-bold text-primary">
                              {formatCurrency(record.totalCost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Before/After Photos */}
                    {(record.beforePhoto || record.afterPhoto) && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-muted" />
                          Before & After
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {record.beforePhoto && (
                            <div>
                              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
                                <Image
                                  src={record.beforePhoto}
                                  alt="Before service"
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 45vw, 280px"
                                />
                              </div>
                              <p className="text-xs text-muted mt-1 text-center">Before</p>
                            </div>
                          )}
                          {record.afterPhoto && (
                            <div>
                              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border">
                                <Image
                                  src={record.afterPhoto}
                                  alt="After service"
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 45vw, 280px"
                                />
                              </div>
                              <p className="text-xs text-muted mt-1 text-center">After</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Technician & Review */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-muted" />
                          Technician
                        </h4>
                        <p className="text-sm text-gray-700">{record.technicianName}</p>
                      </div>
                      {record.review && (
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Your Review</h4>
                          <p className="text-sm text-muted italic">&ldquo;{record.review}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {/* Warranty & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted" />
                          <span className="text-sm text-muted">
                            Warranty expires: <span className="font-medium text-gray-700">{formatDate(record.warrantyExpiry)}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted">
                          Invoice: {record.invoiceId}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors">
                          <FileText className="w-4 h-4" />
                          Download Invoice
                        </button>
                        {record.status === "warranty-active" && (
                          <button className="flex items-center gap-1.5 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-lg transition-colors">
                            <ShieldCheck className="w-4 h-4" />
                            Raise Warranty Claim
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Vehicle Timeline */}
      {timelineLoading ? (
        <TimelineSkeleton />
      ) : (
        <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Service Timeline</h2>
          <div className="space-y-8">
            {groupedByCar.map(({ car, records }) => (
              <div key={car.id}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {car.make} {car.model} {car.variant.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted">{car.registrationNumber}</p>
                  </div>
                </div>
                <div className="ml-4 space-y-0">
                  {records.map((record, idx) => {
                    const isLast = idx === records.length - 1;
                    return (
                      <div key={record.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                              record.status === "warranty-active"
                                ? "bg-success"
                                : "bg-gray-300"
                            )}
                          >
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          {!isLast && (
                            <div className="w-0.5 flex-1 min-h-[20px] bg-gray-200" />
                          )}
                        </div>
                        <div className={cn("pb-5 flex-1", isLast && "pb-0")}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {record.serviceType}
                              </p>
                              <p className="text-xs text-muted">
                                {record.workshopName} &middot; {formatDate(record.date)}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 shrink-0">
                              {formatCurrency(record.totalCost)}
                            </span>
                          </div>
                          {record.rating !== undefined && (
                            <div className="mt-1">
                              <RatingStars rating={record.rating} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
