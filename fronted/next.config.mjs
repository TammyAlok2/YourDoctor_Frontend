/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kotadiasdental.com',
        pathname: '/wp-content/uploads/**',
      },
    ],

    // s
    domains: [
      "img.icons8.com",
      "img.flaticon.com",
      "img.mm.bing.net",
      "static.vecteezy.com",
      "res.cloudinary.com",
      "previews.123rf.com",
      "kotadiasdental.com",
      "tse2.mm.bing.net",
      "unihealthparanaque.com",
      "www.figma.com",
      "bookmerilab.com",
      "dg0qqklufr26k.cloudfront.net",
      "img.freepik.com",
      "thumbs.dreamstime.com",
      "wallpaperaccess.com",
      "cdn.iconscout.com",
      "ultra-realhomes.b-cdn.net",
      "tse1.mm.bing.net",
      "wallpapercave.com"
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
