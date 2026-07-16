import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'assets.aceternity.com' }
        ],
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https: http:",
                            "media-src 'self' https://commondatastorage.googleapis.com https://storage.googleapis.com blob:",
                            "connect-src 'self' blob: https: wss:",
                            "frame-src 'self' https:",
                            "worker-src 'self' blob:",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);

