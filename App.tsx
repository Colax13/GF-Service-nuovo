import React, { useState, useEffect } from 'react';
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
import ProjectDetail, { ProjectData } from './components/ProjectDetail';

type ViewState = 'home' | 'contact' | 'services' | 'projects' | 'blog' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Disable body scroll when a project is selected
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

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

  const handleNavigateHome = (href: string) => {
    setCurrentView('home');
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

  const handleProjectSelect = (project: ProjectData) => {
      setSelectedProject(project);
  };

  const handleProjectClose = () => {
      setSelectedProject(null);
  };

  const handleGoToProjects = () => {
      setSelectedProject(null);
      setCurrentView('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (currentView === 'contact') {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
              onNavigate={handleNavigateHome} 
              onShowContact={handleShowContact}
              onShowServices={handleShowAllServices}
              onShowProjects={handleShowAllProjects}
              onShowBlog={handleShowAllBlogPosts} 
              onShowAbout={handleShowAllAbout}
              forcedActive="Contatti" 
          />
          <div className="flex-grow">
            <Contact />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    if (currentView === 'services') {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
              onNavigate={handleNavigateHome} 
              onShowContact={handleShowContact}
              onShowServices={handleShowAllServices}
              onShowProjects={handleShowAllProjects}
              onShowBlog={handleShowAllBlogPosts} 
              onShowAbout={handleShowAllAbout}
              forcedActive="Servizi" 
          />
          <div className="flex-grow">
            <AllServices onShowContact={handleShowContact} />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    if (currentView === 'projects') {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
              onNavigate={handleNavigateHome} 
              onShowContact={handleShowContact}
              onShowServices={handleShowAllServices}
              onShowProjects={handleShowAllProjects}
              onShowBlog={handleShowAllBlogPosts} 
              onShowAbout={handleShowAllAbout}
              forcedActive="Progetti" 
          />
          <div className="flex-grow">
            <AllProjects onProjectSelect={handleProjectSelect} />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    if (currentView === 'blog') {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
              onNavigate={handleNavigateHome} 
              onShowContact={handleShowContact}
              onShowServices={handleShowAllServices}
              onShowProjects={handleShowAllProjects}
              onShowBlog={handleShowAllBlogPosts} 
              onShowAbout={handleShowAllAbout}
              forcedActive="Le nostre storie" 
          />
          <div className="flex-grow">
            <AllBlogPosts onShowContact={handleShowContact} />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    if (currentView === 'about') {
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar 
              onNavigate={handleNavigateHome} 
              onShowContact={handleShowContact}
              onShowServices={handleShowAllServices}
              onShowProjects={handleShowAllProjects}
              onShowBlog={handleShowAllBlogPosts} 
              onShowAbout={handleShowAllAbout}
              forcedActive="Chi siamo" 
          />
          <div className="flex-grow">
            <AllAbout onShowContact={handleShowContact} />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    return (
      <>
        <Navbar 
          onShowContact={handleShowContact}
          onShowServices={handleShowAllServices}
          onShowProjects={handleShowAllProjects}
          onShowBlog={handleShowAllBlogPosts} 
          onShowAbout={handleShowAllAbout}
        />
        <Hero onShowContact={handleShowContact} />
        <StickySocials />
        <About onShowAllAbout={handleShowAllAbout} />
        <Services onShowAllServices={handleShowAllServices} onShowContact={handleShowContact} />
        <Projects onShowAllProjects={handleShowAllProjects} onProjectSelect={handleProjectSelect} />
        <LogoScroll />
        <Values />
        <Blog onShowAllBlogPosts={handleShowAllBlogPosts} />
        <StreetFoodSection />
        <Contact simpleMode={true} />
        <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} />
      </>
    );
  };

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white bg-gf-darker min-h-screen">
      <CustomCursor />
      <div className={selectedProject ? "hidden" : "block"}>
        {renderContent()}
      </div>
      {selectedProject && <ProjectDetail project={selectedProject} onClose={handleProjectClose} onGoToProjects={handleGoToProjects} />}
    </div>
  );
};

export default App;