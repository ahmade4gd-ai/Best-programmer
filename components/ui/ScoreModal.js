"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, MapPin } from 'lucide-react';
import CyberButton from './CyberButton';

export default function ScoreModal({ isOpen, score, siteName, onNext }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative max-w-md w-full bg-slate-900 border-2 border-cyan-500 p-8 shadow-[0_0_100px_rgba(6,182,212,0.2)]"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyan-500 p-4 rounded-full shadow-[0_0_30px_#06b6d4]">
            <Trophy className="text-black" size={32} />
          </div>

          <div className="text-center mt-6 space-y-6">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Access Granted</h2>
            
            <div className="py-4 border-y border-slate-800">
              <div className="text-5xl font-mono text-cyan-400 font-black animate-pulse">+{score} XP</div>
              <div className="text-xs text-slate-500 mt-2 uppercase tracking-widest">Points Encrypted to Profile</div>
            </div>

            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <MapPin size={18} />
              <span className="font-bold">موقع جديد مكتشف: {siteName}</span>
            </div>

            <p className="text-slate-400 text-sm italic leading-relaxed">
              لقد نجحت في كسر التشفير وتأمين البيانات التاريخية في هذا القطاع. استعد للمستوى التالي.
            </p>

            <CyberButton onClick={onNext} className="w-full mt-4 flex items-center justify-center gap-3">
              الانتقال للجدار التالي <ArrowRight size={20} />
            </CyberButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
            }
            
