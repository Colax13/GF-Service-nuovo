
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
import LogoScroll from './components/LogoScroll';
import ProjectDetail, { ProjectData } from './components/ProjectDetail';
import BlogPostDetail, { BlogPostData } from './components/BlogPostDetail';

type ViewState = 'home' | 'contact' | 'services' | 'projects' | 'blog' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostData | null>(null);

  // Disable body scroll when a project or blog post is selected
  useEffect(() => {
    if (selectedProject || selectedBlogPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, selectedBlogPost]);

  const handleShowContact = () => {
    setSelectedProject(null);
    setSelectedBlogPost(null);
    setCurrentView('contact');
    window.scrollTo(0, 0);
  };

  const handleShowAllServices = () => {
    setSelectedProject(null);
    setSelectedBlogPost(null);
    setCurrentView('services');
    window.scrollTo(0, 0);
  };

  const handleShowAllProjects = () => {
    setSelectedProject(null);
    setSelectedBlogPost(null);
    setCurrentView('projects');
    window.scrollTo(0, 0);
  };

  const handleShowAllBlogPosts = () => {
    setSelectedProject(null);
    setSelectedBlogPost(null); // Chiude l'articolo se aperto
    setCurrentView('blog');
    window.scrollTo(0, 0);
  };

  const handleShowAllAbout = () => {
    setSelectedProject(null);
    setSelectedBlogPost(null);
    setCurrentView('about');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = (href: string) => {
    setSelectedProject(null);
    setSelectedBlogPost(null);
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

  const handleBlogPostSelect = (post: BlogPostData) => {
      setSelectedBlogPost(post);
  };

  const handleBlogPostClose = () => {
      setSelectedBlogPost(null);
  };

  // Determina quale voce della navbar deve essere attiva
  const getForcedActive = () => {
    if (selectedProject) return "Progetti";
    if (selectedBlogPost) return "Le nostre storie";
    if (currentView === 'contact') return "Contatti";
    if (currentView === 'services') return "Servizi";
    if (currentView === 'projects') return "Progetti";
    if (currentView === 'blog') return "Le nostre storie";
    if (currentView === 'about') return "Chi siamo";
    return undefined;
  };

  const renderContent = () => {
    if (currentView === 'contact') {
      return (
        <div className="flex flex-col min-h-screen">
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
          <div className="flex-grow">
            <AllBlogPosts 
                onShowContact={handleShowContact} 
                onPostSelect={handleBlogPostSelect}
            />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    if (currentView === 'about') {
      return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <AllAbout onShowContact={handleShowContact} />
          </div>
          <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
        </div>
      );
    }

    return (
      <>
        <Hero onShowContact={handleShowContact} />
        <StickySocials />
        <About onShowAllAbout={handleShowAllAbout} />
        <Services onShowAllServices={handleShowAllServices} onShowContact={handleShowContact} />
        <Projects onShowAllProjects={handleShowAllProjects} onProjectSelect={handleProjectSelect} />
        <LogoScroll />
        <Values onShowAbout={handleShowAllAbout} />
        <Blog onShowAllBlogPosts={handleShowAllBlogPosts} />
        <Contact />
        <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
      </>
    );
  };

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white bg-gf-darker min-h-screen">
      <CustomCursor />
      
      <Navbar 
          onNavigate={handleNavigateHome} 
          onShowContact={handleShowContact}
          onShowServices={handleShowAllServices}
          onShowProjects={handleShowAllProjects}
          onShowBlog={handleShowAllBlogPosts} 
          onShowAbout={handleShowAllAbout}
          forcedActive={getForcedActive()}
          forceBackground={!!selectedProject || !!selectedBlogPost}
      />

      <div className={(selectedProject || selectedBlogPost) ? "hidden" : "block"}>
        {renderContent()}
      </div>
      
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={handleProjectClose} 
          onGoToProjects={handleGoToProjects} 
        />
      )}

      {selectedBlogPost && (
        <BlogPostDetail
          post={selectedBlogPost}
          onClose={handleBlogPostClose}
        />
      )}
    </div>
  );
};

export default App;
