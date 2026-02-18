"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageGallery } from "@/components/common/image-gallery"
import { X } from "lucide-react"

interface AddMomentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (moment: any) => void
  tripId: number
}

const momentTypes = [
  { value: "departure", label: "Departure", icon: "✈️" },
  { value: "arrival", label: "Arrival", icon: "📍" },
  { value: "stay", label: "Stay", icon: "🏠" },
  { value: "site_visit", label: "Site Visit", icon: "📸" },
  { value: "travel", label: "Travel", icon: "🚂" },
  { value: "event", label: "Event", icon: "📅" },
  { value: "other", label: "Other", icon: "📌" },
]

export default function AddMomentModal({ isOpen, onClose, onSave, tripId }: AddMomentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "site_visit",
    otherType: "",
    place: "",
    photos: [] as string[],
    isPublic: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in title and description")
      return
    }

    const newMoment = {
      id: Date.now(),
      tripId,
      ...formData,
      createdAt: new Date().toISOString(),
    }

    onSave(newMoment)
    setFormData({
      title: "",
      description: "",
      type: "site_visit",
      otherType: "",
      place: "",
      photos: [],
      isPublic: true,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background border-b">
          <CardTitle>Add Moment</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Reached Mahakaleshwar Temple"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this moment in detail..."
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
                  required
                />
              </div>
            </div>

            {/* Moment Type */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Moment Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {momentTypes.map((mType) => (
                  <button
                    key={mType.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: mType.value }))}
                    className={`p-3 rounded-lg border transition-colors text-center ${
                      formData.type === mType.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <div className="text-lg mb-1">{mType.icon}</div>
                    <div className="text-xs font-medium">{mType.label}</div>
                  </button>
                ))}
              </div>

              {formData.type === "other" && (
                <Input
                  name="otherType"
                  value={formData.otherType}
                  onChange={handleChange}
                  placeholder="Specify the type of moment"
                />
              )}
            </div>

            {/* Place */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Place (Optional)</label>
              <Input
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="e.g., Mahakaleshwar Temple, Ujjain"
              />
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Add Photos</label>
              <ImageGallery
                images={formData.photos}
                onImagesChange={(photos) => setFormData((prev) => ({ ...prev, photos }))}
                maxImages={10}
              />
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="isPublic" className="text-sm font-medium cursor-pointer flex-1">
                Make this moment public
              </label>
              <span className="text-xs text-muted-foreground">
                {formData.isPublic ? "Everyone can see" : "Only you can see"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Add Moment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
