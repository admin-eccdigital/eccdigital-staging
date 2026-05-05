import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"

export const BASE_PATH = "/eccdigital-staging"

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

export type Author = {
  name: string
  title?: string
}

export type Post = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  imageUrl: string
  url: string
  readingMinutes: number
  draft: boolean
  author?: Author
}

function withBasePath(p: string): string {
  if (!p) return p
  if (/^https?:\/\//.test(p)) return p
  if (p.startsWith(BASE_PATH)) return p
  return `${BASE_PATH}${p.startsWith("/") ? "" : "/"}${p}`
}

function readPostFile(filePath: string): Post & { content: string } {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const slug = (data.slug as string) || path.basename(filePath, ".md")
  const image = (data.image as string) || ""
  const post: Post & { content: string } = {
    slug,
    title: data.title || "",
    date: data.date ? String(data.date).slice(0, 10) : "",
    category: data.category || "Obecné",
    excerpt: data.excerpt || "",
    image,
    imageUrl: image ? withBasePath(image) : "",
    url: `${BASE_PATH}/blog/${slug}/`,
    readingMinutes: Number(data.readingMinutes ?? 5),
    draft: Boolean(data.draft),
    author: data.author
      ? { name: data.author.name, title: data.author.title }
      : undefined,
    content,
  }
  return post
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"))
  const posts = files
    .map((f) => readPostFile(path.join(CONTENT_DIR, f)))
    .filter((p) => !p.draft)
    .map(({ content, ...rest }) => rest)
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return posts
}

export async function getPostBySlug(
  slug: string,
): Promise<(Post & { contentHtml: string }) | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { content, ...post } = readPostFile(filePath)
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  return { ...post, contentHtml: String(processed) }
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  return Array.from(new Set(posts.map((p) => p.category)))
}

export function formatCzechDate(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-")
  if (!y || !m || !d) return iso
  return `${parseInt(d, 10)}. ${parseInt(m, 10)}. ${y}`
}
