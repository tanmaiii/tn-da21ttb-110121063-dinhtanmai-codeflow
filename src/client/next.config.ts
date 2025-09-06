import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin(); 

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: "backend",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", // Thay đổi từ http sang https
        hostname: "api-codeflow.tanmai.id.vn", // Thay đổi từ localhost:3001
        pathname: "/**",
      },
      {
        protocol: "https", // Thay đổi từ http sang https
        hostname: "api-codeflow.tanmai.id.vn", // Thay đổi từ backend
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/public/images/:path*`,
      },
      // Thêm rewrite cho uploads directory
      {
        source: "/uploads/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/uploads/:path*`,
      },
    ];
  },
  // Docker support - enable standalone output
  output: 'standalone',
  // Remove custom webpack config for SVG - let Next.js handle it natively
  // SEO Optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
};

export default withNextIntl(config);
