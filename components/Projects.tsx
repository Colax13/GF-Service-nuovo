import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, MapPin } from 'lucide-react';
import { ProjectData } from './ProjectDetail';

const Projects: React.FC<{ onShowAllProjects?: () => void; onProjectSelect?: (project: ProjectData) => void; }> = ({ onShowAllProjects, onProjectSelect }) => {
  const projects: ProjectData[] = [
    {
      title: "Mercatini di Natale",
      location: "Porta di Roma, Lazio",
      category: "Mercatini Natalizi",
      client: "Centro Commerciale Porta di Roma",
      typeLabel: "Struttura commerciale",
      target: "Famiglie, shopping natalizio",
      year: "2024",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg",
      description: "I mercatini di Natale non sono eventi: sono **esperienze temporanee che si sedimentano nella memoria urbana**. Quando il Centro Commerciale Porta di Roma decide di ospitare i propri mercatini, sa che lo spazio non deve sentirsi commerciale, ma autentico, accogliente, quasi come se fosse sempre stato lì.\n\n**17 casette di legno** modulari e personalizzabili non sono semplici stand di vendita: sono piccole rappresentazioni dell'idea di \"mercato natalizio\". Ogni casetta, anche se identica alle altre, deve sentirsi parte di un tutto organico.\n\nLa sfida più grande non è il montaggio iniziale, ma la **gestione continuativa su 8 settimane**: mantenere l'integrità strutturale sotto la pioggia, il vento, le gelate; preservare l'aspetto estetico while garantendo funzionalità; coordinare con i commercianti che cambiano merci e strategie di vendita.\n\nLe casette di legno rappresentano la nostra risposta al problema della stagionalità: non sono temporanee nel senso di \"fragili\", ma temporanee nel senso di \"pensate per vivere il loro momento perfetto e poi scomparire con eleganza\".\n\nPorta di Roma non vuole un \"noleggio\": vuole che i suoi visitatori dimentichino che quello che vedono è stato montato da qualcuno. Vuole che sembrino sempre stati lì.",
      imageNarrative: "Le 17 casette di legno sono state progettate per resistere a 8 settimane di esposizione continua, garantendo isolamento termico e un'estetica calda e accogliente.",
      videoLabel: "Analisi della stabilità strutturale in condizioni di affollamento massivo durante il weekend inaugurale.",
      videoUrl: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1766015229/mood_orizzontale_qualit%C3%A0_bassissima_rnpesa.mov", 
      galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg", label: "Schiera di casette di legno." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739408566_ewgmpq.jpg", label: "Dettaglio della casetta con logo Porta Pia." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg", label: "Detagli di una casetta al calar del solo." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg", label: "L'integrazione tra le strutture e il flusso di visitatori del centro." }
      ],
      materials: ["17 casette di legno modulari", "Personalizzazione estetica", "Gestione stagionale continuativa", "Coesione visiva su 8 settimane"]
    },
    {
      title: "October Fest",
      location: "Alatri, Lazio",
      category: "Sagre e Feste di Paese",
      client: "Pizzeria Il Decimo",
      year: "2023",
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop",
      description: "Per il progetto dell'October Fest organizzato dalla Pizzeria Il Decimo ad Alatri, l'obiettivo era creare uno spazio che fosse contemporaneamente funzionale, accogliente e capace di mantenere l'energia dell'evento per due settimane consecutive.\n\nAbbiamo realizzato una tendostruttura di 500 metri quadri, dotata di teli Crystal di ultima generazione che permettono alla luce naturale di creare un'atmosfera unica durante il giorno, mentre di sera le luci integrate trasformano lo spazio in una destination enogastronomica. All'interno, un palco modulare 5x4 metri ospita le performance live, circondato da 30 panche che trasformano i visitatori in una comunità temporanea.\n\nLa vera sfida è stata integrare l'area giochi esterna - punchball, biliardino e cento altri giochi - creando una fluidità di movement tra la zona principale della birra e lo spazio ludico, garantendo al contempo la sicurezza di adulti e bambini.",
      imageNarrative: "La tendostruttura Crystal da 500mq ha permesso di mantenere un legame visivo con il paesaggio di Alatri, garantendo al contempo una temperatura ideale interna.",
      videoLabel: "Sincronizzazione tra service audio/luci e allestimento strutturale durante i concerti live serali.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      galleryItems: [
        { image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop", label: "Vista panoramica della tendostruttura da 500 metri quadri." },
        { image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop", label: "Allestimento luci interne per creare l'atmosfera bavarese." },
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop", label: "Area food con 30 panche per il comfort dei visitatori." },
        { image: "https://images.unsplash.com/photo-1606099305177-3312948eb922?q=80&w=2070&auto=format&fit=crop", label: "Dettaglio dell'area giochi integrata con biliardini e attrazioni." }
      ],
      materials: ["Tendostruttura 500mq", "Palco modulare 5x4m", "30 panche", "Impianti birra 3 sezioni"]
    },
    {
      title: "Belgian Beer Festival",
      location: "Fiuggi, Lazio",
      category: "Fiere e Manifestazioni",
      client: "Shire Brewing",
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
      materials: ["Tendostruttura 50x10m", "30 kit da birreria", "Riscaldamento", "Illuminazione"]
    },
    {
      title: "Tavolata lungo corso",
      location: "Sora, Lazio",
      category: "Sagre e Feste di Paese",
      client: "Comune di Sora",
      year: "2024",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
      description: "\"Tavolata lungo corso\" è il nome giusto: 180 tavoli distribuiti lungo il corso storico di Sora, trasformato temporaneamente in un'estensione del tessuto urbano. Ma dietro questa semplicità, c'è una complessità logistica che pochi comprendono.\n\nLa sfida non era la dimensione - 180 kit da birreria e 4 gazebi 4x4 - ma il timing chirurgico: montaggio sabato pomeriggio in poche ore, smontaggio domenica notte prima delle 9 del mattino, quando la strada doveva tornare al traffico quotidiano.\n\nAbbiamo coordinato il lavoro in modo che ogni gazebo, ogni kit, ogni tavolo si materializzasse al proprio posto senza intralcio, creando una continuità visiva lungo il corso. I gazebi non erano barriere, ma riferimenti - ancore visive che dicevano \"qui è diverso, qui c'è comunità\".",
      imageNarrative: "La logistica ha previsto il posizionamento millimetrico di 180 kit birreria lungo l'asse stradale principale di Sora in meno di 4 ore.",
      videoLabel: "Timelaps del montaggio record: 180 tavoli posizionati e pronti all'uso in un pomeriggio.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      galleryItems: [
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop", label: "L'infinita linea di tavoli che attraversa il centro storico." },
        { image: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?q=80&w=2070&auto=format&fit=crop", label: "Gazebo 4x4m posizionati come punti di snodo per il beverage." },
        { image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop", label: "Squadre tecniche al lavoro durante la fase di allineamento dei tavoli." },
        { image: "https://images.unsplash.com/photo-1528696347323-93e5065216d4?q=80&w=2070&auto=format&fit=crop", label: "Vista notturna dell'evento: la trasformazione del corso è compiuta." }
      ],
      materials: ["180 kit da birreria", "4 gazebi 4x4", "Montaggio rapido"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="progetti" ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
          {projects.map((project, index) => (
              <div key={index} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-50' : 'opacity-0'}`} style={{ backgroundImage: `url(${project.image})`, filter: 'blur(60px) saturate(2)' }} />
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center w-full">
        <div className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Camera size={12} className="text-gf-green" /> <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase">PROGETTI <span className="font-serif italic text-gf-green font-light lowercase">Iconici</span></h2>
        </div>

        <div className="hidden lg:flex relative h-[500px] w-full items-center justify-center">
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + projects.length) % projects.length;
            const isNext = index === (currentIndex + 1) % projects.length;
            
            let styleClass = "z-0 opacity-0 scale-75 translate-x-0 pointer-events-none";
            if (isActive) styleClass = "z-30 opacity-100 scale-100 translate-x-0 cursor-pointer shadow-2xl border border-white/10";
            else if (isPrev) styleClass = "z-10 opacity-50 scale-90 -translate-x-[65%] cursor-pointer grayscale border-transparent";
            else if (isNext) styleClass = "z-10 opacity-50 scale-90 translate-x-[65%] cursor-pointer grayscale border-transparent";

            return (
              <div 
                key={index} 
                onClick={() => index === currentIndex ? onProjectSelect?.(project) : (isPrev ? prevSlide() : nextSlide())} 
                className={`absolute top-0 w-[60%] h-full transition-all duration-500 ease-out rounded-2xl overflow-hidden group border-2 border-transparent ${styleClass}`}
              >
                <div className="w-full h-full relative overflow-hidden">
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
                      className="group-hover:animate-draw-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        animationDuration: '0.6s', 
                        animationFillMode: 'forwards',
                        strokeLinecap: 'round'
                      }}
                    />
                  </svg>

                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-80"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                     <div className="group/btn flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] bg-white/10 backdrop-blur-xl hover:bg-gf-green hover:border-gf-green hover:scale-105 transition-all duration-300 shadow-xl">
                        Vedi Progetto
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                     </div>
                  </div>

                  <div className="absolute bottom-12 left-12 text-left z-10 transition-transform duration-500 group-hover:scale-105 origin-left pr-12">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg uppercase tracking-tight line-clamp-2">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-200 uppercase tracking-widest font-semibold drop-shadow-md">
                        <MapPin size={16} className="text-gf-green" />
                        {project.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={prevSlide} className="absolute left-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full transition-all"><ArrowLeft size={24} /></button>
          <button onClick={nextSlide} className="absolute right-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full transition-all"><ArrowRight size={24} /></button>
        </div>

        <div className="mt-8">
             <a href="#" onClick={(e) => { e.preventDefault(); onShowAllProjects?.(); }} className="group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold hover:text-gf-green transition-colors">
                <span className="border-b border-white/30 pb-1 group-hover:border-gf-green transition-all">Sfoglia tutto il portfolio</span>
                <ArrowUpRight size={16} />
             </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;