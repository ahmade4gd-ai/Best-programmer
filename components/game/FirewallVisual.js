"use client";
import { motion } from 'framer-motion';

export default function FirewallVisual({ currentLevel }) {
  return (
    <div className="absolute top-4 right-4 flex gap-1 items-end h-12 pointer-events-none">
      {Array.from({ length: 200 }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            height: i + 1 <= currentLevel ? "100%" : "20%",
            backgroundColor: i + 1 <= currentLevel ? "#06b6d4" : "#1e293b",
            opacity: i + 1 === currentLevel ? [0.4, 1, 0.4] : 1
          }}
          transition={{ duration: 0.5, repeat: i + 1 === currentLevel ? Infinity : 0 }}
          className="w-[2px] rounded-full shadow-[0_0_8px_rgba(6,182,212,0.3)]"
        />
      ))}
    </div>
  );
}
