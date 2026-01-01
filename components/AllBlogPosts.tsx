
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, TrendingUp, LayoutGrid, ArrowUpRight, Camera } from 'lucide-react';
import { BlogPostData } from './BlogPostDetail';

interface AllBlogPostsProps {
  onShowContact?: () => void;
  onPostSelect?: (post: BlogPostData) => void;
}

// Configurazione Paginazione
const ITEMS_PER_PAGE = 5;

// Categorie aggiornate con Tone of Voice professionale
const filters = [
    'Tutti', 
    'Design & Ispirazione', 
    'News & Trend', 
    'Case History', 
    'Territorio & Radici'
];

// Dati aggiornati con contenuto completo per l'articolo ID 4
const allPosts: BlogPostData[] = [
  {
    id: 1,
    category: "Design & Ispirazione",
    title: "Come trasformare una piazza vuota in un teatro.",
    excerpt: "Il dietro le quinte del Festival del Jazz: dalla logistica dei palchi modulari alla gestione dell'acustica all'aperto. Scopri come il nostro team ha affrontato le sfide di un montaggio in tempi record nel centro storico.",
    date: "04 Nov 2025",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
  {
    id: 2,
    category: "News & Trend",
    title: "Sostenibilità negli allestimenti: il futuro è modulare.",
    excerpt: "Perché le strutture temporanee sono la scelta più ecologica per i grandi eventi. Analisi dei materiali, riutilizzo delle componenti e riduzione dell'impatto ambientale nei festival moderni.",
    date: "21 Ott 2025",
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop",
    readTime: "4 min"
  },
  {
    id: 3,
    category: "Case History",
    title: "Gestire l'imprevisto: Il villaggio di Natale sotto la neve.",
    excerpt: "Un racconto dal campo: come abbiamo garantito la sicurezza e il comfort termico durante l'ondata di gelo del 2024. Le soluzioni tecniche adottate per le nostre casette in legno.",
    date: "15 Set 2025",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
    readTime: "6 min"
  },
  {
    id: 4,
    category: "Territorio & Radici",
    title: "Palio di San Pietro Eremita",
    subtitle: "Quando un borgo di 2.000 abitanti riceve 10.000 persone",
    excerpt: "Come supportiamo le feste storiche della Ciociaria. La sfida di integrare strutture moderne di sicurezza in contesti medievali senza intaccarne il fascino storico.",
    date: "10 Ago 2025",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg",
    readTime: "8 min",
    content: {
        sections: [
            {
                text: "A Trevi nel Lazio, piccolo centro della Ciociaria affacciato sui Monti Simbruini, la fine dell'estate ha un suono preciso: **quello degli zoccoli di cavallo** che attraversano il corso principale del paese.\n\nÈ il Palio di San Pietro Eremita, una tradizione lunga anni, che ogni 31 Agosto riporta migliaia persone per le vie del borgo. Nel 2025 **le presenze hanno superato le 10.000 persone**, un numero che racconta da solo la portata di un evento che permette al paesino di quintuplicare la vita del borgo.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_2_aygjdp.jpg",
                imageSide: "right"
            },
            {
                title: "Una storia che tiene insieme fede e appartenenza.",
                text: "Il Palio nasce come omaggio al patrono del paese, San Pietro Eremita, figura religiosa venerata sin dal Medioevo. Oggi è una sfida tra otto contrade (Civita, Rivo, Cunicella, Suria, Santo Nicola, Borgo Madonna, Piajo e Cinarzo) che si contendono un drappo e **l'orgoglio di rappresentare la propria parte di Trevi**.\n\nNei giorni che precedono la corsa il paese cambia volto: le bandiere colorano i balconi e vengono allestiti stand di Food & Beverage.\nIl Palio è **un rito collettivo che unisce generazioni e ruoli diversi**: bambini, anziani, visitatori, volontari e tecnici.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg",
                imageSide: "left"
            },
            {
                title: "Un impatto che va oltre la festa",
                text: "Per un borgo di 2.000 abitanti, un evento come il Palio **significa molto più di una tradizione conservata**. Significa turismo, visibilità, sostegno all'economia locale.\nRistoranti e bar lavorano a pieno ritmo, i negozi restano aperti fino a tardi e le strutture ricettive registrano il tutto esaurito.\n\nMa soprattutto, il **paese ritrova una vitalità** e una dimensione di comunità che spesso si perde durante l'anno.\nÈ la prova di come anche eventi di piccola scala, quando ben organizzati, abbiano **un valore strategico nel tessuto sociale e culturale di un territorio**.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_3_oabv1e.jpg",
                imageSide: "right"
            },
            {
                title: "Il ruolo di GF Service",
                text: "In occasione di questo evento, **GF Service ha contribuito alla riuscita** fornendo transenne, tavoli, panche e gazebi destinate alle aree di supporto, accoglienza e sicurezza.\n\nUn evento discreto ma essenziale, che ha aiutato a gestire al meglio l'enorme flusso di persone e garantire la riuscita dell'evento.\nUn intervento che, seppur piccolo, racconta bene la filosofia dell'azienda: **essere parte del territorio**, sostenendone la vitalità culturale e il valore delle tradizioni locali.",
                image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg",
                imageSide: "left"
            }
        ],
        gallery: [
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_2_aygjdp.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg",
            "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_3_oabv1e.jpg"
        ]
    }
  },
  {
    id: 5,
    category: "Case History",
    title: "Street Food Tour: La sfida dell'energia.",
    excerpt: "Come alimentare 120 truck in movimento senza interruzioni. Il nostro setup elettrico spiegato passo dopo passo per garantire continuità di servizio.",
    date: "22 Lug 2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
  {
    id: 6,
    category: "Design & Ispirazione",
    title: "5 Idee brillanti per il tuo prossimo evento",
    excerpt: "Dall'illuminazione d'atmosfera all'uso creativo delle pedane modulari. Spunti creativi per rendere unico il tuo allestimento.",
    date: "02 Lug 2025",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop",
    readTime: "3 min"
  },
  {
    id: 7,
    category: "News & Trend",
    title: "BEA 2025: Cosa ci insegnano i grandi operatori del settore?",
    excerpt: "Reportage esclusivo dal Best Event Awards. Le tendenze globali che influenzeranno il mercato italiano nei prossimi anni.",
    date: "12 Giu 2025",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
    readTime: "7 min"
  },
  {
    id: 8,
    category: "Territorio & Radici",
    title: "Borghi in Festa: La logistica nei vicoli stretti.",
    excerpt: "Le difficoltà e le soddisfazioni di portare grandi strutture in piccoli centri storici. La nostra esperienza a Trevi nel Lazio e Alatri.",
    date: "05 Mag 2025",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767203050/Picinisco-1_irrxjh.jpg",
    readTime: "4 min"
  }
];

const AllBlogPosts: React.FC<AllBlogPostsProps> = ({ onShowContact, onPostSelect }) => {
    const [loaded, setLoaded] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Tutti');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    // Reset page to 1 when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        if (activeCategory === 'Tutti') return allPosts;
        return allPosts.filter(post => post.category === activeCategory);
    }, [activeCategory]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const currentPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredPosts.slice(startIndex, endIndex);
    }, [currentPage, filteredPosts]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const element = document.getElementById('blog-top-anchor');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const recommendedPosts = allPosts.filter(p => p.category === 'Case History' || p.category === 'Territorio & Radici').slice(0, 3);

    return (
        <section className="relative pt-32 pb-24 min-h-screen bg-gf-darker selection:bg-gf-green selection:text-white">
             
             {/* Unified Background Ambience */}
             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                 <div className="absolute top-[-10%] -right-[10%] w-[60vw] h-[60vw] bg-gf-green/10 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                 <div className="absolute bottom-[10%] -left-[10%] w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[100px] opacity-30"></div>
                 
                 {/* Gradient to match other pages */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/90 to-[#022c24]/95"></div>

                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
             </div>

             <div className="relative z-10 container mx-auto px-6">
                 
                 {/* 1. CENTERED HEADER */}
                 <div className={`text-center mb-16 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                        <BookOpen size={12} className="text-gf-green" />
                        Blog & News
                    </div>
                    {/* Enlarged Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
                        LE NOSTRE <span className="font-serif italic text-gf-green font-light">STORIE</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        Approfondimenti e racconti diretti dai nostri cantieri in tutta Italia.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN: MAIN CONTENT (Sticky Menu + Articles) --- */}
                    <div className="lg:col-span-8" id="blog-top-anchor">
                        
                        {/* STICKY MENU BAR */}
                        <div className={`sticky top-24 z-30 transition-all duration-500 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                             <div className="bg-gf-darker/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 mb-10 shadow-2xl inline-flex max-w-full overflow-hidden">
                                <div className="flex overflow-x-auto gap-1 scrollbar-hide no-scrollbar items-center">
                                    {filters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveCategory(filter)}
                                            className={`
                                                px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap
                                                ${activeCategory === filter 
                                                    ? 'bg-gf-green text-white shadow-lg' 
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* ARTICLES FEED */}
                        <div className="flex flex-col gap-8 min-h-[50vh]">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post, idx) => (
                                    <article 
                                        key={post.id} 
                                        onClick={() => onPostSelect?.(post)}
                                        className={`group relative flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-gf-green/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gf-green/5 cursor-pointer ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                        style={{ transitionDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Image Section */}
                                        <div className="md:w-2/5 relative h-[250px] md:h-auto overflow-hidden">
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${post.image})` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-60 md:hidden"></div>
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:w-3/5 p-8 flex flex-col justify-center bg-gf-darker/30 backdrop-blur-sm relative border-l border-white/5">
                                            
                                            <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                                                <span>{post.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                <span>{post.readTime} Lettura</span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-serif text-white mb-4 leading-tight group-hover:text-gf-green transition-colors">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto">
                                                <button className="text-white text-xs font-bold uppercase tracking-widest hover:text-gf-green transition-colors flex items-center gap-2 group/btn">
                                                    Leggi articolo <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                    <p className="text-gray-400 font-light">Nessun articolo trovato in questa categoria.</p>
                                    <button 
                                        onClick={() => setActiveCategory('Tutti')}
                                        className="mt-4 text-gf-green text-sm font-bold uppercase tracking-widest hover:underline"
                                    >
                                        Mostra tutti
                                    </button>
                                </div>
                            )}

                             {/* Pagination (Dynamic) */}
                             {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12 transition-all duration-500 ease-out">
                                    <button 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`
                                                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all
                                                ${currentPage === page 
                                                    ? 'bg-white text-gf-darker scale-105 shadow-lg' 
                                                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className={`sticky top-32 flex flex-col gap-10 transition-all duration-1000 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            
                            {/* WIDGET 1: CONSIGLIATI (Redesign Editoriale) */}
                            <div className="bg-gf-darker border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp size={18} className="text-gf-green" />
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">In Evidenza</h4>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gf-green"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {recommendedPosts.map((post, idx) => (
                                        <div 
                                            key={`rec-${post.id}`} 
                                            onClick={() => onPostSelect?.(post)}
                                            className="group relative p-6 cursor-pointer hover:bg-white/[0.02] transition-colors overflow-hidden"
                                        >
                                            {/* Big Number Background */}
                                            <span className="absolute -top-2 -right-2 text-7xl font-black text-white/[0.03] group-hover:text-gf-green/10 transition-colors z-0 select-none">
                                                0{idx + 1}
                                            </span>
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest mb-2 text-gf-green">
                                                    {post.category}
                                                </div>
                                                <h5 className="text-base font-bold text-white leading-snug group-hover:text-gf-green transition-colors mb-3 pr-4">
                                                    {post.title}
                                                </h5>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gf-green transition-colors"></span>
                                                    {post.readTime} lettura
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* WIDGET 2: PROJECTS PROMO (Redesign Poster/Card) */}
                            <div className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                {/* Image Background */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    style={{ backgroundImage: 'url("https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766431972/sora-tavolata-22-xq-1_gei6bz.jpg")' }}
                                ></div>
                                
                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                                {/* Top Badge */}
                                <div className="absolute top-6 left-6 z-20">
                                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
                                        <Camera size={12} className="text-gf-green" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Portfolio 2025</span>
                                     </div>
                                </div>

                                {/* Content Bottom Panel (Glassmorphism) */}
                                <div className="absolute bottom-0 left-0 w-full p-2 z-20">
                                    <div className="bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">I Nostri Lavori</div>
                                                <h4 className="text-xl font-bold text-white leading-none uppercase">Eccellenza<br/><span className="text-gf-green italic font-serif">Tecnica</span></h4>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-300">
                                                <LayoutGrid size={18} />
                                            </div>
                                        </div>
                                        
                                        <button className="w-full py-3 bg-white text-black hover:bg-gf-green hover:text-white transition-colors rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn">
                                            Esplora Portfolio <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                 </div>
             </div>
             
             <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
             `}</style>
        </section>
    );
}

export default AllBlogPosts;
