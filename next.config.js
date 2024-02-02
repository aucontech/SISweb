/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrlApi: "http://ewon-vpn.ddns.net:8200/api",
        baseUrlWebsocket: "http://ewon-vpn.ddns.net:8200",
    },
};

module.exports = nextConfig;
