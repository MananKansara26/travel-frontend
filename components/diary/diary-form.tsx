"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DiaryEntry {
  id: number
  title: string
  place: string
  date: string
  content: string
  images: string[]
}

interface Props {
  onSubmit: (entry: DiaryEntry) => void
  onCancel: () => void
}

const places = [
  "Santorini, Greece",
  "Bali, Indonesia",
  "Tokyo, Japan",
  "Patagonia, Chile",
  "Marrakech, Morocco",
  "Other",
]

export default function DiaryForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.place || !formData.content) {
      alert("Please fill in all fields")
      return
    }

    const newEntry: DiaryEntry = {
      id: Date.now(),
      ...formData,
      images: ["/travel-memory.jpg"],
    }

    onSubmit(newEntry)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Diary Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Give your entry a title..."
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="place" className="text-sm font-medium">
                Place
              </label>
              <select
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="">Select a place</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Your Story
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your travel story here..."
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark text-primary-foreground">
              Publish Entry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
