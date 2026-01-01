
import React, { useRef, useState } from 'react';
import { Loader2, Phone, Mail, FileText, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface ContactProps {
  // empty
}

const Contact: React.FC<ContactProps> = ({ }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contatti" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-32 overflow-hidden bg-gf-darker">
       
       {/* Background Image with Overlay */}
       <div 
         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dcmd1ukvx/image/upload/c_crop,ar_4:3/v1767204595/strutture_tor7na.png")',
            backgroundPosition: 'center 60%',
            filter: 'blur(0px) brightness(0.6)'
         }}
       ></div>

       <div className="absolute inset-0 bg-gf-darker/60 mix-blend-multiply"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-gf-darker/90"></div>

       <div className="relative z-10 container mx-auto px-6 w-full max-w-5xl">
          
          <div className="text-center mb-12 opacity-100 scale-100 transition-all duration-700">
            <h2 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 uppercase tracking-tighter shadow-black drop-shadow-2xl">
                {showForm ? 'Parlaci del tuo' : 'Costruiamo il tuo'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Evento</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed">
                {showForm 
                    ? "Compila i dettagli qui sotto. Ti risponderemo con una proposta su misura in 24 ore."
                    : "Hai un progetto in mente? Scegli come preferisci metterti in contatto con noi."
                }
            </p>
          </div>

          <div className="relative w-full min-h-[400px] flex flex-col justify-center">
            
            {!showForm ? (
                /* SELECTION GRID */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    
                    {/* OPTION 1: CALL */}
                    <a 
                        href="tel:+393331234567"
                        className="group relative p-8 bg-gf-darker/40 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-gf-green hover:border-gf-green transition-all duration-300 flex flex-col items-center justify-center text-center gap-6 shadow-xl hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-gf-green text-white transition-colors duration-300">
                            <Phone size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Chiamaci</h3>
                            <p className="text-gray-400 group-hover:text-white/90 text-sm font-light">Parla direttamente con un tecnico.</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/10 w-full group-hover:border-white/30">
                            <span className="text-lg font-bold text-white">+39 333 123 4567</span>
                        </div>
                    </a>

                    {/* OPTION 2: EMAIL */}
                    <a 
                        href="mailto:info@maluservice.it"
                        className="group relative p-8 bg-gf-darker/40 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white hover:border-white transition-all duration-300 flex flex-col items-center justify-center text-center gap-6 shadow-xl hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gf-darker group-hover:text-white text-white transition-colors duration-300">
                            <Mail size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-gf-darker mb-2 uppercase tracking-wide">Invia Email</h3>
                            <p className="text-gray-400 group-hover:text-gray-600 text-sm font-light">Scrivici per info generali.</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/10 w-full group-hover:border-gray-300">
                            <span className="text-lg font-bold text-white group-hover:text-gf-darker flex items-center justify-center gap-2">
                                info@maluservice.it <ExternalLink size={14} />
                            </span>
                        </div>
                    </a>

                    {/* OPTION 3: FORM (ACTION) */}
                    <button 
                        onClick={() => setShowForm(true)}
                        className="group relative p-8 bg-gf-green/90 backdrop-blur-md border border-gf-green rounded-3xl hover:bg-emerald-500 transition-all duration-300 flex flex-col items-center justify-center text-center gap-6 shadow-[0_0_40px_rgba(0,112,90,0.3)] hover:shadow-[0_0_60px_rgba(0,112,90,0.5)] hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white transition-colors duration-300">
                            <FileText size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Compila il Form</h3>
                            <p className="text-emerald-100 text-sm font-light">Ricevi un preventivo dettagliato.</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/20 w-full flex justify-center">
                            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                                Inizia ora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </button>

                </div>
            ) : (
                /* FORM CONTAINER */
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <button 
                        onClick={() => setShowForm(false)}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gf-green transition-colors">
                            <ArrowLeft size={14} />
                        </div>
                        Torna alle opzioni
                    </button>

                    <div className="relative w-full bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-gf-green/30">
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gf-green to-transparent opacity-50"></div>
                        
                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gf-darker z-20">
                                <Loader2 className="w-10 h-10 text-gf-green animate-spin mb-4" />
                                <span className="text-gray-400 text-sm tracking-widest uppercase">Caricamento modulo...</span>
                            </div>
                        )}

                        <div className="w-full min-h-[600px] md:min-h-[700px]">
                            <iframe 
                                src="https://form.typeform.com/to/ENMqkjkN?typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=embed-sdk&typeform-embed-id=text"
                                style={{ 
                                    width: '100%', 
                                    height: '700px', 
                                    border: 'none',
                                    opacity: isLoading ? 0 : 1,
                                    transition: 'opacity 0.5s ease-in-out'
                                }}
                                title="Richiesta Preventivo Malù Service and Games"
                                allow="camera; microphone; autoplay; encrypted-media;"
                                onLoad={() => setIsLoading(false)}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom info */}
            <div className="text-center mt-8">
                <p className="text-white/30 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gf-green"></span>
                    Risposta garantita in 24h lavorative
                </p>
            </div>

          </div>
       </div>
    </section>
  );
};

export default Contact;
