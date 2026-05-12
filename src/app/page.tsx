"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";

const stats = [
  { value: "4,2 Mds", label: "personnes sans liberté d'expression*" },
  { value: "1,5M", label: "d'associations en France" },
  { value: "370K+", label: "de copropriétés en France" },
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
      {/* ========== HERO VITRINE PROJET ========== */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-vp-teal/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-vp-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vp-violet/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-10 md:pt-32 md:pb-20 text-center">
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
              className="mx-auto drop-shadow-2xl w-24 h-24 md:w-40 md:h-40"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-slate-200 mb-6 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-vp-teal animate-pulse" />
            La voix du peuple · Sans frontières · Souveraine
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 md:mb-6 leading-tight"
          >
            La voix qui compte{" "}
            <span className="gradient-text">vraiment.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed px-2"
          >
            L&apos;instrument de vote et de pétition à preuve cryptographique.
            <strong className="text-vp-teal"> Une mission, deux portes :</strong> l&apos;app citoyenne libre & sans frontières, et la suite institutionnelle souveraine.
          </motion.p>

          {/* 2 portes CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CTAButton href="/citoyens" large>
              🟡 Je suis un citoyen
            </CTAButton>
            <CTAButton href="/institutions" variant="outline" large>
              🔵 Je représente une organisation
            </CTAButton>
          </motion.div>

          {/* Teaser video with sound toggle */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 md:mt-16 relative max-w-4xl mx-auto"
          >
            <div className="glass-card overflow-hidden rounded-2xl shadow-2xl shadow-vp-teal/10 relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
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
        <p className="text-center text-xs text-slate-500 mt-8 max-w-2xl mx-auto italic">
          * Source : <a href="https://www.globalexpressionreport.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-vp-teal">Global Expression Report 2024</a> (Article 19) — 53% de la population mondiale vit dans des pays en « crisis » de liberté d&apos;expression.
        </p>
      </section>

      {/* ========== LE CONCEPT ========== */}
      <section className="section-padding relative overflow-hidden">
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
            subtitle="Une plateforme. Deux usages. Une seule promesse cryptographique."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
                  <p className="text-slate-400 text-xs mb-6">La voix du peuple, sans frontières</p>
                  <div className="w-full space-y-3">
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-teal font-semibold">🗳️ Pétition citoyenne</div>
                      <div className="text-white text-sm mt-1">Mandat unique 7 ans ?</div>
                    </div>
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-gold font-semibold">📊 Vote institutionnel</div>
                      <div className="text-white text-sm mt-1">Élection du bureau</div>
                    </div>
                    <div className="glass-card px-4 py-3 text-left">
                      <div className="text-xs text-vp-blue font-semibold">🌍 Consultation européenne</div>
                      <div className="text-white text-sm mt-1">Initiative citoyenne</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vp-teal/15 text-vp-teal text-sm font-semibold mb-6">
                🔬 Cryptographie open source
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Le vote sécurisé que les autres ne savent pas faire.
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Pourquoi un nouveau produit alors qu&apos;il existe déjà des outils de vote en ligne ? Parce que les autres demandent <strong className="text-white">de leur faire confiance</strong>. VoxPop ne demande rien.
                </p>
                <p>
                  Notre architecture repose sur des <strong className="text-vp-teal">preuves cryptographiques Zero-Knowledge</strong> : on prouve mathématiquement qu&apos;un vote est valide sans jamais révéler l&apos;identité du votant. Le code est intégralement public, auditable par n&apos;importe quel cryptographe.
                </p>
                <p>
                  Hébergé en France (OVH), conforme RGPD natif, résistant à la censure. <strong className="text-vp-teal">Pas une promesse marketing. Une propriété mathématique.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PÉTITION PHARE ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vp-gold/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vp-gold/15 text-vp-gold text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-vp-gold/30"
          >
            ↓ Première pétition · Septembre 2026
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            « Faut-il instaurer un{" "}
            <span className="gradient-text-gold">mandat unique de 7 ans</span>
            <br className="hidden md:block" />
            {" "}pour la présidence de la République ? »
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Question transversale (gauche · droite · centre), structurelle, cohérente avec le calendrier 2027. Posée publiquement aux Français — anonymement, sans biais.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CTAButton href="/petition-2027">
              Voir la démo de la pétition
            </CTAButton>
            <CTAButton href="/citoyens#petitions" variant="outline">
              Toutes les pétitions à venir
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* ========== DUAL MODE (les 2 portes) ========== */}
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
            title="Une mission, deux portes"
            subtitle="VoxPop Citoyens (gratuit, sans frontières) et VoxPop Institutions (SaaS, France) — financé par les abonnements institutionnels, l'app citoyenne est libre pour tous."
            gold
          />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Citoyens */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-hover p-10 relative overflow-hidden border-2 border-vp-gold/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-vp-gold/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vp-gold/20 text-vp-gold text-xs font-semibold mb-6">
                  🟡 Mode Citoyen — Gratuit
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">La voix du peuple, sans frontières</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Pétitions citoyennes anonymes par cryptographie, vérifiables mathématiquement, impossibles à censurer. France, Europe, Monde — votre voix résiste partout.
                </p>
                <CTAButton href="/citoyens">Découvrir VoxPop Citoyens</CTAButton>
              </div>
            </motion.div>

            {/* Institutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-hover p-10 relative overflow-hidden border-2 border-vp-teal/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-vp-teal/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vp-teal/20 text-vp-teal text-xs font-semibold mb-6">
                  🔵 Mode Institutionnel — SaaS
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Bonnes questions. Vrais résultats.</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Vote sécurisé pour vos consultations légales : AG, élections statutaires, budgets. Cryptographie auditable, hébergement France, conformité RGPD native.
                </p>
                <CTAButton href="/institutions" variant="outline">Découvrir VoxPop Institutions</CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vp-teal/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Une voix. Sans intermédiaire."
            subtitle="Choisissez votre porte d'entrée. Ou demandez-nous une démo gratuite (30 min, en visio)."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/demo" large variant="secondary">
              Demander une démo gratuite
            </CTAButton>
            <CTAButton href="/contact" large variant="outline">
              Nous contacter
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
