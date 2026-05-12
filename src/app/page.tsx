import { redirect } from "next/navigation";

// Force dynamic rendering pour éviter le CDN cache figé.
// Le splash 2-portes sera converti en Server Component aujourd'hui (12/05).
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function RootPage() {
  // Redirection 308 (permanent) — Vercel CDN ne cache pas les 308 aussi agressivement.
  redirect("/citoyens");
}
