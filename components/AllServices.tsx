
import React, { useEffect, useRef, useState } from 'react';
import { Layers, Zap, Layout, ArrowRight, Gamepad2, X, ChevronRight, Phone, Mail, CheckCircle2, Info, ShieldCheck, ClipboardList } from 'lucide-react';

interface SubProduct {
    name: string;
    image: string;
    description?: string;
}

interface ServiceItem {
    name: string;
    desc: string;
    specs: string;
    image: string;
    subProducts?: SubProduct[];
    longDesc?: string;
}

interface Category {
    id: string;
    title: string;
    shortTitle: string; 
    subtitle: string;
    description: string;
    icon: React.ElementType;
    items: ServiceItem[];
}

interface AllServicesProps {
  onShowContact?: () => void;
}

const categories: Category[] = [
  {
    id: "strutture",
    title: "Coperture e Strutture",
    shortTitle: "Strutture",
    subtitle: "Soluzioni di Noleggio Spazi",
    description: "La base del tuo evento. Strutture modulari certificate a noleggio per garantire sicurezza e protezione in ogni condizione climatica.",
    icon: Layers,
    items: [
      { 
        name: "Tendostrutture", 
        desc: "Modulari, formate da campate 5x10m estendibili fino a 20x25 o 10x50.", 
        specs: "Cert. UNI EN 13782", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png",
        longDesc: "Le nostre tendostrutture a noleggio rappresentano la soluzione definitiva per grandi eventi. La struttura è formata da campate modulari 5x10 metri, che permettono configurazioni flessibili ed estendibili fino a dimensioni di 20x25m oppure 10x50m, garantendo sempre uno spazio libero da colonne interne.",
        subProducts: [
            { name: "Modulo 25x20", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png", description: "Ampia superficie di 500mq ideale per grandi eventi, concerti e festival." },
            { name: "Modulo 25x10", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", description: "Soluzione versatile di 250mq per conferenze, aree ristorazione o esposizioni." }
        ]
      },
      { 
        name: "Gazebo Stand", 
        desc: "Moduli professionali disponibili nelle misure 3x3, 4x4 e 5x5 metri.", 
        specs: "PVC Ignifugo CL.2", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767200031/gazebo_rojc8v.png",
        longDesc: "I nostri gazebo professionali a noleggio sono disponibili nelle dimensioni 3x3m, 4x4m e 5x5m per adattarsi a qualsiasi esigenza. La struttura in alluminio anodizzato garantisce leggerezza e una velocità di montaggio/smontaggio imbattibile.",
        subProducts: [
            { name: "Variante Aperta", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767200031/gazebo_rojc8v.png", description: "Solo copertura superiore, ideale per ombreggiatura e stand aperti." },
            { name: "Variante Chiusa", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767200849/gazebo_imzwpf.png", description: "Dotata di pareti laterali per protezione totale da vento e pioggia." }
        ]
      },
      { 
        name: "Casette in Legno", 
        desc: "Strutture tipiche: dimensioni 3x2 e 6x2.", 
        specs: "Legno Trattato", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766593979/casetta_orizzontale_qvazqd.png",
        longDesc: "Disponibili a noleggio, le nostre casette in legno offrono quell'atmosfera calda e tradizionale perfetta per i villaggi natalizi o fiere dell'artigianato. Fornite complete di bancone e impianto elettrico base su richiesta.",
        subProducts: [
            { name: "Casetta Standard 3x2", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766593979/casetta_orizzontale_qvazqd.png", description: "Perfetta per piccoli artigiani o somministrazione food veloce." },
            { name: "Casetta Maxi 6x2", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766596122/casetta_doppia_orizzontale_fbrpbz.png", description: "Doppio modulo per un ampio spazio espositivo e grande visibilità." }
        ]
      }
    ]
  },
  {
    id: "arredi",
    title: "Sedute e Arredi",
    shortTitle: "Arredi",
    subtitle: "Design & Comfort a Noleggio",
    description: "Una selezione curata di sedute ed elementi d'arredo a noleggio per definire lo stile e il carattere del tuo evento.",
    icon: Layout,
    items: [
      { 
        name: "Gruvyer Arm Nera", 
        desc: "Design contemporaneo in polipropilene forato. Ergonomica e resistente.", 
        specs: "Noleggio Moderno", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766960356/Gemini_Generated_Image_qnvzirqnvzirqnvz_iudrxn.png",
        longDesc: "La sedia Gruvyer Arm a noleggio è un'icona del design contemporaneo. La sua trama forata garantisce leggerezza e traspirabilità. Realizzata in polipropilene di alta qualità, è perfetta per buffet dinamici e aree relax moderne."
      },
      { 
        name: "Chiavarina Bianca", 
        desc: "L'eleganza classica per cerimonie e matrimoni d'alta classe.", 
        specs: "Noleggio Luxury", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766960656/sedia_bianca_matrimonio_oi8pvg.png",
        longDesc: "Sinonimo di evento esclusivo, noleggiamo la sedia Chiavarina in bianco ottico per esaltare matrimoni e cene di gala. La struttura è leggera ma estremamente solida, ideale per allestimenti eleganti su grandi numeri."
      },
      { 
        name: "Elegant Black Classic", 
        desc: "Seduta formale e raffinata per gala, congressi ed eventi istituzionali.", 
        specs: "Noleggio Corporate", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766960909/sedia_nera_in_propilene_rhvjfi.png",
        longDesc: "La soluzione ideale a noleggio per contesti professionali, platee congressuali ed eventi istituzionali. Silhouette pulita in nero profondo per un'immagine sobria ed impeccabile."
      },
      { 
        name: "Set Birreria", 
        desc: "Set con tavolo e panche. Misure tavoli: 220x80 e 220x60.", 
        specs: "Noleggio Sagre", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766596785/tavolo_220_80_egkszg.png",
        longDesc: "Il nostro set birreria a noleggio è lo standard per le feste di piazza. Realizzato in abete di prima scelta con verniciatura protettiva, è disponibile in due varianti per adattarsi ai tuoi spazi.",
        subProducts: [
            { name: "Set con Tavolo 220x80", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766596785/tavolo_220_80_egkszg.png", description: "Il formato classico, ampio e confortevole." },
            { name: "Set con Tavolo 220x60", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766596785/tavolo_220_80_egkszg.png", description: "Variante più stretta, ideale per ottimizzare gli spazi." }
        ]
      }
    ]
  },
  {
    id: "logistica",
    title: "Dettagli Tecnici",
    shortTitle: "Tecnica",
    subtitle: "Impianti & Logistica",
    description: "Il cuore tecnologico dell'evento. Sistemi di riscaldamento, energia, illuminazione e spillatura professionale disponibili a noleggio.",
    icon: Zap,
    items: [
      { 
        name: "Impianti Spina", 
        desc: "Sistemi di spillatura mobili professionali.", 
        specs: "Noleggio Beverage", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767279264/Spillatori_home_page_vwleui.png",
        longDesc: "Portiamo l'efficienza di un bar professionale nel tuo evento con i nostri impianti spina a noleggio. Sistemi pre-refrigerati che garantiscono una spillatura perfetta anche in condizioni di alto afflusso continuo.",
        // subProducts rimosso come richiesto
      },
      { 
        name: "Riscaldamento", 
        desc: "Generatori aria calda e funghi riscaldanti.", 
        specs: "Comfort Termico", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767202501/fungo_vymbq5.png",
        longDesc: "Noleggiamo sistemi di riscaldamento scalabili per ogni volume. Dai generatori industriali canalizzati per grandi tendostrutture ai funghi a gas per dehor e aree fumatori esterne.",
        subProducts: [
            { name: "Fungo a Gas", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767202501/fungo_vymbq5.png", description: "Design elegante e calore immediato per aree open-air." },
            { name: "Generatore Aria Calda", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767280025/Cannone_aria_il2fdm.png", description: "Sistema a gasolio/elettrico canalizzato per riscaldamento omogeneo." }
        ]
      },
      { 
        name: "Illuminazione", 
        desc: "Lampadine e plafoniere LED funzionali.", 
        specs: "Noleggio Lighting", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767371201/Luci_rqa0b0.png",
        longDesc: "Soluzioni di illuminazione semplici ed efficaci per i tuoi spazi. Forniamo catenarie con lampadine LED per una luce diffusa e plafoniere LED per un'illuminazione tecnica omogenea.",
        // subProducts rimosso e descrizione semplificata come richiesto
      },
      { 
        name: "Palco & Pavimentazioni", 
        desc: "Palchi modulari e pavimentazioni in legno.", 
        specs: "Certificazioni Statiche", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427546/palchetto_2_pzbl66.jpg",
        longDesc: "Noleggio di palchi modulari certificati per carichi pesanti e pedane espositive. Le nostre pavimentazioni in legno permettono di livellare superfici sconnesse e isolare termicamente le tendostrutture.",
        subProducts: [
            { name: "Pedana 7x5", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427546/palchetto_2_pzbl66.jpg", description: "Modulo base antiscivolo per palchi di ogni altezza e dimensione." },
            { name: "Pavimentazione Legno", image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767200816/WhatsApp_Image_2025-12-31_at_18.05.36_glslsw.jpg", description: "Listoni di abete ad incastro per coperture integrali del suolo." }
        ]
      }
    ]
  },
  {
    id: "fun",
    title: "Area Fun",
    shortTitle: "Fun",
    subtitle: "Noleggio Giochi & Svago",
    description: "Intrattenimento per ogni età. Noleggio di grandi classici da bar e attrazioni vintage certificate.",
    icon: Gamepad2,
    items: [
      { 
        name: "Giochi Classici", 
        desc: "Biliardi, Calciobalilla, Freccette.", 
        specs: "Noleggio Intrattenimento", 
        image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=1000&auto=format&fit=crop",
        longDesc: "Portiamo il divertimento nel tuo evento con il noleggio di calciobalilla professionali da torneo e biliardi. Attrezzature robuste studiate per resistere all'uso intensivo in luoghi pubblici.",
        subProducts: [
            { name: "Calciobalilla Pro", image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=1000&auto=format&fit=crop", description: "Modello professionale con piano in vetro e aste rientranti di sicurezza." },
            { name: "Tavolo Freccette", image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=1000&auto=format&fit=crop", description: "Bersaglio elettronico con sistema di conteggio automatico dei punti." }
        ]
      },
      { 
        name: "Arcade & Vintage", 
        desc: "Flipper e Macchine Multigioco.", 
        specs: "Noleggio Retrogaming", 
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        longDesc: "Il fascino del vintage a noleggio. Offriamo flipper restaurati e cabinet arcade Bartop con migliaia di giochi pre-caricati, ideali per feste a tema o zone relax aziendali.",
        subProducts: [
            { name: "Flipper 80s", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", description: "Modelli originali revisionati per un'esperienza di gioco autentica." },
            { name: "Bartop Arcade", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", description: "Mobile compatto con schermo LED e controlli professionali." }
        ]
      },
      { 
        name: "Area Bimbi", 
        desc: "Dondoli e attrazioni a gettone.", 
        specs: "Certificazioni CE", 
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
        longDesc: "Noleggio di dondoli e giochi a molla per creare aree dedicate ai più piccoli. Tutte le attrazioni sono regolarmente manutenute e fornite di certificazione di sicurezza CE.",
        subProducts: [
            { name: "Dondolo Pony", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", description: "Attrazione a gettone per bambini fino a 6 anni." },
            { name: "Gioco a Molla", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", description: "Struttura certificata EN 1176 per aree gioco temporanee." }
        ]
      }
    ]
  }
];

const AllServices: React.FC<AllServicesProps> = ({ onShowContact }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [loaded, setLoaded] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    
    const [activeCarouselIndices, setActiveCarouselIndices] = useState<Record<string, number>>(
        Object.fromEntries(categories.map(c => [c.id, 0]))
    );

    const [scrolledCategories, setScrolledCategories] = useState<Record<string, boolean>>(
        Object.fromEntries(categories.map(c => [c.id, false]))
    );

    const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio < 0.95) {
                    setShowMobileNav(true);
                } else {
                    setShowMobileNav(false);
                    setActiveCategory(categories[0].id);
                }
            },
            { threshold: [0.95] }
        );

        const categoryObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id && categories.some(c => c.id === id)) {
                            setActiveCategory(id);
                        }
                    }
                });
            },
            { threshold: 0.7 }
        );
        
        const headerEl = document.getElementById('catalog-header');
        if (headerEl) headerObserver.observe(headerEl);

        categories.forEach(cat => {
            const el = document.getElementById(cat.id);
            if (el) categoryObserver.observe(el);
        });

        return () => {
            headerObserver.disconnect();
            categoryObserver.disconnect();
        };
    }, []);

    const handleCarouselScroll = (categoryId: string) => {
        const container = carouselRefs.current[categoryId];
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        
        if (scrollLeft > 5 && !scrolledCategories[categoryId]) {
            setScrolledCategories(prev => ({ ...prev, [categoryId]: true }));
        }

        const cardWidth = container.offsetWidth * 0.85;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveCarouselIndices(prev => ({ ...prev, [categoryId]: index }));
    };

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleItemClick = (item: ServiceItem) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <section className="relative h-screen lg:h-auto text-white overflow-hidden lg:overflow-visible bg-black">
             
             <div className="fixed inset-0 z-0 pointer-events-none">
                 {categories.map((cat) => (
                    cat.items.map((item, idx) => (
                        <div 
                            key={`${cat.id}-${item.name}-${idx}`}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${hoveredImage === item.image ? 'opacity-60 scale-110' : 'opacity-0 scale-100'}`}
                            style={{ 
                                backgroundImage: `url("${item.image}")`,
                                filter: 'blur(80px) saturate(1.5)', 
                            }}
                        />
                    ))
                 ))}
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/80 to-[#022c24]/90"></div>
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
             </div>

             <div 
                className={`
                    lg:hidden fixed top-[80px] left-0 right-0 z-[50] w-full px-4 pt-4 pb-2 transition-all duration-[400ms] ease-out
                    ${showMobileNav 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-[40vh] scale-95 pointer-events-none'}
                `}
             >
                <div className="max-w-md mx-auto flex items-center justify-center gap-2 p-1.5 bg-black/70 border border-white/10 backdrop-blur-2xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    {categories.map((cat) => (
                        <button
                            key={`mob-nav-${cat.id}`}
                            onClick={() => scrollToCategory(cat.id)}
                            className={`
                                flex-1 px-3 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap
                                ${activeCategory === cat.id 
                                    ? 'bg-gf-green text-white shadow-lg scale-105' 
                                    : 'text-gray-400 hover:text-white'
                                }
                            `}
                        >
                            {cat.shortTitle}
                        </button>
                    ))}
                </div>
             </div>

             <div className="relative z-10 h-full lg:h-auto overflow-y-auto lg:overflow-visible snap-y snap-mandatory lg:snap-none scroll-smooth">
                 
                 <div id="catalog-header" className="snap-start h-screen flex flex-col justify-center items-center text-center px-6 lg:h-auto lg:pt-32 lg:pb-12">
                     <div className={`max-w-4xl transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Catalogo Noleggio</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
                            IL NOSTRO <span className="font-serif italic text-gf-green font-light uppercase">CATALOGO</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            Esplora la nostra gamma completa di attrezzature a noleggio, certificate per eventi professionali di ogni dimensione.
                        </p>
                        
                        <div className={`lg:hidden mt-20 flex flex-col items-center transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="relative flex flex-col items-center gap-4">
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gf-green animate-pulse">
                                    Scorri Catalogo
                                </span>
                                <div className="relative w-[2px] h-20 bg-white/10 overflow-hidden rounded-full shadow-[0_0_10px_rgba(0,112,90,0.2)]">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gf-green origin-top animate-scrollLine"></div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>

                 <div className="container mx-auto px-6 lg:flex lg:flex-row lg:gap-16 lg:items-start">
                    
                    <aside className={`hidden lg:block lg:w-1/4 sticky top-32 transition-all duration-1000 ease-out delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-opacity-50">Indice Noleggio</h3>
                            <ul className="space-y-1">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => scrollToCategory(cat.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition-all duration-300 relative overflow-hidden ${activeCategory === cat.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            <div className={`absolute inset-0 bg-gf-green transition-transform duration-300 origin-left ${activeCategory === cat.id ? 'scale-x-100 opacity-20' : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-10'}`}></div>
                                            <span className="flex items-center gap-3 relative z-10">
                                                <cat.icon size={16} className={activeCategory === cat.id ? 'text-gf-green' : 'text-gray-500 group-hover:text-gray-300'} />
                                                <span className="font-medium text-sm tracking-wide">{cat.title}</span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className="w-full lg:w-3/4 flex flex-col pb-20">
                        {categories.map((cat) => (
                            <div 
                                id={cat.id} 
                                key={cat.id} 
                                className="snap-start h-screen flex flex-col justify-center pt-[160px] lg:h-auto lg:pt-0 lg:mb-32"
                            >
                                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8 lg:mb-10 pb-6 border-b border-white/5 relative">
                                    <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gf-green"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gf-green/20 flex items-center justify-center text-gf-green backdrop-blur-sm border border-gf-green/30">
                                            <cat.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-none mb-1 uppercase tracking-tight">{cat.title}</h3>
                                            <p className="text-gf-green font-serif italic">{cat.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group/carousel">
                                    <div 
                                        ref={el => { carouselRefs.current[cat.id] = el; }}
                                        onScroll={() => handleCarouselScroll(cat.id)}
                                        className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-6 px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0 scrollbar-hide"
                                    >
                                        {cat.items.map((item, i) => (
                                            <div 
                                                key={`${cat.id}-item-${i}`} 
                                                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center lg:snap-align-none"
                                                onMouseEnter={() => setHoveredImage(item.image)}
                                                onMouseLeave={() => setHoveredImage(null)}
                                            >
                                                <div 
                                                    onClick={() => handleItemClick(item)}
                                                    className="group relative h-[250px] lg:h-[320px] rounded-2xl overflow-hidden border border-white/10 hover:border-gf-green/50 transition-all duration-500 shadow-2xl cursor-pointer"
                                                >
                                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 lg:group-hover:scale-110" style={{ backgroundImage: `url("${item.image}")` }}>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-60"></div>
                                                    </div>
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 group-hover:border-gf-green/30">
                                                            {item.specs}
                                                        </span>
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full z-20">
                                                        <div className="lg:transform lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                                                            <h4 className="text-white font-bold text-xl lg:text-2xl mb-1 group-hover:text-gf-green transition-colors leading-none uppercase drop-shadow-md flex items-center gap-2">
                                                                {item.name}
                                                                <ChevronRight size={18} className="text-gf-green animate-pulse" />
                                                            </h4>
                                                            <div className="h-[2px] bg-gf-green w-12 mb-2 lg:w-0 lg:group-hover:w-12 transition-all duration-500"></div>
                                                            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed font-light lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="lg:hidden flex justify-center items-center gap-2 mt-6">
                                        {cat.items.map((_, dotIdx) => (
                                            <div 
                                                key={`dot-${cat.id}-${dotIdx}`}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${activeCarouselIndices[cat.id] === dotIdx ? 'w-6 bg-gf-green' : 'w-2 bg-white/20'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="snap-start mt-20 md:mt-32">
                            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gf-green/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                                
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">Pronto per il <span className="text-gf-green italic font-serif lowercase">noleggio?</span></h3>
                                        <p className="text-gray-400 font-light mb-8 max-w-md">Contatta il nostro team tecnico per un preventivo di noleggio personalizzato per il tuo evento. Gestiamo ogni fase: dal sopralluogo al montaggio.</p>
                                        
                                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                            <a href="tel:+393331234567" className="flex items-center gap-3 text-white hover:text-gf-green transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Phone size={18} /></div>
                                                <span className="font-bold text-sm tracking-widest">+39 333 123 4567</span>
                                            </a>
                                            <a href="mailto:info@maluservice.it" className="flex items-center gap-3 text-white hover:text-gf-green transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Mail size={18} /></div>
                                                <span className="font-bold text-sm tracking-widest">info@maluservice.it</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full md:w-auto">
                                        <button 
                                            onClick={onShowContact}
                                            className="w-full md:w-auto bg-gf-green hover:bg-emerald-600 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group/btn"
                                        >
                                            Preventivo Noleggio <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>

             {/* SCHEDA TECNICA POP-UP (MODAL) */}
             {selectedItem && (
                <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" onClick={closeModal}></div>
                    <div className="relative bg-gf-darker border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden shadow-[0_0_50px_rgba(0,112,90,0.3)] flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
                         {/* Header Modal */}
                         <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-gf-darker/50 backdrop-blur-md relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gf-green/20 flex items-center justify-center text-gf-green border border-gf-green/30">
                                    <ClipboardList size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white leading-none uppercase tracking-tight">{selectedItem.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gf-green bg-gf-green/10 px-2 py-0.5 rounded">{selectedItem.specs}</span>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Servizio: Noleggio Professionale</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={closeModal} className="w-12 h-12 rounded-full bg-white/5 hover:bg-gf-green hover:rotate-90 transition-all duration-300 flex items-center justify-center text-white/50 hover:text-white group border border-white/10 shadow-lg">
                                <X size={24} />
                            </button>
                         </div>

                         {/* Content Modal */}
                         <div className="relative z-10 flex-1 overflow-y-auto">
                            <div className="p-6 md:p-10">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    {/* Product Visual */}
                                    <div className="lg:col-span-5">
                                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                            <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 flex gap-2">
                                                <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10"><Info size={16} className="text-gf-green" /></div>
                                                <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10"><ShieldCheck size={16} className="text-gf-green" /></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="lg:col-span-7 flex flex-col justify-center">
                                        <div className="mb-8">
                                            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-gf-green mb-4">Specifiche Noleggio</h4>
                                            <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
                                                {selectedItem.longDesc || selectedItem.desc}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gf-green/30 transition-all">
                                                    <CheckCircle2 size={18} className="text-gf-green" />
                                                    <span className="text-sm text-gray-400">Materiale certificato e sicuro</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gf-green/30 transition-all">
                                                    <CheckCircle2 size={18} className="text-gf-green" />
                                                    <span className="text-sm text-gray-400">Logistica e trasporto inclusi</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gf-green/30 transition-all">
                                                    <CheckCircle2 size={18} className="text-gf-green" />
                                                    <span className="text-sm text-gray-400">Assistenza montaggio h24</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gf-green/30 transition-all">
                                                    <CheckCircle2 size={18} className="text-gf-green" />
                                                    <span className="text-sm text-gray-400">Quotazione personalizzata</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* CTA Footer inside modal */}
                                        <div className="pt-6 border-t border-white/10 mt-4 flex flex-col sm:flex-row gap-4">
                                            <button 
                                                onClick={() => { closeModal(); onShowContact?.(); }}
                                                className="flex-1 bg-gf-green hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all flex items-center justify-center gap-3 group"
                                            >
                                                Preventivo Noleggio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <a href="tel:+393331234567" className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-3 transition-all">
                                                <Phone size={18} />
                                                <span className="font-bold text-sm tracking-widest">Chiama ora</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Sezione Componenti (Se presenti sub-prodotti) */}
                                {selectedItem.subProducts && selectedItem.subProducts.length > 0 && (
                                    <div className="mt-16 pt-12 border-t border-white/10">
                                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-10 text-center">Varianti e Accessori Disponibili a Noleggio</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {selectedItem.subProducts.map((prod, idx) => (
                                                <div key={idx} className="group relative bg-black/30 border border-white/5 rounded-2xl overflow-hidden hover:border-gf-green/50 transition-all duration-300">
                                                    <div className="relative h-48 overflow-hidden">
                                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${prod.image}")` }}></div>
                                                        <div className="absolute inset-0 bg-black/40"></div>
                                                    </div>
                                                    <div className="p-6">
                                                        <h5 className="text-lg font-bold text-white mb-2 group-hover:text-gf-green transition-colors">{prod.name}</h5>
                                                        <p className="text-sm text-gray-400 font-light leading-relaxed">{prod.description || "Soluzione ideale per allestimenti esclusivi."}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                         </div>
                    </div>
                </div>
             )}
             
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes slideUp {
                    0% { transform: translateY(50px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes scrollLine {
                    0% { transform: scaleY(0); transform-origin: top; }
                    40% { transform: scaleY(1); transform-origin: top; }
                    41% { transform: scaleY(1); transform-origin: bottom; }
                    80% { transform: scaleY(0); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: top; }
                }
                .animate-scrollLine {
                    animation: scrollLine 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }
                @keyframes swipeArrowIconSmall {
                    0% { transform: translateX(-5px); opacity: 0.3; }
                    50% { transform: translateX(5px); opacity: 1; }
                    100% { transform: translateX(-5px); opacity: 0.3; }
                }
                .animate-swipeArrowIconSmall {
                    animation: swipeArrowIconSmall 2s ease-in-out infinite;
                }
             `}</style>
        </section>
    );
}

export default AllServices;
