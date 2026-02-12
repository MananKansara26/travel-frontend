"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, MessageCircle, ArrowLeft } from "lucide-react"

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

interface Props {
  trip: Trip
}

export default function TripDetail({ trip }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/trips" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Trips
          </Link>
          <h1 className="text-4xl font-bold text-foreground text-balance">{trip.title}</h1>
          <p className="text-muted-foreground mt-2">{trip.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Trip Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="text-lg font-semibold text-foreground">{trip.destination}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-lg font-semibold text-foreground">{trip.participants.length} people</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Trip Participants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trip.participants.map((participant) => (
              <Card key={participant.id}>
                <CardContent className="p-4 text-center">
                  <img
                    src={participant.avatar || "/placeholder.svg"}
                    alt={participant.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <p className="font-medium text-foreground text-sm">{participant.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Trip Chat</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 mb-4 h-64 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Can't wait for this trip! Who's excited?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Marco Rossi</p>
                    <p className="text-sm text-muted-foreground">Me! I've been planning the itinerary</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                  disabled
                />
                <Button disabled className="bg-primary text-primary-foreground">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Chat feature coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
