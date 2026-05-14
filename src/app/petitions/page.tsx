"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Types
interface Petition {
  id: string;
  status: "preparation" | "live" | "closed";
  category: "souverainete" | "liberte" | "social" | "ecologie";
  emoji: string;
  title: string;
  question: string;
  why: string;
  murRef: string; // id de la carte Mur des décisions
  murTitle: string; // titre de la carte Mur correspondante
  expectedLaunch: string;
}

const petitions: Petition[] = [
  {
    id: "mercosur",
    status: "preparation",
    category: "souverainete",
    emoji: "🥩",
    title: "Mercosur — faut-il dénoncer l'accord UE/Mercosur ?",
    question: "Demandez-vous au gouvernement français de dénoncer formellement l'accord commercial UE-Mercosur ?",
    why: "200 000 tonnes de volaille brésilienne / 99 000 tonnes de bœuf importées par an — sans aucune consultation populaire. Pesticides interdits en UE mais autorisés dans la production importée. Agriculteurs français en colère. Aucun référendum prévu.",
    murRef: "mercosur",
    murTitle: "Mercosur : accord signé malgré l'opposition de la France et des agriculteurs.",
    expectedLaunch: "Septembre 2026",
  },
  {
    id: "immigration",
    status: "preparation",
    category: "souverainete",
    emoji: "🛂",
    title: "Immigration — référendum sur les quotas annuels ?",
    question: "Souhaitez-vous qu'un référendum citoyen soit organisé sur les quotas annuels d'immigration en France ?",
    why: "La loi immigration de janvier 2024, adoptée en CMP sans débat citoyen approfondi, illustre l'absence chronique de consultation populaire sur un sujet n°1 dans les sondages depuis plus de 5 ans. Les Français demandent à se prononcer.",
    murRef: "loi-immigration-2024",
    murTitle: "Loi immigration adoptée avec un compromis CMP, sans débat citoyen.",
    expectedLaunch: "Septembre 2026",
  },
  {
    id: "censure-bigtech",
    status: "preparation",
    category: "liberte",
    emoji: "🛡️",
    title: "Censure & souveraineté numérique — DSA et IA Act, qui décide ?",
    question: "L'Union européenne doit-elle suspendre l'IA Act et le DSA jusqu'à un référendum populaire dans chaque État membre ?",
    why: "L'IA Act européen impose à 449 millions d'Européens une régulation lourde sans consultation populaire dans aucun pays. Le DSA crée un cadre de modération potentiellement liberticide. Aucun citoyen n'a voté pour ces règles qui structurent désormais sa vie numérique.",
    murRef: "ai-act",
    murTitle: "IA Act européen : 449 millions d'Européens régulés sans consultation populaire.",
    expectedLaunch: "Septembre 2026",
  },
];

const categoryColors = {
  souverainete: { bg: "vp-gold", text: "vp-gold", label: "Souveraineté" },
  liberte: { bg: "red-300", text: "red-300", label: "Libertés" },
  social: { bg: "vp-teal", text: "vp-teal", label: "Social" },
  ecologie: { bg: "vp-violet", text: "vp-violet", label: "Écologie" },
};

const statusLabel = {
  preparation: { text: "🔧 En préparation", color: "text-vp-gold" },
  live: { text: "🟢 En cours", color: "text-vp-teal" },
  closed: { text: "✅ Clôturée", color: "text-slate-400" },
};

