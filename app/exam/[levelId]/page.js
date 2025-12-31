"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../../context/GameContext';
import CHALLENGES from '../../../data/challenges/javascript.json';

import { useRouter } from 'next/navigation';

export default function ExamPage({ params }) {
  const router = useRouter();
  const { totalPoints, unlockLevel } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const challenge = CHALLENGES.find(c => c.id === parseInt(params.levelId));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timeLeft === 0) handleFail();
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleFail = () => {
    alert("SYSTEM BREACH DETECTED: EXAM FAILED");
    router.push('/game');
  };

  const handleSubmit = () => {
    if (selectedAnswer === challenge.correctAnswerIndex) {
      unlockLevel(challenge.id, 2000); // نقاط مضاعفة للامتحان
      router.push('/game?status=certified');
    } else {
      handleFail();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-slate-900 border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)] p-8 rounded-none relative"
      >
        <div className="absolute top-0 right-0 bg-red-500 text-black px-4 py-1 font-black underline">
          CRITICAL CERTIFICATION EXAM
        </div>

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter">LEVEL {params.levelId} CERTIFICATION</h1>
          <div className="text-4xl font-mono text-red-500 font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</div>
        </div>

        <div className="bg-black/50 p-6 border border-slate-700 mb-8">
          <p className="text-xl leading-relaxed text-slate-300">
            {challenge.examQuestion || "كيف يمكنك تأمين ثغرة SQL Injection في قاعدة بيانات الموقع التراثي الحالي؟"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {["استخدام Prepared Statements", "تشفير قاعدة البيانات بالكامل", "حذف الكلمات المفتاحية يدوياً", "إغلاق المنفذ 80"].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              className={`p-4 text-right transition-all border ${selectedAnswer === idx ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 hover:border-slate-500'}`}
            >
              {idx + 1}. {opt}
            </button>
          ))}
        </div>

        <button 
          onClick={handleSubmit}
          className="mt-10 w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest transition-colors"
        >
          Submit Final Response
        </button>
      </motion.div>
    </div>
  );
        }
                 
