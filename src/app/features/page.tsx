"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlassCard } from "@/components/ui/GlassCard";
import { CTAButton } from "@/components/ui/CTAButton";

const institutionalFeatures = [
  {
    icon: "🔐",
    title: "Chiffrement de bout en bout",
    description: "Chaque vote est chiffré avant de quitter l’appareil du votant. Personne ne peut le lire en transit.",
  },
  {
    icon: "📝",
    title: "Audit trail complet",
    description: "Chaque action est horodatée et enregistrée. Exportez un rapport d’audit complet pour vos PV.",
  },
  {
    icon: "🇪🇺",
    title: "Conforme RGPD & eIDAS",
    description: "Privacy by design. Données hébergées en Europe. Prêt pour eIDAS 2.0 et FranceConnect.",
  },
  {
    icon: "🔑",
    title: "Authentification sécurisée",
    description: "Double authentification (2FA), lien unique par votant, vérification d’identité optionnelle.",
  },
  {
    icon: "📊",
    title: "Résultats en temps réel",
    description: "Visualisez les résultats au fur et à mesure, avec graphiques et statistiques de participation.",
  },
  {
    icon: "⚙️",
    title: "API & intégrations",
    description: "Intégrez VoxPop à votre SI existant via notre API RESTful. Webhooks disponibles.",
  },
];

const voxPopuliFeatures = [
  {
    icon: "🌍",
    title: "Accès mondial gratuit",
    description: "N’importe qui, n’importe où, peut voter gratuitement. Aucun compte requis.",
  },
  {
    icon: "🛡️",
    title: "Résistance à la censure",
    description: "Des technologies avancées permettent à VoxPop de fonctionner même là où Internet est surveillé.",
  },
  {
    icon: "👻",
    title: "Anonymat garanti",
    description: "Aucune donnée personnelle stockée. Preuves cryptographiques d’unicité sans révéler d’identité.",
  },
  {
    icon: "📢",
    title: "Sondages citoyens",
    description: "Créez des consultations ouvertes sur les sujets qui comptent. Faites entendre la voix du peuple.",
  },
  {
    icon: "🗳️",
    title: "Modes de vote avancés",
    description: "Liquid Democracy, Quadratic Voting — des mécanismes innovants pour des décisions plus justes.",
  },
  {
    icon: "🔒",
    title: "Protection intégrale",
    description: "L’application se camoufle et protège vos données, même en cas de danger immédiat.",
  },
];

type Competitor = {
  name: string;
  voteSecure: string;
  anticensure: string;
  anonymat: string;
  saas: string;
  openSource: string;
  liquidDemocracy: string;
  quadraticVoting: string;
};

const competitors: Competitor[] = [
  { name: "VoxPop", voteSecure: "✅", anticensure: "✅", anonymat: "✅", saas: "✅", openSource: "✅", liquidDemocracy: "✅", quadraticVoting: "✅" },
  { name: "Signal", voteSecure: "❌", anticensure: "✅", anonymat: "✅", saas: "❌", openSource: "✅", liquidDemocracy: "❌", quadraticVoting: "❌" },
  { name: "Telegram", voteSecure: "❌", anticensure: "⚠️", anonymat: "❌", saas: "❌", openSource: "❌", liquidDemocracy: "❌", quadraticVoting: "❌" },
  { name: "Helios", voteSecure: "✅", anticensure: "❌", anonymat: "✅", saas: "❌", openSource: "✅", liquidDemocracy: "❌", quadraticVoting: "❌" },
  { name: "Decidim", voteSecure: "⚠️", anticensure: "❌", anonymat: "❌", saas: "✅", openSource: "✅", liquidDemocracy: "✅", quadraticVoting: "❌" },
  { name: "Voatz", voteSecure: "✅", anticensure: "❌", anonymat: "❌", saas: "✅", openSource: "❌", liquidDemocracy: "❌", quadraticVoting: "❌" },
];

const headers = [
  { key: "voteSecure" as const, label: "Vote sécurisé" },
  { key: "anticensure" as const, label: "Anti-censure" },
  { key: "anonymat" as const, label: "Anonymat crypto" },
  { key: "saas" as const, label: "SaaS B2B" },
  { key: "openSource" as const, label: "Open source" },
  { key: "liquidDemocracy" as const, label: "Liquid Democracy" },
  { key: "quadraticVoting" as const, label: "Quadratic Voting" },
];

export default function Features() {
  const [mode, setMode] = useState<"institutional" | "voxpopuli">("institutional");

  const features = mode === "institutional" ? institutionalFeatures : voxPopuliFeatures;

  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <PageHero
        title="Fonctionnalités"
        subtitle="Découvrez ce qui rend VoxPop unique. Deux modes, une seule mission : donner le pouvoir au peuple."
        backgroundImage="/images/drone-countryside.jpg"
      />

      {/* ========== MODE TOGGLE ========== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="glass-card inline-flex p-1.5 gap-1">
              <button
                onClick={() => setMode("institutional")}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mode === "institutional"
                    ? "bg-vp-blue text-white shadow-lg shadow-vp-blue/30"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🏢 Institutionnel
              </button>
              <button
                onClick={() => setMode("voxpopuli")}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mode === "voxpopuli"
                    ? "bg-vp-teal text-white shadow-lg shadow-vp-teal/30"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                🌍 Vox Populi
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((f, i) => (
                <GlassCard
                  key={i}
                  icon={<span>{f.icon}</span>}
                  title={f.title}
                  description={f.description}
                  delay={i * 0.08}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========== IMAGE BREAK ========== */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/aerial-ocean.jpg"
          alt="Mains levées"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vp-dark/60 via-transparent to-vp-dark/60" />
      </section>

      {/* ========== COMPARISON TABLE ========== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Pourquoi VoxPop ?"
            subtitle="Comparez VoxPop avec les alternatives existantes."
            gold
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
          >
            <table className="w-full glass-card overflow-hidden">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-200">
                    Plateforme
                  </th>
                  {headers.map((h) => (
                    <th
                      key={h.key}
                      className="text-center px-4 py-4 text-xs font-semibold text-slate-300 uppercase tracking-wider"
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 ${
                      i === 0 ? "bg-vp-teal/5" : "hover:bg-white/[0.02]"
                    } transition-colors`}
                  >
                    <td className={`px-6 py-4 font-semibold ${i === 0 ? "text-vp-teal" : "text-white"}`}>
                      {comp.name}
                    </td>
                    {headers.map((h) => (
                      <td key={h.key} className="text-center px-4 py-4 text-lg">
                        {comp[h.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Convaincu ?"
            subtitle="Rejoignez les organisations qui font confiance à VoxPop pour leurs votes."
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/pricing" large>
              Voir les tarifs
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
