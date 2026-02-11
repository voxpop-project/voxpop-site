"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  gold?: boolean;
  center?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  gradient = true,
  gold = false,
  center = true,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
          gradient
            ? gold
              ? "gradient-text-gold"
              : "gradient-text"
            : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
