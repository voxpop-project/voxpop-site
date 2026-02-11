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
      "Votre vote est protégé par un chiffrement de bout en bout. Personne ne peut remonter jusqu'à vous.",
  },
  {
    icon: "✅",
    title: "Résultats vérifiables",
    description:
      "Chaque vote est enregistré de manière immuable. Vérifiez vous-même que votre voix a été comptée.",
  },
  {
    icon: "🌍",
    title: "Impossible à censurer",
    description:
      "Aucun gouvernement, aucune entreprise ne peut bloquer votre droit de vote. Votre voix traverse les frontières.",
  },
];

const stats = [
  { value: "4,4 Mds", label: "de personnes sans liberté d'expression" },
  { value: "1,5M", label: "d'associations en France" },
  { value: "370K+", label: "de copropriétés" },
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
            La révolution démocratique commence ici
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Votre voix.{" "}
            <span className="gradient-text">Sans frontières.</span>
            <br />
            <span className="gradient-text-gold">Sans compromis.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            La seule plateforme où votre opinion compte vraiment.
            Vote anonyme, vérifiable, impossible à censurer.
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
            subtitle="Une application mobile qui met le pouvoir du vote dans votre poche."
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
                Votez depuis votre téléphone, partout dans le monde
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  VoxPop est une <strong className="text-white">application mobile</strong> qui permet à n&apos;importe qui de voter de manière sécurisée et anonyme, directement depuis son smartphone.
                </p>
                <p>
                  Que vous soyez président d&apos;association, syndic de copropriété ou citoyen engagé — VoxPop s&apos;adapte à vos besoins avec deux modes distincts.
                </p>
                <p>
                  Vos votes sont <strong className="text-vp-teal">chiffrés</strong>, vos résultats <strong className="text-vp-teal">vérifiables</strong>, et votre identité <strong className="text-vp-teal">protégée</strong>. Même dans les pays où la liberté d&apos;expression n&apos;existe pas.
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
            subtitle="VoxPop s'adapte à vos besoins : du vote associatif au sondage citoyen mondial."
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

      {/* ========== CTA FINAL ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vp-teal/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Rejoignez la révolution démocratique"
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
