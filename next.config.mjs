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
            value: 'ALLOWALL', // Allow embedding in any iframe
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *", // Allow embedding from any origin
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
