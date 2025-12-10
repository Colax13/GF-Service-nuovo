import React from 'react';
import { Home, RefreshCcw, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gf-darker flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gf-green/5 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Custom Icon: Broken Marquee / Tensostruttura */}
      <div className="mb-12 relative group cursor-default">
        {/* Glow effect behind icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gf-green/20 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors duration-500"></div>
        
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-white stroke-[2px] drop-shadow-2xl">
           {/* Ground Line */}
           <line x1="20" y1="170" x2="180" y2="170" strokeOpacity="0.3" strokeLinecap="round" />

           {/* Left Pole - Sturdy */}
           <line x1="50" y1="170" x2="50" y2="80" className="stroke-gray-300" strokeWidth="3" />
           <circle cx="50" cy="170" r="2" fill="white" />

           {/* Right Pole - Broken/Buckled */}
           {/* Bottom part of right pole */}
           <line x1="150" y1="170" x2="155" y2="130" className="stroke-gray-300" strokeWidth="3" />
           {/* Top part of right pole - Falling outwards */}
           <line x1="155" y1="130" x2="170" y2="90" className="stroke-gray-300 animate-[pulse_3s_ease-in-out_infinite]" strokeWidth="3" />
           
           {/* "Snap" effect on pole */}
           <path d="M145 125 L165 135 M160 120 L150 140" stroke="#EF4444" strokeWidth="1" opacity="0.8" className="animate-ping" style={{ animationDuration: '3s' }} />

           {/* Roof - Left Side (Stable) */}
           <path d="M50 80 L100 40" strokeWidth="3" strokeLinejoin="round" />

           {/* Roof - Right Side (Collapsing) */}
           {/* It connects from the peak (100,40) to the top of the broken pole (170,90) */}
           <path d="M100 40 L170 90" strokeWidth="3" strokeLinejoin="round" className="origin-top-left animate-[swing_4s_ease-in-out_infinite]" />

           {/* Fabric Texture / Sagging Lines */}
           <path d="M60 90 Q100 60 150 110" strokeOpacity="0.3" fill="none" strokeDasharray="4 4" />
           
           {/* Falling debris */}
           <circle cx="160" cy="110" r="1.5" fill="white" className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }} />
           <rect x="150" y="150" width="3" height="3" fill="white" className="animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }} />
        </svg>
      </div>

      {/* Text Content */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 tracking-tighter">
        Ops!
      </h1>
      
      <div className="space-y-2 mb-12 max-w-lg mx-auto">
        <p className="text-xl md:text-2xl font-light text-white">
          Qualcosa è andato storto.
        </p>
        <p className="text-lg text-gf-green font-medium flex items-center justify-center gap-2">
          <AlertTriangle size={18} />
          Hai montato male la tensostruttura.
        </p>
        <p className="text-sm text-gray-500 pt-4">
          Errore 404 - Pagina non trovata
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm md:max-w-none justify-center">
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw size={18} /> 
          <span>Ricarica</span>
        </button>

        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            window.location.reload();
          }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gf-green text-white rounded-full hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,112,90,0.4)] hover:shadow-[0_0_30px_rgba(0,112,90,0.6)]"
        >
          <Home size={18} /> 
          <span>Torna alla Home</span>
        </a>
      </div>

    </div>
  );
};

export default NotFound;