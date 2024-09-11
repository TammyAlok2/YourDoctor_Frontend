/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    target: "ES2015", // or higher
    downlevelIteration: true,
    lib: ["ES2015", "DOM"], // or "ES2016", "ES2017", etc.
    // other options...
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
};

export default nextConfig;
