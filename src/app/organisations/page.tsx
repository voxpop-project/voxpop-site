"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTAButton } from "@/components/ui/CTAButton";

const piliers = [
  {
    icon: "🔒",
    title: "Anonymat total",
    description:
      "Chaque vote est protégé par chiffrement zero-knowledge. Même l'administrateur ne peut savoir qui a voté quoi.",
  },
  {
    icon: "✅",
    title: "Résultats vérifiables",
    description:
      "Chaque vote est enregistré de manière immuable. Chaque membre peut vérifier publiquement que sa voix a été comptée.",
  },
  {
    icon: "🇫🇷",
    title: "Souverain et conforme RGPD",
    description:
      "Hébergement en France, conformité RGPD native, code open source auditable. Vos données ne quittent jamais l'Europe.",
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
            Une nouvelle ère pour la démocratie
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Le vote sécurisé,{" "}
            <span className="gradient-text">pour vos décisions</span>
            <br />
            <span className="gradient-text-gold">qui comptent vraiment.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            La plateforme de consultation et de vote pour associations, copropriétés, mairies et syndicats.
            <strong className="text-vp-teal"> Anonyme. Vérifiable. RGPD natif.</strong>
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
            <CTAButton href="/how-it-works" large>
              Découvrir comment ça marche
            </CTAButton>
            <CTAButton href="/features" variant="outline" large>
              Voir les fonctionnalités
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
            title="Les 3 piliers de VoxPop"
            subtitle="Une plateforme construite autour de trois promesses fondamentales."
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
            title="Deux modes, une mission"
            subtitle="Le vote sécurisé pour vos organisations — et la voix citoyenne libre, financée par votre abonnement."
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
                <h3 className="text-2xl font-bold text-white mb-4">VoxPop SaaS</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Vote sécurisé clé en main pour associations, copropriétés, CSE et collectivités.
                  Conforme RGPD. Résultats vérifiables.
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
                <h3 className="text-2xl font-bold text-white mb-4">Démocratie Globale</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Sondages et votes citoyens gratuits, ouverts au monde entier.
                  Résistant à la censure. Anonymat garanti.
                </p>
                <CTAButton href="/features">Découvrir</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== POURQUOI VOX POPULI ? ========== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="Pourquoi Vox Populi ?"
            subtitle="La voix du peuple — un mode gratuit pour changer le monde."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                <span className="gradient-text">Vox Populi</span>, c&apos;est quoi ?
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">Vox Populi</strong> signifie « la voix du peuple » en latin. C&apos;est le mode <strong className="text-vp-teal">gratuit et ouvert</strong> de VoxPop, accessible à tous, partout dans le monde.
                </p>
                <p>
                  Son but ? Permettre à <strong className="text-white">n&apos;importe quel citoyen</strong> de participer à des sondages et consultations sur les sujets qui comptent — transition écologique, droits humains, politiques locales — sans avoir besoin de compte, sans frais, sans censure.
                </p>
                <p>
                  Financé par les abonnements du mode Institutionnel, Vox Populi est notre engagement envers la démocratie mondiale : <strong className="text-vp-teal">chaque organisation qui paye pour ses votes finance la liberté d&apos;expression d&apos;un citoyen</strong> quelque part dans le monde.
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
                  icon: "🆓",
                  title: "100% gratuit, pour toujours",
                  desc: "Aucun compte requis. Aucune donnée personnelle collectée. Voter ne devrait jamais avoir de prix.",
                },
                {
                  icon: "🛡️",
                  title: "Résistant à la censure",
                  desc: "Des technologies avancées permettent de voter même là où Internet est surveillé ou restreint.",
                },
                {
                  icon: "👻",
                  title: "Anonymat cryptographique",
                  desc: "Votre identité est protégée par des preuves mathématiques. Personne ne peut savoir ce que vous avez voté.",
                },
                {
                  icon: "🗳️",
                  title: "Modes de vote innovants",
                  desc: "Liquid Democracy, Quadratic Voting — des mécanismes conçus pour des décisions plus justes.",
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
            title="Rejoignez le mouvement"
            subtitle="Que vous soyez une association, une collectivité ou un citoyen du monde — VoxPop est fait pour vous."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/contact" large variant="secondary">
              Commencer maintenant
            </CTAButton>
            <CTAButton href="/pricing" large variant="outline">
              Voir les tarifs
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
