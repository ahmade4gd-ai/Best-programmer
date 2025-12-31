"use client";
import { motion } from 'framer-motion';

export default function CyberButton({ children, onClick, variant = "primary", className = "" }) {
  const variants = {
    primary: "border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-500 hover:text-black",
    danger: "border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red-500 hover:text-white",
    success: "border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:text-black"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-8 py-3 bg-transparent border-2 font-black uppercase tracking-widest transition-all duration-300 overflow-hidden group ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700" />
    </motion.button>
  );
}
