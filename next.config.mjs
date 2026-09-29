/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1080, 1440, 1920, 2560],
  },
  devIndicators: false,
}

export default nextConfig
