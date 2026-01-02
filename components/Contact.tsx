
import React, { useRef, useState, useEffect } from 'react';
import { Loader2, Phone, Mail, FileText, ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';

interface ContactProps {
  onMobileFormToggle?: (isOpen: boolean) => void;
}

const Contact: React.FC<ContactProps> = ({ onMobileFormToggle }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Effect to handle Mobile Fullscreen Body Lock and Navbar Hiding
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;

    if (showForm && checkMobile()) {
        // LOCK TOTALE PER MOBILE
        // Blocchiamo sia html che body e forziamo l'altezza per evitare lo scroll di rimbalzo (rubber-banding)
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        
        if (onMobileFormToggle) onMobileFormToggle(true);
    } else {
        // SBLOCCO
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.overflow = '';
        document.body.style.height = '';

        if (onMobileFormToggle) onMobileFormToggle(false);
    }

    // Cleanup when component unmounts or form closes
    return () => {
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.overflow = '';
        document.body.style.height = '';
        if (onMobileFormToggle) onMobileFormToggle(false);
    };
  }, [showForm, onMobileFormToggle]);

  return (
    <section id="contatti" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden bg-gf-darker">
       
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
          
          <div className="text-center mb-8 md:mb-12 opacity-100 scale-100 transition-all duration-700">
            <h2 className="font-bold text-3xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 uppercase tracking-tighter shadow-black drop-shadow-2xl">
                {showForm ? 'Parlaci del tuo' : 'Costruiamo il tuo'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Evento</span>
            </h2>
            
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed">
                {showForm 
                    ? "Compila i dettagli qui sotto. Ti risponderemo con una proposta su misura in 24 ore."
                    : "Hai un progetto in mente? Scegli come preferisci metterti in contatto con noi."
                }
            </p>
          </div>

          <div className="relative w-full min-h-[300px] md:min-h-[400px] flex flex-col justify-center">
            
            {!showForm ? (
                /* SELECTION GRID */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    
                    {/* OPTION 1: CALL */}
                    <a 
                        href="tel:+393331234567"
                        className="group relative p-4 md:p-8 bg-gf-darker/40 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl hover:bg-gf-green hover:border-gf-green transition-all duration-300 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-6 shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-gf-green text-white transition-colors duration-300 shrink-0">
                            <Phone size={20} className="md:w-[28px] md:h-[28px]" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 uppercase tracking-wide">Chiamaci</h3>
                            <p className="text-gray-400 group-hover:text-white/90 text-xs md:text-sm font-light leading-tight">Parla con un tecnico.</p>
                            {/* Mobile only sub-text */}
                            <p className="md:hidden text-white font-bold text-sm mt-1">+39 333 123 4567</p>
                        </div>
                        <div className="hidden md:block mt-auto pt-4 border-t border-white/10 w-full group-hover:border-white/30">
                            <span className="text-lg font-bold text-white">+39 333 123 4567</span>
                        </div>
                        <ArrowRight className="md:hidden text-white/30" size={16} />
                    </a>

                    {/* OPTION 2: EMAIL */}
                    <a 
                        href="mailto:info@maluservice.it"
                        className="group relative p-4 md:p-8 bg-gf-darker/40 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl hover:bg-white hover:border-white transition-all duration-300 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-6 shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gf-darker group-hover:text-white text-white transition-colors duration-300 shrink-0">
                            <Mail size={20} className="md:w-[28px] md:h-[28px]" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-base md:text-xl font-bold text-white group-hover:text-gf-darker mb-1 md:mb-2 uppercase tracking-wide">Invia Email</h3>
                            <p className="text-gray-400 group-hover:text-gray-600 text-xs md:text-sm font-light leading-tight">Per info generali.</p>
                        </div>
                        <div className="hidden md:block mt-auto pt-4 border-t border-white/10 w-full group-hover:border-gray-300">
                            <span className="text-lg font-bold text-white group-hover:text-gf-darker flex items-center justify-center gap-2">
                                info@maluservice.it <ExternalLink size={14} />
                            </span>
                        </div>
                        <ArrowRight className="md:hidden text-white/30 group-hover:text-gf-darker" size={16} />
                    </a>

                    {/* OPTION 3: FORM (ACTION) */}
                    <button 
                        onClick={() => setShowForm(true)}
                        className="group relative p-4 md:p-8 bg-gf-green/90 backdrop-blur-md border border-gf-green rounded-2xl md:rounded-3xl hover:bg-emerald-500 transition-all duration-300 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-6 shadow-[0_0_40px_rgba(0,112,90,0.3)] hover:shadow-[0_0_60px_rgba(0,112,90,0.5)] hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white transition-colors duration-300 shrink-0">
                            <FileText size={20} className="md:w-[28px] md:h-[28px]" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 uppercase tracking-wide">Compila il Form</h3>
                            <p className="text-emerald-100 text-xs md:text-sm font-light leading-tight">Preventivo dettagliato.</p>
                        </div>
                        <div className="hidden md:flex mt-auto pt-4 border-t border-white/20 w-full justify-center">
                            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                                Inizia ora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                        <ArrowRight className="md:hidden text-white" size={16} />
                    </button>

                </div>
            ) : (
                /* FORM CONTAINER */
                /* 
                   MODIFICA CRITICA PER MOBILE:
                   Su mobile (default), usiamo 'fixed inset-0 z-[200]' per coprire TUTTO lo schermo.
                   Su desktop (md:), torniamo a 'static' e layout normale.
                   
                   AGGIUNTA: 'overscroll-none' per prevenire lo scroll chaining su mobile.
                */
                <div className={`
                    animate-in fade-in slide-in-from-right-8 duration-500 w-full
                    fixed inset-0 z-[200] bg-gf-darker flex flex-col p-4 md:p-0 overscroll-none
                    md:static md:bg-transparent md:block
                `}>
                    {/* Header Mobile per tornare indietro (Sopra il form) */}
                    <div className="flex-none mb-4 md:mb-6 flex justify-between items-center">
                        <button 
                            onClick={() => setShowForm(false)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold group"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gf-green transition-colors">
                                <ArrowLeft size={14} />
                            </div>
                            Torna alle opzioni
                        </button>
                        
                        {/* Close icon visible only on mobile fullscreen mode */}
                        <button 
                            onClick={() => setShowForm(false)}
                            className="md:hidden w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Wrapper Form Card */}
                    <div className="relative w-full bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-gf-green/30 flex-grow md:flex-grow-0 flex flex-col">
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gf-green to-transparent opacity-50 flex-none"></div>
                        
                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gf-darker z-20">
                                <Loader2 className="w-10 h-10 text-gf-green animate-spin mb-4" />
                                <span className="text-gray-400 text-sm tracking-widest uppercase">Caricamento modulo...</span>
                            </div>
                        )}

                        {/* 
                           Iframe Container:
                           Mobile: flex-grow h-full (occupa tutto lo spazio rimanente nel container fullscreen)
                           Desktop: h-[700px] fisso
                        */}
                        <div className="w-full flex-grow h-full md:h-[700px]">
                            <iframe 
                                src="https://form.typeform.com/to/ENMqkjkN?typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=embed-sdk&typeform-embed-id=text"
                                className="w-full h-full"
                                style={{ 
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

            {/* Bottom info - Hidden on mobile fullscreen to save space */}
            <div className={`text-center mt-8 ${showForm ? 'hidden md:block' : 'block'}`}>
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
