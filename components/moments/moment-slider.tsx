'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MomentCard, Moment } from './moment-card'

interface MomentSliderProps {
  moments: Moment[]
  title?: string
  onEdit?: (moment: Moment) => void
  onDelete?: (momentId: number) => void
  isOwner?: boolean
}

export function MomentSlider({
  moments,
  title = 'Moments',
  onEdit,
  onDelete,
  isOwner = false,
}: MomentSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  if (moments.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>No moments yet</p>
      </div>
    )
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return

    const scrollAmount = 400
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount

    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    })

    setScrollPosition(newPosition)
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}

      <div className="relative">
        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-4 pb-2">
            {moments.map((moment) => (
              <div key={moment.id} className="flex-shrink-0 w-80">
                <MomentCard
                  moment={moment}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isOwner={isOwner}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {moments.length > 2 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 z-10 bg-background/90 hover:bg-background"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 z-10 bg-background/90 hover:bg-background"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
