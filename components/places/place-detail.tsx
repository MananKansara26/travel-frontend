"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import places from "@/data/places.json"

interface Place {
  id: number
  slug: string
  name: string
  city: string
  country: string
  area: string
  location: string
  image: string
  rating: number
  tags: string[]
  description: string
  stories: Array<{
    author: string
    date: string
    note: string
  }>
  relatedPlaces: number[]
}

interface Props {
  place: Place
}

export default function PlaceDetail({ place }: Props) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  useEffect(() => {
    const storedWishlist = localStorage.getItem("travelh_wishlist")
    if (storedWishlist) {
      const parsed = JSON.parse(storedWishlist)
      setWishlist(parsed)
      setIsInWishlist(parsed.includes(place.id))
    }
  }, [place.id])

  const handleWishlistToggle = () => {
    let updatedWishlist: number[]
    if (isInWishlist) {
      updatedWishlist = wishlist.filter((id) => id !== place.id)
    } else {
      updatedWishlist = [...wishlist, place.id]
    }
    setWishlist(updatedWishlist)
    setIsInWishlist(!isInWishlist)
    localStorage.setItem("travelh_wishlist", JSON.stringify(updatedWishlist))
  }

  const relatedPlaces = places.filter((p) => place.relatedPlaces.includes(p.id))

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="relative h-96 md:h-[500px] bg-neutral-200 overflow-hidden">
        <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Link
          href="/dashboard"
          className="absolute top-4 left-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
          aria-label="Go back"
        >
          ←
        </Link>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className="text-xl">{isInWishlist ? "❤️" : "🤍"}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Place Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{place.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <span>📍</span>
              <span>
                {place.city}, {place.country}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <span>🗺️</span>
              <span>{place.area}</span>
            </div>
          </div>

          {/* Rating & Tags */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {"⭐".repeat(Math.floor(place.rating))}
                {place.rating % 1 !== 0 ? "✨" : ""}
              </span>
              <span className="text-lg font-semibold text-foreground">{place.rating}</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {place.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleWishlistToggle}
              className={`${
                isInWishlist
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {isInWishlist ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">About This Place</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{place.description}</p>
        </div>

        {/* User Stories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Traveler Stories</h2>
          <div className="grid gap-4">
            {place.stories.map((story, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{story.author}</p>
                      <p className="text-sm text-muted-foreground">{story.date}</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">{story.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Places */}
        {relatedPlaces.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Related Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPlaces.map((relatedPlace) => (
                <Link key={relatedPlace.id} href={`/places/${relatedPlace.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="relative h-40 bg-neutral-200 overflow-hidden">
                      <img
                        src={relatedPlace.image || "/placeholder.svg"}
                        alt={relatedPlace.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{relatedPlace.name}</h3>
                      <p className="text-sm text-muted-foreground">{relatedPlace.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
