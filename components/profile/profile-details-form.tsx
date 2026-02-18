'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export interface ProfileDetails {
  name: string
  email: string
  bio?: string
  city?: string
  state?: string
  country?: string
  profession?: string
  age?: number
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  hobbies?: string[]
  interestedCategories?: string[]
}

interface ProfileDetailsFormProps {
  initialData: ProfileDetails
  onSubmit: (data: ProfileDetails) => void
  isLoading?: boolean
}

const interestCategories = [
  'Beach',
  'Mountains',
  'Urban Exploration',
  'Culture & History',
  'Food & Cuisine',
  'Adventure Sports',
  'Nature & Wildlife',
  'Photography',
  'Art & Museums',
  'Nightlife',
]

export function ProfileDetailsForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProfileDetailsFormProps) {
  const [formData, setFormData] = useState<ProfileDetails>(initialData)
  const [hobbyInput, setHobbyInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addHobby = () => {
    if (hobbyInput.trim() && (!formData.hobbies || formData.hobbies.length < 10)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), hobbyInput.trim()],
      }))
      setHobbyInput('')
    }
  }

  const removeHobby = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies?.filter((_, i) => i !== index) || [],
    }))
  }

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedCategories: prev.interestedCategories?.includes(category)
        ? prev.interestedCategories.filter((c) => c !== category)
        : [...(prev.interestedCategories || []), category],
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="bio" className="block text-sm font-medium text-foreground">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Location</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="city" className="block text-sm font-medium text-foreground">
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              placeholder="e.g., New York"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="state" className="block text-sm font-medium text-foreground">
              State/Province
            </label>
            <Input
              id="state"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
              placeholder="e.g., New York"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="country" className="block text-sm font-medium text-foreground">
              Country
            </label>
            <Input
              id="country"
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              placeholder="e.g., USA"
            />
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="profession" className="block text-sm font-medium text-foreground">
              Profession
            </label>
            <Input
              id="profession"
              name="profession"
              value={formData.profession || ''}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="age" className="block text-sm font-medium text-foreground">
              Age
            </label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age || ''}
              onChange={handleChange}
              placeholder="Your age"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="gender" className="block text-sm font-medium text-foreground">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Hobbies */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Hobbies</h3>

        <div className="flex gap-2">
          <Input
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            placeholder="Add a hobby (e.g., Photography)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addHobby()
              }
            }}
          />
          <Button type="button" onClick={addHobby} variant="outline">
            Add
          </Button>
        </div>

        {formData.hobbies && formData.hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.hobbies.map((hobby, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => removeHobby(index)}
                  className="text-xs hover:text-primary-dark"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Interested Travel Categories */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Travel Interests</h3>
        <p className="text-sm text-muted-foreground">
          Select the types of travel experiences you are interested in
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`p-3 rounded-lg border-2 transition font-medium text-sm ${
                formData.interestedCategories?.includes(category)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  )
}
