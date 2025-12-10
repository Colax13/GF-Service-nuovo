import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Values from './components/Values';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AllServices from './components/AllServices';
import AllProjects from './components/AllProjects';
import AllBlogPosts from './components/AllBlogPosts';
import AllAbout from './components/AllAbout';
import Footer from './components/Footer';
import StickySocials from './components/StickySocials';
import CustomCursor from './components/CustomCursor';
import StreetFoodSection from './components/StreetFoodSection';
import LogoScroll from './components/LogoScroll';

type ViewState = 'home' | 'contact' | 'services' | 'projects' | 'blog' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleShowContact = () => {
    setCurrentView('contact');
    window.scrollTo(0, 0);
  };

  const handleShowAllServices = () => {
    setCurrentView('services');
    window.scrollTo(0, 0);
  };

  const handleShowAllProjects = () => {
    setCurrentView('projects');
    window.scrollTo(0, 0);
  };

  const handleShowAllBlogPosts = () => {
    setCurrentView('blog');
    window.scrollTo(0, 0);
  };

  const handleShowAllAbout = () => {
    setCurrentView('about');
    window.scrollTo(0, 0);
  };

  // Used for standard navbar navigation from sub-pages
  const handleNavigateHome = (href: string) => {
    setCurrentView('home');
    // Allow time for render before scrolling
    setTimeout(() => {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollTo(0, 0);
        }
    }, 100);
  };

  // Render Full Screen Contact View
  if (currentView === 'contact') {
    return (
      <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white min-h-screen bg-gf-darker flex flex-col">
        <CustomCursor />
        {/* Render Navbar with Standard Header, force active state on Contatti */}
        <Navbar 
            onNavigate={handleNavigateHome} 
            onShowContact={handleShowContact}
            onShowServices={handleShowAllServices}
            onShowProjects={handleShowAllProjects}
            onShowBlog={handleShowAllBlogPosts} 
            forcedActive="Contatti" 
        />
        {/* Render only Contact component in full mode (default) */}
        <div className="flex-grow">
          <Contact />
        </div>
        <Footer onShowContact={handleShowContact} onNavigate={handleNavigateHome} />
      </div>
    );
  }

  // Render Full Screen All Services View
  if (currentView === 'services') {
    return (
      <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white min-h-screen bg-gf-darker flex flex-col">
        <CustomCursor />
        {/* Render Navbar with Standard Header, force active state on Servizi */}
        <Navbar 
            onNavigate={handleNavigateHome} 
            onShowContact={handleShowContact}
            onShowServices={handleShowAllServices}
            onShowProjects={handleShowAllProjects}
            onShowBlog={handleShowAllBlogPosts} 
            forcedActive="Servizi" 
        />
        <div className="flex-grow">
          <AllServices onShowContact={handleShowContact} />
        </div>
        <Footer onShowContact={handleShowContact} onNavigate={handleNavigateHome} />
      </div>
    );
  }

  // Render Full Screen All Projects View
  if (currentView === 'projects') {
    return (
      <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white min-h-screen bg-gf-darker flex flex-col">
        <CustomCursor />
        {/* Render Navbar with Standard Header, force active state on Progetti */}
        <Navbar 
            onNavigate={handleNavigateHome} 
            onShowContact={handleShowContact}
            onShowServices={handleShowAllServices}
            onShowProjects={handleShowAllProjects}
            onShowBlog={handleShowAllBlogPosts} 
            forcedActive="Progetti" 
        />
        <div className="flex-grow">
          <AllProjects onShowContact={handleShowContact} />
        </div>
        <Footer onShowContact={handleShowContact} onNavigate={handleNavigateHome} />
      </div>
    );
  }

  // Render Full Screen All Blog Posts View
  if (currentView === 'blog') {
    return (
      <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white min-h-screen bg-gf-darker flex flex-col">
        <CustomCursor />
        {/* Render Navbar with Standard Header, force active state on Blog */}
        <Navbar 
            onNavigate={handleNavigateHome} 
            onShowContact={handleShowContact}
            onShowServices={handleShowAllServices}
            onShowProjects={handleShowAllProjects}
            onShowBlog={handleShowAllBlogPosts} 
            forcedActive="Le nostre storie" 
        />
        <div className="flex-grow">
          <AllBlogPosts onShowContact={handleShowContact} />
        </div>
        <Footer onShowContact={handleShowContact} onNavigate={handleNavigateHome} />
      </div>
    );
  }

  // Render Full Screen All About View
  if (currentView === 'about') {
    return (
      <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white min-h-screen bg-gf-darker flex flex-col">
        <CustomCursor />
        {/* Render Navbar with Standard Header, force active state on Chi siamo */}
        <Navbar 
            onNavigate={handleNavigateHome} 
            onShowContact={handleShowContact}
            onShowServices={handleShowAllServices}
            onShowProjects={handleShowAllProjects}
            onShowBlog={handleShowAllBlogPosts} 
            forcedActive="Chi siamo" 
        />
        <div className="flex-grow">
          <AllAbout onShowContact={handleShowContact} />
        </div>
        <Footer onShowContact={handleShowContact} onNavigate={handleNavigateHome} />
      </div>
    );
  }

  // Render Default Home View
  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white">
      <CustomCursor />
      {/* Home Navbar uses default anchor navigation */}
      <Navbar 
        onShowContact={handleShowContact}
        onShowServices={handleShowAllServices}
        onShowProjects={handleShowAllProjects}
        onShowBlog={handleShowAllBlogPosts} 
      />
      <Hero onShowContact={handleShowContact} />
      <StickySocials />
      <About onShowAllAbout={handleShowAllAbout} />
      <Services onShowAllServices={handleShowAllServices} onShowContact={handleShowContact} />
      <Projects onShowAllProjects={handleShowAllProjects} />
      <LogoScroll />
      <Values />
      <Blog onShowAllBlogPosts={handleShowAllBlogPosts} />
      <StreetFoodSection />
      {/* Home page Contact section is now in 'simpleMode' - showing only normal form */}
      <Contact simpleMode={true} />
      <Footer onShowContact={handleShowContact} />
    </div>
  );
};

export default App;