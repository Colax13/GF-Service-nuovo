
import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, BookOpen, Tag, Search, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface AllBlogPostsProps {
  onShowContact?: () => void;
}

const allPosts = [
  {
    id: 1,
    category: "Inspirazione",
    title: "Come trasformare una piazza vuota in un teatro.",
    excerpt: "Il dietro le quinte del Festival del Jazz: dalla logistica dei palchi modulari alla gestione dell'acustica all'aperto. Scopri come il nostro team ha affrontato le sfide di un montaggio in tempi record nel centro storico.",
    date: "04 Nov 2025",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
  {
    id: 2,
    category: "Trend Eventi",
    title: "Sostenibilità negli allestimenti: il futuro è modulare.",
    excerpt: "Perché le strutture temporanee sono la scelta più ecologica per i grandi eventi. Analisi dei materiali, riutilizzo delle componenti e riduzione dell'impatto ambientale nei festival moderni.",
    date: "21 Ott 2025",
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop",
    readTime: "4 min"
  },
  {
    id: 3,
    category: "Case Study",
    title: "Gestire l'imprevisto: Il villaggio di Natale sotto la neve.",
    excerpt: "Un racconto dal campo: come abbiamo garantito la sicurezza e il comfort termico durante l'ondata di gelo del 2024. Le soluzioni tecniche adottate per le nostre casette in legno.",
    date: "15 Set 2025",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
    readTime: "6 min"
  },
  {
    id: 4,
    category: "Tecnica",
    title: "Sicurezza nei grandi eventi: normative 2025.",
    excerpt: "Tutto quello che devi sapere sulle nuove certificazioni richieste per le tensostrutture pubbliche. Una guida pratica per organizzatori ed enti locali.",
    date: "10 Ago 2025",
    image: "https://images.unsplash.com/photo-1505373877841-8d43f7166778?q=80&w=2070&auto=format&fit=crop",
    readTime: "8 min"
  },
  {
    id: 5,
    category: "Logistica",
    title: "Street Food Tour: La sfida dell'energia.",
    excerpt: "Come alimentare 120 truck in movimento senza interruzioni. Il nostro setup elettrico spiegato passo dopo passo per garantire continuità di servizio.",
    date: "22 Lug 2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
];

const recommendedPosts = [
    {
        id: 6,
        category: "Design",
        title: "5 Idee brillanti per il tuo prossimo evento",
        date: "02 Lug 2025",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 7,
        category: "News",
        title: "BEA 2025: Cosa ci insegnano i grandi operatori del settore?",
        date: "12 Giu 2025",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
    }
];

const AllBlogPosts: React.FC<AllBlogPostsProps> = ({}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    return (
        <section className="relative pt-32 pb-24 min-h-screen bg-gf-darker selection:bg-gf-green selection:text-white">
             
             {/* Unified Background Ambience */}
             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                 <div className="absolute top-[-10%] -right-[10%] w-[60vw] h-[60vw] bg-gf-green/10 rounded-full blur-[120px] opacity-40"></div>
                 <div className="absolute bottom-[10%] -left-[10%] w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[100px] opacity-30"></div>
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
             </div>

             <div className="relative z-10 container mx-auto px-6">
                 
                 {/* 1. HEADER (Consistent Style with Services & Projects) */}
                 <div className={`mb-20 text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                        <BookOpen size={12} className="text-gf-green" />
                        Blog & News
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
                        LE NOSTRE <span className="font-serif italic text-gf-green font-light">STORIE</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
                         Notizie, approfondimenti e racconti diretti dai nostri cantieri in tutta Italia.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {['Tutti', 'News', 'Consigli', 'Storie', 'Territorio'].map((tab, i) => (
                            <button 
                                key={tab}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${i === 0 ? 'bg-white text-gf-darker border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* 2. MAIN LAYOUT: GRID (Feed + Sidebar) */}
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* --- LEFT COLUMN: ARTICLES FEED --- */}
                    <div className="lg:col-span-8 flex flex-col gap-16">
                        {allPosts.map((post, idx) => (
                            <article 
                                key={post.id} 
                                className={`group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-gf-green/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gf-green/5 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-[250px] md:h-[350px] overflow-hidden w-full">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${post.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-60"></div>
                                    
                                    <div className="absolute top-6 left-6">
                                        <span className="px-3 py-1.5 bg-gf-green text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 flex flex-col flex-grow relative bg-gf-darker/50 backdrop-blur-sm">
                                    <h3 className="text-2xl md:text-4xl font-serif text-white mb-4 leading-tight group-hover:text-gf-green transition-colors cursor-pointer">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 font-light">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span>{post.readTime} Lettura</span>
                                        </div>
                                        
                                        <button className="text-white text-xs font-bold uppercase tracking-widest hover:text-gf-green transition-colors flex items-center gap-2 group/btn">
                                            Leggi tutto <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {/* Pagination */}
                        <div className="flex items-center gap-2 mt-4">
                            <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-white text-gf-darker font-bold flex items-center justify-center transition-all">
                                1
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all font-bold text-sm">
                                2
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all font-bold text-sm">
                                3
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gf-green hover:border-gf-green transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: SIDEBAR (Sticky) --- */}
                    <aside className="lg:col-span-4 relative h-full">
                        {/* 
                           STICKY CONTAINER:
                           - top-32 to give it space from the navbar and ensure visibility
                           - max-h-[calc(100vh-100px)] and overflow-y-auto to ensure scrollability if content is too tall
                        */}
                        <div className="sticky top-32 space-y-6">
                            
                            {/* Widget 1: Recommended Posts */}
                            <div className="bg-transparent">
                                <h4 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    Post consigliati
                                    <div className="h-px bg-white/20 flex-grow"></div>
                                </h4>
                                <div className="space-y-4">
                                    {recommendedPosts.map((post) => (
                                        <div key={post.id} className="group flex gap-4 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-[9px] font-bold text-gf-green uppercase tracking-wider mb-1">{post.category}</span>
                                                <h5 className="text-white text-sm font-bold leading-tight mb-1 group-hover:text-gf-green transition-colors line-clamp-2">
                                                    {post.title}
                                                </h5>
                                                <span className="text-[10px] text-gray-500 uppercase">{post.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Widget 2: Visual Promo */}
                            {/* Changed aspect ratio from square to 4/3 or 16/9 to save vertical space and fit on screen */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 group cursor-pointer shadow-lg hover:border-gf-green/40 transition-all">
                                <img 
                                    src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766430190/cover_q7wcxz.jpg" 
                                    alt="Promo" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">Il nostro portfolio</p>
                                        <div className="w-8 h-8 rounded-full bg-white text-gf-darker flex items-center justify-center">
                                            <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white leading-tight">Scopri i progetti realizzati nel 2024.</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>

                 </div>
             </div>
        </section>
    );
}

export default AllBlogPosts;
