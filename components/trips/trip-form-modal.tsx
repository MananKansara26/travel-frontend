"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  onSubmit: (trip: Trip) => void
  onCancel: () => void
  isOpen: boolean
}

const destinations = ["Greece & Italy", "Southeast Asia", "Patagonia", "Morocco", "Japan", "France", "USA", "Other"]

export default function TripFormModal({ onSubmit, onCancel, isOpen }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    openForJoin: false,
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.destination || !formData.startDate || !formData.endDate || !formData.description) {
      alert("Please fill in all fields")
      return
    }

    const user = JSON.parse(localStorage.getItem("travelh_user") || "{}")

    const newTrip: Trip = {
      id: Date.now(),
      ...formData,
      participants: [
        {
          id: 1,
          name: user.name || "You",
          avatar: "/diverse-avatars.png",
        },
      ],
    }

    onSubmit(newTrip)
    setFormData({
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      description: "",
      openForJoin: false,
    })
  }

  if (!isOpen) return null

  // Mobile: Full page overlay
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Create New Trip</h1>
            <button
              onClick={onCancel}
              className="text-2xl text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Trip Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Summer Mediterranean Adventure"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Trip Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your trip plans..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="openForJoin"
                name="openForJoin"
                type="checkbox"
                checked={formData.openForJoin}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="openForJoin" className="text-sm font-medium cursor-pointer">
                Open for others to join
              </label>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Trip
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Desktop: Dialog/Modal
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Create New Trip</CardTitle>
          <button
            onClick={onCancel}
            className="text-2xl text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Trip Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Summer Mediterranean Adventure"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium">
                  Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
                >
                  <option value="">Select destination</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Trip Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your trip plans..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="openForJoin"
                name="openForJoin"
                type="checkbox"
                checked={formData.openForJoin}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="openForJoin" className="text-sm font-medium cursor-pointer">
                Open for others to join
              </label>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Trip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
