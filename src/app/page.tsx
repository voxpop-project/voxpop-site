// Cette page existe pour satisfaire le routing Next.js App Router.
// La requête réelle sur "/" est interceptée par le rewrite Vercel (next.config.mjs)
// qui sert public/preview/splash.html avant que cette page soit rendue.
// Si jamais le rewrite ne s'applique pas (cas d'erreur), on affiche un fallback minimal.
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050912", color: "#E2E8F0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center", padding: 40 }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>
          <span style={{ color: "#E2E8F0" }}>Vox</span>
          <span style={{ color: "#D4A015" }}>Pop</span>
        </h1>
        <p style={{ fontSize: 18, marginBottom: 24, color: "#94A3B8" }}>
          Une nouvelle ère pour la démocratie.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/citoyens" style={{ padding: "12px 24px", background: "#D4A015", color: "#050912", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            Je suis un citoyen →
          </a>
          <a href="/organisations" style={{ padding: "12px 24px", background: "transparent", color: "#FCD34D", border: "1.5px solid #D4A015", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            Je représente une organisation →
          </a>
        </div>
      </div>
    </main>
  );
}
