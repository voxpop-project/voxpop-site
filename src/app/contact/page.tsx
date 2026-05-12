"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <PageHero
        title="Contactez-nous"
        subtitle="Une question, une d\u00e9mo, un partenariat ? Nous r\u00e9pondons sous 24h."
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
                    Message envoy\u00e9 !
                  </h3>
                  <p className="text-slate-300">
                    Merci pour votre message. Nous vous r\u00e9pondrons dans les plus brefs d\u00e9lais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
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
                        name="email"
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
                      name="organization"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                      placeholder="Nom de votre organisation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors"
                    >
                      <option value="" className="bg-vp-dark">S\u00e9lectionnez un sujet</option>
                      <option value="demo" className="bg-vp-dark">Demande de d\u00e9mo</option>
                      <option value="pricing" className="bg-vp-dark">Question tarifs</option>
                      <option value="partnership" className="bg-vp-dark">Partenariat</option>
                      <option value="press" className="bg-vp-dark">Presse / M\u00e9dia</option>
                      <option value="other" className="bg-vp-dark">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors resize-none"
                      placeholder="D\u00e9crivez votre besoin..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold shadow-lg shadow-vp-teal/25 hover:shadow-xl hover:shadow-vp-teal/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Envoi en cours..." : "Envoyer le message"}
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
                <h4 className="text-white font-semibold mb-3">Email</h4>
                <a href="mailto:contact@voxpop-app.com" className="text-vp-teal text-sm hover:underline">contact@voxpop-app.com</a>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">D\u00e9lai de r\u00e9ponse</h4>
                <p className="text-slate-300 text-sm">Nous r\u00e9pondons g\u00e9n\u00e9ralement sous 24 heures ouvrables.</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">Soci\u00e9t\u00e9</h4>
                <p className="text-slate-300 text-sm">
                  SASU Pelegrinus<br />
                  SIREN 948 908 348 \u2014 France
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  H\u00e9bergement souverain en France
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">Confidentialit\u00e9</h4>
                <p className="text-slate-300 text-sm">
                  Vos donn\u00e9es sont prot\u00e9g\u00e9es conform\u00e9ment \u00e0 notre{" "}
                  <a href="/legal/privacy" className="text-vp-teal hover:underline">
                    politique de confidentialit\u00e9
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
