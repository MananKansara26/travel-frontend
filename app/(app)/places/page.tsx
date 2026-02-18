'use client'

import { useState, useMemo } from 'react'
import { PlaceSearch } from '@/components/places/place-search'
import { PlacesList } from '@/components/places/places-list'
import { PlaceForm } from '@/components/places/place-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import places from '@/data/places.json'

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [allPlaces, setAllPlaces] = useState(places)

  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      const matchesSearch =
        searchQuery === '' ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = !filterTag || place.tags.includes(filterTag)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filterTag, allPlaces])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filters: { tag: string }) => {
    setFilterTag(filters.tag)
  }

  const handleAddPlace = (placeData: any) => {
    const newPlace = {
      id: Math.max(...allPlaces.map((p) => p.id), 0) + 1,
      slug: placeData.name.toLowerCase().replace(/\s+/g, '-'),
      ...placeData,
      location: `${placeData.city}, ${placeData.country}`,
      stories: [],
      relatedPlaces: [],
    }

    setAllPlaces([newPlace, ...allPlaces])
    setShowAddForm(false)
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Places</h1>
            <p className="text-muted-foreground mt-2">
              Discover amazing destinations and share your favorite places
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Place
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <PlaceSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />
      </div>

      {/* Places List */}
      <PlacesList
        places={filteredPlaces}
        onPlaceClick={(place) => console.log('Place clicked:', place)}
      />

      {/* Add Place Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add a New Place</DialogTitle>
          </DialogHeader>
          <PlaceForm
            onSubmit={handleAddPlace}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
