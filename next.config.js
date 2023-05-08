/** @type {import('next').NextConfig} */
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
  swcMinify: true
};

module.exports = nextConfig;
