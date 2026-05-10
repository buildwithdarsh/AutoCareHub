"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Wrench, Search, Car, Clock, History, AlertTriangle, LayoutDashboard,
  HardHat, Shield, Menu, X, ChevronDown, User, Bell, MapPin
} from "lucide-react";

// Flat items (no dropdown)
const flatCustomerNav = [
  { href: "/workshops", label: "Find Workshops", icon: Search },
];

// Grouped dropdown menus for desktop
const customerMenus = [
  {
    label: "My Car",
    items: [
      { href: "/garage", label: "My Garage", icon: Car, description: "Manage your vehicles" },
      { href: "/services", label: "Services", icon: Wrench, description: "Browse service categories" },
      { href: "/tracking", label: "Track Service", icon: Clock, description: "Live service tracking" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/history", label: "Service History", icon: History, description: "Past service records" },
      { href: "/emergency", label: "SOS", icon: AlertTriangle, description: "Emergency roadside help" },
      { href: "/plans", label: "AMC Plans", icon: Shield, description: "Annual maintenance contracts" },
    ],
  },
];

// All customer nav items flat (for mobile)
const allCustomerNav = [
  { href: "/workshops", label: "Find Workshops", icon: Search },
  { href: "/garage", label: "My Garage", icon: Car },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/tracking", label: "Track Service", icon: Clock },
  { href: "/history", label: "Service History", icon: History },
  { href: "/emergency", label: "SOS", icon: AlertTriangle },
  { href: "/plans", label: "AMC Plans", icon: Shield },
];

const businessNav = [
  { href: "/dashboard", label: "Workshop Dashboard", icon: LayoutDashboard },
  { href: "/mechanic", label: "Mechanic Panel", icon: HardHat },
];

function NavDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isActive = items.some((item) => pathname === item.href);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
        <div className="w-64 bg-white rounded-xl shadow-lg border border-border py-2 animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-start gap-3 px-4 py-2.5 transition-colors",
                pathname === item.href
                  ? "bg-primary/5 text-primary"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  const isBusinessRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/mechanic");

  // Static brochure page has its own navbar
  if (pathname.startsWith("/static")) return null;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-xl flex items-center justify-center">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-primary-dark">
                AutoCare<span className="text-accent">Hub</span>
              </span>
            </Link>

            {/* Desktop nav with dropdown menus - show from lg (1024px) */}
            <div className="hidden lg:flex items-center gap-0.5">
              {isBusinessRoute ? (
                businessNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                ))
              ) : (
                <>
                  {/* Flat nav items */}
                  {flatCustomerNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                  {/* Dropdown menus */}
                  {customerMenus.map((menu) => (
                    <NavDropdown
                      key={menu.label}
                      label={menu.label}
                      items={menu.items}
                      pathname={pathname}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Portal switcher */}
              <div className="relative">
                <button
                  onClick={() => setPortalOpen(!portalOpen)}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-muted bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isBusinessRoute ? "Business" : "Customer"} Portal
                  <ChevronDown className="w-3 h-3" />
                </button>
                {portalOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-border py-1 w-52 z-50">
                    <Link
                      href="/workshops"
                      onClick={() => setPortalOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700"
                    >
                      <User className="w-4 h-4" /> Customer Portal
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setPortalOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Workshop Dashboard
                    </Link>
                    <Link
                      href="/mechanic"
                      onClick={() => setPortalOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700"
                    >
                      <HardHat className="w-4 h-4" /> Mechanic Panel
                    </Link>
                  </div>
                )}
              </div>

              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              </button>

              <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-muted hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="hidden md:inline">Noida, UP</span>
              </button>

              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>

              {/* Mobile/tablet toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/tablet nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white pb-4 max-h-[calc(100dvh-3.5rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="px-4 sm:px-6 py-2">
              {/* Location on mobile */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 mb-1 text-sm text-muted sm:hidden">
                <MapPin className="w-4 h-4" />
                Noida, UP
              </div>

              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-2">Customer</p>
              {allCustomerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4">Business</p>
              {businessNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              {/* Portal switcher on mobile */}
              <div className="md:hidden border-t border-border mt-3 pt-3">
                <Link
                  href={isBusinessRoute ? "/workshops" : "/dashboard"}
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-3 py-2 text-xs font-medium text-muted bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Switch to {isBusinessRoute ? "Customer" : "Business"} Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {portalOpen && <div className="fixed inset-0 z-40" onClick={() => setPortalOpen(false)} />}
    </>
  );
}
