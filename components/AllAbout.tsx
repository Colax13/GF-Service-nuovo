import React, { useEffect, useState, useRef } from 'react';
import { Clock, Users, ShieldCheck, Award, Target, ArrowRight, CheckCircle, Hammer, Handshake, MapPin, DraftingCompass, X, TrendingUp, Heart } from 'lucide-react';

interface AllAboutProps {
  onShowContact?: () => void;
}

const timelineEvents = [
  {
    year: "2005",
    title: "Le Fondamenta",
    desc: "GF Service nasce in un piccolo magazzino di Frosinone. Una sola squadra, un furgone e le prime piccole coperture per feste patronali.",
    icon:  Clock
  },
  {
    year: "2010",
    title: "Il Primo Salto",
    desc: "Acquisizione del primo capannone industriale e ampliamento del parco tensostrutture. Iniziamo a servire le province limitrofe.",
    icon: Target
  },
  {
    year: "2015",
    title: "Strutture Grandi Eventi",
    desc: "Ingresso nel mercato dei grandi eventi pubblici. Arrivano i palchi modulari Layher e le certificazioni ISO per la sicurezza.",
    icon: Award
  },
  {
    year: "2020",
    title: "Resilienza & Innovazione",
    desc: "Durante lo stop globale, rinnoviamo l'intera logistica e investiamo in strutture sanitarie temporanee, dimostrando flessibilità.",
    icon: ShieldCheck
  },
  {
    year: "2024",
    title: "Leader Centro Italia",
    desc: "Oggi contiamo oltre 50 dipendenti, una flotta di 20 mezzi e la gestione tecnica dei più importanti tour di Street Food nazionali.",
    icon: Users
  }
];

const teamMembers = [
  {
    name: "Marco Rossi",
    role: "Fondatore & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    quote: "La sicurezza prima del profitto."
  },
  {
    name: "Giulia Bianchi",
    role: "Direttore Operativo",
    image: "https://images.unsplash.com/photo-1573496359-136d475583dc?q=80&w=1000&auto=format&fit=crop",
    quote: "Ogni centimetro conta."
  },
  {
    name: "Roberto Verdi",
    role: "Capo Squadra Tecnico",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    quote: "Non esiste maltempo, solo cattivi montaggi."
  },
  {
    name: "Elena Neri",
    role: "Event Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    quote: "Realizziamo l'immaginabile."
  }
];

// Images for the gallery
const photoLoopImages = [
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d43f7166778?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533552083626-47674dc0535e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop",
];

