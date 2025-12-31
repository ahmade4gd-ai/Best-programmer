import { Vazirmatn, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { useGameStore } from '../../context/GameContext';



const arabicFont = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazir' });
const monoFont = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'CyberQuest | جولة التراث السيبراني',
  description: 'منصة تفاعلية لتعلم البرمجة واختراق جدران الحماية في مواقع التراث الأردني ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabicFont.variable} ${monoFont.variable} font-sans bg-cyber-black text-white antialiased`}>
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cyber-black/50 to-cyber-black pointer-events-none" />
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
    }
    
