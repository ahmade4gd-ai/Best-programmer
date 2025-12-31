"use client";
export default function Terminal({ activeChallenge }) {
  return (
    <div className="w-80 h-full bg-[#020617] border-l border-cyan-900/30 flex flex-col font-mono">
      <div className="p-4 border-b border-cyan-900/30 bg-slate-900/50">
        <span className="text-cyan-500 text-xs font-black tracking-widest uppercase italic">Jordan_Heritage_Protocol</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative h-48 rounded border border-cyan-500/30 overflow-hidden group">
          <img 
            src={activeChallenge.image} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            alt="Jordan Site"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          <div className="absolute bottom-2 left-2 text-[10px] text-cyan-400 font-bold uppercase">
             Sector: {activeChallenge.site}
          </div>
        </div>

        <div className="space-y-2 text-[11px]">
          <p className="text-emerald-500">&gt; Target_Site: {activeChallenge.site}</p>
          <p className="text-slate-400 leading-relaxed">&gt; Data: {activeChallenge.description}</p>
          <p className="text-cyan-600">&gt; Status: Securing historical artifacts...</p>
        </div>
      </div>

      <div className="h-32 p-4 bg-black border-t border-cyan-900/30">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-slate-500 uppercase">Bypass Confidence</span>
          <span className="text-cyan-500 text-[10px]">88%</span>
        </div>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" style={{ width: '88%' }} />
        </div>
      </div>
    </div>
  );
              }
              
