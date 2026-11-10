const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://res.cloudinary.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self' https://res.cloudinary.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: '/wedding-caterers-dwarka.html', destination: '/wedding-catering-dwarka', permanent: true },
      { source: '/wedding-decorator-dwarka-sector-5.html', destination: '/wedding-catering-dwarka', permanent: true },
      { source: '/wedding-decor.html', destination: '/wedding-catering-dwarka', permanent: true },
      { source: '/catering-services-gurgaon.html', destination: '/wedding-catering-gurugram', permanent: true },
      { source: '/corporate-catering-south-delhi.html', destination: '/corporate-catering-gurugram', permanent: true },
      { source: '/birthday-party-catering-noida.html', destination: '/birthday-catering-dwarka', permanent: true },
      { source: '/birthday-celebration.html', destination: '/birthday-catering-dwarka', permanent: true },
      { source: '/candle-lit-mandap.html', destination: '/gallery', permanent: true },
      { source: '/delicious-spreads.html', destination: '/packages', permanent: true },
      { source: '/dj-sound-setup.html', destination: '/gallery', permanent: true },
      { source: '/floral-stage-design.html', destination: '/gallery', permanent: true },
      { source: '/live-food-counters.html', destination: '/gallery', permanent: true },
      { source: '/cooler-arrangement.html', destination: '/', permanent: true },
      { source: '/thank-you.html', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/terms-of-service.html', destination: '/terms-of-service', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
