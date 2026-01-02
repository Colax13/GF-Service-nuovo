
import React from 'react';

const LogoScroll: React.FC = () => {
  // SOSTITUISCI GLI SRC E GLI URL QUI SOTTO CON I TUOI DATI REALI
  // I loghi dovrebbero essere preferibilmente bianchi o colorati su sfondo trasparente.
  const logos = [
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767291783/logo-bfg-menu.png_mexglp.webp", alt: "Beverage group", url: "https://www.beveragegroup.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767292430/Shire_Brewing_10x_w2klnt.png", alt: "Shire brewing", url: "https://www.shirebrewing.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767292431/trevi_10x_v21s77.png", alt: "Comune di Trevi", url: "https://www.comune.trevi.pg.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767293222/Porta_di_roma_bianco_10x_e1p6ak.png", alt: "Porta di Roma", url: "https://porta-di-roma.klepierre.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767292428/isfood_10x_euvwoy.png", alt: "International Street Food", url: "https://isfood.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767292427/Don_Vito_10x_blvdzy.png", alt: "Don Vito Pizzeria", url: "https://www.instagram.com/donvitopt/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767293196/Comune_di_sra_bianco_10x_znkidk.png", alt: "Comune di Sora", url: "https://comune.sora.fr.it/" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767293671/20251020_171301_zelc4b.png", alt: "Centro commerciale La Selva", url: "https://www.centrolaselva.it/" },
  ];

  return (
    <section className="py-12 bg-gf-darker border-y border-white/5 overflow-hidden relative z-20">
      
      {/* Background Visual Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Subtle Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
         
         {/* Central Glow Blob */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[100px] bg-gf-green/20 rounded-full blur-[60px] opacity-50 animate-pulse"></div>
         
         {/* Noise Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 mb-10 text-center relative z-10">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 text-sm font-bold tracking-[0.2em] uppercase">
          Hanno scelto la nostra qualità
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-gradient z-10">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gf-darker to-transparent z-20"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gf-darker to-transparent z-20"></div>

        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          
          {/* First Set of Logos */}
          <div className="flex items-center gap-12 md:gap-24 px-12">
            {logos.map((logo, index) => (
              <a 
                key={index} 
                href={logo.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center group cursor-pointer"
              >
                 <div className="relative h-12 w-32 md:h-16 md:w-40 transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                    <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        className="w-full h-full object-contain"
                    />
                 </div>
              </a>
            ))}
          </div>

          {/* Duplicate Set for Seamless Loop */}
          <div className="flex items-center gap-12 md:gap-24 px-12">
            {logos.map((logo, index) => (
              <a 
                key={`dup-${index}`} 
                href={logo.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center group cursor-pointer"
              >
                 <div className="relative h-12 w-32 md:h-16 md:w-40 transition-all duration-300 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                    <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        className="w-full h-full object-contain"
                    />
                 </div>
              </a>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LogoScroll;
