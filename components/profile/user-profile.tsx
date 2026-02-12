"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import places from "@/data/places.json"
import trips from "@/data/trips.json"

interface User {
  name: string
  email: string
  location?: string
  signedUpAt?: string
  currentlyTraveling?: boolean
  currentTrip?: string
}

interface UserStats {
  visitedPlaces: number
  tripsCompleted: number
  wishlistCount: number
  feedbackGiven: number
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [stats, setStats] = useState<UserStats>({
    visitedPlaces: 0,
    tripsCompleted: 0,
    wishlistCount: 0,
    feedbackGiven: 0,
  })
  const [activeTab, setActiveTab] = useState<"overview" | "visited" | "trips" | "wishlist" | "feedback">("overview")
  const [showStatusForm, setShowStatusForm] = useState(false)
  const [statusForm, setStatusForm] = useState({
    currentlyTraveling: user?.currentlyTraveling || false,
    currentTrip: user?.currentTrip || "",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("travelh_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setStatusForm({
        currentlyTraveling: userData.currentlyTraveling || false,
        currentTrip: userData.currentTrip || "",
      })
    }

    const storedWishlist = localStorage.getItem("travelh_wishlist")
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist))
    }

    setStats({
      visitedPlaces: 12,
      tripsCompleted: 3,
      wishlistCount: storedWishlist ? JSON.parse(storedWishlist).length : 0,
      feedbackGiven: 8,
    })
  }, [])

  const handleStatusUpdate = () => {
    if (user) {
      const updated = { ...user, ...statusForm }
      setUser(updated)
      localStorage.setItem("travelh_user", JSON.stringify(updated))
      setShowStatusForm(false)
    }
  }

  if (!user) {
    return <div className="text-center py-12">Loading...</div>
  }

  const wishlistPlaces = places.filter((p) => wishlist.includes(p.id))
  const userTrips = trips.slice(0, 2)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-bold text-primary">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
            {user.currentlyTraveling && user.currentTrip && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Currently in {user.currentTrip}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Edit Profile</Button>
            <Button variant="outline" onClick={() => setShowStatusForm(!showStatusForm)} className="border-border">
              {user.currentlyTraveling ? "Update Status" : "Set Status"}
            </Button>
          </div>
        </div>

        {/* Status Form */}
        {showStatusForm && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="traveling"
                    checked={statusForm.currentlyTraveling}
                    onChange={(e) => setStatusForm({ ...statusForm, currentlyTraveling: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor="traveling" className="text-sm font-medium cursor-pointer">
                    I am currently traveling
                  </label>
                </div>

                {statusForm.currentlyTraveling && (
                  <div className="space-y-2">
                    <label htmlFor="trip" className="text-sm font-medium">
                      Where are you traveling?
                    </label>
                    <input
                      id="trip"
                      type="text"
                      placeholder="e.g., Paris, France"
                      value={statusForm.currentTrip}
                      onChange={(e) => setStatusForm({ ...statusForm, currentTrip: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm"
                    />
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setShowStatusForm(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary text-primary-foreground" onClick={handleStatusUpdate}>
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.visitedPlaces}</p>
                <p className="text-sm text-muted-foreground mt-1">Places Visited</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{stats.tripsCompleted}</p>
                <p className="text-sm text-muted-foreground mt-1">Trips Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{stats.wishlistCount}</p>
                <p className="text-sm text-muted-foreground mt-1">Wishlist Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{stats.feedbackGiven}</p>
                <p className="text-sm text-muted-foreground mt-1">Feedback Given</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-border">
        <div className="flex gap-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {(["overview", "visited", "trips", "wishlist", "feedback"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-32 flex-shrink-0">Name</span>
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-32 flex-shrink-0">Email</span>
                  <span className="text-sm text-muted-foreground break-all">{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-32 flex-shrink-0">Location</span>
                    <span className="text-sm text-muted-foreground">{user.location}</span>
                  </div>
                )}
                {user.signedUpAt && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-32 flex-shrink-0">Member Since</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.signedUpAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ Visited Santorini Caldera - 2 weeks ago</p>
                  <p>✓ Added 5 places to wishlist - 1 week ago</p>
                  <p>✓ Completed Mediterranean trip - 3 weeks ago</p>
                  <p>✓ Left feedback on Bali Rice Terraces - 5 days ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Visited Places Tab */}
        {activeTab === "visited" && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Places You've Visited</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {places.slice(0, 3).map((place) => (
                <Link key={place.id} href={`/places/${place.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="relative h-40 bg-neutral-200 overflow-hidden">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{place.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{place.location}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span>⭐ {place.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === "trips" && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Trips</h2>
            <div className="space-y-4">
              {userTrips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{trip.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{trip.destination}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {new Date(trip.startDate).toLocaleDateString()} -{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {trip.participants.slice(0, 3).map((participant) => (
                              <div
                                key={participant.id}
                                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-card text-xs font-semibold text-primary"
                              >
                                {participant.name.charAt(0)}
                              </div>
                            ))}
                          </div>
                          {trip.participants.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{trip.participants.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Wishlist</h2>
            {wishlistPlaces.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistPlaces.map((place) => (
                  <Link key={place.id} href={`/places/${place.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="relative h-40 bg-neutral-200 overflow-hidden">
                        <img
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-2">
                          ❤️
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground">{place.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{place.location}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span>⭐ {place.rating}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Your wishlist is empty. Start adding places!</p>
                  <Link href="/dashboard">
                    <Button className="mt-4 bg-primary text-primary-foreground">Explore Places</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Feedback</h2>
            <div className="space-y-4">
              {[
                {
                  place: "Santorini Caldera",
                  rating: 5,
                  comment: "Absolutely breathtaking! The sunset was magical.",
                  date: "2 weeks ago",
                },
                {
                  place: "Bali Rice Terraces",
                  rating: 4,
                  comment: "Beautiful scenery, but quite crowded during peak hours.",
                  date: "1 month ago",
                },
                {
                  place: "Tokyo Shibuya",
                  rating: 4,
                  comment: "Amazing energy and food scene. Worth the visit!",
                  date: "2 months ago",
                },
              ].map((feedback, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{feedback.place}</h3>
                      <span className="text-sm text-muted-foreground">{feedback.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <span>{"⭐".repeat(feedback.rating)}</span>
                      <span className="text-sm text-muted-foreground ml-1">{feedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
