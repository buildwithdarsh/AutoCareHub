import type { Metadata } from "next";
import { workshops } from "@/lib/mock-data";
import WorkshopDetailContent from "./WorkshopDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug);

  if (!workshop) {
    return { title: "Workshop Not Found" };
  }

  const title = `${workshop.name} — Services, Reviews & Pricing`;
  const description = `${workshop.name} in ${workshop.area}, ${workshop.city}. Rated ${workshop.rating}/5 from ${workshop.reviewCount} reviews. Services: ${workshop.services.slice(0, 3).join(", ")}. Book now on AutoCare Hub.`;

  return {
    title,
    description,
    alternates: { canonical: `/workshops/${slug}` },
    openGraph: {
      title: `${title} | AutoCare Hub`,
      description,
      url: `/workshops/${slug}`,
      siteName: "AutoCare Hub",
      type: "website",
      images: [{ url: workshop.image, width: 800, height: 600, alt: workshop.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AutoCare Hub`,
      description,
      images: [workshop.image],
    },
  };
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug);

  const jsonLd = workshop
    ? {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        name: workshop.name,
        url: `https://autocarehub.in/workshops/${slug}`,
        image: workshop.image,
        telephone: workshop.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: workshop.address,
          addressLocality: workshop.city,
          postalCode: workshop.pincode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: workshop.lat,
          longitude: workshop.lng,
        },
        openingHours: workshop.openingHours,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: workshop.rating,
          reviewCount: workshop.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        priceRange: workshop.priceRange === "budget" ? "₹" : workshop.priceRange === "mid-range" ? "₹₹" : "₹₹₹",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <WorkshopDetailContent />
    </>
  );
}
