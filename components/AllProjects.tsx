import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Camera, MapPin, Calendar, Layout } from 'lucide-react';

interface AllProjectsProps {
  onShowContact?: () => void;
}

const projects = [
  {
    title: "October Fest",
    location: "Alatri",
    category: "Sagra",
    year: "2024",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Sagra dell'Uva",
    location: "Marino",
    category: "Festa Patronale",
    year: "2024",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Festival del Jazz",
    location: "Atina",
    category: "Concerto",
    year: "2025",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Street Food Int.",
    location: "Latina",
    category: "Tour Gastronomico",
    year: "2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Villaggio di Natale",
    location: "Frosinone",
    category: "Allestimento Tematico",
    year: "2023",
    image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Expo Edilizia",
    location: "Roma Fiera",
    category: "Fiera",
    year: "2023",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Convention Tech",
    location: "Milano",
    category: "Corporate",
    year: "2024",
    image: "https://images.unsplash.com/photo-1505373877841-8d43f7166778?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Summer Beach Party",
    location: "Terracina",
    category: "Evento Privato",
    year: "2024",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2674&auto=format&fit=crop"
  },
  {
    title: "Notte Bianca",
    location: "Sora",
    category: "Evento Pubblico",
    year: "2023",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  }
];

const AllProjects: React.FC<AllProjectsProps> = ({ onShowContact }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoaded(true);
    }, []);

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (onShowContact) onShowContact();
    };

    return (
        <section className="relative pt-32 pb-24 min-h-screen bg-gf-darker overflow-hidden selection:bg-gf-green selection:text-white">
             
             {/* Background */}
             <div className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop")' }}
                ></div>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gf-darker/80 to-gf-darker"></div>
             </div>

             <div className="relative z-10 container mx-auto px-6">
                 
                 {/* Header */}
                 <div className={`mb-24 text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-xl">
                        <Camera size={12} className="text-gf-green animate-pulse" />
                        Portfolio Completo
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
                        ALL OUR <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">GREATEST HITS</span>
                    </h2>
                    <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                        Una selezione dei nostri allestimenti più iconici. 
                        Dalle piazze storiche ai grandi spazi fieristici, portiamo la nostra qualità ovunque.
                    </p>
                 </div>

                 {/* Projects Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {projects.map((project, idx) => (
                        <div 
                            key={idx} 
                            className={`group relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-gf-green/50 transition-all duration-700 ease-out`}
                            style={{ 
                                transitionDelay: `${100 + (idx * 50)}ms`, 
                                opacity: loaded ? 1 : 0, 
                                transform: loaded ? 'translateY(0)' : 'translateY(40px)' 
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

                 {/* Bottom CTA */}
                 <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
        </section>
    );
}

export default AllProjects;