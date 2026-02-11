"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";

const steps = [
  {
    number: "01",
    title: "Créez votre scrutin",
    description:
      "Définissez votre question, les options de vote, et la durée. Que ce soit une élection de bureau, un sondage ou une consultation citoyenne.",
    example: "Ex : Élection du président de votre association sportive",
    icon: "✍️",
  },
  {
    number: "02",
    title: "Invitez les participants",
    description:
      "Envoyez un lien sécurisé aux votants par email, QR code, ou partagez-le directement. Chaque participant reçoit un accès unique.",
    example: "Ex : 150 membres de copropriété reçoivent leur lien personnalisé",
    icon: "📨",
  },
  {
    number: "03",
    title: "Votez en toute sécurité",
    description:
      "Chaque vote est chiffré de bout en bout. Votre choix reste strictement anonyme. Vous recevez un reçu pour vérifier que votre vote a été enregistré.",
    example: "Ex : Sondage citoyen sur la transition énergétique, 10 000 participants",
    icon: "🗳️",
  },
  {
    number: "04",
    title: "Résultats vérifiables",
    description:
      "Les résultats sont publiés en temps réel. Chacun peut vérifier que son vote a bien été compté sans révéler son choix.",
    example: "Ex : Consultation d'entreprise CSE avec audit trail complet",
    icon: "📊",
  },
];

const useCases = [
  {
    icon: "🏢",
    title: "Vote associatif",
    description:
      "Assemblées générales, élections de bureau, délibérations. Fini les votes à main levée sans anonymat.",
  },
  {
    icon: "🏠",
    title: "Copropriété",
    description:
      "Votes de syndic, décisions de travaux, budgets. Résultats légalement opposables et vérifiables.",
  },
  {
    icon: "🌍",
    title: "Sondage citoyen",
    description:
      "Consultations ouvertes au monde entier. Donnez votre avis sur les sujets qui comptent, même là où c'est interdit.",
  },
  {
    icon: "🏦",
    title: "Entreprise & CSE",
    description:
      "Consultations internes, élections de représentants, enquêtes anonymes. Conforme RGPD.",
  },
  {
    icon: "🏛️",
    title: "Collectivité locale",
    description:
      "Budgets participatifs, consultations citoyennes, démocratie locale. Intégration FranceConnect.",
  },
  {
    icon: "⚽",
    title: "Fédération sportive",
    description:
      "Des centaines de clubs, des milliers de licenciés. Gérez vos élections et consultations simplement.",
  },
];

export default function HowItWorks() {
  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <PageHero
        title="Comment ça marche ?"
        subtitle="De la création du scrutin aux résultats vérifiables, en 4 étapes simples. Zéro jargon technique."
        backgroundImage="/images/aerial-downtown.jpg"
      />

      {/* ========== STEPS ========== */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-vp-teal/50 via-vp-blue/50 to-vp-violet/50 hidden md:block" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step number bubble */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-vp-dark border-2 border-vp-teal/50 items-center justify-center z-10">
                  <span className="text-vp-teal font-bold text-lg">{step.number}</span>
                </div>

                {/* Content card */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="glass-card-hover p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{step.icon}</span>
                      <div>
                        <span className="text-vp-teal text-sm font-semibold md:hidden">
                          Étape {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4">{step.description}</p>
                    <div className="px-4 py-3 rounded-xl bg-vp-teal/5 border border-vp-teal/10">
                      <p className="text-vp-teal text-sm italic">{step.example}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== IMAGE BREAK ========== */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/aerial-farmland.jpg"
          alt="Citoyens du monde"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vp-dark/60 via-transparent to-vp-dark/60" />
      </section>

      {/* ========== USE CASES ========== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Pour qui ?"
            subtitle="VoxPop s'adapte à tous les contextes où le vote et la consultation sont nécessaires."
            gold
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <GlassCard
                key={i}
                icon={<span>{uc.icon}</span>}
                title={uc.title}
                description={uc.description}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-vp-blue/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Prêt à essayer ?"
            subtitle="Découvrez nos plans tarifaires ou contactez-nous pour une démo personnalisée."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/pricing" large>
              Voir les tarifs
            </CTAButton>
            <CTAButton href="/contact" large variant="outline">
              Demander une démo
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
