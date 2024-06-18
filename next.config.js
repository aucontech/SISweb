/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/Graphic",
            },
        ];
    },
};

module.exports = nextConfig;
