"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn, delay } from "@/lib/utils";
import { Skeleton } from "@/components/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Settings,
  Snowflake,
  PaintBucket,
  CircleDot,
  Battery,
  Disc3,
  Droplets,
  ShieldCheck,
  Search,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUp,
  Quote,
  Send,
  CheckCircle,
  Award,
  Users,
  Car,
  type LucideIcon,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SERVICES: {
  icon: LucideIcon;
  name: string;
  description: string;
}[] = [
  {
    icon: Settings,
    name: "General Service & Maintenance",
    description:
      "Comprehensive multi-point inspection, oil change, filter replacement, and fluid top-up to keep your vehicle running at peak performance.",
  },
  {
    icon: Wrench,
    name: "Engine Repair & Overhaul",
    description:
      "Complete engine diagnostics using OBD-II scanners, cylinder head reconditioning, timing belt replacement, and full engine rebuilds.",
  },
  {
    icon: Snowflake,
    name: "AC Service & Repair",
    description:
      "Gas recharge, compressor repair, condenser cleaning, cabin filter replacement, and complete HVAC system diagnostics for all seasons.",
  },
  {
    icon: PaintBucket,
    name: "Denting & Painting",
    description:
      "Precision PDR dent removal, scratch repair, full-body repainting with manufacturer-matched colors, and ceramic clear-coat finishing.",
  },
  {
    icon: CircleDot,
    name: "Wheel Alignment & Balancing",
    description:
      "3D computerized wheel alignment, dynamic balancing, tire rotation, and suspension geometry checks for smoother, safer driving.",
  },
  {
    icon: Battery,
    name: "Battery & Electrical",
    description:
      "Battery health testing, alternator diagnostics, starter motor repair, wiring harness inspection, and complete electrical system overhaul.",
  },
  {
    icon: Disc3,
    name: "Brake Service",
    description:
      "Brake pad and disc replacement, ABS diagnostics, brake fluid flush, caliper reconditioning, and handbrake cable adjustment.",
  },
  {
    icon: Droplets,
    name: "Car Wash & Detailing",
    description:
      "Foam wash, interior deep cleaning, engine bay wash, ceramic coating, paint correction, and premium wax polishing packages.",
  },
  {
    icon: ShieldCheck,
    name: "Insurance Claim Repairs",
    description:
      "Hassle-free insurance claim processing with direct billing to major insurers. Complete accident repair, documentation, and survey coordination.",
  },
  {
    icon: Search,
    name: "Pre-Purchase Inspection",
    description:
      "200-point inspection checklist for used car buyers covering engine health, transmission, suspension, body integrity, and electrical systems.",
  },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop", alt: "Workshop bay with lifts and tools" },
  { src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop", alt: "Mechanic working under the hood" },
  { src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&h=600&fit=crop", alt: "Engine repair in progress" },
  { src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop", alt: "Car painting booth" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop", alt: "Restored classic car — after" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop", alt: "Pristine finished vehicle" },
  { src: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop", alt: "Wheel alignment machine in use" },
  { src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop", alt: "Diagnostic equipment and scanners" },
];

const BRANDS = [
  { name: "Maruti Suzuki", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Suzuki_Motor_Corporation_logo.svg/200px-Suzuki_Motor_Corporation_logo.svg.png" },
  { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png" },
  { name: "Tata Motors", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png" },
  { name: "Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mahindra_logo.svg/200px-Mahindra_logo.svg.png" },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/200px-Honda_logo.svg.png" },
  { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.png/200px-Kia-logo.png" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png" },
  { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png" },
  { name: "Skoda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/%C5%A0koda_Auto.svg/200px-%C5%A0koda_Auto.svg.png" },
  { name: "MG Motor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/MG_Motor_2021_logo.svg/200px-MG_Motor_2021_logo.svg.png" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Malhotra",
    car: "Hyundai Creta 2023",
    rating: 5,
    text: "Outstanding service! They diagnosed a persistent AC issue that two other workshops couldn't figure out. Fixed it the same day and the cooling has been perfect since. Highly recommended for anyone in Noida.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Priya Sharma",
    car: "Maruti Suzuki Swift 2021",
    rating: 5,
    text: "Got my car's denting and painting done here after a minor fender-bender. The color matching is flawless — you literally cannot tell where the damage was. Plus they handled the insurance claim paperwork end-to-end.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Amit Verma",
    car: "BMW 3 Series 2020",
    rating: 4,
    text: "I was skeptical about getting my BMW serviced at an independent workshop, but AutoCare Hub has genuine diagnostic tools and their head mechanic clearly knows German engineering. Saved me about 40% compared to the authorized service center.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sneha Kapoor",
    car: "Tata Nexon EV 2024",
    rating: 5,
    text: "They did a pre-purchase inspection on a used Nexon EV I was considering and found a battery degradation issue the seller hadn't disclosed. Saved me from a terrible deal. Thorough, honest, and professional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

const TEAM = [
  {
    name: "Vikram Singh",
    role: "Master Technician & Founder",
    certifications: "ASE Master Certified, Bosch Diagnostics Expert",
    experience: "22 years",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Deepak Kumar",
    role: "Senior Engine Specialist",
    certifications: "ASE Certified, Toyota T-TEN Graduate",
    experience: "15 years",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Mohammad Arif",
    role: "Body & Paint Expert",
    certifications: "Sikkens Certified Refinisher, PPG Certified",
    experience: "18 years",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Anita Rao",
    role: "Electrical & Diagnostics Lead",
    certifications: "Bosch Certified, EV Systems Trained",
    experience: "10 years",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
];

const FAQ_ITEMS = [
  {
    question: "Do you offer pickup and drop?",
    answer:
      "Yes! We offer complimentary pickup and drop within a 10 km radius of our workshop for all services above ₹3,000. For services below that amount, we charge a nominal ₹200 for the round trip. Just let us know your preferred time when you contact us.",
  },
  {
    question: "What's the typical turnaround time?",
    answer:
      "General service and maintenance typically takes 3–4 hours. Engine repairs range from 1–3 days depending on complexity. Denting and painting jobs usually take 2–5 days based on the extent of work. We'll always give you an accurate estimate before starting.",
  },
  {
    question: "Do you handle insurance claims?",
    answer:
      "Absolutely. We're empaneled with all major insurers including ICICI Lombard, HDFC ERGO, Bajaj Allianz, New India Assurance, and more. We handle the entire claims process — from surveyor coordination to documentation to direct cashless billing.",
  },
  {
    question: "Is there a warranty on repairs?",
    answer:
      "Yes. All our repairs come with a minimum 6-month / 10,000 km warranty (whichever comes first). Engine overhauls carry a 12-month warranty. Paint jobs are warranted for 2 years against peeling and fading under normal conditions.",
  },
  {
    question: "Do you service luxury/imported cars?",
    answer:
      "We do. Our workshop is equipped with manufacturer-specific diagnostic tools for BMW, Mercedes-Benz, Audi, Volkswagen, and other European and Japanese luxury brands. Our senior technicians have received brand-specific training and certification.",
  },
];

const SERVICE_TYPES = [
  "General Service",
  "Repair",
  "Denting/Painting",
  "AC Service",
  "Other",
];

// ─── Section Loading States ───────────────────────────────────────────────────

type SectionKey =
  | "hero"
  | "about"
  | "services"
  | "gallery"
  | "brands"
  | "testimonials"
  | "team"
  | "faq"
  | "contact";

const SECTION_DELAYS: Record<SectionKey, [number, number]> = {
  hero: [800, 1200],
  about: [900, 1100],
  services: [800, 1000],
  gallery: [1800, 2500], // Slow — simulates heavy image load
  brands: [400, 700],
  testimonials: [600, 900],
  team: [500, 800],
  faq: [300, 500],
  contact: [400, 600],
};

function useSectionLoader() {
  const [loaded, setLoaded] = useState<Record<SectionKey, boolean>>({
    hero: false,
    about: false,
    services: false,
    gallery: false,
    brands: false,
    testimonials: false,
    team: false,
    faq: false,
    contact: false,
  });

  useEffect(() => {
    const keys = Object.keys(SECTION_DELAYS) as SectionKey[];
    keys.forEach(async (key) => {
      const [min, max] = SECTION_DELAYS[key];
      const ms = Math.floor(Math.random() * (max - min + 1)) + min;
      await delay(ms);
      setLoaded((prev) => ({ ...prev, [key]: true }));
    });
  }, []);

  return loaded;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#brands", label: "Brands" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

function StaticNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-gray-950" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">
              AutoCare<span className="text-amber-400">Hub</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 text-sm font-semibold rounded-lg transition-colors"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/98 backdrop-blur-md border-t border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-gray-950 text-sm font-bold rounded-lg text-center transition-colors"
              >
                Get a Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  className,
  children,
  dark = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        dark ? "bg-gray-950 text-white" : "bg-white text-gray-900",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold mb-4",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-lg max-w-2xl mx-auto",
          light ? "text-gray-400" : "text-gray-500"
        )}
      >
        {subtitle}
      </p>
      <div className="mt-4 mx-auto w-20 h-1 bg-amber-500 rounded-full" />
    </div>
  );
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <div className="relative h-[90vh] min-h-[600px] bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <Skeleton className="h-6 w-48 mx-auto !bg-gray-800" />
        <Skeleton className="h-14 w-[500px] max-w-full mx-auto !bg-gray-800" />
        <Skeleton className="h-6 w-[400px] max-w-full mx-auto !bg-gray-800" />
        <Skeleton className="h-14 w-56 mx-auto rounded-xl !bg-gray-800" />
      </div>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl border border-gray-200 space-y-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl !bg-gray-800" />
      ))}
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full !bg-gray-800" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 !bg-gray-800" />
              <Skeleton className="h-3 w-24 !bg-gray-800" />
            </div>
          </div>
          <Skeleton className="h-4 w-full !bg-gray-800" />
          <Skeleton className="h-4 w-5/6 !bg-gray-800" />
        </div>
      ))}
    </div>
  );
}

function ContactSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=1080&fit=crop"
        alt="Auto workshop bay with vehicles being serviced"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/60 to-gray-950/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Award className="w-4 h-4" />
            Trusted by 50,000+ Car Owners Since 2004
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Car Deserves <br />
            <span className="text-amber-400">the Best Care</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Expert auto service with 20+ years of experience. From routine
            maintenance to complex engine overhauls — we treat every car like
            our own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-950 text-lg font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Get a Free Quote
              <Send className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-xl border border-white/20 transition-all"
            >
              Our Services
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [
    { icon: Clock, value: "20+", label: "Years of Experience" },
    { icon: Car, value: "50,000+", label: "Cars Serviced" },
    { icon: Award, value: "ASE", label: "Certified Technicians" },
    { icon: Users, value: "35+", label: "Expert Team Members" },
  ];

  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Side */}
        <div className="relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=800&h=600&fit=crop"
              alt="AutoCare Hub workshop interior with professional equipment"
              fill
              className="object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-amber-500 text-gray-950 px-6 py-4 rounded-2xl shadow-xl">
            <p className="text-3xl font-bold">20+</p>
            <p className="text-sm font-semibold">Years Strong</p>
          </div>
        </div>

        {/* Text Side */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Noida&apos;s Most Trusted <span className="text-amber-500">Auto Workshop</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Founded in 2004, AutoCare Hub started as a two-bay garage with a
            simple mission: deliver dealership-quality service at honest prices.
            Today, we operate a state-of-the-art 12-bay facility equipped with
            the latest diagnostic technology and staffed by ASE-certified
            technicians.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We&apos;re an authorized service partner for multiple brands and hold
            certifications from Bosch, Wurth, and 3M. Whether it&apos;s a routine oil
            change or a complete engine rebuild, every vehicle gets the same
            meticulous attention to detail.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <stat.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <Section id="services" className="!bg-gray-50">
      <SectionHeader
        title="Our Services"
        subtitle="Complete auto care under one roof — from routine maintenance to major repairs, we've got you covered."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div
            key={service.name}
            className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-gray-950 transition-colors">
              <service.icon className="w-7 h-7 text-amber-600 group-hover:text-gray-950 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <Section id="gallery" dark>
      <SectionHeader
        title="Our Workshop"
        subtitle="Take a peek inside our state-of-the-art facility and see our team in action."
        light
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === 0
                    ? GALLERY_IMAGES.length - 1
                    : lightboxIndex - 1
                );
              }}
              className="absolute left-4 text-white/70 hover:text-white p-2"
            >
              <ChevronUp className="w-8 h-8 -rotate-90" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === GALLERY_IMAGES.length - 1
                    ? 0
                    : lightboxIndex + 1
                );
              }}
              className="absolute right-4 text-white/70 hover:text-white p-2"
            >
              <ChevronDown className="w-8 h-8 -rotate-90" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex].src.replace(
                  "w=800&h=600",
                  "w=1600&h=1000"
                )}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                fill
                className="object-contain"
              />
            </motion.div>
            <p className="absolute bottom-6 text-white/60 text-sm">
              {GALLERY_IMAGES[lightboxIndex].alt} — {lightboxIndex + 1} /{" "}
              {GALLERY_IMAGES.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// ─── Brands Section ───────────────────────────────────────────────────────────

function BrandsSection() {
  return (
    <Section id="brands">
      <SectionHeader
        title="Brands We Service"
        subtitle="We service all major domestic and international automobile brands with genuine parts and expertise."
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="relative w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <p className="text-xs font-medium text-gray-500 text-center group-hover:text-gray-900 transition-colors">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <Section id="testimonials" dark>
      <SectionHeader
        title="What Our Customers Say"
        subtitle="Don't just take our word for it — hear from car owners who trust us with their vehicles."
        light
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="relative p-6 sm:p-8 bg-gray-900 rounded-2xl border border-gray-800"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20" />
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < t.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-600"
                  )}
                />
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{t.text}</p>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gray-500">{t.car}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────

function TeamSection() {
  return (
    <Section id="team">
      <SectionHeader
        title="Our Expert Team"
        subtitle="Meet the certified professionals who'll be taking care of your vehicle."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {TEAM.map((member) => (
          <div key={member.name} className="group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-lg">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-lg">{member.name}</p>
                <p className="text-amber-400 text-sm font-medium">
                  {member.role}
                </p>
              </div>
            </div>
            <div className="px-1">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-gray-800">Certifications:</span>{" "}
                {member.certifications}
              </p>
              <p className="text-sm text-gray-500">
                {member.experience} of experience
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="!bg-gray-50">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services, warranty, and processes."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              {openIndex === i ? (
                <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    vehicle: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      await delay(1500); // simulate POST /static/contact
      setSubmitting(false);
      setSubmitted(true);
    },
    []
  );

  const updateField = (field: string, value: string) =>
    setFormState((prev) => ({ ...prev, [field]: value }));

  return (
    <Section id="contact" dark>
      <SectionHeader
        title="Contact Us"
        subtitle="Request a free quote or get in touch — we'd love to hear from you."
        light
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Form */}
        <div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Thank You!
              </h3>
              <p className="text-gray-400 max-w-sm">
                We&apos;ve received your inquiry and will get back to you within 2
                business hours. Check your email for a confirmation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({
                    name: "",
                    email: "",
                    phone: "",
                    serviceType: "",
                    vehicle: "",
                    message: "",
                  });
                }}
                className="mt-6 text-sm text-amber-400 hover:text-amber-300 underline"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Rajesh Malhotra"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="rajesh@example.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Service Type
                  </label>
                  <select
                    value={formState.serviceType}
                    onChange={(e) => updateField("serviceType", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none"
                  >
                    <option value="" className="text-gray-600">Select a service...</option>
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Vehicle (Make / Model)
                </label>
                <input
                  type="text"
                  value={formState.vehicle}
                  onChange={(e) => updateField("vehicle", e.target.value)}
                  placeholder="e.g., Hyundai Creta 2023"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Tell us about the issue or the service you need..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-gray-950 font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Quote Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Info + Map */}
        <div className="space-y-6">
          {/* Map Embed Placeholder — uses a static Unsplash aerial map image */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop"
              alt="Map showing AutoCare Hub location in Sector 62, Noida"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-950/30 flex items-center justify-center">
              <div className="bg-amber-500 text-gray-950 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg">
                <MapPin className="w-4 h-4" />
                AutoCare Hub
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="text-gray-400 text-sm">
                  Plot No. 42, Sector 62, NOIDA Industrial Area,
                  <br />
                  Gautam Buddha Nagar, Uttar Pradesh 201309
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
                <Phone className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-gray-400 text-sm">+91 120 456 7890</p>
                  <p className="text-gray-400 text-sm">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
                <Mail className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-400 text-sm">service@autocarehub.in</p>
                  <p className="text-gray-400 text-sm">quotes@autocarehub.in</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-white">Working Hours</p>
                <div className="text-gray-400 text-sm space-y-0.5">
                  <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
                  <p>Sunday: 9:00 AM – 2:00 PM (Emergency only)</p>
                  <p className="text-amber-400 text-xs mt-1">
                    24/7 emergency towing available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const quickLinks = [
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#brands", label: "Brands" },
    { href: "#team", label: "Our Team" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Logo */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-gray-950" />
              </div>
              <span className="text-xl font-bold text-white">
                AutoCare<span className="text-amber-400">Hub</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Your car deserves the best care. Professional auto service with
              20+ years of experience — trusted by 50,000+ happy car owners
              across the NCR region.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-950 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.name}>
                  <a
                    href="#services"
                    className="text-gray-500 hover:text-amber-400 text-sm transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} AutoCare Hub. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Powered by{" "}
            <span className="text-amber-500 font-medium">Darsh Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Back to Top ──────────────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StaticContent() {
  const loaded = useSectionLoader();

  return (
    <div className="min-h-screen bg-gray-950">
      <StaticNavbar />

      {/* Hero */}
      {loaded.hero ? <HeroSection /> : <HeroSkeleton />}

      {/* About */}
      {loaded.about ? (
        <AboutSection />
      ) : (
        <Section id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Services */}
      {loaded.services ? (
        <ServicesSection />
      ) : (
        <Section className="!bg-gray-50">
          <SectionHeader
            title="Our Services"
            subtitle="Complete auto care under one roof."
          />
          <ServicesSkeleton />
        </Section>
      )}

      {/* Gallery */}
      {loaded.gallery ? (
        <GallerySection />
      ) : (
        <Section dark>
          <SectionHeader
            title="Our Workshop"
            subtitle="Take a peek inside our facility."
            light
          />
          <GallerySkeleton />
        </Section>
      )}

      {/* Brands */}
      {loaded.brands ? (
        <BrandsSection />
      ) : (
        <Section>
          <SectionHeader
            title="Brands We Service"
            subtitle="All major domestic and international brands."
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {loaded.testimonials ? (
        <TestimonialsSection />
      ) : (
        <Section dark>
          <SectionHeader
            title="What Our Customers Say"
            subtitle="Hear from car owners who trust us."
            light
          />
          <TestimonialsSkeleton />
        </Section>
      )}

      {/* Team */}
      {loaded.team ? (
        <TeamSection />
      ) : (
        <Section>
          <SectionHeader
            title="Our Expert Team"
            subtitle="Certified professionals taking care of your vehicle."
          />
          <TeamSkeleton />
        </Section>
      )}

      {/* FAQ */}
      {loaded.faq ? (
        <FAQSection />
      ) : (
        <Section className="!bg-gray-50">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions."
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      {loaded.contact ? (
        <ContactSection />
      ) : (
        <Section dark>
          <SectionHeader
            title="Contact Us"
            subtitle="Request a free quote."
            light
          />
          <ContactSkeleton />
        </Section>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
}
