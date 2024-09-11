/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "img.icons8.com",
      "img.flaticon.com",
      "img.mm.bing.net",
      "static.vecteezy.com",
      "res.cloudinary.com",
      "slidesbase.com",
      "kotadiasdental.com",
      "tse2.mm.bing.net",
      "thumbs.dreamstime.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://api.yourlab.in/v1/:path*", // Proxy to backend
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;