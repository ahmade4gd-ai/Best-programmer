"use client";
const JORDAN_SITES = [
  { name: "البتراء", city: "معان", id: "petra" },
  { name: "قلعة الكرك", city: "الكرك", id: "karak" },
  { name: "وادي رم", city: "العقبة", id: "rum" },
  { name: "جرش", city: "جرش", id: "jerash" },
  { name: "قصر عمرة", city: "الزرقاء", id: "amra" },
  { name: "المغطس", city: "البلقاء", id: "baptism" },
  { name: "أم قيس", city: "إربد", id: "qays" }
];

export default function HeritageGallery({ unlockedLevels }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-6 bg-slate-950/80 backdrop-blur-xl border border-cyan-900/30 rounded-lg">
      {JORDAN_SITES.map((site, index) => {
        const isUnlocked = unlockedLevels.length > index * 20; 
        return (
          <div key={site.id} className={`relative aspect-video rounded-lg border transition-all duration-500 overflow-hidden ${isUnlocked ? 'border-cyan-500' : 'border-slate-800 opacity-30 grayscale'}`}>
            <img src={`/assets/images/jordan/${site.id}.jpg`} className="w-full h-full object-cover" alt={site.name} />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-white font-black text-sm">{site.name}</span>
              <span className="text-cyan-500 text-[10px] uppercase tracking-tighter">{site.city}</span>
              {!isUnlocked && <span className="text-[8px] mt-1 text-red-500">Locked Level {index * 20}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
  }
                
