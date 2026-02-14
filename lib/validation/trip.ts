import { z } from "zod"

export const tripSchema = z
  .object({
    title: z.string().trim().min(1, "Trip title is required"),
    destination: z.string().min(1, "Please select a destination"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    description: z.string().trim().min(1, "Trip description is required"),
    openForJoin: z.boolean().default(false),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after start date",
    path: ["endDate"],
  })

export type TripSchema = z.infer<typeof tripSchema>
