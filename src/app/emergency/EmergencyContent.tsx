"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  emergencyTypes,
  emergencyResponders,
  userCars,
  type EmergencyType,
  type EmergencyResponder,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  MapPin,
  Phone,
  Navigation,
  Shield,
  Clock,
  Star,
  CheckCircle2,
  X,
  BatteryWarning,
  CircleDot,
  Flame,
  Truck,
  KeyRound,
  Fuel,
  Users,
} from "lucide-react";

// ---- Icon Map ----

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BatteryWarning,
  Circle: CircleDot,
  Flame,
  Truck,
  KeyRound,
  Fuel,
};

// ---- Emergency Tips ----

const EMERGENCY_TIPS: Record<string, string[]> = {
  "em-battery": [
    "Turn off all electronics (AC, headlights, stereo)",
    "Do NOT attempt to push-start automatic cars",
    "Keep hazard lights on if parked on the road",
  ],
  "em-tyre": [
    "Move the car to a safe shoulder if possible",
    "Turn on hazard lights immediately",
    "Place the warning triangle 50m behind the car",
    "Do NOT stand behind the vehicle on the highway",
  ],
  "em-overheat": [
    "Turn off the AC immediately",
    "Turn the heater ON to draw heat from the engine",
    "Do NOT open the radiator cap while hot",
    "Pull over safely and turn off the engine",
  ],
  "em-tow": [
    "Shift to Neutral (N) or Park (P)",
    "Ensure the steering is unlocked",
    "Note any warning lights on the dashboard",
    "Remove valuables before towing",
  ],
  "em-lockout": [
    "Check all doors and boot for an opening",
    "Do NOT try to force open the door",
    "Keep your phone charged for communication",
    "Stay near the vehicle in a safe area",
  ],
  "em-fuel": [
    "Do NOT try to start the car on wrong fuel",
    "Turn on hazard lights and move to a safe spot",
    "Inform the responder about fuel type and quantity",
    "Keep engine off if wrong fuel was added",
  ],
};

// ---- Flow Steps ----

type FlowStep = "select-type" | "select-responder" | "confirmed";

// ---- Page Component ----

