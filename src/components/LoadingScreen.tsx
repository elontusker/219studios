import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');

  useEffect(() => {
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const pct = Math.min(100, Math.round((current / steps) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.77,0,0.175,1)',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: '#fff',
            letterSpacing: '0.05em',
            lineHeight: 1,
            animation: 'char-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          21:9
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.3em',
            color: '#8a8a8a',
            marginTop: 8,
            animation: 'char-up 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          STUDIOS
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(280px, 60vw)', position: 'relative' }}>
        <div
          style={{
            height: 1,
            background: '#1e1e1e',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#3b82f6',
              width: `${progress}%`,
              transition: 'width 0.03s linear',
              boxShadow: '0 0 12px rgba(59,130,246,0.8)',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: '#8a8a8a',
            letterSpacing: '0.1em',
          }}
        >
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: '0.4em',
          color: '#333',
          animation: 'char-up 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        BEYOND THE FRAME
      </div>
    </div>
  );
}
