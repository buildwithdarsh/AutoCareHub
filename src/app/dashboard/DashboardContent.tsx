"use client";

import { useState, useEffect } from "react";
import { bayStatuses, dashboardStats, currentTechnician, workshops } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/Skeleton";
import {
  IndianRupee,
  Wrench,
  CheckCircle2,
  Clock,
  BarChart3,
  Star,
  Users,
  Package,
  AlertTriangle,
  ThumbsDown,
  Bell,
  Plus,
  Settings,
  FileText,
  UserCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  ArrowRight,
  BadgeCheck,
  CircleDot,
} from "lucide-react";

const workshop = workshops[0];

// --- Mock data for dashboard sections ---
const todayJobs = [
  { id: "ACH-2026-78430", car: "Maruti Baleno Zeta", reg: "DL 3C XY 4521", service: "Basic Periodic Service", technician: "Raju Yadav", status: "completed" as const, progress: 100, estimatedTime: "3 hrs" },
  { id: "ACH-2026-78431", car: "Kia Seltos HTX+", reg: "UP 16 GH 7788", service: "Standard Service", technician: "Sunil Kumar", status: "in-progress" as const, progress: 85, estimatedTime: "4 hrs" },
  { id: "ACH-2026-78432", car: "Hyundai Creta SX(O)", reg: "DL 4C AB 1234", service: "Standard Service + Brake Pads", technician: "Raju Yadav", status: "in-progress" as const, progress: 60, estimatedTime: "5 hrs" },
  { id: "ACH-2026-78433", car: "Honda City V CVT", reg: "HR 26 DK 8899", service: "AC Gas Top-up + Cleaning", technician: "Vikram Singh", status: "qc" as const, progress: 95, estimatedTime: "2 hrs" },
  { id: "ACH-2026-78434", car: "Maruti Ertiga VXi", reg: "DL 8C PQ 5566", service: "Clutch Replacement", technician: "Mohammad Irfan", status: "in-progress" as const, progress: 30, estimatedTime: "6 hrs" },
  { id: "ACH-2026-78435", car: "Toyota Innova Crysta", reg: "DL 1C MN 3344", service: "Clutch Plate Replacement", technician: "Raju Yadav", status: "pending" as const, progress: 0, estimatedTime: "4 hrs" },
  { id: "ACH-2026-78436", car: "Tata Nexon EV", reg: "DL 2C EV 9900", service: "Battery Health Check", technician: "Amit Sharma", status: "completed" as const, progress: 100, estimatedTime: "2 hrs" },
  { id: "ACH-2026-78437", car: "Maruti Swift VXi", reg: "DL 5C QR 1122", service: "Wheel Alignment + Balancing", technician: "Sunil Kumar", status: "completed" as const, progress: 100, estimatedTime: "1.5 hrs" },
  { id: "ACH-2026-78438", car: "Hyundai Venue SX", reg: "UP 80 AB 3456", service: "AC Compressor Repair", technician: "Vikram Singh", status: "completed" as const, progress: 100, estimatedTime: "3 hrs" },
  { id: "ACH-2026-78439", car: "Kia Sonet GTX+", reg: "DL 9C TT 7788", service: "Periodic Service", technician: "Deepak Verma", status: "completed" as const, progress: 100, estimatedTime: "3 hrs" },
];

const pendingApprovals = [
  { jobId: "ACH-2026-78432", car: "Hyundai Creta SX(O)", description: "Front suspension bush replacement recommended", cost: 3500, sentAt: "11:20 AM" },
  { jobId: "ACH-2026-78434", car: "Maruti Ertiga VXi", description: "Flywheel resurfacing needed along with clutch", cost: 2800, sentAt: "10:45 AM" },
];

const newBookingRequests = [
  { id: "BK-901", car: "Tata Harrier XZ+", reg: "DL 7C KK 4455", service: "Full Body Denting & Painting", preferred: "28 Mar, 10 AM", customer: "Rahul Mehta" },
  { id: "BK-902", car: "Maruti Ciaz Alpha", reg: "UP 14 HH 6677", service: "AC Service + Gas Refill", preferred: "28 Mar, 2 PM", customer: "Priya Gupta" },
  { id: "BK-903", car: "Honda Amaze VX", reg: "DL 2C LL 8899", service: "Basic Periodic Service", preferred: "29 Mar, 9 AM", customer: "Vikash Kumar" },
];

