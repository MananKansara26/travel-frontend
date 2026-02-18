"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageGallery } from "@/components/common/image-gallery"

interface Trip {
  id: number
  title: string
  place?: string
  destination?: string
  startDate: string
  endDate: string
  description: string
  photos?: string[]
  isPublic?: boolean
  openForJoin: boolean
  participants: Array<{
    id: number
    name: string
    avatar: string
  }>
  moments?: number[]
}

interface Props {
  onSubmit: (trip: Trip) => void
  onCancel: () => void
}

const destinations = ["Greece & Italy", "Southeast Asia", "Patagonia", "Morocco", "Japan", "Other"]

export default function TripForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    photos: [] as string[],
    isPublic: true,
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

    if (!formData.title || !formData.startDate || !formData.endDate || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    const user = JSON.parse(localStorage.getItem("travelh_user") || "{}")

    const newTrip: Trip = {
      id: Date.now(),
      ...formData,
      destination: formData.destination || formData.place,
      participants: [
        {
          id: 1,
          name: user.name || "You",
          avatar: "/diverse-avatars.png",
        },
      ],
      moments: [],
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
              <label htmlFor="place" className="text-sm font-medium">
                Place (Optional)
              </label>
              <Input
                id="place"
                name="place"
                placeholder="e.g., Greece & Italy"
                value={formData.place}
                onChange={handleChange}
              />
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

          <ImageGallery
            images={formData.photos}
            onImagesChange={(photos) => setFormData((prev) => ({ ...prev, photos }))}
            maxImages={5}
          />

          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <input
              id="isPublic"
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))}
              className="w-4 h-4 rounded border-input"
            />
            <label htmlFor="isPublic" className="text-sm font-medium cursor-pointer flex-1">
              Make this trip public
            </label>
            <span className="text-xs text-muted-foreground">
              {formData.isPublic ? 'Everyone can see' : 'Only you can see'}
            </span>
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