export default function EmergencyContent() {
  const [step, setStep] = useState<FlowStep>("select-type");
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [loadingResponders, setLoadingResponders] = useState(false);
  const [showResponders, setShowResponders] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState<EmergencyResponder | null>(null);
  const [etaSeconds, setEtaSeconds] = useState(0);
  const [contactsNotified, setContactsNotified] = useState(false);

  const activeCar = userCars[0];

  // Handle emergency type selection
  const handleSelectType = useCallback((type: EmergencyType) => {
    setSelectedType(type);
    setShowResponders(false);
    setLoadingResponders(true);
    setStep("select-responder");

    // Simulate 600ms delay for loading responders
    setTimeout(() => {
      setLoadingResponders(false);
      setShowResponders(true);
    }, 600);
  }, []);

  // Handle responder request
  const handleRequestHelp = useCallback((responder: EmergencyResponder) => {
    setSelectedResponder(responder);
    setStep("confirmed");

    // Parse ETA to get seconds for countdown
    const etaMatch = responder.eta.match(/(\d+)/);
    const etaMinutes = etaMatch ? parseInt(etaMatch[1]) : 15;
    setEtaSeconds(etaMinutes * 60);
  }, []);

  // ETA countdown
  useEffect(() => {
    if (step !== "confirmed" || etaSeconds <= 0) return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, etaSeconds]);

  // Cancel request
  const handleCancel = useCallback(() => {
    setStep("select-type");
    setSelectedType(null);
    setSelectedResponder(null);
    setShowResponders(false);
    setLoadingResponders(false);
    setContactsNotified(false);
    setEtaSeconds(0);
  }, []);

  // Format seconds to mm:ss
  const formatEta = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SOS Header */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/20 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Emergency Roadside Assistance
              </h1>
              <p className="text-red-100 mt-1 sm:mt-2 text-sm sm:text-base">
                Help is on the way. Select your emergency type.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                </span>
                <span className="flex items-center gap-1 text-sm text-red-100">
                  <MapPin className="h-3.5 w-3.5" />
                  Your location: Sector 62, Noida, UP
                </span>
              </div>
            </div>
          </div>

          {/* Active car info */}
          {activeCar && (
            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
              <Navigation className="h-4 w-4" />
              <span>
                {activeCar.make} {activeCar.model} &bull; {activeCar.registrationNumber}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Step 1: Emergency Type Selection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            What happened?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyTypes.map((type) => {
              const Icon = ICON_MAP[type.icon] || AlertTriangle;
              const isSelected = selectedType?.id === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type)}
                  disabled={step === "confirmed"}
                  className={cn(
                    "relative text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200",
                    "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
                    isSelected
                      ? "border-red-500 bg-red-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-red-300",
                    step === "confirmed" && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                        isSelected
                          ? "bg-red-600 text-white"
                          : "bg-red-100 text-red-600"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {type.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Est. {type.estimatedCost}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600">
                      <Clock className="h-3 w-3" />
                      {type.avgEta}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="absolute top-2 right-2">
                      <CheckCircle2 className="h-5 w-5 text-red-600" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Responder Selection */}
        {step !== "select-type" && step !== "confirmed" && (
          <section className="animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              Available Responders Nearby
            </h2>

            {loadingResponders ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 flex items-center gap-4"
                  >
                    <div className="h-14 w-14 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                      <div className="h-3 w-1/2 bg-gray-200 rounded" />
                      <div className="h-3 w-1/4 bg-gray-200 rounded" />
                    </div>
                    <div className="h-9 w-28 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : showResponders ? (
              <div className="space-y-4">
                {emergencyResponders.map((responder) => (
                  <div
                    key={responder.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    {/* Photo */}
                    <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-gray-200">
                      <Image
                        src={responder.photo}
                        alt={responder.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {responder.name}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            responder.type === "tow-truck"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {responder.type === "tow-truck"
                            ? "Tow Truck"
                            : "Mobile Mechanic"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900">
                            {responder.rating}
                          </span>
                        </span>
                        <span>{responder.jobsCompleted} jobs</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {responder.distance} km away
                        </span>
                        <span className="flex items-center gap-1 font-medium text-red-600">
                          <Clock className="h-3 w-3" />
                          ETA {responder.eta}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 mt-1">
                        {responder.vehicleInfo}
                      </p>
                    </div>

                    {/* Request button */}
                    <button
                      onClick={() => handleRequestHelp(responder)}
                      className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-colors shrink-0"
                    >
                      Request Help
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* Step 3: Confirmation */}
        {step === "confirmed" && selectedResponder && selectedType && (
          <section className="animate-slide-up">
            <div className="rounded-2xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-3">
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <CheckCircle2 className="relative h-8 w-8 text-green-600" />
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">
                  Help is on the way!
                </h2>
                <p className="text-green-600 text-sm mt-1">
                  Your request has been confirmed
                </p>
              </div>

              {/* Responder details */}
              <div className="bg-white rounded-xl border border-green-200 p-5 mb-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-green-300">
                    <Image
                      src={selectedResponder.photo}
                      alt={selectedResponder.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {selectedResponder.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedResponder.vehicleInfo}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{selectedResponder.rating}</span>
                      <span className="text-gray-400">
                        ({selectedResponder.jobsCompleted} jobs)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live ETA */}
              <div className="bg-white rounded-xl border border-green-200 p-5 mb-5 text-center">
                <p className="text-sm text-gray-500 mb-1">Estimated Arrival</p>
                <div className="text-4xl font-bold text-red-600 font-mono">
                  {formatEta(etaSeconds)}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Live countdown
                </p>
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-100 rounded-xl border border-green-200 h-40 sm:h-48 flex items-center justify-center mb-5">
                <div className="text-center text-gray-400">
                  <Navigation className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-medium">Tracking live on map...</p>
                  <p className="text-xs mt-0.5">
                    {selectedResponder.name} is {selectedResponder.distance} km away
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${selectedResponder.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Responder
                </a>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg border-2 border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel Request
                </button>
              </div>

              {/* Emergency tips */}
              <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-4">
                <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Safety Tips - {selectedType.name}
                </h4>
                <ul className="space-y-1.5">
                  {(EMERGENCY_TIPS[selectedType.id] || []).map((tip, i) => (
                    <li
                      key={i}
                      className="text-sm text-amber-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Emergency Contacts */}
        <section className="animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-red-600" />
            Emergency Contacts
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-600 mb-4">
              Notify your emergency contacts about your current situation.
            </p>
            <div className="space-y-3 mb-4">
              {[
                { name: "Rahul Sharma", relation: "Spouse", phone: "+91 98765 00001" },
                { name: "Priya Sharma", relation: "Parent", phone: "+91 98765 00002" },
              ].map((contact) => (
                <div
                  key={contact.phone}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contact.relation} &bull; {contact.phone}
                    </p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={() => setContactsNotified(true)}
              disabled={contactsNotified}
              className={cn(
                "w-full py-2.5 text-sm font-semibold rounded-lg transition-colors",
                contactsNotified
                  ? "bg-green-100 text-green-700 cursor-default"
                  : "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              {contactsNotified ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Contacts Notified
                </span>
              ) : (
                "Notify All Contacts"
              )}
            </button>
          </div>
        </section>

        {/* Insurance SOS */}
        {activeCar && (
          <section className="animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Insurance SOS
            </h2>
            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Connect to your motor insurance helpline
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {activeCar.insurerName} &bull; Policy: {activeCar.policyNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeCar.make} {activeCar.model} &bull;{" "}
                    {activeCar.registrationNumber}
                  </p>
                </div>
                <a
                  href="tel:18001234567"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call {activeCar.insurerName}
                </a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
