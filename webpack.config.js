/** @type {import('next').NextConfig} **/
const nextConfig = {
    env: {
        baseUrlApi: "http://ewon-vpn.ddns.net:8200/api",
        baseUrlApiv2: "http://ewon-vpn.ddns.net:8200/api/v2",
        baseUrlWebsocket: "ws://ewon-vpn.ddns.net:8200/api/ws/plugins",
        baseUrlWebsocketAlarmBell:
            "ws://ewon-vpn.ddns.net:8200/api/ws/plugins/notifications?token=",
        baseUrlWebsocketTelemetry:
            "ws://ewon-vpn.ddns.net:8200/api/ws/plugins/telemetry?token=",
        baseUrlApiChangeStatusBallValue:
            "/plugins/telemetry/DEVICE/28f7e830-a3ce-11ee-9ca1-8f006c3fce43/SERVER_SCOPE",
    },

    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp3)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash].[ext]",
                    },
                },
            ],
        });
        return config;
    },
};

module.exports = nextConfig;
