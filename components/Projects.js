import { useState } from 'react';

const PROJECTS = [
  { num: '01', title: 'Computer Based Control',  description: 'Technical report on computer-based control systems and implementation.',    href: '/Projects/6631502023_028_055_ComputerBasedControlReport.pdf', tag: 'Report',        icon: 'fa-microchip',          accent: '#22d3ee' },
  { num: '02', title: 'APAC Project',             description: 'Project documentation for APAC initiative and development.',               href: '/Projects/APAC.pdf',                                           tag: 'Documentation', icon: 'fa-earth-asia',         accent: '#818cf8' },
  { num: '03', title: 'LifeLink Capstone',        description: 'Capstone project focusing on LifeLink application development.',           href: '/Projects/Capstone_Project_LifeLink_011_023_028_055.pdf',       tag: 'Capstone',      icon: 'fa-heart-pulse',        accent: '#fb923c' },
  { num: '04', title: 'Code For Hope',            description: 'Social impact project documentation and implementation details.',         href: '/Projects/CodeForHope.pdf',                                     tag: 'Social Impact', icon: 'fa-hand-holding-heart', accent: '#4ade80' },
  { num: '05', title: 'Computer Networks',        description: 'Comprehensive study on computer networks and communication protocols.',    href: '/Projects/Computer Networks and Communication.pdf',            tag: 'Research',      icon: 'fa-network-wired',      accent: '#fbbf24' },
  { num: '06', title: 'Hylife Innovation',        description: 'Engineering project documentation for Hylife innovation initiative.',     href: '/Projects/Hylife-Innovation-Project-Eng.pdf',                  tag: 'Engineering',   icon: 'fa-flask',              accent: '#f472b6' },
  { num: '07', title: 'Image Processing',         description: 'Technical documentation on image processing algorithms and applications.',href: '/Projects/Image Processing.pdf',                               tag: 'Algorithms',    icon: 'fa-image',              accent: '#a78bfa' },
  { num: '08', title: 'Senior Project Proposal',  description: 'Final year project proposal with detailed project scope and objectives.',  href: '/Projects/Senior Project Proposal.pdf',                        tag: 'Final Year',    icon: 'fa-graduation-cap',     accent: '#34d399' },
];

const TOTAL = PROJECTS.length;
const STACK = 3; // cards visible behind the front card

