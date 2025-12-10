import React, { useEffect, useState, useRef } from 'react';

const EmotionalSeparator: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollSpeed = 0.5;
      // Calculate offset based on position relative to viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffset((rect.top) * scrollSpeed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] overflow-hidden bg-black flex items-center justify-center">
      {/* Parallax Background Image - Emphasizing Emotion/People */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${offset}px)`,
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform'
        }}
      >
        {/* Cinematic Filter */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gf-darker via-transparent to-gf-darker"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Non costruiamo solo spazi. <br/>
          <span className="italic text-gf-green font-serif">Creiamo ricordi.</span>
        </h2>
        <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mb-6"></div>
        <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide leading-relaxed drop-shadow-lg">
          Dietro ogni struttura c'è un battito, un brindisi, un applauso.
          <br className="hidden md:block" />
          La vita dell'evento accade qui.
        </p>
      </div>
    </section>
  );
};

export default EmotionalSeparator;