export default function PetitionsPage() {
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
              ↓ Premières pétitions citoyennes
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Trois questions que <span className="text-vp-gold">l&apos;État ne pose pas</span>.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Septembre 2026 : nous lançons les <strong className="text-white">trois premières pétitions cryptographiques</strong> de VoxPop.
              <br /><br />
              Anonyme par construction. Vérifiable mathématiquement. Impossible à censurer.
              Vous décidez maintenant quels sujets nous portons en premier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 PÉTITIONS */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        {petitions.map((p, idx) => {
          const colors = categoryColors[p.category];
          const status = statusLabel[p.status];
          return (
            <motion.div
              key={p.id}
              id={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-vp-dark border border-${colors.bg}/30 rounded-2xl p-8 md:p-10`}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="text-6xl">{p.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-mono uppercase tracking-widest text-${colors.text}`}>
                      {String(idx + 1).padStart(2, "0")} · {colors.label}
                    </span>
                    <span className={`text-xs font-mono uppercase tracking-wider ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{p.title}</h2>
                  <div className="bg-vp-deep/60 border-l-4 border-vp-gold pl-4 py-3 mb-4">
                    <p className="text-lg text-slate-100 italic leading-relaxed">
                      « {p.question} »
                    </p>
                  </div>
                </div>
              </div>

              {/* Pourquoi */}
              <div className="mb-6">
                <h3 className={`text-sm font-mono uppercase tracking-widest text-${colors.text} mb-3`}>
                  ↓ Pourquoi cette pétition
                </h3>
                <p className="text-slate-300 leading-relaxed">{p.why}</p>
              </div>

              {/* Lien Mur */}
              <div className="bg-vp-deep/50 border border-slate-700 rounded-lg p-5 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-3xl">📚</div>
                  <div className="flex-1">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Contexte historique
                    </div>
                    <p className="text-slate-200 font-medium mb-2">{p.murTitle}</p>
                    <Link
                      href={`/le-mur#${p.murRef}`}
                      className="inline-flex items-center gap-2 text-sm text-vp-gold hover:text-vp-gold/80 transition underline underline-offset-2"
                    >
                      → Voir le cas complet dans le Mur des décisions
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA Notification */}
              <div className={`bg-${colors.bg}/5 border border-${colors.bg}/30 rounded-xl p-6`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Soyez averti dès l&apos;ouverture
                    </h4>
                    <p className="text-sm text-slate-400">
                      Lancement prévu : <strong className="text-white">{p.expectedLaunch}</strong>
                    </p>
                  </div>
                  <Link
                    href={`mailto:contact@voxpop-app.com?subject=Notifiez-moi%20%3A%20p%C3%A9tition%20${encodeURIComponent(p.id)}&body=Bonjour%2C%0A%0AJe%20souhaite%20%C3%AAtre%20averti%20d%C3%A8s%20l%27ouverture%20de%20la%20p%C3%A9tition%20%22${encodeURIComponent(p.title)}%22.%0A%0AMerci.`}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-${colors.bg} text-vp-deep font-bold rounded-lg hover:opacity-90 transition shadow-lg whitespace-nowrap`}
                  >
                    🔔 M&apos;avertir au lancement
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* SECTION : COMMENT ÇA MARCHE */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-8">Comment ça marchera, concrètement ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-vp-dark border border-vp-teal/20 rounded-xl p-6">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-bold text-white mb-2">1. Vous prouvez que vous êtes Français</h3>
            <p className="text-sm text-slate-400">Authentification via FranceConnect ou ID national, ZKP garantit votre anonymat.</p>
          </div>
          <div className="bg-vp-dark border border-vp-teal/20 rounded-xl p-6">
            <div className="text-3xl mb-3">🗳️</div>
            <h3 className="font-bold text-white mb-2">2. Vous signez la pétition</h3>
            <p className="text-sm text-slate-400">Votre signature est anonyme par construction. Même nous ne savons pas qui a signé.</p>
          </div>
          <div className="bg-vp-dark border border-vp-teal/20 rounded-xl p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-white mb-2">3. Le résultat est public</h3>
            <p className="text-sm text-slate-400">Vérifiable par tout chercheur indépendant. Impossible à falsifier ou censurer.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/institutions"
            className="text-sm text-vp-teal underline underline-offset-2 hover:text-vp-teal/80"
          >
            → Détails techniques sur la cryptographie ZKP
          </Link>
        </div>
      </section>

      {/* FOOTER ETHIQUE */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-vp-dark/50 border border-slate-800 rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-vp-gold mb-3">🏛️ Pas une cause, pas un parti</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            VoxPop n&apos;est ni à gauche, ni à droite, ni au centre. C&apos;est un instrument neutre — comme un thermomètre.
            Il dit ce que pensent les Français, pas ce qu&apos;ils devraient penser.
            <br /><br />
            Le choix des sujets et leur formulation sont publiquement débattus avant chaque lancement.
            Nos contributeurs <Link href="/soutenir" className="text-vp-gold underline">à partir de 30€</Link> peuvent voter sur les futures pétitions.
          </p>
        </div>
      </section>

    </div>
  );
}
