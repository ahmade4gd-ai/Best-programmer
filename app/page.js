"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Code, Map, Cpu, Zap, Target, Lock, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center overflow-hidden px-4 font-mono">
      {/* Matrix-like Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-black pointer-events-none" />
      
      {/* Animated Scanline */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ y: ['-100%', '100%'] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#06b6d4]"
        />
      </div>

      <div className="relative z-20 text-center space-y-8 max-w-6xl w-full">
        {/* Top Status Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-4 text-[10px] md:text-xs tracking-[0.4em] text-cyan-500 font-black uppercase"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
          Neural Link: Established
          <span className="text-slate-700">|</span>
          Protocol: V2.0.4
          <span className="text-slate-700">|</span>
          Region: Jordan_Iraq_Node
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="relative text-7xl md:text-9xl font-black tracking-tighter italic">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              CYBER
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-600 to-blue-600 drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
              QUEST
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
             منصة الاختراق التعليمي الأولى. سيطر على <span className="text-cyan-400 font-bold">الشيفرة</span>، 
             تجاوز <span className="text-red-500 font-bold">جدران الحماية</span>، 
             واستعد <span className="text-emerald-400 font-bold">التراث الرقمي</span>.
          </p>
        </motion.div>

        {/* Path Selectors (New Pro Feature) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
          <Link href="/game">
            <motion.div 
              whileHover={{ scale: 1.02, x: -5 }}
              className="group relative p-8 bg-black/40 border-l-4 border-cyan-500 rounded-r-xl backdrop-blur-xl cursor-pointer overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-cyan-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col items-start text-right">
                <div className="flex items-center gap-2 text-cyan-400 mb-2 font-black italic">
                  <Code size={20} /> [PATH_01]
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-wider">LEARN_CODE_V2</h3>
                <p className="text-xs text-slate-500 leading-5">500 عقدة برمجية. تعلم JavaScript, Python و C++ في قلب البتراء وبابل.</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-cyan-500 font-bold uppercase">
                  Initialize Mission <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/game">
            <motion.div 
              whileHover={{ scale: 1.02, x: 5 }}
              className="group relative p-8 bg-black/40 border-l-4 border-red-500 rounded-r-xl backdrop-blur-xl cursor-pointer overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-red-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col items-start text-right">
                <div className="flex items-center gap-2 text-red-500 mb-2 font-black italic">
                  <Shield size={20} /> [PATH_02]
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-wider">BREAKER_MODULE</h3>
                <p className="text-xs text-slate-500 leading-5">250 مستوى كسر حماية. دمر بروتوكولات الأمان واستخرج المفاتيح المشفرة.</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase">
                  Bypass Security <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Real-time Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/5">
          <StatBox label="Active Agents" value="12,840" icon={<Zap className="text-yellow-400" size={14} />} />
          <StatBox label="Total Breaches" value="450k+" icon={<Lock className="text-red-500" size={14} />} />
          <StatBox label="Uptime" value="99.9%" icon={<Cpu className="text-emerald-500" size={14} />} />
          <StatBox label="Regions" value="JORDAN/IRAQ" icon={<Map className="text-cyan-500" size={14} />} />
        </div>
      </div>

      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </main>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</span>
      </div>
      <div className="text-xl font-black text-white tracking-tighter">{value}</div>
    </div>
  );
    }
    
