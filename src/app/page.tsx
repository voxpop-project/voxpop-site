import { redirect } from "next/navigation";

// Cette route est interceptée par le rewrite Vercel vers /preview/splash.html
// En fallback (si le rewrite ne s'applique pas), on redirige vers /organisations
export default function RootPage() {
  redirect("/organisations");
}
