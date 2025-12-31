
import React, { useEffect, useState, useMemo } from 'react';
import { Camera, MapPin, Instagram, Facebook } from 'lucide-react';
import { ProjectData, GalleryItem } from './ProjectDetail';
import StreetFoodSection from './StreetFoodSection';

const octoberFestGallery: GalleryItem[] = [
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427539/struttura_interna_1_iaz1ji.jpg", label: "Vista prospettica interna tendostruttura.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427497/fuori_1_u5vafl.jpg", label: "Dettaglio ingresso esterno.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427551/struttura_interna_3_zmw9ip.jpg", label: "Allineamento tavoli interna.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427492/struttur_ainterna_1_xn3x1l.jpg", label: "Allestimento luci interne.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427527/giochi_1_zwzbxj.jpg", label: "Area intrattenimento e svago.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427567/struttura_interna_4_fnsxdx.jpg", label: "Allestimento zona bar.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427537/struttur_ainterna_2_y6ipjj.jpg", label: "Finiture dei teli PVC.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427525/air_hockey_nmm4of.jpg", label: "Area giochi: Air Hockey.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427559/impianti_eetito.jpg", label: "Impianto spina professionale.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427546/palchetto_2_pzbl66.jpg", label: "Pavimentazione palco modulare.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427554/palchetto_x5eb9l.jpg", label: "Configurazione palco eventi.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427510/flipper_rb0m4z.jpg", label: "Area giochi: Flipper Vintage.", orientation: 'portrait' }
];

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
    description: "I mercatini di Natale non sono eventi: sono **esperienze temporanee che si sedimentano nella memoria urbana**. Quando il Centro Commerciale Porta di Roma decide di ospitare i propri mercatini, sa che lo spazio non deve sentirsi commerciale, ma autentico, accogliente, quasi come se fosse sempre stato lì.\n\n**17 casette di legno** modulari e personalizzabili non sono semplici stand di vendita: sono piccole rappresentazioni dell'idea di \"mercato natalizio\". Ogni casetta, anche se identica alle altre, deve sentirsi parte di un tutto organico.\n\nLa sfida più grande non è il montaggio iniziale, ma la **gestione continuativa su 8 settimane**: mantenere l'integrità strutturale sotto la pioggia, il vento, le gelate; preservare l'aspetto estetico while garantendo funzionalità; koordinare con i commercianti che cambiano merci e strategie di vendita.\n\nLe casette di legno rappresentano la nostra risposta al problema della stagionalità: non sono temporanee nel senso di \"fragili\", ma temporanee nel senso di \"pensate per vivere il loro momento perfetto e poi scomparire con eleganza\".\n\nPorta di Roma non vuole un \"noleggio\": vuole che i suoi visitatori dimentichino che quello che vedono è stato montato da qualcuno. Vuole che sembrino sempre stati lì.",
    imageNarrative: "Le 17 casette di legno sono state progettate per resistere a 8 settimane di esposizione continua, garantendo isolamento termico e un'estetica calda e accogliente.",
    videoUrl: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1766015229/mood_orizzontale_qualit%C3%A0_bassissima_rnpesa.mov",
    videoLabel: "L'atmosfera magica dei Mercatini di Natale a Porta di Roma.",
    galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg", label: "Schiera di casette di legno." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739408566_ewgmpq.jpg", label: "Dettaglio della casetta con logo Porta Pia." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016453/1765739385298_i6e0d3.jpg", label: "Detagli di una casetta al calar del solo." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg", label: "L'integrazione tra le strutture e il flusso di visitatori del centro." }
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
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766430190/cover_q7wcxz.jpg",
    description: "Per il progetto della Festa della Birra organizzato dalla Pizzeria Il Decimo ad Alatri, l'obiettivo era creare uno spazio che fosse contemporaneamente funzionale, accogliente e capace di mantenere l'energia dell'evento per due settimane consecutive.\n\nAbbiamo realizzato una **tendostruttura di 500 metri quadri (25x20)**, dotata di teli PVC di ultima generazione che permettono di mantenere il calore all'interno della struttura e che trasformano lo spazio in una destination enogastronomica. All'interno, un **palchetto modulare 5x4 metri** ospita le performance live, circondato da **50 panche** che trasformano i visitatori in una comunità temporanea.\n\nLa vera sfida è stata integrare l'area giochi esterna - punchball, biliardino, air hockey e altri giochi - creando una fluidità di movemento tra la zona principale della birra e lo spazio ludico, garantendo al contempo la sicurezza di adulti e bambini. Per farlo abbiamo pensato di utilizzare un **gazebo 5x5** direttamente collegato alla struttura principale con copertura per il passaggio.\n\nQuello che è emerso da questo progetto è che la struttura non è mai stata percepita come \"allestimento\": è diventata la casa di quell'evento, il luogo dove i ricordi si sono creati. Due settimane è tempo sufficiente perché uno spazio temporaneo diventi \"il nostro spazio\".",
    imageNarrative: "La tendostruttura da 500mq con gazebo 5x5 integrato ha permesso di creare un'area food e ludica perfettamente connessa.",
    galleryItems: octoberFestGallery,
    materials: ["Tendostruttura 500mq", "Palchetto modulare 5x4m", "50 panche", "Gazebo 5x5", "Area giochi integrata"]
  },
  {
    title: "Tavolata lungo il corso",
    location: "Sora, Lazio",
    category: "Sagre e Feste di Paese",
    client: "Comune di Sora (Evento pubblico)",
    typeLabel: "Ente Pubblico",
    target: "Comunità locale",
    type: "sagre",
    year: "2024",
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766431972/sora-tavolata-22-xq-1_gei6bz.jpg",
    description: "\"Tavolata\" è il nome giusto: 180 tavoli distribuiti lungo il corso storico di Sora, trasformato temporaneamente in un'estensione del tessuto urbano. Ma dietro questa semplicità, c'è una complessità logistica che pochi comprendono. \n\nLa sfida non era la dimensione - 180 kit da birreria e 4 gazebi 4x4 - ma il **timing chirurgico**: montaggio sabato pomeriggio in poche ore, smontaggio nella notte del giorno stesso prima delle 9 del mattino, quando la strada doveva tornare al traffico quotidiano.\n\nAbbiamo coordinato il lavoro in modo che ogni gazebo, ogni kit, ogni tavolo si materializzasse al proprio posto senza intralcio, creando una continuità visiva lungo il corso. I gazebi non erano barriere, ma riferimenti - ancore visive che dicevano \"qui è diverso, qui c'è comunità\".\n\nIl risultato? Una strada che per 12 ore è diventata quello che tutte le strade potrebbero essere: uno spazio dove le persone si incontrano, mangiano, bevono, parlano. E domenica mattina, tutto spariva come non fosse mai stato. Questa è la maestria della logistica temporanea: scomparire perfettamente.",
    imageNarrative: "La logistica ha previsto il posizionamento millimetrico di 180 kit birreria lungo l'asse stradale principale di Sora in meno di 4 ore.",
    galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766431459/Tavolata-1_n5ofik.jpg", label: "L'infinita linea di tavoli che attraversa il centro storico." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766430420/sora-panorama-notte-2-960x639_lxpywe.jpg", label: "Gazebo 4x4m posizionati come punti di snodo for the beverage." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766430424/tavolata_kvlj4x.jpg", label: "Dettaglio dell'allestimento dei kit birreria." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766431972/sora-tavolata-22-xq-1_gei6bz.jpg", label: "Vista aerea della distribuzione lungo l'asse stradale." }
    ],
    materials: ["180 kit da birreria", "4 gazebi 4x4", "Montaggio/smontaggio rapido coordinato"]
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
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432820/20251205_154924_1_nfhx4d.jpg",
    description: "Per il Belgian Beer Festival di Fiuggi abbiamo fornito una tendostruttura 50x10 metri come area principale dell’evento, attrezzata con 30 kit da birreria per le zone degustazione.\n\nAll’esterno abbiamo installato 2 gazebi 4x4 per gli stand e un gazebo 3x3 come punto di passaggio e supporto logistico tra le diverse aree.\n\nLa richiesta del cliente era semplice e chiara: uno spazio coperto affidabile, funzionale e rapido da montare per tre giorni di festival, in grado di garantire comfort al pubblico anche in inverno.\n\nCi siamo occupati di posizionamento delle strutture e coordinamento del montaggio, lasciando al cliente la libertà di personalizzare interni, arredi e comunicazione visiva secondo la propria identità.",
    imageNarrative: "La maestosa tendostruttura 50x10m ha ospitato uno dei festival brassicoli più importanti del Lazio garantendo comfort termico.",
    galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432820/20251205_154924_1_nfhx4d.jpg", label: "La maestosa tendostruttura 50x10 metri." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432825/20251205_155327_zomoet.jpg", label: "L'atmosfera calda creata all'interno." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432824/20251205_155318_ad71ej.jpg", label: "Dettaglio spillatrici Shire Brewing." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766432826/20251205_155040_ajnu8u.jpg", label: "Struttura e gazebi visti dall'ingresso." }
    ],
    materials: ["Tendostruttura 50x10m", "30 kit da birreria", "2 gazebi 4x4", "1 gazebo 3x3"]
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
    image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg",
    description: "Abbiamo supportato il Palio San Pietro Eremita per tre edizioni consecutive, e ogni anno la sfida è rimasta la stessa ma con una pressione sempre crescente.\n\nLa configurazione è complessa: 400 transenne delimitano lo spazio dove i cavalli correranno, 3 gazebi offrono rifugio ai visitatori, 30 kit da birreria strutturano l'esperienza enogastronomica.",
    imageNarrative: "La messa in sicurezza del percorso tramite 400 transenne professionali è l'elemento critico per la riuscita di questa manifestazione storica.",
    galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_2_aygjdp.jpg", label: "Vista su cavallo e transenne per la sicurezza." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_1_klxvgc.jpg", label: "Visione ampia del percorso." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515475/palio_di_san_pietro_eremita_6_sjp5ye.jpg", label: "Dettaglio sulle emozioni." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766515473/palio_di_san_pietro_eremita_3_oabv1e.jpg", label: "Orgoglio e appartenenza partecipanti." }
    ],
    materials: ["400 transenne", "3 gazebi", "30 kit da birreria", "Partnership continuativa su 3 anni"]
  }
];

const filters = [
    { id: 'all', label: 'Tutti i Progetti' },
    { id: 'sagre', label: 'Sagre & Feste' },
    { id: 'fiere', label: 'Fiere & Manifestazioni' },
    { id: 'natalizi', label: 'Mercatini Natalizi' },
];

interface AllProjectsProps {
  onProjectSelect?: (project: ProjectData) => void;
  onShowContact?: () => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onProjectSelect }) => {
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
                            Ogni allestimento è una story di affidabilità e precisione tecnica, dalle grandi piazze storiche ai mercatini natalizi.
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 min-h-[50vh]">
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

                    <div className="relative mb-32">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center gap-4 mb-8">
                            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gf-green/50 to-gf-green"></div>
                         </div>
                         <StreetFoodSection />
                    </div>

                    <div className={`mt-12 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-12 md:p-20 text-center shadow-2xl">
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
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
        </section>
    );
}

export default AllProjects;
