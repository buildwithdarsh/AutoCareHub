"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { currentTechnician } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/Skeleton";
import {
  Camera,
  AlertCircle,
  Package,
  Pause,
  CheckCircle2,
  Play,
  Star,
  Clock,
  Wrench,
  ChevronDown,
  ChevronUp,
  Send,
  Mic,
  Search,
  User,
  Calendar,
  TrendingUp,
  Timer,
  CircleDot,
  Square,
  Check,
  Image as ImageIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChecklistItem {
  label: string;
  checked: boolean;
  note?: string;
}

interface PartStatus {
  name: string;
  status: "available" | "in-transit" | "out-of-stock";
  eta?: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const initialChecklist: ChecklistItem[] = [
  { label: "Engine oil drained", checked: true },
  { label: "Oil filter replaced", checked: true },
  { label: "Air filter replaced", checked: true },
  { label: "Cabin filter replaced", checked: true },
  { label: "Front brake pads", checked: false, note: "Waiting for parts (in-transit)" },
  { label: "Brake fluid top-up", checked: false },
  { label: "Multi-point inspection", checked: false },
  { label: "Test drive", checked: false },
];

const partsStatus: PartStatus[] = [
  { name: "Engine Oil (5W-30) 4L", status: "available" },
  { name: "Oil Filter (Hyundai OEM)", status: "available" },
  { name: "Air Filter", status: "available" },
  { name: "Cabin Filter", status: "available" },
  { name: "Front Brake Pads (Bosch)", status: "in-transit", eta: "~30 min" },
  { name: "Brake Fluid DOT 4 500ml", status: "available" },
];

const dailyJobCounts = [4, 3, 5, 3, 2, 1]; // Mon-Sat for weekly chart
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function partStatusColor(status: PartStatus["status"]) {
  switch (status) {
    case "available":
      return "bg-green-50 text-green-700";
    case "in-transit":
      return "bg-amber-50 text-amber-700";
    case "out-of-stock":
      return "bg-red-50 text-red-700";
  }
}

function jobStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "in-progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "pending":
      return "bg-gray-50 text-gray-600 border-gray-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------

function MechanicPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {/* Stats skeleton */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-36 rounded-xl shrink-0" />
        ))}
      </div>
      {/* Current job skeleton */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
      {/* Queue skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TechnicianHeader({
  clockedIn,
  onToggleClock,
}: {
  clockedIn: boolean;
  onToggleClock: () => void;
}) {
  const tech = currentTechnician;
  return (
    <div className="bg-white rounded-2xl border border-border p-5 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Photo */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary">
          <Image
            src={tech.photo}
            alt={tech.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-gray-900">{tech.name}</h1>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                clockedIn
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              <CircleDot className="w-3 h-3" />
              {clockedIn ? "Clocked In" : "Clocked Out"}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-900">{tech.rating}</span>
            <span className="text-muted">
              ({tech.jobsCompleted.toLocaleString("en-IN")} jobs)
            </span>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tech.specialization.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                <Wrench className="w-3 h-3" />
                {spec}
              </span>
            ))}
          </div>

          {/* Experience */}
          <p className="text-xs text-muted mt-1.5">
            {tech.experience} years experience
          </p>
        </div>
      </div>

      {/* Clock In/Out */}
      <button
        onClick={onToggleClock}
        className={cn(
          "mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2",
          clockedIn
            ? "bg-red-50 text-red-700 hover:bg-red-100"
            : "bg-green-600 text-white hover:bg-green-700"
        )}
      >
        {clockedIn ? (
          <>
            <Square className="w-4 h-4" /> Clock Out
          </>
        ) : (
          <>
            <Play className="w-4 h-4" /> Clock In
          </>
        )}
      </button>
    </div>
  );
}

