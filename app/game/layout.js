"use client";
import { useGameStore } from '@/context/GameStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameLayout({ children }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#010208] text-cyan-500 font-mono relative">
      {/* HUD Overlay -   /}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-cyan-500/5 z-50 shadow-[inset_0_0_100px_rgba(6,182,212,0.1)]" />
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 w-full h-[2px] bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-50 animate-scan pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
    }
    
