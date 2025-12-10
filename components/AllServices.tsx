import React, { useEffect, useState } from 'react';
import { Package, Layers, Zap, Layout, ChevronRight, ArrowRight, Gamepad2 } from 'lucide-react';
import Contact from './Contact';

interface AllServicesProps {
  onShowContact?: () => void;
}

const categories = [
  {
    id: "strutture",
    title: "Strutture",
    subtitle: "Coperture & Spazi",
    description: "Soluzioni modulari certificate per ogni dimensione e condizione meteo. Dalle piazze storiche ai grandi parchi urbani.",
    icon: Layers,
    items: [
      { name: "Tensostrutture", desc: "Modulari da 8m a 40m di larghezza.", specs: "Cert. UNI EN 13782", image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2070&auto=format&fit=crop" },
      { name: "Gazebo Professionali", desc: "Pagode 3x3, 4x4, 5x5 e 6x6.", specs: "PVC Ignifugo CL.2", image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop" },
      { name: "Casette in Legno", desc: "Per mercatini ed esposizioni.", specs: "Legno trattato", image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop" }
    ]
  },
  {
    id: "allestimenti",
    title: "Allestimenti",
    subtitle: "Arredo & Comfort",
    description: "Dettagli che fanno la differenza. Creiamo ambienti accoglienti e funzionali per il tuo pubblico.",
    icon: Layout,
    items: [
      { name: "Palchi Modulari", desc: "Pedane Layher certificati.", specs: "Portata 600kg/mq", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop" },
      { name: "Set Birreria", desc: "Tavoli e panche in legno.", specs: "Abete verniciato", image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=1000&auto=format&fit=crop" },
      { name: "Sedute Lounge", desc: "Divanetti e poltrone outdoor.", specs: "Tessuto tecnico", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop" },
      { name: "Pavimentazioni", desc: "Legno o moquette.", specs: "Ignifugo", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  {
    id: "impianti",
    title: "Impianti",
    subtitle: "Energia & Servizi",
    description: "L'infrastruttura invisibile ma essenziale. Garantiamo potenza e sicurezza.",
    icon: Zap,
    items: [
      { name: "Generatori", desc: "Gruppi elettrogeni silenziati.", specs: "Da 30 a 200 KW", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop" },
      { name: "Illuminazione", desc: "Torri faro e catenarie LED.", specs: "IP65 Outdoor", image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop" },
      { name: "Riscaldamento", desc: "Generatori d'aria calda.", specs: "Gasolio/Elettrico", image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop" },
      { name: "Bagni Chimici", desc: "Cabine standard e disabili.", specs: "Igienizzati", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  {
    id: "intrattenimento",
    title: "Intrattenimento",
    subtitle: "Svago & Giochi",
    description: "Rendi unico il tuo evento con aree dedicate al divertimento. Dai grandi classici alle sfide arcade.",
    icon: Gamepad2,
    items: [
      { name: "Calcio Balilla", desc: "Tavoli professionali da torneo.", specs: "Aste Rientranti", image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=1000&auto=format&fit=crop" },
      { name: "Biliardo", desc: "Tavoli da pool regolamentari.", specs: "Panno Verde/Blu", image: "https://images.unsplash.com/photo-1585802525164-9f893fa9134a?q=80&w=1000&auto=format&fit=crop" },
      { name: "Freccette", desc: "Bersagli elettronici a colonna.", specs: "Display Punti", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
      { name: "Punchball & Arcade", desc: "Giochi di forza e abilità.", specs: "Gettoniera/Free", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" }
    ]
  }
];

const AllServices: React.FC<AllServicesProps> = ({ onShowContact }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            // Offset logic for scroll spy
            const scrollPosition = window.scrollY + 200; 

            for (const category of categories) {
                const element = document.getElementById(category.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveCategory(category.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for fixed header + spacing
            const y = element.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="relative min-h-screen bg-gf-darker selection:bg-gf-green selection:text-white pb-20">
                 
                 {/* --- NEW ORGANIC ANIMATED BACKGROUND --- */}
                 <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* 1. Base Dark Background */}
                    <div className="absolute inset-0 bg-[#081312]"></div>
                    
                    {/* 2. Fluid Gradient Orbs */}
                    <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-gf-green/10 to-emerald-600/10 blur-[120px] animate-[blob_20s_infinite]"></div>
                    <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-l from-emerald-900/20 to-teal-900/20 blur-[130px] animate-[blob_25s_infinite_reverse]"></div>
                    <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-gf-green/5 blur-[90px] animate-[pulse_10s_infinite]"></div>
                    
                    {/* 3. Subtle Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                 </div>

                 <div className="relative z-10 pt-32 pb-12 container mx-auto px-6">
                     
                     {/* --- DISTINCT HEADER SECTION --- */}
                     <div className={`relative mb-20 pb-12 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gf-green/20 bg-gf-green/5 text-gf-green text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                <Package size={12} className="animate-pulse" />
                                Catalogo Ufficiale
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
                                Soluzioni <span className="font-serif italic text-white/50 font-light">Tecniche</span> <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Integrate.</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Ogni evento richiede fondamenta solide. Esplora le nostre categorie di noleggio e allestimento.
                            </p>
                        </div>
                        
                        {/* Visual Separator */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gf-green/50 to-transparent"></div>
                     </div>

                     {/* --- MAIN LAYOUT --- */}
                     <div className="flex flex-col lg:flex-row gap-16 items-start relative">
                        
                        {/* LEFT: Sidebar Navigation - Sticky */}
                        <aside 
                            className={`hidden lg:block lg:w-1/4 sticky top-40 transition-all duration-1000 ease-out delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                        >
                            {/* Glassmorphism Panel */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                
                                {/* Panel Highlight */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gf-green to-transparent opacity-50"></div>

                                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-opacity-50">
                                    Indice Categorie
                                </h3>
                                <ul className="space-y-1">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <button
                                                onClick={() => scrollToCategory(cat.id)}
                                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition-all duration-300 relative overflow-hidden ${
                                                    activeCategory === cat.id 
                                                    ? 'text-white' 
                                                    : 'text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                {/* Active Background Slide */}
                                                <div className={`absolute inset-0 bg-gf-green transition-transform duration-300 origin-left ${activeCategory === cat.id ? 'scale-x-100 opacity-20' : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-10'}`}></div>
                                                
                                                {/* Left Border Indicator */}
                                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gf-green rounded-r-full transition-all duration-300 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-0'}`}></div>

                                                <span className="flex items-center gap-3 relative z-10">
                                                    <cat.icon size={16} className={activeCategory === cat.id ? 'text-gf-green' : 'text-gray-500 group-hover:text-gray-300'} />
                                                    <span className="font-medium text-sm tracking-wide">{cat.title}</span>
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <button 
                                        onClick={onShowContact}
                                        className="w-full py-3 border border-white/10 hover:border-gf-green text-gray-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gf-green/10 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Richiedi Preventivo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT: Content Column */}
                        <div className="w-full lg:w-3/4 flex flex-col gap-32">
                            {categories.map((cat, idx) => (
                                <div 
                                    id={cat.id} 
                                    key={cat.id} 
                                    className={`scroll-mt-32 transition-all duration-1000 ease-out`}
                                    style={{ 
                                        opacity: loaded ? 1 : 0, 
                                        transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                                        transitionDelay: `${idx * 150}ms`
                                    }}
                                >
                                    {/* Category Header Strip */}
                                    <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10 pb-6 border-b border-white/5 relative">
                                        <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gf-green"></div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gf-green/20 flex items-center justify-center text-gf-green backdrop-blur-sm border border-gf-green/30 shadow-[0_0_15px_rgba(0,112,90,0.2)]">
                                                <cat.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-white leading-none mb-1">{cat.title}</h3>
                                                <p className="text-gf-green font-serif italic">{cat.subtitle}</p>
                                            </div>
                                        </div>
                                        <p className="md:ml-auto text-gray-400 text-sm max-w-sm leading-relaxed border-l-2 border-white/10 pl-4">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Items Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {cat.items.map((item, i) => (
                                            <div key={i} className="group relative h-[320px] rounded-2xl overflow-hidden border border-white/10 hover:border-gf-green/50 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-default">
                                                
                                                {/* Image Background */}
                                                <div 
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url("${item.image}")` }}
                                                >
                                                    {/* Dark Gradient Overlay - Darkens on active */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                                                </div>

                                                {/* Specs Badge */}
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10 group-hover:border-gf-green/30 group-hover:text-white transition-colors">
                                                        {item.specs}
                                                    </span>
                                                </div>

                                                {/* Content (Bottom) */}
                                                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full z-20">
                                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-start">
                                                         
                                                         <h4 className="text-white font-bold text-2xl mb-2 group-hover:text-gf-green transition-colors leading-none uppercase drop-shadow-md">
                                                            {item.name}
                                                         </h4>
                                                         
                                                         {/* Separator */}
                                                         <div className="h-[2px] bg-gf-green transition-all duration-500 mb-3 w-0 group-hover:w-12"></div>

                                                         {/* Description */}
                                                         <p className="text-gray-300 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                                            {item.desc}
                                                         </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                     </div>

                 </div>
                 
                 <style>{`
                    @keyframes blob {
                        0% { transform: translate(0px, 0px) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                        100% { transform: translate(0px, 0px) scale(1); }
                    }
                 `}</style>
            </section>
            
            {/* Added Contact Form at the bottom */}
            <Contact simpleMode={true} />
        </>
    );
}

export default AllServices;