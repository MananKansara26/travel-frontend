"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ExploreHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative bg-gradient-to-r from-primary/20 to-accent/20 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Discover Your Next Adventure</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore breathtaking destinations, find hidden gems, and connect with fellow travelers around the world.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-8">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
              <Input
                type="text"
                placeholder="Find places, cafes, or attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search destinations"
              />
            </div>
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
