"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Plus, X } from "lucide-react"

export interface Review {
  id: number
  userId: number
  userName: string
  userAvatar: string
  rating: number
  comment: string
  aspectRatings: AspectRating[]
  createdAt: string
}

export interface AspectRating {
  aspect: string
  rating: number
}

interface PlaceReviewProps {
  placeId: number
  reviews: Review[]
  onAddReview: (review: Review) => void
}

const aspects = ["Food Quality", "Cleanliness", "Connectivity", "Staff Behavior", "Value for Money", "Safety"]

export default function PlaceReview({ placeId, reviews, onAddReview }: PlaceReviewProps) {
  const [showAddReview, setShowAddReview] = useState(false)
  const [selectedAspects, setSelectedAspects] = useState<{ [key: string]: number }>({})
  const [comment, setComment] = useState("")
  const [overallRating, setOverallRating] = useState(0)

  const placeReviews = reviews.filter((r) => r.id === placeId)
  const averageRating =
    placeReviews.length > 0 ? (placeReviews.reduce((sum, r) => sum + r.rating, 0) / placeReviews.length).toFixed(1) : 0

  const aspectAverages = aspects.map((aspect) => ({
    aspect,
    average: (
      placeReviews
        .flatMap((r) => r.aspectRatings)
        .filter((ar) => ar.aspect === aspect)
        .reduce((sum, ar) => sum + ar.rating, 0) / Math.max(
        placeReviews.filter((r) => r.aspectRatings.find((ar) => ar.aspect === aspect)).length,
        1
      )
    ).toFixed(1),
  }))

  const handleAddReview = () => {
    if (overallRating === 0) {
      alert("Please provide an overall rating")
      return
    }

    const newReview: Review = {
      id: placeId,
      userId: 1,
      userName: "You",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: overallRating,
      comment,
      aspectRatings: aspects.map((aspect) => ({
        aspect,
        rating: selectedAspects[aspect] || 0,
      })),
      createdAt: new Date().toISOString(),
    }

    onAddReview(newReview)
    setShowAddReview(false)
    setComment("")
    setOverallRating(0)
    setSelectedAspects({})
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <Button
              onClick={() => setShowAddReview(!showAddReview)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Review
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Aspect Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Aspect Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aspectAverages.map(({ aspect, average }) => (
              <div key={aspect} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{aspect}</span>
                  <span className="text-sm text-muted-foreground">{average}/5</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(Number(average) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Review Form */}
      {showAddReview && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Rating */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Overall Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setOverallRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= overallRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratings */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Rate Different Aspects</label>
              {aspects.map((aspect) => (
                <div key={aspect} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{aspect}</span>
                    <span className="text-xs text-muted-foreground">{selectedAspects[aspect] || 0}/5</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          setSelectedAspects((prev) => ({ ...prev, [aspect]: star }))
                        }
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (selectedAspects[aspect] || 0)
                              ? "fill-blue-400 text-blue-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddReview(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddReview}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent Reviews ({placeReviews.length})</h3>
        {placeReviews.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
              No reviews yet. Be the first to review!
            </CardContent>
          </Card>
        ) : (
          placeReviews.map((review) => (
            <Card key={review.userId}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {review.comment && <p className="text-sm">{review.comment}</p>}

                  {review.aspectRatings.filter((ar) => ar.rating > 0).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t">
                      {review.aspectRatings
                        .filter((ar) => ar.rating > 0)
                        .map((ar) => (
                          <div key={ar.aspect} className="text-xs">
                            <p className="font-medium">{ar.aspect}</p>
                            <div className="flex gap-0.5 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= ar.rating ? "fill-blue-400 text-blue-400" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
