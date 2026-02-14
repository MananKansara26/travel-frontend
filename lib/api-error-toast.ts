import { toast } from "@/hooks/use-toast"

const DEFAULT_MESSAGE = "Something went wrong. Please try again."

/** Shape we expect from Apollo/GraphQL errors */
type ApolloErrorShape = {
  graphQLErrors?: Array<{ message?: string }>
  networkError?: { message?: string }
}

/**
 * Extracts a user-friendly message from various error types (GraphQL, fetch, generic).
 */
function getErrorMessage(error: unknown): string {
  if (!error) return DEFAULT_MESSAGE

  // Plain string message
  if (typeof error === "string") return error

  // Apollo/GraphQL errors
  const apolloError = error as Partial<ApolloErrorShape>
  if (apolloError.graphQLErrors?.length) {
    const msg = apolloError.graphQLErrors[0]?.message
    if (msg) return msg
  }
  if (apolloError.networkError?.message) {
    return apolloError.networkError.message
  }

  // Standard Error
  if (error instanceof Error && error.message) {
    return error.message
  }

  // Fetch API Response with error body
  if (typeof error === "object" && "message" in error && typeof (error as { message: unknown }).message === "string") {
    return (error as { message: string }).message
  }

  return DEFAULT_MESSAGE
}

/**
 * Displays API errors globally using the shadcn toaster.
 * Call from catch blocks or anywhere API errors need to be shown.
 */
export function showApiError(error: unknown, title = "Error"): void {
  const message = getErrorMessage(error)
  toast({
    title,
    description: message,
    variant: "destructive",
  })
}
