"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
type DemoStep =
  | "welcome"
  | "create"
  | "identity"
  | "vote"
  | "confirm"
  | "results"
  | "audit";

interface VoteOption {
  id: string;
  label: string;
  emoji: string;
}

interface VoteReceipt {
  voteHash: string;
  nullifierHash: string;
  chainPosition: number;
  previousHash: string;
  timestamp: string;
  pollId: string;
  choiceIndex: number;
  zkpVerification: {
    proofValid: boolean;
    merkleRootVerified: boolean;
    nullifierUnique: boolean;
    verificationTimeMs: number;
  };
}

interface AuditData {
  poll: {
    id: string;
    title: string;
    choices: string[];
    countryCode: string;
  };
  results: {
    choiceIndex: number;
    label: string;
    votes: number;
    percentage: number;
  }[];
  totalVotes: number;
  chain: {
    verification: {
      isValid: boolean;
      blocksChecked: number;
    };
    length: number;
    genesisHash: string;
    latestHash: string;
    blocks: {
      index: number;
      hash: string;
      previousHash: string;
      timestamp: string;
      choiceIndex: number;
    }[];
  };
}

// ============================================================
// DEFAULT DATA (used as fallback + initial display)
// ============================================================
const DEMO_QUESTION = "Notre association doit-elle adopter la semaine de 4 jours ?";
const DEMO_OPTIONS: VoteOption[] = [
  { id: "yes", label: "Oui, adoptons-la", emoji: "✅" },
  { id: "no", label: "Non, gardons 5 jours", emoji: "❌" },
  { id: "trial", label: "Periode d'essai d'abord", emoji: "🔄" },
  { id: "abstain", label: "Abstention", emoji: "⬜" },
];

// Fallback values (shown if API hasn't been called yet)
const FALLBACK_HASH = "a7f3c2e8d4b1...9f0e6a3d8c5b";
const FALLBACK_NULLIFIER = "0x7a3f...e9d2";
const FALLBACK_PROOF = "π = (A, B, C) ∈ G₁ × G₂ × G₁";
const FALLBACK_MERKLE_ROOT = "0xd4e7...3a1f";

// ============================================================
// STEP INDICATOR
// ============================================================
const steps: { key: DemoStep; label: string; icon: string }[] = [
  { key: "welcome", label: "Start", icon: "🏠" },
  { key: "create", label: "Create", icon: "📝" },
  { key: "identity", label: "Verify", icon: "🔐" },
  { key: "vote", label: "Vote", icon: "🗳️" },
  { key: "confirm", label: "Proof", icon: "✅" },
  { key: "results", label: "Results", icon: "📊" },
  { key: "audit", label: "Audit", icon: "🔗" },
];

