/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1474899231.rsc.cdn77.org",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "apiv3.apifootball.com",
      },
    ],
  },
}

export default nextConfig
