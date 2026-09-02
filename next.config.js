/** @type {import('next').NextConfig} */

const remotePatterns = [];
if (process.env.R2_PUBLIC_URL) {
  const { protocol, hostname } = new URL(process.env.R2_PUBLIC_URL);
  remotePatterns.push({ protocol: protocol.replace(':', ''), hostname });
}

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
