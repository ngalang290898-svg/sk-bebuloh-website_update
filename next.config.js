/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      // add your supabase domain:
      "vrezurdhbhqfpriwafdu.supabase.co"
    ],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
