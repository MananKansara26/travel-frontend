"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MomentCard from "@/components/moments/moment-card"
import MomentTypeBadge from "@/components/moments/moment-type-badge"
import AddMomentModal from "@/components/moments/add-moment-modal"
import { Plus } from "lucide-react"

interface Moment {
  id: number
  tripId: number
  title: string
  description: string
  type: "departure" | "arrival" | "stay" | "site_visit" | "travel" | "event" | "other"
  otherType?: string
  place?: string
  photos: string[]
  isPublic: boolean
  createdAt: string
}

interface Trip {
  id: number
  title: string
  moments?: number[]
}

interface TripMomentsListProps {
  trip: Trip
  moments: Moment[]
  onAddMoment: (moment: Moment) => void
  onDeleteMoment: (momentId: number) => void
  onEditMoment: (moment: Moment) => void
}

export default function TripMomentsList({
  trip,
  moments,
  onAddMoment,
  onDeleteMoment,
  onEditMoment,
}: TripMomentsListProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid")

  const tripMoments = moments.filter((m) => m.tripId === trip.id)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Moments ({tripMoments.length})
        </h3>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("slider")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "slider" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              Slider
            </button>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Moment
          </Button>
        </div>
      </div>

      {tripMoments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No moments added yet</p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
            >
              <Plus className="w-4 h-4" />
              Create First Moment
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tripMoments.map((moment) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              onDelete={onDeleteMoment}
              onEdit={onEditMoment}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {tripMoments.map((moment) => (
              <div key={moment.id} className="flex-shrink-0 w-80">
                <MomentCard
                  moment={moment}
                  onDelete={onDeleteMoment}
                  onEdit={onEditMoment}
                  isSliderView
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <AddMomentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={onAddMoment}
        tripId={trip.id}
      />
    </div>
  )
}
