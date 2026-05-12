"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/ui/CTAButton";

// ============================================================
// DATA — Événements du Mur
// ============================================================

type Region = "fr" | "eu" | "world";
type Category = "election" | "law" | "health" | "energy" | "rights" | "geopolitics";

interface WallEvent {
  id: string;
  date: string;             // « 29 mai 2005 »
  year: number;             // 2005 (for sorting)
  flag: string;             // 🇫🇷 🇪🇺 🌍
  region: Region;
  category: Category;
  title: string;
  description: string;
  sources: { label: string; url: string }[];
  highlight?: boolean;      // true = card mise en avant
}

const events: WallEvent[] = [
  // ============================================================
  // HÉROS : Référendum 2005
  // ============================================================
  {
    id: "ref-2005",
    date: "29 mai 2005 → 13 février 2008",
    year: 2005,
    flag: "🇫🇷",
    region: "fr",
    category: "election",
    title: "Référendum constitutionnel européen : NON à 55%, ignoré.",
    description:
      "Le 29 mai 2005, les Français votent NON à 55% (participation 70%) au projet de Constitution européenne. Trois ans plus tard, le 13 février 2008, le Traité de Lisbonne est adopté par voie parlementaire — un texte que Valéry Giscard d'Estaing (son rédacteur) qualifie lui-même de « substantiellement identique » à celui rejeté. Le vote du peuple a été contourné.",
    sources: [
      { label: "Wikipedia — Référendum 2005", url: "https://fr.wikipedia.org/wiki/R%C3%A9f%C3%A9rendum_fran%C3%A7ais_sur_le_trait%C3%A9_%C3%A9tablissant_une_constitution_pour_l%27Europe" },
      { label: "Conseil Constitutionnel", url: "https://www.conseil-constitutionnel.fr/decision/2005/2005525DC.htm" },
      { label: "Le Monde — Lisbonne identique", url: "https://www.lemonde.fr/europe/article/2007/10/27/giscard-d-estaing-le-traite-de-lisbonne-est-le-meme-que-celui-rejete-en-2005_972776_3214.html" },
    ],
    highlight: true,
  },

  // ============================================================
  // 🇫🇷 FRANCE
  // ============================================================
  {
    id: "49-3-retraite",
    date: "16 mars 2023",
    year: 2023,
    flag: "🇫🇷",
    region: "fr",
    category: "law",
    title: "Réforme des retraites adoptée par 49.3, sans vote de l'Assemblée.",
    description:
      "La Première ministre Élisabeth Borne engage la responsabilité du gouvernement (article 49.3) pour faire passer la réforme des retraites repoussant l'âge légal de 62 à 64 ans, sans vote final à l'Assemblée nationale. 11 utilisations du 49.3 par le gouvernement Borne sur ce seul texte budgétaire et réforme.",
    sources: [
      { label: "Assemblée Nationale", url: "https://www.assemblee-nationale.fr/dyn/16/dossiers/financement_securite_sociale_2023_rectificatif" },
      { label: "Le Monde", url: "https://www.lemonde.fr/politique/article/2023/03/16/reforme-des-retraites-elisabeth-borne-engage-la-responsabilite-de-son-gouvernement-au-titre-de-l-article-49-3_6165753_823448.html" },
    ],
  },
  {
    id: "ppe3",
    date: "Mars 2023",
    year: 2023,
    flag: "🇫🇷",
    region: "fr",
    category: "energy",
    title: "PPE3 : programmation énergétique imposée sans consultation citoyenne.",
    description:
      "La Programmation Pluriannuelle de l'Énergie 3 (PPE3) fixe les orientations énergétiques de la France jusqu'en 2035 — sans consultation populaire ni référendum, malgré l'impact massif sur le quotidien (chauffage, transport, éolien, nucléaire). Le mix énergétique futur des Français a été décidé en cabinet.",
    sources: [
      { label: "Ministère Transition Écologique", url: "https://www.ecologie.gouv.fr/programmation-pluriannuelle-lenergie-ppe" },
      { label: "Le Monde — PPE3 sans débat", url: "https://www.lemonde.fr/economie/article/2023/11/19/transition-energetique-le-gouvernement-recule-encore-l-echeance-de-la-loi-de-programmation_6201158_3234.html" },
      { label: "Wikipedia — PPE", url: "https://fr.wikipedia.org/wiki/Programmation_pluriannuelle_de_l%27%C3%A9nergie" },
    ],
  },
  {
    id: "zfe",
    date: "2019-2024",
    year: 2023,
    flag: "🇫🇷",
    region: "fr",
    category: "law",
    title: "Zones à Faibles Émissions (ZFE) : restrictions véhicules sans référendum local.",
    description:
      "Plus de 40 agglomérations françaises imposent des restrictions de circulation aux véhicules anciens (Crit'Air 3, 4, 5) excluant de fait des millions de Français des centres urbains — sans consultation locale par référendum. Décisions prises par décrets et par les métropoles, jamais par vote citoyen.",
    sources: [
      { label: "Service-Public.fr", url: "https://www.service-public.fr/particuliers/vosdroits/F37252" },
      { label: "Le Figaro", url: "https://www.lefigaro.fr/conjoncture/zfe-les-zones-a-faibles-emissions-suscitent-l-opposition-d-une-majorite-de-francais-20230621" },
    ],
  },
  {
    id: "passe-vaccinal",
    date: "Janvier 2022",
    year: 2022,
    flag: "🇫🇷",
    region: "fr",
    category: "health",
    title: "Passe vaccinal voté en urgence pendant les vacances parlementaires.",
    description:
      "Loi du 22 janvier 2022 instituant le passe vaccinal, votée en procédure d'urgence. Restrictions massives à la vie quotidienne (restaurants, transports, culture) sans référendum, malgré l'impact sur les libertés individuelles d'une partie significative de la population.",
    sources: [
      { label: "Légifrance", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000045067218" },
      { label: "Le Monde", url: "https://www.lemonde.fr/politique/article/2022/01/16/le-passe-vaccinal-definitivement-adopte-par-le-parlement_6109714_823448.html" },
    ],
  },
  {
    id: "grand-debat",
    date: "2019",
    year: 2019,
    flag: "🇫🇷",
    region: "fr",
    category: "election",
    title: "Grand Débat National : 1,9 million de contributions, jamais soumis au vote.",
    description:
      "Lancé pour répondre au mouvement des Gilets jaunes, le Grand Débat National recueille 1,9 million de contributions citoyennes en 3 mois. Les résultats sont synthétisés par le gouvernement, mais aucune des propositions n'est soumise à référendum ni à vote contraignant. Consultation sans pouvoir.",
    sources: [
      { label: "Wikipedia — Grand Débat", url: "https://fr.wikipedia.org/wiki/Grand_d%C3%A9bat_national" },
      { label: "Vie Publique", url: "https://www.vie-publique.fr/eclairage/270180-grand-debat-national-quel-bilan" },
    ],
  },
  {
    id: "loi-immigration-2024",
    date: "20 décembre 2023",
    year: 2024,
    flag: "🇫🇷",
    region: "fr",
    category: "law",
    title: "Loi immigration adoptée avec un compromis CMP, sans débat citoyen.",
    description:
      "Loi pour contrôler l'immigration et améliorer l'intégration, adoptée par la Commission Mixte Paritaire avec des amendements du RN — texte très éloigné du projet initial. Aucune consultation citoyenne malgré la sensibilité du sujet et la division publique sur la question.",
    sources: [
      { label: "Assemblée Nationale", url: "https://www.assemblee-nationale.fr/dyn/16/dossiers/controler_immigration_ameliorer_integration" },
      { label: "Le Monde — Compromis CMP", url: "https://www.lemonde.fr/politique/article/2023/12/19/loi-immigration-le-texte-adopte-par-le-parlement-marque-un-net-durcissement_6206800_823448.html" },
      { label: "Conseil Constitutionnel", url: "https://www.conseil-constitutionnel.fr/decision/2024/2023863DC.htm" },
    ],
  },
  {
    id: "covid-restrictions",
    date: "2020-2022",
    year: 2020,
    flag: "🇫🇷",
    region: "fr",
    category: "health",
    title: "Mesures Covid : confinements, couvre-feux, restrictions imposées par décret.",
    description:
      "État d'urgence sanitaire prolongé à plusieurs reprises. Restrictions massives (confinements, couvre-feux, fermetures commerces, restrictions déplacements) imposées par décret sans consultation citoyenne, malgré une durée totale de plus de 2 ans et un impact économique et social majeur.",
    sources: [
      { label: "Vie Publique — Chronologie", url: "https://www.vie-publique.fr/eclairage/273936-covid-19-chronologie-de-la-crise-sanitaire-en-france" },
      { label: "Wikipedia — État d'urgence sanitaire", url: "https://fr.wikipedia.org/wiki/%C3%89tat_d%27urgence_sanitaire_en_France" },
      { label: "Légifrance — Loi 2020-290", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041746313/" },
    ],
  },

  // ============================================================
  // 🇪🇺 EUROPE
  // ============================================================
  {
    id: "ceta",
    date: "21 septembre 2017",
    year: 2017,
    flag: "🇪🇺",
    region: "eu",
    category: "law",
    title: "CETA : appliqué provisoirement avant ratification nationale complète.",
    description:
      "Accord économique et commercial global UE-Canada appliqué de façon provisoire depuis septembre 2017, sans attendre la ratification par tous les parlements nationaux des États membres (procédure pourtant requise). En France, le Sénat a rejeté la ratification en mars 2024 — l'accord continue de s'appliquer malgré tout.",
    sources: [
      { label: "Commission Européenne", url: "https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/canada/eu-canada-agreement_en" },
      { label: "Le Monde — Rejet Sénat", url: "https://www.lemonde.fr/politique/article/2024/03/21/le-senat-rejette-la-ratification-du-traite-de-libre-echange-ceta-une-defaite-pour-emmanuel-macron_6223539_823448.html" },
    ],
  },
  {
    id: "ai-act",
    date: "21 mai 2024",
    year: 2024,
    flag: "🇪🇺",
    region: "eu",
    category: "law",
    title: "IA Act européen : 449 millions d'Européens régulés sans consultation populaire.",
    description:
      "Premier cadre juridique mondial sur l'intelligence artificielle adopté par le Conseil de l'UE. Impact massif sur la vie quotidienne, l'emploi, les libertés — décidé par les négociations entre Commission (non élue), Parlement européen et États membres, sans aucune consultation populaire à l'échelle de l'UE.",
    sources: [
      { label: "Conseil UE — AI Act", url: "https://www.consilium.europa.eu/fr/press/press-releases/2024/05/21/artificial-intelligence-ai-act-council-gives-final-green-light-to-the-first-worldwide-rules-on-ai/" },
      { label: "Texte officiel AI Act", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689" },
      { label: "Wikipedia — AI Act", url: "https://fr.wikipedia.org/wiki/R%C3%A8glement_sur_l%27intelligence_artificielle" },
    ],
  },
  {
    id: "green-deal",
    date: "2019-2024",
    year: 2019,
    flag: "🇪🇺",
    region: "eu",
    category: "energy",
    title: "Pacte vert européen : transition imposée à 450 millions d'Européens.",
    description:
      "Ensemble massif de mesures (fin moteur thermique 2035, taxonomie verte, etc.) décidé par la Commission von der Leyen et adopté par le Conseil/Parlement. Aucune consultation populaire européenne, malgré l'impact sur le quotidien (voiture, chauffage, agriculture).",
    sources: [
      { label: "Commission Européenne", url: "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/european-green-deal_fr" },
      { label: "Wikipedia — Pacte vert", url: "https://fr.wikipedia.org/wiki/Pacte_vert_pour_l%27Europe" },
      { label: "Parlement européen", url: "https://www.europarl.europa.eu/factsheets/fr/sheet/85/le-pacte-vert-pour-l-europe" },
    ],
  },
  {
    id: "mercosur",
    date: "2024",
    year: 2024,
    flag: "🇪🇺",
    region: "eu",
    category: "law",
    title: "Mercosur : accord signé malgré l'opposition de la France et des agriculteurs.",
    description:
      "Accord de libre-échange UE-Mercosur (Brésil, Argentine, Uruguay, Paraguay) finalisé par la Commission von der Leyen en décembre 2024 malgré l'opposition explicite du gouvernement français et de la profession agricole. Pas de consultation citoyenne européenne.",
    sources: [
      { label: "Commission UE", url: "https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/mercosur_en" },
      { label: "Le Monde — Accord finalisé", url: "https://www.lemonde.fr/economie/article/2024/12/06/accord-de-libre-echange-entre-l-union-europeenne-et-le-mercosur-la-commission-europeenne-annonce-la-finalisation_6435060_3234.html" },
      { label: "FNSEA — Opposition agriculteurs", url: "https://www.fnsea.fr/communiques-de-presse/" },
    ],
  },

  // ============================================================
  // 🌍 MONDE
  // ============================================================
  {
    id: "roe-wade",
    date: "24 juin 2022",
    year: 2022,
    flag: "🇺🇸",
    region: "world",
    category: "rights",
    title: "Roe v. Wade renversé sans consultation populaire aux États-Unis.",
    description:
      "La Cour Suprême américaine annule l'arrêt Roe v. Wade (1973) qui garantissait le droit constitutionnel à l'avortement. Décision prise par 9 juges nommés à vie, renversant 50 ans de jurisprudence sans consultation populaire. Conséquence : interdiction de l'avortement dans une vingtaine d'États.",
    sources: [
      { label: "Supreme Court — Décision Dobbs v. Jackson", url: "https://www.supremecourt.gov/opinions/21pdf/19-1392_6j37.pdf" },
      { label: "Wikipedia — Dobbs v. Jackson", url: "https://fr.wikipedia.org/wiki/Dobbs_v._Jackson_Women%27s_Health_Organization" },
      { label: "Le Monde — Roe v. Wade renversé", url: "https://www.lemonde.fr/international/article/2022/06/24/aux-etats-unis-la-cour-supreme-revoque-l-arret-roe-vs-wade_6131995_3210.html" },
    ],
  },
  {
    id: "mahsa-amini",
    date: "Septembre 2022 →",
    year: 2022,
    flag: "🇮🇷",
    region: "world",
    category: "rights",
    title: "Iran : répression sanglante des manifestations Mahsa Amini.",
    description:
      "Mort de Mahsa Amini le 16 septembre 2022, après son arrestation par la police des mœurs pour port incorrect du voile. Manifestations massives « Femme, Vie, Liberté » réprimées par le régime : plus de 500 morts, plusieurs milliers d'arrestations, peines de mort prononcées. La voix du peuple iranien est étouffée par la violence.",
    sources: [
      { label: "Amnesty International", url: "https://www.amnesty.org/fr/latest/news/2022/12/iran-12-ways-iranian-authorities-are-violating-protesters-rights/" },
      { label: "ONU — Mission d'établissement des faits", url: "https://news.un.org/en/story/2024/03/1147681" },
      { label: "OHCHR — Experts UN", url: "https://www.ohchr.org/en/press-releases/2022/10/iran-crackdown-peaceful-protests-death-jina-mahsa-amini-needs-independent" },
    ],
  },
  {
    id: "crimee",
    date: "16 mars 2014",
    year: 2014,
    flag: "🇷🇺",
    region: "world",
    category: "geopolitics",
    title: "Annexion de la Crimée : référendum non reconnu internationalement.",
    description:
      "La Russie organise un référendum d'annexion de la Crimée en mars 2014, dans un contexte de présence militaire russe et sans observateurs internationaux. Résultat officiel : 96% pour le rattachement à la Russie. L'ONU et la quasi-totalité des pays démocratiques ne reconnaissent pas la validité du scrutin.",
    sources: [
      { label: "Résolution ONU 68/262", url: "https://digitallibrary.un.org/record/767565" },
      { label: "Wikipedia — Référendum Crimée 2014", url: "https://fr.wikipedia.org/wiki/R%C3%A9f%C3%A9rendum_de_2014_en_Crim%C3%A9e" },
      { label: "Conseil Sécurité ONU — Veto Russie", url: "https://www.un.org/securitycouncil/fr/content/highlights-2014" },
    ],
  },
];

// ============================================================
// UTILS
// ============================================================
const categoryLabels: Record<Category, string> = {
  election: "Élection",
  law: "Loi",
  health: "Santé",
  energy: "Énergie",
  rights: "Libertés",
  geopolitics: "Géopolitique",
};

const regionLabels: Record<Region, string> = {
  fr: "🇫🇷 France",
  eu: "🇪🇺 Europe",
  world: "🌍 Monde",
};

// ============================================================
// COMPOSANT
// ============================================================
export default function LeMurPage() {
  const [activeRegion, setActiveRegion] = useState<Region | "all">("all");

  const sortedEvents = [...events].sort((a, b) => b.year - a.year);
  const filtered =
    activeRegion === "all"
      ? sortedEvents
      : sortedEvents.filter((e) => e.region === activeRegion);

  const hero = events.find((e) => e.highlight);

  return (
    <div className="bg-vp-dark overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vp-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-bold tracking-widest uppercase mb-6"
          >
            ↓ Mémoire démocratique · Sourcé · Factuel
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Le Mur des{" "}
            <span className="bg-gradient-to-r from-red-400 via-vp-gold to-vp-teal bg-clip-text text-transparent">
              dé<span className="subliminal-letter">c</span>isi<span className="subliminal-letter">o</span><span className="subliminal-letter">n</span><span className="subliminal-letter">s</span>.
            </span>
          </motion.h1>
          <style jsx>{`
            .subliminal-letter {
              text-decoration: underline;
              text-decoration-thickness: 1px;
              text-decoration-color: rgba(252, 165, 165, 0.55);
              text-underline-offset: 4px;
            }
          `}</style>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            <strong className="text-white">{events.length} décisions majeures</strong> prises sans consulter les citoyens — en France, en Europe et dans le monde.
            <br />
            <span className="text-slate-400 text-base mt-2 inline-block italic">
              Pas un manifeste. Pas une opinion. Juste les faits, sourcés.
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-slate-500 font-mono"
          >
            « C&apos;est pour ça qu&apos;on a créé VoxPop. »
          </motion.div>
        </div>
      </section>

      {/* ========== HÉROS : RÉFÉRENDUM 2005 ========== */}
      {hero && (
        <section className="px-6 py-12 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-red-950/40 via-vp-dark to-vp-deep border-2 border-red-500/40 rounded-2xl p-8 md:p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{hero.flag}</span>
                  <span className="font-mono text-xs font-bold text-red-300 tracking-widest uppercase">
                    {hero.date} · Cas d&apos;école
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  {hero.title}
                </h2>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
                  {hero.description}
                </p>
                <div className="border-t border-red-500/20 pt-5">
                  <p className="text-xs font-mono font-bold text-red-300 uppercase tracking-widest mb-3">
                    Sources officielles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hero.sources.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-200 text-xs hover:bg-red-500/20 transition-colors"
                      >
                        → {s.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-red-500/20 text-red-200 italic text-lg font-light">
                  « Ils ont voté contre nous. »
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ========== FILTRES ========== */}
      <section className="px-6 py-8 sticky top-16 bg-vp-dark/95 backdrop-blur z-20 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {(["all", "fr", "eu", "world"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeRegion === r
                  ? "bg-gradient-to-r from-vp-teal to-vp-blue text-white shadow-lg shadow-vp-teal/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
              }`}
            >
              {r === "all" ? `Tous (${events.length})` : `${regionLabels[r]} (${events.filter((e) => e.region === r).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {filtered.filter((e) => !e.highlight).map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-vp-gold/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3 flex-wrap">
                <span className="text-2xl">{event.flag}</span>
                <span className="font-mono text-xs font-bold text-vp-gold tracking-widest uppercase">
                  {event.date}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-vp-teal/10 text-vp-teal text-xs font-mono border border-vp-teal/20">
                  {categoryLabels[event.category]}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                {event.title}
              </h3>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
                {event.description}
              </p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-vp-teal hover:text-vp-gold underline underline-offset-2"
                    >
                      → {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ========== CONTRIBUE ========== */}
      <section className="px-6 py-16 bg-gradient-to-b from-transparent to-vp-deep/30">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Un événement à ajouter ?"
            subtitle="Le Mur est collaboratif. Si vous avez un cas documenté à ajouter, envoyez-nous la source — nous vérifions et nous publions."
          />
          <a
            href="mailto:contact@voxpop-app.com?subject=Le%20Mur%20%E2%80%94%20Proposition%20d%27%C3%A9v%C3%A9nement"
            className="inline-block px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition-colors font-semibold"
          >
            Proposer un événement →
          </a>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vp-gold/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            C&apos;est pour <span className="gradient-text-gold">ça</span> qu&apos;on a créé VoxPop.
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Quand l&apos;État refuse de demander, les citoyens répondent quand même. Pétitions anonymes, vérifiables, incensurables.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/citoyens" large>
              Découvrir VoxPop Citoyens →
            </CTAButton>
            <Link
              href="/"
              className="text-slate-400 hover:text-vp-teal transition-colors text-sm"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
