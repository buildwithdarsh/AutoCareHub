import type { Metadata } from "next";
import EmergencyContent from "./EmergencyContent";

export const metadata: Metadata = {
  title: "Emergency Roadside Assistance — 24/7 SOS",
  description:
    "Get immediate roadside help: battery jumpstart, flat tyre repair, towing, fuel delivery, and lockout assistance. Verified responders near you in minutes.",
  alternates: { canonical: "/emergency" },
  openGraph: {
    title: "Emergency Roadside Assistance — 24/7 SOS | AutoCare Hub",
    description:
      "Get immediate roadside help: battery jumpstart, flat tyre repair, towing, fuel delivery, and lockout assistance.",
    url: "/emergency",
    siteName: "AutoCare Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Roadside Assistance — 24/7 SOS | AutoCare Hub",
    description:
      "Get immediate roadside help: battery jumpstart, flat tyre repair, towing, fuel delivery, and lockout assistance.",
  },
};

export default function EmergencyPage() {
  return <EmergencyContent />;
}
