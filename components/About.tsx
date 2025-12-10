import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Truck, Users, Clock, ArrowRight } from 'lucide-react';

interface AboutProps {
    onShowAllAbout?: () => void;
}

const About: React.FC<AboutProps> = ({ onShowAllAbout }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
        icon: Clock, 
        value: "20+", 
        label: "Anni Esp.", 
        hoverClass: "group-hover:animate-[pendulum_1.5s_ease-in-out_infinite]",
        delay: 0
    },
    { 
        icon: Users, 
        value: "50+", 
        label: "Partner", 
        hoverClass: "group-hover:animate-[heartbeat_1.5s_ease-in-out_infinite]",
        delay: 100
    },
    { 
        icon: Truck, 
        value: "100%", 
        label: "Italia", 
        hoverClass: "group-hover:animate-[drive_0.8s_ease-in-out_infinite]",
        delay: 200
    },
    { 
        icon: ShieldCheck, 
        value: "ISO", 
        label: "Cert.", 
        hoverClass: "group-hover:animate-[pulse_2s_ease-in-out_infinite]",
        delay: 300
    },
  ];

  return (
    <section id="chi-siamo" ref={sectionRef} className="py-24 md:py-32 bg-gf-darker relative overflow-hidden text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gf-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LEFT IMAGE - Visible only on Desktop */}
            <div className={`hidden lg:block lg:col-span-3 transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-y-12' : 'opacity-0 translate-y-32'}`}>
                <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                    <img 
                        src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1765395251/main-sample.png" 
                        alt="Event Setup Detail" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-xs font-mono text-gf-green uppercase tracking-widest">
                        Technical Setup
                    </div>
                </div>
            </div>

            {/* CENTER CONTENT */}
            <div className={`lg:col-span-6 text-center transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                
                {/* Badge with Mini Animated Icon */}
                <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    {/* Mini Animated Union Icon */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3 border-l-2 border-t-2 border-b-2 border-gf-green rounded-l-[2px] animate-[slideRightSmall_2s_ease-in-out_infinite]"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 border-r-2 border-t-2 border-b-2 border-gf-green rounded-r-[2px] animate-[slideLeftSmall_2s_ease-in-out_infinite]"></div>
                        <div className="w-1 h-1 bg-white rounded-full opacity-0 animate-[spark_2s_ease-in-out_infinite]"></div>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">La Nostra Visione</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-none tracking-tight">
                    Costruiamo ciò <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">che unisce.</span>
                </h2>

                {/* Paragraphs */}
                <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed mb-12">
                    <p>
                        <strong className="text-white font-medium">Non è un semplice slogan.</strong> È la visione che guida ogni nostro singolo allestimento dal 2005.
                    </p>
                    <p>
                        GF Service nasce con l'obiettivo di fornire non solo strutture, ma <span className="text-white border-b border-gf-green/50 pb-0.5">soluzioni</span>. Sappiamo che dietro ogni palco, ogni tensostruttura e ogni impianto c'è un evento irripetibile, un'emozione da proteggere e un pubblico da accogliere.
                    </p>
                    <p className="text-base text-gray-400">
                        Operiamo in tutto il Centro Italia con un parco mezzi proprietario e squadre di tecnici specializzati, garantendo rapidità d'intervento e certificazione di ogni componente installato.
                    </p>
                </div>
                
                {/* CTA to Full Page */}
                <div className="mb-12">
                     <button 
                        onClick={onShowAllAbout}
                        className="inline-flex items-center gap-2 text-white border-b border-gf-green pb-1 hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest cursor-pointer group"
                     >
                        Approfondisci la nostra storia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                </div>

                {/* Stats Row with Enhanced Icons */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-10 border-t border-white/10">
                    {stats.map((stat, idx) => (
                        <div 
                            key={idx} 
                            className="flex flex-col items-center gap-4 group cursor-default relative"
                            style={{ 
                                transitionDelay: `${stat.delay}ms`,
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.8s ease-out'
                            }}
                        >
                             {/* Icon Container */}
                             <div className="relative">
                                {/* Glow Ring (expands on hover) */}
                                <div className="absolute inset-0 rounded-full border border-gf-green/0 group-hover:border-gf-green/50 scale-100 group-hover:scale-150 transition-all duration-500 ease-out z-0"></div>
                                
                                {/* Background Circle */}
                                <div className="relative z-10 w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gf-green group-hover:bg-gf-green group-hover:text-white group-hover:border-gf-green transition-all duration-300 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(0,112,90,0.4)]">
                                    <stat.icon size={26} strokeWidth={1.5} className={`transition-transform duration-300 ${stat.hoverClass}`} />
                                </div>
                             </div>

                             <div className="text-center group-hover:transform group-hover:translate-y-1 transition-transform duration-300">
                                 <div className="font-bold text-2xl text-white leading-none mb-1 group-hover:text-gf-green transition-colors">{stat.value}</div>
                                 <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/60 transition-colors">{stat.label}</div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT IMAGE - Visible only on Desktop */}
            <div className={`hidden lg:block lg:col-span-3 transition-all duration-1000 ease-out delay-300 ${inView ? 'opacity-100 -translate-y-12' : 'opacity-0 translate-y-32'}`}>
                <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                    <img 
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
                        alt="Team Work" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                     <div className="absolute bottom-4 right-4 text-xs font-mono text-gf-green uppercase tracking-widest text-right">
                        Human Factor
                    </div>
                </div>
            </div>

            {/* MOBILE IMAGE - Visible only on Mobile (< lg) */}
            <div className="block lg:hidden w-full mt-8">
                <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                     <img 
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
                        alt="Team Work" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-transparent"></div>
                </div>
            </div>

        </div>
      </div>
      
      {/* Inject Keyframes for Animations */}
      <style>{`
        @keyframes slideRightSmall {
            0%, 100% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(2px) translateY(-50%); }
        }
        @keyframes slideLeftSmall {
            0%, 100% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(-2px) translateY(-50%); }
        }
        @keyframes pendulum {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(15deg); }
            75% { transform: rotate(-15deg); }
        }
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        @keyframes drive {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(2px) rotate(2deg); }
            75% { transform: translateX(-2px) rotate(-2deg); }
        }
      `}</style>
    </section>
  );
};

export default About;