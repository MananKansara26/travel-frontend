"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DiaryForm from "./diary-form"
import diaryEntries from "@/data/diary-entries.json"

interface DiaryEntry {
  id: number
  title: string
  place: string
  date: string
  content: string
  images: string[]
}

export default function DiaryList() {
  const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntries)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("travelh_diary_entries")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  const handleAddEntry = (newEntry: DiaryEntry) => {
    const updated = [newEntry, ...entries]
    setEntries(updated)
    localStorage.setItem("travelh_diary_entries", JSON.stringify(updated))
    setShowForm(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Travel Diary</h1>
          <p className="text-muted-foreground mt-2">Share your travel stories and memories</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary-dark text-primary-foreground gap-2 w-full sm:w-auto"
        >
          ➕ New Entry
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8">
          <DiaryForm onSubmit={handleAddEntry} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-muted-foreground mb-4">No diary entries yet. Start sharing your travel stories!</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                Create Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {entry.images.length > 0 && (
                    <div className="w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={entry.images[0] || "/placeholder.svg"}
                        alt={entry.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">{entry.title}</h3>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        {entry.place}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <p className="text-foreground line-clamp-2 mt-2">{entry.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
