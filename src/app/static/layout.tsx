import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoCare Hub — Your Car Deserves the Best Care",
  description:
    "Professional auto service center with 20+ years of experience. General service, engine repair, AC service, denting & painting, and more. Get a free quote today.",
};

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