// The 5 Specific Values with extended content for the interactive section
const values = [
    { 
        icon: MapPin, 
        title: "ORGOGLIO TERRITORIALE", 
        desc: "Radici locali, visione nazionale.",
        longDesc: "GF Service non nasce per caso. Nasce in un territorio dove la festa di piazza è sacra. Quando montiamo una struttura, non stiamo solo alzando colonne d'acciaio. Stiamo proteggendo uno spazio dove una comunità scriverà la sua storia. Dal Basso Lazio portiamo questa passione in tutta Italia.",
        image: "https://images.unsplash.com/photo-1533552083626-47674dc0535e?q=80&w=1974&auto=format&fit=crop"
    },
    { 
        icon: DraftingCompass, 
        title: "PRECISIONE", 
        desc: "Il dettaglio è la nostra ossessione.",
        longDesc: "In questo lavoro, un centimetro fa la differenza tra un montaggio perfetto e un problema. La nostra ossessione per il dettaglio, dai calcoli statici all'allineamento dell'ultima sedia, garantisce sicurezza assoluta e un'estetica impeccabile in ogni installazione.",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        icon: Users, 
        title: "UMANITÀ", 
        desc: "Persone prima delle strutture.",
        longDesc: "Non siamo robot. Crediamo nel rapporto umano, nel sorriso durante un montaggio faticoso e nella stretta di mano che vale più di un contratto. La nostra squadra è una famiglia, e trattiamo i clienti come partner, non come numeri.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        icon: Hammer, 
        title: "ETICA DEL FARE", 
        desc: "Lavorare duro, lavorare bene.",
        longDesc: "Non esistono scorciatoie. Esiste solo il lavoro ben fatto. Rispettiamo i tempi, rispettiamo i materiali e soprattutto rispettiamo la fiducia che ci viene data. Lavoriamo fino a quando il risultato non è perfetto, anche se significa restare in cantiere un'ora in più.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    },
    { 
        icon: Handshake, 
        title: "COSTRUTTORI DI FIDUCIA", 
        desc: "Partnership solide e durature.",
        longDesc: "Costruiamo strutture temporanee, ma relazioni che durano nel tempo. I nostri clienti tornano da noi anno dopo anno perché sanno che nel momento del bisogno, GF Service risponde sempre presente, risolvendo problemi invece di crearne.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
    },
];

const AllAbout: React.FC<AllAboutProps> = ({ onShowContact }) => {
  const [loaded, setLoaded] = useState(false);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Field Gallery Logic
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const [scrollParams, setScrollParams] = useState({ rotate: 25, offset: 0 });

  // Timeline Logic
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [itemPositions, setItemPositions] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoaded(true);

    // Gallery Scroll Handler
    const handleGalleryScroll = () => {
      if (!gallerySectionRef.current) return;
      const rect = gallerySectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const height = rect.height;
      const rawP = (winH - rect.top) / (winH + height);
      const p = Math.max(0, Math.min(1, rawP));

      setScrollParams({
        rotate: 25 - (p * 15), 
        offset: p * 400 
      });
    };

    // Timeline Scroll & Resize Handlers
    const updateTimelinePositions = () => {
        if (!timelineRef.current) return;
        const positions = itemsRef.current.map(el => {
            if (!el) return 0;
            // The dot is at top-6 (approx 24px)
            return el.offsetTop + 24; 
        });
        setItemPositions(positions);
    };

    const handleTimelineScroll = () => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        
        // Start filling the line when it hits 75% of viewport height
        const trigger = winH * 0.75;
        let relativeY = trigger - rect.top;
        
        if (relativeY < 0) relativeY = 0;
        
        setLineHeight(relativeY);
    };

    // Unified Scroll Listener
    const handleScroll = () => {
        handleGalleryScroll();
        handleTimelineScroll();
    };

    // Init Timeline
    setTimeout(updateTimelinePositions, 500); // Wait for layout
    window.addEventListener('resize', updateTimelinePositions);
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateTimelinePositions);
    };
  }, []);

  const handleValueClick = (index: number) => {
    if (activeValueIndex === index) {
        setActiveValueIndex(null); 
    } else {
        setActiveValueIndex(index);
        setTimeout(() => {
            if (detailRef.current) {
                detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
  };

  // Prepare columns for the new gallery
  const galleryCols = [
      [...photoLoopImages.slice(0, 4), ...photoLoopImages.slice(0, 2)], 
      [...photoLoopImages.slice(4, 8), ...photoLoopImages.slice(2, 4)],
      [...photoLoopImages.slice(0, 4).reverse(), ...photoLoopImages.slice(4, 6)],
      [...photoLoopImages.slice(4, 8).reverse(), ...photoLoopImages.slice(0, 2)]
  ];

  return (
    <section className="relative min-h-screen bg-gf-darker text-white selection:bg-gf-green selection:text-white pb-24 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gf-green/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* 1. VISION HEADER */}
      <div className={`relative pt-40 pb-24 container mx-auto px-6 text-center transition-all duration-1000 ease-out z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                <Users size={12} className="text-gf-green" />
                La Nostra Identità
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] max-w-6xl mx-auto mb-8 tracking-tighter">
              Costruiamo un <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Mondo</span> <br/>
              in cui ogni <span className="text-white">Comunità</span> <br/>
              ha uno <span className="italic font-serif font-light text-gray-400">Spazio</span> <br/>
              per <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Incontrarsi.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
             Più di semplici noleggiatori. Siamo architetti di momenti, <br className="hidden md:block"/> custodi di tradizioni e partner tecnici per chi sogna in grande.
          </p>
      </div>

      {/* 2. FIELD GALLERY */}
      <div 
        ref={gallerySectionRef} 
        className={`w-full relative z-10 overflow-hidden mb-32 h-[120vh] md:h-[150vh] flex items-center justify-center transition-all duration-1000 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
          {/* Rotated Container */}
          <div 
            className="w-[150vw] md:w-[120vw] grid grid-cols-4 gap-4 md:gap-6 origin-center will-change-transform"
            style={{
                transform: `rotate(${scrollParams.rotate}deg) scale(1.1)`,
                marginLeft: '-10vw' 
            }}
          >
              {galleryCols.map((colImages, colIndex) => {
                  const direction = colIndex % 2 === 0 ? -1 : 1;
                  const translateY = scrollParams.offset * direction;

                  return (
                    <div 
                        key={colIndex} 
                        className="flex flex-col gap-4 md:gap-6 will-change-transform"
                        style={{ transform: `translateY(${translateY}px)` }}
                    >
                        {colImages.map((img, imgIndex) => (
                            <div key={imgIndex} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden brightness-[0.6] hover:brightness-100 transition-all duration-500">
                                <img src={img} alt="Field work" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gf-green/10 mix-blend-overlay"></div>
                            </div>
                        ))}
                    </div>
                  );
              })}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-gf-darker/50 to-gf-darker"></div>
      </div>

      {/* 3. TIMELINE SECTION (Scroll-Driven) */}
      <div className="mb-32 relative container mx-auto px-6 z-10">
         <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">L'EVOLUZIONE</h2>
             <p className="text-gray-400 font-light">Un percorso costruito un evento alla volta.</p>
         </div>

         <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
             {/* Base Line */}
             <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"></div>
             
             {/* Animated Progress Line with Enhanced Gradient */}
             <div 
                className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-emerald-300 via-gf-green to-emerald-900 md:-translate-x-1/2 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(0,112,90,0.8)]"
                style={{ height: `${lineHeight}px`, maxHeight: '100%' }}
             ></div>

             {timelineEvents.map((ev, i) => {
                 const isReached = lineHeight >= (itemPositions[i] || 9999);
                 const isEven = i % 2 === 0; // Even index usually means reversed row (content left)

                 return (
                    <div 
                        key={i} 
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className={`relative flex flex-col md:flex-row gap-8 mb-12 md:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                         
                         {/* Spacer */}
                         <div className="hidden md:block w-1/2"></div>
    
                         {/* Timeline Node - The Circle */}
                         <div className={`absolute left-[20px] md:left-1/2 -translate-x-1/2 top-6 md:top-6 z-20 transition-all duration-500 ease-out ${isReached ? 'scale-125 opacity-100' : 'scale-0 opacity-0'}`}>
                            <div className={`w-3 h-3 rounded-full bg-gf-darker border-2 border-gf-green shadow-[0_0_15px_rgba(0,112,90,1)] ${isReached ? 'animate-pulse' : ''}`}></div>
                         </div>
    
                         {/* Content Card */}
                         <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                             <div 
                                className={`group relative transition-all duration-700 ease-out transform ${
                                    isReached 
                                        ? 'opacity-100 translate-x-0 translate-y-0' 
                                        : isEven 
                                            ? 'opacity-0 md:-translate-x-12 translate-y-8 md:translate-y-0' 
                                            : 'opacity-0 md:translate-x-12 translate-y-8 md:translate-y-0'
                                }`}
                             >
                                 <span className="block text-gf-green font-bold text-lg mb-1">{ev.year}</span>
                                 <h3 className="text-xl font-bold text-white mb-2">{ev.title}</h3>
                                 <p className="text-gray-400 text-sm leading-relaxed font-light">
                                     {ev.desc}
                                 </p>
                             </div>
                         </div>
                     </div>
                 );
             })}
         </div>
      </div>

      {/* NEW SECTION: CIOCIARIA CONNECTION */}
        <div className="container mx-auto px-6 mb-32 relative z-10">
            {/* Grid for Innovative Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                
                {/* Left: Text Content */}
                <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                        Territorio & Identità
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Le Nostre Radici: <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Un Legame Indissolubile</span> con la Ciociaria.
                    </h2>
                    <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed border-l-2 border-gf-green/30 pl-6">
                        <p>
                            Tutto ha avuto inizio qui, tra le colline e i borghi storici. Dai primi montaggi nei piccoli cortili alle grandi piazze, la nostra storia è intrecciata con quella della nostra terra.
                        </p>
                        <p className="font-medium text-white italic">
                            "La Ciociaria è una terra ricca di tradizioni radicate e un patrimonio culturale unico. Siamo orgogliosi e onorati di essere parte integrante di questa tradizione e di contribuire attivamente al suo sviluppo e futuro."
                        </p>
                    </div>
                </div>

                {/* Right: Innovative Visuals */}
                <div className="order-1 lg:order-2 relative h-[500px] w-full">
                    {/* Image 1: Main Shape */}
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-tl-[80px] rounded-br-[20px] overflow-hidden border border-white/10 shadow-2xl z-10">
                        <img src="https://images.unsplash.com/photo-1541363637657-b01ef46ad36f?q=80&w=1000&auto=format&fit=crop" alt="Ciociaria Landscape" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gf-green/20 mix-blend-multiply"></div>
                    </div>

                    {/* Image 2: Overlapping geometric cut */}
                    <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-full overflow-hidden border-4 border-gf-darker shadow-2xl z-20">
                        <img src="https://images.unsplash.com/photo-1596627685606-258614457787?q=80&w=1000&auto=format&fit=crop" alt="Local Craft" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gf-green/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10">
                        <MapPin className="text-white drop-shadow-lg" size={48} />
                    </div>
                </div>
            </div>

            {/* SUB-SECTION: CERTIFIED LOCAL IMPACT */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Il Nostro Contributo Certificato</h3>
                    <p className="text-gray-400 font-light">Un impegno concreto per la crescita del territorio.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Users size={40} className="text-gf-green" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">25+</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Nuove Assunzioni Locali</div>
                        <div className="text-[10px] text-gray-500 mt-1">(Ultimi 5 Anni)</div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <TrendingUp size={40} className="text-gf-green" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">€ 1.2M</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Investiti nel Territorio</div>
                        <div className="text-[10px] text-gray-500 mt-1">(Fornitori e Servizi Annui)</div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Heart size={40} className="text-gf-green" />
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">15+</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Progetti Sociali</div>
                        <div className="text-[10px] text-gray-500 mt-1">(Scuole e Associazioni)</div>
                    </div>
                </div>
            </div>
        </div>

      {/* 5. VALUES SECTION */}
      <div className="container mx-auto px-6 text-center mb-32 relative z-10">
          <div className="inline-block mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">I NOSTRI VALORI</h2>
              <div className="h-1 w-24 bg-gf-green mx-auto rounded-full"></div>
          </div>
          
          <p className="max-w-4xl mx-auto text-gray-300 mb-20 font-light text-lg leading-relaxed">
              Non siamo un'entità astratta. Siamo <span className="text-white font-medium">persone</span> che credono nel valore del lavoro ben fatto.
              Clicca su un valore per scoprire cosa significa per noi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {values.map((v, i) => {
                  const isActive = activeValueIndex === i;
                  return (
                    <button 
                        key={i} 
                        onClick={() => handleValueClick(i)}
                        className={`
                            flex flex-col items-center gap-6 p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-2 cursor-pointer
                            ${isActive 
                                ? 'bg-white/10 border-gf-green shadow-[0_0_30px_rgba(0,112,90,0.3)]' 
                                : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-gf-green/30'
                            }
                        `}
                    >
                        <div className={`
                            w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg relative overflow-hidden
                            ${isActive 
                                ? 'bg-gradient-to-br from-gf-green to-emerald-500 border-gf-green text-white' 
                                : 'bg-gf-darker border-white/10 text-gf-green group-hover:bg-gradient-to-br group-hover:from-gf-green group-hover:to-emerald-500 group-hover:text-white'
                            }
                        `}>
                            <v.icon size={28} strokeWidth={1.5} className="relative z-10" />
                        </div>
                        <div className="text-center w-full">
                            <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 h-8 flex items-center justify-center transition-colors ${isActive ? 'text-gf-green' : 'text-white'}`}>
                                {v.title}
                            </h3>
                            <div className={`w-8 h-[1px] mx-auto mb-3 transition-colors ${isActive ? 'bg-gf-green' : 'bg-white/20'}`}></div>
                            <p className="text-sm text-gray-400 font-light leading-snug group-hover:text-gray-300 transition-colors">
                                {v.desc}
                            </p>
                        </div>
                    </button>
                  );
              })}
          </div>

          <div 
            className={`transition-all duration-700 ease-in-out overflow-hidden ${activeValueIndex !== null ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
              {activeValueIndex !== null && (
                  <div ref={detailRef} className="relative rounded-3xl overflow-hidden bg-gf-darker border border-gf-green/30 shadow-2xl mx-auto max-w-6xl group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gf-green/10 to-transparent pointer-events-none"></div>
                    
                    <button 
                        onClick={() => setActiveValueIndex(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-gf-green rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div 
                            className="w-full md:w-5/12 min-h-[300px] md:min-h-[400px] bg-cover bg-center relative animate-fade-in" 
                            style={{backgroundImage: `url("${values[activeValueIndex].image}")`}}
                        >
                            <div className="absolute inset-0 bg-gf-darker/40 mix-blend-multiply"></div>
                        </div>
                        <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center text-left">
                            <div className="flex items-center gap-3 mb-6">
                                {React.createElement(values[activeValueIndex].icon, { className: "text-gf-green", size: 24 })}
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gf-green">Approfondimento</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight uppercase">
                                {values[activeValueIndex].title}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                                {values[activeValueIndex].longDesc}
                            </p>
                            <div className="h-1 w-20 bg-gf-green rounded-full"></div>
                        </div>
                    </div>
                  </div>
              )}
          </div>
      </div>

      {/* 6. TEAM SECTION */}
      <div className="mb-32 container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">IL TEAM</h2>
             <p className="text-gray-400 font-light">Professionisti che non temono la fatica.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {teamMembers.map((member, idx) => (
                 <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/5">
                     <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        style={{ backgroundImage: `url("${member.image}")` }}
                     ></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                     
                     <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                         <h3 className="text-xl font-bold text-white leading-none mb-1">{member.name}</h3>
                         <p className="text-gf-green font-bold text-[10px] uppercase tracking-widest mb-3">{member.role}</p>
                         <p className="text-gray-300 text-xs italic border-l border-white/30 pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                             "{member.quote}"
                         </p>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      {/* 7. CERTIFICATIONS & CTA */}
      <div className="container mx-auto px-6 relative z-10">
          <div className="relative bg-gradient-to-br from-emerald-950 via-gf-green to-emerald-500 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_50px_-12px_rgba(0,112,90,0.5)] overflow-hidden">
              
              {/* Added texture and glows for depth */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[60px] -ml-16 -mb-16 pointer-events-none"></div>

              <div className="relative z-10 max-w-xl text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">Qualità Certificata.</h3>
                  <p className="text-emerald-100 mb-6 leading-relaxed font-light text-lg">
                      Operiamo nel pieno rispetto delle normative UNI EN 13782. <br/>
                      Sicurezza, documentazione e conformità sono incluse in ogni preventivo.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      {["ISO 9001", "UNI EN 13782", "SOA OS6"].map((cert) => (
                          <span key={cert} className="flex items-center gap-2 px-3 py-1 bg-black/10 rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md">
                              <CheckCircle size={12} className="text-white" /> {cert}
                          </span>
                      ))}
                  </div>
              </div>

              <div className="relative z-10">
                  <button 
                    onClick={onShowContact}
                    className="group bg-white text-gf-green px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gf-darker hover:text-white transition-all shadow-lg flex items-center gap-3"
                  >
                      Lavora con noi <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
      </div>

    </section>
  );
};

export default AllAbout;