"use client";
import { useGameStore } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { Lock, Unlock, CheckCircle, Zap, Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';

export default function Sidebar({ currentLevel }) {
  const { completedLevels, totalPoints } = useGameStore();

  const categories = [
    { 
      id: 'learn', 
      title: 'LEARN_CODE_V2', 
      range: [1, 500], 
      icon: <TerminalIcon size={16} />, 
      color: 'cyan',
      description: 'PRO PROGRAMMING PATH'
    },
    { 
      id: 'break', 
      title: 'BREAKER_MODULE', 
      range: [501, 750], 
      icon: <ShieldAlert size={16} />, 
      color: 'red',
      description: 'FIREWALL DESTRUCTION'
    }
  ];

  return (
    <aside className="w-80 h-full bg-[#020617] border-r border-cyan-500/20 flex flex-col relative overflow-hidden font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#06b6d4_0%,transparent_70%)]" />
      
      {/* Header Profile Section */}
      <div className="p-6 border-b border-cyan-500/20 bg-black/40 relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10">
              <Zap className="text-cyan-400 fill-cyan-400" size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <h2 className="text-white font-black text-sm tracking-widest uppercase">Agent_Root</h2>
            <div className="text-[9px] text-cyan-500 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1">
              RANK: ELITE HACKER
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
            <span>System Synchronization</span>
            <span className="text-cyan-400">{(completedLevels.length / 750 * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(completedLevels.length / 750 * 100)}%` }}
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_#06b6d4]"
            />
          </div>
        </div>
      </div>

      {/* Categories / Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
        {categories.map((cat) => (
          <div key={cat.id} className="mb-6">
            <div className="px-6 py-4 sticky top-0 bg-[#020617]/90 backdrop-blur-md z-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-${cat.color}-500 shadow-${cat.color}-500/50 drop-shadow-md`}>{cat.icon}</span>
                <div>
                  <h3 className={`text-xs font-black text-white tracking-widest`}>{cat.title}</h3>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">{cat.description}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">[{cat.range[0]}-{cat.range[1]}]</span>
            </div>

            <div className="p-4 space-y-1.5">
              {Array.from({ length: cat.range[1] - cat.range[0] + 1 }, (_, i) => {
                const levelId = cat.range[0] + i;
                const isLocked = levelId > currentLevel;
                const isCompleted = completedLevels.includes(levelId);
                const isActive = levelId === currentLevel;

                return (
                  <motion.div 
                    key={levelId}
                    whileHover={!isLocked ? { x: 5, backgroundColor: 'rgba(6,182,212,0.05)' } : {}}
                    className={`group relative p-3 rounded-sm border cursor-pointer transition-all duration-200 ${
                      isActive 
                      ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                      : 'bg-[#0a0f1e] border-white/5 hover:border-cyan-500/30'
                    } ${isLocked ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-y-0 left-0 w-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]" 
                      />
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-[9px] font-mono ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                          {levelId.toString().padStart(3, '0')}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {cat.id === 'learn' ? `Syntax_Node_${levelId}` : `Firewall_Gate_${levelId}`}
                          </span>
                          <span className="text-[7px] text-slate-600 uppercase">Latency: 2ms | Port: {8000 + levelId}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <div className="bg-emerald-500/20 p-1 rounded border border-emerald-500/30">
                            <CheckCircle size={10} className="text-emerald-500" />
                          </div>
                        ) : isLocked ? (
                          <Lock size={10} className="text-slate-700" />
                        ) : (
                          <div className="relative">
                            <Unlock size={10} className="text-cyan-400 animate-pulse" />
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="p-4 bg-black/60 border-t border-cyan-500/20 font-mono">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Network Status</span>
          <span className="text-[8px] text-emerald-500 font-bold uppercase animate-pulse">Encrypted</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-black uppercase tracking-tighter">
          <div className="bg-cyan-500/5 border border-cyan-500/20 py-1.5 text-cyan-400">
            {completedLevels.length} COMPLETED
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 py-1.5 text-purple-400">
             750 TOTAL
          </div>
        </div>
      </div>
    </aside>
  );
        }
        
