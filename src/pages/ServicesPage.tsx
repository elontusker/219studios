import type { Page } from '../types';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    num: '01', title: 'VISUAL EFFECTS',
    desc: 'From invisible enhancements to spectacular destruction sequences, our VFX team delivers seamless work that elevates storytelling without calling attention to itself. We work with live-action plates to create everything from subtle wire removal to massive environmental replacements.',
    tags: ['On-Set VFX', 'Environment Extension', 'Destruction', 'Invisible VFX', 'Wire Removal'],
    img: 'photo-1536440136628-849c177e76a1',
  },
  {
    num: '02', title: 'CGI & 3D ANIMATION',
    desc: 'Photorealistic CGI characters, vehicles, creatures, and objects that exist seamlessly within live-action footage. Our 3D artists combine technical excellence with a deep understanding of light, physics, and performance.',
    tags: ['Character Animation', 'Creature FX', 'Hard Surface', 'Dynamics & FX', 'Rendering'],
    img: 'photo-1451187580459-43490279c0fa',
  },
  {
    num: '03', title: 'COMPOSITING',
    desc: 'Precision compositing that integrates every element — from clean plates to complex multi-layer renders — into cohesive, photorealistic imagery. Our compositors are problem-solvers who understand that the invisible seam is the greatest achievement.',
    tags: ['Multi-pass Compositing', 'Color Science', 'Integration', 'Look Dev', 'DCP Output'],
    img: 'photo-1518770660439-4636190af475',
  },
  {
    num: '04', title: 'ROTO & PAINT',
    desc: 'Frame-perfect rotoscopy and digital paint work executed by artists who understand that details define realism. We handle everything from simple cleanups to complex multi-element rotoscopy across thousands of frames.',
    tags: ['Rotoscopy', 'Paint & Cleanup', 'Rig Removal', 'Restoration', 'Sky Replacement'],
    img: 'photo-1477959858617-67f85cf4f1df',
  },
  {
    num: '05', title: 'MATCHMOVE',
    desc: 'Expert camera tracking and matchmoving that grounds every digital element in believable reality. Accurate spatial data is the foundation of credible visual effects, and our matchmove team delivers that precision on every shot.',
    tags: ['Camera Tracking', 'Object Tracking', 'LIDAR Integration', 'Survey Data', 'Geometry Rebuild'],
    img: 'photo-1545569341-9eb8b30979d9',
  },
  {
    num: '06', title: 'DIGITAL ENVIRONMENTS',
    desc: 'Vast, fully realized digital worlds built from a combination of photogrammetry, procedural techniques, and hand-crafted detail. From period-accurate historical settings to alien landscapes — we build worlds that feel lived-in.',
    tags: ['World Building', 'Photogrammetry', 'Procedural Systems', 'Matte Painting', 'HDRI'],
    img: 'photo-1478720568477-152d9b164e26',
  },
  {
    num: '07', title: 'MOTION DESIGN',
    desc: 'Dynamic motion graphics, title sequences, and brand animations that communicate with clarity, style, and cinematic impact. We bring together design thinking and animation craft to create work that moves audiences.',
    tags: ['Title Design', 'Brand Animation', 'Infographics', '2D Animation', 'UI Design'],
    img: 'photo-1504701954957-2010ec3bcec1',
  },
  {
    num: '08', title: 'VIRTUAL PRODUCTION',
    desc: 'Cutting-edge Unreal Engine virtual production workflows that bring digital environments on set in real time. We help directors and cinematographers make confident creative decisions while reducing post-production costs.',
    tags: ['LED Volume', 'Unreal Engine', 'Real-time Rendering', 'In-camera VFX', 'Pre-production'],
    img: 'photo-1574717024653-61fd2cf4d44d',
  },
];

interface Props { onNavigate: (page: Page) => void; }

export default function ServicesPage({ onNavigate }: Props) {
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
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginBottom: 24 }}>CAPABILITIES</div>
        <h1 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 24 }}>
          WHAT WE<br />DO.
        </h1>
        <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#8a8a8a', maxWidth: 540, lineHeight: 1.7 }}>
          Every capability we offer is built on years of production experience and a genuine love of craft. We don't just execute — we solve problems and push creative possibilities.
        </p>
      </section>

      {/* Services */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)' }}>
        {services.map((svc, i) => (
          <div
            key={i}
            className="scroll-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr auto' : 'auto 1fr',
              gap: 'clamp(2rem, 6vw, 6rem)',
              alignItems: 'start',
              paddingBottom: 'clamp(3rem, 6vw, 5rem)',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              borderBottom: '1px solid #1e1e1e',
            }}
          >
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#3b82f6', letterSpacing: '0.1em' }}>{svc.num}</span>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 4.5rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1 }}>{svc.title}</h2>
              </div>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.9, maxWidth: 540, marginBottom: 28 }}>{svc.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {svc.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.15em', color: '#8a8a8a', border: '1px solid #1e1e1e', padding: '5px 12px' }}>{tag}</span>
                ))}
              </div>
              <button
                onClick={() => { onNavigate('work'); window.scrollTo({ top: 0 }); }}
                data-cursor="open"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#fff', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#3b82f6'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#fff'; }}
              >
                VIEW WORK <ArrowRight size={12} />
              </button>
            </div>
            <div style={{
              width: 'clamp(200px, 28vw, 340px)',
              aspectRatio: '4/3',
              overflow: 'hidden',
              flexShrink: 0,
              order: i % 2 === 0 ? 1 : 0,
              alignSelf: 'center',
            }}>
              <img
                src={`https://images.unsplash.com/${svc.img}?w=680&h=510&fit=crop&auto=format`}
                alt={svc.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)', transition: 'transform 0.6s ease, filter 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.75)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.55)'; }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)', borderTop: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1, marginBottom: 16 }}>
            READY TO START?
          </h2>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.7 }}>
            Tell us about your project and we'll be in touch within 48 hours.
          </p>
        </div>
        <button
          onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0 }); }}
          data-cursor="open"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: '#050505', background: '#fff', border: 'none', padding: '18px 48px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, transition: 'background 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#050505'; }}
        >
          START A PROJECT <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}
