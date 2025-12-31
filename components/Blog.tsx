import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  index: number;
  inView: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, excerpt, date, image, category, index, inView }) => {
  const delay = index * 150;

  return (
    <article 
      className="group flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gf-green/50 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
             <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {category}
             </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
          <Calendar size={12} className="text-gf-green" /> {date}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gf-green transition-colors leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
            {excerpt}
        </p>
        
        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:text-gf-green transition-colors mt-auto">
          Leggi tutto <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};

interface BlogProps {
  onShowAllBlogPosts?: () => void;
}

const Blog: React.FC<BlogProps> = ({ onShowAllBlogPosts }) => {
  const [inView, setInView] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const posts = [
    {
      category: "Inspirazione",
      title: "Come trasformare una piazza vuota in un teatro.",
      excerpt: "Il dietro le quinte del Festival del Jazz: dalla logistica dei palchi modulari alla gestione dell'acustica all'aperto.",
      date: "04 Nov 2025",
      image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
    },
    {
      category: "Trend Eventi",
      title: "Sostenibilità negli allestimenti: il futuro è modulare.",
      excerpt: "Perché le strutture temporanee sono la scelta più ecologica per i grandi eventi. Analisi dei materiali e riutilizzo.",
      date: "21 Ott 2025",
      image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop"
    },
    {
      category: "Case Study",
      title: "Gestire l'imprevisto: Il villaggio di Natale sotto la neve.",
      excerpt: "Un racconto dal campo: come abbiamo garantito la sicurezza e il comfort termico durante l'ondata di gelo del 2024.",
      date: "15 Set 2025",
      image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop"
    }
  ];

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

  // Intersection Observer per il carosello mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveMobileIndex(index);
          }
        });
      },
      { 
        root: scrollRef.current,
        threshold: 0.6 
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleArchiveClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onShowAllBlogPosts) onShowAllBlogPosts();
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleDotClick = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const gap = 24; // Corrisponde a gap-6 (1.5rem = 24px)
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="blog" ref={sectionRef} className="py-24 bg-gf-darker text-white relative overflow-hidden border-t border-white/5">
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Simple Centered Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <BookOpen size={12} className="text-gf-green" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Blog & News</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                LE NOSTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">STORIE</span>
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                Notizie, approfondimenti e racconti diretti dai nostri cantieri in tutta Italia.
            </p>
        </div>

        {/* Mobile Carousel Layout (Hidden on LG+) */}
        <div className="lg:hidden flex flex-col items-center">
            <div 
              ref={scrollRef}
              className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {posts.map((post, index) => (
                <div 
                  key={index} 
                  ref={(el) => { cardRefs.current[index] = el; }}
                  data-index={index}
                  className="min-w-[85vw] md:min-w-[50vw] snap-center"
                >
                  <BlogPost 
                    {...post} 
                    index={index} 
                    inView={true}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls Mobile */}
            <div className="flex items-center justify-center gap-6 mt-8 mb-4">
                <button 
                  onClick={() => scrollCarousel('left')}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green hover:border-gf-green transition-all text-white"
                  aria-label="Articolo precedente"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {posts.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        idx === activeMobileIndex ? 'w-8 bg-gf-green' : 'w-2 bg-white/20'
                      }`}
                      aria-label={`Vai all'articolo ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => scrollCarousel('right')}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green hover:border-gf-green transition-all text-white"
                  aria-label="Articolo successivo"
                >
                  <ChevronRight size={20} />
                </button>
            </div>
        </div>

        {/* Standard Grid Layout Desktop (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <BlogPost 
              key={index} 
              {...post} 
              index={index} 
              inView={inView}
            />
          ))}
        </div>

        {/* Centered CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <button 
                onClick={handleArchiveClick}
                className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:text-gf-green hover:border-gf-green transition-all text-sm font-bold uppercase tracking-widest group"
             >
                Leggi tutti gli articoli <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Blog;