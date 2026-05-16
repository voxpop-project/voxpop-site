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
      // Web3Forms — service externe gratuit qui forward le message à contact@voxpop-app.com
      // Access key publique côté client = OK pour ce service (rate limit + spam filter natifs).
      // Pour la remplacer par votre propre clé : signup sur https://web3forms.com et mettez la clé dans NEXT_PUBLIC_WEB3FORMS_KEY
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "PLACEHOLDER_REPLACE_ME";

      // Fallback : si pas de clé Web3Forms, on bascule sur mailto qui ouvre le client mail de l'utilisateur.
      if (!accessKey || accessKey === "PLACEHOLDER_REPLACE_ME") {
        const subject = encodeURIComponent(`[VoxPop · ${data.subject}] ${data.name}${data.organization ? " (" + data.organization + ")" : ""}`);
        const body = encodeURIComponent(`De : ${data.name}\nEmail : ${data.email}\n${data.organization ? "Organisation : " + data.organization + "\n" : ""}Sujet : ${data.subject}\n\n${data.message}\n\n---\nMessage soumis via voxpop-app.com/contact`);
        window.location.href = `mailto:contact@voxpop-app.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
        return;
      }

      // Envoi via Web3Forms
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: data.name,
          email: data.email,
          subject: `[VoxPop · ${data.subject}] ${data.name}${data.organization ? " (" + data.organization + ")" : ""}`,
          message: data.message,
          organization: data.organization || "—",
          // Web3Forms forward le mail à l'adresse configurée dans le dashboard Web3Forms
          // (donc contact@voxpop-app.com après le signup)
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      // Backup local : on log aussi côté serveur Vercel
      void fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => null);

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
        subtitle="Une question, une démo, un partenariat ? Nous répondons sous 24h."
        backgroundImage="/images/aerial-mountain.jpg"
      />

      <section className="section-padding">
        <div className="max-w-4xl mx-auto">

          {/* Bandeau email direct prioritaire */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-vp-gold/10 border border-vp-gold/30 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center gap-5"
          >
            <div className="text-4xl">📧</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-vp-gold mb-1">Email direct prioritaire</h3>
              <p className="text-slate-300 text-sm">
                Pour une réponse rapide *(presse, partenariat, mécénat, technique)*, écrivez-nous directement à&nbsp;:
              </p>
            </div>
            <a
              href="mailto:contact@voxpop-app.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-vp-gold text-vp-deep font-bold rounded-lg hover:bg-vp-gold/90 transition shadow-lg whitespace-nowrap"
            >
              contact@voxpop-app.com →
            </a>
          </motion.div>

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
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-vp-teal/50 focus:outline-none focus:ring-1 focus:ring-vp-teal/30 transition-colors resize-none"
                      placeholder="Décrivez votre besoin..."
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
                <h4 className="text-white font-semibold mb-3">Délai de réponse</h4>
                <p className="text-slate-300 text-sm">Nous répondons généralement sous 24 heures ouvrables.</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">Société</h4>
                <p className="text-slate-300 text-sm">
                  SASU Pelegrinus<br />
                  SIREN 948 908 348 — France
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Hébergement souverain en France
                </p>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-white font-semibold mb-3">Confidentialité</h4>
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
