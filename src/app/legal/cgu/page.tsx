import { SectionTitle } from "@/components/ui/SectionTitle";

export default function CGU() {
  return (
    <div className="overflow-hidden pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Conditions Générales d'Utilisation"
            subtitle="Dernière mise à jour : Février 2026"
          />

          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            {/* Article 1 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 1 — Objet</h2>
              <p className="text-slate-400 leading-relaxed">
                Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation
                de la plateforme Vox Pop, accessible via application mobile, application web (PWA) et site internet.
              </p>
              <p className="text-slate-400 leading-relaxed mt-3">
                Vox Pop est une plateforme permettant aux citoyens et organisations de voter de manière
                sécurisée et anonyme, avec des résultats vérifiables et impossibles à censurer.
              </p>
            </section>

            {/* Article 2 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 2 — Acceptation des conditions</h2>
              <p className="text-slate-400 leading-relaxed">
                L&apos;utilisation de Vox Pop implique l&apos;acceptation pleine et entière des présentes CGU.
                Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser la plateforme.
              </p>
            </section>

            {/* Article 3 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 3 — Description du service</h2>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">3.1 Fonctionnalités principales</h3>
              <ul className="text-slate-400 space-y-2 list-disc pl-5">
                <li>Vote sécurisé et anonyme pour organisations (associations, copropriétés, CSE, collectivités)</li>
                <li>Chiffrement de bout en bout de chaque vote</li>
                <li>Résultats vérifiables avec audit trail complet</li>
                <li>Sondages citoyens ouverts au monde (mode Vox Populi)</li>
              </ul>
              <h3 className="text-lg font-semibold text-slate-200 mb-3 mt-6">3.2 Gratuité</h3>
              <p className="text-slate-400 leading-relaxed">
                Le mode Vox Populi est gratuit. Le mode institutionnel est soumis à un abonnement
                dont les détails sont présentés sur la page Tarifs.
              </p>
            </section>

            {/* Article 4 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 4 — Anonymat et protection de l&apos;identité</h2>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">4.1 Notre engagement d&apos;anonymat</h3>
              <p className="text-slate-400 leading-relaxed">
                Vox Pop s&apos;engage à ne collecter aucune donnée permettant d&apos;identifier personnellement
                ses utilisateurs en mode Vox Populi :
              </p>
              <ul className="text-slate-400 space-y-2 list-disc pl-5 mt-3">
                <li>Aucun nom, prénom ou pseudonyme n&apos;est requis</li>
                <li>Aucune adresse IP n&apos;est stockée de manière permanente</li>
                <li>Aucun identifiant publicitaire n&apos;est utilisé</li>
              </ul>
            </section>

            {/* Article 5 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 5 — Obligations de l&apos;utilisateur</h2>
              <p className="text-slate-400 leading-relaxed">
                L&apos;utilisateur s&apos;engage à utiliser la plateforme de manière conforme aux lois en vigueur
                et aux présentes CGU. Tout abus (votes multiples, tentative de fraude, contenu illégal)
                est strictement interdit et pourra entraîner la suspension du compte.
              </p>
            </section>

            {/* Article 6 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 6 — Propriété intellectuelle</h2>
              <p className="text-slate-400 leading-relaxed">
                L&apos;ensemble des éléments constituant la plateforme Vox Pop (code, design, marque, logo)
                sont la propriété exclusive de Punch Ventures LLC. Toute reproduction sans autorisation
                est interdite.
              </p>
            </section>

            {/* Article 7 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 7 — Responsabilité</h2>
              <p className="text-slate-400 leading-relaxed">
                Vox Pop met tout en œuvre pour assurer la disponibilité et la sécurité de la plateforme.
                Toutefois, Vox Pop ne saurait être tenu responsable en cas de force majeure,
                de dysfonctionnement lié à Internet ou d&apos;événements indépendants de sa volonté.
              </p>
            </section>

            {/* Article 8 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 8 — Droit applicable</h2>
              <p className="text-slate-400 leading-relaxed">
                Les présentes CGU sont soumises au droit américain (Wyoming) pour le mode institutionnel,
                et au droit européen pour les utilisateurs résidant dans l&apos;Union Européenne.
              </p>
            </section>

            {/* Contact */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
              <p className="text-slate-400 leading-relaxed">
                Pour toute question relative aux présentes CGU :{" "}
                <a href="mailto:legal@voxpop.app" className="text-vp-teal hover:underline">
                  legal@voxpop.app
                </a>
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Punch Ventures LLC — Wyoming, USA
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
