// Copies media uploads from the content submodule (content/uploads/) into
// public/uploads/ before each Next.js build. Markdown files reference images
// as /uploads/<file>; we mirror that path under public/ so basePath-prefixed
// URLs (/eccdigital-staging/uploads/<file>) resolve to real assets in the
// static export.
//
// Runs as `prebuild` and `predev`. Safe to run repeatedly — it only copies
// files that are missing or older.

import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(ROOT, "content", "uploads")
const DEST = path.join(ROOT, "public", "uploads")

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function copyTree(src, dest) {
  let entries
  try {
    entries = await fs.readdir(src, { withFileTypes: true })
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(
        `[sync-content] Source ${src} does not exist — skipping. ` +
          `If this is a CI run, make sure the 'content' submodule is checked out.`,
      )
      return 0
    }
    throw err
  }
  await ensureDir(dest)
  let count = 0
  for (const e of entries) {
    const s = path.join(src, e.name)
    const d = path.join(dest, e.name)
    if (e.isDirectory()) {
      count += await copyTree(s, d)
    } else if (e.isFile()) {
      let needsCopy = true
      try {
        const [sStat, dStat] = await Promise.all([fs.stat(s), fs.stat(d)])
        needsCopy = sStat.mtimeMs > dStat.mtimeMs || sStat.size !== dStat.size
      } catch {
        needsCopy = true
      }
      if (needsCopy) {
        await fs.copyFile(s, d)
        count++
      }
    }
  }
  return count
}

const copied = await copyTree(SRC, DEST)
console.log(`[sync-content] Copied ${copied} file(s) from content/uploads/ → public/uploads/`)
