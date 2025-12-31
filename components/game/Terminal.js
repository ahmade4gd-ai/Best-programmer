"use client";
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Target, Database, Cpu } from 'lucide-react';

export default function Terminal({ activeChallenge }) {
  return (
    <div className="w-80 h-full bg-[#020617] border-l border-cyan-500/20 flex flex-col font-mono relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
      
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/20 bg-black/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-cyan-500 animate-pulse" />
          <span className="text-cyan-500 text-[10px] font-black tracking-[0.2em] uppercase italic">Ops_Center_v4</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />
          <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative z-10">
        {/* Visual Intel Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1">
              <Target size={10} /> Visual_Intel
            </span>
            <span className="text-[8px] text-cyan-500/50 font-mono">ID: {activeChallenge.id * 142}</span>
          </div>
          <div className="relative h-44 rounded-sm border border-cyan-500/30 overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            <motion.img 
              initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
              animate={{ scale: 1, filter: 'grayscale(80%)' }}
              whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
              transition={{ duration: 0.8 }}
              src={activeChallenge.image} 
              className="w-full h-full object-cover" 
              alt="Jordan Site"
            />
            {/* HUD Overlay on Image */}
            <div className="absolute inset-0 border-[15px] border-transparent group-hover:border-cyan-500/10 transition-all pointer-events-none" />
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <div className="h-1 w-4 bg-cyan-500" />
              <div className="h-4 w-1 bg-cyan-500 self-end" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-3">
              <div className="text-[10px] text-white font-black uppercase tracking-widest drop-shadow-md">
                {activeChallenge.site}
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Description */}
        <div className="bg-cyan-500/5 border border-cyan-500/10 p-3 rounded-sm space-y-3 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Database size={60} className="text-cyan-500" />
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Breach_Parameters</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-[1.8] font-medium italic border-l-2 border-cyan-800 pl-3">
             {activeChallenge.description}
          </p>
        </div>

        {/* Real-time System Logs */}
        <div className="space-y-2">
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1">
            <Cpu size={10} /> System_Logs
          </span>
          <div className="text-[9px] font-mono space-y-1 bg-black/40 p-2 rounded border border-white/5">
            <p className="text-emerald-500/80">{"[LOG]"} Initializing kernel_hook...</p>
            <p className="text-cyan-500/80">{"[LOG]"} Target_Auth: PETRA_SEC_V3</p>
            <motion.p 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-yellow-500/80"
            >
              {"[WARN]"} Firewall_Pulse_Detected
            </motion.p>
            <p className="text-slate-600">{"[LOG]"} Latency: 1.02ms</p>
          </div>
        </div>
      </div>

      {/* Advanced Metrics Footer */}
      <div className="p-5 bg-black/80 border-t border-cyan-500/20 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
              <span>CPU Load</span>
              <span className="text-cyan-400">42%</span>
            </div>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '42%' }}
                className="h-full bg-cyan-500" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
              <span>Security</span>
              <span className="text-red-500">LOW</span>
            </div>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '15%' }}
                className="h-full bg-red-500 shadow-[0_0_5px_red]" 
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-500 font-black uppercase">Encryption_Progress</span>
              <span className="text-xs text-white font-black italic">PORT_SCAN_ACTIVE</span>
            </div>
            <div className="w-10 h-10 border-2 border-cyan-500/20 rounded-full flex items-center justify-center relative">
               <span className="text-[9px] font-black text-cyan-400">88%</span>
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="20" cy="20" r="18" fill="transparent" stroke="#06b6d4" strokeWidth="2" strokeDasharray="113" strokeDashoffset="13" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    }
    
