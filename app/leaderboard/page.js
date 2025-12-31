"use client";
import { motion } from 'framer-motion';
import { useGameStore } from '../../context/GameContext';
import { Trophy, Shield, Zap, Globe, Crown, Award } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const { totalPoints } = useGameStore();

  const topAgents = [
    { rank: 1, name: "Ghost_Admin", xp: 125400, region: "Jordan", badge: "Legend" },
    { rank: 2, name: "Root_Breaker", xp: 98200, region: "Iraq", badge: "Elite" },
    { rank: 3, name: "Cyber_Sultan", xp: 87500, region: "Jordan", badge: "Master" },
    { rank: 4, name: "Void_Walker", xp: 65400, region: "Iraq", badge: "Professional" },
    { rank: 5, name: "User_Agent_01", xp: totalPoints, region: "Local", badge: "Active" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-mono p-4 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-5xl font-black tracking-tighter text-white flex items-center gap-4">
              <Trophy className="text-yellow-500" size={48} /> GLOBAL_RANKINGS
            </h1>
            <p className="text-cyan-500 font-bold mt-2 tracking-[0.3em] uppercase text-xs">
              Top Tier Infiltrators Status: Verified
            </p>
          </motion.div>

          <Link href="/game">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-black uppercase text-xs tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
            >
              Back to Command Center
            </motion.button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {topAgents.slice(0, 3).map((agent, index) => (
            <motion.div
              key={agent.rank}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 border ${index === 0 ? 'border-yellow-500 bg-yellow-500/5' : 'border-cyan-500/20 bg-slate-900/40'} backdrop-blur-xl text-center flex flex-col items-center group`}
            >
              {index === 0 && <Crown className="absolute -top-6 text-yellow-500 animate-bounce" size={40} />}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-500/50 flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-1000">
                <span className="text-3xl font-black">{index + 1}</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-wider">{agent.name}</h3>
              <p className="text-cyan-500 font-bold text-sm mb-4">{agent.xp.toLocaleString()} XP</p>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold text-slate-400">{agent.region}</span>
                 <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-cyan-500/20 text-cyan-500'}`}>{agent.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-black/40 border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
            <span>Rank & Agent Profile</span>
            <span className="hidden md:block text-right">Synchronization Score (XP)</span>
          </div>
          
          <div className="divide-y divide-white/5">
            {topAgents.map((agent, index) => (
              <motion.div 
                key={agent.rank}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)', x: 10 }}
                className="p-6 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-xl font-mono font-black ${agent.rank <= 3 ? 'text-cyan-500' : 'text-slate-700'}`}>
                    {agent.rank.toString().padStart(2, '0')}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-white font-black tracking-widest uppercase flex items-center gap-2">
                      {agent.name}
                      {agent.name === "User_Agent_01" && <span className="text-[8px] bg-cyan-500 text-black px-1 py-0.5 rounded">YOU</span>}
                    </span>
                    <span className="text-[9px] text-slate-600 flex items-center gap-1 uppercase">
                      <Globe size={10} /> Sector: {agent.region} | Status: Operational
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="hidden md:flex flex-col items-end">
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-1 ${i < (5 - index) ? 'bg-cyan-500' : 'bg-slate-800'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Infiltration Level</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-cyan-400 font-mono tracking-tighter">
                      {agent.xp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <footer className="mt-12 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <Zap className="text-yellow-500 animate-pulse" size={16} />
            <span className="text-slate-500 uppercase tracking-widest font-black">
              Latest Activity: <span className="text-white italic">Ghost_Admin bypassed Petra_Firewall_V2</span>
            </span>
          </div>
          <div className="flex gap-6">
            <StatSmall icon={<Shield size={12}/>} label="Total Agents" value="12,840" />
            <StatSmall icon={<Award size={12}/>} label="Global XP" value="4.2M" />
          </div>
        </footer>
      </div>
    </div>
  );
}

function StatSmall({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-cyan-500">{icon}</div>
      <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">{label}:</span>
      <span className="text-[9px] text-white font-bold">{value}</span>
    </div>
  );
     }
    
