/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.com"],
    remotePatterns: [{
      protocol: "https",
      hostname: "dgalywyr863hv.cloudfront.net",
      port: '',
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: 'lh3.googleusercontent.com',
      pathname: "/**",
    }
  ]
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
