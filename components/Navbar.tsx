
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onBackToHome?: () => void; // Renders the specialized "Back" header
  onShowContact?: () => void;
  onShowServices?: () => void;
  onShowProjects?: () => void;
  onShowBlog?: () => void;
  onShowAbout?: () => void;
  onNavigate?: (href: string) => void; // Renders standard header but intercepts clicks
  forcedActive?: string; // Force a specific link to be active (e.g., for sub-pages)
  forceBackground?: boolean; // Forces the background to be visible
}

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Servizi', href: '#servizi' },
  { name: 'Progetti', href: '#progetti' },
  { name: 'Chi siamo', href: '#chi-siamo' },
  { name: 'Le nostre storie', href: '#blog' },
  { name: 'Contatti', href: '#contatti' },
];

const Navbar: React.FC<NavbarProps> = ({ 
  onBackToHome, 
  onShowContact, 
  onShowServices, 
  onShowProjects, 
  onShowBlog, 
  onShowAbout,
  onNavigate, 
  forcedActive,
  forceBackground = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(forcedActive || 'Home');

  // Aggiorna la sezione attiva se la prop forcedActive cambia
  useEffect(() => {
    if (forcedActive) {
      setActiveSection(forcedActive);
    } else {
      setActiveSection('Home');
    }
  }, [forcedActive]);

  useEffect(() => {
    // Gestione semplice dello sfondo della navbar allo scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Controllo iniziale
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkName: string, href: string) => {
    e.preventDefault();

    // Specific Page Handlers (Questi cambiano la vista in App.tsx e di conseguenza aggiornano forcedActive)
    if (linkName === 'Contatti' && onShowContact) {
        onShowContact();
        setMobileMenuOpen(false);
        return;
    }

    if (linkName === 'Servizi' && onShowServices) {
        onShowServices();
        setMobileMenuOpen(false);
        return;
    }

    if (linkName === 'Progetti' && onShowProjects) {
        onShowProjects();
        setMobileMenuOpen(false);
        return;
    }

    if (linkName === 'Le nostre storie' && onShowBlog) {
        onShowBlog();
        setMobileMenuOpen(false);
        return;
    }

    if (linkName === 'Chi siamo' && onShowAbout) {
        onShowAbout();
        setMobileMenuOpen(false);
        return;
    }
    
    // Priority 1: Navigation Override (per tornare alla home da una sub-page)
    if (onNavigate) {
        onNavigate(href);
        setMobileMenuOpen(false);
        return;
    }

    // Priority 2: Standard Anchor Navigation (Se siamo già in Home)
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleQuoteClick = () => {
    if (onShowContact) {
        onShowContact();
    } else {
        const element = document.getElementById('contatti');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[130] transition-all duration-300 ${scrolled || onBackToHome || forceBackground ? 'bg-black/60 backdrop-blur-lg lg:bg-gf-darker/95 lg:backdrop-blur-md py-4 lg:py-6 shadow-lg' : 'bg-transparent py-6 lg:py-10'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-white relative z-[131]">
          
          {/* Left: Back Button or Standard Links */}
          {onBackToHome ? (
             <button 
                onClick={onBackToHome}
                className="flex items-center gap-2 text-white hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest"
             >
                <ArrowLeft size={18} /> Torna alla Home
             </button>
          ) : (
            <div className="hidden lg:flex gap-6 text-xs font-bold tracking-widest uppercase">
                {navLinks.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.name, link.href)}
                    className={`relative group transition-opacity duration-300 cursor-pointer ${activeSection === link.name ? 'text-white opacity-100' : 'text-white opacity-60 hover:opacity-100'}`}
                >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 w-full h-[2px] bg-gf-green transform transition-transform duration-300 origin-left ${activeSection === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
                ))}
            </div>
          )}

          {/* Center: Logo */}
          <div 
            className="flex flex-col items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 cursor-pointer group leading-none"
            onClick={() => onNavigate ? onNavigate('#hero') : document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
             <div className="relative w-12 h-8 mb-1">
                 <svg viewBox="0 0 100 60" className="w-full h-full stroke-white fill-none stroke-[8] stroke-linecap-round stroke-linejoin-round group-hover:stroke-gf-green transition-colors duration-300">
                    <path d="M 40 10 A 20 20 0 1 0 40 50 H 50 V 30 H 40" />
                    <path d="M 70 10 H 90 M 70 10 V 50 M 70 30 H 85" />
                 </svg>
             </div>
             <span className="text-[10px] font-bold tracking-[0.4em] text-white group-hover:text-gf-green transition-colors duration-300 uppercase">
                Service
             </span>
          </div>

          {/* Right: CTA Button (Replacing Icons) */}
          <div className="hidden lg:block">
               <button 
                  onClick={handleQuoteClick}
                  className="bg-gf-green hover:bg-white hover:text-gf-darker text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,112,90,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
               >
                  Richiedi Preventivo
               </button>
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="text-white hover:text-gf-green transition-colors focus:outline-none p-2"
              aria-label="Open menu"
            >
               <Menu size={32} />
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[150] bg-black/60 backdrop-blur-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center border-b border-white/5">
             <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">Menu</span>
             <button 
               onClick={() => setMobileMenuOpen(false)}
               className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-gf-green transition-all duration-300 hover:bg-white/5"
               aria-label="Close menu"
             >
                <X size={28} className="text-white group-hover:text-gf-green group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>

          <div className="h-full flex flex-col justify-between pt-28 pb-8 px-8 overflow-y-auto">
             <div className="flex flex-col gap-8">
                {onBackToHome ? (
                    <button 
                        onClick={() => { setMobileMenuOpen(false); onBackToHome(); }}
                        className="group flex items-center justify-between text-3xl md:text-5xl font-light text-white hover:text-gf-green transition-colors py-4 border-b border-white/5 hover:border-gf-green/30"
                    >
                         <span className="flex items-baseline gap-4">Torna alla Home</span>
                         <ArrowLeft size={24} className="text-gf-green" />
                    </button>
                ) : (
                    navLinks.map((link, idx) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.name, link.href)}
                            className={`group flex items-center justify-between text-3xl md:text-5xl font-light transition-colors py-4 border-b border-white/5 hover:border-gf-green/30 cursor-pointer ${activeSection === link.name ? 'text-white' : 'text-white/60 hover:text-white'}`}
                            style={{ 
                                transitionDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms',
                                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: mobileMenuOpen ? 1 : 0,
                                transition: 'all 0.5s ease-out'
                            }}
                        >
                            <span className="flex items-baseline gap-6">
                                <span className={`text-sm font-mono transition-all duration-300 transform ${activeSection === link.name ? 'text-gf-green opacity-100 translate-x-0' : 'text-gf-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                                    0{idx + 1}
                                </span>
                                {link.name}
                            </span>
                            <ArrowRight size={24} className={`transition-all duration-300 text-gf-green ${activeSection === link.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </a>
                    ))
                )}
             </div>

             <div className="mt-12 grid grid-cols-1 gap-8 text-sm transition-all duration-700 delay-300">
                <a href="#contatti" onClick={(e) => handleLinkClick(e, 'Contatti', '#contatti')} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-gf-green hover:border-gf-green group transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <MessageCircle className="text-gf-green group-hover:text-white transition-colors" size={28} />
                        <ArrowRight className="text-white/30 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <div className="font-bold text-white text-xl mb-1">Preventivo Noleggio</div>
                    <div className="text-gray-400 group-hover:text-white/80 text-sm">Quotazioni personalizzate in 24h</div>
                </a>
             </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
