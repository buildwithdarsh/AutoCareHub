import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Car Service Categories — Pricing & Booking",
  description:
    "Browse all car service categories: periodic maintenance, AC repair, denting & painting, tyres, and EV service. Compare prices by car type and book online.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Car Service Categories — Pricing & Booking | AutoCare Hub",
    description:
      "Browse all car service categories: periodic maintenance, AC repair, denting & painting, tyres, and EV service. Compare prices by car type.",
    url: "/services",
    siteName: "AutoCare Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Service Categories — Pricing & Booking | AutoCare Hub",
    description:
      "Browse all car service categories: periodic maintenance, AC repair, denting & painting, tyres, and EV service.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
