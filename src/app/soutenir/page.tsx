"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SoutenirPage() {
  return (
    <div className="min-h-screen bg-vp-deep text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-vp-gold/20">
        <div className="absolute inset-0 bg-gradient-to-br from-vp-gold/10 via-transparent to-vp-teal/10" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-vp-gold/10 border border-vp-gold/30 text-vp-gold text-xs font-mono uppercase tracking-widest mb-6">
              ↓ Soutenir le projet
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Quatre façons de faire vivre <span className="text-vp-gold">VoxPop</span>.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              VoxPop est <strong className="text-white">auto-financé</strong>, <strong className="text-white">sans VC</strong>, <strong className="text-white">sans subvention partisane</strong>.
              Pour rester libre, il a besoin de vous — selon vos moyens, votre temps, votre voix.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 WAYS */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-10">

        {/* 1. DON FINANCIER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-vp-dark border border-vp-gold/30 rounded-2xl p-8 md:p-10"
        >
          <div className="flex items-start gap-6">
            <div className="text-5xl">🎁</div>
            <div className="flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-vp-gold mb-2">01 · Don financier</div>
              <h2 className="text-3xl font-bold text-white mb-4">Un don, du plus petit au plus grand.</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Chaque euro finance directement le développement open source, l&apos;audit cryptographique externe, et l&apos;hébergement souverain.
                Pas de salaires d&apos;agences, pas de marketing payant, pas de levée VC.
                <br /><br />
                <strong className="text-vp-gold">Don sécurisé via Stripe</strong> · paiement par carte · 5€ par soutien (vous pouvez donner plusieurs fois). D&apos;autres paliers (10€, 20€, 50€) seront proposés sous peu.
              </p>
              <div className="bg-vp-deep/50 border border-vp-teal/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-400 italic">
                  ⚠️ <strong className="text-slate-300">Mention légale :</strong> VoxPop est édité par <strong>SASU Pelegrinus</strong> (SIREN 948 908 348),
                  société commerciale française. Les dons ne sont <strong>pas éligibles au reçu fiscal</strong> (-66% impôt) — ils sont traités comme un soutien commercial.
                </p>
              </div>
              {/* Stripe Payment Link — TO REPLACE WITH REAL URL */}
              <a
                href="https://buy.stripe.com/fZu7sMb7j0PSfzD72J4AU00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-vp-gold text-vp-deep font-bold rounded-lg hover:bg-vp-gold/90 transition shadow-lg shadow-vp-gold/20"
              >
                💳 Faire un don de 5€
                <span className="text-xs opacity-70">via Stripe sécurisé</span>
              </a>
              <p className="text-xs text-slate-500 mt-3 italic">
                Page de paiement officielle Stripe · chiffrement SSL · aucune donnée bancaire stockée chez nous.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2. CONTRIBUTION TECHNIQUE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-vp-dark border border-vp-teal/30 rounded-2xl p-8 md:p-10"
        >
          <div className="flex items-start gap-6">
            <div className="text-5xl">💻</div>
            <div className="flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-vp-teal mb-2">02 · Contribution technique</div>
              <h2 className="text-3xl font-bold text-white mb-4">Vous codez, vous chiffrez, vous traduisez ?</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Le code de VoxPop est intégralement <strong className="text-vp-teal">public sur GitHub</strong> sous licence libre AGPL-3.0.
                Chaque ligne, chaque preuve cryptographique, chaque calcul peut être audité, recompilé, vérifié.
                <br /><br />
                Nous accueillons toutes les contributions : développeurs Next.js / Rust / Solidity, cryptographes (ZKP, Semaphore), traducteurs FR→EN/ES/AR/FA, auditeurs de sécurité, designers UX.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/voxpop-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-vp-teal/20 border border-vp-teal/40 text-vp-teal font-semibold rounded-lg hover:bg-vp-teal/30 transition"
                >
                  🐙 GitHub voxpop-project →
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-vp-deep border border-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-vp-dark transition"
                >
                  ✉️ Me proposer une compétence
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. RELAI / VOIX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-vp-dark border border-red-300/30 rounded-2xl p-8 md:p-10"
        >
          <div className="flex items-start gap-6">
            <div className="text-5xl">📣</div>
            <div className="flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-red-300 mb-2">03 · Relais & voix</div>
              <h2 className="text-3xl font-bold text-white mb-4">Partagez. C&apos;est gratuit, et c&apos;est essentiel.</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                La voix du peuple a besoin de voix qui la portent. Vous n&apos;avez pas d&apos;argent à donner ? Vous nous offrez quelque chose d&apos;aussi précieux : <strong className="text-white">votre écho</strong>.
                <br /><br />
                Partagez <Link href="/le-mur" className="text-red-300 underline underline-offset-2 hover:text-red-200">le Mur des décisions</Link> à votre cercle.
                Mentionnez <a href="https://twitter.com/VoxPop2026" target="_blank" rel="noopener noreferrer" className="text-red-300 underline underline-offset-2 hover:text-red-200">@VoxPop2026</a> sur les sujets qui vous tiennent à cœur.
                Parlez-en à un journaliste, un voisin, un élu.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://twitter.com/VoxPop2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-300/10 border border-red-300/30 text-red-300 font-semibold rounded-lg hover:bg-red-300/20 transition"
                >
                  🐦 Suivre @VoxPop2026
                </a>
                <Link
                  href="/le-mur"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-vp-deep border border-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-vp-dark transition"
                >
                  🧱 Voir le Mur des décisions
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. MÉDIAS / PRESSE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-vp-dark border border-vp-violet/30 rounded-2xl p-8 md:p-10"
        >
          <div className="flex items-start gap-6">
            <div className="text-5xl">📰</div>
            <div className="flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-vp-violet mb-2">04 · Médias & couverture</div>
              <h2 className="text-3xl font-bold text-white mb-4">Vous êtes journaliste, chroniqueur, podcasteur ?</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                VoxPop est un sujet à la croisée de la cryptographie, de la souveraineté numérique, et de la démocratie directe.
                Nous sommes disponibles pour <strong className="text-white">interviews</strong>, <strong className="text-white">visios</strong>, <strong className="text-white">enquêtes long format</strong> ou simples échanges.
                <br /><br />
                Materiel disponible sur demande : OnePager 1 page, White Paper technique 50 pages, démos vidéo, accès au code source, citations d&apos;experts.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-vp-violet/20 border border-vp-violet/40 text-vp-violet font-semibold rounded-lg hover:bg-vp-violet/30 transition"
              >
                ✉️ Contacter la rédaction VoxPop
              </Link>
            </div>
          </div>
        </motion.div>

      </section>

      {/* PIED — Notre éthique financière */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-vp-dark/50 border border-slate-800 rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-vp-gold mb-3">🏛️ Notre éthique financière</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            VoxPop refuse explicitement tout <strong>financement partisan</strong>, tout <strong>capital étatique</strong>, et toute <strong>levée VC</strong> tant que la communauté citoyenne n&apos;est pas constituée.
            <br /><br />
            Notre seul horizon : être <strong className="text-vp-gold">l&apos;instrument neutre</strong> que les citoyens peuvent saisir, sans dette envers quiconque.
            <br /><br />
            <span className="italic text-slate-500">Mai 2026 — Benjamin, fondateur · SASU Pelegrinus</span>
          </p>
        </div>
      </section>

    </div>
  );
}
