"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageGallery } from "@/components/common/image-gallery"
import { X } from "lucide-react"

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profileData: ProfileData) => void
  initialData?: ProfileData
}

export interface ProfileData {
  name: string
  bio: string
  photo: string
  age: number | null
  gender: string
  profession: string
  city: string
  state: string
  country: string
  images: string[]
  interestedCategories: string[]
}

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"]
const categoryOptions = ["Beach", "Mountain", "Historical", "Adventure", "Cultural", "Food", "Nature", "Urban"]

export default function ProfileEditModal({ isOpen, onClose, onSave, initialData }: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileData>(
    initialData || {
      name: "",
      bio: "",
      photo: "",
      age: null,
      gender: "",
      profession: "",
      city: "",
      state: "",
      country: "",
      images: [],
      interestedCategories: [],
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "age") {
      setFormData((prev) => ({ ...prev, [name]: value ? Number(value) : null }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedCategories: prev.interestedCategories.includes(category)
        ? prev.interestedCategories.filter((c) => c !== category)
        : [...prev.interestedCategories, category],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Please enter your name")
      return
    }
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background border-b">
          <CardTitle>Edit Profile</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Profession</label>
                  <Input
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleChange}
                    placeholder="Your age"
                    min="13"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input name="city" value={formData.city} onChange={handleChange} placeholder="Your city" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State/Province</label>
                  <Input name="state" value={formData.state} onChange={handleChange} placeholder="Your state" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input name="country" value={formData.country} onChange={handleChange} placeholder="Your country" />
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Profile Photo</h3>
              <div className="flex items-center gap-4">
                {formData.photo && (
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    placeholder="Paste image URL"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter a URL to an image</p>
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Gallery Images</h3>
              <ImageGallery
                images={formData.images}
                onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                maxImages={10}
              />
            </div>

            {/* Interested Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Interested Travel Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                      formData.interestedCategories.includes(category)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
