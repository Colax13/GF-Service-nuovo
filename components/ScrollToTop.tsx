
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ targetRef, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      let currentScroll = 0;
      
      if (targetRef?.current) {
         currentScroll = targetRef.current.scrollTop;
      } else {
         currentScroll = window.scrollY;
      }

      // Mostra il pulsante se lo scroll è maggiore di 300px
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Determina l'elemento su cui ascoltare lo scroll
    const element = targetRef?.current || window;

    // Aggiungi listener. Nota: per window è 'scroll', per elementi è uguale.
    // Usiamo una funzione wrapper per gestire i tipi corretti in TS se necessario, 
    // ma addEventListener funziona su entrambi EventTarget.
    if (targetRef?.current) {
        targetRef.current.addEventListener('scroll', toggleVisibility);
    } else {
        window.addEventListener('scroll', toggleVisibility);
    }

    // Check iniziale (utile se si apre una modale già scrollata o si ricarica la pagina)
    toggleVisibility();

    return () => {
        if (targetRef?.current) {
            targetRef.current.removeEventListener('scroll', toggleVisibility);
        } else {
            window.removeEventListener('scroll', toggleVisibility);
        }
    };
  }, [targetRef]);

  const scrollToTop = () => {
    if (targetRef?.current) {
        targetRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
  };

  return (
    <div 
        className={`fixed bottom-8 right-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'} ${className || 'z-[90]'}`}
    >
        <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-gf-green hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(0,112,90,0.4)] flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,112,90,0.6)]"
            aria-label="Torna a inizio pagina"
        >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
    </div>
  );
};

export default ScrollToTop;
