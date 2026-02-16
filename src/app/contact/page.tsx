"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success state
    setSubmitted(true);
  };

  return (
    <div className="overflow-hidden">
      <PageHero
        title="Contactez-nous"
        subtitle="Une question, une démo, un partenariat ? Nous répondons sous 24h."
        backgroundImage="/images/aerial-mountain.jpg"
      />

      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3"
            >
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <div className="text-5xl mb-6">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Message envoyé !
                  </h3>
                  <p className="text-slate-300">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                        placeholder="vous@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Organisation (optionnel)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                      placeholder="Nom de votre organisation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Sujet
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                    >
                      <option value="" className="bg-vp-dark">Sélectionnez un sujet</option>
                      <option value="demo" className="bg-vp-dark">Demande de démo</option>
                      <option value="pricing" className="bg-vp-dark">Question tarifs</option>
                      <option value="partnership" className="bg-vp-dark">Partenariat</option>
                      <option value="press" className="bg-vp-dark">Presse / Média</option>
                      <option value="other" className="bg-vp-dark">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors resize-none"
                      placeholder="Décrivez votre besoin..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold shadow-lg shadow-vp-teal/25 hover:shadow-xl hover:shadow-vp-teal/40 transition-all duration-300"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">📧 Email</h4>
                <a href="mailto:contact@voxpop-app.com" className="text-vp-teal text-sm hover:underline">contact@voxpop-app.com</a>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">⏰ Délai de réponse</h4>
                <p className="text-slate-300 text-sm">Nous répondons généralement sous 24 heures ouvrables.</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">🌐 Siège</h4>
                <p className="text-slate-300 text-sm">
                  Punch Ventures LLC<br />
                  Wyoming, USA
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Entité UE en cours de création (Estonie)
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">🔒 Confidentialité</h4>
                <p className="text-slate-300 text-sm">
                  Vos données sont protégées conformément à notre{" "}
                  <a href="/legal/privacy" className="text-vp-teal hover:underline">
                    politique de confidentialité
                  </a>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
