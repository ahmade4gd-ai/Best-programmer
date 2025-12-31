"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../../context/GameContext';
import CHALLENGES_DATA from '../../../data/challenges/javascript.json';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Timer, Lock, AlertTriangle, Cpu, ChevronLeft } from 'lucide-react';

export default function ExamPage({ params }) {
  const router = useRouter();
  const { unlockLevel } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const challenges = useMemo(() => 
    Array.isArray(CHALLENGES_DATA) ? CHALLENGES_DATA : (CHALLENGES_DATA.challenges || []),
  []);
  
  const challenge = challenges.find(c => c.id === parseInt(params.levelId)) || challenges[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    if (timeLeft === 0) handleFail();
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleFail = () => {
    setIsSubmitting(true);
    setTimeout(() => router.push('/game?status=failed'), 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const correctAnswer = challenge.correctAnswerIndex ?? 0;
    
    if (selectedAnswer === correctAnswer) {
      unlockLevel(challenge.id, 2000); 
      setTimeout(() => router.push('/game?status=certified'), 1000);
    } else {
      handleFail();
    }
  };

  const options = challenge.examOptions || [
    "استخدام Prepared Statements لمنع الحقن",
    "تشفير قاعدة البيانات بالكامل يدوياً",
    "تغيير اسم مدير النظام في قاعدة البيانات",
    "إيقاف تشغيل خادم SQL مؤقتاً"
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Red Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ef444410_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black backdrop-blur-md flex flex-col items-center justify-center border-4 border-red-500/50"
          >
            <ShieldAlert size={80} className="text-red-500 animate-bounce mb-4" />
            <h2 className="text-4xl font-black tracking-[0.5em] text-red-500 uppercase">Analyzing Integrity...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-slate-950/80 border border-red-500/30 backdrop-blur-2xl shadow-[0_0_100px_rgba(239,68,68,0.1)] relative z-10"
      >
        {/* Top Header Bar */}
        <div className="bg-red-600 p-2 flex justify-between items-center overflow-hidden">
          <div className="flex gap-4 items-center">
             <AlertTriangle size={16} className="text-black animate-pulse" />
             <span className="text-black font-black text-[10px] uppercase tracking-widest">Security Certification in Progress</span>
          </div>
          <div className="text-black font-black text-[10px]">AUTH_MODE: STRICT</div>
        </div>

        <div className="p-10 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-red-500/20 pb-6">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                <Lock className="text-red-500" /> Layer_{params.levelId}_Exam
              </h1>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-[0.2em]">Target Site: {challenge.site}</p>
            </div>
            <div className={`text-5xl font-mono font-black ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-red-500/5 border-l-4 border-red-500 p-8 relative group">
            <Cpu className="absolute top-4 right-4 text-red-500/20 group-hover:rotate-180 transition-transform duration-700" size={40} />
            <p className="text-xl leading-relaxed text-slate-200 text-right font-bold italic">
              {challenge.examQuestion || "كيف يمكنك تأمين ثغرة SQL Injection في قاعدة بيانات الموقع التراثي الحالي؟"}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ x: -10, backgroundColor: 'rgba(239,68,68,0.1)' }}
                onClick={() => setSelectedAnswer(idx)}
                className={`group p-5 text-right transition-all border flex items-center justify-between ${
                  selectedAnswer === idx 
                  ? 'border-red-500 bg-red-500/20 text-white' 
                  : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-red-500/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {selectedAnswer === idx ? <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]" /> : <div className="w-2 h-2 bg-slate-800 rounded-full" />}
                  <span className="text-sm font-bold tracking-tight">{opt}</span>
                </div>
                <span className="text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">0x0{idx + 1}</span>
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => router.back()}
              className="px-8 py-4 border border-slate-800 text-slate-500 hover:text-white hover:border-white transition-all text-xs font-black flex items-center gap-2"
            >
              <ChevronLeft size={16} /> ABORT_MISSION
            </button>
            <button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitting}
              className="flex-1 py-4 bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:grayscale text-white font-black uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(239,68,68,0.2)] active:scale-[0.98]"
            >
              Confirm Security Authorization
            </button>
          </div>
        </div>

        {/* System Footer Info */}
        <div className="p-4 bg-black/40 border-t border-red-500/20 flex justify-between text-[8px] text-slate-600 font-bold tracking-[0.2em] uppercase">
          <span>Integrity_Level: Maximum</span>
          <span>Encryption: AES-256_RSA</span>
          <span>Session: {Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
        </div>
      </motion.div>
    </div>
  );
    }
    
