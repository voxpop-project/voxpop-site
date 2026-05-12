/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // "/" est maintenant servi par src/app/page.tsx (vitrine projet React)
      { source: "/citoyens", destination: "/preview/vox-populi.html" },
      { source: "/splash", destination: "/preview/splash.html" },
      { source: "/petition-2027", destination: "/preview/petition-presidentielle-2027.html" },
      { source: "/dashboard-demo", destination: "/preview/dashboard.html" },
      { source: "/preview-faq", destination: "/preview/faq.html" },
    ];
  },
};

export default nextConfig;
