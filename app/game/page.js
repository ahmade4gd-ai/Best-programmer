"use client";
import { useState, useEffect } from 'react';
import { useGameStore } from '../../../context/GameContext';
import CHALLENGES from '../../../data/challenges/javascript.json';
import { runValidation } from '../../utils/codeRunner';
import { calculateFinalScore } from '../../utils/scoringEngine';
import dynamic from 'next/dynamic';
import Sidebar from '../../components/game/Sidebar';
import Terminal from '../../components/game/Terminal';



const MonacoEditor = dynamic(() => import('@/components/game/MonacoEditor'), { ssr: false });

export default function GameEngine() {
  const { currentLevel, unlockLevel, totalPoints } = useGameStore();
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [isProcessing, setIsProcessing] = useState(false);
  
  const activeChallenge = CHALLENGES.find(c => c.id === currentLevel) || CHALLENGES[0];

  useEffect(() => {
    setCode(activeChallenge.template);
    setStartTime(Date.now());
  }, [currentLevel]);

  const handleExecute = async () => {
    setIsProcessing(true);
    

    await new Promise(r => setTimeout(r, 1500));
    
    const result = runValidation(code, activeChallenge.solutionSnippet, activeChallenge.language);
    
    if (result.success) {
      const { finalScore } = calculateFinalScore(activeChallenge.points, startTime, 1.5);
      unlockLevel(activeChallenge.id, finalScore);
      alert(`ACCESS GRANTED: +${finalScore} XP`);
    } else {
      alert(`CRITICAL ERROR: ${result.error}`);
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="flex h-full w-full">
      
      <Sidebar currentLevel={currentLevel} />

  
      <main className="flex-1 flex flex-col relative border-x border-cyan-900/30">
  
        <header className="h-20 bg-slate-950/80 border-b border-cyan-900/30 flex items-center justify-between px-6 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-black text-white tracking-widest uppercase">
              {activeChallenge.title}
            </h1>
            <p className="text-xs text-cyan-600">Location: {activeChallenge.site}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase">System Integrity</div>
            <div className="text-xl font-mono text-emerald-400 font-bold">{totalPoints.toLocaleString()} XP</div>
          </div>
        </header>

        <div className="flex-1 relative group">
          <MonacoEditor 
            language={activeChallenge.language} 
            value={code} 
            onChange={setCode} 
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
              <div className="text-2xl animate-pulse text-cyan-400 font-black">ANALYZING FIREWALL VULNERABILITIES...</div>
            </div>
          )}
        </div>

        
        <footer className="h-24 bg-slate-950 border-t border-cyan-900/30 flex items-center justify-between px-10">
          <div className="flex gap-8">
            <Stat label="Language" value={activeChallenge.language.toUpperCase()} color="text-yellow-500" />
            <Stat label="Difficulty" value={activeChallenge.difficulty} color="text-red-500" />
            <Stat label="Firewall" value={activeChallenge.firewallType} color="text-cyan-500" />
          </div>
          
          <button 
            onClick={handleExecute}
            disabled={isProcessing}
            className="relative overflow-hidden px-16 py-4 bg-transparent border border-cyan-500 text-cyan-400 font-black uppercase tracking-[0.2em] transition-all hover:bg-cyan-500 hover:text-black shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 disabled:opacity-50"
          >
            Execute Infiltration
          </button>
        </footer>
      </main>

      
      <Terminal activeChallenge={activeChallenge} />
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
    }
    
