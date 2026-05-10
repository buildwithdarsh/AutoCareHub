"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { userCars, type CarProfile } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import {
  Car,
  Plus,
  Fuel,
  Settings,
  Calendar,
  Shield,
  AlertTriangle,
  Gauge,
  Edit,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Skeleton } from "@/components/Skeleton";

function maskRegistration(reg: string): string {
  const parts = reg.split(" ");
  if (parts.length === 4) {
    return `${parts[0]} ${parts[1]} \u2022\u2022 ${parts[3]}`;
  }
  return reg;
}

function getColorDot(colorName: string): string {
  const lower = colorName.toLowerCase();
  if (lower.includes("grey") || lower.includes("gray")) return "bg-gray-500";
  if (lower.includes("white")) return "bg-gray-200 border border-gray-300";
  if (lower.includes("black")) return "bg-gray-900";
  if (lower.includes("red")) return "bg-red-500";
  if (lower.includes("blue")) return "bg-blue-500";
  if (lower.includes("silver")) return "bg-gray-400";
  if (lower.includes("green")) return "bg-green-500";
  return "bg-gray-400";
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function serviceProgress(car: CarProfile): number {
  const lastServiceKm = car.nextServiceDueKm - 10000;
  const totalInterval = car.nextServiceDueKm - lastServiceKm;
  const driven = car.odometer - lastServiceKm;
  return Math.min(100, Math.max(0, Math.round((driven / totalInterval) * 100)));
}

function GarageCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function CarCard({ car }: { car: CarProfile }) {
  const insuranceDays = daysUntil(car.insuranceExpiry);
  const progress = serviceProgress(car);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in">
      {/* Car Image */}
      <div className="relative aspect-[3/2] bg-gray-100">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model}`}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700">
          {car.year}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Make / Model / Variant */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-muted">{car.variant}</p>
        </div>

        {/* Registration */}
        <p className="text-sm font-mono font-medium text-gray-700 bg-gray-50 inline-block px-2.5 py-1 rounded-md">
          {maskRegistration(car.registrationNumber)}
        </p>

        {/* Fuel + Transmission badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            <Fuel className="w-3 h-3" />
            {car.fuelType}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            <Settings className="w-3 h-3" />
            {car.transmission}
          </span>
        </div>

        {/* Odometer */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Gauge className="w-4 h-4 text-muted" />
          <span className="font-medium">{car.odometer.toLocaleString("en-IN")} km</span>
        </div>

        {/* Color */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className={cn("w-3.5 h-3.5 rounded-full shrink-0", getColorDot(car.color))} />
          {car.color}
        </div>

        {/* Service Info */}
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-gray-600">Next service:</span>
            <span className="font-medium text-gray-800">
              {formatDate(car.nextServiceDue)} / {car.nextServiceDueKm.toLocaleString("en-IN")} km
            </span>
          </div>

          {/* Service progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted">
              <span>Service interval</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  progress >= 80 ? "bg-danger" : progress >= 60 ? "bg-warning" : "bg-success"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Insurance & PUC */}
        <div className="space-y-1.5 border-t border-border pt-3">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-muted" />
            <span className="text-gray-600">Insurance:</span>
            <span
              className={cn(
                "font-medium",
                insuranceDays <= 30 ? "text-danger" : "text-gray-800"
              )}
            >
              {formatDate(car.insuranceExpiry)}
            </span>
            {insuranceDays <= 30 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-danger bg-red-50 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                {insuranceDays <= 0 ? "Expired" : `${insuranceDays}d left`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-gray-600">PUC:</span>
            <span className="font-medium text-gray-800">
              {car.pucExpiry === "N/A" ? "Not Applicable" : formatDate(car.pucExpiry)}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary-dark transition-colors">
            <Car className="w-3.5 h-3.5" />
            Book Service
          </button>
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
            View History
          </button>
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <Edit className="w-3.5 h-3.5" />
            Update Odometer
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceReminders({ cars }: { cars: CarProfile[] }) {
  const reminders = cars
    .map((car) => ({
      car: `${car.make} ${car.model}`,
      date: car.nextServiceDue,
      km: car.nextServiceDueKm,
      daysLeft: daysUntil(car.nextServiceDue),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Upcoming Service Reminders
      </h2>
      <div className="space-y-3">
        {reminders.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  r.daysLeft <= 30 ? "bg-red-50" : r.daysLeft <= 60 ? "bg-amber-50" : "bg-green-50"
                )}
              >
                <Car
                  className={cn(
                    "w-5 h-5",
                    r.daysLeft <= 30
                      ? "text-danger"
                      : r.daysLeft <= 60
                        ? "text-warning"
                        : "text-success"
                  )}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{r.car}</p>
                <p className="text-xs text-muted">
                  {formatDate(r.date)} &middot; {r.km.toLocaleString("en-IN")} km
                </p>
              </div>
            </div>
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full",
                r.daysLeft <= 30
                  ? "bg-red-50 text-danger"
                  : r.daysLeft <= 60
                    ? "bg-amber-50 text-amber-700"
                    : "bg-green-50 text-success"
              )}
            >
              {r.daysLeft <= 0 ? "Overdue" : `${r.daysLeft} days`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const makes = ["Hyundai", "Maruti Suzuki", "Tata", "Honda", "Toyota", "Kia", "Mahindra", "MG"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const transmissions = ["Manual", "Automatic", "CVT", "AMT", "DCT"];

function AddCarForm() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add New Car
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <select className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
            <option value="">Select make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <input
            type="text"
            placeholder="e.g. Creta, Swift"
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
          <input
            type="text"
            placeholder="e.g. SX(O) 1.5 Turbo"
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="number"
            placeholder="2024"
            min={2000}
            max={2026}
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
          <input
            type="text"
            placeholder="DL 4C AB 1234"
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none uppercase"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <select className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
            <option value="">Select fuel type</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
          <select className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
            <option value="">Select transmission</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <input
            type="text"
            placeholder="e.g. Titan Grey"
            className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
          Add Car
        </button>
        <button className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function GarageContent() {
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <Car className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
            My Garage
          </h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading your vehicles..." : `${userCars.length} vehicles registered`}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Car</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Add Car Form */}
      {showAddForm && (
        <div className="mb-8">
          <AddCarForm />
        </div>
      )}

      {/* Car Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <GarageCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {/* Service Reminders */}
      {!loading && <ServiceReminders cars={userCars} />}
    </div>
  );
}
