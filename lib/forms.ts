/**
 * Project-wide form utilities.
 * Use with react-hook-form + zodResolver for consistent form handling.
 *
 * Example:
 *   import { useForm } from "react-hook-form"
 *   import { zodResolver } from "@hookform/resolvers/zod"
 *   import { loginSchema } from "@/lib/validation"
 *
 *   const form = useForm({
 *     resolver: zodResolver(loginSchema),
 *     defaultValues: { email: "", password: "" },
 *   })
 */
export { useForm, useFormContext } from "react-hook-form"
export { zodResolver } from "@hookform/resolvers/zod"