const lowStockAlerts = [
  { part: "Brake Pads (Brembo Universal)", remaining: 2, minStock: 10 },
  { part: "Engine Oil 5W-30 (Castrol)", remaining: 3, minStock: 15 },
  { part: "AC Gas R134a Canister", remaining: 1, minStock: 8 },
  { part: "Oil Filter (Maruti OEM)", remaining: 4, minStock: 12 },
];

const recentReviews = [
  { customer: "Anil Kapoor", rating: 5, review: "Excellent service! Car feels brand new after the full service. Raju ji is very skilled and explained everything clearly.", date: "Today, 1:30 PM", jobId: "ACH-2026-78430" },
  { customer: "Sneha Rathi", rating: 3, review: "Service was okay but took longer than estimated. Communication could have been better about the delay.", date: "Yesterday", jobId: "ACH-2026-78420" },
];

const technicians = [
  { name: "Raju Yadav", status: "busy" as const, currentJob: "Hyundai Creta - Brake Pads", utilization: 92, completedToday: 2, rating: 4.8 },
  { name: "Sunil Kumar", status: "busy" as const, currentJob: "Kia Seltos - Standard Service", utilization: 85, completedToday: 2, rating: 4.5 },
  { name: "Mohammad Irfan", status: "busy" as const, currentJob: "Ertiga - Clutch Replacement", utilization: 78, completedToday: 1, rating: 4.7 },
  { name: "Vikram Singh", status: "idle" as const, currentJob: undefined, utilization: 65, completedToday: 2, rating: 4.4 },
  { name: "Amit Sharma", status: "idle" as const, currentJob: undefined, utilization: 55, completedToday: 1, rating: 4.6 },
  { name: "Deepak Verma", status: "idle" as const, currentJob: undefined, utilization: 48, completedToday: 1, rating: 4.3 },
];

const weeklyRevenue = [
  { day: "Mon", amount: 38500 },
  { day: "Tue", amount: 42200 },
  { day: "Wed", amount: 51000 },
  { day: "Thu", amount: 47800 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
];

// --- Helpers ---
function progressColor(pct: number) {
  if (pct >= 70) return "bg-green-500";
  if (pct >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    qc: "bg-purple-100 text-purple-800",
  };
  const labels: Record<string, string> = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
    qc: "QC",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", map[status] || "bg-gray-100 text-gray-700")}>
      {labels[status] || status}
    </span>
  );
}

function bayBorderColor(status: string) {
  if (status === "free") return "border-green-400";
  if (status === "occupied") return "border-blue-400";
  return "border-amber-400";
}

function bayTypeBadge(type: string) {
  const map: Record<string, string> = {
    General: "bg-gray-100 text-gray-700",
    AC: "bg-sky-100 text-sky-700",
    Denting: "bg-orange-100 text-orange-700",
    Electrical: "bg-yellow-100 text-yellow-700",
    EV: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide", map[type] || "bg-gray-100 text-gray-700")}>
      {type}
    </span>
  );
}

// --- Skeleton Components ---
function KPISkeletons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-3 sm:p-4 border border-border space-y-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function BayBoardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-border space-y-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function JobQueueSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-border space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

function PendingActionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-border space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

function RevenueChartSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-border">
      <Skeleton className="h-5 w-40 mb-6" />
      <div className="flex items-end gap-3 h-48">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <Skeleton className={cn("w-full rounded-t-md")} style={{ height: `${30 + Math.random() * 70}%` }} />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnicianGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-border space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

// --- Utilization Ring ---
function UtilizationRing({ pct, size = 48 }: { pct: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold fill-gray-700">
        {pct}%
      </text>
    </svg>
  );
}

