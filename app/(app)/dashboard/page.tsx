import type { Metadata } from "next"
import ExploreHero from "@/components/explore/explore-hero"
import PlacesGrid from "@/components/explore/places-grid"
import NearbyTrips from "@/components/dashboard/nearby-trips"
import FamousPlaces from "@/components/dashboard/famous-places"
import NearbySpots from "@/components/dashboard/nearby-spots"

export const metadata: Metadata = {
  title: "Explore - Travelh",
  description: "Discover amazing travel destinations and plan your next adventure.",
}

export default function DashboardPage() {
  return (
    <div className="space-y-16">
      <ExploreHero />
      <NearbyTrips />
      <FamousPlaces />
      <NearbySpots />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">All Destinations</h2>
      </div>
      <PlacesGrid />
    </div>
  )
}
