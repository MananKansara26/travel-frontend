'use client'

import { Moment } from '@/components/moments/moment-card'
import { MomentCard } from '@/components/moments/moment-card'
import { useState } from 'react'

interface PopularMomentsProps {
  moments: Moment[]
  isLoading?: boolean
}

export function PopularMoments({ moments, isLoading = false }: PopularMomentsProps) {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (moments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No popular moments yet</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moments.map((moment) => (
          <div
            key={moment.id}
            onClick={() => setSelectedMoment(moment)}
            className="cursor-pointer"
          >
            <MomentCard moment={moment} compact={false} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMoment && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMoment(null)}
        >
          <div
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <MomentCard moment={selectedMoment} />
          </div>
        </div>
      )}
    </div>
  )
}
