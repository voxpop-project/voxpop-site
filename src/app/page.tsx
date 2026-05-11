import { redirect, permanentRedirect } from "next/navigation";

// Force dynamic rendering pour éviter le CDN cache figé.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootPage() {
  // Redirection serveur de la racine vers la page citoyenne.
  // Le splash 2-portes sera réintégré plus tard.
  redirect("/citoyens");
}
