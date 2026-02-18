'use client'

import { Moment } from '@/components/moments/moment-card'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle } from 'lucide-react'

interface FollowedMomentsProps {
  moments: Array<
    Moment & {
      author?: {
        id: string
        name: string
        avatar: string
      }
    }
  >
  isLoading?: boolean
}

export function FollowedMoments({ moments, isLoading = false }: FollowedMomentsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-40 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (moments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Follow travelers to see their moments here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {moments.map((moment) => (
        <Card key={moment.id} className="overflow-hidden">
          {/* Author Info */}
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <Avatar>
              <AvatarImage src={moment.author?.avatar} />
              <AvatarFallback>{moment.author?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{moment.author?.name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(moment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Moment Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold">{moment.title}</h3>
              {moment.place && (
                <p className="text-sm text-muted-foreground">{moment.place}</p>
              )}
            </div>

            <p className="text-sm text-foreground">{moment.description}</p>

            {/* Image */}
            {moment.photos.length > 0 && (
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={moment.photos[0]}
                  alt={moment.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-2 border-t">
              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                <Heart className="w-4 h-4" />
                <span className="text-xs">Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">Comment</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