// --- Main Dashboard ---
export default function DashboardContent() {
  const [loaded, setLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setChartLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const kpis = [
    { label: "Today's Revenue", value: formatCurrency(dashboardStats.todayRevenue), icon: IndianRupee, trend: "+12%", trendUp: true, bg: "bg-blue-50", iconBg: "bg-blue-100 text-blue-700" },
    { label: "Active Jobs", value: String(dashboardStats.activeJobs), icon: Wrench, trend: undefined, trendUp: undefined, bg: "bg-orange-50", iconBg: "bg-orange-100 text-orange-700" },
    { label: "Completed Today", value: String(dashboardStats.completedToday), icon: CheckCircle2, trend: undefined, trendUp: undefined, bg: "bg-green-50", iconBg: "bg-green-100 text-green-700" },
    { label: "Pending Bookings", value: String(dashboardStats.pendingBookings), icon: Clock, trend: undefined, trendUp: undefined, bg: "bg-amber-50", iconBg: "bg-amber-100 text-amber-700" },
    { label: "Bay Utilization", value: `${dashboardStats.bayUtilization}%`, icon: BarChart3, trend: undefined, trendUp: undefined, bg: "bg-purple-50", iconBg: "bg-purple-100 text-purple-700" },
    { label: "Avg Rating", value: `${dashboardStats.avgRating}/5`, icon: Star, trend: undefined, trendUp: undefined, bg: "bg-yellow-50", iconBg: "bg-yellow-100 text-yellow-700" },
  ];

  const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount), 1);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ===== Section 1: Dashboard Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{workshop.name}</h1>
            {workshop.verified && <BadgeCheck className="w-5 h-5 text-blue-600" />}
          </div>
          <p className="text-sm text-muted mt-0.5">Today, 27 Mar 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" />
            New Walk-in
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <FileText className="w-4 h-4" />
            Create Estimate
          </button>
        </div>
      </div>

      {/* ===== Section 2: KPI Cards ===== */}
      {!loaded ? (
        <KPISkeletons />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className={cn("rounded-xl p-3 sm:p-4 border border-border", kpi.bg)}>
              <div className="flex items-center justify-between mb-2">
                <span className={cn("inline-flex items-center justify-center w-8 h-8 rounded-lg", kpi.iconBg)}>
                  <kpi.icon className="w-4 h-4" />
                </span>
                {kpi.trend && (
                  <span className={cn("flex items-center gap-0.5 text-xs font-semibold", kpi.trendUp ? "text-green-600" : "text-red-600")}>
                    {kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-muted mt-0.5">{kpi.label}</p>
              {kpi.trend && <p className="text-[11px] text-muted mt-0.5">vs yesterday</p>}
            </div>
          ))}
        </div>
      )}

      {/* ===== Section 3: Service Bay Board ===== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CircleDot className="w-5 h-5 text-primary" />
          Service Bay Board
        </h2>
        {!loaded ? (
          <BayBoardSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {bayStatuses.map((bay) => (
              <div key={bay.bayNumber} className={cn("rounded-xl p-3 sm:p-4 bg-white border-2 transition-all", bayBorderColor(bay.status))}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900">Bay {bay.bayNumber}</span>
                  {bayTypeBadge(bay.bayType)}
                </div>

                {bay.status === "free" && (
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-green-700">Available</span>
                  </div>
                )}

                {bay.status === "reserved" && (
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-medium text-amber-700">Reserved</span>
                  </div>
                )}

                {bay.status === "occupied" && bay.vehicleInfo && (
                  <div className="mt-2 space-y-1.5">
                    <p className="text-sm font-semibold text-gray-800 truncate">{bay.vehicleInfo.model}</p>
                    <p className="text-[11px] text-muted font-mono">{bay.vehicleInfo.registrationNo}</p>
                    <p className="text-xs text-gray-600 truncate">{bay.vehicleInfo.service}</p>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <UserCircle className="w-3 h-3" />
                      {bay.vehicleInfo.technicianName}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className={cn("h-1.5 rounded-full transition-all", progressColor(bay.vehicleInfo.progress))} style={{ width: `${bay.vehicleInfo.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-gray-700">{bay.vehicleInfo.progress}%</span>
                      <span className="text-muted flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        ETA {bay.vehicleInfo.eta}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Section 4: Two-Column Layout ===== */}
      {!loaded ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <JobQueueSkeleton />
          </div>
          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <PendingActionsSkeleton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Today's Job Queue */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Today&apos;s Job Queue
              <span className="ml-auto text-xs font-normal text-muted">{todayJobs.length} jobs</span>
            </h2>
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {todayJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-mono text-muted">{job.id}</span>
                    {statusBadge(job.status)}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{job.car}</p>
                  <p className="text-xs text-muted font-mono">{job.reg}</p>
                  <p className="text-xs text-gray-600 mt-1">{job.service}</p>
                  <div className="flex items-center gap-1 text-xs text-muted mt-1">
                    <UserCircle className="w-3 h-3" />
                    {job.technician}
                    <span className="ml-auto flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {job.estimatedTime}
                    </span>
                  </div>
                  {job.status !== "completed" && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className={cn("h-1.5 rounded-full transition-all", progressColor(job.progress))} style={{ width: `${job.progress}%` }} />
                      </div>
                    </div>
                  )}
                  <button className="mt-2 text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                    <Eye className="w-3 h-3" />
                    View Job Card
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pending Actions */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              Pending Actions
            </h2>

            {/* Pending Customer Approvals */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Pending Customer Approvals
                <span className="ml-1 bg-amber-100 text-amber-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{pendingApprovals.length}</span>
              </h3>
              <div className="space-y-2">
                {pendingApprovals.map((item) => (
                  <div key={item.jobId} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.car}</p>
                        <p className="text-xs text-muted mt-0.5">{item.description}</p>
                      </div>
                      <span className="text-sm font-bold text-amber-700">{formatCurrency(item.cost)}</span>
                    </div>
                    <p className="text-[11px] text-muted mt-1">Sent at {item.sentAt} &middot; {item.jobId}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* New Booking Requests */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                New Booking Requests
                <span className="ml-1 bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{newBookingRequests.length}</span>
              </h3>
              <div className="space-y-2">
                {newBookingRequests.map((req) => (
                  <div key={req.id} className="bg-white rounded-lg p-3 border border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{req.car}</p>
                        <p className="text-xs text-muted">{req.service}</p>
                        <p className="text-xs text-muted mt-0.5">{req.customer} &middot; {req.preferred}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700 transition-colors">
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-white border border-red-300 text-red-600 rounded-md text-xs font-medium hover:bg-red-50 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-red-500" />
                Low Stock Alerts
                <span className="ml-1 bg-red-100 text-red-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{lowStockAlerts.length}</span>
              </h3>
              <div className="space-y-2">
                {lowStockAlerts.map((item) => (
                  <div key={item.part} className="bg-red-50 rounded-lg p-3 border border-red-200 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.part}</p>
                      <p className="text-xs text-red-600 font-semibold">{item.remaining} left (min: {item.minStock})</p>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition-colors shrink-0">
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                Recent Reviews
              </h3>
              <div className="space-y-2">
                {recentReviews.map((review) => (
                  <div key={review.jobId} className="bg-white rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{review.customer}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{review.review}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-muted">{review.date}</span>
                      <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                        <MessageSquare className="w-3 h-3" />
                        Respond
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Section 5: Revenue Chart ===== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Weekly Revenue
        </h2>
        {!chartLoaded ? (
          <RevenueChartSkeleton />
        ) : (
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-end gap-2 sm:gap-4 h-52">
              {weeklyRevenue.map((day) => {
                const heightPct = maxRevenue > 0 ? (day.amount / maxRevenue) * 100 : 0;
                const isToday = day.day === "Thu";
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                    {day.amount > 0 && (
                      <span className="text-[10px] font-semibold text-gray-600 hidden sm:block">
                        {formatCurrency(day.amount)}
                      </span>
                    )}
                    <div
                      className={cn(
                        "w-full rounded-t-md transition-all min-h-[4px]",
                        isToday ? "bg-primary" : day.amount > 0 ? "bg-blue-300" : "bg-gray-200"
                      )}
                      style={{ height: `${Math.max(heightPct, 2)}%` }}
                    />
                    <span className={cn("text-xs font-medium", isToday ? "text-primary font-bold" : "text-gray-500")}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <p className="text-sm text-muted">This week&apos;s total: <span className="font-semibold text-gray-900">{formatCurrency(weeklyRevenue.reduce((s, d) => s + d.amount, 0))}</span></p>
              <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                View Full Report
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== Section 6: Technician Status Grid ===== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Technician Status
        </h2>
        {!loaded ? (
          <TechnicianGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicians.map((tech) => (
              <div key={tech.name} className="bg-white rounded-xl p-4 border border-border flex items-center gap-4">
                <UtilizationRing pct={tech.utilization} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{tech.name}</p>
                  {tech.status === "busy" ? (
                    <p className="text-xs text-blue-600 truncate">{tech.currentJob}</p>
                  ) : (
                    <p className="text-xs text-green-600 font-medium">Idle</p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted">
                    <span className="flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      {tech.completedToday} done
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-500" />
                      {tech.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Section 7: Quick Actions Footer ===== */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: "Manage Inventory", icon: Package },
            { label: "Pricing Rules", icon: IndianRupee },
            { label: "Customer CRM", icon: Users },
            { label: "View Reports", icon: BarChart3 },
            { label: "Settings", icon: Settings },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-border rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              <action.icon className="w-4 h-4 text-muted" />
              {action.label}
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
