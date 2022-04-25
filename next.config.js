const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "uk"],
    defaultLocale: "en",
    localeDetection: true,
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
});

module.exports = nextConfig;
