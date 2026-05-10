// ============================================================================
// AutoCare Hub - Comprehensive Mock Data
// Reflects the BRD data model: workshops, cars, services, bookings, etc.
// ============================================================================

// --- Workshop Data ---
export interface Workshop {
  id: string;
  name: string;
  slug: string;
  type: "independent" | "authorized" | "multi-brand" | "franchise";
  address: string;
  area: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
  distance: number; // km from user
  phone: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  openNow: boolean;
  openingHours: string;
  nextAvailableSlot: string;
  bayCount: number;
  image: string;
  interiorImages: string[];
  brandExpertise: string[];
  expertiseTags: string[];
  certifications: string[];
  services: string[];
  priceRange: "budget" | "mid-range" | "premium";
  turnaroundTime: string;
  pickupDrop: boolean;
  doorstepService: boolean;
  evReady: boolean;
  yearEstablished: number;
  teamSize: number;
  monthlyOrders: number;
}

export const workshops: Workshop[] = [
  {
    id: "ws-001",
    name: "SpeedFix Auto Care",
    slug: "speedfix-auto-care",
    type: "multi-brand",
    address: "42, Industrial Area Phase 2, Sector 62",
    area: "Sector 62",
    city: "Noida",
    pincode: "201301",
    lat: 28.6273,
    lng: 77.3714,
    distance: 2.3,
    phone: "+91 98765 43210",
    rating: 4.6,
    reviewCount: 847,
    verified: true,
    openNow: true,
    openingHours: "8:00 AM - 8:00 PM",
    nextAvailableSlot: "Today, 3:30 PM",
    bayCount: 6,
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
    ],
    brandExpertise: ["Maruti Suzuki", "Hyundai", "Honda", "Toyota", "Kia"],
    expertiseTags: ["Maruti Specialist", "AC Expert", "Denting-Painting"],
    certifications: ["AutoCare Hub Verified", "ISO 9001:2015"],
    services: ["Periodic Service", "AC Service", "Denting & Painting", "Electrical", "Brakes", "Engine"],
    priceRange: "mid-range",
    turnaroundTime: "4-6 hours",
    pickupDrop: true,
    doorstepService: true,
    evReady: false,
    yearEstablished: 2015,
    teamSize: 14,
    monthlyOrders: 280,
  },
  {
    id: "ws-002",
    name: "Elite German Auto Works",
    slug: "elite-german-auto-works",
    type: "independent",
    address: "B-12, DLF Cyber City, Phase 3",
    area: "DLF Cyber City",
    city: "Gurugram",
    pincode: "122002",
    lat: 28.4944,
    lng: 77.0889,
    distance: 5.7,
    phone: "+91 98111 22334",
    rating: 4.8,
    reviewCount: 423,
    verified: true,
    openNow: true,
    openingHours: "9:00 AM - 7:00 PM",
    nextAvailableSlot: "Tomorrow, 10:00 AM",
    bayCount: 4,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&q=80",
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80",
    ],
    brandExpertise: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche"],
    expertiseTags: ["BMW Certified", "Mercedes Specialist", "Luxury Car Expert"],
    certifications: ["AutoCare Hub Verified", "BMW Certified Technician", "Bosch Car Service Partner"],
    services: ["Periodic Service", "Engine", "Transmission", "Suspension", "Electrical", "Diagnostics"],
    priceRange: "premium",
    turnaroundTime: "1-2 days",
    pickupDrop: true,
    doorstepService: false,
    evReady: true,
    yearEstablished: 2012,
    teamSize: 10,
    monthlyOrders: 95,
  },
  {
    id: "ws-003",
    name: "QuickFit Tyre & Battery Zone",
    slug: "quickfit-tyre-battery",
    type: "franchise",
    address: "Plot 7, Near Metro Station, MG Road",
    area: "MG Road",
    city: "Gurugram",
    pincode: "122001",
    lat: 28.4802,
    lng: 77.0269,
    distance: 3.1,
    phone: "+91 99887 76655",
    rating: 4.3,
    reviewCount: 1256,
    verified: true,
    openNow: true,
    openingHours: "7:30 AM - 9:00 PM",
    nextAvailableSlot: "Today, 1:00 PM",
    bayCount: 8,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&q=80",
    ],
    brandExpertise: ["All Brands"],
    expertiseTags: ["Tyre Expert", "Battery Specialist", "Quick Service"],
    certifications: ["AutoCare Hub Verified", "MRF Authorized", "CEAT Authorized"],
    services: ["Tyres & Wheel", "Battery", "Car Wash & Detailing", "Periodic Service"],
    priceRange: "budget",
    turnaroundTime: "1-3 hours",
    pickupDrop: false,
    doorstepService: true,
    evReady: false,
    yearEstablished: 2019,
    teamSize: 18,
    monthlyOrders: 450,
  },
  {
    id: "ws-004",
    name: "Tata Authorized Service - Pinnacle Motors",
    slug: "tata-pinnacle-motors",
    type: "authorized",
    address: "NH-48, Rajokri, Near IGI Airport",
    area: "Rajokri",
    city: "New Delhi",
    pincode: "110037",
    lat: 28.5245,
    lng: 77.1096,
    distance: 8.4,
    phone: "+91 11 4567 8900",
    rating: 4.4,
    reviewCount: 678,
    verified: true,
    openNow: false,
    openingHours: "9:00 AM - 6:00 PM",
    nextAvailableSlot: "Tomorrow, 9:30 AM",
    bayCount: 10,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    interiorImages: [],
    brandExpertise: ["Tata Motors"],
    expertiseTags: ["Tata Authorized", "EV Ready", "Nexon EV Specialist"],
    certifications: ["Tata Motors Authorized", "AutoCare Hub Verified", "EV Certified Workshop"],
    services: ["Periodic Service", "AC Service", "Electrical", "EV-Specific", "Body & Interior", "Insurance & Accidental"],
    priceRange: "mid-range",
    turnaroundTime: "6-8 hours",
    pickupDrop: true,
    doorstepService: false,
    evReady: true,
    yearEstablished: 2018,
    teamSize: 22,
    monthlyOrders: 180,
  },
  {
    id: "ws-005",
    name: "Carizma Denting & Painting Studio",
    slug: "carizma-denting-painting",
    type: "independent",
    address: "24/7 Okhla Industrial Estate, Phase 1",
    area: "Okhla",
    city: "New Delhi",
    pincode: "110020",
    lat: 28.5355,
    lng: 77.2712,
    distance: 6.2,
    phone: "+91 98100 55667",
    rating: 4.7,
    reviewCount: 312,
    verified: true,
    openNow: true,
    openingHours: "9:00 AM - 7:00 PM",
    nextAvailableSlot: "Today, 4:00 PM",
    bayCount: 5,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
    ],
    brandExpertise: ["All Brands", "Luxury Specialists"],
    expertiseTags: ["Denting Expert", "Painting Specialist", "Ceramic Coating", "PPF Expert"],
    certifications: ["AutoCare Hub Verified", "3M Authorized", "PPF Certified"],
    services: ["Denting & Painting", "Car Wash & Detailing", "Body & Interior"],
    priceRange: "mid-range",
    turnaroundTime: "2-5 days",
    pickupDrop: true,
    doorstepService: false,
    evReady: false,
    yearEstablished: 2014,
    teamSize: 12,
    monthlyOrders: 65,
  },
  {
    id: "ws-006",
    name: "GreenDrive EV Service Center",
    slug: "greendrive-ev-service",
    type: "multi-brand",
    address: "Unitech Business Park, Sector 44",
    area: "Sector 44",
    city: "Gurugram",
    pincode: "122003",
    lat: 28.4595,
    lng: 77.0723,
    distance: 7.8,
    phone: "+91 97111 33445",
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    openNow: true,
    openingHours: "8:00 AM - 7:00 PM",
    nextAvailableSlot: "Tomorrow, 11:00 AM",
    bayCount: 4,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    interiorImages: [],
    brandExpertise: ["Tata EV", "MG EV", "Hyundai EV", "BYD", "BMW iX"],
    expertiseTags: ["EV Specialist", "Battery Expert", "HV Certified"],
    certifications: ["AutoCare Hub Verified", "EV Certified", "High Voltage Safety Certified"],
    services: ["EV-Specific", "Periodic Service", "AC Service", "Electrical", "Tyres & Wheel"],
    priceRange: "premium",
    turnaroundTime: "4-8 hours",
    pickupDrop: true,
    doorstepService: false,
    evReady: true,
    yearEstablished: 2022,
    teamSize: 8,
    monthlyOrders: 42,
  },
];

