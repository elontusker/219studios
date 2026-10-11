import type { Page } from '../types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Play, X, ChevronDown } from 'lucide-react';

interface Props {
  onNavigate: (page: Page) => void;
}

/* ---------- HOOK: scroll reveal ---------- */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ---------- SECTION: Hero ---------- */
function HeroSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const grad = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.4, 0, canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.7);
      grad.addColorStop(0, 'rgba(30,50,100,0.15)');
      grad.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      // Connection lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.05 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const words = ['WE CREATE', 'THE IMPOSSIBLE.'];

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Canvas BG */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

      {/* Cinematic overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.1) 50%, rgba(5,5,5,0.8) 100%)', zIndex: 1 }} />

      {/* Cinematic bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 70, background: '#050505', zIndex: 2, transform: loaded ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top', transition: 'transform 1.2s 1s cubic-bezier(0.77,0,0.175,1)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: '#050505', zIndex: 2, transform: loaded ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform 1.2s 1s cubic-bezier(0.77,0,0.175,1)' }} />

      {/* Hero image overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop&auto=format"
          alt="Cinematic visual"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, scale: loaded ? '1.05' : '1.15', transition: 'opacity 1.5s 0.5s ease, scale 6s ease' }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, padding: '0 clamp(1.5rem, 6vw, 6rem)', paddingTop: 72 }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.35em',
          color: '#3b82f6',
          marginBottom: 32,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s 1.2s ease, transform 0.8s 1.2s ease',
        }}>
          VISUAL EFFECTS STUDIO — CHENNAI, INDIA
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(4rem, 12vw, 13rem)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          color: '#fff',
          marginBottom: 32,
        }}>
          {words.map((word, wi) => (
            <div key={wi} style={{ overflow: 'hidden' }}>
              <div style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(100%)',
                transition: `opacity 0.9s ${1.3 + wi * 0.15}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${1.3 + wi * 0.15}s cubic-bezier(0.16,1,0.3,1)`,
              }}>
                {word}
              </div>
            </div>
          ))}
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          color: '#8a8a8a',
          maxWidth: 540,
          lineHeight: 1.7,
          marginBottom: 48,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s 1.8s ease, transform 0.8s 1.8s ease',
        }}>
          21:9 Studios is a visual effects and creative technology studio crafting extraordinary worlds for film, television, advertising and digital experiences.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s 2s ease, transform 0.8s 2s ease',
        }}>
          <button
            onClick={() => onNavigate('work')}
            data-cursor="open"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#050505',
              background: '#fff',
              border: 'none',
              padding: '16px 32px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            EXPLORE OUR WORK
          </button>
          <button
            data-cursor="play"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#fff',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            <Play size={12} fill="#fff" /> WATCH SHOWREEL
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s 2.5s ease',
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a' }}>SCROLL TO ENTER</span>
        <ChevronDown size={14} color="#8a8a8a" style={{ animation: 'float 2s ease-in-out infinite' }} />
      </div>

      {/* Aspect ratio label */}
      <div style={{
        position: 'absolute',
        bottom: 90,
        right: 'clamp(1.5rem, 4vw, 3rem)',
        zIndex: 3,
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.2em',
        color: '#333',
        writingMode: 'vertical-rl',
      }}>
        21:9 ASPECT RATIO
      </div>
    </section>
  );
}

/* ---------- SECTION: Intro ---------- */
function IntroSection() {
  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100 }}>
        <h2 className="scroll-reveal" style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
          lineHeight: 1.05,
          letterSpacing: '0.02em',
          color: '#fff',
          marginBottom: 40,
        }}>
          WE DON'T JUST CREATE<br />VISUAL EFFECTS.<br />
          <span style={{ color: '#8a8a8a' }}>WE CREATE WORLDS.</span>
        </h2>

        <div className="scroll-reveal" style={{
          width: '100%',
          height: 1,
          background: 'linear-gradient(to right, #3b82f6, transparent)',
          marginBottom: 40,
          transformOrigin: 'left',
        }} />

        <p className="scroll-reveal" style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: '#8a8a8a',
          lineHeight: 1.8,
          maxWidth: 680,
        }}>
          From invisible visual effects to impossible environments, our artists combine creativity, technology and storytelling to transform imagination into unforgettable cinematic experiences.
        </p>
      </div>

      {/* Abstract geometric decoration */}
      <div style={{
        position: 'absolute',
        right: 'clamp(2rem, 8vw, 8rem)',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.04,
        fontSize: 'clamp(8rem, 20vw, 20rem)',
        fontFamily: "'Anton', sans-serif",
        lineHeight: 1,
        color: '#fff',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        21:9
      </div>
    </section>
  );
}

