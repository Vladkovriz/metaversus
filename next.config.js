const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true };

    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: ["style-loader", "css-loader", "postcss-loader"],
    // });

    config.plugins.push(
      new NextFederationPlugin({
        name: "metaversus",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          portfolio: `portfolio@http://localhost:3000/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./sharedPage": "./pages/index.tsx",
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
