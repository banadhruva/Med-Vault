/** @type {import('next').NextConfig} */
const nextConfig = {
  // This forces the use of Webpack even if Turbopack is the default
  experimental: {
    turbo: {
      // Set to false to disable
      enabled: false
    }
  }
};

export default nextConfig;