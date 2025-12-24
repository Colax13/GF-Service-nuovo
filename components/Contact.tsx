import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, ChevronDown, Calendar, MapPin, Building, Phone, ArrowLeft, X, Mail, User, MessageSquare, Briefcase, Loader2 } from 'lucide-react';

interface ContactProps {
  simpleMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ simpleMode = false }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isAdvanced && sectionRef.current) {
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [isAdvanced]);

  // La logica di invio fetch è ora gestita dallo script globale nell'index.html
  // per soddisfare la richiesta dell'utente.
  const handleReactSubmit = () => {
    console.log("Form sottomesso, gestione delegata allo script globale.");
    
    // Attiviamo uno stato visivo temporaneo di caricamento
    setStatus('submitting');
    // Lo script globale farà scattare l'alert e resetterà il form.
    // Riportiamo lo stato a idle nel componente React dopo un breve lasso di tempo.
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <section id="contatti" ref={sectionRef} className="relative pt-32 pb-24 min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gf-darker">
       
       <div 
         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
         style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2070&auto=format&fit=crop")',
            backgroundPosition: 'center 60%',
            filter: isAdvanced ? 'blur(12px) brightness(0.3)' : 'blur(0px) brightness(0.6)'
         }}
       ></div>

       <div className="absolute inset-0 bg-gf-darker/60 mix-blend-multiply transition-opacity duration-1000"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-gf-darker via-transparent to-gf-darker/80"></div>

       <div className="relative z-10 container mx-auto px-6 w-full max-w-6xl">
          
          <div className={`text-center transition-all duration-700 ease-out transform ${isAdvanced ? 'mb-8 opacity-100 scale-95' : 'mb-16 opacity-100 scale-100'}`}>
            <h2 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 uppercase tracking-tighter shadow-black drop-shadow-2xl">
                {isAdvanced ? 'Dettagli Progetto' : (
                    <>
                        Costruiamo il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">Evento</span>
                    </>
                )}
            </h2>
            
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed">
                {isAdvanced 
                    ? "Compila la scheda tecnica. Più dettagli ci fornisci, più preciso sarà il nostro preventivo." 
                    : "Siamo pronti a dare forma alle tue idee. Scegli la modalità di contatto che preferisci."}
            </p>
          </div>

          <div className="relative w-full min-h-[500px]">
            
            {/* VIEW 1: QUICK CONTACT */}
            <div 
                className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] absolute inset-0 w-full flex flex-col items-center ${
                    isAdvanced ? 'opacity-0 invisible -translate-y-10 scale-95 pointer-events-none' : 'opacity-100 visible translate-y-0 scale-100 relative'
                }`}
            >
                <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-16 shadow-2xl">
                    <form id="contactForm" onSubmit={handleReactSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                        <div className="relative group md:col-span-1 lg:col-span-2">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input id="nome" name="nome" required type="text" placeholder="Nome" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
                        </div>
                        <div className="relative group md:col-span-1 lg:col-span-2">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input id="email" name="email" required type="email" placeholder="Email" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
                        </div>
                        <div className="relative group md:col-span-1 lg:col-span-2">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                            <input id="tel" name="tel" required type="tel" placeholder="Telefono" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
                        </div>

                        <div className="relative group md:col-span-1 lg:col-span-6">
                            <select name="evento" className="w-full h-14 px-4 bg-black/20 text-white/80 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all appearance-none cursor-pointer">
                                <option value="" disabled selected>Che evento stai organizzando?</option>
                                <option className="bg-gf-dark" value="fiera">Fiera / Sagra</option>
                                <option className="bg-gf-dark" value="privato">Evento Privato</option>
                                <option className="bg-gf-dark" value="aziendale">Evento Aziendale</option>
                                <option className="bg-gf-dark" value="altro">Altro</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
                        </div>
                        
                        <div className="relative group col-span-1 md:col-span-2 lg:col-span-6">
                            <MessageSquare className="absolute left-4 top-4 text-white/40" size={18} />
                            <textarea 
                                id="messaggio"
                                name="message"
                                placeholder="Cosa vorresti includere nel tuo evento? (Coperture, tavoli, cucine...)" 
                                className="w-full h-32 p-4 pl-12 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all resize-none" 
                            />
                        </div>

                        <button type="submit" className="col-span-1 md:col-span-2 lg:col-span-6 h-14 bg-gf-green hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                            {status === 'submitting' ? (
                                <>Inviando... <Loader2 className="animate-spin" size={18} /></>
                            ) : (
                                <>Invia <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                    
                    <div className="text-center mt-4">
                         <label className="text-xs text-white/40 flex items-center justify-center gap-2 cursor-pointer hover:text-white/60 transition-colors">
                            <input type="checkbox" required className="rounded bg-white/10 border-white/20 text-gf-green focus:ring-0" />
                            Accetto la privacy policy e il trattamento dei dati personali.
                         </label>
                    </div>
                </div>

                {!simpleMode && (
                    <div className="w-full max-w-4xl text-center relative py-8">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <h3 className="text-2xl md:text-3xl text-white font-bold mb-4 mt-8">Hai un progetto complesso?</h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light">Se conosci già i dettagli tecnici, le date e la location, aiutaci a servirti meglio compilando la scheda completa.</p>
                        <button onClick={() => setIsAdvanced(true)} className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-white/20 hover:border-gf-green/50 hover:bg-white/5 rounded-full text-white transition-all duration-300 overflow-hidden">
                            <span className="relative z-10 font-medium tracking-wide">Compila il form dettagliato</span>
                            <ChevronDown className="relative z-10 group-hover:translate-y-1 transition-transform duration-300" size={20} />
                            <div className="absolute inset-0 bg-gf-green/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </button>
                    </div>
                )}
            </div>

            {/* VIEW 2: ADVANCED FORM */}
            <div 
                className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full ${
                    isAdvanced ? 'opacity-100 visible translate-y-0 relative' : 'opacity-0 invisible translate-y-20 absolute top-0 pointer-events-none'
                }`}
            >
                <div className="bg-gf-darker/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gf-green via-emerald-500 to-gf-green"></div>
                    <button onClick={() => setIsAdvanced(false)} className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 group">
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <form id="contactForm" onSubmit={handleReactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                        <div className="md:col-span-2 mb-2 flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-gf-green flex items-center justify-center text-white font-bold text-sm">1</span>
                            <h4 className="text-white font-bold text-lg uppercase tracking-wider">Contatti</h4>
                            <div className="h-[1px] bg-white/10 flex-grow"></div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gf-green font-bold uppercase tracking-wider ml-1">Nome *</label>
                            <input id="nome" name="first_name" required type="text" className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gf-green font-bold uppercase tracking-wider ml-1">Cognome *</label>
                            <input name="last_name" required type="text" className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gf-green font-bold uppercase tracking-wider ml-1">Telefono *</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input name="phone" required type="tel" className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gf-green font-bold uppercase tracking-wider ml-1">Email *</label>
                            <input id="email" name="email" required type="email" className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                        </div>

                        <div className="md:col-span-2 mb-2 mt-4 flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-gf-green flex items-center justify-center text-white font-bold text-sm">2</span>
                            <h4 className="text-white font-bold text-lg uppercase tracking-wider">Profilo</h4>
                            <div className="h-[1px] bg-white/10 flex-grow"></div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Tipologia Cliente</label>
                            <div className="relative">
                                <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <select name="cliente_tipo" className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer">
                                    <option className="bg-gf-darker">Seleziona...</option>
                                    <option className="bg-gf-darker" value="organizzatore">Organizzatore di eventi</option>
                                    <option className="bg-gf-darker" value="agenzia">Agenzia di comunicazione</option>
                                    <option className="bg-gf-darker" value="azienda">Azienda privata</option>
                                    <option className="bg-gf-darker" value="ente">Ente Pubblico</option>
                                    <option className="bg-gf-darker" value="privato">Privato</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Azienda / Ente (Opzionale)</label>
                            <div className="relative">
                                <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input name="azienda" type="text" className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>

                        <div className="md:col-span-2 mb-2 mt-4 flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-gf-green flex items-center justify-center text-white font-bold text-sm">3</span>
                            <h4 className="text-white font-bold text-lg uppercase tracking-wider">L'Evento</h4>
                            <div className="h-[1px] bg-white/10 flex-grow"></div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Dove si svolgerà?</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input name="location" type="text" placeholder="Città / Location" className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Quando (Periodo/Data)?</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input name="date" type="text" placeholder="Data precisa o indicativa" className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-3 mt-4">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Di cosa hai bisogno? (Seleziona)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Tensostrutture', 'Palchi e Pedane', 'Sedie e Tavoli', 'Gazebo', 'Casette in Legno', 'Impianti Audio/Luci', 'Spillatori', 'Bagni Chimici', 'Generatore', 'Transenne', 'Riscaldamento', 'Pavimentazione'].map((item) => (
                                    <label key={item} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 hover:border-gf-green/50 transition-all group">
                                        <div className="relative flex items-center">
                                          <input type="checkbox" name={`servizio_${item.replace(/ /g, '_')}`} className="peer appearance-none w-5 h-5 rounded border border-white/30 checked:bg-gf-green checked:border-gf-green transition-all" />
                                          <Check size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Note e Richieste Specifiche</label>
                            <textarea id="messaggio" name="note" rows={4} className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all resize-none placeholder:text-white/20" placeholder="Descrivi le strutture, le dimensioni o altre necessità particolari..."></textarea>
                        </div>

                        <div className="md:col-span-2 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t border-white/10 mt-4">
                            <button type="button" onClick={() => setIsAdvanced(false)} className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Torna alla richiesta rapida
                            </button>
                            
                            <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gf-green hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_10px_20px_rgba(0,112,90,0.3)] hover:shadow-[0_15px_30px_rgba(0,112,90,0.5)] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                {status === 'submitting' ? (
                                    <>Inviando... <Loader2 className="animate-spin" size={18} /></>
                                ) : (
                                    <>Invia Richiesta Completa</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

          </div>
       </div>
    </section>
  );
};

export default Contact;