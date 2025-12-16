import React, { useEffect, useState, useMemo } from 'react';
import { ArrowUpRight, Camera, MapPin, Calendar, Layout, Filter, SlidersHorizontal, ArrowDown } from 'lucide-react';
import { ProjectData } from './ProjectDetail';

interface AllProjectsProps {
  onShowContact?: () => void;
  onProjectSelect?: (project: ProjectData) => void;
}

const projects = [
  {
    title: "October Fest",
    location: "Alatri",
    category: "Sagra",
    type: "public",
    year: "2024",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Sagra dell'Uva",
    location: "Marino",
    category: "Festa Patronale",
    type: "public",
    year: "2024",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Festival del Jazz",
    location: "Atina",
    category: "Concerto",
    type: "public",
    year: "2025",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Street Food Int.",
    location: "Latina",
    category: "Tour Gastronomico",
    type: "public",
    year: "2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Villaggio di Natale",
    location: "Frosinone",
    category: "Allestimento Tematico",
    type: "corporate",
    year: "2023",
    image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Expo Edilizia",
    location: "Roma Fiera",
    category: "Fiera",
    type: "corporate",
    year: "2023",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Convention Tech",
    location: "Milano",
    category: "Corporate",
    type: "corporate",
    year: "2024",
    image: "https://images.unsplash.com/photo-1505373877841-8d43f7166778?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Summer Beach Party",
    location: "Terracina",
    category: "Evento Privato",
    type: "private",
    year: "2024",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2674&auto=format&fit=crop"
  },
  {
    title: "Notte Bianca",
    location: "Sora",
    category: "Evento Pubblico",
    type: "public",
    year: "2023",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  }
];

const filters = [
    { id: 'all', label: 'Tutti i Progetti' },
    { id: 'public', label: 'Sagre & Grandi Eventi' },
    { id: 'corporate', label: 'Corporate & Fiere' },
    { id: 'private', label: 'Feste Private' },
];

