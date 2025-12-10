import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, History, Rocket, MapPin, Globe } from 'lucide-react';

const Values: React.FC = () => {
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
      
      {/* 1. NARRATIVE HEADER (The "Why") */}
      <div className="container mx-auto px-6 mb-16 relative z-10 text-center">
        <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Timeline Line (Visual Connector) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-gf-green to-gf-green opacity-50 -z-10 -translate-y-24"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                Evoluzione Aziendale
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                IL NOSTRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">PERCORSO</span>
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Non siamo nati grandi, lo siamo diventati montando un tubo alla volta. 
                <br className="hidden md:block"/>
                Dalla provincia italiana ai grandi palchi internazionali.
            </p>
        </div>
      </div>

      {/* 2. SPLIT SECTION (The "Content") */}
      <div className="relative w-full h-[80vh] min-h-[600px] flex flex-col md:flex-row">
        
        {/* CENTER CONNECTOR (The "Hinge") */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center justify-center">
            <div className="w-[1px] h-screen bg-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-24 h-24 rounded-full bg-gf-darker border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-20 group">
                <div className="absolute inset-0 rounded-full border border-gf-green/30 animate-pulse"></div>
                <div className="text-center">
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">Since</span>
                    <span className="block text-xl font-bold text-white">2005</span>
                </div>
            </div>
        </div>

        {/* --- LEFT SIDE: THE ROOTS --- */}
        <div 
            className={`relative w-full md:w-1/2 h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10 transition-all duration-700 ease-in-out cursor-pointer ${hoveredSide === 'right' ? 'brightness-50 grayscale-[50%]' : 'brightness-100 grayscale-0'}`}
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
        >
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-110"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
                <div className="mb-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                    <History size={20} />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">Le Radici</h3>
                <div className="flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-6">
                    <MapPin size={14} /> Frosinone, Italia
                </div>
                <p className="text-gray-300 text-lg font-light leading-relaxed max-w-md border-l-2 border-white/20 pl-4">
                    Dove tutto è iniziato. L'attenzione maniacale al dettaglio e la cultura del lavoro artigiano che ancora oggi definisce ogni nostro montaggio.
                </p>

                <div className="mt-8">
                     <a href="#chi-siamo" className="inline-flex items-center gap-2 text-white border-b border-gf-green pb-1 hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest">
                        Scopri la nostra storia <ArrowRight size={16} />
                     </a>
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: THE FUTURE --- */}
        <div 
            className={`relative w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out cursor-pointer ${hoveredSide === 'left' ? 'brightness-50 grayscale-[50%]' : 'brightness-100 grayscale-0'}`}
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
        >
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-110"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent"></div>

            {/* Content (Aligned Right on Desktop) */}
            <div className="absolute bottom-0 right-0 w-full p-10 md:p-16 md:text-right flex flex-col items-start md:items-end">
                <div className="mb-4 w-12 h-12 rounded-full bg-gf-green/20 backdrop-blur-md flex items-center justify-center text-gf-green border border-gf-green/20">
                    <Rocket size={20} />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">Orizzonti</h3>
                <div className="flex items-center gap-2 text-gf-green font-bold text-xs uppercase tracking-[0.2em] mb-6">
                    <Globe size={14} /> Visione Nazionale
                </div>
                <p className="text-gray-300 text-lg font-light leading-relaxed max-w-md border-l-2 md:border-l-0 md:border-r-2 border-white/20 pl-4 md:pl-0 md:pr-4">
                    Oggi portiamo le nostre strutture in tutta Italia. Nuove tecnologie, logistica avanzata e la stessa passione del primo giorno.
                </p>
                
                <div className="mt-8">
                     <a href="#progetti" className="inline-flex items-center gap-2 text-white border-b border-gf-green pb-1 hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest">
                        Vedi dove siamo oggi <ArrowRight size={16} />
                     </a>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
  
export default Values;