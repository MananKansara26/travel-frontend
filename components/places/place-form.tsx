'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageGallery } from '@/components/common/image-gallery'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface PlaceFormProps {
  onSubmit: (data: any) => void
  onCancel?: () => void
  isLoading?: boolean
}

const availableTags = [
  'Beach',
  'Mountain',
  'Urban',
  'Culture',
  'Nature',
  'Food',
  'Adventure',
  'Historical',
  'Photography',
  'Scenic',
]

export function PlaceForm({ onSubmit, onCancel, isLoading = false }: PlaceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    country: '',
    area: '',
    tags: [] as string[],
    rating: 4.5,
    image: '',
    photos: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Place name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
    } else {
      setErrors(newErrors)
    }
  }

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Place Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Santorini Caldera"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-foreground">
          Description <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe this place..."
          rows={4}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="city" className="block text-sm font-medium text-foreground">
            City <span className="text-destructive">*</span>
          </label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            placeholder="e.g., Santorini"
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="country" className="block text-sm font-medium text-foreground">
            Country <span className="text-destructive">*</span>
          </label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
            placeholder="e.g., Greece"
            className={errors.country ? 'border-destructive' : ''}
          />
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country}</p>
          )}
        </div>
      </div>

      {/* Area */}
      <div className="space-y-1">
        <label htmlFor="area" className="block text-sm font-medium text-foreground">
          Area/Region
        </label>
        <Input
          id="area"
          value={formData.area}
          onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
          placeholder="e.g., Aegean Islands"
        />
      </div>

      {/* Rating */}
      <div className="space-y-1">
        <label htmlFor="rating" className="block text-sm font-medium text-foreground">
          Rating (0-5)
        </label>
        <Input
          id="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, rating: parseFloat(e.target.value) }))
          }
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Tags</label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={formData.tags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              {formData.tags.includes(tag) && <X className="w-3 h-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Photos */}
      <ImageGallery
        images={formData.photos}
        onImagesChange={(photos) => setFormData((prev) => ({ ...prev, photos }))}
        maxImages={8}
      />

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Adding...' : 'Add Place'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
