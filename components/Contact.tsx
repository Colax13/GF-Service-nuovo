
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, ChevronDown, Calendar, MapPin, Building, Phone, ArrowLeft, X, Mail, User, MessageSquare, Users, HelpCircle, Briefcase, Loader2, AlertCircle } from 'lucide-react';

interface ContactProps {
  simpleMode?: boolean;
}

// Configurazione Google Sheets
const CLIENT_ID = "363608924740-d9bgi0ii9s7rffincsi11t2mkfvapv2t.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Inserisci qui l'ID del tuo Google Sheet

const Contact: React.FC<ContactProps> = ({ simpleMode = false }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    // Inizializza Google Identity Services
    const initGsi = () => {
      // Accessing google object on window via casting to any to avoid TS error
      if ((window as any).google) {
        tokenClientRef.current = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // Definito al momento della richiesta
        });
      }
    };

    // Accessing google object on window via casting to any to avoid TS error
    if ((window as any).google) {
      initGsi();
    } else {
      window.addEventListener('load', initGsi);
    }
  }, []);

  useEffect(() => {
    if (isAdvanced && sectionRef.current) {
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [isAdvanced]);

  const sendToSheets = async (accessToken: string, rowData: any[]) => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1mBJVMzkPEqv_09n12drU0jgbLR79p42CJB5zq0pbgQM/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [rowData],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Errore durante l\'invio al foglio Google');
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Errore tecnico durante l\'invio.');
      setStatus('error');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Prepariamo la riga per lo sheet
    const timestamp = new Date().toLocaleString('it-IT');
    const row = [
      timestamp,
      data.nome || data.first_name,
      data.last_name || '',
      data.email,
      data.tel || data.phone,
      data.evento || data.event_type || '',
      data.location || '',
      data.date || '',
      data.note || data.message || '',
      data.cliente_tipo || '',
      data.azienda || '',
      // Raccogliamo i servizi selezionati se presenti
      Array.from(formData.keys()).filter(k => !['nome', 'email', 'tel', 'evento', 'message', 'first_name', 'last_name', 'phone', 'event_type', 'location', 'date', 'note', 'cliente_tipo', 'azienda'].includes(k)).join(', ')
    ];

    if (!tokenClientRef.current) {
      setErrorMessage('Libreria Google non caricata. Riprova tra un istante.');
      setStatus('error');
      return;
    }

    // Richiediamo il token e inviamo
    tokenClientRef.current.callback = async (response: any) => {
      if (response.error !== undefined) {
        setStatus('error');
        setErrorMessage('Autorizzazione negata.');
        return;
      }
      await sendToSheets(response.access_token, row);
    };

    tokenClientRef.current.requestAccessToken({ prompt: 'consent' });
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
                    {status === 'success' ? (
                        <div className="py-12 text-center animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-gf-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,112,90,0.5)]">
                                <Check size={40} className="text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 uppercase">Richiesta Inviata!</h3>
                            <p className="text-gray-400">Ti contatteremo entro 24 ore lavorative.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div className="relative group md:col-span-1 lg:col-span-2">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input name="nome" required type="text" placeholder="Nome" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
                            </div>
                            <div className="relative group md:col-span-1 lg:col-span-2">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input name="email" required type="email" placeholder="Email" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
                            </div>
                            <div className="relative group md:col-span-1 lg:col-span-2">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input name="tel" required type="tel" placeholder="Telefono" className="w-full h-14 pl-12 pr-4 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all" />
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
                                    name="message"
                                    placeholder="Cosa vorresti includere nel tuo evento? (Coperture, tavoli, cucine...)" 
                                    className="w-full h-32 p-4 pl-12 bg-black/20 text-white placeholder:text-white/40 rounded-xl outline-none focus:bg-black/40 focus:ring-2 focus:ring-gf-green/50 transition-all resize-none" 
                                />
                            </div>

                            <button type="submit" disabled={status === 'submitting'} className="col-span-1 md:col-span-2 lg:col-span-6 h-14 bg-gf-green hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                {status === 'submitting' ? (
                                    <>Inviando... <Loader2 className="animate-spin" size={18} /></>
                                ) : (
                                    <>Invia <ArrowRight size={18} /></>
                                )}
                            </button>
                            
                            {status === 'error' && (
                                <div className="col-span-full mt-4 flex items-center justify-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                    <AlertCircle size={18} /> {errorMessage}
                                </div>
                            )}
                        </form>
                    )}
                    
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

                    {status === 'success' ? (
                        <div className="py-20 text-center">
                            <div className="w-24 h-24 bg-gf-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,112,90,0.6)] animate-bounce">
                                <Check size={48} className="text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4 uppercase">Richiesta Ricevuta!</h3>
                            <p className="text-gray-400 text-lg">Il nostro ufficio tecnico analizzerà i dettagli e ti ricontatterà al più presto.</p>
                            <button onClick={() => setIsAdvanced(false)} className="mt-12 text-gf-green font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">Torna al sito</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                            <div className="md:col-span-2 mb-2 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-gf-green flex items-center justify-center text-white font-bold text-sm">1</span>
                                <h4 className="text-white font-bold text-lg uppercase tracking-wider">Contatti</h4>
                                <div className="h-[1px] bg-white/10 flex-grow"></div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gf-green font-bold uppercase tracking-wider ml-1">Nome *</label>
                                <input name="first_name" required type="text" className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
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
                                <input name="email" required type="email" className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all" />
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
                                <textarea name="note" rows={4} className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-gf-green focus:bg-white/10 outline-none transition-all resize-none placeholder:text-white/20" placeholder="Descrivi le strutture, le dimensioni o altre necessità particolari..."></textarea>
                            </div>

                            <div className="md:col-span-2 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t border-white/10 mt-4">
                                <button type="button" onClick={() => setIsAdvanced(false)} className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors group">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Torna alla richiesta rapida
                                </button>
                                
                                <button type="submit" disabled={status === 'submitting'} className="w-full md:w-auto px-10 py-4 bg-gf-green hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_10px_20px_rgba(0,112,90,0.3)] hover:shadow-[0_15px_30px_rgba(0,112,90,0.5)] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                    {status === 'submitting' ? (
                                        <>Inviando... <Loader2 className="animate-spin" size={18} /></>
                                    ) : (
                                        <>Invia Richiesta Completa</>
                                    )}
                                </button>
                            </div>
                            
                            {status === 'error' && (
                                <div className="col-span-full mt-4 flex items-center justify-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                    <AlertCircle size={18} /> {errorMessage}
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>

          </div>
       </div>
    </section>
  );
};

export default Contact;
