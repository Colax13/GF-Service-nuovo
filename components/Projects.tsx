import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, MapPin } from 'lucide-react';
import { ProjectData, GalleryItem } from './ProjectDetail';

const octoberFestGallery: GalleryItem[] = [
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427539/struttura_interna_1_iaz1ji.jpg", label: "Vista prospettica interna tendostruttura.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427497/fuori_1_u5vafl.jpg", label: "Dettaglio ingresso esterno.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427551/struttura_interna_3_zmw9ip.jpg", label: "Allineamento tavoli.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427492/struttur_ainterna_1_xn3x1l.jpg", label: "Allestimento interno.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427527/giochi_1_zwzbxj.jpg", label: "Area intrattenimento e svago.", orientation: 'landscape' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427567/struttura_interna_4_fnsxdx.jpg", label: "Allestimento interno.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427537/struttur_ainterna_2_y6ipjj.jpg", label: "Dettaglio allestimento interno.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427525/air_hockey_nmm4of.jpg", label: "Air hokcey professionale.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427559/impianti_eetito.jpg", label: "Impianto spina professionale.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427546/palchetto_2_pzbl66.jpg", label: "Pavimentazione palco modulare.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427554/palchetto_x5eb9l.jpg", label: "Palchetto modulare.", orientation: 'portrait' },
    { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427510/flipper_rb0m4z.jpg", label: "Area giochi: Flipper Vintage.", orientation: 'portrait' }
];

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
      description: "I mercatini di Natale non sono eventi: sono **esperienze temporanee che si sedimentano nella memoria urbana**.",
      imageNarrative: "Le 17 casette di legno sono state progettate per resistere a 8 settimane di esposizione continua.",
      videoUrl: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1766015229/mood_orizzontale_qualit%C3%A0_bassissima_rnpesa.mov", 
      galleryItems: [
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg", label: "Schiera di casette di legno." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739408566_ewgmpq.jpg", label: "Dettaglio della casetta con logo Porta Pia." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016453/1765739385298_i6e0d3.jpg", label: "Detagli di una casetta al calar del solo." },
        { image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016459/1765739407842_g7kg1r.jpg", label: "L'integrazione tra le strutture e il flusso di visitatori del centro." }
      ],
      materials: ["17 casette di legno modulari"]
    },
    {
      title: "October Fest",
      location: "Alatri, Lazio",
      category: "Sagre e Feste di Paese",
      client: "Pizzeria Il Decimo",
      typeLabel: "Privato (Ristorante/Pizzeria)",
      target: "Adulti - Occasioni enogastronomiche",
      year: "2023",
      image: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766427539/struttura_interna_1_iaz1ji.jpg",
      description: "Per il progetto della Festa della Birra organizzato dalla Pizzeria Il Decimo ad Alatri, l'obiettivo era creare uno spazio che fosse contemporaneamente funzionale, accogliente e capace di mantenere l'energia dell'evento per due settimane consecutive.\n\nAbbiamo realizzato una **tendostruttura di 500 metri quadri (25x20)**, dotata di teli PVC di ultima generazione che permettono di mantenere il calore all'interno della struttura e che trasformano lo spazio in una destination enogastronomica. All'interno, un **palchetto modulare 5x4 metri** ospita le performance live, circondato da **50 panche** che trasformano i visitatori in una comunità temporanea.\n\nLa vera sfida è stata integrare l'area giochi esterna - punchball, biliardino, air hockey e altri giochi - creando una fluidità di movemento tra la zona principale della birra e lo spazio ludico, garantendo al contempo la sicurezza di adulti e bambini. Per farlo abbiamo pensato di utilizzare un **gazebo 5x5** direttamente collegato alla struttura principale con copertura per il passaggio.\n\nQuello che è emerso da questo progetto è che la struttura non è mai stata percepita come \"allestimento\": è diventata la casa di quell'evento, il luogo dove i ricordi si sono creati. Due settimane è tempo sufficiente perché uno spazio temporaneo diventi \"il nostro spazio\".",
      imageNarrative: "La tendostruttura da 500mq con gazebo 5x5 integrato ha permesso di creare un'area food e ludica perfettamente connessa.",
      galleryItems: octoberFestGallery,
      materials: ["Tendostruttura 500mq", "Palchetto modulare 5x4m", "50 panche", "Gazebo 5x5", "Area giochi integrata"]
    },
    {
      title: "Belgian Beer Festival",
      location: "Fiuggi, Lazio",
      category: "Fiere e Manifestazioni",
      client: "Shire Brewing",
      year: "2025",
      image: "https://images.unsplash.com/photo-1585923957286-90c44422204c?q=80&w=2000&auto=format&fit=crop",
      description: "Una tendostruttura 50x10 metri come cuore pulsante dell'evento.",
      galleryItems: [
        { image: "https://images.unsplash.com/photo-1585923957286-90c44422204c?q=80&w=2000&auto=format&fit=crop", label: "La maestosa tendostruttura 50x10 metri." },
        { image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop", label: "L'atmosfera calda creata all'interno." },
        { image: "https://images.unsplash.com/photo-1574577457805-4927756f4d22?q=80&w=2070&auto=format&fit=crop", label: "Dettaglio spillatrici Shire Brewing." },
        { image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop", label: "Area lounge con arredi in rattan." }
      ],
      materials: ["Tendostruttura 50x10m"]
    },
    {
      title: "Tavolata lungo corso",
      location: "Sora, Lazio",
      category: "Sagre e Feste di Paese",
      client: "Comune di Sora",
      year: "2024",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
      description: "180 tavoli trasformano il corso storico in un'area di comunità.",
      galleryItems: [
        { image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop", label: "L'infinita linea di tavoli che attraversa il centro storico." },
        { image: "https://images.unsplash.com/photo-1520183802803-06f731a2059f?q=80&w=2070&auto=format&fit=crop", label: "Gazebo 4x4m posizionati come punti di snodo per il beverage." },
        { image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", label: "Dettaglio dell'allestimento dei kit birreria." },
        { image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070&auto=format&fit=crop", label: "Vista aerea della distribuzione lungo l'asse stradale." }
      ],
      materials: ["180 kit da birreria"]
    }
  ];

  const infiniteProjects = [...projects, ...projects, ...projects];
  const [currentIndex, setCurrentIndex] = useState(projects.length);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileScrollRef.current) {
      const scrollContainer = mobileScrollRef.current;
      const cardWidth = scrollContainer.offsetWidth * 0.8;
      const gap = 24;
      const initialScroll = (projects.length * (cardWidth + gap));
      scrollContainer.scrollLeft = initialScroll;
    }
  }, [projects.length]);

  const handleScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, scrollWidth, offsetWidth } = mobileScrollRef.current;
    
    const cardWidth = offsetWidth * 0.8;
    const gap = 24;
    const singleSetWidth = projects.length * (cardWidth + gap);

    if (scrollLeft <= 10) {
      mobileScrollRef.current.scrollLeft = singleSetWidth + scrollLeft;
    } else if (scrollLeft >= scrollWidth - offsetWidth - 10) {
      mobileScrollRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }

    const centerPoint = scrollLeft + offsetWidth / 2;
    const index = Math.round(centerPoint / (cardWidth + gap)) % infiniteProjects.length;
    setCurrentIndex(index);
  };

  const activeDot = currentIndex % projects.length;

  return (
    <section id="progetti" ref={sectionRef} className="py-24 md:py-32 bg-black relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
          {projects.map((project, index) => (
              <div key={index} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === activeDot ? 'opacity-50' : 'opacity-0'}`} style={{ backgroundImage: `url(${project.image})`, filter: 'blur(60px) saturate(2)' }} />
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

        <div className="lg:hidden w-full flex flex-col items-center">
            <div ref={mobileScrollRef} onScroll={handleScroll} className="w-full flex flex-nowrap overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 px-10 pb-8 transition-all duration-500" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {infiniteProjects.map((project, index) => (
                <div key={index} onClick={() => onProjectSelect?.(project)} className={`min-w-[80vw] snap-center relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ease-out flex-shrink-0 ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-40 grayscale-[0.3]'}`}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight leading-tight">{project.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300 uppercase tracking-widest font-semibold"><MapPin size={14} className="text-gf-green" />{project.location}</div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        <div className="hidden lg:flex relative h-[500px] w-full items-center justify-center">
          {projects.map((project, index) => {
            const isActive = index === activeDot;
            const isPrev = index === (activeDot - 1 + projects.length) % projects.length;
            const isNext = index === (activeDot + 1) % projects.length;
            let styleClass = isActive ? "z-30 opacity-100 scale-100 translate-x-0 cursor-pointer shadow-2xl border border-white/10" : (isPrev ? "z-10 opacity-50 scale-90 -translate-x-[65%] cursor-pointer grayscale" : (isNext ? "z-10 opacity-50 scale-90 translate-x-[65%] cursor-pointer grayscale" : "z-0 opacity-0 scale-75 translate-x-0 pointer-events-none"));
            return (
              <div key={index} onClick={() => isActive ? onProjectSelect?.(project) : (isPrev ? setCurrentIndex(activeDot - 1 + projects.length) : setCurrentIndex(activeDot + 1))} className={`absolute top-0 w-[60%] h-full transition-all duration-500 ease-out rounded-2xl overflow-hidden group border-2 border-transparent ${styleClass}`}>
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none opacity-80 transition-opacity duration-500" />
                  <div className="absolute bottom-12 left-12 text-left z-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight uppercase tracking-tight">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-200 uppercase tracking-widest font-semibold"><MapPin size={16} className="text-gf-green" />{project.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={() => setCurrentIndex(activeDot - 1 + projects.length)} className="absolute left-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full transition-all"><ArrowLeft size={24} /></button>
          <button onClick={() => setCurrentIndex(activeDot + 1)} className="absolute right-8 z-40 bg-black/40 hover:bg-gf-green text-white p-4 rounded-full transition-all"><ArrowRight size={24} /></button>
        </div>

        <div className="mt-8">
             <a href="#" onClick={(e) => { e.preventDefault(); onShowAllProjects?.(); }} className="group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold hover:text-gf-green transition-colors">
                <span className="border-b border-white/30 pb-1 group-hover:border-gf-green transition-all">Sfoglia tutto il portfolio</span>
                <ArrowUpRight size={16} />
             </a>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Projects;