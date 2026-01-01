import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface TiltCardProps {
  title: string;
  subtitle: string;
  image: string;
  forceHover?: boolean; // Prop to force the hover state (for mobile active slide)
}

const TiltCard: React.FC<TiltCardProps> = ({ title, subtitle, image, forceHover = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Combine actual hover state with forced state (for mobile)
  const active = isHovering || forceHover;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt on forced hover (mobile) to keep it stable
    if (!cardRef.current || forceHover) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    const x = yPct * -15;
    const y = xPct * 15;

    setRotation({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full h-[450px] perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full relative rounded-[24px] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ease-out cursor-pointer group ${active ? 'scale-105 border-gf-green/30' : 'scale-100'}`}
        style={{
          // Only apply rotation if not forced (desktop)
          transform: !forceHover ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)` : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Background */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${active ? 'scale-110' : 'scale-100'}`}
          style={{ backgroundImage: `url("${image}")` }}
        >
          {/* Dark Gradient Overlay - Darkens on active */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-0'}`}></div>
          <div className={`absolute inset-0 bg-black/10 transition-colors duration-500 ${active ? 'bg-black/40' : ''}`}></div>
        </div>

        {/* Content */}
        <div 
          className="absolute bottom-0 left-0 w-full p-6 text-center transform translate-z-20 flex flex-col items-center justify-end h-full pb-12 transition-all duration-500"
          style={{ transform: 'translateZ(60px)' }}
        >
          {/* Title - Moves up on active */}
          <h3 className={`text-white font-bold text-2xl uppercase leading-none tracking-tight mb-0 drop-shadow-xl font-sans transform transition-transform duration-500 ${active ? 'translate-y-0 text-gf-green' : 'translate-y-8'}`}>
            {title}
          </h3>
          
          {/* Hidden Content Container */}
          <div className="flex flex-col items-center">
            {/* Separator - Expands on active */}
            <div className={`h-[2px] bg-gf-green transition-all duration-500 mb-3 mt-3 delay-75 ${active ? 'w-12' : 'w-0'}`}></div>

            {/* Subtitle - Fades in */}
            <p className={`text-gray-200 text-sm font-medium transition-all duration-500 mb-4 max-w-[90%] leading-snug delay-100 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
               {subtitle}
            </p>

            {/* Link - Fades in */}
            <span className={`text-xs text-gf-green font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-500 delay-150 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Scopri <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServicesProps {
  onShowAllServices?: () => void;
  onShowContact?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onShowAllServices, onShowContact }) => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const dragMovedRef = useRef(false); // Track if drag occurred

  // Animation State
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    { 
      title: "COPERTURE MODULARI", 
      subtitle: "Tendostrutture modulari e gazebo professionali",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766962753/tendostruttura_realistica_pa55up.png" 
    },
    { 
      title: "TAVOLI E SEDUTE", 
      subtitle: "Tavoli, sedie e soluzioni lounge per ogni stile",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1765399355/panche_ymac2l.png" 
    },
    { 
      title: "CASETTE DI LEGNO", 
      subtitle: "Strutture in legno per mercatini ed eventi",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg" 
    },
    { 
      title: "SPILLATORI MOBILI", 
      subtitle: "Impianti spina e fornitura beverage",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767279264/Spillatori_home_page_vwleui.png" 
    },
    { 
      title: "GIOCHI E INTRATTENIMENTO", 
      subtitle: "Aree svago e divertimento per tutti",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427510/flipper_rb0m4z.jpg" 
    },
  ];

  // Section Visibility Observer (Triggers Enter/Exit Animations)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { 
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "-50px" // Slight offset so it doesn't trigger immediately at edge
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mobile Carousel Intersection Observer to set active index
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
        threshold: 0.6 // Trigger when 60% of the card is visible
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // --- Dragging Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    dragMovedRef.current = false; // Reset drag status

    // Only enable dragging if NOT in desktop view (matching lg:hidden logic)
    // Tailwind lg is 1024px.
    if (window.innerWidth >= 1024 || !scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    dragMovedRef.current = true; // Mark as dragged
    const x = e.pageX - scrollRef.current.offsetLeft;
    // Multiplier for drag speed
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  // This is the key handler for clicking a service card
  const handleCardClick = () => {
    // Only navigate if we haven't been dragging
    if (!dragMovedRef.current && onShowAllServices) {
        onShowAllServices();
    }
  };

  // --- Arrow Navigation ---
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Determine card width based on screen size:
      // - Mobile (< 768px): 85% width
      // - Tablet (>= 768px && < 1024px): 45% width (matches css md:min-w-[45vw])
      const isTablet = window.innerWidth >= 768;
      const cardWidthPercentage = isTablet ? 0.45 : 0.85;
      const scrollAmount = window.innerWidth * cardWidthPercentage;
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (onShowContact) {
      e.preventDefault();
      onShowContact();
    }
  };

  return (
    <section 
      id="servizi" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-black relative overflow-hidden flex flex-col items-center"
      style={{ perspective: '1200px' }}
    >
      
      {/* 
        Dynamic Ambient Background
        Matches Projects.tsx style: Blur + Opacity Transition
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {services.map((service, index) => {
              // Mobile: Active based on scroll (activeMobileIndex)
              // Desktop: Active based on hover (hoveredIndex)
              const isMobileActive = activeMobileIndex === index;
              const isDesktopHover = hoveredIndex === index;

              return (
                  <div 
                      key={index}
                      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${isMobileActive ? 'opacity-50' : 'opacity-0'} ${isDesktopHover ? 'lg:opacity-50' : 'lg:opacity-0'}`}
                      style={{ 
                          backgroundImage: `url(${service.image})`,
                          filter: 'blur(60px) saturate(2)', 
                          transform: 'scale(1.2)'
                      }}
                  />
              );
          })}
          
          {/* Overlays for readability and theme blending */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
      </div>

      {/* 
         Previous Spotlight Effect (Kept subtle to add depth on top of blur)
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-b from-white/5 to-transparent blur-3xl opacity-10"></div>
          {/* Floor reflection simulation */}
          <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-gf-green/5 to-transparent opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        
        {/* Centered Header with refined typography (Matched Projects.tsx) */}
        <div className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Our Expertise</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              COSA <span className="font-serif italic text-gf-green font-light">OFFRIAMO</span>
            </h2>
            
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Ogni evento parte da una base solida. <br className="hidden md:block" />
              Per questo curiamo tutto: sopralluogo, trasporto, montaggio e assistenza.
            </p>
        </div>

        {/* 
          Container:
          - Mobile & Tablet: Flex + Horizontal Scroll (Carousel)
          - Desktop (lg+): Grid
          - Animation: Staggered entry for the whole container
        */}
        <div 
          ref={scrollRef}
          className={`
            flex 
            lg:grid lg:grid-cols-3 xl:grid-cols-5 
            gap-6 
            overflow-x-auto lg:overflow-visible 
            snap-x snap-mandatory lg:snap-none 
            pb-8 lg:pb-0 
            -mx-4 lg:mx-0
            px-[7.5vw] md:px-[27.5vw] lg:px-0
            scrollbar-hide
            transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] transform
            ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-40 scale-95'}
            ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab lg:cursor-auto'}
          `}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, idx) => (
             <div 
               key={idx} 
               ref={(el) => { cardRefs.current[idx] = el; }}
               data-index={idx}
               className="
                 min-w-[85vw] md:min-w-[45vw] lg:min-w-0 
                 snap-center 
                 flex justify-center 
                 select-none
               " 
               onMouseEnter={() => setHoveredIndex(idx)}
               onMouseLeave={() => setHoveredIndex(null)}
               // Apply click handler to the wrapper of the card
               onClick={handleCardClick}
             >
               {/* 
                  On mobile/tablet (lg:hidden), we use the version with 'forceHover' for the active item.
                  On desktop (lg:block), we use the standard interactive card.
               */}
               <div className="block lg:hidden w-full pointer-events-none">
                  <TiltCard {...service} forceHover={idx === activeMobileIndex} />
               </div>
               <div className="hidden lg:block w-full">
                  <TiltCard {...service} />
               </div>
             </div>
          ))}
        </div>

        {/* Mobile & Tablet Navigation Controls - Arrows + Pagination Dots */}
        <div className={`flex lg:hidden justify-center items-center gap-6 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left Arrow */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green hover:border-gf-green transition-all text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous service"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {services.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeMobileIndex ? 'w-8 bg-gf-green' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scrollCarousel('right')}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green hover:border-gf-green transition-all text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next service"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className={`mt-16 text-center flex flex-col md:flex-row justify-center items-center gap-4 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <button 
            onClick={onShowAllServices}
            className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-gf-green hover:bg-white/5 text-white font-medium py-3 px-10 text-sm tracking-widest uppercase transition-all rounded-full group"
          >
            <Layers size={16} className="text-gf-green group-hover:text-white transition-colors" />
            Tutti i servizi
          </button>

          <a 
            href="#contatti"
            onClick={handleQuoteClick}
            className="inline-block bg-gf-green hover:bg-emerald-800 text-white font-medium py-3 px-10 text-sm tracking-widest uppercase transition-all rounded-full shadow-[0_10px_20px_rgba(0,112,90,0.3)] hover:shadow-[0_15px_30px_rgba(0,112,90,0.5)] transform hover:-translate-y-1 cursor-pointer"
          >
            Richiedi un preventivo
          </a>
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

export default Services;