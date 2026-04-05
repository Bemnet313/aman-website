/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Ensure trailing slashes for better Netlify compatibility
    trailingSlash: true,
};

export default nextConfig;
