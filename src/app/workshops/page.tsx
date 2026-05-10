import type { Metadata } from "next";
import WorkshopsContent from "./WorkshopsContent";

export const metadata: Metadata = {
  title: "Find Car Service Workshops Near You",
  description:
    "Browse 50,000+ verified car workshops. Filter by service type, brand expertise, rating, and price. Book with transparent pricing.",
  alternates: { canonical: "/workshops" },
  openGraph: {
    title: "Find Car Service Workshops Near You — AutoCare Hub",
    description:
      "Browse 50,000+ verified car workshops. Filter by service type, brand expertise, rating, and price.",
    url: "/workshops",
    siteName: "AutoCare Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Car Service Workshops Near You — AutoCare Hub",
    description:
      "Browse 50,000+ verified car workshops. Filter by service type, brand expertise, rating, and price.",
  },
};

export default function WorkshopsPage() {
  return <WorkshopsContent />;
}
