"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";

const roadmapPhases = [
  {
    phase: "Phase 1",
    period: "M1 – M6",
    title: "MVP",
    description: "Application fonctionnelle, chiffrement, authentification sécurisée, 3 plans tarifaires.",
    color: "vp-teal",
    status: "En cours",
  },
  {
    phase: "Phase 2",
    period: "M7 – M12",
    title: "Growth",
    description: "Intégration FranceConnect, API publique, plan Enterprise, objectif 100 clients.",
    color: "vp-blue",
    status: "À venir",
  },
  {
    phase: "Phase 3",
    period: "M13 – M18",
    title: "Scale",
    description: "Déploiement multi-pays, conformité eIDAS 2.0, partenariats syndics et fédérations.",
    color: "vp-violet",
    status: "À venir",
  },
  {
    phase: "Phase 4",
    period: "M19 – M24",
    title: "Expand",
    description: "Certification ANSSI, grandes collectivités, gouvernance citoyenne à l'échelle.",
    color: "vp-gold",
    status: "À venir",
  },
];

const values = [
  {
    icon: "🛡️",
    title: "Sécurité d'abord",
    description: "La sécurité n'est pas une option. Chaque décision technique privilégie la protection de vos données.",
  },
  {
    icon: "🌍",
    title: "Universalité",
    description: "La démocratie ne connaît pas de frontières. VoxPop est conçu pour chaque citoyen du monde.",
  },
  {
    icon: "💡",
    title: "Transparence",
    description: "Nos algorithmes cryptographiques sont open source. Vérifiez par vous-même.",
  },
  {
    icon: "🤝",
    title: "Impact social",
    description: "Chaque abonnement finance la démocratie mondiale. Votre investissement change des vies.",
  },
];

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <PageHero
        title="À propos de VoxPop"
        subtitle="Nous croyons que chaque voix compte. Notre mission : rendre le vote sécurisé, anonyme et accessible à tous."
        backgroundImage="/images/aerial-ocean.jpg"
      />

      {/* ========== MISSION ========== */}
      <section className="section-padding pt-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Notre <span className="gradient-text">mission</span>
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                4,4 milliards de personnes vivent dans des pays où la liberté d&apos;expression
                est restreinte. En France, 1,5 million d&apos;associations votent encore à main
                levée, sans anonymat.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                VoxPop est né d&apos;un constat simple : le vote sécurisé et anonyme ne devrait
                pas être un luxe. C&apos;est un droit fondamental.
              </p>
              <p className="text-slate-300 leading-relaxed font-medium">
                Nous construisons la plateforme qui donne à chaque citoyen le pouvoir de
                s&apos;exprimer librement, partout dans le monde.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <h4 className="text-lg font-bold text-white mb-6">Nos chiffres clés</h4>
              <div className="space-y-6">
                {[
                  { label: "Marché adressable (TAM)", value: "~30 Mds $", sub: "GovTech & CivicTech mondial" },
                  { label: "Marché Europe", value: "~500 M€", sub: "Vote numérique" },
                  { label: "Marché France", value: "~50 M€", sub: "Associations + copropriétés" },
                  { label: "Break-even", value: "18–24 mois", sub: "~300 clients payants" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0">
                    <div>
                      <div className="text-sm text-slate-300">{stat.label}</div>
                      <div className="text-xs text-slate-500">{stat.sub}</div>
                    </div>
                    <div className="text-lg font-bold gradient-text">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nos valeurs"
            subtitle="Les principes qui guident chacune de nos décisions."
            gold
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover p-8 text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ROADMAP ========== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="Roadmap"
            subtitle="Notre feuille de route sur 24 mois."
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-vp-teal via-vp-blue to-vp-gold" />

            {roadmapPhases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start mb-12`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-vp-dark border-2 border-current z-10"
                  style={{ color: `var(--${phase.color}, #14B8A6)` }}
                />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-vp-teal bg-vp-teal/10 px-3 py-1 rounded-full">
                        {phase.phase}
                      </span>
                      <span className="text-xs text-slate-500">{phase.period}</span>
                      {phase.status === "En cours" && (
                        <span className="text-xs font-bold text-vp-gold bg-vp-gold/10 px-3 py-1 rounded-full">
                          {phase.status}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{phase.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{phase.description}</p>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ENTITIES ========== */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Structure juridique" />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="text-3xl mb-4">🇺🇸</div>
              <h4 className="text-lg font-bold text-white mb-2">Punch Ventures LLC</h4>
              <p className="text-slate-300 text-sm">Wyoming, USA — Holding principale</p>
              <p className="text-slate-500 text-xs mt-2">Propriété intellectuelle, copyright, stratégie</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="text-3xl mb-4">🇪🇪</div>
              <h4 className="text-lg font-bold text-white mb-2">OÜ estonienne</h4>
              <p className="text-slate-300 text-sm">Estonie, UE — Façade européenne</p>
              <p className="text-slate-500 text-xs mt-2">TVA intracommunautaire, RGPD natif, e-Residency</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Rejoignez l'aventure"
            subtitle="Investisseurs, partenaires, bénévoles — contactez-nous."
          />
          <CTAButton href="/contact" large>
            Nous contacter
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