// --- Car Profile Data ---
export interface CarProfile {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  fuelType: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic" | "CVT" | "AMT" | "DCT";
  color: string;
  registrationNumber: string;
  odometer: number;
  lastServiceDate: string;
  nextServiceDue: string;
  nextServiceDueKm: number;
  image: string;
  insuranceExpiry: string;
  pucExpiry: string;
  insurerName: string;
  policyNumber: string;
}

export const userCars: CarProfile[] = [
  {
    id: "car-001",
    make: "Hyundai",
    model: "Creta",
    variant: "SX(O) 1.5 Turbo DCT",
    year: 2023,
    fuelType: "Petrol",
    transmission: "DCT",
    color: "Titan Grey",
    registrationNumber: "DL 4C AB 1234",
    odometer: 18750,
    lastServiceDate: "2025-12-15",
    nextServiceDue: "2026-06-15",
    nextServiceDueKm: 25000,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    insuranceExpiry: "2026-08-22",
    pucExpiry: "2026-05-10",
    insurerName: "ICICI Lombard",
    policyNumber: "ICL/MOT/2025/987654",
  },
  {
    id: "car-002",
    make: "Maruti Suzuki",
    model: "Swift",
    variant: "ZXi+ AMT",
    year: 2021,
    fuelType: "Petrol",
    transmission: "AMT",
    color: "Pearl Arctic White",
    registrationNumber: "DL 8C EF 5678",
    odometer: 42300,
    lastServiceDate: "2026-01-20",
    nextServiceDue: "2026-07-20",
    nextServiceDueKm: 50000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    insuranceExpiry: "2026-04-15",
    pucExpiry: "2026-09-30",
    insurerName: "HDFC Ergo",
    policyNumber: "HDE/MV/2025/123456",
  },
  {
    id: "car-003",
    make: "Tata",
    model: "Nexon EV",
    variant: "Max LR Empowered+",
    year: 2024,
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Pristine White",
    registrationNumber: "DL 1C GH 9012",
    odometer: 8200,
    lastServiceDate: "2026-02-28",
    nextServiceDue: "2026-08-28",
    nextServiceDueKm: 15000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    insuranceExpiry: "2027-01-10",
    pucExpiry: "N/A",
    insurerName: "Bajaj Allianz",
    policyNumber: "BAL/EV/2024/456789",
  },
];

