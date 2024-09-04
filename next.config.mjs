
/** @type {import('next').NextConfig} */

const nextConfig = {
  //largePageDataBytes: 128 * 10000,
 
  reactStrictMode: false,
  env: {
    PORT: process.env.PORT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_GRAPH_DEV: process.env.NEXT_PUBLIC_GRAPH_DEV,
    NEXT_PUBLIC_IMAGE_200: process.env.NEXT_PUBLIC_IMAGE_200,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_JWT_EXPIR: process.env.NEXT_PUBLIC_JWT_EXPIR,
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    //NODE_ENV: process.env.NODE_ENV,

    LIISMAIIL_HOST: process.env.LIISMAIIL_HOST,
    LIISMAIIL_ORG: process.env.LIISMAIIL_ORG,
    LIISMAIIL_GUEST: process.env.LIISMAIIL_GUEST,
    // local web box
    APP_ENV: process.env.APP_ENV,

    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    NEXT_PUBLIC_DB_ATLAS: process.env.NEXT_PUBLIC_DB_ATLAS

  },
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  },
  images: {
   remotePatterns: [ {
        protocol: 'https',
        hostname: '**.via.placeholder.com',
        port: '',
      },{
        protocol: 'https',
        hostname: '**.res.cloudinary.com',
        port: '',
      },
      ],
  }
  
};


export default nextConfig /* withSentryConfig(withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "liismaiil",
project: "liismaiil-hub",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
}), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "liismaiil",
project: "liismaiil-hub",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
}); */