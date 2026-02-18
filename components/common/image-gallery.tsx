'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  maxSize?: number // in MB
  allowDelete?: boolean
}

export function ImageGallery({
  images,
  onImagesChange,
  maxImages = 5,
  maxSize = 5,
  allowDelete = true,
}: ImageGalleryProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    try {
      const newImages = [...images]

      for (let i = 0; i < files.length; i++) {
        if (newImages.length >= maxImages) break

        const file = files[i]

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File size exceeds ${maxSize}MB limit`)
          continue
        }

        // Convert to base64 for client-side storage
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }

      // Small delay to ensure all readers complete
      setTimeout(() => {
        onImagesChange(newImages)
        setUploading(false)
      }, 100)
    } catch (error) {
      console.error('Error uploading images:', error)
      setUploading(false)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Photos ({images.length}/{maxImages})
        </label>
      </div>

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF up to {maxSize}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
              {allowDelete && (
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
