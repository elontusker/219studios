import { useState, useEffect } from 'react';
import { ArrowRight, Upload } from 'lucide-react';

const roles = [
  { title: 'COMPOSITING ARTIST', level: 'MID–SENIOR', location: 'CHENNAI' },
  { title: '3D GENERALIST', level: 'MID–SENIOR', location: 'CHENNAI' },
  { title: 'ROTO ARTIST', level: 'JUNIOR–MID', location: 'CHENNAI' },
  { title: 'MATCHMOVE ARTIST', level: 'JUNIOR–MID', location: 'CHENNAI' },
  { title: 'VFX SUPERVISOR', level: 'SENIOR', location: 'CHENNAI' },
  { title: 'UNREAL ENGINE ARTIST', level: 'MID–SENIOR', location: 'CHENNAI' },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', experience: '', portfolio: '', linkedin: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop&auto=format"
          alt="Studio"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.15)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.98) 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginBottom: 24 }}>JOIN THE STUDIO</div>
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 24 }}>
            CREATE THE<br />IMPOSSIBLE.
          </h1>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#8a8a8a', maxWidth: 480, lineHeight: 1.7 }}>
            We're looking for artists, dreamers and technologists who want to push the boundaries of what's possible in visual storytelling.
          </p>
        </div>
      </section>

      {/* Roles */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)', borderTop: '1px solid #1e1e1e' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 48 }}>
          OPEN POSITIONS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid #1e1e1e' }}>
          {roles.map((r, i) => (
            <div
              key={i}
              className="scroll-reveal"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 'clamp(1.2rem, 2.5vw, 1.8rem) 0',
                borderBottom: '1px solid #1e1e1e',
                gap: 16, flexWrap: 'wrap',
              }}
              onMouseEnter={e => { (e.currentTarget.querySelector('.role-arrow') as HTMLElement).style.opacity = '1'; (e.currentTarget.querySelector('.role-arrow') as HTMLElement).style.transform = 'translateX(0)'; }}
              onMouseLeave={e => { (e.currentTarget.querySelector('.role-arrow') as HTMLElement).style.opacity = '0'; (e.currentTarget.querySelector('.role-arrow') as HTMLElement).style.transform = 'translateX(-10px)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 4vw, 4rem)', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.2rem, 3vw, 2rem)', letterSpacing: '0.02em', color: '#fff' }}>{r.title}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', background: '#121212', padding: '4px 10px' }}>{r.level}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', color: '#8a8a8a' }}>{r.location}</span>
                <ArrowRight size={16} color="#3b82f6" className="role-arrow" style={{ opacity: 0, transform: 'translateX(-10px)', transition: 'opacity 0.3s, transform 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section style={{ padding: '0 clamp(1.5rem, 6vw, 6rem) clamp(5rem, 12vw, 10rem)' }}>
        <h2 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 4rem)', letterSpacing: '0.02em', color: '#fff', marginBottom: 48 }}>
          APPLY NOW
        </h2>

        {submitted ? (
          <div style={{ maxWidth: 600, textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#3b82f6', marginBottom: 16 }}>APPLICATION SENT.</div>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: '#8a8a8a', lineHeight: 1.7 }}>
              Thank you for your interest in 21:9 Studios. We'll review your application and be in touch within 5–7 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 720, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { key: 'name', label: 'NAME *', placeholder: 'Your full name', required: true },
              { key: 'email', label: 'EMAIL *', placeholder: 'your@email.com', required: true },
              { key: 'phone', label: 'PHONE', placeholder: '+91 XXXXX XXXXX', required: false },
              { key: 'portfolio', label: 'PORTFOLIO LINK *', placeholder: 'https://', required: true },
              { key: 'linkedin', label: 'LINKEDIN', placeholder: 'linkedin.com/in/...', required: false },
            ].map(({ key, label, placeholder, required }) => (
              <div key={key}>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>{label}</label>
                <input
                  value={(form as Record<string, string>)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  required={required}
                  style={{
                    width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#fff',
                    fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }}
                />
              </div>
            ))}

            {/* Role select */}
            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>ROLE APPLYING FOR *</label>
              <select
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                required
                style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: form.role ? '#fff' : '#8a8a8a', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none' }}
              >
                <option value="">Select a role</option>
                {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>YEARS OF EXPERIENCE *</label>
              <select
                value={form.experience}
                onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                required
                style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: form.experience ? '#fff' : '#8a8a8a', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none' }}
              >
                <option value="">Select experience</option>
                <option>0–1 years</option>
                <option>1–3 years</option>
                <option>3–5 years</option>
                <option>5–10 years</option>
                <option>10+ years</option>
              </select>
            </div>

            {/* Resume */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>RESUME</label>
              <div style={{ border: '1px dashed #1e1e1e', padding: '24px', textAlign: 'center', cursor: 'none', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }}
              >
                <Upload size={20} color="#8a8a8a" style={{ marginBottom: 8 }} />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#8a8a8a', letterSpacing: '0.1em' }}>DRAG & DROP OR CLICK TO UPLOAD</div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, color: '#333', marginTop: 4 }}>PDF, DOC up to 10MB</div>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <button
                type="submit"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#050505',
                  background: '#fff',
                  border: 'none',
                  padding: '18px 48px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#050505'; }}
              >
                SUBMIT APPLICATION <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
