'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'

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
  stories?: Array<{
    author: string
    date: string
    note: string
  }>
  relatedPlaces?: number[]
}

interface PlacesListProps {
  places: Place[]
  onPlaceClick?: (place: Place) => void
  isLoading?: boolean
}

export function PlacesList({ places, onPlaceClick, isLoading = false }: PlacesListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (places.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No places found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <Card
          key={place.id}
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onPlaceClick?.(place)}
        >
          {/* Image */}
          <div className="relative aspect-video bg-muted overflow-hidden">
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-background/90 rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{place.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title and Location */}
            <div>
              <h3 className="font-semibold text-lg leading-tight">{place.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span>{place.city}, {place.country}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground line-clamp-2">{place.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {place.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {place.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{place.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Stories Count */}
            {place.stories && place.stories.length > 0 && (
              <div className="text-xs text-muted-foreground pt-2 border-t">
                {place.stories.length} story{place.stories.length !== 1 ? 'ies' : ''} shared
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
