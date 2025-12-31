
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, X, MapPin, Package, CheckCircle2, Info } from 'lucide-react';

export interface GalleryItem {
  image: string;
  label: string;
  orientation?: 'portrait' | 'landscape';
}

export interface ProjectData {
  title: string;
  location: string;
  category: string;
  type?: string; 
  year: string;
  image: string;
  materials?: string[];
  description?: string; 
  descriptionTitle?: string;
  imageNarrative?: string; 
  videoLabel?: string;     
  videoUrl?: string;       
  galleryItems?: GalleryItem[]; 
  client?: string;      
  typeLabel?: string;   
  target?: string;      
}

interface ProjectDetailProps {
  project: ProjectData;
  onClose: () => void;
  onGoToProjects?: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onGoToProjects }) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const handleScroll = (e: any) => {
        const totalScroll = e.target.scrollTop;
        const totalHeight = e.target.scrollHeight - e.target.clientHeight;
        const scroll = totalScroll / totalHeight;
        setScrollProgress(scroll || 0);
    }

    const container = document.getElementById('project-detail-container');
    if (container) {
        container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
        if (container) {
            container.removeEventListener('scroll', handleScroll);
        }
    };
  }, []);

  const isDirectVideo = (url: string | undefined) => {
    if (!url) return false;
    const directExtensions = ['.mp4', '.mov', '.webm', '.ogg', '/video/upload/'];
    return directExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const getEmbedUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return url;
  };

  const renderDescription = (text: string | undefined) => {
    if (!text) return "Dettagli del progetto in fase di caricamento.";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
        id="project-detail-container"
        className="fixed inset-0 z-[120] bg-gf-darker overflow-y-auto overflow-x-hidden animate-in fade-in duration-300"
    >
        <div className="fixed top-0 left-0 h-1 bg-gf-green z-[135]" style={{ width: `${scrollProgress * 100}%` }}></div>

        <button 
            onClick={onClose}
            className="fixed top-24 right-6 z-[140] w-12 h-12 bg-black/50 hover:bg-gf-green backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-300 group border border-white/10"
        >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="relative w-full h-screen">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${project.image}")` }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gf-darker"></div>
            </div>
            <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-32 md:pb-24 pt-32">
                 <div className={`transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gf-green/90 text-white text-[10px] font-bold uppercase tracking-widest rounded">{project.year}</span>
                        <span className="flex items-center gap-1 text-gray-300 text-xs uppercase tracking-wider font-medium"><MapPin size={12} /> {project.location}</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-none tracking-tight mb-6 drop-shadow-2xl">{project.title}</h1>
                 </div>
            </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 -mt-10 md:-mt-20 mb-32">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className={`w-full lg:w-1/3 bg-gf-darker/95 backdrop-blur-xl border border-white/10 py-6 px-8 md:py-10 md:px-10 rounded-3xl shadow-2xl transition-all duration-1000 delay-500 ease-out transform lg:sticky lg:top-32 z-20 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-6 lg:gap-y-8 gap-x-4">
                        <div className="group"><h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Noleggio Area</h4><p className="text-white text-lg md:text-xl font-bold leading-tight">{project.category}</p></div>
                        <div className="group"><h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Cliente</h4><p className="text-white text-lg md:text-xl font-bold leading-tight">{project.client || "Partner locale"}</p></div>
                        <div className="group"><h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Tipo Evento</h4><p className="text-white text-lg md:text-xl font-bold leading-tight">{project.typeLabel || "Evento pubblico"}</p></div>
                    </div>
                </div>

                <div className={`w-full lg:w-2/3 pt-10 transition-all duration-1000 delay-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h3 className="text-2xl md:text-4xl text-white font-bold mb-8 leading-tight">Allestimento tecnico <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gf-green to-emerald-400">fornito a noleggio.</span></h3>
                    <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed max-w-2xl mb-8 whitespace-pre-wrap">{renderDescription(project.description)}</div>
                    
                    {project.materials && project.materials.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-white/10">
                            <div className="flex items-center gap-3 mb-8"><Package className="text-gf-green" size={20} /><h4 className="text-sm font-bold text-white uppercase tracking-[0.3em]">Attrezzature Noleggiate</h4></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {project.materials.map((material, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-gf-green/30 group">
                                        <div className="w-8 h-8 rounded-full bg-gf-green/10 flex items-center justify-center text-gf-green group-hover:bg-gf-green group-hover:text-white transition-all"><CheckCircle2 size={16} /></div>
                                        <span className="text-gray-300 text-sm font-medium tracking-wide">{material}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="border-t border-white/10 bg-gf-darker py-12">
            <div className="container mx-auto px-6 text-center">
                <button 
                    onClick={onGoToProjects || onClose} 
                    className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Torna a tutti i progetti
                </button>
            </div>
        </div>
    </div>
  );
};

export default ProjectDetail;
