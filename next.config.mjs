/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/eccdigital-staging",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
