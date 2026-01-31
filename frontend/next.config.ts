/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'iteka2026.onrender.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    // Génération sitemap
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/sitemap',
            },
            {
                source: '/robots.txt',
                destination: '/robots',
            },
        ];
    },
};

module.exports = nextConfig;