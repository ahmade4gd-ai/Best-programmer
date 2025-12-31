"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Code, Map, Cpu } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* Hero Section */}
      <div className="relative z-10 text-center space-y-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-cyber-blue font-mono tracking-[0.5em] text-sm md:text-base mb-4 uppercase">
            System Initialization: Active
          </h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-gold">
            CYBER QUEST
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            اكسر حواجز الأمان، تعلم البرمجة، واستكشف كنوز <span className="text-cyber-green underline decoration-cyber-green/30">الأردن</span> و <span className="text-cyber-gold underline decoration-cyber-gold/30">العراق</span> في بيئة تفاعلية ثورية.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
        >
          <Link href="/game">
            <button className="group relative px-12 py-4 bg-cyber-blue text-black font-black text-xl rounded-sm skew-x-[-10deg] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]">
              <span className="inline-block skew-x-[10deg]">ابدأ المهمة الآن</span>
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="px-12 py-4 border border-cyber-green/50 text-cyber-green font-bold text-xl rounded-sm skew-x-[-10deg] hover:bg-cyber-green/10 transition-all">
              <span className="inline-block skew-x-[10deg]">لوحة الصدارة</span>
            </button>
          </Link>
        </motion.div>

        {/* Stats/Features Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          <FeatureCard icon={<Code size={24}/>} title="200+" sub="تحدي برمي" color="text-cyber-blue" />
          <FeatureCard icon={<Shield size={24}/>} title="8" sub="لغات برمجة" color="text-cyber-red" />
          <FeatureCard icon={<Map size={24}/>} title="20" sub="موقع تراثي" color="text-cyber-green" />
          <FeatureCard icon={<Cpu size={24}/>} title="Real-time" sub="بيئة اختبار" color="text-cyber-gold" />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-green/10 rounded-full blur-[120px] animate-pulse-slow" />
    </main>
  );
}

function FeatureCard({ icon, title, sub, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl text-center"
    >
      <div className={`${color} flex justify-center mb-3`}>{icon}</div>
      <div className="text-2xl font-black text-white">{title}</div>
      <div className="text-xs text-slate-500 uppercase tracking-widest">{sub}</div>
    </motion.div>
  );
            }
          
