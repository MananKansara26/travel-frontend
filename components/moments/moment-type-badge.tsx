"use client"

import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Home, Camera, Train, Calendar } from "lucide-react"

interface MomentTypeBadgeProps {
  type: "departure" | "arrival" | "stay" | "site_visit" | "travel" | "event" | "other"
  label?: string
}

const typeConfig = {
  departure: {
    icon: Plane,
    label: "Departure",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  arrival: {
    icon: MapPin,
    label: "Arrival",
    color: "bg-green-100 text-green-800 border-green-300",
  },
  stay: {
    icon: Home,
    label: "Stay",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
  site_visit: {
    icon: Camera,
    label: "Site Visit",
    color: "bg-orange-100 text-orange-800 border-orange-300",
  },
  travel: {
    icon: Train,
    label: "Travel",
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  event: {
    icon: Calendar,
    label: "Event",
    color: "bg-pink-100 text-pink-800 border-pink-300",
  },
  other: {
    icon: MapPin,
    label: "Other",
    color: "bg-gray-100 text-gray-800 border-gray-300",
  },
}

export default function MomentTypeBadge({ type, label }: MomentTypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${config.color}`}>
      <Icon className="w-3 h-3" />
      <span>{label || config.label}</span>
    </Badge>
  )
}
