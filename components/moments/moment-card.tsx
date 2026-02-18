'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Trash2, Edit2, ChevronRight } from 'lucide-react'
import { Carousel } from '@/components/ui/carousel'

export interface Moment {
  id: number
  tripId: number
  title: string
  description: string
  type: 'departure' | 'arrival' | 'stay' | 'site_visit' | 'travel' | 'event' | 'other'
  otherType?: string | null
  place?: string | null
  photos: string[]
  isPublic: boolean
  createdAt: string
}

interface MomentCardProps {
  moment: Moment
  onEdit?: (moment: Moment) => void
  onDelete?: (momentId: number) => void
  isOwner?: boolean
  compact?: boolean
}

const typeColors: Record<string, string> = {
  departure: 'bg-blue-100 text-blue-800',
  arrival: 'bg-green-100 text-green-800',
  stay: 'bg-amber-100 text-amber-800',
  site_visit: 'bg-purple-100 text-purple-800',
  travel: 'bg-cyan-100 text-cyan-800',
  event: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800',
}

export function MomentCard({
  moment,
  onEdit,
  onDelete,
  isOwner = false,
  compact = false,
}: MomentCardProps) {
  const [imageIndex, setImageIndex] = useState(0)

  const typeLabel = moment.otherType || moment.type.charAt(0).toUpperCase() + moment.type.slice(1).replace('_', ' ')

  if (compact) {
    return (
      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer">
        {moment.photos[0] ? (
          <Image
            src={moment.photos[0]}
            alt={moment.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <div className="text-white text-sm font-medium line-clamp-2">{moment.title}</div>
        </div>
        {!moment.isPublic && (
          <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="overflow-hidden">
      {/* Image Carousel */}
      {moment.photos.length > 0 ? (
        <div className="relative aspect-video bg-muted">
          <Image
            src={moment.photos[imageIndex]}
            alt={moment.title}
            fill
            className="object-cover"
          />

          {moment.photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {moment.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
          No images
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight">{moment.title}</h3>
            {moment.place && (
              <p className="text-sm text-muted-foreground mt-1">{moment.place}</p>
            )}
          </div>
          {!moment.isPublic && (
            <EyeOff className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          )}
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className={typeColors[moment.type]}>
            {typeLabel}
          </Badge>
          {moment.photos.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {moment.photos.length} photo{moment.photos.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <p className="text-sm text-foreground line-clamp-2">{moment.description}</p>

        <div className="text-xs text-muted-foreground">
          {new Date(moment.createdAt).toLocaleDateString()}
        </div>

        {isOwner && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-2 border-t">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(moment)}
                className="flex-1"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(moment.id)}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
