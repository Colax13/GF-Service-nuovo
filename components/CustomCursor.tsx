import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for position to avoid re-renders on mouse move
  const mouse = useRef({ x: -100, y: -100 });
  const follower = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant update for the dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const isInteractive = 
        target.matches('a, button, input, select, textarea, [role="button"]') ||
        target.closest('a, button, input, select, textarea, [role="button"]') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation Loop for the smooth follower
    let rafId: number;
    const animate = () => {
      // Linear Interpolation (Lerp) for smooth trailing effect
      // speed = 0.15 for a modern fluid feel
      follower.current.x += (mouse.current.x - follower.current.x) * 0.15;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.15;

      if (followerRef.current) {
         followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Hide default cursor globally on non-touch devices
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.innerHTML = `
      @media (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) existingStyle.remove();
    };
  }, [isVisible]);

  return (
    <>
      {/* Main Dot Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block transition-opacity duration-300 mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      
      {/* Trailing Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full border border-white pointer-events-none z-[9998] hidden md:block transition-all duration-300 ease-out mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering 
            ? 'w-14 h-14 bg-white/20 border-white/80' 
            : 'w-8 h-8 opacity-50'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;