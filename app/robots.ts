import type { MetadataRoute } from "next"

const SITE = "https://eccdigital.cz"
const BASE_PATH = "/eccdigital-staging"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: `${BASE_PATH}/ukazky/` }],
    sitemap: `${SITE}${BASE_PATH}/sitemap.xml`,
  }
}
