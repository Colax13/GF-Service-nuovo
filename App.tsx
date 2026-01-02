
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
import AllBlogPosts, { allPosts } from './components/AllBlogPosts';
import AllAbout from './components/AllAbout';
import Footer from './components/Footer';
import StickySocials from './components/StickySocials';
import CustomCursor from './components/CustomCursor';
import LogoScroll from './components/LogoScroll';
import ProjectDetail, { ProjectData } from './components/ProjectDetail';
import BlogPostDetail, { BlogPostData } from './components/BlogPostDetail';
import ScrollToTop from './components/ScrollToTop';

type ViewState = 'home' | 'contact' | 'services' | 'projects' | 'blog' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostData | null>(null);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

  // Disable body scroll when a project or blog post is selected
  useEffect(() => {
    if (selectedProject || selectedBlogPost) {
      document.body.style.overflow = 'hidden';
    } else {
      // If mobile form is NOT open, we allow scrolling. 
      // If mobile form IS open, Contact component handles the lock internally.
      // But to be safe, we check if mobileFormOpen is false here.
      if (!mobileFormOpen) {
         document.body.style.overflow = '';
      }
    }
    return () => {
       if (!mobileFormOpen) document.body.style.overflow = '';
    };
  }, [selectedProject, selectedBlogPost, mobileFormOpen]);

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
      // Reindirizza alla pagina "Il nostro portfolio" (projects) quando si chiude il dettaglio
      setCurrentView('projects');
      window.scrollTo(0, 0);
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
    if (selectedProject) return "Portfolio";
    if (selectedBlogPost) return "News";
    if (currentView === 'contact') return "Contatti";
    if (currentView === 'services') return "Servizi";
    if (currentView === 'projects') return "Portfolio";
    if (currentView === 'blog') return "News";
    if (currentView === 'about') return "Chi siamo";
    return undefined;
  };

  // Calcolo Next/Prev Post
  const getAdjacentPosts = () => {
    if (!selectedBlogPost) return { prev: null, next: null };
    const currentIndex = allPosts.findIndex(p => p.id === selectedBlogPost.id);
    if (currentIndex === -1) return { prev: null, next: null };

    // Prev è l'indice precedente (array index - 1), Next è il successivo
    const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prev, next };
  };

  const { prev: prevPost, next: nextPost } = getAdjacentPosts();


  const renderContent = () => {
    if (currentView === 'contact') {
      return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Contact onMobileFormToggle={setMobileFormOpen} />
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
                onShowProjects={handleShowAllProjects}
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
        <Contact onMobileFormToggle={setMobileFormOpen} />
        <Footer onShowContact={handleShowContact} onShowAbout={handleShowAllAbout} onNavigate={handleNavigateHome} />
      </>
    );
  };

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-gf-green selection:text-white bg-gf-darker min-h-screen">
      <CustomCursor />
      <ScrollToTop />
      
      <Navbar 
          onNavigate={handleNavigateHome} 
          onShowContact={handleShowContact}
          onShowServices={handleShowAllServices}
          onShowProjects={handleShowAllProjects}
          onShowBlog={handleShowAllBlogPosts} 
          onShowAbout={handleShowAllAbout}
          forcedActive={getForcedActive()}
          forceBackground={!!selectedProject || !!selectedBlogPost}
          isHidden={mobileFormOpen}
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
          prevPost={prevPost}
          nextPost={nextPost}
          onClose={handleBlogPostClose}
          onNavigate={handleBlogPostSelect}
          onShowContact={handleShowContact}
          onShowAbout={handleShowAllAbout}
          onNavigateToSection={handleNavigateHome}
        />
      )}
    </div>
  );
};

export default App;
