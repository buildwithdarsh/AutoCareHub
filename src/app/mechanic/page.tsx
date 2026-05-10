import type { Metadata } from "next";
import MechanicContent from "./MechanicContent";

export const metadata: Metadata = {
  title: "Mechanic Panel",
  description:
    "Manage your daily job queue, service checklists, parts requests, and weekly performance summary.",
  robots: { index: false, follow: false },
};

export default function MechanicPage() {
  return <MechanicContent />;
}
