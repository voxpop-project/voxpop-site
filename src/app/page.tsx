import { redirect } from "next/navigation";

// Redirection serveur de la racine vers la page citoyenne.
// Le splash 2-portes sera réintégré plus tard (conversion HTML → React Server Component).
export default function RootPage() {
  redirect("/citoyens");
}
