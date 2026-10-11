import type { Page } from '../types';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const filters = ['ALL', 'FEATURE FILMS', 'OTT & SERIES', 'COMMERCIALS', 'MUSIC VIDEOS', 'CGI', 'EXPERIMENTAL'];

const allProjects = [
  { id: 1, title: 'THE LAST KINGDOM', cat: 'FEATURE FILMS', year: '2025', img: 'photo-1536440136628-849c177e76a1', services: 'VFX, Compositing' },
  { id: 2, title: 'PROJECT ECLIPSE', cat: 'CGI', year: '2025', img: 'photo-1451187580459-43490279c0fa', services: 'CGI, 3D Animation' },
  { id: 3, title: 'INTO THE VOID', cat: 'COMMERCIALS', year: '2024', img: 'photo-1518770660439-4636190af475', services: 'VFX, Motion Design' },
  { id: 4, title: 'THE FALLEN CITY', cat: 'OTT & SERIES', year: '2024', img: 'photo-1477959858617-67f85cf4f1df', services: 'Digital Environments' },
  { id: 5, title: 'NEON DREAMS', cat: 'MUSIC VIDEOS', year: '2024', img: 'photo-1545569341-9eb8b30979d9', services: 'CGI, Color' },
  { id: 6, title: 'SIGNAL', cat: 'EXPERIMENTAL', year: '2025', img: 'photo-1478720568477-152d9b164e26', services: 'VFX, Motion Design' },
  { id: 7, title: 'DARK MATTER', cat: 'OTT & SERIES', year: '2023', img: 'photo-1504701954957-2010ec3bcec1', services: 'VFX, Matchmove' },
  { id: 8, title: 'CHROME', cat: 'COMMERCIALS', year: '2024', img: 'photo-1536440136628-849c177e76a1', services: 'CGI, Compositing' },
];

interface Props { onNavigate: (page: Page) => void; }

export default function WorkPage({ onNavigate }: Props) {
  const [active, setActive] = useState('ALL');
  const [visible, setVisible] = useState(allProjects);

  useEffect(() => {
    setVisible(active === 'ALL' ? allProjects : allProjects.filter(p => p.cat === active));
  }, [active]);

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginBottom: 24 }}>
          PORTFOLIO
        </div>
        <h1 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 24 }}>
          OUR WORK
        </h1>
        <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#8a8a8a', maxWidth: 480, lineHeight: 1.7 }}>
          Stories transformed through imagination and technology.
        </p>
      </section>

      {/* Filters */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 6vw, 6rem)', borderBottom: '1px solid #1e1e1e', overflowX: 'auto' }} className="no-scrollbar">
        <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.2em',
                color: active === f ? '#050505' : '#8a8a8a',
                background: active === f ? '#fff' : 'transparent',
                border: '1px solid',
                borderColor: active === f ? '#fff' : '#1e1e1e',
                padding: '8px 18px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (active !== f) e.currentTarget.style.borderColor = '#8a8a8a'; }}
              onMouseLeave={e => { if (active !== f) e.currentTarget.style.borderColor = '#1e1e1e'; }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <div style={{ columns: 'clamp(280px, 40vw, 400px) 2', gap: 12, columnFill: 'balance' }}>
          {visible.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkCard({ project, index, onNavigate }: { project: typeof allProjects[0]; index: number; onNavigate: (p: Page) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="view"
      onClick={() => { onNavigate('project'); window.scrollTo({ top: 0 }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        breakInside: 'avoid',
        marginBottom: 12,
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
        aspectRatio: index % 3 === 0 ? '3/4' : '4/3',
      }}
    >
      <img
        src={`https://images.unsplash.com/${project.img}?w=700&h=600&fit=crop&auto=format`}
        alt={project.title}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.4s',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          filter: hovered ? 'brightness(0.3)' : 'brightness(0.6)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0, padding: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: hovered ? 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)' : 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 70%)',
        transition: 'background 0.3s',
      }}>
        <div style={{ transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#3b82f6', marginBottom: 6 }}>{project.cat} — {project.year}</div>
          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#fff', letterSpacing: '0.02em' }}>{project.title}</div>
          {hovered && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#8a8a8a' }}>
              {project.services} <ArrowRight size={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
