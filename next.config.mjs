/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Le rewrite "/" est géré par src/middleware.ts (plus robuste avec Next.js)
      { source: "/citoyens", destination: "/preview/vox-populi.html" },
      { source: "/splash", destination: "/preview/splash.html" },
      { source: "/petition-2027", destination: "/preview/petition-presidentielle-2027.html" },
      { source: "/dashboard-demo", destination: "/preview/dashboard.html" },
      { source: "/preview-faq", destination: "/preview/faq.html" },
    ];
  },
};

export default nextConfig;
