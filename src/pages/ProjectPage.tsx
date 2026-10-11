import type { Page } from '../types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props { onNavigate: (page: Page) => void; }

export default function ProjectPage({ onNavigate }: Props) {
  const [dividerX, setDividerX] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDividerX(Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', () => { isDragging.current = false; });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const gallery = [
    'photo-1536440136628-849c177e76a1',
    'photo-1451187580459-43490279c0fa',
    'photo-1518770660439-4636190af475',
    'photo-1477959858617-67f85cf4f1df',
  ];

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: 'clamp(2rem, 6vw, 5rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop&auto=format"
          alt="Project hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.25em', color: '#3b82f6', marginBottom: 16 }}>
            FEATURE FILM | VFX | 2025
          </div>
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 24 }}>
            THE LAST<br />KINGDOM
          </h1>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[['SERVICES', 'VFX, Compositing, Roto'], ['DIRECTOR', 'Arjun Mehta'], ['STUDIO', 'Parallax Films']].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a' }}>{l}</div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: '#fff', marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 6vw, 6rem)' }}>
          <div>
            <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 24 }}>THE STORY</h2>
            <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.9 }}>
              A sprawling epic set in 12th century India, The Last Kingdom demanded a scale of visual effects that had never before been attempted in Indian cinema. 21:9 Studios was brought in to deliver over 400 VFX shots spanning 14 months of production.
            </p>
          </div>
          <div>
            <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 24 }}>THE CHALLENGE</h2>
            <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.9 }}>
              Creating believable period-accurate environments, massive battle sequences with thousands of digital warriors, and seamlessly invisible on-set extensions — all while matching the film's deeply naturalistic aesthetic — required innovation at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* VFX Breakdown */}
      <section style={{ padding: '0 clamp(1.5rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 32 }}>VFX BREAKDOWN</h2>
        <div
          ref={containerRef}
          style={{ position: 'relative', overflow: 'hidden', aspectRatio: '21/9', maxHeight: '55vh', background: '#0a0a0a', userSelect: 'none' }}
          onMouseDown={() => { isDragging.current = true; }}
        >
          <img src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1920&h=820&fit=crop&auto=format" alt="Plate" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.6)' }} />
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${dividerX}%)` }}>
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=820&fit=crop&auto=format" alt="Final" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${dividerX}%`, width: 2, background: '#fff', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 8, color: '#050505' }}>◁▷</span>
            </div>
          </div>
          <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#fff', background: 'rgba(5,5,5,0.7)', padding: '4px 10px' }}>PLATE</div>
          <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#fff', background: 'rgba(59,130,246,0.4)', padding: '4px 10px' }}>FINAL SHOT</div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '0 clamp(1.5rem, 6vw, 6rem) clamp(4rem, 8vw, 7rem)' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 32 }}>GALLERY</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
          {gallery.map((img, i) => (
            <div key={i} className="scroll-reveal" style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#0a0a0a' }}>
              <img
                src={`https://images.unsplash.com/${img}?w=700&h=530&fit=crop&auto=format`}
                alt={`Gallery ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)', transition: 'transform 0.6s ease, filter 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.65)'; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Credits */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)', borderTop: '1px solid #1e1e1e' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 32 }}>CREDITS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 32 }}>
          {[['DIRECTOR', 'Arjun Mehta'], ['PRODUCTION HOUSE', 'Parallax Films'], ['VFX SUPERVISOR', 'Kavitha Rao'], ['COMPOSITING LEAD', 'Siddharth Nair'], ['3D LEAD', 'Preethi Anand'], ['SERVICES', 'VFX, Compositing, Roto, Matchmove']].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#3b82f6', marginBottom: 6 }}>{l}</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: '#fff' }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Next */}
      <section
        data-cursor="view"
        onClick={() => { window.scrollTo({ top: 0 }); }}
        style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)', borderTop: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'none', position: 'relative', overflow: 'hidden' }}
        onMouseEnter={e => { (e.currentTarget.querySelector('.next-img') as HTMLElement).style.opacity = '0.15'; }}
        onMouseLeave={e => { (e.currentTarget.querySelector('.next-img') as HTMLElement).style.opacity = '0'; }}
      >
        <img className="next-img" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.5s', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#8a8a8a', marginBottom: 12 }}>NEXT PROJECT</div>
          <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1 }}>PROJECT ECLIPSE</h3>
        </div>
        <ArrowRight size={32} color="#fff" style={{ position: 'relative', zIndex: 1, flexShrink: 0 }} />
      </section>
    </div>
  );
}
