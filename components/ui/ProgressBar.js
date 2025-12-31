"use client";
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total = 200, label = "Security Bypass Progress" }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">{label}</span>
        <span className="text-xl font-mono font-black text-cyan-400">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-3 w-full bg-slate-900 border border-cyan-900/50 rounded-full p-[2px] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]"
        />
      </div>
      <div className="flex justify-between text-[8px] text-slate-600 font-mono">
        <span>LVL_001</span>
        <span>LVL_{total}</span>
      </div>
    </div>
  );
            }