function TodayStatsBar() {
  const stats = [
    { label: "Jobs Done", value: "1/4", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    { label: "Hours Logged", value: "3.5 hrs", icon: Clock, color: "text-blue-600 bg-blue-50" },
    { label: "Streak", value: "Completing", icon: TrendingUp, color: "text-amber-600 bg-amber-50" },
    { label: "Status", value: "On Job", icon: CircleDot, color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none animate-fade-in">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-2.5 bg-white rounded-xl border border-border px-4 py-3 shrink-0 min-w-[120px]"
        >
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", stat.color)}>
            <stat.icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-xs text-muted">{stat.label}</p>
            <p className="text-sm font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CurrentJobCard({
  checklist,
  onToggleChecklist,
  elapsed,
}: {
  checklist: ChecklistItem[];
  onToggleChecklist: (index: number) => void;
  elapsed: number;
}) {
  const job = currentTechnician.currentJob;
  if (!job) return null;

  const checkedCount = checklist.filter((c) => c.checked).length;
  const progress = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          Current Job
        </h2>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
          <CircleDot className="w-3 h-3" />
          In Progress
        </span>
      </div>

      {/* Job info */}
      <div className="space-y-1 mb-4">
        <p className="text-xs font-mono text-muted">{job.jobId}</p>
        <p className="text-sm font-semibold text-gray-900">
          {job.carModel}{" "}
          <span className="text-muted font-normal">&mdash; DL 4C AB 1234</span>
        </p>
        <p className="text-sm text-gray-600">{job.service}</p>
        <p className="text-xs text-muted">Bay 3</p>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-sm">
          <Timer className="w-4 h-4 text-blue-600" />
          <span className="font-mono font-semibold text-blue-700">
            {formatElapsed(elapsed)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted">
          <span>Progress:</span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-5">
        <h3 className="text-sm font-semibold text-gray-800">Service Checklist</h3>
        {checklist.map((item, i) => (
          <button
            key={i}
            onClick={() => onToggleChecklist(i)}
            className={cn(
              "w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors",
              item.checked
                ? "bg-green-50/60"
                : "bg-gray-50 hover:bg-gray-100"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5",
                item.checked
                  ? "bg-green-600 text-white"
                  : "border-2 border-gray-300"
              )}
            >
              {item.checked && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "text-sm",
                  item.checked
                    ? "text-green-800 line-through"
                    : "text-gray-800"
                )}
              >
                {item.label}
              </span>
              {item.note && (
                <span className="block text-xs text-amber-600 mt-0.5">
                  {item.note}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          <Camera className="w-3.5 h-3.5" />
          Take Photo
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
          <AlertCircle className="w-3.5 h-3.5" />
          Report Issue
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
          <Package className="w-3.5 h-3.5" />
          Request Parts
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors">
          <Pause className="w-3.5 h-3.5" />
          Pause Job
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Complete Job
        </button>
      </div>

      {/* Parts status */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Parts Status</h3>
        <div className="space-y-1.5">
          {partsStatus.map((part) => (
            <div
              key={part.name}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 text-sm"
            >
              <span className="text-gray-700">{part.name}</span>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full capitalize",
                  partStatusColor(part.status)
                )}
              >
                {part.status.replace("-", " ")}
                {part.eta && ` (${part.eta})`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobQueue() {
  const jobs = currentTechnician.todayJobs;

  return (
    <div className="animate-fade-in">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Today&apos;s Job Queue
      </h2>
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className={cn(
              "bg-white rounded-xl border p-4 transition-colors",
              job.status === "completed" && "border-green-200 opacity-75",
              job.status === "in-progress" && "border-blue-200",
              job.status === "pending" && "border-border"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      job.status === "completed"
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    )}
                  >
                    {job.carModel}
                  </p>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full border capitalize",
                      jobStatusColor(job.status)
                    )}
                  >
                    {job.status === "in-progress" ? "in progress" : job.status}
                  </span>
                </div>
                <p className="text-xs font-mono text-muted mt-0.5">
                  {job.jobId}
                </p>
                <p
                  className={cn(
                    "text-xs mt-0.5",
                    job.status === "completed"
                      ? "text-gray-400 line-through"
                      : "text-gray-600"
                  )}
                >
                  {job.registrationNo} &middot; {job.service}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.estimatedTime}
                  </span>
                  <span>{job.bay}</span>
                </div>
              </div>

              {/* Status indicator / action */}
              <div className="shrink-0">
                {job.status === "completed" && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                )}
                {job.status === "in-progress" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center animate-pulse-slow">
                    <Wrench className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                {job.status === "pending" && (
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary-dark transition-colors">
                    <Play className="w-3 h-3" />
                    Start
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueReportingSection({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-fade-in">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          Report Issue
        </h2>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue found during inspection..."
              rows={3}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            />
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <Camera className="w-3.5 h-3.5" />
            Take Photo
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Additional Cost
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                ₹
              </span>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="0"
                className="w-full pl-7 pr-3 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Submit for Customer Approval
          </button>
        </div>
      )}
    </div>
  );
}

function PartsRequestSection({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const inventoryItems = [
    { name: "Brake Pads (Bosch) - Creta", available: 3 },
    { name: "Engine Oil 5W-30 4L", available: 8 },
    { name: "Oil Filter - Hyundai", available: 12 },
    { name: "Cabin Filter - Universal", available: 5 },
    { name: "Clutch Plate - Innova", available: 0 },
    { name: "Spark Plug Set - Honda City", available: 2 },
  ];

  const filtered = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-fade-in">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600" />
          Request Parts
        </h2>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts..."
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>

          {/* Inventory list */}
          <div className="space-y-2">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="text-sm text-gray-800">{item.name}</p>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      item.available > 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {item.available > 0
                      ? `${item.available} in stock`
                      : "Out of stock"}
                  </p>
                </div>
                {item.available > 0 ? (
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
                    Request
                  </button>
                ) : (
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                    Procure
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WeeklySummary() {
  const stats = currentTechnician.weeklyStats;
  const maxJobs = Math.max(...dailyJobCounts);

  return (
    <div className="bg-white rounded-2xl border border-border p-5 animate-fade-in">
      <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Weekly Summary
      </h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs text-green-700 truncate">Jobs Completed</p>
          <p className="text-xl font-bold text-green-800">{stats.jobsCompleted}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-blue-700 truncate">Hours Worked</p>
          <p className="text-xl font-bold text-blue-800">{stats.hoursWorked}</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3">
          <p className="text-xs text-amber-700 truncate">Earnings</p>
          <p className="text-xl font-bold text-amber-800 truncate">
            {formatCurrency(stats.earnings)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-3">
          <p className="text-xs text-purple-700 truncate">Avg Rating</p>
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold text-purple-800">{stats.avgRating}</p>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
        </div>
      </div>

      {/* Mini bar chart */}
      <div>
        <p className="text-xs font-medium text-muted mb-2">Daily Jobs (This Week)</p>
        <div className="flex items-end gap-2 h-24">
          {dailyJobCounts.map((count, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-gray-700">{count}</span>
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all"
                style={{
                  height: `${(count / maxJobs) * 100}%`,
                  minHeight: 4,
                }}
              />
              <span className="text-[10px] text-muted">{dayLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BottomActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 flex items-center justify-around md:hidden z-50">
      <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary transition-colors py-1 px-3">
        <Camera className="w-5 h-5" />
        <span className="text-[10px] font-medium">Camera</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors py-1 px-3">
        <AlertCircle className="w-5 h-5" />
        <span className="text-[10px] font-medium">Issue</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-amber-600 transition-colors py-1 px-3">
        <Package className="w-5 h-5" />
        <span className="text-[10px] font-medium">Parts</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 transition-colors py-1 px-3">
        <Mic className="w-5 h-5" />
        <span className="text-[10px] font-medium">Voice Note</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function MechanicContent() {
  const [loading, setLoading] = useState(true);
  const [clockedIn, setClockedIn] = useState(true);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [elapsed, setElapsed] = useState(0);
  const [issueExpanded, setIssueExpanded] = useState(false);
  const [partsExpanded, setPartsExpanded] = useState(false);

  // Simulate 800ms loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Compute initial elapsed from startTime
  useEffect(() => {
    if (currentTechnician.currentJob) {
      const start = new Date(currentTechnician.currentJob.startTime).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - start) / 1000));
      setElapsed(diff);
    }
  }, []);

  // Live timer
  useEffect(() => {
    if (!clockedIn || !currentTechnician.currentJob) return;
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [clockedIn]);

  const handleToggleChecklist = useCallback((index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  if (loading) {
    return <MechanicPageSkeleton />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8 space-y-5">
      {/* 1. Technician Header */}
      <TechnicianHeader
        clockedIn={clockedIn}
        onToggleClock={() => setClockedIn((prev) => !prev)}
      />

      {/* 2. Today's Stats Bar */}
      <TodayStatsBar />

      {/* 3. Current Job Card */}
      <CurrentJobCard
        checklist={checklist}
        onToggleChecklist={handleToggleChecklist}
        elapsed={elapsed}
      />

      {/* 4. Job Queue */}
      <JobQueue />

      {/* 5. Issue Reporting Section */}
      <IssueReportingSection
        expanded={issueExpanded}
        onToggle={() => setIssueExpanded((prev) => !prev)}
      />

      {/* 6. Parts Request Section */}
      <PartsRequestSection
        expanded={partsExpanded}
        onToggle={() => setPartsExpanded((prev) => !prev)}
      />

      {/* 7. Weekly Summary */}
      <WeeklySummary />

      {/* 8. Bottom Sticky Action Bar (mobile only) */}
      <BottomActionBar />
    </div>
  );
}
