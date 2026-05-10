import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "AutoCare Hub — Compare & Book Verified Car Services in India",
  description:
    "Compare quotes from 50,000+ verified workshops across 500+ cities in India. Transparent pricing, genuine spare parts, real-time service tracking.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoCare Hub — Compare & Book Verified Car Services in India",
    description:
      "Compare quotes from 50,000+ verified workshops across 500+ cities in India. Transparent pricing, genuine spare parts, real-time service tracking.",
    url: "/",
    siteName: "AutoCare Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoCare Hub — Compare & Book Verified Car Services in India",
    description:
      "Compare quotes from 50,000+ verified workshops across 500+ cities in India. Transparent pricing, genuine spare parts, real-time service tracking.",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AutoCare Hub",
  url: "https://autocarehub.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://autocarehub.in/workshops?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AutoCare Hub",
  url: "https://autocarehub.in",
  logo: "https://autocarehub.in/logo.png",
  description:
    "India's verified car service marketplace. Compare quotes from verified workshops with transparent pricing.",
  sameAs: [
    "https://facebook.com/autocarehub",
    "https://instagram.com/autocarehub",
    "https://twitter.com/autocarehub",
    "https://youtube.com/@autocarehub",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeContent />
    </>
  );
}
