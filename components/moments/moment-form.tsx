'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageGallery } from '@/components/common/image-gallery'
import { Moment } from './moment-card'
import { X } from 'lucide-react'

interface MomentFormProps {
  initialData?: Partial<Moment>
  tripId?: number
  onSubmit: (data: Partial<Moment>) => void
  onCancel?: () => void
  isLoading?: boolean
}

const momentTypes = [
  { value: 'departure', label: 'Departure' },
  { value: 'arrival', label: 'Arrival' },
  { value: 'stay', label: 'Stay' },
  { value: 'site_visit', label: 'Site Visit' },
  { value: 'travel', label: 'Travel' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
]

export function MomentForm({
  initialData,
  tripId,
  onSubmit,
  onCancel,
  isLoading = false,
}: MomentFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || 'site_visit',
    otherType: initialData?.otherType || '',
    place: initialData?.place || '',
    photos: initialData?.photos || [],
    isPublic: initialData?.isPublic !== undefined ? initialData.isPublic : true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.type === 'other' && !formData.otherType.trim()) {
      newErrors.otherType = 'Please specify the moment type'
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      const submitData = {
        ...formData,
        tripId: tripId || initialData?.tripId,
        createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      }
      onSubmit(submitData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          Moment Title <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="e.g., Sunset at Santorini"
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
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
          placeholder="Tell the story of this moment..."
          rows={4}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-1">
        <label htmlFor="type" className="block text-sm font-medium text-foreground">
          Moment Type <span className="text-destructive">*</span>
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, type: e.target.value as any }))
          }
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
        >
          {momentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Other Type */}
      {formData.type === 'other' && (
        <div className="space-y-1">
          <label htmlFor="otherType" className="block text-sm font-medium text-foreground">
            Specify Type <span className="text-destructive">*</span>
          </label>
          <Input
            id="otherType"
            value={formData.otherType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, otherType: e.target.value }))
            }
            placeholder="e.g., Adventure sports, Local experience"
            className={errors.otherType ? 'border-destructive' : ''}
          />
          {errors.otherType && (
            <p className="text-sm text-destructive">{errors.otherType}</p>
          )}
        </div>
      )}

      {/* Place */}
      <div className="space-y-1">
        <label htmlFor="place" className="block text-sm font-medium text-foreground">
          Place (Optional)
        </label>
        <Input
          id="place"
          value={formData.place}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, place: e.target.value }))
          }
          placeholder="Where did this moment happen?"
        />
      </div>

      {/* Photos */}
      <ImageGallery
        images={formData.photos}
        onImagesChange={(photos) =>
          setFormData((prev) => ({ ...prev, photos }))
        }
        maxImages={10}
        maxSize={5}
      />

      {/* Privacy Toggle */}
      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
          }
          className="w-4 h-4 rounded border-input"
        />
        <label htmlFor="isPublic" className="text-sm font-medium text-foreground cursor-pointer flex-1">
          Make this moment public
        </label>
        <span className="text-xs text-muted-foreground">
          {formData.isPublic ? 'Everyone can see' : 'Only you can see'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Saving...' : 'Save Moment'}
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
