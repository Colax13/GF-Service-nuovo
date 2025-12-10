import React from 'react';
import { Hexagon, Zap, Globe, Anchor, Camera, Music, Coffee, Box, Shield, Award } from 'lucide-react';

const LogoScroll: React.FC = () => {
  const logos = [
    { icon: Hexagon, name: "NEXUS EVENTS" },
    { icon: Zap, name: "POWER STAGE" },
    { icon: Globe, name: "GLOBAL EXPO" },
    { icon: Music, name: "SOUNDWAVE" },
    { icon: Anchor, name: "MARITIME" },
    { icon: Camera, name: "VISIONARY" },
    { icon: Box, name: "CUBE LOGISTICS" },
    { icon: Shield, name: "SECURE STAND" },
    { icon: Coffee, name: "URBAN TASTE" },
    { icon: Award, name: "PREMIUM SET" },
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

      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 text-sm font-bold tracking-[0.2em] uppercase">
          Trusted by 50+ Partners
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-gradient z-10">
        {/* Gradient Masks for smooth fade out at edges - Updated to match bg-gf-darker */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gf-darker to-transparent z-20"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gf-darker to-transparent z-20"></div>

        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {/* First Set of Logos */}
          <div className="flex items-center gap-16 px-8">
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center gap-3 group cursor-default">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-gf-green/20 transition-colors duration-300 border border-transparent group-hover:border-gf-green/30">
                    <logo.icon size={24} className="text-gray-500 group-hover:text-gf-green transition-colors duration-300" />
                </div>
                <span className="text-lg font-bold text-gray-600 group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-tighter">
                    {logo.name}
                </span>
              </div>
            ))}
          </div>

          {/* Duplicate Set for Seamless Loop */}
          <div className="flex items-center gap-16 px-8">
            {logos.map((logo, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-3 group cursor-default">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-gf-green/20 transition-colors duration-300 border border-transparent group-hover:border-gf-green/30">
                    <logo.icon size={24} className="text-gray-500 group-hover:text-gf-green transition-colors duration-300" />
                </div>
                <span className="text-lg font-bold text-gray-600 group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-tighter">
                    {logo.name}
                </span>
              </div>
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