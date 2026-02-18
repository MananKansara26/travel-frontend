"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PlaceReview, { type Review } from "@/components/places/place-review"
import { ImageGallery } from "@/components/common/image-gallery"
import { ArrowLeft, MapPin, Star, Share2 } from "lucide-react"
import placesData from "@/data/places.json"

interface Place {
  id: number
  name: string
  description: string
  categories: string[]
  coordinates: { lat: number; lng: number }
  ratings: number
  images: string[]
  reviews?: Review[]
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function PlaceDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = require("./page").use ? {} : { id: (params as any)?.id || "1" }
  const actualId = (params as any)?.id || id || "1"

  const place = placesData.find((p: any) => p.id === Number(actualId))
  const [reviews, setReviews] = useState<Review[]>(place?.reviews || [])

  if (!place) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Place not found</h1>
          <Button onClick={() => router.push("/places")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Places
          </Button>
        </div>
      </div>
    )
  }

  const handleAddReview = (review: Review) => {
    setReviews((prev) => [...prev, review])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* Title and Basic Info */}
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold">{place.name}</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= place.ratings ? "fill-yellow-400 text-yellow-400" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{place.ratings}/5</span>
          </div>

          {place.coordinates && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        {place.categories && place.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {place.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images Gallery */}
      {place.images && place.images.length > 0 && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.images.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-video bg-secondary rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${place.name} ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            {place.images.length > 4 && (
              <div className="mt-4 text-center text-muted-foreground">
                +{place.images.length - 4} more photos
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{place.description}</p>
        </CardContent>
      </Card>

      {/* Information Cards */}
      {place.coordinates && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Latitude</p>
                <p className="font-mono text-lg">{place.coordinates.lat.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longitude</p>
                <p className="font-mono text-lg">{place.coordinates.lng.toFixed(6)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Section */}
      <div className="mb-8">
        <PlaceReview
          placeId={place.id}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </div>

      {/* Related Places */}
      <Card>
        <CardHeader>
          <CardTitle>Explore More Places</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {placesData
              .filter((p: any) => p.id !== place.id && p.categories?.some((c: string) => place.categories?.includes(c)))
              .slice(0, 4)
              .map((p: any) => (
                <Link
                  key={p.id}
                  href={`/places/${p.id}`}
                  className="flex-shrink-0 w-48 group"
                >
                  <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-2">
                    <img
                      src={p.images?.[0] || "/placeholder.svg?height=200&width=200"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {p.name}
                  </p>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
