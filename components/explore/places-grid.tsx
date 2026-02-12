"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import places from "@/data/places.json"

type FilterType =
  | "all"
  | "Beach"
  | "Nature"
  | "Urban"
  | "Culture"
  | "Adventure"
  | "Hiking"
  | "Photography"
  | "Market"
  | "History"
  | "Food"
  | "Scenic"
  | "Entertainment"
  | "Sunset"

export default function PlacesGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedArea, setSelectedArea] = useState<string>("all")

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(places.map((p) => p.city))).sort()
    return uniqueCities
  }, [])

  const areas = useMemo(() => {
    const uniqueAreas = Array.from(new Set(places.map((p) => p.area))).sort()
    return uniqueAreas
  }, [])

  const filters: FilterType[] = [
    "all",
    "Beach",
    "Nature",
    "Urban",
    "Culture",
    "Adventure",
    "Hiking",
    "Photography",
    "Market",
    "History",
    "Food",
    "Scenic",
    "Entertainment",
    "Sunset",
  ]

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const tagMatch = activeFilter === "all" || place.tags.includes(activeFilter)
      const cityMatch = selectedCity === "all" || place.city === selectedCity
      const areaMatch = selectedArea === "all" || place.area === selectedArea
      return tagMatch && cityMatch && areaMatch
    })
  }, [activeFilter, selectedCity, selectedArea])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filter Section */}
      <div className="space-y-6 mb-8">
        {/* Tag Filters */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Experience Type</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* City and Area Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city-select" className="text-sm font-semibold text-foreground block mb-2">
              City
            </label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value)
                setSelectedArea("all")
              }}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="area-select" className="text-sm font-semibold text-foreground block mb-2">
              Region
            </label>
            <select
              id="area-select"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Regions</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredPlaces.length} of {places.length} destinations
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <Link key={place.id} href={`/places/${place.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-40 sm:h-48 bg-neutral-200 overflow-hidden">
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg text-foreground line-clamp-1">{place.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <span>📍</span>
                      <span className="line-clamp-1">
                        {place.city}, {place.country}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <span className="text-sm">
                      {"⭐".repeat(Math.floor(place.rating))}
                      {place.rating % 1 !== 0 ? "✨" : ""}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">{place.rating}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {place.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-secondary text-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No destinations found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
