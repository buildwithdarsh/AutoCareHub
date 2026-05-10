import type { Metadata } from "next";
import GarageContent from "./GarageContent";

export const metadata: Metadata = {
  title: "My Garage — Vehicle Management",
  description:
    "Manage your registered vehicles, service schedules, insurance details, and PUC records in one place.",
  robots: { index: false, follow: false },
};

export default function GaragePage() {
  return <GarageContent />;
}
