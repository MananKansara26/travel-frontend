import type { Metadata } from "next"
import TripDetail from "@/components/trips/trip-detail"
import trips from "@/data/trips.json"

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trip = trips.find((t) => t.id === Number.parseInt(params.id))

  if (!trip) {
    return {
      title: "Trip Not Found",
    }
  }

  return {
    title: `${trip.title} - Travelh`,
    description: trip.description,
  }
}

export function generateStaticParams() {
  return trips.map((trip) => ({
    id: trip.id.toString(),
  }))
}

export default function TripPage({ params }: Props) {
  const trip = trips.find((t) => t.id === Number.parseInt(params.id))

  if (!trip) {
    return <div>Trip not found</div>
  }

  return <TripDetail trip={trip} />
}
