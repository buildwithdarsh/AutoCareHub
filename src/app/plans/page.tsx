import type { Metadata } from "next";
import { amcPlans } from "@/lib/mock-data";
import PlansContent from "./PlansContent";

export const metadata: Metadata = {
  title: "Annual Maintenance Plans — Save Up to 40%",
  description:
    "Choose from Basic, Standard, and Premium annual car maintenance plans. Covers periodic services, roadside assistance, and genuine OEM parts across India.",
  alternates: { canonical: "/plans" },
  openGraph: {
    title: "Annual Maintenance Plans — Save Up to 40% | AutoCare Hub",
    description:
      "Choose from Basic, Standard, and Premium annual car maintenance plans. Covers periodic services, roadside assistance, and genuine OEM parts.",
    url: "/plans",
    siteName: "AutoCare Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Annual Maintenance Plans — Save Up to 40% | AutoCare Hub",
    description:
      "Choose from Basic, Standard, and Premium annual car maintenance plans.",
  },
};

export default function PlansPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AutoCare Hub Annual Maintenance Plans",
    itemListElement: amcPlans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${plan.tier} AMC Plan`,
        description: `${plan.servicesPerYear} services per year`,
        offers: {
          "@type": "Offer",
          price: plan.prices.hatchback,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlansContent />
    </>
  );
}
