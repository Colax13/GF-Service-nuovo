
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Hash } from 'lucide-react';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export interface BlogPostData {
  id: number;
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  content?: {
    sections: {
      title?: string;
      text: string;
      image?: string;
      imageSide?: 'left' | 'right' | 'full';
    }[];
    gallery?: string[];
  };
}

interface BlogPostDetailProps {
  post: BlogPostData;
  prevPost?: BlogPostData | null;
  nextPost?: BlogPostData | null;
  onClose: () => void;
  onNavigate?: (post: BlogPostData) => void;
  // Props for Footer integration
  onShowContact: () => void;
  onShowAbout: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ 
    post, 
    prevPost, 
    nextPost, 
    onClose, 
    onNavigate,
    onShowContact,
    onShowAbout,
    onNavigateToSection
}) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset loaded state when post changes to trigger animations
    setLoaded(false);
    setTimeout(() => setLoaded(true), 100);
    
    // Reset scroll position
    if (containerRef.current) {
        containerRef.current.scrollTop = 0;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalScroll = containerRef.current.scrollTop;
      const totalHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const scroll = totalScroll / totalHeight;
      setScrollProgress(scroll || 0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [post]); // Re-run effect when post changes

  // Helper per renderizzare il testo
  const renderText = (text: string, isFirstSection: boolean) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return (
        <span className={`block whitespace-pre-line ${isFirstSection ? 'first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:text-gf-green first-letter:leading-[0.8]' : ''}`}>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </span>
    );
  };

  // Wrapper for Footer navigation that closes the modal first
  const handleFooterNavigate = (sectionId: string) => {
      onClose();
      // Add a small delay to allow modal close animation to start/finish smoothly
      setTimeout(() => {
          onNavigateToSection('#' + sectionId);
      }, 100);
  };

  const handleFooterContact = () => {
      onClose();
      onShowContact();
  };

  const handleFooterAbout = () => {
      onClose();
      onShowAbout();
  };

  return (
    <div 
      id="blog-post-container"
      ref={containerRef}
      className="fixed inset-0 z-[120] bg-gf-darker overflow-y-auto overflow-x-hidden animate-in fade-in duration-500 scroll-smooth"
    >
      {/* Scroll To Top for Blog Post Modal */}
      <ScrollToTop targetRef={containerRef} className="z-[160]" />

      {/* --- BACKGROUND AMBIENCE (Texture & Glows) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
          {/* Top Right Blob */}
          <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-gf-green/10 rounded-full blur-[120px] opacity-40"></div>
          {/* Bottom Left Blob */}
          <div className="absolute -bottom-[10%] -left-[10%] w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[100px] opacity-30"></div>
          {/* Scrolling Gradient Line */}
          <div className="absolute top-0 left-6 md:left-12 bottom-0 w-[1px] bg-white/5 hidden lg:block"></div>
      </div>

      {/* --- TOP BAR (Progress & Close) --- */}
      {/* Abbassata a top-24/top-32 per stare sotto la navbar */}
      <div className="fixed top-24 lg:top-32 left-0 right-0 z-[140] flex justify-between items-start p-6 pointer-events-none">
          {/* Back to All Articles Button */}
          <button 
            onClick={onClose}
            className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 bg-gf-darker/80 hover:bg-gf-green border border-white/10 hover:border-gf-green backdrop-blur-md rounded-full text-white transition-all duration-300 group shadow-lg"
          >
             <ArrowLeft size={16} className="text-gf-green group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
             <span className="text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">Tutti gli articoli</span>
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="pointer-events-auto w-12 h-12 bg-gf-darker/50 hover:bg-gf-green border border-white/10 hover:border-gf-green backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-300 group shadow-2xl"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
      </div>

      {/* --- SCROLL PROGRESS LINE (Top) --- */}
      {/* Abbassata per essere visibile sotto la navbar */}
      <div className="fixed top-[80px] lg:top-[100px] left-0 h-1 bg-gradient-to-r from-gf-green to-emerald-400 z-[150]" style={{ width: `${scrollProgress * 100}%` }}></div>


      {/* --- MAIN CONTENT --- */}
      <article className="relative z-10 min-h-screen">
        
        {/* HERO SECTION - Aumentato padding top per compensare i pulsanti abbassati */}
        <header className="relative w-full pt-48 pb-16 md:pt-56 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                
                {/* Category Badge */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-gf-green text-xs font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-sm">
                        {post.category}
                    </span>
                    <div className="h-px w-12 bg-white/20"></div>
                    <span className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                        {post.date}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[0.95] tracking-tight text-balance">
                    {post.title}
                </h1>

                {/* Subtitle */}
                {post.subtitle && (
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl border-l-2 border-gf-green pl-6 md:pl-8">
                        {post.subtitle}
                    </p>
                )}
            </div>
        </header>

        {/* HERO IMAGE */}
        <div className={`w-full px-4 md:px-12 lg:px-24 mb-16 md:mb-24 transition-all duration-1000 delay-200 ease-out ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent opacity-30"></div>
            </div>
        </div>

        {/* CONTENT GRID */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                
                {/* LEFT SIDEBAR (Sticky Info) */}
                <aside className="hidden lg:block lg:col-span-3">
                    {/* MODIFICATO: top-64 invece di top-40 per evitare sovrapposizione con i pulsanti superiori */}
                    <div className="sticky top-64 flex flex-col gap-8 transition-all duration-1000 delay-500 ease-out" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-20px)' }}>
                        
                        <div className="pb-8 border-b border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Tempo di lettura</h4>
                            <div className="flex items-center gap-2 text-white font-serif italic text-lg">
                                <Clock size={18} className="text-gf-green" /> {post.readTime}
                            </div>
                        </div>

                        <div className="pb-8 border-b border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Condividi</h4>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full border border-white/10 hover:border-gf-green text-gray-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all">
                                    <Facebook size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-white/10 hover:border-gf-green text-gray-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all">
                                    <Twitter size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-white/10 hover:border-gf-green text-gray-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all">
                                    <Linkedin size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Progress Indicator Visualization */}
                        <div className="relative h-64 w-[1px] bg-white/10 mt-4">
                            <div 
                                className="absolute top-0 left-0 w-full bg-gf-green transition-all duration-100 shadow-[0_0_10px_#005a48]" 
                                style={{ height: `${scrollProgress * 100}%` }}
                            ></div>
                            <span className="absolute -left-2 top-0 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></span>
                            <span 
                                className="absolute -left-2 w-1 h-1 bg-gf-green rounded-full transition-all duration-100"
                                style={{ top: `${scrollProgress * 100}%` }}
                            ></span>
                        </div>
                    </div>
                </aside>

                {/* CENTER CONTENT */}
                <div className="lg:col-span-8 lg:col-start-5">
                    
                    {/* Excerpt (Lead Paragraph) */}
                    <div className={`mb-16 transition-all duration-1000 delay-300 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className={`space-y-16 transition-all duration-1000 delay-400 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {post.content?.sections.map((section, idx) => (
                            <section key={idx} className="relative group">
                                
                                {/* Decorative Section Divider */}
                                <div className="flex items-center gap-4 mb-8 opacity-30">
                                    <div className="w-2 h-2 rounded-full bg-gf-green"></div>
                                    <div className="h-px flex-grow bg-gradient-to-r from-white/50 to-transparent"></div>
                                </div>

                                {/* Section Title */}
                                {section.title && (
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight tracking-tight">
                                        {section.title}
                                    </h2>
                                )}

                                {/* Image inside text (Styled) */}
                                {section.image && (
                                    <figure className="my-10 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black/40">
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                                        </div>
                                        <img 
                                            src={section.image} 
                                            alt={section.title || "Immagine articolo"} 
                                            className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    </figure>
                                )}

                                {/* Paragraph Text */}
                                <div className="text-gray-300 text-lg md:text-[1.15rem] leading-[1.8] font-light text-justify mix-blend-plus-lighter">
                                    {renderText(section.text, idx === 0 && !section.title)}
                                </div>
                            </section>
                        ))}
                    </div>

                </div>
            </div>
        </div>

        {/* --- NEXT / PREV NAVIGATION --- */}
        <div className="relative z-10 mt-32 border-t border-white/10 bg-gf-darker">
            <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* PREVIOUS POST */}
                <div 
                    onClick={() => prevPost && onNavigate && onNavigate(prevPost)}
                    className={`
                        relative h-[300px] md:h-[400px] group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 cursor-pointer
                        ${!prevPost ? 'pointer-events-none bg-black/40' : ''}
                    `}
                >
                    {prevPost && (
                        <>
                            <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${prevPost.image})` }}></div>
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                            <div className="absolute inset-0 flex flex-col justify-center p-12 items-start">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 group-hover:text-gf-green transition-colors flex items-center gap-2">
                                    <ArrowLeft size={14} /> Articolo Precedente
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-lg mb-2 group-hover:translate-x-2 transition-transform duration-500">
                                    {prevPost.title}
                                </h3>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Leggi ora
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* NEXT POST */}
                <div 
                    onClick={() => nextPost && onNavigate && onNavigate(nextPost)}
                    className={`
                        relative h-[300px] md:h-[400px] group overflow-hidden cursor-pointer
                        ${!nextPost ? 'pointer-events-none bg-black/40' : ''}
                    `}
                >
                    {nextPost && (
                        <>
                            <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${nextPost.image})` }}></div>
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                            <div className="absolute inset-0 flex flex-col justify-center p-12 items-end text-right">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 group-hover:text-gf-green transition-colors flex items-center gap-2">
                                    Articolo Successivo <ArrowRight size={14} />
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-lg mb-2 group-hover:-translate-x-2 transition-transform duration-500">
                                    {nextPost.title}
                                </h3>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Leggi ora
                                </span>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>

        {/* INTEGRATED FOOTER */}
        <Footer 
            onShowContact={handleFooterContact}
            onShowAbout={handleFooterAbout}
            onNavigate={handleFooterNavigate}
        />

      </article>

      <style>{`
        /* Custom selection color */
        ::selection {
            background-color: #005a48;
            color: white;
        }
      `}</style>
    </div>
  );
};

export default BlogPostDetail;
