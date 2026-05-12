import fs from "node:fs/promises";
import path from "node:path";

// Route handler à la racine : sert le splash HTML directement, URL reste "/".
// Bypass le rendering Next.js standard pour éviter les conflits de cache CDN.
export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "preview", "splash.html");
  const html = await fs.readFile(filePath, "utf-8");

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
