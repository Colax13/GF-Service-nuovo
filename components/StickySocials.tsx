import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const StickySocials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 hidden md:flex transition-all duration-500 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <a href="#" className="bg-gf-green text-white p-1.5 hover:bg-emerald-600 transition-colors rounded-l-md shadow-lg group">
        <MessageCircle size={18} />
      </a>
      <a href="#" className="bg-gf-green text-white p-1.5 hover:bg-emerald-600 transition-colors rounded-l-md shadow-lg">
        <Phone size={18} />
      </a>
      <a href="#" className="bg-gf-green text-white p-1.5 hover:bg-emerald-600 transition-colors rounded-l-md shadow-lg">
        <Mail size={18} />
      </a>
    </div>
  );
};

export default StickySocials;