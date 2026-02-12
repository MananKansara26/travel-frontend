"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import trips from "@/data/trips.json"

export default function NearbyTrips() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Trips Near You</h2>
          <p className="text-muted-foreground mt-2">Join fellow travelers on upcoming adventures</p>
        </div>
        <Link href="/trips">
          <Button variant="outline">View All Trips</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.slice(0, 3).map((trip) => (
          <Link key={trip.id} href={`/trips/${trip.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">{trip.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-semibold text-foreground">{trip.destination}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Dates</p>
                  <p className="font-semibold text-foreground">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Participants ({trip.participants.length})</p>
                  <div className="flex -space-x-2">
                    {trip.participants.slice(0, 4).map((participant) => (
                      <div
                        key={participant.id}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-card text-xs font-semibold text-primary"
                        title={participant.name}
                      >
                        {participant.name.charAt(0)}
                      </div>
                    ))}
                    {trip.participants.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-card text-xs font-semibold text-muted-foreground">
                        +{trip.participants.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {trip.openForJoin && (
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Join Trip</Button>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
