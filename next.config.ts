import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode in development
  reactStrictMode: true,
  
  // Enable server components (if using App Router)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*'] // Be more specific in production
    },
  },
  
  // Configure images (if using Next.js Image component)
  images: {
    domains: [
      'localhost',
      'images.pexels.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.pexels.com',
      },
    ],
    // Optimize images for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable webpack 5 for better performance
  webpack: (config, { isServer }) => {
    // Optimize chunk sizes
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    };
    
    return config;
  },
  
  // Enable output file tracing for better deployment optimization
  output: 'standalone',
  
  // Enable compiler optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
};

export default nextConfig;
