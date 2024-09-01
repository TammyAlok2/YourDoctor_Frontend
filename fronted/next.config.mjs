/** @type {import('next').NextConfig} */
const nextConfig = {
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
      "thumbs.dreamstime.com"
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5000/v1/:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
