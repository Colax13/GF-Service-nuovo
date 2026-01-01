
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Truck, Zap, Star, CheckCircle2, Navigation } from 'lucide-react';

const StreetFoodSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tourStats = [
    { icon: Truck, label: "Food Truck Gestiti", value: "120+", sub: "Ogni tappa" },
    { icon: Zap, label: "Potenza Installata", value: "500Kw", sub: "Rete certificata" },
    { icon: Navigation, label: "Km Percorsi", value: "12k", sub: "In tutta Italia" },
  ];

  const schedule = [
    { city: "Roma", loc: "Piazzale della Radio", date: "Marzo 2025", status: "completed" },
    { city: "Milano", loc: "Idroscalo", date: "Aprile 2025", status: "completed" },
    { city: "Napoli", loc: "Centro Direzionale", date: "Maggio 2025", status: "live" },
    { city: "Torino", loc: "Parco Dora", date: "Giugno 2025", status: "upcoming" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-gf-darker via-gf-darker/95 to-gf-darker/80 z-0"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gf-green/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* LEFT: NARRATIVE & SPECS */}
            <div className={`lg:w-1/2 space-y-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
                        <Star size={12} className="text-gf-green fill-gf-green" /> Official Technical Partner
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter uppercase">
                        International <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Street Food</span>
                    </h2>
                </div>

                <div className="prose prose-invert">
                    <p className="text-xl text-gray-200 font-light leading-relaxed">
                        Non è solo cibo di strada. È una <strong>città temporanea</strong> che si sposta ogni settimana.
                    </p>
                    <p className="text-gray-400 font-light text-base leading-relaxed mt-4">
                        Essere partner tecnici del tour più importante d'Italia significa garantire che 120 cucine mobili abbiano energia stabile, illuminazione e sicurezza, ovunque si fermino. Una sfida logistica che vinciamo tappa dopo tappa.
                    </p>
                </div>

                {/* Technical Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                    {tourStats.map((stat, i) => (
                        <div key={i} className="group bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                            <stat.icon size={24} className="text-gf-green mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-3xl font-bold text-white mb-1 leading-none">{stat.value}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{stat.label}</div>
                            <div className="text-[10px] text-gray-500">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: TOUR SCHEDULE CARD */}
            <div className={`lg:w-1/2 w-full transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative">
                    
                    {/* Floating Card */}
                    <div className="relative z-20 bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                            <div>
                                <h3 className="text-white font-bold text-xl uppercase tracking-wide flex items-center gap-3">
                                    <Calendar className="text-gf-green" size={20} />
                                    Tour Schedule
                                </h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Stagione 2025 - Technical Roadmap</p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="text-[10px] font-bold text-gf-green uppercase tracking-[0.2em]">Next Stop</div>
                                <div className="text-white font-bold text-lg">TORINO</div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {schedule.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className={`relative flex items-center p-4 rounded-xl border transition-all duration-300 ${
                                        item.status === 'live' 
                                            ? 'bg-gf-green/10 border-gf-green/30 shadow-[0_0_20px_rgba(0,112,90,0.15)]' 
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                    }`}
                                >
                                    {/* Date Circle */}
                                    <div className={`
                                        w-12 h-12 rounded-full flex flex-col items-center justify-center border text-[10px] font-bold uppercase shrink-0 mr-4
                                        ${item.status === 'live' ? 'bg-gf-green text-white border-gf-green' : 'bg-black/40 text-gray-400 border-white/10'}
                                    `}>
                                        <span>{item.date.split(' ')[0].substring(0,3)}</span>
                                        <span className="text-xs">{item.date.split(' ')[1].slice(2)}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className={`font-bold text-lg ${item.status === 'live' ? 'text-white' : 'text-gray-300'}`}>{item.city}</span>
                                            
                                            {/* Status Badge */}
                                            {item.status === 'completed' && <CheckCircle2 size={16} className="text-gray-600" />}
                                            {item.status === 'live' && (
                                                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-gf-green bg-black/40 px-2 py-0.5 rounded-full border border-gf-green/30">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gf-green animate-pulse"></span> Live
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                            <MapPin size={10} /> {item.loc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-4 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                            <span>Powered by Malù Service</span>
                            <span>ID: TR-2025-X9</span>
                        </div>

                        {/* Decor */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gf-green/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    {/* Back Graphic Element */}
                    <div className="absolute top-4 -right-4 w-full h-full rounded-3xl border border-white/5 bg-gf-darker/50 -z-10 hidden md:block"></div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default StreetFoodSection;
