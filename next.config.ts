import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
    },
    // Ensure all routes are generated
    trailingSlash: true,
};

export default nextConfig;