const AllProjects: React.FC<AllProjectsProps> = ({ onShowContact, onProjectSelect }) => {
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

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (onShowContact) onShowContact();
    };

    return (
        <section className="relative min-h-screen bg-gf-darker text-white pb-20">

             {/* --- FIXED BACKGROUND & GRADIENT (Matches Services Design) --- */}
             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                 
                 {/* 1. DYNAMIC IMAGE LAYER */}
                 {/* Shows hovered project image in background */}
                 {projects.map((proj, idx) => (
                    <div 
                        key={idx}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-opacity ${hoveredProject === proj.title ? 'opacity-40 scale-105' : 'opacity-0 scale-100'}`}
                        style={{ 
                            backgroundImage: `url("${proj.image}")`,
                            filter: 'blur(60px) saturate(1.5)', 
                        }}
                    />
                 ))}

                 {/* 2. OVERLAY GRADIENT */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/90 to-[#022c24]/95"></div>
                 
                 {/* 3. ANIMATED BLOBS */}
                 <div className="absolute -top-[20%] right-[10%] w-[60vw] h-[60vw] bg-gf-green/10 rounded-full blur-[120px] animate-[float_20s_infinite_ease-in-out]"></div>
                 <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] bg-emerald-900/20 rounded-full blur-[100px] animate-[float_25s_infinite_reverse_ease-in-out]"></div>
                 
                 {/* Noise Overlay */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
             </div>

             {/* --- CONTENT --- */}
             <div className="relative z-10 pt-32">
                 
                 {/* --- HEADER (Redesigned) --- */}
                 <div className="container mx-auto px-6 mb-24">
                     <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                            <Camera size={12} className="text-gf-green animate-pulse" />
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">Selected Works</span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
                            IL NOSTRO <span className="font-serif italic text-gf-green font-light">PORTFOLIO</span>
                        </h1>

                        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Una selezione dei nostri allestimenti più iconici. 
                            Dalle piazze storiche ai grandi spazi fieristici, portiamo la nostra qualità ovunque.
                        </p>
                     </div>
                 </div>

                 {/* --- SEPARATOR SECTION --- */}
                 <div className="w-full bg-white/5 border-y border-white/10 backdrop-blur-sm mb-20 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gf-green/5"></div>
                     <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                         <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
                                Dal Progetto alla <br/> 
                                <span className="text-gf-green">Realizzazione.</span>
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed">
                                Ogni evento ha una storia unica. Noi ci assicuriamo che la struttura che lo ospita sia all'altezza di quella storia. 
                                Sfoglia i progetti per categoria.
                            </p>
                         </div>
                         <div className="hidden md:flex gap-12 text-center">
                             <div>
                                 <div className="text-4xl font-bold text-white mb-1">500+</div>
                                 <div className="text-xs text-gf-green uppercase tracking-widest font-bold">Eventi Realizzati</div>
                             </div>
                             <div>
                                 <div className="text-4xl font-bold text-white mb-1">20</div>
                                 <div className="text-xs text-gf-green uppercase tracking-widest font-bold">Anni di Storia</div>
                             </div>
                         </div>
                         
                         {/* Down Arrow Indicator */}
                         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
                             <ArrowDown size={20} />
                         </div>
                     </div>
                 </div>

                 <div className="container mx-auto px-6">
                    
                    {/* --- FILTER MENU --- */}
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-6 mb-16 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        
                        {/* Desktop Filters */}
                        <div className="hidden md:flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`
                                        px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                                        ${activeFilter === filter.id 
                                            ? 'bg-gf-green text-white shadow-lg transform scale-105' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Dropdown (Simplified) */}
                        <div className="md:hidden w-full relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gf-green">
                                <Filter size={16} />
                            </div>
                            <select 
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-white text-sm uppercase font-bold py-4 pl-12 pr-4 rounded-xl appearance-none outline-none focus:border-gf-green transition-colors"
                            >
                                {filters.map(f => (
                                    <option key={f.id} value={f.id} className="bg-gf-darker text-gray-300">{f.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <SlidersHorizontal size={16} />
                            </div>
                        </div>

                        {/* Result Count */}
                        <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                            Mostrando {filteredProjects.length} Progetti
                        </div>
                    </div>

                    {/* --- PROJECTS GRID --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 min-h-[50vh]">
                        {filteredProjects.map((project, idx) => (
                            <div 
                                key={`${project.title}-${idx}`} 
                                onClick={() => onProjectSelect && onProjectSelect(project)}
                                onMouseEnter={() => setHoveredProject(project.title)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className={`group relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-gf-green/50 transition-all duration-700 ease-out cursor-pointer animate-fade-in-up`}
                                style={{ 
                                    animationDelay: `${idx * 100}ms`
                                }}
                            >
                                {/* Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url("${project.image}")` }}
                                ></div>
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {/* Tags */}
                                    <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-gf-green/90 text-white px-2 py-1 rounded">
                                            {project.category}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white px-2 py-1 rounded flex items-center gap-1">
                                            <Calendar size={10} /> {project.year}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2 leading-none">{project.title}</h3>
                                    
                                    <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-300 uppercase tracking-wider font-medium">
                                            <MapPin size={14} className="text-gf-green" />
                                            {project.location}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gf-green transition-colors">
                                            <ArrowUpRight size={16} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- BOTTOM CTA --- */}
                    <div className={`mt-16 text-center transition-all duration-1000 delay-500 pb-12 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Questi sono solo alcuni esempi. Hai un'idea diversa in mente?
                        </p>
                        <a 
                            href="#contatti"
                            onClick={handleContactClick}
                            className="inline-flex items-center gap-3 bg-white text-gf-darker hover:bg-gf-green hover:text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            <Layout size={20} />
                            Inizia il tuo progetto
                        </a>
                    </div>

                 </div>
             </div>

             <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    33% { transform: translate(30px, -50px); }
                    66% { transform: translate(-20px, 20px); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }
                @keyframes fadeInUp {
                    to { opacity: 1; transform: translateY(0); }
                }
             `}</style>
        </section>
    );
}

export default AllProjects;