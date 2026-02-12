import type { Metadata } from "next"
import SignInForm from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - Travelh",
  description: "Sign in to your Travelh account to explore destinations and share your travel stories.",
}

export default function SignInPage() {
  return <SignInForm />
}
