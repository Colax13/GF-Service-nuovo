
import React, { useEffect, useState, useRef } from 'react';
import { Clock, Users, ShieldCheck, Award, Target, ArrowRight, CheckCircle, Hammer, Handshake, MapPin, DraftingCompass, Truck, Calendar } from 'lucide-react';

interface AllAboutProps {
  onShowContact?: () => void;
}

const timelineEvents = [
  {
    year: "2006",
    title: "Le Fondamenta",
    desc: "Malù Service and Games nasce in un piccolo magazzino di Frosinone. Una sola squadra, un furgone e i primi kit da birreria per feste patronali.",
    icon:  Clock
  },
  {
    year: "2010",
    title: "Il Primo Salto",
    desc: "Acquisizione delle prime coperture e integrazione del settore beverage. Cominciamo a lavorare in tutta la provincia.",
    icon: Target
  },
  {
    year: "2020",
    title: "Strutture Grandi Eventi",
    desc: "Ingresso nel mercato dei grandi eventi pubblici. Arrivano le tendostrutture e i palchi modulari, l'offerta si amplia.",
    icon: Award
  },
  {
    year: "2024",
    title: "Le collaborazioni strategiche",
    desc: "Inizio di collaborazioni nazionali e internazionali e la nomina a partner tecnico per Street Food International",
    icon: ShieldCheck
  },
  {
    year: "2025",
    title: "Visone futura",
    desc: "Oggi con lo sviluppo delle casette di legno, ridefiano il concetto di service tecnico, puntando a essere leader nel centro Italia",
    icon: Users
  }
];

// Images for the gallery
const photoLoopImages = [
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427559/impianti_eetito.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432825/20251205_155327_zomoet.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427559/impianti_eetito.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766430190/cover_q7wcxz.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427527/giochi_1_zwzbxj.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016453/1765739385298_i6e0d3.jpg",
    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427539/struttura_interna_1_iaz1ji.jpg",
];

// The 5 Specific Values - Visual Only
const values = [
    { 
        icon: MapPin, 
        title: "ORGOGLIO TERRITORIALE", 
        desc: "Radici locali, visione nazionale.",
    },
    { 
        icon: DraftingCompass, 
        title: "PRECISIONE", 
        desc: "Il dettaglio è la nostra ossessione.",
    },
    { 
        icon: Users, 
        title: "UMANITÀ", 
        desc: "Persone prima delle strutture.",
    },
    { 
        icon: Hammer, 
        title: "ETICA DEL FARE", 
        desc: "Lavorare duro, lavorare bene.",
    },
    { 
        icon: Handshake, 
        title: "COSTRUTTORI DI FIDUCIA", 
        desc: "Partnership solide e durature.",
    },
];

const AllAbout: React.FC<AllAboutProps> = ({ onShowContact }) => {
  const [loaded, setLoaded] = useState(false);

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

  // Prepare columns for the new gallery
  const galleryCols = [
      [...photoLoopImages.slice(0, 4), ...photoLoopImages.slice(0, 2)], 
      [...photoLoopImages.slice(4, 8), ...photoLoopImages.slice(2, 4)],
      [...photoLoopImages.slice(0, 4).reverse(), ...photoLoopImages.slice(4, 6)],
      [...photoLoopImages.slice(4, 8).reverse(), ...photoLoopImages.slice(0, 2)]
  ];

  return (
    <section className="relative min-h-screen bg-gf-darker text-white selection:bg-gf-green selection:text-white pb-24 overflow-hidden">
      
      {/* Background Ambience - Unified with Services and Projects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
          {/* Dynamic blurred glow blobs */}
          <div className="absolute top-[-10%] -right-[10%] w-[70vw] h-[70vw] bg-gf-green/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] -left-[10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[100px]"></div>
          
          {/* The core gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/90 to-[#022c24]/95"></div>
          
          {/* Noise texture */}
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
             Più di semplici noleggiatori. Siamo architetti di momenti, <br className="hidden md:block" /> custodi di tradizioni e partner tecnici per chi sogna in grande.
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
                        <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203050/Picinisco-1_irrxjh.jpg" alt="Ciociaria Landscape" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gf-green/20 mix-blend-multiply"></div>
                    </div>

                    {/* Image 2: Overlapping geometric cut */}
                    <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-full overflow-hidden border-4 border-gf-darker shadow-2xl z-20">
                        <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203566/camion_z0qlfj.png" alt="Malù all'opera" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gf-green/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10">
                        <MapPin className="text-white drop-shadow-lg" size={48} />
                    </div>
                </div>
            </div>

            {/* SUB-SECTION: NEW NUMBERS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">I NOSTRI NUMERI SUL TERRITORIO</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Calendar size={40} className="text-gf-green" />
                        </div>
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">OLTRE</div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">3.000</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Eventi Sostenuti</div>
                        <div className="text-[10px] text-gray-500 mt-1">Nei Borghi della Ciociaria</div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Users size={40} className="text-gf-green" />
                        </div>
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">OLTRE</div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">300.000</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Persone Accolte</div>
                        <div className="text-[10px] text-gray-500 mt-1">Nelle Nostre Strutture</div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <MapPin size={40} className="text-gf-green" />
                        </div>
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest text-transparent">.</div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">+70</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Comuni Supportati</div>
                        <div className="text-[10px] text-gray-500 mt-1">E Valorizzati</div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/5 hover:border-gf-green/30 transition-all group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Truck size={40} className="text-gf-green" />
                        </div>
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">OLTRE</div>
                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-gf-green transition-colors">1.200</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">KM Percorsi</div>
                        <div className="text-[10px] text-gray-500 mt-1">Ogni Anno per Sostenere Eventi</div>
                    </div>
                </div>
            </div>
        </div>

      {/* 5. VALUES SECTION - STATIC (No opening cards) */}
      <div className="container mx-auto px-6 text-center mb-32 relative z-10">
          <div className="inline-block mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">I NOSTRI VALORI</h2>
              <div className="h-1 w-24 bg-gf-green mx-auto rounded-full"></div>
          </div>
          
          <p className="max-w-4xl mx-auto text-gray-300 mb-20 font-light text-lg leading-relaxed">
              Non siamo un'entità astratta. Siamo <span className="text-white font-medium">persone</span> che credono nel valore del lavoro ben fatto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {values.map((v, i) => {
                  return (
                    <div 
                        key={i} 
                        className="flex flex-col items-center gap-6 p-6 rounded-2xl border bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-gf-green/30 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg relative overflow-hidden bg-gf-darker border-white/10 text-gf-green group-hover:bg-gradient-to-br group-hover:from-gf-green group-hover:to-emerald-500 group-hover:text-white">
                            <v.icon size={28} strokeWidth={1.5} className="relative z-10" />
                        </div>
                        <div className="text-center w-full">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-2 h-8 flex items-center justify-center text-white">
                                {v.title}
                            </h3>
                            <div className="w-8 h-[1px] mx-auto mb-3 bg-white/20"></div>
                            <p className="text-sm text-gray-400 font-light leading-snug group-hover:text-gray-300 transition-colors">
                                {v.desc}
                            </p>
                        </div>
                    </div>
                  );
              })}
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