/* ---------- SECTION: Showreel ---------- */
function ShowreelSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section style={{ background: '#050505', padding: '0 0 clamp(5rem, 10vw, 8rem)', position: 'relative' }}>
      <div
        data-cursor="play"
        onClick={() => setShowModal(true)}
        style={{
          position: 'relative',
          cursor: 'none',
          overflow: 'hidden',
          aspectRatio: '21/9',
          maxHeight: '70vh',
          background: '#0a0a0a',
        }}
        onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.05)'; }}
        onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
      >
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=820&fit=crop&auto=format"
          alt="Showreel"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}>
            <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: 4 }} />
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#fff' }}>PLAY SHOWREEL</span>
        </div>

        {/* Side labels */}
        <div style={{ position: 'absolute', left: 'clamp(1.5rem, 4vw, 3rem)', bottom: 32, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#8a8a8a' }}>
          21:9 STUDIOS — 2026 SHOWREEL
        </div>
        <div style={{ position: 'absolute', right: 'clamp(1.5rem, 4vw, 3rem)', bottom: 32, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#8a8a8a' }}>
          3:47
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 5000,
            background: 'rgba(5,5,5,0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: 'absolute', top: 24, right: 24,
              background: 'none', border: 'none', color: '#fff', padding: 8,
            }}
          >
            <X size={24} />
          </button>
          <div style={{ width: 'min(900px, 90vw)', textAlign: 'center', color: '#8a8a8a', fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.1em' }}>
            <div style={{ aspectRatio: '16/9', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e1e1e' }}>
              SHOWREEL PLACEHOLDER
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- SECTION: Featured Work ---------- */
const projects = [
  { id: 1, title: 'THE LAST KINGDOM', cat: 'Feature Film | VFX', year: '2025', img: 'photo-1536440136628-849c177e76a1', size: 'large' },
  { id: 2, title: 'PROJECT ECLIPSE', cat: 'Sci-Fi | CGI', year: '2025', img: 'photo-1451187580459-43490279c0fa', size: 'small' },
  { id: 3, title: 'INTO THE VOID', cat: 'Commercial | CGI', year: '2024', img: 'photo-1518770660439-4636190af475', size: 'small' },
  { id: 4, title: 'THE FALLEN CITY', cat: 'Environment | VFX', year: '2024', img: 'photo-1477959858617-67f85cf4f1df', size: 'wide' },
  { id: 5, title: 'NEON DREAMS', cat: 'Music Video | CGI', year: '2024', img: 'photo-1545569341-9eb8b30979d9', size: 'large' },
];

function FeaturedWorkSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff' }}>
          SELECTED WORKS
        </h2>
        <button
          onClick={() => { onNavigate('work'); window.scrollTo({ top: 0 }); }}
          data-cursor="open"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: '#8a8a8a', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8a8a8a'; }}
        >
          VIEW ALL WORK <ArrowRight size={14} />
        </button>
      </div>

      {/* Editorial grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
        {/* Large */}
        <ProjectCard project={projects[0]} onNavigate={onNavigate} colSpan="span 7" rowSpan="360px" />
        {/* Stack */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ProjectCard project={projects[1]} onNavigate={onNavigate} colSpan="span 12" rowSpan="172px" />
          <ProjectCard project={projects[2]} onNavigate={onNavigate} colSpan="span 12" rowSpan="172px" />
        </div>
        {/* Wide */}
        <ProjectCard project={projects[3]} onNavigate={onNavigate} colSpan="span 5" rowSpan="300px" />
        {/* Large */}
        <ProjectCard project={projects[4]} onNavigate={onNavigate} colSpan="span 7" rowSpan="300px" />
      </div>
    </section>
  );
}

function ProjectCard({ project, onNavigate, colSpan, rowSpan }: {
  project: typeof projects[0]; onNavigate: (p: Page) => void; colSpan: string; rowSpan: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-cursor="view"
      onClick={() => { onNavigate('project'); window.scrollTo({ top: 0 }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-reveal"
      style={{
        gridColumn: colSpan,
        height: rowSpan,
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <img
        src={`https://images.unsplash.com/${project.img}?w=800&h=600&fit=crop&auto=format`}
        alt={project.title}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          filter: hovered ? 'brightness(0.35)' : 'brightness(0.6)',
        }}
      />
      {/* Info overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 24,
        background: hovered ? 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)' : 'linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 70%)',
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#3b82f6', marginBottom: 6 }}>
            {project.cat}
          </div>
          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', letterSpacing: '0.02em', color: '#fff' }}>
            {project.title}
          </div>
          {hovered && (
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#8a8a8a', marginTop: 4, letterSpacing: '0.1em' }}>
              {project.year}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION: VFX Breakdown ---------- */
function VFXBreakdownSection() {
  const [dividerX, setDividerX] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    setDividerX(pct);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    setDividerX(pct);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', () => { isDragging.current = false; });
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', () => { isDragging.current = false; });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [onMouseMove, onTouchMove]);

  return (
    <section style={{ background: '#0a0a0a', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap', gap: 16 }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff' }}>
          BEHIND THE MAGIC
        </h2>
        <div className="scroll-reveal" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#8a8a8a' }}>
          DRAG TO REVEAL
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ position: 'relative', overflow: 'hidden', aspectRatio: '21/9', maxHeight: '55vh', background: '#050505', userSelect: 'none' }}
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        {/* Plate (left) */}
        <img
          src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&h=820&fit=crop&auto=format"
          alt="Plate"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.6)' }}
        />

        {/* VFX (right revealed via clip) */}
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${dividerX}%)` }}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=820&fit=crop&auto=format"
            alt="Final VFX shot"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
        </div>

        {/* Divider line */}
        <div
          className="vfx-slider-handle"
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${dividerX}%`,
            width: 2,
            background: '#fff',
            transform: 'translateX(-50%)',
            zIndex: 10,
            boxShadow: '0 0 12px rgba(255,255,255,0.5)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: '#050505', letterSpacing: '-0.05em' }}>◁▷</span>
          </div>
        </div>

        {/* Labels */}
        <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#fff', background: 'rgba(5,5,5,0.7)', padding: '4px 10px', backdropFilter: 'blur(8px)' }}>
          PLATE
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#fff', background: 'rgba(59,130,246,0.3)', padding: '4px 10px', backdropFilter: 'blur(8px)' }}>
          FINAL SHOT
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION: Services ---------- */
const services = [
  { num: '01', title: 'VISUAL EFFECTS', desc: 'From invisible enhancements to spectacular destruction, we create seamless visual effects that elevate storytelling.', img: 'photo-1536440136628-849c177e76a1' },
  { num: '02', title: 'CGI & 3D', desc: 'Photorealistic CGI and 3D animation that blurs the line between the real and the impossible.', img: 'photo-1451187580459-43490279c0fa' },
  { num: '03', title: 'COMPOSITING', desc: 'Precision compositing that seamlessly integrates every element into a cohesive, breathtaking whole.', img: 'photo-1518770660439-4636190af475' },
  { num: '04', title: 'ROTO & PAINT', desc: 'Frame-perfect rotoscopy and digital paint work by artists who understand that details make the difference.', img: 'photo-1477959858617-67f85cf4f1df' },
  { num: '05', title: 'MATCHMOVE', desc: 'Expert camera tracking and matchmoving that grounds every digital element in believable reality.', img: 'photo-1545569341-9eb8b30979d9' },
  { num: '06', title: 'DIGITAL ENVIRONMENTS', desc: 'Vast, fully realized digital worlds — from ancient kingdoms to alien landscapes and futuristic cities.', img: 'photo-1536440136628-849c177e76a1' },
  { num: '07', title: 'MOTION DESIGN', desc: 'Dynamic motion graphics and design that communicate with clarity, style and cinematic impact.', img: 'photo-1451187580459-43490279c0fa' },
  { num: '08', title: 'VIRTUAL PRODUCTION', desc: 'Cutting-edge Unreal Engine virtual production workflows that accelerate creativity on set.', img: 'photo-1518770660439-4636190af475' },
];

function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)' }}>
      <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 60 }}>
        WHAT WE DO
      </h2>

      <div style={{ borderTop: '1px solid #1e1e1e' }}>
        {services.map((svc, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            data-cursor="open"
            style={{
              borderBottom: '1px solid #1e1e1e',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Row header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(1rem, 2.5vw, 1.5rem) 0',
              gap: 20,
              cursor: 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(1rem, 3vw, 3rem)' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#3b82f6', letterSpacing: '0.1em', minWidth: 28 }}>{svc.num}</span>
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(1.4rem, 4vw, 3.2rem)',
                  letterSpacing: '0.02em',
                  color: active === i ? '#fff' : '#8a8a8a',
                  transition: 'color 0.3s, font-size 0.3s',
                  lineHeight: 1,
                }}>
                  {svc.title}
                </span>
              </div>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 16,
                color: '#8a8a8a',
                transform: active === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s, color 0.3s',
                flexShrink: 0,
              }}>+</span>
            </div>

            {/* Expanded content */}
            <div style={{
              maxHeight: active === i ? '300px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, paddingBottom: 40, alignItems: 'start' }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: '#8a8a8a', lineHeight: 1.8, maxWidth: 560 }}>
                  {svc.desc}
                </p>
                <div style={{ width: 'clamp(120px, 18vw, 200px)', height: 'clamp(70px, 10vw, 110px)', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={`https://images.unsplash.com/${svc.img}?w=400&h=220&fit=crop&auto=format`}
                    alt={svc.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SECTION: Stats ---------- */
const stats = [
  { value: 100, suffix: '+', label: 'PROJECTS' },
  { value: 50, suffix: '+', label: 'ARTISTS' },
  { value: 10, suffix: '+', label: 'INDUSTRIES' },
  { value: '∞', suffix: '', label: 'POSSIBILITIES' },
];

function StatsSection() {
  const [counted, setCounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCounted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#0a0a0a', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      {/* BG decoration */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(2rem, 6vw, 4rem)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            opacity: counted ? 1 : 0,
            transform: counted ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.8s ${i * 0.15}s ease, transform 0.8s ${i * 0.15}s ease`,
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1 }}>
              {s.value}{s.suffix}
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SECTION: Process ---------- */
const steps = [
  { num: '01', title: 'CONCEPT', desc: 'We align creative vision, technical requirements, and production strategy.' },
  { num: '02', title: 'PREVIS', desc: 'Story reels, animatics and technical previz establish the visual language.' },
  { num: '03', title: 'PRODUCTION', desc: 'Our artists execute with precision, craft, and relentless attention to detail.' },
  { num: '04', title: 'POST', desc: 'Compositing, color and finishing transform raw elements into cinematic reality.' },
  { num: '05', title: 'FINAL FRAME', desc: 'Delivery of final assets, DCP-ready outputs and client approval.' },
];

function ProcessSection() {
  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)', overflow: 'hidden' }}>
      <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 16 }}>
        FROM IDEA
      </h2>
      <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#8a8a8a', marginBottom: 60 }}>
        TO IMPOSSIBLE.
      </h2>

      <div style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', overflowX: 'auto', paddingBottom: 20 }} className="no-scrollbar">
        {steps.map((s, i) => (
          <div key={i} className="scroll-reveal" style={{ minWidth: 'clamp(200px, 28vw, 280px)', flexShrink: 0, borderTop: '1px solid #1e1e1e', paddingTop: 32 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#3b82f6', letterSpacing: '0.2em', marginBottom: 20 }}>{s.num}</div>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>{s.title}</div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: '#8a8a8a', lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SECTION: Marquee ---------- */
const clients = ['NETFLIX', 'AMAZON PRIME', 'SONY PICTURES', 'WARNER BROS', 'DISNEY', 'HBO', 'APPLE TV+', 'PARAMOUNT', 'UNIVERSAL', 'A24'];

function MarqueeSection() {
  const doubled = [...clients, ...clients];
  return (
    <section style={{ background: '#0a0a0a', padding: 'clamp(4rem, 8vw, 6rem) 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '0.02em', color: '#fff' }}>
          TRUSTED BY CREATORS.
        </h3>
      </div>

      {/* Row 1: left */}
      <div style={{ overflow: 'hidden', marginBottom: 16 }}>
        <div className="marquee-track-left">
          {doubled.map((c, i) => (
            <div key={i} style={{
              padding: '0 clamp(2rem, 5vw, 4rem)',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.15em',
              color: '#333',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#333'; }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: right */}
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track-right">
          {doubled.map((c, i) => (
            <div key={i} style={{
              padding: '0 clamp(2rem, 5vw, 4rem)',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.15em',
              color: '#1e1e1e',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#1e1e1e'; }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION: Testimonials ---------- */
const testimonials = [
  { quote: "21:9 Studios brought an entirely new dimension to our vision. Their ability to blend creativity with technology was exceptional.", author: "Rajesh Kumar", role: "Director, Parallax Films" },
  { quote: "The team at 21:9 didn't just deliver VFX — they delivered storytelling. Every frame was crafted with purpose and precision.", author: "Priya Menon", role: "Executive Producer, Stellar Productions" },
  { quote: "Working with 21:9 Studios was a revelation. They understood our creative intent and elevated it beyond what we imagined possible.", author: "Arjun Sharma", role: "Creative Director, Visions Studios" },
];

function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900 }}>
        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(5rem, 12vw, 10rem)', color: '#1e1e1e', lineHeight: 0.6, marginBottom: 24, userSelect: 'none' }}>"</div>

        <blockquote
          key={idx}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            color: '#fff',
            lineHeight: 1.6,
            marginBottom: 40,
            fontWeight: 300,
            animation: 'char-up 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {t.quote}
        </blockquote>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          animation: 'char-up 0.6s 0.1s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ width: 1, height: 40, background: '#3b82f6' }} />
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em', color: '#fff' }}>{t.author}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.1em', color: '#8a8a8a', marginTop: 4 }}>{t.role}</div>
          </div>
        </div>
      </div>

      {/* Nav dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 48 }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 32 : 8,
              height: 2,
              background: i === idx ? '#3b82f6' : '#333',
              border: 'none',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- SECTION: Careers CTA ---------- */
function CareersCTASection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop&auto=format"
        alt="Studio"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.9), rgba(5,5,5,0.4))' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1, marginBottom: 24 }}>
          THE NEXT<br />FRAME COULD<br />BE YOURS.
        </h2>
        <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: '#8a8a8a', maxWidth: 480, lineHeight: 1.7, marginBottom: 40 }}>
          We're always looking for artists, dreamers and technologists who want to push the boundaries of what's possible.
        </p>
        <button
          onClick={() => { onNavigate('careers'); window.scrollTo({ top: 0 }); }}
          data-cursor="open"
          className="scroll-reveal"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.2em',
            color: '#fff',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '16px 32px',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
        >
          JOIN THE STUDIO <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

/* ---------- SECTION: Footer ---------- */
function FooterSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const navLinks: { label: string; page: Page }[] = [
    { label: 'WORK', page: 'work' },
    { label: 'SERVICES', page: 'services' },
    { label: 'ABOUT', page: 'about' },
    { label: 'CAREERS', page: 'careers' },
    { label: 'CONTACT', page: 'contact' },
  ];

  return (
    <footer style={{ background: '#0a0a0a', padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 6vw, 6rem) 2rem', borderTop: '1px solid #1e1e1e', position: 'relative', overflow: 'hidden' }}>
      {/* Big text */}
      <h2 style={{
        fontFamily: "'Anton', sans-serif",
        fontSize: 'clamp(2.5rem, 9vw, 9rem)',
        letterSpacing: '0.02em',
        color: '#fff',
        lineHeight: 1,
        marginBottom: 48,
      }}>
        LET'S CREATE<br />SOMETHING<br />
        <span style={{ color: '#3b82f6' }}>IMPOSSIBLE.</span>
      </h2>

      <button
        onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0 }); }}
        data-cursor="open"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#050505',
          background: '#fff',
          border: 'none',
          padding: '18px 40px',
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 80,
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#050505'; }}
      >
        START A PROJECT <ArrowRight size={14} />
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, paddingTop: 40, borderTop: '1px solid #1e1e1e' }}>
        {/* Logo + location */}
        <div>
          <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, letterSpacing: '0.05em', color: '#fff', marginBottom: 8 }}>21:9</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a' }}>STUDIOS</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', color: '#8a8a8a', marginTop: 20 }}>CHENNAI, INDIA</div>
        </div>

        {/* Nav */}
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 20 }}>NAVIGATION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {navLinks.map(({ label, page }) => (
              <button key={page} onClick={() => { onNavigate(page); window.scrollTo({ top: 0 }); }} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: '#8a8a8a', background: 'none', border: 'none', textAlign: 'left', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8a8a8a'; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 20 }}>FOLLOW</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['INSTAGRAM', 'LINKEDIN', 'YOUTUBE', 'BEHANCE'].map(s => (
              <a key={s} href="#" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: '#8a8a8a', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#8a8a8a'; }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 20 }}>CONTACT</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#8a8a8a', lineHeight: 2 }}>
            hello@219studios.com
          </div>
        </div>
      </div>

      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', color: '#333' }}>
          © 2026 21:9 STUDIOS. ALL RIGHTS RESERVED.
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#333' }}>
          BEYOND THE FRAME.
        </div>
      </div>
    </footer>
  );
}

/* ---------- MAIN ---------- */
export default function HomePage({ onNavigate }: Props) {
  useScrollReveal();

  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <IntroSection />
      <ShowreelSection />
      <FeaturedWorkSection onNavigate={onNavigate} />
      <VFXBreakdownSection />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <MarqueeSection />
      <TestimonialsSection />
      <CareersCTASection onNavigate={onNavigate} />
      <FooterSection onNavigate={onNavigate} />
    </div>
  );
}
