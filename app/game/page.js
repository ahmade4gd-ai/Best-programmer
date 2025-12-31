"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../context/GameContext';
import CHALLENGES_DATA from '../../data/challenges/javascript.json';
import { runValidation } from '../../utils/codeRunner';
import { calculateFinalScore } from '../../utils/scoringEngine';
import dynamic from 'next/dynamic';
import Sidebar from '../../components/game/Sidebar';
import Terminal from '../../components/game/Terminal';

const MonacoEditor = dynamic(() => import('../../components/game/MonacoEditor'), { ssr: false });

export default function GameEngine() {
  const { currentLevel, unlockLevel, totalPoints } = useGameStore();
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [isProcessing, setIsProcessing] = useState(false);
  const [botMessage, setBotMessage] = useState("Waiting for command...");
  const [glitchTrigger, setGlitchTrigger] = useState(false);

  const challenges = useMemo(() => 
    Array.isArray(CHALLENGES_DATA) ? CHALLENGES_DATA : (CHALLENGES_DATA.challenges || []),
  []);
  
  const activeChallenge = challenges.find(c => c.id === currentLevel) || challenges[0];

  useEffect(() => {
    if (activeChallenge) {
      setCode(activeChallenge.template);
      setStartTime(Date.now());
      setBotMessage(`Analyzing Target: ${activeChallenge.site}...`);
    }
  }, [currentLevel, activeChallenge]);

  const handleExecute = async () => {
    setIsProcessing(true);
    setBotMessage("Injecting Payload...");
    setGlitchTrigger(true);
    
    await new Promise(r => setTimeout(r, 2000));
    
    const result = runValidation(code, activeChallenge.solutionSnippet, activeChallenge.language);
    
    if (result.success) {
      const { finalScore } = calculateFinalScore(activeChallenge.points, startTime, 1.5);
      unlockLevel(activeChallenge.id, finalScore);
      setBotMessage("SUCCESS! Firewall Decrypted.");
    } else {
      setBotMessage(`CRITICAL FAILURE: ${result.error?.substring(0, 20)}...`);
    }
    
    setIsProcessing(false);
    setTimeout(() => setGlitchTrigger(false), 500);
  };

  if (!activeChallenge) return null;

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden font-mono selection:bg-cyan-500/30">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <Sidebar currentLevel={currentLevel} />

      <main className="flex-1 flex flex-col relative border-x border-cyan-500/20 bg-slate-950/40 backdrop-blur-sm">
        <header className="h-20 border-b border-cyan-500/30 bg-black/40 flex items-center justify-between px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] mask-image-linear-gradient" />
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                {activeChallenge.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <p className="text-[10px] text-cyan-500/70 uppercase tracking-[0.3em]">Sector: {activeChallenge.site}</p>
            </div>
          </motion.div>

          <div className="flex gap-6 items-center">
            <div className="h-10 w-px bg-cyan-900/50" />
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Global Rank Score</p>
              <p className="text-2xl font-black text-white shadow-cyan-500/50 drop-shadow-2xl">
                {totalPoints.toLocaleString()}<span className="text-cyan-500 text-sm ml-1">XP</span>
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 relative group flex flex-col">
          <div className="h-8 bg-slate-900/80 border-b border-cyan-900/30 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold ml-2 italic">buffer.js — infiltration_module</span>
          </div>

          <div className="flex-1 relative border-b border-cyan-500/10">
            <MonacoEditor 
              language={activeChallenge.language} 
              value={code} 
              onChange={setCode} 
              theme="vs-dark"
              options={{ fontSize: 14, fontFamily: 'JetBrains Mono', minimap: { enabled: false } }}
            />
            
            <AnimatePresence>
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-2 border-cyan-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-cyan-500 rounded-full animate-spin" />
                  </div>
                  <motion.p 
                    animate={{ opacity: [0.4, 1, 0.4] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-8 text-cyan-400 text-lg font-black tracking-widest"
                  >
                    BRUTE-FORCING PROTOCOLS...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-40 bg-[#020617] p-4 relative border-t border-cyan-500/20">
            <div className="flex items-start gap-4 h-full">
              <div className="relative">
                <div className={`w-16 h-16 rounded-lg border-2 ${glitchTrigger ? 'border-red-500 shadow-[0_0_15px_red]' : 'border-cyan-500/50'} bg-slate-900 flex items-center justify-center overflow-hidden transition-all duration-75`}>
                  <div className="text-3xl">🤖</div>
                  {glitchTrigger && <div className="absolute inset-0 bg-red-500/20 animate-pulse" />}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950" />
              </div>
              <div className="flex-1 font-mono text-sm">
                <p className="text-cyan-500 font-bold mb-1 underline tracking-tighter">AI_ASSISTANT_V2.0.4:</p>
                <motion.p key={botMessage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-slate-300 leading-relaxed">
                  {">"} {botMessage}
                </motion.p>
                <div className="mt-2 flex gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-cyan-900/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                        className="w-full h-full bg-cyan-500/50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="h-28 bg-black/60 border-t border-cyan-500/30 flex items-center justify-between px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="flex gap-10">
            <Stat label="Language" value={activeChallenge.language.toUpperCase()} color="text-yellow-400" />
            <Stat label="Threat Level" value={activeChallenge.difficulty} color="text-red-500" />
            <div className="h-10 w-[1px] bg-slate-800" />
            <Stat label="Infiltration Path" value={activeChallenge.id > 10 ? "Kernel Bypass" : "Standard Shell"} color="text-cyan-400" />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExecute}
            disabled={isProcessing}
            className="group relative overflow-hidden px-12 py-5 bg-cyan-600 rounded-sm font-black text-black uppercase tracking-[0.3em] transition-all disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:animate-bounce">⚡</span> RUN_EXPLOIT.SH
            </span>
            <div className="absolute inset-0 bg-white transform -skew-x-12 translate-x-full group-hover:translate-x-[-150%] transition-transform duration-700 opacity-30" />
          </motion.button>
        </footer>
      </main>

      <Terminal activeChallenge={activeChallenge} />
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{label}</span>
      <div className={`text-sm font-black ${color} flex items-center gap-2 italic`}>
        <div className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
        {value}
      </div>
    </div>
  );
    }
    
