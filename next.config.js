/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "supabase.co",
      "https://vrezurdhbhqfpriwafdu.supabase.co" // replace xyz with your real Supabase subdomain
    ],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
