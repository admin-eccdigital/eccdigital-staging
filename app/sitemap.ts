import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

const SITE = "https://eccdigital.cz"
const BASE_PATH = "/eccdigital-staging"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE}${BASE_PATH}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}${BASE_PATH}/blog/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${SITE}${p.url}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
  return entries
}
