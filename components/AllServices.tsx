import React, { useEffect, useState } from 'react';
import { Package, Layers, Zap, Layout, ArrowRight, Gamepad2, X, ChevronRight } from 'lucide-react';
import Contact from './Contact';

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
}

interface Category {
    id: string;
    title: string;
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
    subtitle: "Spazi & Protezione",
    description: "La base del tuo evento. Strutture modulari certificate per garantire sicurezza e protezione in ogni condizione, dal piccolo stand alla grande area hospitality.",
    icon: Layers,
    items: [
      { 
        name: "Tendostrutture", 
        desc: "Modulari, campata singola 10x10m estensibile.", 
        specs: "Cert. UNI EN 13782", 
        image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766517692/Gemini_Generated_Image_5pvrz25pvrz25pvr_xszzdt.png",
        subProducts: [
            { 
                name: "Coperture Classiche", 
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766517692/Gemini_Generated_Image_5pvrz25pvrz25pvr_xszzdt.png",
                description: "PVC bianco oscurante, ideale per conferenze e cene di gala."
            },
            { 
                name: "Coperture Trasparenti", 
                image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
                description: "Teli Crystal panoramici per immergersi nella location circostante."
            },
            { 
                name: "Con Corridoi Laterali", 
                image: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?q=80&w=2069&auto=format&fit=crop",
                description: "Ampliamento laterale della struttura principale (es. estensione fino a 50x28m) per massimizzare lo spazio coperto."
            }
        ]
      },
      { 
        name: "Gazebo Stand", 
        desc: "Soluzioni modulari disponibili in varie misure: 3x3, 4x4, 5x5, 6x6, 7x7.", 
        specs: "PVC Ignifugo CL.2", 
        image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop",
        subProducts: [
            {
                name: "Gazebo 3x3m",
                image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop",
                description: "Ideale per piccoli stand o punti informativi."
            },
            {
                name: "Gazebo 4x4m",
                image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop",
                description: "Spazio equilibrato per esposizioni e vendita."
            },
            {
                name: "Gazebo 5x5m",
                image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
                description: "Perfetto per aree catering e accoglienza."
            },
            {
                name: "Gazebo 6x6m",
                image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
                description: "Ampia superficie per hospitality e grandi stand."
            },
            {
                name: "Gazebo 7x7m",
                image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
                description: "Massima capienza per eventi di rilievo."
            }
        ]
      },
      { 
        name: "Casette in Legno", 
        desc: "Strutture tipiche per mercatini ed esposizioni.", 
        specs: "Legno Trattato", 
        image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
        subProducts: [
            {
                name: "Casetta 3x4m",
                image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
                description: "Modulo classico per mercatini e biglietterie."
            },
            {
                name: "Casetta 3x8m",
                image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2000&auto=format&fit=crop",
                description: "Doppio modulo per bar temporanei o grandi esposizioni."
            }
        ]
      }
    ]
  },
  {
    id: "arredi",
    title: "Arredi e Allestimenti",
    subtitle: "Stile & Comfort",
    description: "Tutto ciò che riempie lo spazio. Dalle sedute eleganti per cerimonie alle soluzioni pratiche per sagre e aree food.",
    icon: Layout,
    items: [
      { 
        name: "Sedute & Lounge", 
        desc: "Selezione completa di sedie e salotti.", 
        specs: "Vari Stili", 
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop",
        subProducts: [
            { name: "Sedie Wedding", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", description: "Eleganti sedie chiavarine o in legno bianco per cerimonie." },
            { name: "Sedie Lounge Rattan", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop", description: "Set divanetti e poltrone comfort per aree relax." },
            { name: "Sedia di Plastica", image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop", description: "Monoblocco bianca impilabile, robusta ed economica." },
            { name: "Sedie Black Elegant", image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2000&auto=format&fit=crop", description: "Seduta nera di design per eventi serali e gala." }
        ]
      },
      { 
        name: "Set Birreria", 
        desc: "Tavoli e panche pieghevoli.", 
        specs: "Abete Verniciato", 
        image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=1000&auto=format&fit=crop",
        subProducts: [
            { name: "Set 200x60cm", image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=1000&auto=format&fit=crop", description: "Tavolo standard stretto (60cm) con due panche." },
            { name: "Set 200x80cm", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", description: "Tavolo maggiorato (80cm) per un comfort superiore." }
        ]
      },
      { 
        name: "Impianti Spina", 
        desc: "Sistemi di spillatura mobili e banchi bar.", 
        specs: "Refrigerati", 
        image: "https://images.unsplash.com/photo-1574577457805-4927756f4d22?q=80&w=2070&auto=format&fit=crop" 
      }
    ]
  },
  {
    id: "logistica",
    title: "Dettagli Tecnici",
    subtitle: "Logistica & Tecnica",
    description: "Il cuore tecnico dell'evento. Riscaldamento, energia, luce e palchi per garantire la riuscita dello show in sicurezza.",
    icon: Zap,
    items: [
      { name: "Riscaldamento", desc: "Generatori aria calda e funghi per esterni.", specs: "Gas/Gasolio", image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop" },
      { name: "Illuminazione", desc: "Luci tecniche, decorative e torri faro.", specs: "IP65 Outdoor", image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop" },
      { name: "Impianti Elettrici", desc: "Quadri certificati e distribuzione.", specs: "Cert. 37/08", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop" },
      { 
        name: "Palco & Pavimentazioni", 
        desc: "Palchi modulari e soluzioni di copertura suolo.", 
        specs: "Certificati", 
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop",
        subProducts: [
            { name: "Palco Rialzato 5x4m", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop", description: "Modulo palco certificato, altezza variabile." },
            { name: "Pavimento in Legno", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", description: "Pedane in legno livellabili per pavimentare qualsiasi terreno." },
            { name: "Moquette Decorativa", image: "https://images.unsplash.com/photo-1585923957286-90c44422204c?q=80&w=2000&auto=format&fit=crop", description: "Finitura estetica in vari colori, posata su pavimentazione." }
        ]
      }
    ]
  },
  {
    id: "fun",
    title: "Area Fun",
    subtitle: "Giochi & Svago",
    description: "Intrattenimento per tutte le età. Dai grandi classici da bar alle attrazioni vintage e per i più piccoli.",
    icon: Gamepad2,
    items: [
      { name: "Giochi Classici", desc: "Biliardi, Carambole, Calciobalilla, Freccette.", specs: "Professionali", image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=1000&auto=format&fit=crop" },
      { name: "Arcade & Vintage", desc: "Flipper, Punchball e Macchine Multigioco.", specs: "Freeplay/Gettoniera", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
      { name: "Area Bimbi", desc: "Dondoli, Pesche e attrazioni a gettone.", specs: "Sicurezza CE", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop" }
    ]
  }
];

const AllServices: React.FC<AllServicesProps> = ({ onShowContact }) => {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [loaded, setLoaded] = useState(false);
    
    // State for Background Animation
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    // State for Product Modal
    const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

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

    const handleItemClick = (item: ServiceItem) => {
        if (item.subProducts && item.subProducts.length > 0) {
            setSelectedItem(item);
        }
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <section className="relative min-h-screen text-white pb-20">
                 
                 {/* --- FIXED BACKGROUND & GRADIENT --- */}
                 {/* This container has the gradient and blobs but is fixed to viewport to avoid scroll issues */}
                 <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                     
                     {/* 1. DYNAMIC IMAGE LAYER (The Replay Animation) */}
                     {/* This layer renders ALL images but keeps them hidden until hovered. */}
                     {categories.map((cat) => (
                        cat.items.map((item, idx) => (
                            <div 
                                key={`${cat.id}-${idx}`}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-opacity ${hoveredImage === item.image ? 'opacity-60 scale-110' : 'opacity-0 scale-100'}`}
                                style={{ 
                                    backgroundImage: `url("${item.image}")`,
                                    filter: 'blur(80px) saturate(1.5)', 
                                }}
                            />
                        ))
                     ))}

                     {/* 2. OVERLAY GRADIENT */}
                     {/* Reduced opacity slightly in the middle to let the colored blur shine through */}
                     <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/80 to-[#022c24]/90"></div>
                     
                     {/* 3. ANIMATED BLOBS (Keep existing animations for extra movement) */}
                     <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gf-green/5 rounded-full blur-[120px] animate-[float_18s_infinite_ease-in-out]"></div>
                     <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-emerald-900/10 rounded-full blur-[120px] animate-[float_22s_infinite_reverse_ease-in-out]"></div>
                     <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-gf-green/5 rounded-full blur-[100px] animate-[pulse_15s_infinite]"></div>
                     
                     {/* Noise Overlay */}
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                 </div>

                 <div className="relative z-10 pt-32 pb-12 container mx-auto px-6">
                     
                     {/* --- HEADER --- */}
                     <div className={`text-center mb-24 max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Our Catalog</span>
                        </div>
                        
                        {/* Site Standard Title: Bold Sans + Italic Green Serif */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
                            IL NOSTRO <span className="font-serif italic text-gf-green font-light">CATALOGO</span>
                        </h1>

                        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Esplora il catalogo completo delle nostre attrezzature e soluzioni per eventi.
                        </p>
                     </div>

                     {/* --- MAIN LAYOUT --- */}
                     <div className="flex flex-col lg:flex-row gap-16 items-start relative">
                        
                        {/* LEFT: Sidebar Navigation - Sticky */}
                        {/* Note: Sticky works here because the parent section does not have overflow-hidden */}
                        <aside 
                            className={`hidden lg:block lg:w-1/4 sticky top-32 transition-all duration-1000 ease-out delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                        >
                            {/* Panel with Strong Shadow for contrast against gradient */}
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                                
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
                                            <div 
                                                key={i} 
                                                onClick={() => handleItemClick(item)}
                                                onMouseEnter={() => setHoveredImage(item.image)}
                                                onMouseLeave={() => setHoveredImage(null)}
                                                className={`group relative h-[320px] rounded-2xl overflow-hidden border border-white/10 hover:border-gf-green/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(0,112,90,0.3)] ${item.subProducts ? 'cursor-pointer hover:ring-1 hover:ring-gf-green/50' : 'cursor-default'}`}
                                            >
                                                
                                                {/* Image Background */}
                                                <div 
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url("${item.image}")` }}
                                                >
                                                    {/* Dark Gradient Overlay - Darkens on active */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                                                </div>

                                                {/* Specs Badge */}
                                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                                                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 group-hover:border-gf-green/30 group-hover:text-white transition-colors">
                                                        {item.specs}
                                                    </span>
                                                    {item.subProducts && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gf-green bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-gf-green/50 animate-pulse">
                                                            <Package size={10} /> + {item.subProducts.length} Varianti
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content (Bottom) */}
                                                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full z-20">
                                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-start">
                                                         
                                                         <h4 className="text-white font-bold text-2xl mb-2 group-hover:text-gf-green transition-colors leading-none uppercase drop-shadow-md flex items-center gap-2">
                                                            {item.name}
                                                            {item.subProducts && <ChevronRight size={20} className="text-gf-green opacity-0 group-hover:opacity-100 transition-opacity" />}
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

                 {/* --- PRODUCT CAROUSEL MODAL --- */}
                 {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={closeModal}></div>
                        
                        <div className="relative bg-gf-darker border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-[slideUp_0.4s_ease-out]">
                             
                             {/* --- DYNAMIC BACKGROUND FOR MODAL --- */}
                             <div className="absolute inset-0 z-0 pointer-events-none">
                                {selectedItem.subProducts?.map((prod, idx) => (
                                    <div 
                                        key={`modal-bg-${idx}`}
                                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${hoveredImage === prod.image ? 'opacity-60 scale-110' : 'opacity-0 scale-100'}`}
                                        style={{ 
                                            backgroundImage: `url("${prod.image}")`,
                                            filter: 'blur(60px) saturate(1.5)', 
                                        }}
                                    />
                                ))}
                                {/* Overlay to ensure text readability on top of blur */}
                                <div className="absolute inset-0 bg-gf-darker/80"></div>
                             </div>

                             {/* Modal Header */}
                             <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-gf-darker/50 backdrop-blur-xl relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gf-green/20 flex items-center justify-center text-gf-green">
                                            <Package size={20} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-none">{selectedItem.name}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm md:text-base font-light ml-13">{selectedItem.desc}</p>
                                </div>
                                <button 
                                    onClick={closeModal}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                             </div>

                             {/* Modal Body - Carousel/Grid */}
                             <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 bg-transparent">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedItem.subProducts?.map((prod, idx) => (
                                        <div 
                                            key={idx} 
                                            className="group relative bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-gf-green/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,112,90,0.15)] hover:-translate-y-1"
                                            onMouseEnter={() => setHoveredImage(prod.image)}
                                            onMouseLeave={() => setHoveredImage(null)}
                                        >
                                            
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <div 
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url("${prod.image}")` }}
                                                ></div>
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gf-green transition-colors">{prod.name}</h4>
                                                <p className="text-sm text-gray-400 font-light leading-relaxed">{prod.description || "Soluzione ideale per eventi esclusivi."}</p>
                                            </div>

                                            {/* Action Bar */}
                                            <div className="px-5 pb-5 pt-0 mt-auto flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[10px] uppercase font-bold text-gf-green tracking-widest">Disponibile</span>
                                                <button 
                                                    onClick={() => { closeModal(); if(onShowContact) onShowContact(); }}
                                                    className="w-8 h-8 rounded-full bg-gf-green flex items-center justify-center text-white hover:bg-white hover:text-gf-green transition-colors shadow-lg"
                                                >
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </div>

                             {/* Modal Footer */}
                             <div className="relative z-10 p-4 border-t border-white/10 bg-gf-darker/80 text-center text-xs text-gray-500">
                                <p>Tutte le strutture sono certificate secondo le normative vigenti.</p>
                             </div>
                        </div>
                    </div>
                 )}
                 
                 <style>{`
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0); }
                        33% { transform: translate(30px, -50px); }
                        66% { transform: translate(-20px, 20px); }
                    }
                    @keyframes slideUp {
                        0% { transform: translateY(50px); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes fadeInGradient {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                 `}</style>
            </section>
            
            {/* Added Contact Form at the bottom */}
            <Contact simpleMode={true} />
        </>
    );
}

export default AllServices;