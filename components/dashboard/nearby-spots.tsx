"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import places from "@/data/places.json"

export default function NearbySpots() {
  const randomPlaces = places.sort(() => Math.random() - 0.5).slice(0, 6)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Nearby Spots & Hidden Gems</h2>
        <p className="text-muted-foreground mb-8">Discover lesser-known places waiting to be explored</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomPlaces.map((place) => (
          <Link key={place.id} href={`/places/${place.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full overflow-hidden">
              <div className="relative h-40 bg-neutral-200 overflow-hidden">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{place.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">📍 {place.location}</p>
                  <p className="text-sm text-muted-foreground">🗺️ {place.area}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>⭐ {place.rating}</span>
                  </div>
                  <div className="flex gap-1">
                    {place.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-secondary text-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
