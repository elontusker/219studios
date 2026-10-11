import { useState, useEffect } from 'react';
import { ArrowRight, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', type: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: '#050505', paddingTop: 72 }}>
      {/* Hero text */}
      <section style={{ padding: 'clamp(4rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: '#3b82f6', marginBottom: 24 }}>GET IN TOUCH</div>
        <h1 className="scroll-reveal" style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 8rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 0.95, marginBottom: 24 }}>
          HAVE A STORY<br />WORTH<br />BUILDING?
        </h1>
        <p className="scroll-reveal" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#8a8a8a', fontStyle: 'italic' }}>
          Let's talk.
        </p>
      </section>

      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(3rem, 8vw, 8rem)' }}>
        {/* Form */}
        <div>
          {submitted ? (
            <div style={{ padding: '60px 0' }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#3b82f6', marginBottom: 16 }}>MESSAGE SENT.</div>
              <p style={{ fontFamily: "'Manrope', sans-serif", color: '#8a8a8a', lineHeight: 1.7 }}>
                Thank you for reaching out. We'll be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['name', 'NAME *', 'Your name', true], ['company', 'COMPANY', 'Studio / Agency', false]].map(([k, l, p, r]) => (
                  <div key={k as string}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>{l as string}</label>
                    <input value={(form as Record<string,string>)[k as string]} onChange={e => setForm(f => ({ ...f, [k as string]: e.target.value }))} placeholder={p as string} required={r as boolean}
                      style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#fff', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }} onBlur={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>EMAIL *</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required type="email"
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#fff', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }} onBlur={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['type', 'PROJECT TYPE', ['Feature Film', 'OTT / Series', 'Commercial', 'Music Video', 'Other']], ['budget', 'BUDGET RANGE', ['Under ₹10L', '₹10L–50L', '₹50L–1Cr', '₹1Cr+', 'Let\'s discuss']]].map(([k, l, opts]) => (
                  <div key={k as string}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>{l as string}</label>
                    <select value={(form as Record<string,string>)[k as string]} onChange={e => setForm(f => ({ ...f, [k as string]: e.target.value }))}
                      style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: (form as Record<string,string>)[k as string] ? '#fff' : '#8a8a8a', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none' }}>
                      <option value="">Select</option>
                      {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: '#8a8a8a', display: 'block', marginBottom: 8 }}>TELL US ABOUT YOUR PROJECT *</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your project, timeline, and any specific requirements..." required rows={6}
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1e1e1e', color: '#fff', fontFamily: "'Manrope', sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; }} onBlur={e => { e.currentTarget.style.borderColor = '#1e1e1e'; }} />
              </div>

              <button type="submit" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: '#050505', background: '#fff', border: 'none', padding: '18px 48px', display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#050505'; }}>
                SEND MESSAGE <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 16 }}>LOCATION</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <MapPin size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#fff', lineHeight: 1.7 }}>
                Chennai, Tamil Nadu<br />India — 600 001
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 16 }}>EMAIL</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={14} color="#3b82f6" style={{ flexShrink: 0 }} />
              <a href="mailto:hello@219studios.com" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: '#fff', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#3b82f6'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent'; }}>
                hello@219studios.com
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: '#8a8a8a', marginBottom: 16 }}>FOLLOW</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['IG', 'LI', 'YT', 'BE'].map((label, i) => (
                <a key={i} href="#" style={{ width: 40, height: 40, border: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8a8a', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s', fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.05em' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLAnchorElement).style.color = '#3b82f6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1e1e1e'; (e.currentTarget as HTMLAnchorElement).style.color = '#8a8a8a'; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{ flex: 1, minHeight: 200, background: '#0a0a0a', border: '1px solid #1e1e1e', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <MapPin size={24} color="#3b82f6" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', color: '#8a8a8a' }}>CHENNAI, INDIA</div>
            </div>
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#3b82f6" strokeWidth="1" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`v${i}`} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" stroke="#3b82f6" strokeWidth="1" />
              ))}
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
