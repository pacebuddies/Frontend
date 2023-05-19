/** @type {import('next').NextConfig} */
// const path = require('path')

const nextConfig = {
  images: {
    domains: ["flowbite.com"],
    remotePatterns: [{
      protocol: "https",
      hostname: "**.cloudfront.net",
      port: '',
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: '**.googleusercontent.com',
      pathname: "/**",
    }
  ]
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entryConfig = await originalEntry(...arguments)
      return { ...entryConfig, 'firebase-messaging-sw':"./src/firebase/firebase-messaging-sw.ts"}
    }
    // config.output.filename = (pathData) => {
    //   return pathData.chunk.name === 'firebase-messaging-sw' ? '[name].js' : '[name].[hash].js'
    // }
    config.optimization.runtimeChunk = false
    return config
  },
  // chainWebpack: config => {
  //   config.plugin('html').tap(args => ((args[0].excludeChunks = ['firebase-messaging-sw']),args))
  // }
};

module.exports = nextConfig;
