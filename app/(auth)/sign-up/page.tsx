import type { Metadata } from "next"
import SignUpForm from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up - Travelh",
  description: "Create a new Travelh account to start exploring and sharing your travel adventures.",
}

export default function SignUpPage() {
  return <SignUpForm />
}
