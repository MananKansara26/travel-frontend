import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlaceDetail from "@/components/places/place-detail"
import places from "@/data/places.json"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = places.find((p) => p.slug === params.slug)

  if (!place) {
    return {
      title: "Place Not Found",
    }
  }

  return {
    title: `${place.name} - Travelh`,
    description: place.description,
    openGraph: {
      title: place.name,
      description: place.description,
      images: [place.image],
    },
  }
}

export function generateStaticParams() {
  return places.map((place) => ({
    slug: place.slug,
  }))
}

export default function PlacePage({ params }: Props) {
  const place = places.find((p) => p.slug === params.slug)

  if (!place) {
    notFound()
  }

  return <PlaceDetail place={place} />
}
