import React, { useEffect, useState } from 'react';

interface HeroProps {
  onShowContact?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShowContact }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Layer */}
      <div 
        className={`absolute inset-0 z-0 transition-transform duration-[3000ms] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://www.youtube.com/watch?v=2Z1oKtxleb4")' }}
        ></div>

        {/* Gradient overlay to ensure text readability on the bright image */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white mt-12">
        <h1 
          className={`font-bold text-3xl md:text-5xl lg:text-7xl mb-6 tracking-tight leading-tight transition-all duration-1000 ease-out transform drop-shadow-xl flex flex-col md:block items-center justify-center ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          COSTRUIAMO CIÒ <br className="md:hidden" />
          <span className="text-gf-green italic inline-flex items-center gap-2 md:gap-4 align-middle">
            CHE UNISCE
            {/* Custom Animated Union Icon */}
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gf-green/20 rounded-full blur-md animate-pulse"></div>
                
                {/* Left Bracket */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 md:w-4 md:h-8 border-l-4 border-t-4 border-b-4 border-gf-green rounded-l-md animate-[slideRight_2s_ease-in-out_infinite]"></div>
                
                {/* Right Bracket */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 md:w-4 md:h-8 border-r-4 border-t-4 border-b-4 border-gf-green rounded-r-md animate-[slideLeft_2s_ease-in-out_infinite]"></div>
                
                {/* Center Connection Spark */}
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full opacity-0 animate-[spark_2s_ease-in-out_infinite]"></div>
            </div>
          </span>
        </h1>
        
        <p 
          className={`text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 text-gray-100 transition-all duration-1000 delay-300 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Noleggio e allestimento strutture per eventi in tutto il Centro Italia
        </p>
        
        <div 
          className={`transition-all duration-1000 delay-500 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <button 
            onClick={onShowContact}
            className="inline-block bg-gf-green hover:bg-emerald-800 text-white font-medium py-3 px-10 text-sm tracking-widest uppercase transition-all rounded-full shadow-[0_10px_20px_rgba(0,112,90,0.3)] hover:shadow-[0_15px_30px_rgba(0,112,90,0.5)] transform hover:-translate-y-1 cursor-pointer"
          >
            Contattaci
          </button>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <a 
        href="#chi-siamo"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000 delay-1000 cursor-pointer hover:opacity-100 z-30 ${
          loaded ? 'opacity-70' : 'opacity-0'
        }`}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 shadow-black drop-shadow-md">Scroll</span>
      </a>

      {/* Inject Custom Keyframes for the Icon */}
      <style>{`
        @keyframes slideRight {
            0%, 100% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(4px) translateY(-50%); }
        }
        @keyframes slideLeft {
            0%, 100% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(-4px) translateY(-50%); }
        }
        @keyframes spark {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
};

export default Hero;