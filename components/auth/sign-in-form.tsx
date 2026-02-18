"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@apollo/client/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LOGIN_MUTATION } from "@/graphql"
import { showApiError } from "@/lib/api-error-toast"
import { loginSchema, type LoginSchema } from "@/lib/validation/auth"
import { toast } from "@/hooks/use-toast"

export default function SignInForm() {
  const router = useRouter()
  const [login, { data: mutationData, loading, error }] = useMutation(LOGIN_MUTATION)


  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginSchema) => {
    try {
      const result = await login({ variables: values })
      const loginPayload = (result.data as { login?: { user: unknown; token: string } })?.login

      if (!loginPayload) {
        showApiError("Invalid credentials. Please try again.", "Sign in failed")
        return
      }


      const { user, token } = loginPayload
      localStorage.setItem("travelh_token", token)
      localStorage.setItem("travelh_user", JSON.stringify(user))
      toast({ title: "Sign in successful", description: "You are now logged in" , variant: "success"})
      router.push("/dashboard")
    } catch (err) {
      showApiError(err, "Sign in failed")
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
          <span className="text-2xl font-bold text-foreground">Travelh</span>
        </div>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to explore destinations and share your stories</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
