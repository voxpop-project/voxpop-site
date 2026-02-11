"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";

interface Plan {
  name: string;
  price: number;
  priceAnnual: number;
  target: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  color: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: 19,
    priceAnnual: 15,
    target: "Petites associations (<100 membres)",
    features: [
      "5 scrutins par mois",
      "Authentification 2FA",
      "Hash chain SHA-256",
      "Chiffrement de bout en bout",
      "Résultats en temps réel",
      "Support email",
    ],
    color: "vp-blue",
  },
  {
    name: "Pro",
    price: 49,
    priceAnnual: 39,
    target: "Associations moyennes, CSE",
    features: [
      "Scrutins illimités",
      "Tout Starter +",
      "Export audit complet",
      "Support prioritaire",
      "Personnalisation marque",
      "Statistiques avancées",
    ],
    highlight: true,
    badge: "Populaire",
    color: "vp-teal",
  },
  {
    name: "Business",
    price: 99,
    priceAnnual: 79,
    target: "Grandes organisations",
    features: [
      "Tout Pro +",
      "Multi-scrutins simultanés",
      "API RESTful + Webhooks",
      "RBAC (gestion des rôles)",
      "Support téléphone",
      "Onboarding dédié",
    ],
    color: "vp-violet",
  },
  {
    name: "Enterprise",
    price: 300,
    priceAnnual: 250,
    target: "Collectivités, fédérations",
    features: [
      "Tout Business +",
      "Intégration FranceConnect",
      "Infrastructure dédiée",
      "Certification ANSSI",
      "SLA garanti 99,9%",
      "Account manager dédié",
    ],
    badge: "Sur mesure",
    color: "vp-gold",
  },
];

const faqs = [
  {
    q: "Le mode Vox Populi est-il vraiment gratuit ?",
    a: "Oui, complètement. Les revenus SaaS du mode institutionnel financent le mode Vox Populi. En payant pour votre organisation, vous contribuez à la démocratie mondiale.",
  },
  {
    q: "Puis-je changer de plan à tout moment ?",
    a: "Absolument. Vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement est effectif immédiatement et facturé au prorata.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Toutes les données sont chiffrées de bout en bout et hébergées en Europe. VoxPop est conforme RGPD et prêt pour eIDAS 2.0.",
  },
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "Contactez-nous pour une démo personnalisée. Nous proposons un essai gratuit de 14 jours sur tous les plans.",
  },
  {
    q: "Proposez-vous des tarifs pour les ONG ?",
    a: "Oui, nous avons des tarifs préférentiels pour les ONG et associations à but non lucratif. Contactez-nous pour en discuter.",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <PageHero
        title="Tarifs simples et transparents"
        subtitle="Un plan pour chaque besoin. Le mode Vox Populi reste gratuit pour tous."
        backgroundImage="/images/aerial-fields.jpg"
        gold
      />

      {/* ========== TOGGLE ========== */}
      <section className="px-6">
        <div className="flex justify-center mb-12">
          <div className="glass-card inline-flex items-center gap-4 px-6 py-3">
            <span className={`text-sm font-medium ${!annual ? "text-white" : "text-slate-400"}`}>
              Mensuel
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                annual ? "bg-vp-teal" : "bg-slate-600"
              }`}
            >
              <motion.div
                animate={{ x: annual ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
              />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-white" : "text-slate-400"}`}>
              Annuel
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold text-vp-teal bg-vp-teal/10 px-3 py-1 rounded-full"
              >
                -20%
              </motion.span>
            )}
          </div>
        </div>
      </section>

      {/* ========== PLANS ========== */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const price = annual ? plan.priceAnnual : plan.price;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card p-8 relative flex flex-col ${
                  plan.highlight
                    ? "border-vp-teal/40 shadow-xl shadow-vp-teal/10 scale-[1.02]"
                    : ""
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.highlight
                      ? "bg-vp-teal text-vp-dark"
                      : "bg-white/10 text-white"
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.target}</p>

                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={annual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-end gap-1"
                    >
                      <span className="text-4xl font-black text-white">{price}€</span>
                      <span className="text-slate-400 text-sm mb-1">/mois</span>
                    </motion.div>
                  </AnimatePresence>
                  {plan.name === "Enterprise" && (
                    <span className="text-xs text-slate-500">Prix de départ</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-vp-teal mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <CTAButton
                  href="/contact"
                  variant={plan.highlight ? "primary" : "outline"}
                  className="w-full text-center"
                >
                  {plan.name === "Enterprise" ? "Nous contacter" : "Commencer"}
                </CTAButton>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== VOX POPULI GRATUIT ========== */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vp-teal via-vp-blue to-vp-violet" />
            <div className="text-5xl mb-6">🌍</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vox Populi = <span className="gradient-text">Gratuit</span>
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
              Le mode Vox Populi est et restera gratuit. En payant pour votre organisation,
              vous financez la démocratie mondiale. Chaque abonnement permet à des citoyens
              de s&apos;exprimer librement.
            </p>
            <CTAButton href="/features" variant="secondary">
              Découvrir Vox Populi
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <SectionTitle title="Questions fréquentes" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    className="text-vp-teal text-xl shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-slate-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
