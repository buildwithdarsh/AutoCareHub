"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { activeBooking, workshops, userCars } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Car,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Camera,
  Package,
  AlertCircle,
  ChevronRight,
  Star,
  Truck,
  MapPin,
} from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

const allStages = [
  { key: "booked", label: "Booked" },
  { key: "vehicle-received", label: "Vehicle Received" },
  { key: "inspection", label: "Inspection" },
  { key: "approval-pending", label: "Approval Pending" },
  { key: "in-progress", label: "In Progress" },
  { key: "qc", label: "Quality Check" },
  { key: "ready", label: "Ready for Pickup" },
  { key: "delivered", label: "Delivered" },
];

function getStageStatus(stageKey: string, currentStatus: string) {
  const currentIdx = allStages.findIndex((s) => s.key === currentStatus);
  const stageIdx = allStages.findIndex((s) => s.key === stageKey);
  if (stageIdx < currentIdx) return "completed";
  if (stageIdx === currentIdx) return "current";
  return "upcoming";
}

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function PartsBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    installed: { bg: "bg-green-100", text: "text-green-700", label: "Installed" },
    "in-transit": { bg: "bg-amber-100", text: "text-amber-700", label: "In Transit" },
    ordered: { bg: "bg-blue-100", text: "text-blue-700", label: "Ordered" },
  };
  const c = config[status] ?? config.ordered;
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", c.bg, c.text)}>
      {c.label}
    </span>
  );
}

function TrackingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-full rounded-full" />
            <div className="space-y-6 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6 space-y-3">
            <Skeleton className="h-5 w-28" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackingContent() {
  const [loading, setLoading] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const booking = activeBooking;
  const workshop = workshops.find((w) => w.id === booking.workshopId)!;
  const car = userCars.find((c) => c.id === booking.carId)!;

  // Current stage start time
  const currentStageEntry = booking.statusHistory.find((h) => h.status === booking.status);
  const currentStageStart = currentStageEntry ? new Date(currentStageEntry.timestamp).getTime() : Date.now();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  // Live elapsed counter for current stage
  useEffect(() => {
    if (loading) return;
    const calcElapsed = () => {
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - currentStageStart) / 1000));
    };
    calcElapsed();
    const interval = setInterval(calcElapsed, 1000);
    return () => clearInterval(interval);
  }, [loading, currentStageStart]);

  // Progress percentage
  const currentIdx = allStages.findIndex((s) => s.key === booking.status);
  const progressPercent = Math.round(((currentIdx + 0.5) / allStages.length) * 100);

  // ETA countdown
  const etaDate = new Date(booking.estimatedCompletion);
  const now = new Date();
  const etaDiffMs = etaDate.getTime() - now.getTime();
  const etaHours = Math.max(0, Math.floor(etaDiffMs / (1000 * 60 * 60)));
  const etaMinutes = Math.max(0, Math.floor((etaDiffMs % (1000 * 60 * 60)) / (1000 * 60)));

  // Format elapsed time
  const elapsedHours = Math.floor(elapsedSeconds / 3600);
  const elapsedMins = Math.floor((elapsedSeconds % 3600) / 60);
  const elapsedSecs = elapsedSeconds % 60;
  const elapsedStr = elapsedHours > 0
    ? `${elapsedHours}h ${elapsedMins}m ${elapsedSecs}s`
    : `${elapsedMins}m ${elapsedSecs}s`;

  // Total cost
  const partsTotal = booking.partsBreakdown.reduce((sum, p) => sum + p.price, 0);
  const additionalApproved = booking.additionalIssues.filter((i) => i.approved).reduce((sum, i) => sum + i.estimatedCost, 0);
  const totalCost = booking.laborCost + partsTotal;

  if (loading) return <TrackingSkeleton />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Live Service Tracking
            </h1>
            <p className="text-muted mt-1">
              Booking <span className="font-semibold text-primary">{booking.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-2.5 w-fit">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-semibold text-gray-900">
                {car.make} {car.model} {car.variant.split(" ")[0]}
              </p>
              <p className="text-xs text-muted">{car.registrationNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Left Column - Status Timeline */}
        <div className="lg:col-span-3 space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Service Progress</h2>
              <span className="text-sm font-bold text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Clock className="w-4 h-4" />
                <span>Stage elapsed: <span className="font-medium text-gray-700">{elapsedStr}</span></span>
              </div>
              {etaDiffMs > 0 && (
                <div className="text-sm text-muted">
                  ETA: <span className="font-medium text-gray-700">{etaHours}h {etaMinutes}m</span>
                </div>
              )}
            </div>
          </div>

          {/* ETA Card */}
          <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Estimated completion: Today, 2:00 PM
              </p>
              {etaDiffMs > 0 ? (
                <p className="text-xs text-muted">
                  Approximately {etaHours > 0 ? `${etaHours} hour${etaHours > 1 ? "s" : ""} and ` : ""}{etaMinutes} minute{etaMinutes !== 1 ? "s" : ""} remaining
                </p>
              ) : (
                <p className="text-xs text-success font-medium">Service should be completed now!</p>
              )}
            </div>
          </div>

          {/* Stage Timeline */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Timeline</h2>
            <div className="space-y-0">
              {allStages.map((stage, idx) => {
                const status = getStageStatus(stage.key, booking.status);
                const historyEntry = booking.statusHistory.find((h) => h.status === stage.key);
                const isLast = idx === allStages.length - 1;

                return (
                  <div key={stage.key} className="flex gap-4">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      {status === "completed" && (
                        <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {status === "current" && (
                        <div className="relative w-8 h-8 shrink-0">
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        </div>
                      )}
                      {status === "upcoming" && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        </div>
                      )}
                      {!isLast && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 min-h-[24px]",
                            status === "completed" ? "bg-success" : status === "current" ? "bg-gradient-to-b from-primary to-gray-200" : "bg-gray-200"
                          )}
                        />
                      )}
                    </div>

                    {/* Stage content */}
                    <div className={cn("pb-6 flex-1", isLast && "pb-0")}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p
                            className={cn(
                              "font-semibold text-sm",
                              status === "completed" && "text-gray-900",
                              status === "current" && "text-primary",
                              status === "upcoming" && "text-gray-400"
                            )}
                          >
                            {stage.label}
                          </p>
                          {historyEntry && (
                            <p className="text-xs text-muted mt-0.5">
                              {formatTimestamp(historyEntry.timestamp)}
                            </p>
                          )}
                        </div>
                        {status === "current" && (
                          <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>

                      {historyEntry && (
                        <p className={cn(
                          "text-sm mt-1.5",
                          status === "current" ? "text-gray-700" : "text-muted"
                        )}>
                          {historyEntry.note}
                        </p>
                      )}

                      {/* Additional details for approval-pending */}
                      {stage.key === "approval-pending" && status === "completed" && (
                        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-amber-700 text-xs font-medium mb-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Additional Issues Found
                          </div>
                          {booking.additionalIssues.map((issue, i) => (
                            <p key={i} className="text-xs text-amber-800">
                              {issue.description} — {formatCurrency(issue.estimatedCost)}
                              {issue.approved && (
                                <span className="ml-1.5 text-green-700 font-medium">(Approved)</span>
                              )}
                              {issue.approved === false && (
                                <span className="ml-1.5 text-red-600 font-medium">(Declined)</span>
                              )}
                              {issue.approved === null && (
                                <span className="ml-1.5 text-amber-600 font-medium">(Pending)</span>
                              )}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Photo thumbnail */}
                      {historyEntry?.photo && (
                        <div className="mt-2">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group cursor-pointer">
                            <Image
                              src={historyEntry.photo}
                              alt={`${stage.label} photo`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                              sizes="80px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <Camera className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workshop Info */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Workshop</h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{workshop.name}</p>
                <p className="text-sm text-muted mt-0.5">
                  {workshop.address}, {workshop.area}, {workshop.city} - {workshop.pincode}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a
                href={`tel:${workshop.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white text-sm font-medium rounded-xl py-2.5 hover:bg-primary-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-primary text-primary text-sm font-medium rounded-xl py-2.5 hover:bg-primary/5 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
            </div>
          </div>

          {/* Technician Card */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Your Technician</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                <Image
                  src={booking.technicianPhoto}
                  alt={booking.technicianName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{booking.technicianName}</p>
                <p className="text-sm text-muted">{booking.technicianSpecialization}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3.5 h-3.5",
                        i < 4 ? "text-accent fill-accent" : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted ml-1">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parts Status */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-muted" />
              <h3 className="text-base font-semibold text-gray-900">Parts Status</h3>
            </div>
            <div className="space-y-3">
              {booking.partsBreakdown.map((part, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{part.name}</p>
                    <p className="text-xs text-muted">{part.type}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <PartsBadge status={part.status} />
                    <span className="text-xs text-muted">{formatCurrency(part.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Issues */}
          {booking.additionalIssues.length > 0 && (
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-semibold text-gray-900">Additional Issues Found</h3>
              </div>
              <div className="space-y-4">
                {booking.additionalIssues.map((issue, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border">
                      <Image
                        src={issue.photo}
                        alt="Issue photo"
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{issue.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(issue.estimatedCost)}
                        </span>
                        {issue.approved === true && (
                          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                            Approved
                          </span>
                        )}
                        {issue.approved === false && (
                          <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            Declined
                          </span>
                        )}
                        {issue.approved === null && (
                          <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                            Pending Approval
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Labor</span>
                <span className="font-medium text-gray-800">{formatCurrency(booking.laborCost)}</span>
              </div>
              {booking.partsBreakdown.map((part, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-muted truncate mr-2">{part.name.split("(")[0].trim()}</span>
                  <span className="font-medium text-gray-800 shrink-0">{formatCurrency(part.price)}</span>
                </div>
              ))}
              {booking.additionalIssues
                .filter((i) => i.approved)
                .map((issue, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      Additional work
                    </span>
                    <span className="font-medium text-gray-800">
                      {formatCurrency(issue.estimatedCost)}
                    </span>
                  </div>
                ))}
              <div className="border-t border-border pt-2.5 mt-2.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-primary">
                    {formatCurrency(totalCost + additionalApproved)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Photos */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-muted" />
              <h3 className="text-base font-semibold text-gray-900">Service Photos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-hidden">
              {booking.statusHistory
                .filter((h) => h.photo)
                .map((h, idx) => (
                  <div key={idx} className="relative">
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
                      <Image
                        src={h.photo!}
                        alt={`${h.status} photo`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 40vw, 180px"
                      />
                    </div>
                    <p className="text-xs text-muted mt-1 capitalize">
                      {h.status.replace("-", " ")}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Pickup info */}
          {booking.pickupDrop && booking.pickupAddress && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-semibold text-green-800">Pickup & Drop Included</h3>
              </div>
              <p className="text-sm text-green-700 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {booking.pickupAddress}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
