import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Truck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      className="relative w-full py-24 bg-gf-darker overflow-hidden flex items-center justify-center border-t border-white/5"
    >
      {/* 1. Background Atmosphere (Night Market Vibe) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 transition-transform duration-[2000ms]"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1533552083626-47674dc0535e?q=80&w=1974&auto=format&fit=crop")',
            transform: isVisible ? 'scale(1.05)' : 'scale(1.0)',
            filter: 'blur(4px)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gf-darker via-gf-darker/95 to-gf-darker/60"></div>
        {/* Grainy Texture for urban feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT COLUMN: The Copywriting Strategy (Problem/Solution) */}
            <div className={`space-y-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                
                {/* NEW: Conversational Intro */}
                <div>
                    <p className="text-gray-400 font-serif italic text-xl md:text-2xl mb-3">
                        Ma lo sapevi che siamo...
                    </p>
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-xs font-bold uppercase tracking-widest">
                        ★ Official Technical Partner
                    </div>
                </div>

                {/* Headline */}
                <h2 className="text-white font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter uppercase">
                    International <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Street Food</span>
                </h2>

                {/* The "Story/Solution" Copy */}
                <div className="border-l-2 border-gf-green pl-6 py-2">
                    <p className="text-xl text-white font-medium mb-2">
                        Il tour gastronomico più grande d'Italia ha bisogno di spalle larghe.
                    </p>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Dietro ogni cartoccio di pesce fritto e ogni hamburger gourmet, c'è una nostra struttura. 
                        Garantiamo energia, coperture e sicurezza a <strong>120 truck in movimento costante</strong>. 
                        Loro mettono il gusto, noi costruiamo il ristorante a cielo aperto.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                    {tourStats.map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 text-center group hover:border-gf-green/30 transition-colors">
                            <stat.icon size={20} className="mx-auto text-gf-green mb-2 group-hover:scale-110 transition-transform" />
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                    <a href="#contatti" className="inline-flex items-center gap-3 text-white font-bold border-b border-gf-green pb-1 hover:text-gf-green transition-colors">
                        Scopri tutto il nostro tour <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            {/* RIGHT COLUMN: The Visual Proof (Tour Dates / "Poster" Look) */}
            <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                
                {/* The Card */}
                <div className="bg-white text-gf-darker rounded-xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto lg:ml-auto">
                    
                    {/* Card Header */}
                    <div className="bg-gf-green p-6 text-white flex justify-between items-center">
                        <div>
                            <span className="block text-xs uppercase tracking-widest opacity-80">Edizione 2025</span>
                            <span className="block text-2xl font-black uppercase">Tour Schedule</span>
                        </div>
                        <Calendar size={32} className="opacity-50" />
                    </div>

                    {/* Image Strip */}
                    <div className="h-48 bg-gray-200 relative overflow-hidden group">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop")' }}
                        ></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* List */}
                    <div className="p-6">
                        <ul className="space-y-4">
                            {stops.map((stop, i) => (
                                <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-bold text-lg leading-none">{stop.city}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{stop.location}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${stop.status === 'Concluso' ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-700 flex items-center gap-1'}`}>
                                        {stop.status === 'In Arrivo' && <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>}
                                        {stop.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400 mb-2">Technical Logistics by</p>
                            <div className="font-black text-xl tracking-widest text-gf-green">GF SERVICE</div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements behind card */}
                <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-gf-green/10 rounded-xl transform rotate-6 border border-white/5"></div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default StreetFoodSection;