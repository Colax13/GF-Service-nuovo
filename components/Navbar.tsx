import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onBackToHome?: () => void; // Renders the specialized "Back" header
  onShowContact?: () => void;
  onShowServices?: () => void;
  onShowProjects?: () => void;
  onShowBlog?: () => void;
  onNavigate?: (href: string) => void; // Renders standard header but intercepts clicks
  forcedActive?: string; // Force a specific link to be active (e.g., for sub-pages)
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
  onNavigate, 
  forcedActive 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(forcedActive || 'Home');

  useEffect(() => {
    // If we have a forced active section (e.g. we are on the Contact page),
    // we set it and only monitor scroll for the background style, not for spy logic.
    if (forcedActive) {
      setActiveSection(forcedActive);
      
      const handleScrollBg = () => {
        setScrolled(window.scrollY > 50);
      };
      
      // Check initially
      handleScrollBg();
      
      window.addEventListener('scroll', handleScrollBg);
      return () => window.removeEventListener('scroll', handleScrollBg);
    }

    // Standard Home Page Logic (Scroll Spy)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 100) {
        setActiveSection('Home');
        return;
      }

      for (const link of navLinks) {
        if (link.href === '#' || !link.href.startsWith('#')) continue;
        
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.name);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forcedActive]);

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

    // Specific Page Handlers
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
    
    // Priority 1: Navigation Override (for sub-pages going back to home anchors)
    if (onNavigate) {
        onNavigate(href);
        setMobileMenuOpen(false);
        return;
    }

    // Priority 2: Standard Anchor Navigation (Home View)
    setMobileMenuOpen(false);
    
    // Manual scroll handling for smooth behavior
    if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || onBackToHome ? 'bg-gf-darker/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-white relative z-50">
          
          {/* Left: Back Button or Standard Links */}
          {onBackToHome ? (
             <button 
                onClick={onBackToHome}
                className="flex items-center gap-2 text-white hover:text-gf-green transition-colors text-sm font-bold uppercase tracking-widest"
             >
                <ArrowLeft size={18} /> Torna alla Home
             </button>
          ) : (
            <div className="hidden lg:flex gap-4 text-[13px] font-medium tracking-wide">
                {navLinks.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.name, link.href)}
                    className={`relative group transition-opacity duration-300 cursor-pointer ${activeSection === link.name ? 'text-white opacity-100' : 'text-white opacity-65 hover:opacity-100'}`}
                >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-white transform transition-transform duration-300 origin-left ${activeSection === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
                ))}
            </div>
          )}

          {/* Center: Logo */}
          <div 
            className="flex flex-col items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 cursor-pointer group leading-none"
            onClick={() => onNavigate ? onNavigate('#hero') : document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          >
             {/* Logo Icon */}
             <div className="relative w-12 h-8 mb-0.5">
                 <svg viewBox="0 0 100 60" className="w-full h-full stroke-white fill-none stroke-[8] stroke-linecap-round stroke-linejoin-round group-hover:stroke-gf-green transition-colors duration-300">
                    {/* G */}
                    <path d="M 40 10 A 20 20 0 1 0 40 50 H 50 V 30 H 40" />
                    {/* F */}
                    <path d="M 70 10 H 90 M 70 10 V 50 M 70 30 H 85" />
                 </svg>
             </div>
             {/* Text */}
             <span className="text-[10px] font-bold tracking-[0.4em] text-white group-hover:text-gf-green transition-colors duration-300 uppercase">
                Service
             </span>
          </div>

          {/* Right: Icons (Desktop) */}
          <div className="hidden lg:flex gap-6 items-center">
               <MessageCircle size={20} className="cursor-pointer hover:text-gf-green transition-colors" />
               <Phone size={20} className="cursor-pointer hover:text-gf-green transition-colors" />
               <Mail size={20} className="cursor-pointer hover:text-gf-green transition-colors" />
          </div>

          {/* Mobile Toggle Button (Hamburger) */}
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

      {/* Modern Full Screen Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-gf-darker/98 backdrop-blur-xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
          {/* Header Bar inside Menu */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center border-b border-white/5">
             <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase">Menu</span>
             
             {/* The Close "X" Button */}
             <button 
               onClick={() => setMobileMenuOpen(false)}
               className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-gf-green transition-all duration-300 hover:bg-white/5"
               aria-label="Close menu"
             >
                <X size={24} className="text-white group-hover:text-gf-green group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>

          {/* Main Content Container */}
          <div className="h-full flex flex-col justify-between pt-24 pb-8 px-8 overflow-y-auto">
             
             {/* Navigation Links */}
             <div className="flex flex-col gap-6">
                {onBackToHome ? (
                    <button 
                        onClick={() => {
                            setMobileMenuOpen(false);
                            onBackToHome();
                        }}
                        className="group flex items-center justify-between text-3xl md:text-4xl font-light text-white hover:text-gf-green transition-colors py-2 border-b border-white/5 hover:border-gf-green/30"
                    >
                         <span className="flex items-baseline gap-4">Torna alla Home</span>
                         <ArrowLeft size={20} className="text-gf-green" />
                    </button>
                ) : (
                    navLinks.map((link, idx) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.name, link.href)}
                            className={`group flex items-center justify-between text-3xl md:text-4xl font-light transition-colors py-2 border-b border-white/5 hover:border-gf-green/30 cursor-pointer ${activeSection === link.name ? 'text-white' : 'text-white/60 hover:text-white'}`}
                            style={{ 
                                transitionDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms',
                                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: mobileMenuOpen ? 1 : 0,
                                transition: 'all 0.5s ease-out'
                            }}
                        >
                            <span className="flex items-baseline gap-4">
                                <span className={`text-xs font-mono transition-all duration-300 transform ${activeSection === link.name ? 'text-gf-green opacity-100 translate-x-0' : 'text-gf-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                                    0{idx + 1}
                                </span>
                                {link.name}
                            </span>
                            <ArrowRight size={20} className={`transition-all duration-300 text-gf-green ${activeSection === link.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </a>
                    ))
                )}
             </div>

             {/* Footer Info Section */}
             <div 
                className="mt-12 grid grid-cols-1 gap-8 text-sm transition-all duration-700 delay-300"
                style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
             >
                {/* Contact CTA */}
                <a 
                    href="#contatti"
                    onClick={(e) => handleLinkClick(e, 'Contatti', '#contatti')}
                    className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-gf-green hover:border-gf-green group transition-all duration-300 cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-2">
                        <MessageCircle className="text-gf-green group-hover:text-white transition-colors" size={24} />
                        <ArrowRight className="text-white/30 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div className="font-bold text-white text-lg mb-1">Richiedi Preventivo</div>
                    <div className="text-gray-400 group-hover:text-white/80 text-xs">Risposta garantita in 24h</div>
                </a>

                {/* Quick Details */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                    <div>
                        <h4 className="text-gf-green font-bold uppercase text-xs tracking-wider mb-3">Contatti</h4>
                        <div className="flex flex-col gap-2 text-gray-400">
                            <a href="mailto:info@gfservice.it" className="hover:text-white transition-colors">info@gfservice.it</a>
                            <a href="tel:+393331234567" className="hover:text-white transition-colors">+39 333 123 4567</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-gf-green font-bold uppercase text-xs tracking-wider mb-3">Sede</h4>
                        <div className="flex flex-col gap-2 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">
                                Via Marte, 105<br/>Frosinone (FR)
                            </a>
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;