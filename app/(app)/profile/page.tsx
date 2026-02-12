import type { Metadata } from "next"
import UserProfile from "@/components/profile/user-profile"

export const metadata: Metadata = {
  title: "Profile - Travelh",
  description: "View and manage your Travelh profile.",
}

export default function ProfilePage() {
  return <UserProfile />
}
