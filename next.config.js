/** @type {import('next').NextConfig} */
module.exports = {
        reactStrictMode: true,
        experimental: {
            appDir: true,
            esmExternals: "loose", // required to make Konva & react-konva work
        },

    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });
        }
            config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work

        return config;
    },
};
