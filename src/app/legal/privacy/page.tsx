import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Privacy() {
  return (
    <div className="overflow-hidden pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Politique de Confidentialité"
            subtitle="Dernière mise à jour : Février 2026"
          />

          {/* Intro */}
          <div className="glass-card p-8 mb-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-white mb-3">
              Notre engagement : la parole sans la peur
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Vox Pop a été conçu dès l&apos;origine pour protéger votre anonymat.
              Contrairement à la plupart des services numériques, nous ne collectons pas
              vos données personnelles — c&apos;est notre promesse fondamentale.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Qui sommes-nous ?</h2>
              <p className="text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Responsable du traitement :</strong><br />
                Vox Pop — Punch Ventures LLC<br />
                Email :{" "}
                <a href="mailto:privacy@voxpop.app" className="text-vp-teal hover:underline">
                  privacy@voxpop.app
                </a>
              </p>
            </section>

            {/* Section 2 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">2. Données que nous ne collectons PAS</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Vox Pop se distingue par les données que nous <strong className="text-white">ne collectons pas</strong> :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Donnée</th>
                      <th className="text-center py-3 px-4 text-slate-300 font-semibold">Collectée ?</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-400">
                    {[
                      "Nom, prénom",
                      "Email",
                      "Numéro de téléphone",
                      "Adresse IP (permanente)",
                      "Localisation GPS",
                      "Identifiant publicitaire",
                      "Empreinte biométrique",
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 px-4">{item}</td>
                        <td className="py-3 px-4 text-center text-red-400 font-bold">❌ NON</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Données que nous traitons</h2>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">3.1 Données techniques temporaires</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Pour le fonctionnement du service, nous traitons temporairement :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Donnée</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Durée</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Finalité</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-400">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">Adresse IP</td>
                      <td className="py-3 px-4">Session uniquement</td>
                      <td className="py-3 px-4">Prévention des abus</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">User Agent</td>
                      <td className="py-3 px-4">Session uniquement</td>
                      <td className="py-3 px-4">Compatibilité technique</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4">Cookies de session</td>
                      <td className="py-3 px-4">Session uniquement</td>
                      <td className="py-3 px-4">Maintien de la connexion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">4. Sécurité des données</h2>
              <ul className="text-slate-400 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-vp-teal mt-0.5">✓</span>
                  Chiffrement de bout en bout (E2E) pour tous les votes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vp-teal mt-0.5">✓</span>
                  Hébergement en Europe (conformité RGPD)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vp-teal mt-0.5">✓</span>
                  Privacy by design : le minimum de données, le maximum de protection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vp-teal mt-0.5">✓</span>
                  Audit de sécurité régulier par des tiers indépendants
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vp-teal mt-0.5">✓</span>
                  Modules cryptographiques open source pour audit public
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Vos droits (RGPD)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD),
                vous disposez des droits suivants :
              </p>
              <ul className="text-slate-400 space-y-2 list-disc pl-5">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;opposition</li>
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                Pour exercer vos droits, contactez-nous à{" "}
                <a href="mailto:privacy@voxpop.app" className="text-vp-teal hover:underline">
                  privacy@voxpop.app
                </a>
              </p>
            </section>

            {/* Section 6 */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Cookies</h2>
              <p className="text-slate-400 leading-relaxed">
                Vox Pop utilise uniquement des cookies strictement nécessaires au fonctionnement
                du service. Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
              </p>
            </section>

            {/* Contact */}
            <section className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-4">Contact DPO</h2>
              <p className="text-slate-400 leading-relaxed">
                Pour toute question relative à la protection de vos données :{" "}
                <a href="mailto:privacy@voxpop.app" className="text-vp-teal hover:underline">
                  privacy@voxpop.app
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
