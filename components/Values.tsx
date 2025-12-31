
import React, { useEffect, useRef, useState } from 'react';
import { History, Rocket, MapPin, Globe, ChevronDown } from 'lucide-react';

interface ValuesProps {
  onShowAbout?: () => void;
}

const Values: React.FC<ValuesProps> = ({ onShowAbout }) => {
  const [inView, setInView] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<'left' | 'right' | null>(null);
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

  const toggleMobile = (side: 'left' | 'right') => {
    setExpandedMobile(expandedMobile === side ? null : side);
  };

  return (
    <section ref={sectionRef} className="w-full bg-gf-darker relative pt-24 pb-0 overflow-hidden">
      
      {/* ATMOSPHERIC FULL-WIDTH GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gf-green/20 to-black opacity-60"></div>
          <div className="absolute top-1/2 left-0 w-full h-[250px] -translate-y-1/2 bg-gf-green/5 blur-[120px]"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gf-green/20 to-transparent"></div>
      </div>

      {/* 1. NARRATIVE HEADER */}
      <div className="container mx-auto px-6 mb-16 md:mb-20 relative z-10 text-center">
        <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                Evoluzione Aziendale
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                IL NOSTRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green via-emerald-400 to-emerald-500 font-black uppercase">PERCORSO</span>
            </h2>

            <div className="relative w-full max-w-xs mx-auto h-px mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gf-green to-transparent opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gf-green to-transparent blur-[2px]"></div>
            </div>

            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed px-4">
                Dalla precisione artigiana della provincia alla solidità dei grandi eventi nazionali. 
                Un'evoluzione costruita un montaggio alla volta.
            </p>
        </div>
      </div>

      {/* 2. SPLIT SECTION (Desktop) / ACCORDION SECTION (Mobile) */}
      <div className="relative w-full md:h-[80vh] md:min-h-[600px] flex flex-col md:flex-row bg-black overflow-hidden border-t border-white/10">
        
        {/* CENTER DIVIDER (Desktop Only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-30 hidden md:block">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gf-darker border border-white/10 flex flex-col items-center justify-center transition-all duration-500 z-40 ${hoveredSide ? 'border-gf-green scale-110 shadow-[0_0_40px_rgba(0,90,72,0.6)]' : 'shadow-[0_0_20px_rgba(0,0,0,0.8)]'}`}>
                <div className={`absolute inset-0 rounded-full border border-gf-green/30 transition-opacity duration-500 ${hoveredSide ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] font-sans leading-none mb-2">Dal</span>
                <span className="text-2xl font-black text-white leading-none tracking-tighter">2005</span>
            </div>
        </div>

        {/* --- LEFT SIDE: LE RADICI --- */}
        <div 
            className={`
                relative w-full md:w-1/2 overflow-hidden cursor-pointer group 
                transition-[max-height,padding] duration-[800ms] ease-in-out will-change-[max-height]
                ${expandedMobile === 'left' ? 'max-h-[800px] py-12' : 'max-h-[160px] md:max-h-none h-[160px] md:h-full'}
            `}
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => {
                if (window.innerWidth < 768) toggleMobile('left');
                else onShowAbout?.();
            }}
        >
            {/* Background Image Container */}
            <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${expandedMobile === 'left' ? 'opacity-100' : 'opacity-60 md:opacity-50'} ${hoveredSide === 'right' ? 'md:opacity-20 blur-sm' : ''} ${hoveredSide === 'left' ? 'md:opacity-80' : ''}`}>
                <img 
                    src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203050/Picinisco-1_irrxjh.jpg"
                    alt="Radici Background"
                    className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out ${expandedMobile === 'left' || hoveredSide === 'left' ? 'scale-110' : 'scale-100'}`}
                />
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent transition-opacity duration-800 ${expandedMobile === 'left' ? 'opacity-100' : 'opacity-90 md:opacity-100'}`}></div>
            
            <div className={`relative h-full w-full p-8 md:p-16 z-20 flex flex-col transition-all duration-[800ms] ease-in-out ${expandedMobile === 'left' ? 'justify-start' : 'justify-center md:justify-center'}`}>
                <div className="flex items-center justify-between w-full md:block">
                    <div className="flex items-center gap-5">
                        <div className={`
                            w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-gf-green backdrop-blur-md
                            group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-500 shadow-2xl
                            ${expandedMobile === 'left' ? 'bg-gf-green text-white border-gf-green' : ''}
                        `}>
                            <History size={24} className="md:w-[28px] md:h-[28px]" />
                        </div>
                        <div className="md:hidden">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Le Radici</h3>
                            <div className="flex items-center gap-1 text-gf-green font-bold text-[10px] uppercase tracking-wider">
                                <MapPin size={10} /> Frosinone
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:hidden text-white/30 transition-transform duration-500" style={{ transform: expandedMobile === 'left' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown size={24} />
                    </div>
                </div>
                
                {/* Text Content */}
                <div className={`
                    md:block transition-all ease-in-out
                    ${expandedMobile === 'left' 
                        ? 'opacity-100 translate-y-0 mt-8 duration-[400ms] delay-[300ms]' 
                        : 'opacity-0 -translate-y-2 duration-[250ms] max-h-0 md:max-h-none md:opacity-100 md:translate-y-0 md:mt-10'}
                `}>
                    <h3 className="hidden md:block text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-xl">
                        Le Radici
                    </h3>
                    
                    <div className="hidden md:flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-8">
                        <MapPin size={14} /> Frosinone, Italia
                    </div>
                    
                    <p className="text-gray-200 text-base md:text-lg font-light leading-relaxed max-w-md drop-shadow-md border-l-2 border-gf-green/50 pl-6 md:group-hover:border-gf-green transition-colors duration-500">
                        L'attenzione maniacale al dettaglio e la cultura del lavoro artigiano che ancora oggi definisce ogni nostro montaggio.
                    </p>

                    <div className="mt-10 flex items-center gap-4 group/btn">
                         <div className="h-[1px] w-12 bg-gf-green transition-all duration-500 group-hover/btn:w-20"></div>
                         <span className="text-white group-hover/btn:text-gf-green transition-colors text-xs font-bold uppercase tracking-widest">
                            Scopri la storia
                         </span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: ORIZZONTI --- */}
        <div 
            className={`
                relative w-full md:w-1/2 overflow-hidden cursor-pointer group 
                transition-[max-height,padding] duration-[800ms] ease-in-out will-change-[max-height]
                ${expandedMobile === 'right' ? 'max-h-[800px] py-12' : 'max-h-[160px] md:max-h-none h-[160px] md:h-full'}
            `}
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => {
                if (window.innerWidth < 768) toggleMobile('right');
                else onShowAbout?.();
            }}
        >
            {/* Background Image Container */}
            <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${expandedMobile === 'right' ? 'opacity-100' : 'opacity-60 md:opacity-50'} ${hoveredSide === 'left' ? 'md:opacity-20 blur-sm' : ''} ${hoveredSide === 'right' ? 'md:opacity-80' : ''}`}>
                <img 
                    src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203566/camion_z0qlfj.png"
                    alt="Orizzonti Background"
                    className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out ${expandedMobile === 'right' || hoveredSide === 'right' ? 'scale-110' : 'scale-100'}`}
                />
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:bg-gradient-to-l md:from-black/80 md:via-black/40 md:to-transparent transition-opacity duration-800 ${expandedMobile === 'right' ? 'opacity-100' : 'opacity-90 md:opacity-100'}`}></div>
            
            <div className={`relative h-full w-full p-8 md:p-16 z-20 flex flex-col transition-all duration-[800ms] ease-in-out ${expandedMobile === 'right' ? 'justify-start' : 'justify-center md:justify-center md:items-end'}`}>
                <div className="flex items-center justify-between w-full md:flex-col md:items-end">
                    <div className="flex items-center gap-5 md:flex-row-reverse">
                        <div className={`
                            w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-gf-green backdrop-blur-md
                            group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-500 shadow-2xl
                            ${expandedMobile === 'right' ? 'bg-gf-green text-white border-gf-green' : ''}
                        `}>
                            <Rocket size={24} className="md:w-[28px] md:h-[28px]" />
                        </div>
                        <div className="md:text-right md:hidden">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Orizzonti</h3>
                            <div className="flex items-center gap-1 text-gf-green font-bold text-[10px] uppercase tracking-wider md:justify-end">
                                <Globe size={10} /> Nazionale
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:hidden text-white/30 transition-transform duration-500" style={{ transform: expandedMobile === 'right' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown size={24} />
                    </div>
                </div>
                
                {/* Text Content */}
                <div className={`
                    md:block transition-all ease-in-out
                    ${expandedMobile === 'right' 
                        ? 'opacity-100 translate-y-0 mt-8 duration-[400ms] delay-[300ms]' 
                        : 'opacity-0 -translate-y-2 duration-[250ms] max-h-0 md:max-h-none md:opacity-100 md:translate-y-0 md:mt-10'}
                `}>
                    <h3 className="hidden md:block text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-xl md:text-right">
                        Orizzonti
                    </h3>
                    
                    <div className="hidden md:flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-8 md:justify-end">
                        <Globe size={14} /> Visione Nazionale
                    </div>
                    
                    <p className="text-gray-200 text-base md:text-lg font-light leading-relaxed max-w-md drop-shadow-md border-l-2 md:border-l-0 md:border-r-2 border-gf-green/50 pl-6 md:pl-0 md:pr-6 md:text-right md:group-hover:border-gf-green transition-colors duration-500">
                        Oggi portiamo le nostre strutture in tutta Italia. Nuove tecnologie, logistica avanzata e la stessa passione del primo giorno.
                    </p>
                    
                    <div className="mt-10 flex items-center gap-4 md:justify-end group/btn">
                         <span className="text-white group-hover/btn:text-gf-green transition-colors text-xs font-bold uppercase tracking-widest order-2 md:order-1">
                            Vedi operatività
                         </span>
                         <div className="h-[1px] w-12 bg-gf-green transition-all duration-500 group-hover/btn:w-20 order-1 md:order-2"></div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
  
export default Values;
