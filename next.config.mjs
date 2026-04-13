/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/eccdigital-staging",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
