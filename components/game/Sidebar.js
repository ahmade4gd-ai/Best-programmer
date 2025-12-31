"use client";
import { useGameStore } from '../../context/GameContext';


import { Lock, Unlock, CheckCircle } from 'lucide-react';

export default function Sidebar({ currentLevel }) {
  const { completedLevels } = useGameStore();

  return (
    <aside className="w-72 h-full bg-slate-950 border-r border-cyan-900/30 flex flex-col">
      <div className="p-6 border-b border-cyan-900/30">
        <h2 className="text-cyan-500 font-black tracking-tighter text-xl">FIREWALL_NODES</h2>
        <p className="text-[10px] text-slate-500 uppercase">Total Nodes: 200 Active</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
        {Array.from({ length: 200 }, (_, i) => {
          const levelId = i + 1;
          const isLocked = levelId > currentLevel;
          const isCompleted = completedLevels.includes(levelId);

          return (
            <div 
              key={levelId}
              className={`p-3 rounded flex items-center justify-between border transition-all ${
                levelId === currentLevel 
                ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-900/50 border-slate-800'
              } ${isLocked ? 'opacity-40 grayscale' : 'opacity-100'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500">#{levelId.toString().padStart(3, '0')}</span>
                <span className={`text-xs font-bold ${levelId === currentLevel ? 'text-white' : 'text-slate-400'}`}>
                   Node_Layer_{levelId}
                </span>
              </div>
              {isCompleted ? <CheckCircle size={14} className="text-emerald-500" /> : 
               isLocked ? <Lock size={14} className="text-slate-600" /> : 
               <Unlock size={14} className="text-cyan-400 animate-pulse" />}
            </div>
          );
        })}
      </div>
    </aside>
  );
    }
          
