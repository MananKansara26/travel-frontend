"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TripFormModal from "./trip-form-modal"
import trips from "@/data/trips.json"

interface Trip {
  id: number
  title: string
  destination: string
  startDate: string
  endDate: string
  description: string
  openForJoin: boolean
  participants: Array<{
    id: number
    name: string
    avatar: string
  }>
}

export default function TripsList() {
  const [allTrips, setAllTrips] = useState<Trip[]>(trips)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("travelh_trips")
    if (stored) {
      setAllTrips(JSON.parse(stored))
    }
  }, [])

  const handleAddTrip = (newTrip: Trip) => {
    const updated = [newTrip, ...allTrips]
    setAllTrips(updated)
    localStorage.setItem("travelh_trips", JSON.stringify(updated))
    setShowForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground mt-2">Plan trips and connect with fellow travelers</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto"
        >
          ➕ Create Trip
        </Button>
      </div>

      <TripFormModal isOpen={showForm} onSubmit={handleAddTrip} onCancel={() => setShowForm(false)} />

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {allTrips.map((trip) => (
          <Link key={trip.id} href={`/trips/${trip.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-4xl">🗺️</span>
              </div>
              <CardContent className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground line-clamp-1">{trip.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{trip.description}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span className="line-clamp-1">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span className="line-clamp-1">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span className="text-sm text-muted-foreground">{trip.participants.length} participants</span>
                  </div>
                  {trip.openForJoin && (
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                      Open to join
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allTrips.length === 0 && (
        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <p className="text-muted-foreground mb-4">No trips yet. Create your first trip!</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create a Trip
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
