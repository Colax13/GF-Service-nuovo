import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { ProjectData } from './ProjectDetail';

interface ProjectsProps {
  onShowAllProjects?: () => void;
  onProjectSelect?: (project: ProjectData) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onShowAllProjects, onProjectSelect }) => {
  const projects = [
    {
      title: "October Fest",
      location: "Alatri",
      category: "Sagra",
      year: "2024",
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Sagra dell'Uva",
      location: "Marino",
      category: "Festa Patronale",
      year: "2024",
      image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Festival del Jazz",
      location: "Atina",
      category: "Concerto",
      year: "2025",
      image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Street Food Int.",
      location: "Latina",
      category: "Tour Gastronomico",
      year: "2025",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Villaggio di Natale",
      location: "Frosinone",
      category: "Allestimento Tematico",
      year: "2023",
      image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  // Unified State for both Desktop and Mobile
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation State
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Swipe/Drag State (Touch)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  // Track if we moved enough to consider it a drag vs a click
  const dragMovedRef = useRef(false);

  // Wheel Cooldown to prevent rapid skipping
  const wheelCooldown = useRef(false);
  
  // Computed drag offset (0 when not dragging)
  const dragOffset = isDragging ? currentX - startX : 0;
  
  const minSwipeDistance = 50;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "-50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Navigation Logic
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Wheel Event Listener for Discrete Trackpad Scrolling
  useEffect(() => {
    const container = mobileContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
        // Check if horizontal scroll is dominant
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault(); // Prevent browser back/forward navigation

            // If we recently switched slides, ignore this event (debounce/cooldown)
            if (wheelCooldown.current) return;

            const threshold = 20; // Sensitivity threshold

            if (e.deltaX > threshold) {
                // Scrolling Right -> Go Next
                nextSlide();
                activateCooldown();
            } else if (e.deltaX < -threshold) {
                // Scrolling Left -> Go Prev
                prevSlide();
                activateCooldown();
            }
        }
    };

    const activateCooldown = () => {
        wheelCooldown.current = true;
        // Lock for 800ms to allow transition to complete and prevent "spinning"
        setTimeout(() => {
            wheelCooldown.current = false;
        }, 800);
    };

    // Passive: false is required to use preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
        container.removeEventListener('wheel', handleWheel);
    };
  }, [projects.length]);

  // --- Interaction Handlers (Touch + Mouse Drag) ---
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    dragMovedRef.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
    if(Math.abs(clientX - startX) > 10) {
        dragMovedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine snap direction based on drag distance
    if (dragOffset > minSwipeDistance) {
      prevSlide(); // Swipe Right -> Prev
    } else if (dragOffset < -minSwipeDistance) {
      nextSlide(); // Swipe Left -> Next
    }
  };

  const handleProjectClick = (index: number) => {
      // If we were dragging, don't trigger click
      if(dragMovedRef.current) return;

      const len = projects.length;
      const prevIndex = (currentIndex - 1 + len) % len;
      const nextIndex = (currentIndex + 1) % len;

      if (index === prevIndex) {
          prevSlide();
      } else if (index === nextIndex) {
          nextSlide();
      } else if (index === currentIndex) {
          // Open detail view
          if(onProjectSelect) onProjectSelect(projects[index]);
      }
  };

  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.targetTouches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
    handleDragMove(e.clientX);
  };
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // --- Styles Generators ---

  // Desktop: Original Logic
  const getDesktopSlideStyles = (index: number) => {
    if (index === currentIndex) {
      return "z-30 opacity-100 scale-100 translate-x-0 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 hover:border-gf-green";
    }
    
    const len = projects.length;
    const prevIndex = (currentIndex - 1 + len) % len;
    const nextIndex = (currentIndex + 1) % len;
    
    if (index === prevIndex) {
      return "z-10 opacity-50 scale-90 -translate-x-[65%] cursor-pointer hover:opacity-70 hover:scale-[0.92] grayscale-[50%] hover:grayscale-[20%]";
    }
    if (index === nextIndex) {
      return "z-10 opacity-50 scale-90 translate-x-[65%] cursor-pointer hover:opacity-70 hover:scale-[0.92] grayscale-[50%] hover:grayscale-[20%]";
    }
    
    return "z-0 opacity-0 scale-75 translate-x-0 pointer-events-none"; 
  };

  // Mobile/Tablet
  const getMobileStyle = (index: number) => {
    const len = projects.length;
    const prevIndex = (currentIndex - 1 + len) % len;
    const nextIndex = (currentIndex + 1) % len;

    let baseTranslate = '0%';
    let baseScale = 0.8;
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents = 'none';

    if (index === currentIndex) {
      baseTranslate = '0%';
      baseScale = 1;
      opacity = 1;
      zIndex = 30;
      pointerEvents = 'auto';
    } else if (index === prevIndex) {
      baseTranslate = '-85%'; // Left side
      baseScale = 0.9;
      opacity = 0.4;
      zIndex = 10;
    } else if (index === nextIndex) {
      baseTranslate = '85%'; // Right side
      baseScale = 0.9;
      opacity = 0.4;
      zIndex = 10;
    }

    if (index !== currentIndex && index !== prevIndex && index !== nextIndex) {
        return { display: 'none' };
    }

    const finalOffset = isDragging ? dragOffset : 0;

    return {
      zIndex,
      opacity,
      pointerEvents,
      transform: `translateX(calc(${baseTranslate} + ${finalOffset}px)) scale(${baseScale})`,
      transition: isDragging ? 'none' : 'all 500ms ease-out', 
      display: 'block'
    };
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onShowAllProjects) onShowAllProjects();
  };

  return (
    <section 
      id="progetti" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-black relative overflow-hidden flex flex-col items-center"
      style={{ perspective: '1200px' }} 
    >
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {projects.map((project, index) => (
              <div 
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-opacity ${
                      index === currentIndex ? 'opacity-50' : 'opacity-0'
                  }`}
                  style={{ 
                      backgroundImage: `url(${project.image})`,
                      filter: 'blur(60px) saturate(2)', 
                      transform: 'scale(1.1)'
                  }}
              />
          ))}
          
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center w-full">
        
        <div className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Selected Works</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              PROGETTI <span className="font-serif italic text-gf-green font-light">Iconici</span>
            </h2>
            
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Trasformiamo piazze e location in palcoscenici indimenticabili. <br className="hidden md:block" />
              Sfoglia alcune delle nostre realizzazioni più recenti.
            </p>
        </div>

        {/* DESKTOP CAROUSEL */}
        <div 
          className="hidden lg:flex relative h-[500px] w-full items-center justify-center mt-4 mb-12"
          style={{
            transform: inView ? 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)' : 'perspective(1000px) rotateX(20deg) translateY(150px) scale(0.9)',
            opacity: inView ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s'
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(index)}
              className={`absolute top-0 w-[60%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden ${getDesktopSlideStyles(index)}`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                 <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>
                 <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                 {/* Detail Hover Overlay */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="border border-white px-6 py-2 text-white uppercase tracking-widest text-sm font-bold">
                        Vedi Progetto
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-12 left-12 max-w-[90%] pointer-events-none">
                 <h3 className="text-3xl lg:text-5xl font-bold text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tight">
                   {project.title}
                 </h3>
                 <div className="flex items-center gap-3">
                   <div className="h-[2px] w-8 bg-gf-green"></div>
                   <p className="text-white uppercase text-sm lg:text-base tracking-[0.2em] font-bold drop-shadow-md">
                     {project.location}
                   </p>
                 </div>
              </div>
            </div>
          ))}

          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-xl hover:scale-110 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button 
             onClick={(e) => { e.stopPropagation(); nextSlide(); }}
             className="absolute right-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-xl hover:scale-110 group"
          >
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* MOBILE CAROUSEL */}
        <div 
          ref={mobileContainerRef}
          className={`lg:hidden relative h-[450px] w-full flex items-center justify-center mt-4 mb-8 transition-all duration-1000 delay-300 ease-out transform select-none ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
          } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          {projects.map((project, index) => {
            const styles = getMobileStyle(index);
            if (styles.display === 'none') return null;

            return (
              <div
                key={index}
                onClick={() => handleProjectClick(index)}
                className="absolute top-0 w-[75vw] md:w-[60vw] h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 active:scale-95 transition-transform"
                style={styles as React.CSSProperties}
              >
                <div 
                    className="w-full h-full bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-8 left-6 right-6 pointer-events-none">
                  <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-8 bg-gf-green"></div>
                    <p className="text-white uppercase text-sm tracking-[0.2em] font-bold">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={`lg:hidden flex items-center justify-center gap-6 mt-6 mb-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green text-white active:scale-95"><ChevronLeft size={20} /></button>
            <div className="flex gap-2">
              {projects.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gf-green' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gf-green text-white active:scale-95"><ChevronRight size={20} /></button>
        </div>

        <div className={`mt-8 flex flex-col items-center gap-6 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
             <div className="font-mono text-sm text-gray-500 tracking-widest">
                <span className="text-white text-lg">0{currentIndex + 1}</span> / 0{projects.length}
             </div>

             <a 
                href="#progetti-all"
                onClick={handleViewAllClick}
                className="group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold hover:text-gf-green transition-colors cursor-pointer"
             >
                <span className="border-b border-white/30 pb-1 group-hover:border-gf-green transition-all">Vedi tutto il portfolio</span>
                <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
