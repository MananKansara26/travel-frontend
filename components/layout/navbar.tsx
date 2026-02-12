"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface User {
  name: string
  email: string
  currentlyTraveling?: boolean
  currentTrip?: string
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("travelh_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("travelh_user")
    router.push("/sign-in")
  }

  const isActive = (path: string) => pathname === path

  if (!user) return null

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
            <span className="text-foreground hidden sm:inline">Travelh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Explore
            </Link>
            <Link
              href="/trips"
              className={`text-sm font-medium transition-colors ${
                isActive("/trips") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Trips
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium transition-colors ${
                isActive("/profile") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Profile
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user.currentlyTraveling && user.currentTrip && (
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  <span className="hidden lg:inline">In {user.currentTrip}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-foreground hidden lg:inline">{user.name}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Logout"
            >
              ↪
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-secondary rounded transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {user.currentlyTraveling && user.currentTrip && (
              <div className="px-4 py-2 bg-accent/10 text-accent rounded text-sm font-medium">
                Currently in {user.currentTrip}
              </div>
            )}
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/trips"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trips
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
