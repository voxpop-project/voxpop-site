"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function CTAButton({
  href,
  children,
  className = "",
  large = false,
  variant = "primary",
}: CTAButtonProps) {
  const base = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 ${
    large ? "px-10 py-4 text-lg" : "px-7 py-3 text-sm"
  }`;

  const variants = {
    primary:
      "bg-gradient-to-r from-vp-teal to-vp-blue text-white shadow-lg shadow-vp-teal/25 hover:shadow-xl hover:shadow-vp-teal/40",
    secondary:
      "bg-gradient-to-r from-vp-gold to-vp-teal text-vp-dark font-bold shadow-lg shadow-vp-gold/25 hover:shadow-xl hover:shadow-vp-gold/40",
    outline:
      "border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
