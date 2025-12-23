import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, History, Rocket, MapPin, Globe } from 'lucide-react';

interface ValuesProps {
  onShowAbout?: () => void;
}

const Values: React.FC<ValuesProps> = ({ onShowAbout }) => {
  const [inView, setInView] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gf-darker relative pt-24 pb-0 overflow-hidden">
      
      {/* ATMOSPHERIC FULL-WIDTH GRADIENT (Stile Catalogo) */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0 overflow-hidden">
          {/* Gradiente lineare di base che attraversa tutto lo schermo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gf-green/20 to-black opacity-60"></div>
          {/* Bagliore orizzontale soffuso */}
          <div className="absolute top-1/2 left-0 w-full h-[250px] -translate-y-1/2 bg-gf-green/5 blur-[120px]"></div>
          {/* Linea di luce centrale dinamica */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gf-green/20 to-transparent"></div>
      </div>

      {/* 1. NARRATIVE HEADER */}
      <div className="container mx-auto px-6 mb-20 relative z-10 text-center">
        <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                Evoluzione Aziendale
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                IL NOSTRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green via-emerald-400 to-emerald-500 font-black uppercase">PERCORSO</span>
            </h2>

            {/* LINEA NEON SEPARATOR (Stile Catalogo) */}
            <div className="relative w-full max-w-xs mx-auto h-px mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gf-green to-transparent opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gf-green to-transparent blur-[2px]"></div>
            </div>

            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Dalla precisione artigiana della provincia alla solidità dei grandi eventi nazionali. 
                Un'evoluzione costruita un montaggio alla volta.
            </p>
        </div>
      </div>

      {/* 2. SPLIT SECTION */}
      <div className="relative w-full h-[85vh] min-h-[650px] flex flex-col md:flex-row bg-black">
        
        {/* CENTER DIVIDER - Since 2005 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-30 hidden md:block">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black border border-white/10 flex flex-col items-center justify-center transition-all duration-500 z-40 ${hoveredSide ? 'border-gf-green scale-110 shadow-[0_0_30px_rgba(0,90,72,0.4)]' : ''}`}>
                <div className={`absolute inset-0 rounded-full border border-gf-green/20 transition-opacity ${hoveredSide ? 'opacity-100 animate-ping' : 'opacity-0'}`}></div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">Since</span>
                <span className="text-xl font-black text-white leading-none">2005</span>
            </div>
        </div>

        {/* --- LEFT SIDE: LE RADICI --- */}
        <div 
            className="relative w-full md:w-1/2 h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={onShowAbout}
        >
            <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105 ${hoveredSide === 'right' ? 'opacity-30' : 'opacity-70'}`}
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop")' }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            <div className={`absolute inset-0 bg-gf-green/10 transition-opacity duration-700 ${hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="absolute bottom-0 left-0 w-full p-10 md:p-16 z-20">
                <div className="mb-6 w-14 h-14 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center text-gf-green group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-500 shadow-xl">
                    <History size={26} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Le Radici
                </h3>
                
                <div className="flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-6">
                    <MapPin size={14} /> Frosinone, Italia
                </div>
                
                <p className="text-white text-lg font-normal leading-relaxed max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] border-l-2 border-gf-green/30 pl-6 group-hover:border-gf-green transition-colors">
                    L'attenzione maniacale al dettaglio e la cultura del lavoro artigiano che ancora oggi definisce ogni nostro montaggio.
                </p>

                <div className={`mt-8 flex items-center gap-3 transition-all duration-500 ${hoveredSide === 'left' ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                     <div className="h-[1px] w-8 bg-gf-green"></div>
                     <button 
                        onClick={(e) => { e.stopPropagation(); onShowAbout?.(); }}
                        className="text-white hover:text-gf-green transition-colors text-xs font-bold uppercase tracking-widest outline-none"
                     >
                        Scopri la storia
                     </button>
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: ORIZZONTI --- */}
        <div 
            className="relative w-full md:w-1/2 h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={onShowAbout}
        >
            <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105 ${hoveredSide === 'left' ? 'opacity-30' : 'opacity-70'}`}
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop")' }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            <div className={`absolute inset-0 bg-gf-green/10 transition-opacity duration-700 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="absolute bottom-0 right-0 w-full p-10 md:p-16 md:text-right flex flex-col items-start md:items-end z-20">
                <div className="mb-6 w-14 h-14 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center text-gf-green group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-500 shadow-xl">
                    <Rocket size={26} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Orizzonti
                </h3>
                
                <div className="flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-6">
                    <Globe size={14} /> Visione Nazionale
                </div>
                
                <p className="text-white text-lg font-normal leading-relaxed max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] border-l-2 md:border-l-0 md:border-r-2 border-gf-green/30 pl-6 md:pl-0 md:pr-6 group-hover:border-gf-green transition-colors">
                    Oggi portiamo le nostre strutture in tutta Italia. Nuove tecnologie, logistica avanzata e la stessa passione del primo giorno.
                </p>
                
                <div className={`mt-8 flex items-center gap-3 transition-all duration-500 ${hoveredSide === 'right' ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                     <button 
                        onClick={(e) => { e.stopPropagation(); onShowAbout?.(); }}
                        className="text-white hover:text-gf-green transition-colors text-xs font-bold uppercase tracking-widest outline-none"
                     >
                        Vedi come operiamo oggi
                     </button>
                     <div className="h-[1px] w-8 bg-gf-green"></div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
  
export default Values;