/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrlApi: "http://ewon-vpn.ddns.net:8200/api",
        baseUrlWebsocket: "http://ewon-vpn.ddns.net:8200",
        baseUrlWebsocketAlarmBell:
            "ws://ewon-vpn.ddns.net:8200/api/ws/plugins/notifications?token=",
        baseUrlWebsocketTelemetry:
            "ws://ewon-vpn.ddns.net:8200/api/ws/plugins/telemetry?token=",
    },
};

module.exports = nextConfig;
