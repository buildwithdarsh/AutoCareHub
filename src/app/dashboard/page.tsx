import type { Metadata } from "next";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Workshop Dashboard",
  description:
    "Manage your workshop operations, track jobs, monitor revenue, and handle customer approvals in real-time.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardContent />;
}
