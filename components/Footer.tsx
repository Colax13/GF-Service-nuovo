
import React, { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';

interface FooterProps {
  onShowContact?: () => void;
  onShowAbout?: () => void;
  onNavigate?: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onShowContact, onShowAbout, onNavigate }) => {
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string, href: string) => {
     if (item === 'Contatti' && onShowContact) {
         e.preventDefault();
         onShowContact();
         return;
     }

     if (item === 'Chi siamo' && onShowAbout) {
         e.preventDefault();
         onShowAbout();
         return;
     }

     if (onNavigate && href.startsWith('#')) {
        e.preventDefault();
        onNavigate(href.substring(1));
     }
  };

  return (
    <footer 
      ref={footerRef} 
      className="bg-black text-white pt-24 pb-12 relative overflow-hidden"
    >
        {/* Subtle top gradient line for "linear" connection to previous section */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Company Info */}
            <div 
                className={`transition-all duration-700 ease-out delay-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div className="flex flex-col items-start gap-0 mb-6 group">
                    {/* Logo Icon */}
                    <div className="relative w-16 h-10">
                        <svg viewBox="0 0 100 60" className="w-full h-full stroke-white fill-none stroke-[8] stroke-linecap-round stroke-linejoin-round">
                            {/* G */}
                            <path d="M 40 10 A 20 20 0 1 0 40 50 H 50 V 30 H 40" />
                            {/* F */}
                            <path d="M 70 10 H 90 M 70 10 V 50 M 70 30 H 85" />
                        </svg>
                    </div>
                    {/* Text */}
                    <span className="text-xs font-bold tracking-[0.4em] text-white uppercase ml-1">
                        Service
                    </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-light">
                  Dal 2005, il partner di fiducia per l'allestimento di eventi nel Centro Italia. Qualità, sicurezza e puntualità al tuo servizio.
                </p>
                <div className="flex gap-4">
                    {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                        <a 
                            key={i}
                            href="#" 
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-gf-green hover:border-gf-green hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Office */}
            <div 
                className={`transition-all duration-700 ease-out delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-gf-green">Sede Operativa</h4>
                <div className="space-y-4 text-gray-400 text-sm font-light">
                    <p className="text-white font-medium">Frosinone, Italia</p>
                    <p>Via Marte, 105<br/>03010 Tecchiena (FR)</p>
                    <div className="pt-4 flex flex-col gap-2">
                        <a href="mailto:info@maluservice.it" className="hover:text-white transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gf-green"></span>
                            info@maluservice.it
                        </a>
                        <a href="tel:+393331234567" className="hover:text-white transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gf-green"></span>
                            +39 333 123 4567
                        </a>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div 
                className={`transition-all duration-700 ease-out delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-gf-green">Esplora</h4>
                <ul className="space-y-3 text-sm text-gray-400 font-light">
                {['Home', 'Servizi', 'Progetti', 'Chi siamo', 'Le nostre storie', 'Contatti'].map((item) => {
                    let href = `#${item.toLowerCase().replace(/ /g, '-')}`;
                    if (item === 'Home') href = '#hero';
                    
                    return (
                        <li key={item}>
                            <a 
                                href={href}
                                onClick={(e) => handleLinkClick(e, item, href)}
                                className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer"
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
                </ul>
            </div>

            {/* Hours / Utility */}
            <div 
                className={`transition-all duration-700 ease-out delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-gf-green">Orari Ufficio</h4>
                 <ul className="space-y-3 text-sm text-gray-400 mb-10 font-light">
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Lun - Ven</span> <span className="text-white">09:00 - 18:00</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Sabato</span> <span className="text-white">09:00 - 13:00</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Domenica</span> <span className="text-gf-green font-medium">Chiuso</span></li>
                 </ul>
                 <a 
                    href="#hero"
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors inline-block"
                 >
                    Torna su <ArrowUp size={16} className="text-gf-green group-hover:-translate-y-1 transition-transform duration-300 inline-block" />
                 </a>
            </div>
            </div>

            {/* Bottom Bar */}
            <div className={`border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 transition-all duration-1000 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                <p>&copy; {new Date().getFullYear()} Malù Service and Games SRL. P.IVA 12345678900 - All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Credits</a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