// Transform for each stack depth (0 = front, STACK = furthest back)
const depthTransform = (d) => [
  'translate(0px,   0px)  rotate(0deg)   scale(1)',
  'translate(12px, -10px) rotate(-4deg)  scale(0.96)',
  'translate(24px, -20px) rotate(-8deg)  scale(0.92)',
  'translate(36px, -30px) rotate(-12deg) scale(0.88)',
][d] ?? 'translate(36px, -30px) rotate(-12deg) scale(0.88)';

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const goNext = () => setCurrent((c) => (c + 1) % TOTAL);
  const goPrev = () => setCurrent((c) => (c - 1 + TOTAL) % TOTAL);
  const active = PROJECTS[current];

  return (
    <section id="work" className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal reveal-left" style={{ overflowX: 'hidden' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="section-num">02 /</span>
            <h2 className="text-2xl md:text-3xl">Academic Projects</h2>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #1e293b, transparent)' }} />
          </div>
            <p style={{ color: '#000', fontSize: '0.85rem', paddingLeft: '3.5rem', maxWidth: '440px' }}>
            A selection of reports, capstone work, and engineering projects from my studies.
          </p>
        </div>

        {/* Card stack + sidebar */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>

          {/* ── Card Stack ── */}
          <div style={{ position: 'relative', width: 'min(320px, 90vw)', height: 'min(420px, 80vw)', flexShrink: 0 }}>
            {PROJECTS.map((project, idx) => {
              const rawDepth = (idx - current + TOTAL) % TOTAL;
              const inStack  = rawDepth <= STACK;
              const isActive = rawDepth === 0;

              return (
                <div
                  key={project.num}
                  onClick={isActive ? goNext : undefined}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    background: isActive
                      ? `linear-gradient(155deg, ${project.accent}1e 0%, #07111c 55%)`
                      : `${project.accent}16`,
                    border: `1.5px solid ${project.accent}${isActive ? '44' : '18'}`,
                    transform: depthTransform(inStack ? rawDepth : STACK),
                    zIndex: inStack ? (STACK + 2 - rawDepth) : 0,
                    opacity: inStack ? 1 : 0,
                    transition: 'transform 0.5s cubic-bezier(0.34,1.2,0.64,1), opacity 0.25s ease',
                    cursor: isActive ? 'pointer' : 'default',
                    pointerEvents: isActive ? 'auto' : 'none',
                    boxShadow: isActive
                      ? `0 30px 65px -15px ${project.accent}25, 0 0 0 1px ${project.accent}10`
                      : 'none',
                  }}
                >
                  {/* Corner glow blob */}
                  <div style={{
                    position: 'absolute', top: '-50px', right: '-50px',
                    width: '200px', height: '200px',
                    background: `radial-gradient(circle, ${project.accent}22, transparent 65%)`,
                    pointerEvents: 'none',
                  }} />

                  {isActive ? (
                    /* ── Front card: full content ── */
                    <div style={{
                      padding: '1.75rem', height: '100%', boxSizing: 'border-box',
                      display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1,
                    }}>
                      {/* Icon + counter */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                        <div style={{
                          width: '2.8rem', height: '2.8rem', borderRadius: '0.8rem',
                          background: `${project.accent}1c`, border: `1px solid ${project.accent}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <i className={`fas ${project.icon}`} style={{ color: project.accent, fontSize: '1rem' }} />
                        </div>
                        <span style={{
                          fontFamily: 'monospace', fontSize: '0.63rem',
                          color: project.accent + '99', letterSpacing: '0.08em',
                        }}>{project.num} / {String(TOTAL).padStart(2, '0')}</span>
                      </div>

                      {/* Tag pill */}
                      <span style={{
                        alignSelf: 'flex-start', fontSize: '0.55rem', fontFamily: 'monospace',
                        letterSpacing: '0.1em', padding: '0.2rem 0.6rem', borderRadius: '999px',
                        background: `${project.accent}10`, color: project.accent,
                        border: `1px solid ${project.accent}22`, textTransform: 'uppercase',
                        marginBottom: '0.9rem',
                      }}>{project.tag}</span>

                      {/* Title */}
                      <h3 style={{
                        color: '#eef5ff', fontSize: '1.1rem', fontWeight: 400,
                        lineHeight: 1.25, margin: '0 0 0.6rem',
                      }}>{project.title}</h3>

                      {/* Description */}
                      <p style={{ color: '#3a5a74', fontSize: '0.79rem', lineHeight: 1.8, margin: 0, flex: 1 }}>
                        {project.description}
                      </p>

                      {/* Footer */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginTop: '1.2rem', paddingTop: '0.9rem',
                        borderTop: `1px solid ${project.accent}12`,
                      }}>
                        <span style={{ color: '#162d44', fontSize: '0.58rem', fontFamily: 'monospace' }}>
                          tap card to advance ›
                        </span>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.42rem 0.9rem', borderRadius: '0.55rem',
                            background: project.accent, color: '#030f1a',
                            fontSize: '0.67rem', fontFamily: 'monospace', fontWeight: 400,
                            textDecoration: 'none', letterSpacing: '0.04em',
                          }}
                        >
                          Open PDF <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.5rem' }} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* ── Background cards: faint icon only ── */
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`fas ${project.icon}`} style={{ color: project.accent, fontSize: '3.5rem', opacity: 0.16 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Sidebar: all projects list ── */}
          <div style={{ minWidth: '200px', maxWidth: '310px', flex: 1, width: '100%' }}>
            <p style={{ color: '#172c3f', fontSize: '0.62rem', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
              All Projects
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.num}
                  onClick={() => setCurrent(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.7rem',
                    width: '100%', padding: '0.55rem 0.75rem', borderRadius: '0.55rem',
                    background: current === i ? `${p.accent}0d` : 'transparent',
                    border: `1px solid ${current === i ? p.accent + '25' : 'transparent'}`,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '0.35rem',
                    background: `${p.accent}14`, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`fas ${p.icon}`} style={{ color: current === i ? p.accent : p.accent + '45', fontSize: '0.6rem' }} />
                  </div>
                  <span style={{
                    color: current === i ? '#c5ddf0' : '#2a4055', fontSize: '0.77rem',
                    fontWeight: current === i ? 600 : 400, flex: 1, transition: 'color 0.2s',
                  }}>
                    {p.title}
                  </span>
                  {current === i && (
                    <i className="fas fa-chevron-right" style={{ color: p.accent, fontSize: '0.5rem', opacity: 0.6 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Prev / Next + dots */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              marginTop: '1.1rem', paddingTop: '0.85rem', borderTop: '1px solid #0c1d2c',
            }}>
              <button onClick={goPrev} style={{ width: '1.9rem', height: '1.9rem', borderRadius: '0.4rem', background: '#07111c', border: '1px solid #0f2030', color: '#2a4055', cursor: 'pointer', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-chevron-left" />
              </button>
              <button onClick={goNext} style={{ width: '1.9rem', height: '1.9rem', borderRadius: '0.4rem', background: '#07111c', border: '1px solid #0f2030', color: '#2a4055', cursor: 'pointer', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-chevron-right" />
              </button>
              <span style={{ color: '#162d44', fontSize: '0.64rem', fontFamily: 'monospace', marginLeft: '0.3rem' }}>
                {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: '0.26rem', marginLeft: 'auto' }}>
                {PROJECTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: current === i ? '1.1rem' : '0.34rem',
                      height: '0.34rem', borderRadius: '999px',
                      background: current === i ? active.accent : '#101f2e',
                      border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
