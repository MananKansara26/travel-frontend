"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import places from "@/data/places.json"

export default function FamousPlaces() {
  const topRatedPlaces = places.sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Most Popular Destinations</h2>
        <p className="text-muted-foreground mb-8">Highly rated places loved by travelers worldwide</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topRatedPlaces.map((place) => (
          <Link key={place.id} href={`/places/${place.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full group">
              <div className="relative h-48 bg-neutral-200 overflow-hidden">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm line-clamp-1">{place.name}</h3>
                    <span className="text-sm font-bold text-white bg-primary/80 px-2 py-1 rounded">
                      {place.rating}⭐
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground line-clamp-1">📍 {place.location}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {place.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
