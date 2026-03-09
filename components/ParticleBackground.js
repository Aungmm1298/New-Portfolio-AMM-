import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const THREE = (await import('three')).default || (await import('three'));
      const VANTA = (await import('vanta/dist/vanta.clouds.min')).default;
      if (!mounted || !vantaRef.current) return;
      effectRef.current = VANTA({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth:  200,
      });
    })();
    return () => {
      mounted = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
