/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the app to be embedded in iframes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Allow same-origin iframes, change to 'ALLOWALL' if needed
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *", // Allow embedding in any iframe
          },
        ],
      },
    ];
  },
  // Ensure proper handling of iframe navigation
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
