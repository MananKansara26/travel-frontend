import type { Metadata } from "next"
import DiaryList from "@/components/diary/diary-list"

export const metadata: Metadata = {
  title: "My Diary - Travelh",
  description: "Read and create your travel diary entries. Share your travel stories with the world.",
}

export default function DiaryPage() {
  return <DiaryList />
}
