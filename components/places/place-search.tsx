'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface PlaceSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: { tag: string }) => void
  tags?: string[]
}

export function PlaceSearch({
  onSearch,
  onFilterChange,
  tags = ['Beach', 'Mountain', 'Urban', 'Culture', 'Nature', 'Food'],
}: PlaceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag
    setSelectedTag(newTag)
    if (newTag) {
      onFilterChange({ tag: newTag })
    } else {
      onFilterChange({ tag: '' })
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search places by name, city, country..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTagSelect(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}
