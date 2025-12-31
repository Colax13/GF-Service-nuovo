
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Truck, Zap, ArrowRight, Star } from 'lucide-react';

const StreetFoodSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tourStats = [
    { icon: Truck, label: "Food Truck", value: "120+" },
    { icon: MapPin, label: "Città Toccate", value: "50" },
    { icon: Zap, label: "Kw/h Forniti", value: "500K" },
  ];

  const stops = [
    { city: "Roma", location: "Piazzale della Radio", status: "Concluso" },
    { city: "Milano", location: "Idroscalo", status: "Concluso" },
    { city: "Napoli", location: "Centro Direzionale", status: "In Arrivo" },
    { city: "Torino", location: "Parco Dora", status: "In Arrivo" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-32 bg-transparent overflow-hidden"
    >
      {/* Elementi decorativi leggeri invece di un'immagine di sfondo */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gf-green/10 blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* LEFT COLUMN: Narrative & Stats */}
            <div className={`space-y-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gf-green/10 border border-gf-green/20 rounded-full text-gf-green text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                        <Star size={12} fill="currentColor" /> Partnership d'Eccellenza
                    </div>

                    <h2 className="text-white font-bold text-5xl md:text-7xl leading-[0.9] tracking-tighter uppercase">
                        International <br/>
                        <span className="font-serif italic text-gf-green font-light lowercase">Street Food</span>
                    </h2>

                    <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                        Siamo il motore tecnico dietro il tour gastronomico più grande d'Italia. Una sfida logistica che si rinnova ogni weekend.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/5">
                    {tourStats.map((stat, i) => (
                        <div key={i} className="group">
                            <div className="text-3xl font-bold text-white mb-1 group-hover:text-gf-green transition-colors">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 text-gray-300 font-light leading-relaxed">
                    <p>
                        Garantiamo stabilità energetica e coperture certificate a <strong>120 truck in movimento costante</strong>. 
                        Dalle grandi metropoli ai borghi storici, il nostro team assicura che ogni piazza diventi un ristorante a cinque stelle sotto le stelle.
                    </p>
                    <a href="#contatti" className="inline-flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest hover:text-gf-green transition-colors group/btn w-fit mt-2">
                        Richiedi supporto per il tuo tour <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform text-gf-green" />
                    </a>
                </div>
            </div>

            {/* RIGHT COLUMN: Tour Poster Layout */}
            <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                
                {/* Visual Frame */}
                <div className="relative group">
                    {/* The Poster-like Card */}
                    <div className="bg-gf-darker border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10">
                        <div className="bg-gf-green/20 backdrop-blur-md p-6 border-b border-white/5 flex justify-between items-center">
                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.3em] text-gf-green font-bold mb-1">Stagione 2025</span>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Technical Schedule</h3>
                            </div>
                            <Calendar size={24} className="text-gf-green opacity-50" />
                        </div>

                        <div className="p-8">
                            <ul className="space-y-6">
                                {stops.map((stop, i) => (
                                    <li key={i} className="flex items-center justify-between group/item">
                                        <div>
                                            <div className="font-bold text-lg text-white group-hover/item:text-gf-green transition-colors">{stop.city}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stop.location}</div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${stop.status === 'Concluso' ? 'bg-white/5 text-gray-500' : 'bg-gf-green/20 text-gf-green flex items-center gap-1.5'}`}>
                                            {stop.status === 'In Arrivo' && <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span>}
                                            {stop.status}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Official Partner</span>
                                <div className="text-lg font-black tracking-[0.3em] text-white opacity-40">MALÙ SERVICE AND GAMES</div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative back elements to give depth without using an image */}
                    <div className="absolute -inset-4 bg-gf-green/5 blur-3xl rounded-full -z-10 group-hover:bg-gf-green/10 transition-colors duration-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gf-green/10 rounded-2xl transform rotate-3 -z-10"></div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default StreetFoodSection;
