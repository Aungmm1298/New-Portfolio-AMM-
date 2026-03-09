import { useState, useEffect } from 'react';
import CVModal from './CVModal';

const ROLES = ['Junior Cloud Developer', 'Junior Game Developer', 'Junior DevOps Engineer'];

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = ROLES[roleIndex];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((roleIndex + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative"
      style={{ padding: '5rem 1.25rem 4rem', overflowX: 'hidden' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-8rem', left: '-8rem',
          width: '36rem', height: '36rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%', right: '-4rem',
          width: '24rem', height: '24rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <div>
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
              style={{ border: '1px solid rgba(34,211,238,0.25)', background: 'rgba(34,211,238,0.05)' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#0c0e0fff', animation: 'pulse-dot 2s ease-in-out infinite' }}
              />
              <span style={{ color: '#0d1010ff', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.12em' }}>
                AVAILABLE FOR CLOUD PROJECTS
              </span>
            </div>

            <h1
              className="tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 4.2rem)', lineHeight: 1.08, color: '#e2e8f0', wordBreak: 'break-word' }}
            >
              Aung Myint Myat<br />
            </h1>

            <div className="flex items-center gap-3 mb-7">
              <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '1rem' }}>//</span>
              <span
                style={{
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                  fontWeight: 500,
                  minWidth: '10rem',
                }}
              >
                <span style={{ color: '#22d3ee' }}>{displayed}</span>
                <span style={{ color: '#22d3ee', animation: 'blink 1s step-end infinite' }}>|</span>
              </span>
            </div>

            <p
              className="mb-10 leading-relaxed max-w-lg"
              style={{ color: '#000', fontSize: '1rem', lineHeight: 1.75 }}
            >
              Building scalable cloud infrastructure and modern web applications.
              Specializing in <span style={{ color: '#000', fontWeight: 600 }}>AWS</span>,{' '}
              <span style={{ color: '#000', fontWeight: 600 }}>Huawei Cloud</span>, and{' '}
              <span style={{ color: '#000', fontWeight: 600 }}>DevOps</span> workflows.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Get In Touch <i className="fas fa-arrow-right text-xs" />
              </a>
              <button onClick={() => setCvOpen(true)} className="btn-outline">
                <i className="fas fa-file-pdf" /> View CV
              </button>
              <a href="mailto:aungmyintmyatchauk@gmail.com" className="btn-outline">
                <i className="fas fa-envelope" />
                <span className="hidden sm:inline">Email Me</span>
              </a>
            </div>
          </div>

          {/* Right column - hidden on mobile */}
          <div className="hidden lg:flex relative justify-center lg:justify-end">
            <div className="w-full max-w-sm hero-float">

              {/* Terminal window */}
              <div className="card rounded-xl overflow-hidden mb-4">
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: '#0d1f35', borderBottom: '1px solid #1e293b' }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  <span className="ml-3 text-xs" style={{ color: '#475569', fontFamily: 'monospace' }}>profile.json</span>
                </div>
                <div className="p-5" style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: '1.8' }}>
                  <div style={{ color: '#475569' }}>{'{'}</div>
                  <div className="pl-4">
                    <span style={{ color: '#93c5fd' }}>&quot;name&quot;</span>
                    <span style={{ color: '#475569' }}>: </span>
                    <span style={{ color: '#86efac' }}>&quot;Aung Myint Myat&quot;</span>
                    <span style={{ color: '#475569' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#93c5fd' }}>&quot;role&quot;</span>
                    <span style={{ color: '#475569' }}>: </span>
                    <span style={{ color: '#86efac' }}>&quot;Junior Cloud Developer&quot;</span>
                    <span style={{ color: '#475569' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#93c5fd' }}>&quot;location&quot;</span>
                    <span style={{ color: '#475569' }}>: </span>
                    <span style={{ color: '#86efac' }}>&quot;Thailand 🇹🇭&quot;</span>
                    <span style={{ color: '#475569' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#93c5fd' }}>&quot;status&quot;</span>
                    <span style={{ color: '#475569' }}>: </span>
                    <span style={{ color: '#22d3ee' }}>&quot;available&quot;</span>
                    <span style={{ color: '#475569' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#93c5fd' }}>&quot;certifications&quot;</span>
                    <span style={{ color: '#475569' }}>: </span>
                    <span style={{ color: '#fb923c' }}>8</span>
                  </div>
                  <div style={{ color: '#475569' }}>{'}'}</div>
                </div>
              </div>

              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid #1e293b' }}>

                <div
                  className="absolute top-3 right-3 text-xs px-2 py-1 rounded"
                  style={{ background: '#22d3ee', color: '#030712', fontFamily: 'monospace' }}
                >
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <span style={{ color: '#1e3a52', fontSize: '0.58rem', letterSpacing: '0.2em', fontFamily: 'monospace' }}>SCROLL</span>
        <i className="fas fa-chevron-down scroll-hint" style={{ color: '#22d3ee', fontSize: '0.68rem' }} />
      </div>

      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}
    </section>
  );
}
