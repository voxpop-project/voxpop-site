/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // "/" est géré par src/app/route.ts (route handler servant splash.html)
      { source: "/citoyens", destination: "/preview/vox-populi.html" },
      { source: "/splash", destination: "/preview/splash.html" },
      { source: "/petition-2027", destination: "/preview/petition-presidentielle-2027.html" },
      { source: "/dashboard-demo", destination: "/preview/dashboard.html" },
      { source: "/preview-faq", destination: "/preview/faq.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=60, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
