import type { Page } from '../types';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';


interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const links: { label: string; page: Page }[] = [
  { label: 'WORK', page: 'work' },
  { label: 'SERVICES', page: 'services' },
  { label: 'ABOUT', page: 'about' },
  { label: 'CAREERS', page: 'careers' },
  { label: 'CONTACT', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 22,
            color: '#fff',
            letterSpacing: '0.08em',
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          21:9
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.25em', color: '#8a8a8a', fontWeight: 400 }}>
            STUDIOS
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hidden-mobile">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.2em',
                color: currentPage === page ? '#fff' : '#8a8a8a',
                background: 'none',
                border: 'none',
                padding: '4px 0',
                borderBottom: currentPage === page ? '1px solid #3b82f6' : '1px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                if (currentPage !== page) (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                if (currentPage !== page) (e.currentTarget as HTMLButtonElement).style.color = '#8a8a8a';
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', padding: 8 }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile / fullscreen menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(5,5,5,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: 'fade-in 0.3s ease',
          }}
        >
          {links.map(({ label, page }, i) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                color: currentPage === page ? '#3b82f6' : '#fff',
                background: 'none',
                border: 'none',
                letterSpacing: '0.05em',
                opacity: 0,
                animation: `char-up 0.5s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#3b82f6'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = currentPage === page ? '#3b82f6' : '#fff'; }}
            >
              {label}
            </button>
          ))}

          <div style={{ marginTop: 40, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: '#8a8a8a' }}>
            CHENNAI, INDIA
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
