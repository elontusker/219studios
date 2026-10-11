import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import type { Page } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setTransitioning(false);
    }, 250);
  };

  const pageMap: Record<Page, React.ReactNode> = {
    home: <HomePage onNavigate={navigate} />,
    work: <WorkPage onNavigate={navigate} />,
    project: <ProjectPage onNavigate={navigate} />,
    services: <ServicesPage onNavigate={navigate} />,
    about: <AboutPage />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Custom cursor — desktop only */}
      {!isMobile && <CustomCursor />}

      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* App */}
      {!loading && (
        <>
          <Navbar currentPage={currentPage} onNavigate={navigate} />
          <main
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            {pageMap[currentPage]}
          </main>
        </>
      )}
    </>
  );
}
