import { z } from "zod"

export const diarySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  place: z.string().min(1, "Please select a place"),
  date: z.string().min(1, "Date is required"),
  content: z.string().trim().min(1, "Your story is required"),
})

export type DiarySchema = z.infer<typeof diarySchema>
