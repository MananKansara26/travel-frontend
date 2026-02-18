'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PopularMoments } from '@/components/explore/popular-moments'
import { FollowedMoments } from '@/components/explore/followed-moments'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import moments from '@/data/moments.json'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('popular')

  const filteredMoments = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return moments.filter(
      (moment) =>
        moment.title.toLowerCase().includes(query) ||
        moment.description.toLowerCase().includes(query) ||
        (moment.place?.toLowerCase().includes(query) ?? false)
    )
  }, [searchQuery])

  // Separate public moments for explore
  const publicMoments = filteredMoments.filter((m) => m.isPublic)

  // Mock followed moments (in real app, would come from user follows)
  const followedMoments = publicMoments.slice(0, Math.ceil(publicMoments.length / 2)).map((m) => ({
    ...m,
    author: {
      id: `user-${m.tripId}`,
      name: `Traveler ${m.tripId}`,
      avatar: `/placeholder.svg?height=40&width=40`,
    },
  }))

  return (
    <main className="flex-1 max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Explore</h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing moments from travelers around the world
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search moments by title, place, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="popular">Popular Moments</TabsTrigger>
          <TabsTrigger value="followed">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-8">
          <PopularMoments moments={publicMoments} />
        </TabsContent>

        <TabsContent value="followed" className="mt-8">
          <FollowedMoments moments={followedMoments} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
