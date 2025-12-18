import React, { useEffect, useState, useMemo } from 'react';
import { ArrowUpRight, Camera, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { ProjectData } from './ProjectDetail';

const projects: ProjectData[] = [
  {
    title: "Mercatini di Natale",
    location: "Porta di Roma, Lazio",
    category: "Mercatini Natalizi",
    client: "Centro Commerciale Porta di Roma",
    typeLabel: "Struttura commerciale",
    target: "Famiglie, shopping natalizio",
    type: "natalizi",
    year: "2024",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
    description: "I mercatini di Natale non sono eventi: sono **esperienze temporanee che si sedimentano nella memoria urbana**. Quando il Centro Commerciale Porta di Roma decide di ospitare i propri mercatini, sa che lo spazio non deve sentirsi commerciale, ma autentico, accogliente, quasi come se fosse sempre stato lì.\n\n**17 casette di legno** modulari e personalizzabili non sono semplici stand di vendita: sono piccole rappresentazioni dell'idea di \"mercato natalizio\". Ogni casetta, anche se identica alle altre, deve sentirsi parte di un tutto organico.\n\nLa sfida più grande non è il montaggio iniziale, ma la **gestione continuativa su 8 settimane**: mantenere l'integrità strutturale sotto la pioggia, il vento, le gelate; preservare l'aspetto estetico while garantendo funzionalità; coordinare con i commercianti che cambiano merci e strategie di vendita.\n\nLe casette di legno rappresentano la nostra risposta al problema della stagionalità: non sono temporanee nel senso di \"fragili\", ma temporanee nel senso di \"pensate per vivere il loro momento perfetto e poi scomparire con eleganza\".\n\nPorta di Roma non vuole un \"noleggio\": vuole che i suoi visitatori dimentichino che quello che vedono è stato montato da qualcuno. Vuole che sembrino sempre stati lì.",
    imageNarrative: "Le 17 casette di legno sono state progettate per resistere a 8 settimane di esposizione continua, garantendo isolamento termico e un'estetica calda e accogliente.",
    videoLabel: "Analisi della stabilità strutturale in condizioni di affollamento massivo durante il weekend inaugurale.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg", label: "Il villaggio natalizio illuminato al calar del sole." },
        { image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2000&auto=format&fit=crop", label: "Dettaglio dell'assemblaggio dei moduli in legno naturale." },
        { image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop", label: "Vista aerea della distribuzione spaziale dei 17 stand." },
        { image: "https://images.unsplash.com/photo-1544030617-e25f8266205e?q=80&w=2070&auto=format&fit=crop", label: "L'integrazione tra le strutture e il flusso di visitatori del centro." }
    ],
    materials: ["17 casette di legno modulari", "Personalizzazione estetica", "Gestione stagionale continuativa", "Coesione visiva su 8 settimane"]
  },
  {
    title: "October Fest",
    location: "Alatri, Lazio",
    category: "Sagre e Feste di Paese",
    client: "Pizzeria Il Decimo",
    typeLabel: "Privato (Ristorante/Pizzeria)",
    target: "Adulti - Occasioni enogastronomiche",
    type: "sagre",
    year: "2023",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop",
    description: "Per il progetto dell'October Fest organizzato dalla Pizzeria Il Decimo ad Alatri, l'obiettivo era creare uno spazio che fosse contemporaneamente funzionale, accogliente e capace di mantenere l'energia dell'evento per due settimane consecutive.\n\nAbbiamo realizzato una tendostruttura di 500 metri quadri, dotata di teli Crystal di ultima generazione che permettono alla luce naturale di creare un'atmosfera unica durante il giorno, mentre di sera le luci integrate trasformano lo spazio in una destination enogastronomica. All'interno, un palco modulare 5x4 metri ospita le performance live, circondato da 30 panche che trasformano i visitatori in una comunità temporanea.\n\nLa vera sfida è stata integrare l'area giochi esterna - punchball, biliardino e cento altri giochi - creando una fluidità di movement tra la zona principale della birra e lo spazio ludico, garantendo al contempo la sicurezza di adulti e bambini.",
    imageNarrative: "La tendostruttura Crystal da 500mq ha permesso di mantenere un legame visivo con il paesaggio di Alatri, garantendo al contempo una temperatura ideale interna.",
    videoLabel: "Sincronizzazione tra service audio/luci e allestimento strutturale durante i concerti live serali.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop", label: "Vista panoramica della tendostruttura da 500 metri quadri." },
        { image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop", label: "Allestimento luci interne per creare l'atmosphere bavarese." },
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop", label: "Area food con 30 panche per il comfort dei visitatori." },
        { image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=2070&auto=format&fit=crop", label: "Dettaglio dell'area giochi integrata con biliardini e attrazioni." }
    ],
    materials: ["Tendostruttura 500mq", "Palco modulare 5x4m", "30 panche", "Impianti birra 3 sezioni", "Area giochi integrata"]
  },
  {
    title: "Tavolata lungo corso",
    location: "Sora, Lazio",
    category: "Sagre e Feste di Paese",
    client: "Comune di Sora (Evento pubblico)",
    typeLabel: "Ente Pubblico",
    target: "Comunità locale",
    type: "sagre",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    description: "\"Tavolata lungo corso\" è le nome giusto: 180 tavoli distribuiti lungo il corso storico di Sora, trasformato temporaneamente in un'estensione del tessuto urbano. Ma dietro questa semplicità, c'è una complessità logistica che pochi comprendono.\n\nLa sfida non era la dimensione - 180 kit da birreria e 4 gazebi 4x4 - ma il timing chirurgico: montaggio sabato pomeriggio in poche ore, smontaggio domenica notte prima delle 9 del mattino, quando la strada doveva tornare al traffico quotidiano.\n\nAbbiamo coordinato il lavoro in modo che ogni gazebo, ogni kit, ogni tavolo si materializzasse al proprio posto senza intralcio, creando una continuità visiva lungo il corso. I gazebi non erano barriere, ma riferimenti - ancore visive che dicevano \"qui è diverso, qui c'è comunità\".",
    imageNarrative: "La logistica ha previsto il posizionamento millimetrico di 180 kit birreria lungo l'asse stradale principale di Sora in meno di 4 ore.",
    videoLabel: "Timelaps del montaggio record: 180 tavoli posizionati e pronti all'uso in un pomeriggio.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop", label: "L'infinita linea di tavoli che attraversa le centro storico." },
        { image: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?q=80&w=2070&auto=format&fit=crop", label: "Gazebo 4x4m posizionati come punti di snodo per il beverage." },
        { image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop", label: "Squadre tecniche al lavoro durante la fase di allineamento dei tavoli." },
        { image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop", label: "Vista notturna dell'evento: la trasformazione del corso è compiuta." }
    ],
    materials: ["180 kit da birreria", "4 gazebi 4x4", "Montaggio/smontaggio rapido coordinato"]
  },
  {
    title: "Palio San Pietro Eremita",
    location: "Trevi nel Lazio, Lazio",
    category: "Sagre e Feste di Paese",
    client: "Palio tradizionale",
    typeLabel: "Ente Pubblico/Associazione locale",
    target: "Comunità locale + turisti",
    type: "sagre",
    year: "2024",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2070&auto=format&fit=crop",
    description: "Abbiamo supportato il Palio San Pietro Eremita per tre edizioni consecutive, e ogni anno la sfida è rimasta la stessa ma con una pressione sempre crescente.\n\nLa configurazione è complessa: 400 transenne delimitano lo spazio dove i cavalli correranno, 3 gazebi offrono rifugio ai visitatori, 30 kit da birreria strutturano l'esperienza enogastronomica. Ma il vero nemico non è la dimensione: è il timing assoluto.\n\nDomenica mattina, prima che la sabbia copra la strada per la corsa: tutto deve essere montato. Subito dopo la corsa: tutto deve essere smontato. Il margine di errore è zero.\n\nTre anni di esecuzione senza difetti ci hanno insegnato che l'affidabilità non è una promise: è una dimostrazione ripetuta.",
    imageNarrative: "La messa in sicurezza del percorso tramite 400 transenne professionali è l'elemento critico per la riuscita di questa manifestazione storica.",
    videoLabel: "Coordinamento delle squadre per la posa delle transenne lungo il percorso di gara.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2070&auto=format&fit=crop", label: "Il percorso transennato pronto per la sfilata e la corsa." },
        { image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop", label: "Aree relax create con gazebi professionali per i turisti." },
        { image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop", label: "Allestimento dei banchi spina e dei kit birreria." },
        { image: "https://images.unsplash.com/photo-1506192170364-7067d020d0f4?q=80&w=2070&auto=format&fit=crop", label: "La solidità dei materiali GF Service a tutela della tradizione." }
    ],
    materials: ["400 transenne", "3 gazebi", "30 kit da birreria", "Partnership continuativa su 3 anni"]
  },
  {
    title: "Belgian Beer Festival",
    location: "Fiuggi, Lazio",
    category: "Fiere e Manifestazioni",
    client: "Shire Brewing",
    typeLabel: "Brand/Azienda",
    target: "Appassionati birra, turisti, adulti",
    type: "fiere",
    year: "2025",
    image: "https://images.unsplash.com/photo-1585923957286-90c44422204c?q=80&w=2000&auto=format&fit=crop",
    description: "Quando Shire Brewing ha scelto di organizzare il Belgian Beer Festival a Fiuggi, sapeva che lo spazio avrebbe dovuto raccontare una story: quella della birra belga, della tradizione, dell'artigianalità.\n\nLa nostra risposta è stata architetturale. Una tendostruttura 50x10 metri come cuore pulsante dell'evento, con teli che permettono al visitatore di sentirsi \"dentro\" mentre rimane consapevole dell'esterno.\n\nLa vera innovazione è stata l'illuminazione e il riscaldamento: cannoni termici che non riscaldano solo l'aria, ma trasformano lo spazio in qualcosa di più accogliente conforme al clima esterno. Perché una birra belga a Fiuggi a febbraio ha bisogno di calore, ma non di artificio.",
    imageNarrative: "Il riscaldamento integrato con cannoni termici professionali ha garantito una temperatura costante di 21°C nonostante il clima invernale di Fiuggi.",
    videoLabel: "Focus tecnico sull'impianto di riscaldamento e distribuzione dell'aria all'interno della tendostruttura.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://images.unsplash.com/photo-1585923957286-90c44422204c?q=80&w=2000&auto=format&fit=crop", label: "La maestosa tendostruttura 50x10 metri nel cuore di Fiuggi." },
        { image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop", label: "Interni riscaldati e illuminati per un'esperienza premium." },
        { image: "https://images.unsplash.com/photo-1574577457805-4927756f4d22?q=80&w=2070&auto=format&fit=crop", label: "Dettaglio dell'area spillatura professionale." },
        { image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop", label: "Il festival prende vita grazie all'architettura temporanea GF Service." }
    ],
    materials: ["Tendostruttura 50x10m", "30 kit da birreria", "Illuminazione integrata", "Riscaldamento con cannoni", "2 gazebi 4x4", "1 gazebo 3x3", "Layout multi-area"]
  },
  {
    title: "Madonna del Carmine",
    location: "Tecchiena, Lazio",
    category: "Sagre e Feste di Paese",
    client: "Evento locale/Pro Loco",
    typeLabel: "Ente Pubblico/Associazione locale",
    target: "Comunità locale",
    type: "sagre",
    year: "2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    description: "Madonna del Carmine 2025 a Tecchiena. Una festa patronale con un'ambizione: essere memorabile. La Pro Loco ha scelto di affidarsi a GF Service non solo per le strutture, ma per la capacità di gestire complessità logistica a scala.\n\n300 kit da birreria: un numero che non è casuale. Rappresenta la decisione di servire non solo i residente, mas anche i turisti, i connazionali tornati dal resto d'Italia.\n\nQuesta è la maestria che i nostri clienti non vedono ma riconoscono: la capacità di trasformare un numero grande in un'esperienza fluida. Non 300 tavoli sparsi nel caos - 300 tavoli che raccontano una storia di inclusione e comunità.",
    imageNarrative: "La fornitura di 300 kit birreria rappresenta uno dei nostri allestimenti più massivi per eventi di comunità nel territorio ciociaro.",
    videoLabel: "Pianificazione logistica e distribuzione dei tavoli per l'accoglienza di oltre 2000 persone.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    galleryItems: [
        { image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", label: "L'ampia area conviviale allestita a Tecchiena." },
        { image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=2070&auto=format&fit=crop", label: "Kit birreria in abete verniciato: robustezza per eventi popolari." },
        { image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop", label: "Vista d'insieme durante il picco di affluenza serale." },
        { image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop", label: "Il palco GF Service come centro della celebrazione." }
    ],
    materials: ["300 kit da birreria", "Coordinamento logistico massivo", "Gestione della sicurezza", "Distribuzione ottimale dello spazio"]
  }
];

const filters = [
    { id: 'all', label: 'Tutti i Progetti' },
    { id: 'sagre', label: 'Sagre & Feste' },
    { id: 'fiere', label: 'Fiere & Manifestazioni' },
    { id: 'natalizi', label: 'Mercatini Natalizi' },
];

const AllProjects: React.FC<{ onShowContact?: () => void; onProjectSelect?: (project: ProjectData) => void; }> = ({ onShowContact, onProjectSelect }) => {
    const [loaded, setLoaded] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;
        return projects.filter(p => p.type === activeFilter);
    }, [activeFilter]);

    return (
        <section className="relative min-h-screen bg-gf-darker text-white pb-20">
             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                 {projects.map((proj, idx) => (
                    <div 
                        key={idx}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-opacity ${hoveredProject === proj.title ? 'opacity-40 scale-105' : 'opacity-0 scale-100'}`}
                        style={{ backgroundImage: `url("${proj.image}")`, filter: 'blur(60px) saturate(1.5)' }}
                    />
                 ))}
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/90 to-[#022c24]/95"></div>
             </div>

             <div className="relative z-10 pt-32">
                 <div className="container mx-auto px-6 mb-24">
                     <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                            <Camera size={12} className="text-gf-green" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Progetti Certificati</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl uppercase">
                            IL NOSTRO <span className="font-serif italic text-gf-green font-light">PORTFOLIO</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            Dalle grandi piazze storiche ai mercatini natalizi. Ogni allestimento è una story di affidabilità e precisione tecnica.
                        </p>
                     </div>
                 </div>

                 <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                        <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === filter.id ? 'bg-gf-green text-white shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 min-h-[50vh]">
                        {filteredProjects.map((project, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => onProjectSelect && onProjectSelect(project)}
                                onMouseEnter={() => setHoveredProject(project.title)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 border-white/10 transition-all duration-500 ease-out cursor-pointer`}
                            >
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
                                  <rect
                                    x="4"
                                    y="4"
                                    width="calc(100% - 8px)"
                                    height="calc(100% - 8px)"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="5"
                                    strokeDasharray="3000"
                                    strokeDashoffset="3000"
                                    rx="20"
                                    className="group-hover:animate-draw-border transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                    style={{ 
                                      animationDuration: '0.6s', 
                                      animationFillMode: 'forwards',
                                      strokeLinecap: 'round'
                                    }}
                                  />
                                </svg>

                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url("${project.image}")` }}></div>
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 w-full p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-none uppercase tracking-tight line-clamp-2">{project.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-300 uppercase tracking-widest font-medium">
                                        <MapPin size={14} className="text-gf-green" />
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Section: Future Projects CTA */}
                    <div className={`mt-32 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-12 md:p-20 text-center shadow-2xl">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gf-green/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                                    Vuoi scoprire i nostri <span className="text-gf-green italic font-serif lowercase">progetti futuri?</span>
                                </h2>
                                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                    Segui il dietro le quinte delle nostre installazioni e rimani aggiornato sugli eventi più importanti del centro Italia.
                                </p>
                                
                                <div className="flex flex-wrap justify-center gap-6">
                                    <a 
                                        href="https://www.instagram.com/gf_service/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gf-green hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1"
                                    >
                                        <Instagram size={20} className="transition-transform group-hover:rotate-12" />
                                        Seguici su Instagram
                                    </a>
                                    <a 
                                        href="https://www.facebook.com/gfserviceallestimenti" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white transition-all duration-300 shadow-xl hover:-translate-y-1"
                                    >
                                        <Facebook size={20} className="transition-transform group-hover:rotate-12" />
                                        Seguici su Facebook
                                    </a>
                                </div>

                                <div className="mt-16 flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
                                    <div className="w-8 h-[1px] bg-white/10"></div>
                                    Join the Community
                                    <div className="w-8 h-[1px] bg-white/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
        </section>
    );
}

export default AllProjects;