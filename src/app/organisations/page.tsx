"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTAButton } from "@/components/ui/CTAButton";

const piliers = [
  {
    icon: "🔒",
    title: "Anonyme par mathématiques",
    description:
      "Pas une politique de confidentialité. Une propriété cryptographique. Même nous, on ne sait pas qui a voté quoi.",
  },
  {
    icon: "✅",
    title: "Vérifiable mathématiquement",
    description:
      "Chaque résultat peut être recalculé publiquement. Aucun trucage possible, par construction.",
  },
  {
    icon: "🇫🇷",
    title: "Souverain et conforme RGPD",
    description:
      "Données 100% en France (OVH). Conformité RGPD native (pas un add-on). Code open source auditable par votre DSI.",
  },
];

const stats = [
  { value: "1,5M", label: "d'associations en France" },
  { value: "370K+", label: "de copropriétés en France" },
  { value: "35K+", label: "de communes éligibles" },
  { value: "100%", label: "anonyme et vérifiable" },
];

function AnimatedCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-black gradient-text mb-2">{value}</div>
      <div className="text-slate-300 text-sm">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-vp-teal/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-vp-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vp-violet/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          {/* BIG LOGO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/images/logo.png"
              alt="VoxPop"
              width={160}
              height={160}
              className="mx-auto drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-slate-200 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-vp-teal animate-pulse" />
            Consultations souveraines · RGPD natif · France
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Bonnes questions.{" "}
            <span className="gradient-text">Vrais résultats.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Le vote anonyme et vérifiable pour vos consultations — associations, copropriétés, mairies, syndicats.
            <strong className="text-vp-teal"> Données 100% en France. Conforme RGPD natif.</strong>
            <br />
            <span className="text-sm text-slate-400 mt-2 inline-block">
              Vous êtes citoyen ? <a href="/citoyens" className="underline text-vp-gold hover:text-vp-teal">VoxPop Citoyens →</a>
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CTAButton href="/demo" large>
              Demander une démo
            </CTAButton>
            <CTAButton href="/how-it-works" variant="outline" large>
              En savoir plus
            </CTAButton>
          </motion.div>

          {/* Teaser video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="glass-card overflow-hidden rounded-2xl shadow-2xl shadow-vp-teal/10">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source src="/videos/teaser.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-vp-teal/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ========== LE CONCEPT ========== */}
      <section className="section-padding relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/aerial-city.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-vp-dark/80" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <SectionTitle
            title="Le concept VoxPop"
            subtitle="La plateforme de consultation pour vos décisions collectives."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-vp-deep to-vp-dark rounded-[3rem] border-2 border-white/20 shadow-2xl p-3">
                <div className="w-full h-full bg-vp-dark rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-center p-6">
                  <Image
                    src="/images/logo.png"
                    alt="VoxPop"
                    width={80}
                    height={80}
                    className="mb-6"
                  />
                  <h4 className="text-white font-bold text-lg mb-2">VoxPop</h4>
                  <p className="text-slate-400 text-xs mb-6">La voix du peuple</p>
                  <div className="w-full space-y-3">
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-teal font-semibold">🗳️ Vote en cours</div>
                      <div className="text-white text-sm mt-1">Budget participatif 2026</div>
                    </div>
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-gold font-semibold">📊 Résultats</div>
                      <div className="text-white text-sm mt-1">Élection du bureau</div>
                    </div>
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-blue font-semibold">🌍 Sondage citoyen</div>
                      <div className="text-white text-sm mt-1">Transition énergétique</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Concept text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vp-teal/15 text-vp-teal text-sm font-semibold mb-6">
                📱 Application mobile
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Consultez vos membres en toute sécurité, depuis leur téléphone
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  VoxPop est une <strong className="text-white">plateforme de vote sécurisée</strong> qui permet à vos adhérents, copropriétaires ou administrés de voter directement depuis leur smartphone.
                </p>
                <p>
                  Que vous soyez président d&apos;association, syndic de copropriété, élu municipal ou responsable syndical — VoxPop s&apos;adapte à vos besoins de consultation.
                </p>
                <p>
                  Vos votes sont <strong className="text-vp-teal">chiffrés</strong>, vos résultats <strong className="text-vp-teal">vérifiables</strong>, et l&apos;identité des votants <strong className="text-vp-teal">protégée</strong> par cryptographie zero-knowledge. RGPD natif, hébergement souverain.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PILIERS ========== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nos trois engagements"
            subtitle="Anonymat, vérifiabilité, souveraineté. Sans compromis."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {piliers.map((p, i) => (
              <GlassCard
                key={i}
                icon={<span>{p.icon}</span>}
                title={p.title}
                description={p.description}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== ZKP DIFFÉRENCIATION ========== */}
      <section className="section-padding bg-vp-deep border-y border-vp-teal/15">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Notre architecture technique"
            subtitle="Notre plateforme repose sur des technologies cryptographiques avancées — les mêmes que celles utilisées par les chercheurs et les protocoles décentralisés les plus exigeants. Aucun autre vote SaaS français ne fait ça."
          />

          <div className="grid md:grid-cols-2 gap-0 border border-vp-teal/25 rounded-2xl overflow-hidden">
            {/* Colonne tech pure */}
            <div className="bg-vp-dark p-8 border-r border-vp-teal/20">
              <div className="font-mono text-xs font-bold text-vp-teal tracking-widest uppercase mb-5 pb-3 border-b border-vp-teal/20">
                ▸ La techno pure
              </div>
              <ul className="space-y-3 font-mono text-sm text-slate-300">
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">Zero-Knowledge Proofs</strong> (Groth16, PLONK)</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">Nullifiers</strong> (protocole Semaphore)</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">Merkle Trees</strong> (arbre binaire de hashs)</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">Identity Commitments</strong> (Pedersen)</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">End-to-end verifiable</strong> (Helios, Adida 2008)</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10"><strong className="text-vp-teal">Hébergement souverain</strong> (France, OVH, RGPD)</li>
                <li><strong className="text-vp-teal">Audit cryptographique</strong> signé sur demande</li>
              </ul>
            </div>

            {/* Colonne explication concrète */}
            <div className="bg-vp-deep p-8">
              <div className="font-mono text-xs font-bold text-vp-gold tracking-widest uppercase mb-5 pb-3 border-b border-vp-teal/20">
                ▸ Concrètement, pour votre organisation :
              </div>
              <ul className="space-y-3 text-sm text-slate-100 leading-relaxed">
                <li className="pb-2 border-b border-dashed border-vp-teal/10">Prouver l&apos;éligibilité au vote <strong className="text-vp-gold">sans révéler l&apos;identité</strong> du votant</li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10">Un vote unique par votant, <strong className="text-vp-gold">impossible à dupliquer</strong></li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10">Liste des membres autorisés <strong className="text-vp-gold">chiffrée mais auditable</strong></li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10">L&apos;identité de chaque votant <strong className="text-vp-gold">scellée par mathématiques</strong></li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10">Chaque votant vérifie lui-même que <strong className="text-vp-gold">sa voix a été comptée</strong></li>
                <li className="pb-2 border-b border-dashed border-vp-teal/10">Données <strong className="text-vp-gold">100% hébergées en France</strong>, sous droit français</li>
                <li>Résultat <strong className="text-vp-gold">opposable juridiquement</strong>, audit indépendant possible</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-base text-slate-200 mt-8 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-vp-gold">100% open source · 100% consultable par tout le monde.</strong><br />
            Notre code est intégralement public sur GitHub sous licence libre <strong className="text-vp-gold">AGPL-3.0</strong>. Chaque ligne, chaque preuve cryptographique, chaque calcul peut être <strong className="text-vp-gold">audité, recompilé, vérifié</strong> par n&apos;importe quel chercheur, doctorant, journaliste tech ou DSI. <strong className="text-vp-gold">La porte est grande ouverte.</strong>
            <br />
            <span className="italic text-slate-400 text-sm">Aucun autre vote SaaS français ne fait ça.</span>
          </p>
          <div className="text-center mt-5">
            <a href="https://github.com/voxpop-project" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-lg border border-vp-teal/40 bg-vp-teal/10 text-vp-teal font-mono font-bold text-sm hover:bg-vp-teal/20 transition-all">
              → github.com/voxpop-project
            </a>
          </div>
        </div>
      </section>

      {/* ========== DUAL MODE ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/drone-panorama.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-vp-dark/80" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <SectionTitle
            title="Deux modes complémentaires"
            subtitle="Le vote sécurisé pour vos consultations — et la voix citoyenne libre, financée par votre abonnement."
            gold
          />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Institutionnel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-hover p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-vp-blue/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vp-blue/20 text-vp-blue text-xs font-semibold mb-6">
                  🏢 Mode Institutionnel
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">VoxPop pour votre organisation</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Vote sécurisé pour vos consultations légales (AG, élections statutaires, budgets).
                  Cryptographie auditable. Hébergement France. Conformité RGPD native.
                </p>
                <CTAButton href="/features" variant="outline">En savoir plus</CTAButton>
              </div>
            </motion.div>

            {/* Vox Populi */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-hover p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-vp-teal/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vp-teal/20 text-vp-teal text-xs font-semibold mb-6">
                  🌍 Mode Vox Populi
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">La voix du peuple, libre</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Pétitions anonymes, vérifiables, incensurables. Pour les citoyens du monde entier.
                  Financées par votre abonnement institutionnel.
                </p>
                <CTAButton href="/features">Découvrir</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== NOTRE ÉTHIQUE FINANCIÈRE ========== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="Notre éthique financière"
            subtitle="Qui finance VoxPop ? Comment ? Avec quelle indépendance ? On répond précisément."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                <span className="gradient-text">Indépendance</span> par construction.
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  VoxPop est édité par la <strong className="text-white">SASU Pelegrinus</strong> (SIREN 948 908 348, France). Aucun parti, aucun État, aucune fondation politique, aucun fonds étranger ne détient de part ni n&apos;influence VoxPop.
                </p>
                <p>
                  Notre <strong className="text-vp-teal">modèle économique</strong> est simple : les abonnements institutionnels (associations, copropriétés, mairies, syndicats) financent à la fois l&apos;infrastructure technique et l&apos;app citoyenne gratuite.
                </p>
                <p>
                  Quand une organisation paye son abonnement, elle finance <strong className="text-vp-teal">l&apos;outil de consultation de ses membres</strong> ET <strong className="text-vp-teal">l&apos;app citoyenne libre</strong> accessible à tous. Pas de mécène politique, pas d&apos;agenda caché.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                {
                  icon: "🇫🇷",
                  title: "100% société française",
                  desc: "SASU Pelegrinus, SIREN 948 908 348. Aucune holding étrangère, aucune structure offshore.",
                },
                {
                  icon: "🚫",
                  title: "Indépendance politique",
                  desc: "Aucun parti, aucun candidat, aucun État ne possède de part dans VoxPop. Verrouillé par les statuts.",
                },
                {
                  icon: "💰",
                  title: "Pas de fonds étrangers",
                  desc: "Pas d'argent d'États étrangers, pas de fondations politiques. Modèle d'affaires transparent : abonnements clients.",
                },
                {
                  icon: "📖",
                  title: "Transparence totale",
                  desc: "Comptes de la SASU consultables sur Pappers. Code source public sur GitHub sous licence AGPL-3.0.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover p-5 flex gap-4"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Vos questions, nos réponses"
            subtitle="Tout ce que vous devez savoir avant de nous faire confiance."
          />
          <div className="space-y-4">
            {[
              {
                q: "Comment garantissez-vous l'anonymat des votes ?",
                a: "Nous utilisons les Zero-Knowledge Proofs, une technologie cryptographique qui prouve mathématiquement votre éligibilité au vote sans jamais révéler votre identité. Même nos serveurs ne peuvent pas associer un bulletin à un votant — c'est une garantie mathématique, pas une promesse contractuelle.",
              },
              {
                q: "Mon organisation peut-elle vraiment utiliser VoxPop pour ses élections officielles ?",
                a: "Oui. VoxPop respecte les exigences du Code du travail (élections CSE), les statuts des ordres professionnels, et les recommandations CNIL pour le vote électronique. Nous fournissons sur demande un rapport d'audit cryptographique, signé, opposable juridiquement.",
              },
              {
                q: "Que coûte concrètement VoxPop pour une association de 200 membres ?",
                a: "À partir de 17€/mois en abonnement Starter — moins qu'un dîner au restaurant. Cela inclut le vote, les notifications email, le support, et la conformité RGPD. La version gratuite est disponible pour tester.",
              },
              {
                q: "Vos données sont-elles hébergées en France ?",
                a: "Oui, nos serveurs sont en France (OVH Gravelines). Aucune donnée ne transite par des infrastructures hors Union européenne. Aucune exposition au Cloud Act américain. Votre conformité RGPD est protégée par construction.",
              },
              {
                q: "Le code est-il open source ?",
                a: "Oui, sous licence AGPL-3.0. Le code est publié sur github.com/voxpop-project. N'importe quel expert indépendant peut auditer notre cryptographie. Aucune boîte noire.",
              },
              {
                q: "Quelle est la différence entre le mode Institutionnel et Vox Populi ?",
                a: "Le mode Institutionnel est notre offre payante pour organisations (associations, copropriétés, ordres professionnels, collectivités) avec accompagnement et SLA. Vox Populi est gratuit pour les citoyens du monde entier, financé par les revenus du mode Institutionnel. C'est notre engagement : chaque organisation qui paye finance la liberté d'expression d'un citoyen.",
              },
            ].map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group glass-card p-6 cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                  <span className="text-vp-teal text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-slate-300 mt-4 leading-relaxed">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vp-teal/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Prêt à passer du Doodle à la cryptographie ?"
            subtitle="Une démo gratuite de 30 minutes, en visio. Sans engagement, sans relance commerciale."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/demo" large variant="secondary">
              Demander une démo gratuite (30 min)
            </CTAButton>
            <CTAButton href="/contact" large variant="outline">
              Télécharger le dossier complet
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
