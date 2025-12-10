import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar, BookOpen, Tag, Search } from 'lucide-react';

interface AllBlogPostsProps {
  onShowContact?: () => void;
}

const allPosts = [
  {
    category: "Inspirazione",
    title: "Come trasformare una piazza vuota in un teatro.",
    excerpt: "Il dietro le quinte del Festival del Jazz: dalla logistica dei palchi modulari alla gestione dell'acustica all'aperto.",
    date: "04 Nov 2025",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
  {
    category: "Trend Eventi",
    title: "Sostenibilità negli allestimenti: il futuro è modulare.",
    excerpt: "Perché le strutture temporanee sono la scelta più ecologica per i grandi eventi. Analisi dei materiali e riutilizzo.",
    date: "21 Ott 2025",
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop",
    readTime: "4 min"
  },
  {
    category: "Case Study",
    title: "Gestire l'imprevisto: Il villaggio di Natale sotto la neve.",
    excerpt: "Un racconto dal campo: come abbiamo garantito la sicurezza e il comfort termico durante l'ondata di gelo del 2024.",
    date: "15 Set 2025",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
    readTime: "6 min"
  },
  {
    category: "Tecnica",
    title: "Sicurezza nei grandi eventi: normative 2025.",
    excerpt: "Tutto quello che devi sapere sulle nuove certificazioni richieste per le tensostrutture pubbliche.",
    date: "10 Ago 2025",
    image: "https://images.unsplash.com/photo-1505373877841-8d43f7166778?q=80&w=2070&auto=format&fit=crop",
    readTime: "8 min"
  },
  {
    category: "Logistica",
    title: "Street Food Tour: La sfida dell'energia.",
    excerpt: "Come alimentare 120 truck in movimento senza interruzioni. Il nostro setup elettrico spiegato.",
    date: "22 Lug 2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 min"
  },
  {
    category: "Design",
    title: "Arredare l'esterno: Trend Summer 2025.",
    excerpt: "Dalle sedute lounge ai gazebi minimal: ecco cosa andrà di moda nei matrimoni e party esclusivi.",
    date: "05 Giu 2025",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop",
    readTime: "3 min"
  },
  {
    category: "Dietro le Quinte",
    title: "24 Ore prima del debutto.",
    excerpt: "Foto racconto del montaggio record per la Fiera dell'Edilizia di Roma.",
    date: "12 Mag 2025",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
    readTime: "4 min"
  },
  {
    category: "Innovazione",
    title: "Materiali ultraleggeri: la rivoluzione dei palchi.",
    excerpt: "Meno peso, più resistenza. Come le nuove leghe stanno cambiando il nostro modo di lavorare.",
    date: "30 Apr 2025",
    image: "https://images.unsplash.com/photo-1506192170364-7067d020d0f4?q=80&w=2070&auto=format&fit=crop",
    readTime: "6 min"
  }
];

const AllBlogPosts: React.FC<AllBlogPostsProps> = ({}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    return (
        <section className="relative pt-32 pb-24 min-h-screen bg-gf-darker overflow-hidden selection:bg-gf-green selection:text-white">
             
             {/* Background */}
             <div className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gf-darker/80 to-gf-darker"></div>
             </div>

             <div className="relative z-10 container mx-auto px-6">
                 
                 {/* Header */}
                 <div className={`mb-24 text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-xl">
                        <BookOpen size={12} className="text-gf-green" />
                        GF Journal
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
                        STORIE E <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400 font-serif italic pr-2">Insight</span>
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                        Approfondimenti tecnici, racconti dal campo e tendenze del settore eventi.
                    </p>
                 </div>

                 {/* Search / Filter Placeholder (Visual only) */}
                 <div className={`flex justify-center mb-16 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Cerca un argomento..." 
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-gf-green/50 focus:bg-white/10 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                 </div>

                 {/* Articles Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24">
                    {allPosts.map((post, idx) => (
                        <article 
                            key={idx} 
                            className="group relative flex flex-col h-full"
                            style={{ 
                                transitionDelay: `${100 + (idx * 50)}ms`, 
                                opacity: loaded ? 1 : 0, 
                                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' 
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 border border-white/10 group-hover:border-gf-green/50 transition-colors duration-500 cursor-pointer">
                                <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                                style={{ backgroundImage: `url(${post.image})` }}
                                ></div>
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                
                                <div className="absolute top-4 left-4">
                                    <div className="backdrop-blur-md bg-black/60 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full flex items-center gap-2 group-hover:bg-gf-green group-hover:border-gf-green transition-all duration-300">
                                        <Tag size={10} />
                                        {post.category}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex flex-col flex-grow relative z-10 px-2">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-medium tracking-wider uppercase border-b border-white/10 pb-4">
                                <span className="flex items-center gap-2">
                                    <Calendar size={12} className="text-gf-green" /> {post.date}
                                </span>
                                <span className="text-white/40 group-hover:text-white transition-colors">{post.readTime} read</span>
                                </div>
                                
                                <h3 className="text-2xl font-serif text-white mb-3 leading-tight group-hover:text-gf-green transition-colors duration-300 cursor-pointer">
                                {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="mt-auto inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] group/link cursor-pointer hover:text-gf-green transition-colors">
                                <span className="border-b border-gf-green/0 group-hover:border-gf-green transition-all pb-0.5">Leggi l'articolo</span>
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gf-green transition-all duration-300 group-hover:scale-110">
                                    <ArrowUpRight size={14} className="group-hover:text-white" />
                                </div>
                                </div>
                            </div>
                        </article>
                    ))}
                 </div>

             </div>
        </section>
    );
}

export default AllBlogPosts;