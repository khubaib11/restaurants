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
      // Add your production domain(s) here
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Adjust this to be more specific in production
      },
    ],
  },
  
  // Enable webpack 5 for better performance
  webpack: (config, { isServer }) => {
    // Configure webpack to handle certain file types if needed
    // For example, if you're using SVGs as React components:
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });
    
    return config;
  },
  
  // Enable output file tracing for better deployment optimization
  output: 'standalone',
  
  // Enable SWC minification
  swcMinify: true,
  
  // Enable compiler optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
};

export default nextConfig;
