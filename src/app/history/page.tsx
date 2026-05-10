import type { Metadata } from "next";
import HistoryContent from "./HistoryContent";

export const metadata: Metadata = {
  title: "Service History",
  description:
    "View complete service records, cost breakdowns, warranty status, and before/after photos for all your vehicles.",
  robots: { index: false, follow: false },
};

export default function HistoryPage() {
  return <HistoryContent />;
}
