import type { Metadata } from "next";
import TrackingContent from "./TrackingContent";

export const metadata: Metadata = {
  title: "Live Service Tracking",
  description:
    "Track your car service in real-time — from vehicle pickup through inspection, repair, quality check, and delivery.",
  robots: { index: false, follow: false },
};

export default function TrackingPage() {
  return <TrackingContent />;
}
