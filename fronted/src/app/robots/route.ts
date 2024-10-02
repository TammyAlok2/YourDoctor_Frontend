import { NextResponse } from 'next/server';

export const GET = () => {
  const robotsTxt = `
    User-agent: *
    Disallow: "/admin", "/privacy-policy"
    Allow: /
    Sitemap: https://www.yourlab.in/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

// import { MetadataRoute } from "next";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: "*",
//         allow: "/",
//         disallow: ["/admin", "/privacy-policy"],
//       },
//     ],
//     sitemap: "https://www.yourlab.in/sitemap.xml",
//   };
// }
