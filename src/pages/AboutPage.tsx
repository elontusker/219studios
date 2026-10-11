import { useEffect } from 'react';

const team = [
  { name: 'KARTHIK RAJA', role: 'FOUNDER & VFX SUPERVISOR', img: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'KAVITHA RAO', role: 'HEAD OF COMPOSITING', img: 'photo-1438761681033-6461ffad8d80' },
  { name: 'PREETHI ANAND', role: 'CG SUPERVISOR', img: 'photo-1494790108755-2616b612b786' },
  { name: 'SIDDHARTH NAIR', role: 'TECHNICAL DIRECTOR', img: 'photo-1500648767791-00dcc994a43e' },
  { name: 'ANANYA KRISHNAN', role: 'MATCHMOVE LEAD', img: 'photo-1544005313-94ddf0286df2' },
  { name: 'RAHUL VENKAT', role: 'ROTO & PAINT LEAD', img: 'photo-1506794778202-cad84cf45f1d' },
];

export default function AboutPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop&auto=format"
          alt="Studio"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginBottom: 24 }}>ABOUT 21:9</div>
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 32 }}>
            WE ARE<br />21:9.
          </h1>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#8a8a8a', maxWidth: 600, lineHeight: 1.8 }}>
            We are artists, storytellers, technologists and problem-solvers united by one obsession — creating what has never been seen before.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 8vw, 8rem)', alignItems: 'start' }}>
          <div>
            <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 32, lineHeight: 1.1 }}>
              OUR STORY
            </h2>
            <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.9, marginBottom: 24 }}>
              Founded in 2018 in Chennai, India, 21:9 Studios was built on a simple belief: that world-class visual effects shouldn't require a world-away address. We started with a team of five passionate artists determined to prove that the finest VFX could emerge from India.
            </p>
            <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#8a8a8a', lineHeight: 1.9 }}>
              Today, we are a studio of 50+ artists, supervisors, and technologists delivering work for feature films, streaming platforms, and global brands — without ever compromising on the quality or ambition that defines our work.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 24 }}>
            {[['VISION', 'To be the most creatively ambitious visual effects studio to emerge from India — producing work that defines the visual language of a generation.'], ['MISSION', 'To elevate every project we touch by combining technical mastery with genuine artistic vision and an unwavering commitment to craft.'], ['CULTURE', 'We believe great work comes from great people given the freedom to pursue excellence. Our studio is built on curiosity, collaboration, and the courage to attempt the impossible.']].map(([h, b]) => (
              <div key={h} className="scroll-reveal" style={{ borderLeft: '2px solid #3b82f6', paddingLeft: 24 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#3b82f6', marginBottom: 10 }}>{h}</div>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, color: '#8a8a8a', lineHeight: 1.8 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '0 clamp(1.5rem, 6vw, 6rem) clamp(5rem, 12vw, 10rem)', borderTop: '1px solid #1e1e1e', paddingTop: 'clamp(4rem, 8vw, 7rem)' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 60 }}>THE TEAM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 4 }}>
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  return (
    <div
      className="scroll-reveal"
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#0a0a0a', animationDelay: `${index * 0.1}s` }}
      onMouseEnter={e => {
        const overlay = e.currentTarget.querySelector('.team-overlay') as HTMLElement;
        const img = e.currentTarget.querySelector('img') as HTMLElement;
        if (overlay) overlay.style.opacity = '1';
        if (img) { img.style.transform = 'scale(1.06)'; img.style.filter = 'brightness(0.3) grayscale(0.5)'; }
      }}
      onMouseLeave={e => {
        const overlay = e.currentTarget.querySelector('.team-overlay') as HTMLElement;
        const img = e.currentTarget.querySelector('img') as HTMLElement;
        if (overlay) overlay.style.opacity = '0';
        if (img) { img.style.transform = 'scale(1)'; img.style.filter = 'brightness(0.7) grayscale(0.3)'; }
      }}
    >
      <img
        src={`https://images.unsplash.com/${member.img}?w=500&h=700&fit=crop&auto=format&face`}
        alt={member.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'brightness(0.7) grayscale(0.3)', transition: 'transform 0.6s ease, filter 0.4s' }}
      />
      <div
        className="team-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 50%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 24, opacity: 0, transition: 'opacity 0.4s',
        }}
      >
        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1.1 }}>{member.name}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#3b82f6', marginTop: 6 }}>{member.role}</div>
      </div>
    </div>
  );
}
