const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};

const sentryWebpackPluginOptions = {
  org: "przemysaw-szelenberger",
  project: "issue-tracker",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