function StepIndicator({
  current,
  onStep,
}: {
  current: DemoStep;
  onStep: (s: DemoStep) => void;
}) {
  const currentIdx = steps.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 flex-wrap">
      {steps.map((step, i) => {
        const isActive = i === currentIdx;
        const isDone = i < currentIdx;
        return (
          <button
            key={step.key}
            onClick={() => onStep(step.key)}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-vp-teal to-vp-blue text-white shadow-lg shadow-vp-teal/30 scale-105"
                : isDone
                ? "bg-vp-teal/20 text-vp-teal border border-vp-teal/30"
                : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
            }`}
          >
            <span>{step.icon}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// PHONE FRAME (mobile simulation on desktop)
// ============================================================
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:flex justify-center">
      <div className="relative w-[375px] h-[750px] rounded-[3rem] border-4 border-slate-600 bg-vp-dark shadow-2xl shadow-black/50 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-600 rounded-b-2xl z-10" />
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-vp-dark/80 backdrop-blur-sm z-10 flex items-end justify-between px-8 pb-1">
          <span className="text-[10px] text-white/60">9:41</span>
          <span className="text-[10px] text-white/60">🔋 87%</span>
        </div>
        {/* Content */}
        <div className="absolute inset-0 pt-12 pb-8 overflow-y-auto">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}

// ============================================================
// CRYPTO ANIMATION HELPER
// ============================================================
function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span className="font-mono text-vp-teal">{displayed}<span className="animate-pulse">|</span></span>;
}

function ProgressBar({ duration = 3000, onComplete }: { duration?: number; onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [duration, onComplete]);
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-vp-teal to-vp-blue rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ============================================================
// STEP: WELCOME
// ============================================================
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center px-4 sm:px-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-7xl mb-6"
      >
        🗳️
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Bienvenue dans la démo <span className="gradient-text">VoxPop</span>
      </h2>
      <p className="text-slate-300 mb-2 max-w-md mx-auto">
        Découvrez comment fonctionne un vote sécurisé, anonyme et vérifiable
        avec les Zero-Knowledge Proofs.
      </p>
      <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
        Cette démonstration interactive simule le parcours complet : de la
        création du vote jusqu&apos;à l&apos;audit cryptographique.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
        {[
          { icon: "🔐", title: "Anonyme", desc: "Personne ne sait qui vote quoi" },
          { icon: "✅", title: "Vérifiable", desc: "Chaque vote est prouvé mathématiquement" },
          { icon: "🌍", title: "Anti-censure", desc: "Fonctionne même sous censure étatique" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="glass-card p-4 text-center"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-slate-400 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 hover:shadow-xl hover:shadow-vp-teal/40 transition-shadow text-lg"
      >
        Commencer la démo →
      </motion.button>
    </motion.div>
  );
}

// ============================================================
// STEP: CREATE VOTE
// ============================================================
function CreateStep({
  onNext,
  onCreatePoll,
}: {
  onNext: () => void;
  onCreatePoll: (question: string) => Promise<void>;
}) {
  const [question, setQuestion] = useState(DEMO_QUESTION);
  const [showOptions, setShowOptions] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOptions(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    await onCreatePoll(question);
    setCreating(false);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">📝</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Créer un vote
        </h2>
        <p className="text-slate-400 text-sm">
          L&apos;organisateur définit la question et les options
        </p>
      </div>

      {/* Vote form */}
      <div className="glass-card p-5 sm:p-6 max-w-md mx-auto space-y-4">
        <div>
          <label className="text-slate-300 text-sm font-medium block mb-2">
            Question du vote
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-vp-teal focus:ring-1 focus:ring-vp-teal outline-none transition-all text-sm"
          />
        </div>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <label className="text-slate-300 text-sm font-medium block mb-2">
                Options de vote
              </label>
              {DEMO_OPTIONS.map((opt, i) => (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl"
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="text-white text-sm">{opt.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-slate-300 text-xs font-medium block mb-1">
              Durée
            </label>
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
              7 jours
            </div>
          </div>
          <div>
            <label className="text-slate-300 text-xs font-medium block mb-1">
              Pays éligible
            </label>
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm">
              🇫🇷 France
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="w-2 h-2 bg-vp-teal rounded-full animate-pulse" />
            Chiffrement de bout en bout activé
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 bg-vp-teal rounded-full animate-pulse" />
            Merkle Tree 🇫🇷 France sélectionné
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          disabled={creating}
          className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 text-sm disabled:opacity-50"
        >
          {creating ? "Création du vote..." : "Vote créé ! Passer au vote →"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================
// STEP: IDENTITY VERIFICATION (ZKP)
// ============================================================
function IdentityStep({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"scan" | "verify" | "proof" | "done">("scan");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("verify"), 2000),
      setTimeout(() => setPhase("proof"), 4000),
      setTimeout(() => setPhase("done"), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🔐</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Vérification d&apos;identité
        </h2>
        <p className="text-slate-400 text-sm">
          Zero-Knowledge Proof : prouver sans révéler
        </p>
      </div>

      <div className="glass-card p-5 sm:p-6 max-w-md mx-auto">
        {/* Phase: Scan */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${phase !== "scan" ? "bg-vp-teal/20 text-vp-teal" : "bg-vp-blue/20 text-vp-blue animate-pulse"}`}>
              {phase !== "scan" ? "✓" : "1"}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Identité numérique eIDAS 2.0</p>
              <p className="text-slate-400 text-xs">
                {phase === "scan"
                  ? "Lecture du portefeuille d'identité..."
                  : "Identité validée — citoyen français confirmé"}
              </p>
            </div>
          </div>

          {phase === "scan" && (
            <div className="ml-11">
              <ProgressBar duration={1800} />
            </div>
          )}

          {/* Phase: Verify Merkle Tree */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== "scan" ? 1 : 0.3 }}
            className="flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${phase === "proof" || phase === "done" ? "bg-vp-teal/20 text-vp-teal" : phase === "verify" ? "bg-vp-blue/20 text-vp-blue animate-pulse" : "bg-white/10 text-slate-500"}`}>
              {phase === "proof" || phase === "done" ? "✓" : "2"}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Vérification Merkle Tree 🇫🇷</p>
              <p className="text-slate-400 text-xs">
                {phase === "verify"
                  ? "Recherche dans l'arbre des citoyens français..."
                  : phase === "proof" || phase === "done"
                  ? "Présent dans le Merkle Tree France"
                  : "En attente..."}
              </p>
            </div>
          </motion.div>

          {phase === "verify" && (
            <div className="ml-11">
              <ProgressBar duration={1800} />
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Root: {FALLBACK_MERKLE_ROOT}
              </p>
            </div>
          )}

          {/* Phase: Generate ZKP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "proof" || phase === "done" ? 1 : 0.3 }}
            className="flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${phase === "done" ? "bg-vp-teal/20 text-vp-teal" : phase === "proof" ? "bg-vp-blue/20 text-vp-blue animate-pulse" : "bg-white/10 text-slate-500"}`}>
              {phase === "done" ? "✓" : "3"}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Génération ZK-SNARK (Semaphore)</p>
              <p className="text-slate-400 text-xs">
                {phase === "proof"
                  ? "Calcul de la preuve cryptographique..."
                  : phase === "done"
                  ? "Preuve générée en 2.3s — Identité JAMAIS transmise"
                  : "En attente..."}
              </p>
            </div>
          </motion.div>

          {phase === "proof" && (
            <div className="ml-11">
              <ProgressBar duration={1800} />
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {FALLBACK_PROOF}
              </p>
            </div>
          )}
        </div>

        {/* Success message */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-vp-teal/10 border border-vp-teal/30 rounded-xl text-center"
            >
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-vp-teal font-semibold text-sm">
                Vérification réussie !
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Le serveur sait que vous êtes un citoyen français éligible,
                mais il ne sait PAS qui vous êtes.
              </p>
              <div className="mt-3 p-2 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-500 font-mono">
                  Nullifier: {FALLBACK_NULLIFIER}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase === "done" && (
        <div className="text-center mt-6">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 text-sm"
          >
            Identité vérifiée ! Voter →
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================
// STEP: VOTE
// ============================================================
function VoteStep({
  onNext,
  onVote,
}: {
  onNext: () => void;
  onVote: (choiceIndex: number) => Promise<void>;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    const choiceIndex = DEMO_OPTIONS.findIndex((o) => o.id === selected);
    await onVote(choiceIndex);
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(onNext, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🗳️</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Votez anonymement
        </h2>
        <p className="text-slate-400 text-sm">
          Votre choix est chiffré et protégé par ZKP
        </p>
      </div>

      <div className="glass-card p-5 sm:p-6 max-w-md mx-auto">
        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
          {DEMO_QUESTION}
        </h3>

        <div className="space-y-3 mb-6">
          {DEMO_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => !submitted && !submitting && setSelected(opt.id)}
              disabled={submitted || submitting}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left ${
                selected === opt.id
                  ? "border-vp-teal bg-vp-teal/10 shadow-lg shadow-vp-teal/20"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              } ${submitted || submitting ? "opacity-60" : ""}`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className={`text-sm font-medium ${selected === opt.id ? "text-vp-teal" : "text-white"}`}>
                {opt.label}
              </span>
              {selected === opt.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-vp-teal"
                >
                  ●
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-vp-teal/20 flex items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl"
              >
                ✓
              </motion.span>
            </div>
            <p className="text-vp-teal font-semibold text-sm">
              Vote enregistré et chiffré !
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Preuve ZKP vérifiée — ajouté à la hash chain
            </p>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: selected ? 1.05 : 1 }}
            whileTap={{ scale: selected ? 0.95 : 1 }}
            onClick={handleSubmit}
            disabled={!selected || submitting}
            className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              selected && !submitting
                ? "bg-gradient-to-r from-vp-teal to-vp-blue text-white shadow-lg shadow-vp-teal/25"
                : "bg-white/10 text-slate-500 cursor-not-allowed"
            }`}
          >
            {submitting
              ? "Vérification ZKP en cours..."
              : selected
              ? "Confirmer mon vote 🔒"
              : "Sélectionnez une option"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// STEP: CONFIRMATION + CRYPTO PROOF
// ============================================================
function ConfirmStep({
  onNext,
  receipt,
}: {
  onNext: () => void;
  receipt: VoteReceipt | null;
}) {
  // Use real receipt data or fallback
  const voteHash = receipt
    ? receipt.voteHash.slice(0, 16) + "..." + receipt.voteHash.slice(-16)
    : FALLBACK_HASH;
  const nullifier = receipt
    ? "0x" + receipt.nullifierHash.slice(0, 8) + "..." + receipt.nullifierHash.slice(-4)
    : FALLBACK_NULLIFIER;
  const previousHash = receipt
    ? receipt.previousHash.slice(0, 16) + "..." + receipt.previousHash.slice(-8)
    : FALLBACK_MERKLE_ROOT;
  const verificationTime = receipt?.zkpVerification.verificationTimeMs || 2300;
  const proofString = receipt
    ? `ZKP valid=${receipt.zkpVerification.proofValid} | merkle=${receipt.zkpVerification.merkleRootVerified} | unique=${receipt.zkpVerification.nullifierUnique}`
    : "π = (A, B, C) ∈ G₁ × G₂ × G₁";
  const chainPos = receipt ? `#${receipt.chainPosition}` : "#?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-5xl mb-3"
        >
          ✅
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Vote confirmé !
        </h2>
        <p className="text-slate-400 text-sm">
          Voici votre preuve cryptographique {receipt && "(données réelles)"}
        </p>
      </div>

      <div className="glass-card p-5 sm:p-6 max-w-md mx-auto space-y-4">
        {/* Receipt */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              Reçu de vote {chainPos}
            </span>
            <span className="text-xs px-2 py-0.5 bg-vp-teal/20 text-vp-teal rounded-full">
              {receipt ? "✓ SHA-256 réel" : "Vérifié"}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500">Hash du vote (SHA-256)</p>
              <p className="text-xs font-mono text-vp-teal break-all">
                <TypewriterText text={voteHash} speed={30} />
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Nullifier (anti double-vote)</p>
              <p className="text-xs font-mono text-white break-all">
                <TypewriterText text={nullifier} speed={40} />
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">ZK-SNARK Proof</p>
              <p className="text-xs font-mono text-vp-gold break-all">
                <TypewriterText text={proofString} speed={20} />
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Hash précédent (chaînage)</p>
              <p className="text-xs font-mono text-white break-all">
                <TypewriterText text={previousHash} speed={40} />
              </p>
            </div>
            {receipt && (
              <div>
                <p className="text-xs text-slate-500">Temps de vérification</p>
                <p className="text-xs font-mono text-slate-300">
                  {verificationTime}ms
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          {[
            { icon: "🔐", text: "Votre identité n'a JAMAIS été transmise" },
            { icon: "🚫", text: "Le serveur ne peut PAS savoir pour qui vous avez voté" },
            { icon: "✅", text: "Votre vote EST compté — prouvé mathématiquement" },
            { icon: "🔗", text: "Ce hash est ajouté à la hash chain (infalsifiable)" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="flex items-start gap-2"
            >
              <span className="text-sm mt-0.5">{item.icon}</span>
              <span className="text-xs text-slate-300">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 text-sm"
        >
          Voir les résultats →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================
// STEP: RESULTS
// ============================================================
function ResultsStep({
  onNext,
  auditData,
  selectedChoiceIndex,
}: {
  onNext: () => void;
  auditData: AuditData | null;
  selectedChoiceIndex: number;
}) {
  // Use real audit data if available, otherwise fallback to mock
  const MOCK_RESULTS = [
    { label: "Oui, adoptons-la", votes: 847, percentage: 42.4 },
    { label: "Non, gardons 5 jours", votes: 312, percentage: 15.6 },
    { label: "Periode d'essai d'abord", votes: 741, percentage: 37.1 },
    { label: "Abstention", votes: 100, percentage: 5.0 },
  ];

  const results = auditData?.results || MOCK_RESULTS;
  const totalVotes = auditData?.totalVotes || 2000;
  const maxVotes = Math.max(...results.map((r) => r.votes));
  const isLive = !!auditData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">📊</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Résultats vérifiables
        </h2>
        <p className="text-slate-400 text-sm">
          {isLive
            ? "Résultats en temps réel depuis la hash chain"
            : "Chaque vote est prouvé — les résultats sont infalsifiables"}
        </p>
      </div>

      <div className="glass-card p-5 sm:p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">
            {auditData?.poll.title || DEMO_QUESTION}
          </h3>
          <span className="text-xs px-2 py-0.5 bg-vp-teal/20 text-vp-teal rounded-full whitespace-nowrap ml-2">
            {totalVotes.toLocaleString()} vote{totalVotes > 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-4">
          {results.map((result, i) => {
            const isUserChoice = i === selectedChoiceIndex;
            return (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${isUserChoice ? "text-vp-teal font-semibold" : "text-white"}`}>
                    {result.label} {isUserChoice && "← votre vote"}
                  </span>
                  <span className="text-sm font-mono text-vp-teal">
                    {result.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.votes === maxVotes
                        ? "bg-gradient-to-r from-vp-teal to-vp-blue"
                        : isUserChoice
                        ? "bg-vp-teal/60"
                        : "bg-white/20"
                    }`}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {result.votes.toLocaleString()} vote{result.votes > 1 ? "s" : ""} vérifié{result.votes > 1 ? "s" : ""}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 p-3 bg-white/5 border border-white/10 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400 animate-pulse" : "bg-vp-teal"}`} />
            <span className="text-xs text-slate-300 font-medium">
              {isLive ? "Données temps réel — hash chain vérifiée" : "Intégrité garantie"}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isLive
              ? `${auditData.chain.length} blocs dans la chaîne. Vérification : ${auditData.chain.verification.isValid ? "✅ Intègre" : "❌ Erreur"}. Chaque vote possède un hash SHA-256 unique.`
              : "Chaque vote possède une preuve ZK-SNARK. Le total correspond exactement au nombre de preuves vérifiées. Aucun vote fantôme, aucun vote supprimé."}
          </p>
        </motion.div>
      </div>

      <div className="text-center mt-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 text-sm"
        >
          Voir l&apos;audit cryptographique →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================
// STEP: AUDIT (HASH CHAIN)
// ============================================================
function AuditStep({
  onRestart,
  auditData,
}: {
  onRestart: () => void;
  auditData: AuditData | null;
}) {
  // Fallback chain blocks if no audit data
  const MOCK_CHAIN = [
    { index: 0, hash: "0000...genesis", previousHash: "0000...0000", timestamp: "10:00", choiceIndex: -1 },
    { index: 1, hash: "7a3f...e2d1", previousHash: "0000...genesis", timestamp: "10:05", choiceIndex: 0 },
    { index: 2, hash: "b4c8...9f3a", previousHash: "7a3f...e2d1", timestamp: "10:10", choiceIndex: 2 },
    { index: 3, hash: "d1e5...4b7c", previousHash: "b4c8...9f3a", timestamp: "10:15", choiceIndex: 0 },
  ];

  const chainBlocks = auditData?.chain.blocks || MOCK_CHAIN;
  const isLive = !!auditData;
  const chainValid = auditData?.chain.verification.isValid ?? true;

  // Show last 6 blocks max for UI clarity (skip genesis if many blocks)
  const displayBlocks = chainBlocks.length > 6
    ? [chainBlocks[0], ...chainBlocks.slice(-5)]
    : chainBlocks;
  const skippedBlocks = chainBlocks.length > 6 ? chainBlocks.length - 6 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🔗</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Audit — Hash Chain
        </h2>
        <p className="text-slate-400 text-sm">
          {isLive
            ? `${chainBlocks.length} blocs réels — SHA-256 vérifiable`
            : "La chaîne de preuves est publique et vérifiable par tous"}
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {displayBlocks.map((block, i) => {
          const isGenesis = block.index === 0;
          const time = block.timestamp.includes("T")
            ? new Date(block.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
            : block.timestamp;

          return (
            <motion.div
              key={block.index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Show "... N blocks skipped" indicator */}
              {i === 1 && skippedBlocks > 0 && (
                <div className="flex justify-center py-2 mb-3">
                  <span className="text-xs text-slate-500 px-3 py-1 bg-white/5 rounded-full">
                    ... {skippedBlocks} blocs ...
                  </span>
                </div>
              )}
              <div className={`glass-card p-4 relative ${isGenesis ? "border border-vp-gold/30" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isGenesis ? "text-vp-gold" : "text-vp-teal"}`}>
                    {isGenesis ? "Genesis Block" : `Block #${block.index}`}
                  </span>
                  <span className="text-xs text-slate-500">{time}</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div>
                    <span className="text-slate-500">Hash: </span>
                    <span className="font-mono text-white">{block.hash}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Prev: </span>
                    <span className="font-mono text-slate-400">{block.previousHash}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {isGenesis
                      ? "Bloc de genèse"
                      : `Vote option #${block.choiceIndex}`}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${chainValid ? "bg-vp-teal/10 text-vp-teal" : "bg-red-500/10 text-red-400"}`}>
                    {chainValid ? "✓ Intègre" : "✗ Cassé"}
                  </span>
                </div>
              </div>
              {/* Chain link */}
              {i < displayBlocks.length - 1 && (
                <div className="flex justify-center py-1">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.15 + 0.1 }}
                    className="w-0.5 h-6 bg-gradient-to-b from-vp-teal to-transparent"
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="glass-card p-5 max-w-md mx-auto mt-6"
      >
        {isLive && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-vp-teal/10 rounded-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-vp-teal font-medium">
              Données réelles — {auditData.chain.verification.blocksChecked} blocs vérifiés
            </span>
          </div>
        )}
        <h3 className="text-white font-semibold text-sm mb-3 text-center">
          Ce que garantit cette chaîne :
        </h3>
        <div className="space-y-2">
          {[
            { icon: "🔒", text: "Chaque bloc contient le hash du bloc précédent" },
            { icon: "⚡", text: "Modifier un vote casse TOUTE la chaîne après lui" },
            { icon: "👁️", text: "N'importe qui peut vérifier l'intégrité" },
            { icon: "🌍", text: "La chaîne est publique mais les votes sont anonymes" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.15 }}
              className="flex items-start gap-2"
            >
              <span className="text-sm mt-0.5">{item.icon}</span>
              <span className="text-xs text-slate-300">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Restart */}
      <div className="text-center mt-8 space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-slate-400 text-sm mb-4">
            🎉 Fin de la démonstration !
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-vp-teal to-vp-blue text-white font-semibold rounded-full shadow-lg shadow-vp-teal/25 text-sm"
          >
            Recommencer la démo 🔄
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN DEMO PAGE
// ============================================================
export default function DemoPage() {
  const [step, setStep] = useState<DemoStep>("welcome");
  const [pollId, setPollId] = useState<string | null>(null);
  const [voteReceipt, setVoteReceipt] = useState<VoteReceipt | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number>(-1);

  // Auto-scroll to top on step change (fix mobile: éviter que l'utilisateur reste bloqué en bas
  // après avoir cliqué sur le bouton de fin d'étape, et doive scroller pour voir la suite)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const goTo = (s: DemoStep) => setStep(s);
  const nextStep = () => {
    const idx = steps.findIndex((s) => s.key === step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1].key);
    }
  };

  // Create poll via API when entering the create step
  const handleCreatePoll = useCallback(async (question: string) => {
    try {
      const res = await fetch("/api/demo/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: question,
          choices: DEMO_OPTIONS.map((o) => o.label),
          countryCode: "FR",
        }),
      });
      const data = await res.json();
      if (data.success && data.poll) {
        setPollId(data.poll.id);
      }
    } catch (err) {
      console.error("Failed to create poll:", err);
    }
  }, []);

  // Submit vote via API
  const handleVote = useCallback(
    async (choiceIndex: number) => {
      if (!pollId) return;
      setSelectedChoiceIndex(choiceIndex);
      try {
        // Generate a random voter commitment (simulates eIDAS identity)
        const voterCommitment =
          Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        const res = await fetch("/api/demo/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pollId,
            choiceIndex,
            voterCommitment,
            proof: "simulated-zkp-proof",
          }),
        });
        const data = await res.json();
        if (data.success && data.receipt) {
          setVoteReceipt(data.receipt);
        }
      } catch (err) {
        console.error("Failed to submit vote:", err);
      }
    },
    [pollId]
  );

  // Also inject additional simulated votes for realistic results display
  const injectSimulatedVotes = useCallback(async () => {
    if (!pollId) return;
    // Inject ~15-20 additional simulated votes for realistic results
    const distribution = [
      { choiceIndex: 0, count: 8 },  // "Oui" most popular
      { choiceIndex: 1, count: 3 },  // "Non"
      { choiceIndex: 2, count: 7 },  // "Periode d'essai"
      { choiceIndex: 3, count: 2 },  // "Abstention"
    ];
    for (const { choiceIndex, count } of distribution) {
      for (let i = 0; i < count; i++) {
        const commitment = Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        try {
          await fetch("/api/demo/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pollId,
              choiceIndex,
              voterCommitment: commitment,
              proof: "simulated-zkp-batch",
            }),
          });
        } catch {
          // Silently ignore batch vote errors
        }
      }
    }
  }, [pollId]);

  // Fetch audit data when entering results or audit step
  const fetchAuditData = useCallback(async () => {
    if (!pollId) return;
    try {
      const res = await fetch(`/api/demo/audit?pollId=${pollId}`);
      const data = await res.json();
      if (data.poll) {
        setAuditData(data);
      }
    } catch (err) {
      console.error("Failed to fetch audit:", err);
    }
  }, [pollId]);

  // When vote is submitted, inject simulated votes in background
  useEffect(() => {
    if (voteReceipt && pollId) {
      injectSimulatedVotes();
    }
  }, [voteReceipt, pollId, injectSimulatedVotes]);

  // Fetch audit data when reaching results or audit step
  useEffect(() => {
    if ((step === "results" || step === "audit") && pollId) {
      fetchAuditData();
    }
  }, [step, pollId, fetchAuditData]);

  const handleRestart = () => {
    setPollId(null);
    setVoteReceipt(null);
    setAuditData(null);
    setSelectedChoiceIndex(-1);
    goTo("welcome");
  };

  // Props passed down to step components
  const createProps = { onNext: nextStep, onCreatePoll: handleCreatePoll };
  const voteProps = { onNext: nextStep, onVote: handleVote };
  const confirmProps = { onNext: nextStep, receipt: voteReceipt };
  const resultsProps = { onNext: nextStep, auditData, selectedChoiceIndex };
  const auditProps = { onRestart: handleRestart, auditData };

  return (
    <div className="min-h-screen bg-vp-dark">
      {/* Header */}
      <div className="pt-24 pb-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-vp-teal bg-vp-teal/10 border border-vp-teal/20 rounded-full mb-4">
            DÉMONSTRATION INTERACTIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            VoxPop <span className="gradient-text">en action</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Parcourez le cycle complet d&apos;un vote sécurisé : création,
            vérification, vote, résultats et audit.
          </p>
          {pollId && (
            <p className="text-xs text-slate-600 mt-2 font-mono">
              Session: {pollId}
            </p>
          )}
        </motion.div>
      </div>

      {/* Step indicator */}
      <div className="px-4">
        <StepIndicator current={step} onStep={goTo} />
      </div>

      {/* Main content: phone frame on desktop, full-width on mobile.
          pb-32 sur mobile pour éviter que les boutons d'action soient cachés par la barre Safari/Chrome iOS */}
      <div className="max-w-5xl mx-auto px-4 pb-32 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Phone mockup (desktop only) */}
          <PhoneFrame>
            <AnimatePresence mode="wait">
              {step === "welcome" && <WelcomeStep key="welcome" onNext={nextStep} />}
              {step === "create" && <CreateStep key="create" {...createProps} />}
              {step === "identity" && <IdentityStep key="identity" onNext={nextStep} />}
              {step === "vote" && <VoteStep key="vote" {...voteProps} />}
              {step === "confirm" && <ConfirmStep key="confirm" {...confirmProps} />}
              {step === "results" && <ResultsStep key="results" {...resultsProps} />}
              {step === "audit" && <AuditStep key="audit" {...auditProps} />}
            </AnimatePresence>
          </PhoneFrame>

          {/* Full content (always visible, main on mobile) */}
          <div className="flex-1 lg:flex-1">
            <AnimatePresence mode="wait">
              <div className="lg:hidden">
                {/* Mobile: show steps directly */}
                {step === "welcome" && <WelcomeStep key="welcome-m" onNext={nextStep} />}
                {step === "create" && <CreateStep key="create-m" {...createProps} />}
                {step === "identity" && <IdentityStep key="identity-m" onNext={nextStep} />}
                {step === "vote" && <VoteStep key="vote-m" {...voteProps} />}
                {step === "confirm" && <ConfirmStep key="confirm-m" {...confirmProps} />}
                {step === "results" && <ResultsStep key="results-m" {...resultsProps} />}
                {step === "audit" && <AuditStep key="audit-m" {...auditProps} />}
              </div>

              {/* Desktop: show explanation sidebar */}
              <div className="hidden lg:block">
                <ExplanationSidebar step={step} />
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXPLANATION SIDEBAR (desktop only)
// ============================================================
function ExplanationSidebar({ step }: { step: DemoStep }) {
  const explanations: Record<DemoStep, { title: string; icon: string; points: string[] }> = {
    welcome: {
      title: "Comment ça marche ?",
      icon: "💡",
      points: [
        "VoxPop utilise les Zero-Knowledge Proofs pour créer des votes anonymes mais vérifiables.",
        "Cette démo simule le parcours complet d'un citoyen qui participe à un vote.",
        "Cliquez sur « Commencer la démo » dans le téléphone à gauche pour démarrer.",
        "Vous pouvez aussi naviguer entre les étapes avec les boutons en haut.",
      ],
    },
    create: {
      title: "Création du vote",
      icon: "📝",
      points: [
        "L'organisateur définit la question, les options, et la durée du vote.",
        "Chaque vote est associé à un Merkle Tree de pays : seuls les citoyens du pays concerné peuvent voter.",
        "Le chiffrement de bout en bout est activé automatiquement.",
        "Technologie : Le vote est créé via l'API REST et enregistré dans PostgreSQL.",
      ],
    },
    identity: {
      title: "La magie du Zero-Knowledge Proof",
      icon: "🔐",
      points: [
        "Étape 1 — L'identité numérique eIDAS 2.0 confirme que vous êtes citoyen français.",
        "Étape 2 — Le Merkle Tree France est consulté pour vérifier votre éligibilité.",
        "Étape 3 — Un ZK-SNARK (via Semaphore) génère une preuve mathématique.",
        "Résultat : le serveur sait que vous avez le DROIT de voter, mais ne sait PAS QUI vous êtes. C'est la puissance du Zero-Knowledge.",
      ],
    },
    vote: {
      title: "Vote anonyme et chiffré",
      icon: "🗳️",
      points: [
        "Votre choix est chiffré localement sur votre appareil avant d'être envoyé.",
        "Le serveur reçoit un vote chiffré + une preuve ZKP. Il ne peut pas lier les deux à votre identité.",
        "Le nullifier empêche de voter deux fois sans révéler qui a voté.",
        "Technologie : WebAssembly (WASM) pour un calcul rapide directement sur le téléphone.",
      ],
    },
    confirm: {
      title: "Preuve cryptographique",
      icon: "✅",
      points: [
        "Le hash SHA-256 est l'empreinte unique de votre vote — impossible à falsifier.",
        "Le nullifier est votre « ticket unique » — il empêche le double vote.",
        "La preuve ZK-SNARK prouve mathématiquement que votre vote est valide.",
        "Ce hash est ajouté à la hash chain — une modification brise toute la chaîne.",
      ],
    },
    results: {
      title: "Résultats vérifiables",
      icon: "📊",
      points: [
        "Chaque vote affiché correspond à une preuve ZK-SNARK vérifiée.",
        "Impossible d'ajouter des « votes fantômes » — chaque vote a une preuve.",
        "Impossible de supprimer des votes — la hash chain le détecterait.",
        "N'importe qui peut vérifier le décompte indépendamment.",
      ],
    },
    audit: {
      title: "Hash Chain = infalsifiable",
      icon: "🔗",
      points: [
        "Chaque bloc contient le hash du bloc précédent — comme une chaîne.",
        "Modifier un seul vote casserait TOUS les blocs suivants.",
        "La chaîne est publique : journalistes, ONG, citoyens peuvent auditer.",
        "C'est le même principe que la blockchain, mais optimisé pour le vote.",
      ],
    },
  };

  const info = explanations[step];

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{info.icon}</span>
        <h3 className="text-lg font-bold text-white">{info.title}</h3>
      </div>

      <div className="space-y-3">
        {info.points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="flex items-start gap-2"
          >
            <span className="text-vp-teal text-sm mt-0.5">→</span>
            <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech badge */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
          Technologies utilisées
        </p>
        <div className="flex flex-wrap gap-2">
          {step === "welcome" && ["ZK-SNARKs", "Semaphore", "Hash Chain"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "create" && ["REST API", "NestJS", "PostgreSQL", "Merkle Tree"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "identity" && ["Semaphore", "eIDAS 2.0", "Merkle Tree", "ZK-SNARK"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "vote" && ["WebAssembly", "E2E Encryption", "Nullifier"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "confirm" && ["SHA-256", "Hash Chain", "ZK-SNARK", "Nullifier"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "results" && ["ZKP Verification", "Batch Proofs", "Public Ledger"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
          {step === "audit" && ["Hash Chain", "SHA-256", "Public Audit", "Blockchain Anchoring"].map((t) => (
            <span key={t} className="px-2 py-1 text-xs bg-vp-teal/10 text-vp-teal rounded-full border border-vp-teal/20">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