// --- Service Categories ---
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subServices: string[];
  priceRange: { hatchback: [number, number]; sedan: [number, number]; suv: [number, number]; luxury: [number, number] };
  estimatedTime: string;
  image: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "svc-periodic",
    name: "Periodic Service",
    icon: "Wrench",
    description: "Regular maintenance to keep your car running smoothly",
    subServices: ["Basic Service (Oil + Filter)", "Standard Service", "Comprehensive Service"],
    priceRange: { hatchback: [2200, 4500], sedan: [3000, 6000], suv: [3500, 7500], luxury: [5000, 14000] },
    estimatedTime: "4-6 hours",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80",
  },
  {
    id: "svc-ac",
    name: "AC Service & Repair",
    icon: "Thermometer",
    description: "Complete AC diagnostics, gas top-up, and repair services",
    subServices: ["AC Gas Top-up", "AC Compressor Repair", "Condenser Cleaning", "Cooling Coil Replacement", "AC Duct Cleaning"],
    priceRange: { hatchback: [1200, 3500], sedan: [1500, 4500], suv: [1800, 5500], luxury: [2500, 8000] },
    estimatedTime: "2-4 hours",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
  {
    id: "svc-denting",
    name: "Denting & Painting",
    icon: "Paintbrush",
    description: "Panel-level denting, painting, scratch removal, and bumper repair",
    subServices: ["Per-Panel Denting", "Per-Panel Painting", "Full Body Painting", "Scratch Removal", "Bumper Repair", "Alloy Wheel Repair"],
    priceRange: { hatchback: [1800, 4500], sedan: [2200, 6000], suv: [2500, 8000], luxury: [4000, 15000] },
    estimatedTime: "1-5 days",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80",
  },
  {
    id: "svc-electrical",
    name: "Electrical & Electronics",
    icon: "Zap",
    description: "Battery, alternator, wiring, sensors, and infotainment repair",
    subServices: ["Battery Replacement", "Alternator Repair", "Starter Motor", "Sensor Replacement", "Headlight/Taillight", "Infotainment Repair"],
    priceRange: { hatchback: [500, 8000], sedan: [800, 10000], suv: [1000, 12000], luxury: [2000, 25000] },
    estimatedTime: "2-6 hours",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
  },
  {
    id: "svc-tyres",
    name: "Tyres & Wheel",
    icon: "Circle",
    description: "Tyre replacement, alignment, balancing, rotation, and TPMS",
    subServices: ["Tyre Replacement", "Wheel Alignment", "Wheel Balancing", "Tyre Rotation", "Puncture Repair", "Nitrogen Filling"],
    priceRange: { hatchback: [300, 5000], sedan: [400, 8000], suv: [500, 12000], luxury: [800, 15000] },
    estimatedTime: "1-3 hours",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&q=80",
  },
  {
    id: "svc-brakes",
    name: "Brakes",
    icon: "ShieldAlert",
    description: "Brake pads, discs, fluid, caliper, ABS module repair",
    subServices: ["Brake Pad Replacement", "Brake Disc Replacement", "Brake Fluid Change", "Brake Caliper Repair", "ABS Module Repair"],
    priceRange: { hatchback: [800, 4000], sedan: [1200, 6000], suv: [1500, 8000], luxury: [3000, 15000] },
    estimatedTime: "2-4 hours",
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&q=80",
  },
  {
    id: "svc-clutch",
    name: "Clutch & Transmission",
    icon: "Settings",
    description: "Clutch plate, bearing, gearbox, CVT/AT fluid change",
    subServices: ["Clutch Plate Replacement", "Clutch Bearing", "Gearbox Repair", "CVT/AT Fluid Change"],
    priceRange: { hatchback: [3500, 8000], sedan: [4500, 12000], suv: [5500, 14000], luxury: [8000, 25000] },
    estimatedTime: "4-8 hours",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
  },
  {
    id: "svc-wash",
    name: "Car Wash & Detailing",
    icon: "Droplets",
    description: "Express wash to ceramic coating and PPF protection",
    subServices: ["Express Wash", "Premium Wash", "Interior Detailing", "Exterior Polish", "Ceramic Coating", "PPF", "Underbody Coating"],
    priceRange: { hatchback: [250, 8000], sedan: [300, 12000], suv: [400, 18000], luxury: [500, 35000] },
    estimatedTime: "20 min - 3 days",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80",
  },
  {
    id: "svc-ev",
    name: "EV-Specific",
    icon: "BatteryCharging",
    description: "Battery health, HV inspection, motor service, charging port repair",
    subServices: ["Battery Health Check", "HV System Inspection", "Electric Motor Service", "Regenerative Braking", "Charging Port Repair", "Software Updates"],
    priceRange: { hatchback: [1500, 10000], sedan: [2000, 15000], suv: [2500, 20000], luxury: [4000, 35000] },
    estimatedTime: "2-6 hours",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
  },
  {
    id: "svc-insurance",
    name: "Insurance & Accidental",
    icon: "FileCheck",
    description: "Accident repair, insurance claim processing, full damage assessment",
    subServices: ["Accident Repair", "Insurance Claim Processing", "Dent Repair (Claim)", "Full Body Damage Assessment", "Airbag Replacement"],
    priceRange: { hatchback: [5000, 50000], sedan: [8000, 80000], suv: [10000, 100000], luxury: [15000, 200000] },
    estimatedTime: "3-15 days",
    image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&q=80",
  },
];

