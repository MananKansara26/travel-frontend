'use client'

import { ImageGallery } from '@/components/common/image-gallery'

interface ProfileImageGalleryProps {
  images: string[]
  onImagesChange: (images: string[]) => void
}

export function ProfileImageGallery({
  images,
  onImagesChange,
}: ProfileImageGalleryProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">My Photos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add photos to your profile gallery to showcase your travel experiences
        </p>
      </div>

      <ImageGallery
        images={images}
        onImagesChange={onImagesChange}
        maxImages={12}
        maxSize={10}
        allowDelete={true}
      />
    </div>
  )
}
