
import React, { useEffect, useState } from 'react';
import { ArrowLeft, X, Calendar, Clock, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

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
  onClose: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const handleScroll = (e: any) => {
      const totalScroll = e.target.scrollTop;
      const totalHeight = e.target.scrollHeight - e.target.clientHeight;
      const scroll = totalScroll / totalHeight;
      setScrollProgress(scroll || 0);
    };

    const container = document.getElementById('blog-post-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Gallery Logic
  const galleryImages = post.content?.gallery || [];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Helper per renderizzare il testo con grassetto (**testo**)
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
      id="blog-post-container"
      className="fixed inset-0 z-[120] bg-gf-darker overflow-y-auto overflow-x-hidden animate-in fade-in duration-300"
    >
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gf-green z-[135]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[140] w-12 h-12 bg-black/50 hover:bg-gf-green backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-300 group border border-white/10"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${post.image}")` }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gf-darker"></div>
        </div>
        
        <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-16 md:pb-24">
           <div className={`max-w-5xl transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="flex items-center gap-4 mb-8">
                 <span className="px-4 py-1.5 bg-gf-green text-white text-xs font-bold uppercase tracking-widest rounded-md">
                    {post.category}
                 </span>
                 <span className="flex items-center gap-2 text-gray-300 text-sm uppercase tracking-wider font-medium">
                    <Calendar size={14} /> {post.date}
                 </span>
                 <span className="flex items-center gap-2 text-gray-300 text-sm uppercase tracking-wider font-medium">
                    <Clock size={14} /> {post.readTime}
                 </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] drop-shadow-2xl tracking-tight uppercase">
                {post.title}
              </h1>
              
              {post.subtitle && (
                <p className="text-xl md:text-3xl text-gray-200 font-light leading-snug drop-shadow-md max-w-4xl">
                  {post.subtitle}
                </p>
              )}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
         {/* Container allargato da 4xl a screen-xl */}
         <div className="max-w-screen-xl mx-auto">
            
            {post.content?.sections.map((section, idx) => (
              <React.Fragment key={idx}>
                <div className={`mb-24 flex flex-col ${section.imageSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                  
                  {/* Text Block */}
                  <div className={`flex-1 ${!section.image ? 'w-full max-w-5xl mx-auto' : ''}`}>
                    {section.title && (
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-none tracking-tight">
                        {section.title}
                      </h2>
                    )}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light whitespace-pre-line">
                      {renderText(section.text)}
                    </p>
                  </div>

                  {/* Image Block */}
                  {section.image && (
                    <div className={`flex-1 w-full ${section.imageSide === 'full' ? 'lg:w-full' : 'lg:w-1/2'}`}>
                      <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl group relative h-[400px] md:h-[500px] w-full">
                         <img 
                            src={section.image} 
                            alt={section.title || "Blog detail"} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                         />
                      </div>
                    </div>
                  )}
                </div>

                {/* INJECT GALLERY IN THE MIDDLE (After section index 1) */}
                {idx === 1 && galleryImages.length > 0 && (
                   <div className="w-full mb-32 relative">
                        <div className="text-center mb-10">
                            <h3 className="text-sm font-bold text-gf-green uppercase tracking-[0.3em]">Galleria Evento</h3>
                        </div>
                        
                        <div className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                            {/* Slides */}
                            <div className="w-full h-full relative">
                                <div 
                                    className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
                                    style={{ backgroundImage: `url("${galleryImages[currentSlide]}")` }}
                                >
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                            </div>

                            {/* Controls */}
                            <button 
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-gf-green backdrop-blur-md text-white flex items-center justify-center rounded-full transition-all border border-white/10 z-20 group/btn"
                            >
                                <ChevronLeft size={24} className="group-hover/btn:-translate-x-1 transition-transform" />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-black/50 hover:bg-gf-green backdrop-blur-md text-white flex items-center justify-center rounded-full transition-all border border-white/10 z-20 group/btn"
                            >
                                <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                                {galleryImages.map((_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-gf-green' : 'w-2 bg-white/50 hover:bg-white'}`}
                                    />
                                ))}
                            </div>
                        </div>
                   </div>
                )}
              </React.Fragment>
            ))}
            
            {/* Share / Footer */}
            <div className="border-t border-white/10 pt-16 mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
               <button 
                  onClick={onClose}
                  className="flex items-center gap-3 text-white hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest group px-6 py-3 border border-white/10 hover:border-gf-green rounded-full"
               >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Torna agli articoli
               </button>
               
               <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-bold">Condividi articolo:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gf-green transition-all border border-white/5">
                        <Share2 size={16} />
                    </button>
                  </div>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default BlogPostDetail;
