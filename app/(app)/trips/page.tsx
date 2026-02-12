import type { Metadata } from "next"
import TripsList from "@/components/trips/trips-list"

export const metadata: Metadata = {
  title: "Trips - Travelh",
  description: "Create and manage your travel trips. Join trips with other travelers.",
}

export default function TripsPage() {
  return <TripsList />
}
