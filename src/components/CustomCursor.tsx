import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isProject = el.closest('[data-cursor="view"]');
      const isPlay = el.closest('[data-cursor="play"]');
      const isLink = el.closest('a, button, [data-cursor="open"]');

      if (isProject) setLabel('VIEW');
      else if (isPlay) setLabel('PLAY');
      else if (isLink) setLabel('OPEN');
      else setLabel('');
    };

    window.addEventListener('mousemove', onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const hasLabel = label.length > 0;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          top: 0, left: 0,
          width: hasLabel ? 0 : 6,
          height: hasLabel ? 0 : 6,
          borderRadius: '50%',
          background: '#fff',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.2s, height 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring / label */}
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          top: 0, left: 0,
          width: hasLabel ? 80 : 36,
          height: hasLabel ? 80 : 36,
          borderRadius: '50%',
          border: `1px solid rgba(255,255,255,${hasLabel ? 0.8 : 0.35})`,
          background: hasLabel ? 'rgba(255,255,255,0.08)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, background 0.2s',
          backdropFilter: hasLabel ? 'blur(4px)' : 'none',
          willChange: 'transform',
        }}
      >
        {hasLabel && (
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: '#fff',
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
}
