import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/utils/intl/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    swcMinify: true,
    reactStrictMode: true,
    assetPrefix: process.env.ASSET_PREFIX || undefined,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['app', 'lib', 'stories', 'test'],
    },
    experimental: process.env.CI
        ? {
              // This is experimental but can
              // be enabled to allow parallel threads
              // with nextjs automatic static generation
              workerThreads: false,
              cpus: 1,
              instrumentationHook: true,
          }
        : { instrumentationHook: true },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.dummyjson.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '**.gravatar.com',
                pathname: '**',
            },
        ],
    },
    /**
     * @type {import('webpack').Configuration}
     */
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },
};

/* TODO consider enabling this
  dev dep: "@next/bundle-analyzer": "^14.0.4", script: "analyze": "ANALYZE=true yarn run build",

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);
*/

export default withNextIntl(nextConfig);
