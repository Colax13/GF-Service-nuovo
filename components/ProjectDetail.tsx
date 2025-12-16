import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, X, MapPin, Share2 } from 'lucide-react';

export interface ProjectData {
  title: string;
  location: string;
  category: string;
  year: string;
  image: string;
}

interface ProjectDetailProps {
  project: ProjectData;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger entrance animations
    setTimeout(() => setLoaded(true), 100);

    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;
        setScrollProgress(Number(scroll));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data to match the requested "Photo 2" structure based on the project
  const details = {
      area: project.category || "Event Production",
      brand: project.title.split(' ')[0] + " Corp", // Fictional brand derived from title
      type: "B2C / Public Event",
      target: "General Audience"
  };

  const galleryImages = [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-gf-darker overflow-y-auto overflow-x-hidden animate-in fade-in duration-300">
        
        {/* PROGRESS BAR */}
        <div 
            className="fixed top-0 left-0 h-1 bg-gf-green z-[70]" 
            style={{ width: `${scrollProgress * 100}%` }}
        ></div>

        {/* CLOSE BUTTON */}
        <button 
            onClick={onClose}
            className="fixed top-6 right-6 z-[70] w-12 h-12 bg-black/50 hover:bg-gf-green backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-300 group border border-white/10"
        >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* --- HERO SECTION --- */}
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${project.image}")` }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gf-darker"></div>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-32 md:pb-24">
                 <div className={`transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gf-green/90 text-white text-[10px] font-bold uppercase tracking-widest rounded">
                            {project.year}
                        </span>
                        <span className="flex items-center gap-1 text-gray-300 text-xs uppercase tracking-wider font-medium">
                            <MapPin size={12} /> {project.location}
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-none tracking-tight mb-6 drop-shadow-2xl">
                        {project.title}
                    </h1>
                 </div>
            </div>
        </div>

        {/* --- INFO PANEL & DESCRIPTION --- */}
        <div className="relative z-10 container mx-auto px-6 -mt-10 md:-mt-20 mb-32">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* SLIDING LEFT PANEL (Area, Brand, Type, Target) */}
                <div 
                    className={`w-full lg:w-1/3 bg-gf-darker/95 backdrop-blur-xl border-t border-r border-l border-white/10 p-8 md:p-10 rounded-t-3xl lg:rounded-3xl shadow-2xl transition-all duration-1000 delay-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-8 gap-x-4">
                        <div className="group">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1 group-hover:text-gf-green transition-colors">Area</h4>
                            <p className="text-white text-lg md:text-xl font-bold leading-tight">{details.area}</p>
                        </div>
                        <div className="group">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1 group-hover:text-gf-green transition-colors">Brand</h4>
                            <p className="text-white text-lg md:text-xl font-bold leading-tight">{details.brand}</p>
                        </div>
                        <div className="group">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1 group-hover:text-gf-green transition-colors">Type</h4>
                            <p className="text-white text-lg md:text-xl font-bold leading-tight">{details.type}</p>
                        </div>
                        <div className="group">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1 group-hover:text-gf-green transition-colors">Target</h4>
                            <p className="text-white text-lg md:text-xl font-bold leading-tight">{details.target}</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT (Description) */}
                <div 
                    className={`w-full lg:w-2/3 pt-10 transition-all duration-1000 delay-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <h3 className="text-2xl md:text-4xl text-white font-bold mb-8 leading-tight">
                        Quando la sostenibilità <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">incontra il design.</span>
                    </h3>
                    <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed max-w-2xl">
                        <p>
                            Per il progetto {project.title} a {project.location}, l'obiettivo era creare uno spazio che non fosse solo funzionale, ma emozionale. Abbiamo utilizzato tensostrutture di ultima generazione con teli Crystal per permettere alla luce naturale di fondersi con l'ambiente circostante.
                        </p>
                        <p>
                            La sfida logistica principale è stata coordinare il montaggio in 48 ore, garantendo al contempo gli standard di sicurezza ISO richiesti. Il risultato è un villaggio temporaneo che sembra essere sempre stato lì.
                        </p>
                    </div>

                    <div className="mt-10 flex gap-4">
                         <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-gf-darker transition-all">
                            <Share2 size={16} /> Condividi
                         </button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- VIDEO SECTION --- */}
        <div className="container mx-auto px-6 mb-32">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
                 {/* Video Placeholder Background */}
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')` }}>
                 </div>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 
                 {/* Play Button */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-gf-green group-hover:border-gf-green transition-all duration-300">
                      <Play size={32} className="text-white fill-white ml-1" />
                 </div>
                 
                 <div className="absolute bottom-8 left-8">
                     <span className="text-xs font-bold text-white uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                        Guarda il video del montaggio
                     </span>
                 </div>
            </div>
        </div>

        {/* --- GALLERY SECTION --- */}
        <div className="container mx-auto px-6 pb-32">
            <h3 className="text-3xl font-bold text-white mb-12 border-l-4 border-gf-green pl-6 uppercase">Gallery del progetto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {galleryImages.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`relative rounded-2xl overflow-hidden group ${idx === 0 || idx === 3 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                    >
                        <img 
                            src={img} 
                            alt={`Gallery ${idx}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer Navigation within Project */}
        <div className="border-t border-white/10 bg-gf-darker py-12">
            <div className="container mx-auto px-6 text-center">
                <button 
                    onClick={onClose}
                    className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
                >
                    <ArrowLeft size={16} /> Torna a tutti i progetti
                </button>
            </div>
        </div>

    </div>
  );
};

export default ProjectDetail;