// --- Booking / Active Service ---
export interface ServiceBooking {
  id: string;
  carId: string;
  workshopId: string;
  serviceType: string;
  packageTier: "Basic" | "Standard" | "Premium";
  status: "booked" | "vehicle-received" | "inspection" | "approval-pending" | "parts-ordered" | "in-progress" | "qc" | "ready" | "delivered";
  statusHistory: { status: string; timestamp: string; note: string; photo?: string }[];
  bookedDate: string;
  bookedSlot: string;
  estimatedCompletion: string;
  technicianName: string;
  technicianPhoto: string;
  technicianSpecialization: string;
  advisorName: string;
  estimatedCost: number;
  actualCost?: number;
  partsBreakdown: { name: string; type: "Genuine" | "Aftermarket"; price: number; status: "installed" | "ordered" | "in-transit" }[];
  laborCost: number;
  additionalIssues: { description: string; photo: string; estimatedCost: number; approved: boolean | null }[];
  pickupDrop: boolean;
  pickupAddress?: string;
}

export const activeBooking: ServiceBooking = {
  id: "ACH-2026-78432",
  carId: "car-001",
  workshopId: "ws-001",
  serviceType: "Periodic Service",
  packageTier: "Standard",
  status: "in-progress",
  statusHistory: [
    { status: "booked", timestamp: "2026-03-25T09:30:00", note: "Service booking confirmed" },
    { status: "vehicle-received", timestamp: "2026-03-27T08:15:00", note: "Vehicle received at workshop. Intake photos captured.", photo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80" },
    { status: "inspection", timestamp: "2026-03-27T08:45:00", note: "Multi-point inspection started by Raju. Brake pads at 30% life remaining.", photo: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&q=80" },
    { status: "approval-pending", timestamp: "2026-03-27T09:20:00", note: "Additional issue found: Front brake pads need replacement. Awaiting your approval." },
    { status: "in-progress", timestamp: "2026-03-27T09:45:00", note: "Approved. Oil change and filter replacement underway. Brake pad replacement added.", photo: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80" },
  ],
  bookedDate: "2026-03-27",
  bookedSlot: "8:00 AM",
  estimatedCompletion: "2026-03-27T14:00:00",
  technicianName: "Raju Yadav",
  technicianPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  technicianSpecialization: "Engine & General Service Specialist",
  advisorName: "Ankit Verma",
  estimatedCost: 5800,
  partsBreakdown: [
    { name: "Engine Oil (Castrol MAGNATEC 5W-30)", type: "Genuine", price: 1450, status: "installed" },
    { name: "Oil Filter (OEM)", type: "Genuine", price: 380, status: "installed" },
    { name: "Air Filter", type: "Genuine", price: 520, status: "installed" },
    { name: "Cabin Filter (Anti-Bacterial)", type: "Aftermarket", price: 350, status: "installed" },
    { name: "Front Brake Pads (Bosch)", type: "Aftermarket", price: 1800, status: "in-transit" },
  ],
  laborCost: 1800,
  additionalIssues: [
    {
      description: "Front brake pads worn to 30% — replacement recommended for safety",
      photo: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&q=80",
      estimatedCost: 2800,
      approved: true,
    },
  ],
  pickupDrop: true,
  pickupAddress: "A-204, Supertech Capetown, Sector 74, Noida",
};

// --- Service History ---
export interface ServiceRecord {
  id: string;
  carId: string;
  workshopName: string;
  workshopId: string;
  serviceType: string;
  date: string;
  totalCost: number;
  laborCost: number;
  partsCost: number;
  odometerAtService: number;
  status: "completed" | "warranty-active" | "warranty-expired";
  warrantyExpiry: string;
  rating?: number;
  review?: string;
  beforePhoto: string;
  afterPhoto: string;
  technicianName: string;
  invoiceId: string;
}

export const serviceHistory: ServiceRecord[] = [
  {
    id: "SH-001",
    carId: "car-001",
    workshopName: "SpeedFix Auto Care",
    workshopId: "ws-001",
    serviceType: "Standard Periodic Service",
    date: "2025-12-15",
    totalCost: 5200,
    laborCost: 1500,
    partsCost: 3700,
    odometerAtService: 15000,
    status: "warranty-active",
    warrantyExpiry: "2026-06-15",
    rating: 5,
    review: "Excellent service! Car feels like new. Raju was very thorough with the inspection and explained every issue clearly. Photos at each stage gave me full confidence.",
    beforePhoto: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80",
    technicianName: "Raju Yadav",
    invoiceId: "INV-2025-12-001",
  },
  {
    id: "SH-002",
    carId: "car-001",
    workshopName: "QuickFit Tyre & Battery Zone",
    workshopId: "ws-003",
    serviceType: "Wheel Alignment + Balancing",
    date: "2025-09-10",
    totalCost: 1800,
    laborCost: 800,
    partsCost: 1000,
    odometerAtService: 12000,
    status: "warranty-expired",
    warrantyExpiry: "2025-12-10",
    rating: 4,
    review: "Quick and efficient. Had to wait 20 minutes longer than estimated but the work quality was good.",
    beforePhoto: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&q=80",
    technicianName: "Sunil Kumar",
    invoiceId: "INV-2025-09-002",
  },
  {
    id: "SH-003",
    carId: "car-002",
    workshopName: "SpeedFix Auto Care",
    workshopId: "ws-001",
    serviceType: "AC Gas Top-up + Duct Cleaning",
    date: "2025-11-05",
    totalCost: 3200,
    laborCost: 1000,
    partsCost: 2200,
    odometerAtService: 38000,
    status: "warranty-active",
    warrantyExpiry: "2026-05-05",
    rating: 5,
    review: "AC blowing ice cold now! The duct cleaning made a noticeable difference in air quality inside the cabin.",
    beforePhoto: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    technicianName: "Mohammad Irfan",
    invoiceId: "INV-2025-11-003",
  },
  {
    id: "SH-004",
    carId: "car-002",
    workshopName: "SpeedFix Auto Care",
    workshopId: "ws-001",
    serviceType: "Comprehensive Service + Brake Pad Replacement",
    date: "2026-01-20",
    totalCost: 8900,
    laborCost: 2500,
    partsCost: 6400,
    odometerAtService: 42000,
    status: "warranty-active",
    warrantyExpiry: "2026-07-20",
    rating: 4,
    review: "Thorough service. Found and fixed a coolant leak that I hadn't noticed. A bit pricey but justified given the work done.",
    beforePhoto: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    technicianName: "Raju Yadav",
    invoiceId: "INV-2026-01-004",
  },
  {
    id: "SH-005",
    carId: "car-003",
    workshopName: "GreenDrive EV Service Center",
    workshopId: "ws-006",
    serviceType: "Battery Health Check + Software Update",
    date: "2026-02-28",
    totalCost: 3500,
    laborCost: 2500,
    partsCost: 1000,
    odometerAtService: 8000,
    status: "warranty-active",
    warrantyExpiry: "2026-08-28",
    rating: 5,
    review: "First EV service experience and it was fantastic. Battery SoH at 98%, all systems checked. Very knowledgeable team about EVs.",
    beforePhoto: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80",
    technicianName: "Arjun Nair",
    invoiceId: "INV-2026-02-005",
  },
];

// --- Reviews ---
export interface Review {
  id: string;
  workshopId: string;
  customerName: string;
  customerAvatar: string;
  carModel: string;
  serviceType: string;
  rating: number;
  qualityRating: number;
  priceRating: number;
  timelinessRating: number;
  communicationRating: number;
  cleanlinessRating: number;
  review: string;
  date: string;
  photos: string[];
  helpful: number;
  workshopReply?: string;
  verified: boolean;
}

export const workshopReviews: Review[] = [
  {
    id: "rev-001",
    workshopId: "ws-001",
    customerName: "Rahul Sharma",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    carModel: "Hyundai Creta 2023",
    serviceType: "Standard Periodic Service",
    rating: 5,
    qualityRating: 5,
    priceRating: 4,
    timelinessRating: 5,
    communicationRating: 5,
    cleanlinessRating: 5,
    review: "Best workshop experience I've ever had! The real-time photo updates gave me complete confidence. Raju is an exceptional mechanic — he even spotted a minor coolant hose issue that could have become a big problem later. Pricing was transparent and exactly as quoted.",
    date: "2026-03-15",
    photos: ["https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&q=80"],
    helpful: 24,
    workshopReply: "Thank you, Rahul! We're glad Raju caught that issue early. Looking forward to serving you again.",
    verified: true,
  },
  {
    id: "rev-002",
    workshopId: "ws-001",
    customerName: "Priya Kapoor",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    carModel: "Maruti Swift 2022",
    serviceType: "AC Service + Cabin Filter",
    rating: 4,
    qualityRating: 5,
    priceRating: 4,
    timelinessRating: 3,
    communicationRating: 4,
    cleanlinessRating: 5,
    review: "AC is blowing cold again after the gas top-up. Took about 45 minutes longer than promised, but the work quality was solid. Appreciated the before/after photos of the cabin filter — it was disgusting!",
    date: "2026-03-08",
    photos: [],
    helpful: 11,
    verified: true,
  },
  {
    id: "rev-003",
    workshopId: "ws-001",
    customerName: "Vikram Singh",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    carModel: "Honda City 2020",
    serviceType: "Brake Pad + Disc Replacement",
    rating: 5,
    qualityRating: 5,
    priceRating: 5,
    timelinessRating: 5,
    communicationRating: 5,
    cleanlinessRating: 4,
    review: "Had a squeaking brake issue for weeks. SpeedFix diagnosed it in 15 minutes — worn brake pads and warped front discs. Used Bosch aftermarket pads which are great value. Total cost was 30% less than the authorized service center quoted me. Highly recommend!",
    date: "2026-02-28",
    photos: ["https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300&q=80"],
    helpful: 18,
    workshopReply: "Thanks Vikram! Bosch pads are excellent quality at a fraction of OEM cost. Drive safe!",
    verified: true,
  },
  {
    id: "rev-004",
    workshopId: "ws-001",
    customerName: "Ananya Gupta",
    customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    carModel: "Kia Seltos 2024",
    serviceType: "Ceramic Coating",
    rating: 4,
    qualityRating: 5,
    priceRating: 3,
    timelinessRating: 4,
    communicationRating: 4,
    cleanlinessRating: 5,
    review: "Got the 3-year ceramic coating done. The finish is absolutely stunning — car looks better than showroom condition. It's a bit pricey compared to other options but the 3M products they use justify the cost. Took 2 days as promised.",
    date: "2026-02-15",
    photos: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&q=80"],
    helpful: 32,
    verified: true,
  },
];

// --- Technician Data (for Mechanic Panel) ---
export interface Technician {
  id: string;
  name: string;
  photo: string;
  specialization: string[];
  experience: number;
  rating: number;
  jobsCompleted: number;
  currentJob?: { jobId: string; carModel: string; service: string; progress: number; startTime: string };
  todayJobs: { jobId: string; carModel: string; registrationNo: string; service: string; status: "pending" | "in-progress" | "completed"; estimatedTime: string; bay: string }[];
  weeklyStats: { jobsCompleted: number; hoursWorked: number; earnings: number; avgRating: number };
}

export const currentTechnician: Technician = {
  id: "tech-001",
  name: "Raju Yadav",
  photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  specialization: ["Engine", "General Service", "Brakes", "Clutch"],
  experience: 12,
  rating: 4.8,
  jobsCompleted: 3847,
  currentJob: {
    jobId: "ACH-2026-78432",
    carModel: "Hyundai Creta SX(O)",
    service: "Standard Service + Brake Pad Replacement",
    progress: 60,
    startTime: "2026-03-27T09:45:00",
  },
  todayJobs: [
    { jobId: "ACH-2026-78430", carModel: "Maruti Baleno Zeta", registrationNo: "DL 3C XY 4521", service: "Basic Periodic Service", status: "completed", estimatedTime: "3 hrs", bay: "Bay 1" },
    { jobId: "ACH-2026-78432", carModel: "Hyundai Creta SX(O)", registrationNo: "DL 4C AB 1234", service: "Standard Service + Brake Pads", status: "in-progress", estimatedTime: "5 hrs", bay: "Bay 3" },
    { jobId: "ACH-2026-78435", carModel: "Honda City V CVT", registrationNo: "HR 26 DK 8899", service: "AC Gas Top-up", status: "pending", estimatedTime: "2 hrs", bay: "Bay 1" },
    { jobId: "ACH-2026-78437", carModel: "Toyota Innova Crysta", registrationNo: "DL 1C MN 3344", service: "Clutch Plate Replacement", status: "pending", estimatedTime: "4 hrs", bay: "Bay 5" },
  ],
  weeklyStats: { jobsCompleted: 18, hoursWorked: 48, earnings: 14200, avgRating: 4.9 },
};

// --- Workshop Dashboard Data ---
export interface BayStatus {
  bayNumber: number;
  bayType: "General" | "AC" | "Denting" | "Electrical" | "EV";
  status: "occupied" | "free" | "reserved";
  vehicleInfo?: { model: string; registrationNo: string; service: string; technicianName: string; progress: number; eta: string };
}

export const bayStatuses: BayStatus[] = [
  { bayNumber: 1, bayType: "General", status: "free" },
  { bayNumber: 2, bayType: "General", status: "occupied", vehicleInfo: { model: "Kia Seltos HTX+", registrationNo: "UP 16 GH 7788", service: "Standard Service", technicianName: "Sunil Kumar", progress: 85, eta: "30 min" } },
  { bayNumber: 3, bayType: "General", status: "occupied", vehicleInfo: { model: "Hyundai Creta SX(O)", registrationNo: "DL 4C AB 1234", service: "Standard Service + Brake Pads", technicianName: "Raju Yadav", progress: 60, eta: "2 hrs" } },
  { bayNumber: 4, bayType: "AC", status: "reserved" },
  { bayNumber: 5, bayType: "General", status: "occupied", vehicleInfo: { model: "Maruti Ertiga VXi", registrationNo: "DL 8C PQ 5566", service: "Clutch Replacement", technicianName: "Mohammad Irfan", progress: 30, eta: "4 hrs" } },
  { bayNumber: 6, bayType: "Denting", status: "free" },
];

export interface DashboardStats {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  activeJobs: number;
  completedToday: number;
  pendingBookings: number;
  pendingApprovals: number;
  bayUtilization: number;
  avgRating: number;
  technicianCount: number;
  lowStockAlerts: number;
  negativeReviews: number;
}

export const dashboardStats: DashboardStats = {
  todayRevenue: 47800,
  weekRevenue: 284500,
  monthRevenue: 1185000,
  activeJobs: 4,
  completedToday: 6,
  pendingBookings: 3,
  pendingApprovals: 2,
  bayUtilization: 67,
  avgRating: 4.6,
  technicianCount: 8,
  lowStockAlerts: 4,
  negativeReviews: 1,
};

// --- AMC Plans ---
export interface AMCPlan {
  id: string;
  tier: "Basic" | "Standard" | "Premium";
  servicesPerYear: string;
  features: { name: string; included: boolean; detail?: string }[];
  prices: { hatchback: number; sedan: number; suv: number; luxury: number };
  popular: boolean;
}

export const amcPlans: AMCPlan[] = [
  {
    id: "amc-basic",
    tier: "Basic",
    servicesPerYear: "2",
    features: [
      { name: "Periodic services/year", included: true, detail: "2" },
      { name: "Oil & filter", included: true },
      { name: "Air & cabin filter", included: false },
      { name: "AC gas top-up", included: false },
      { name: "Brake pad replacement", included: false },
      { name: "Battery check", included: false },
      { name: "Roadside assistance", included: false },
      { name: "Pick-up & drop", included: false },
      { name: "Tyre rotation", included: false },
      { name: "Interior cleaning", included: false },
      { name: "Priority booking", included: false },
      { name: "Extended warranty on parts", included: false },
    ],
    prices: { hatchback: 5999, sedan: 7999, suv: 9999, luxury: 14999 },
    popular: false,
  },
  {
    id: "amc-standard",
    tier: "Standard",
    servicesPerYear: "4",
    features: [
      { name: "Periodic services/year", included: true, detail: "4" },
      { name: "Oil & filter", included: true },
      { name: "Air & cabin filter", included: true },
      { name: "AC gas top-up", included: true, detail: "1/year" },
      { name: "Brake pad replacement", included: false },
      { name: "Battery check", included: true },
      { name: "Roadside assistance", included: false },
      { name: "Pick-up & drop", included: true, detail: "2/year" },
      { name: "Tyre rotation", included: true, detail: "1/year" },
      { name: "Interior cleaning", included: false },
      { name: "Priority booking", included: true },
      { name: "Extended warranty on parts", included: true, detail: "6 months" },
    ],
    prices: { hatchback: 9999, sedan: 13999, suv: 17999, luxury: 24999 },
    popular: true,
  },
  {
    id: "amc-premium",
    tier: "Premium",
    servicesPerYear: "Unlimited",
    features: [
      { name: "Periodic services/year", included: true, detail: "Unlimited" },
      { name: "Oil & filter", included: true },
      { name: "Air & cabin filter", included: true },
      { name: "AC gas top-up", included: true, detail: "2/year" },
      { name: "Brake pad replacement", included: true },
      { name: "Battery check", included: true },
      { name: "Roadside assistance", included: true, detail: "4 calls/year" },
      { name: "Pick-up & drop", included: true, detail: "All services" },
      { name: "Tyre rotation", included: true, detail: "2/year" },
      { name: "Interior cleaning", included: true, detail: "2/year" },
      { name: "Priority booking", included: true },
      { name: "Extended warranty on parts", included: true, detail: "12 months" },
    ],
    prices: { hatchback: 17999, sedan: 23999, suv: 29999, luxury: 44999 },
    popular: false,
  },
];

// --- Emergency Types ---
export interface EmergencyType {
  id: string;
  name: string;
  icon: string;
  description: string;
  estimatedCost: string;
  avgEta: string;
}

export const emergencyTypes: EmergencyType[] = [
  { id: "em-battery", name: "Battery Dead / Jump Start", icon: "BatteryWarning", description: "Battery discharge, won't crank, electrical failure", estimatedCost: "₹500 - ₹800", avgEta: "20-35 min" },
  { id: "em-tyre", name: "Flat Tyre / Puncture", icon: "Circle", description: "Punctured tyre, sidewall damage, spare replacement", estimatedCost: "₹300 - ₹600", avgEta: "15-30 min" },
  { id: "em-overheat", name: "Engine Overheating", icon: "Flame", description: "Coolant leak, radiator failure, overheating", estimatedCost: "₹800 - ₹2,500", avgEta: "25-40 min" },
  { id: "em-tow", name: "Towing Service", icon: "Truck", description: "Vehicle won't start or move, need towing to workshop", estimatedCost: "₹1,500 + ₹15/km", avgEta: "30-50 min" },
  { id: "em-lockout", name: "Locked Out", icon: "KeyRound", description: "Keys locked inside, key fob malfunction", estimatedCost: "₹500 - ₹1,200", avgEta: "20-40 min" },
  { id: "em-fuel", name: "Fuel Empty / Wrong Fuel", icon: "Fuel", description: "Ran out of fuel, wrong fuel filled", estimatedCost: "₹400 - ₹1,000", avgEta: "25-45 min" },
];

// --- Emergency Responders ---
export interface EmergencyResponder {
  id: string;
  name: string;
  photo: string;
  type: "mobile-mechanic" | "tow-truck";
  rating: number;
  jobsCompleted: number;
  distance: number;
  eta: string;
  phone: string;
  vehicleInfo: string;
}

export const emergencyResponders: EmergencyResponder[] = [
  { id: "er-001", name: "Deepak Sharma", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80", type: "mobile-mechanic", rating: 4.7, jobsCompleted: 856, distance: 2.1, eta: "12 min", phone: "+91 98765 11111", vehicleInfo: "Maruti Eeco Service Van" },
  { id: "er-002", name: "Sanjay Tow Services", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80", type: "tow-truck", rating: 4.5, jobsCompleted: 1234, distance: 3.8, eta: "18 min", phone: "+91 98765 22222", vehicleInfo: "Tata 407 Flatbed Tow Truck" },
  { id: "er-003", name: "Anil Roadside Help", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80", type: "mobile-mechanic", rating: 4.9, jobsCompleted: 2103, distance: 4.5, eta: "22 min", phone: "+91 98765 33333", vehicleInfo: "Mahindra Bolero Service Vehicle" },
];
