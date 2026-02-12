"use client"

import type React from "react"

import { useState } from "react"
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
}

const destinations = ["Greece & Italy", "Southeast Asia", "Patagonia", "Morocco", "Japan", "Other"]

export default function TripForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    openForJoin: false,
  })

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
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Trip</CardTitle>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
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
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="openForJoin"
              name="openForJoin"
              type="checkbox"
              checked={formData.openForJoin}
              onChange={handleChange}
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="openForJoin" className="text-sm font-medium cursor-pointer">
              Open for others to join
            </label>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Create Trip
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
