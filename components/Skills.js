import { useState } from 'react';

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'fa-layer-group',
    accent: '#22d3ee',
    skills: [
      { icon: 'fab fa-html5',  color: '#fb923c', label: 'HTML5' },
      { icon: 'fab fa-css3-alt', color: '#60a5fa', label: 'CSS3' },
      { icon: 'fas fa-wind',   color: '#22d3ee', label: 'Tailwind CSS' },
      { icon: 'fab fa-js',     color: '#fde047', label: 'JavaScript' },
      { icon: 'fab fa-react',  color: '#67e8f9', label: 'React' },
      { icon: 'fas fa-n',      color: '#e2e8f0', label: 'Next.js' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'fa-server',
    accent: '#818cf8',
    skills: [
      { icon: 'fab fa-python',    color: '#facc15', label: 'Python' },
      { icon: 'fab fa-microsoft', color: '#a78bfa', label: 'C#' },
      { icon: 'fas fa-database',  color: '#4ade80', label: 'SQL / Databases' },
      { icon: 'fab fa-js',        color: '#fde047', label: 'Node.js' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: 'fa-cloud',
    accent: '#fb923c',
    skills: [
      { icon: 'fab fa-aws',       color: '#fb923c', label: 'AWS' },
      { icon: 'fas fa-cloud',     color: '#f87171', label: 'Huawei Cloud' },
      { icon: 'fas fa-cubes',     color: '#a78bfa', label: 'IaaS / PaaS / SaaS' },
      { icon: 'fas fa-shield-halved', color: '#34d399', label: 'Cloud Security' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: 'fa-gears',
    accent: '#4ade80',
    skills: [
      { icon: 'fab fa-docker',      color: '#60a5fa', label: 'Docker' },
      { icon: 'fab fa-git-alt',     color: '#fb923c', label: 'Git / GitHub' },
      { icon: 'fas fa-code-branch', color: '#f472b6', label: 'CI/CD Pipelines' },
      { icon: 'fab fa-linux',       color: '#fbbf24', label: 'Linux' },
    ],
  },
  {
    id: 'gamedev',
    label: 'Game Dev',
    icon: 'fa-gamepad',
    accent: '#f472b6',
    skills: [
      { icon: 'fab fa-unity',     color: '#e2e8f0', label: 'Unity' },
      { icon: 'fab fa-microsoft', color: '#a78bfa', label: 'C#' },
      { icon: 'fas fa-cube',      color: '#818cf8', label: '3D / Physics' },
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState('frontend');
  const cat = CATEGORIES.find((c) => c.id === active);

  return (
    <section id="skills" className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal reveal-right" style={{ overflowX: 'hidden' }}>
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="section-num">03 /</span>
            <h2 className="text-2xl md:text-3xl">Skills &amp; Tech</h2>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #1e293b, transparent)' }} />
          </div>
          <p style={{ color: '#46607a', fontSize: '0.85rem', paddingLeft: '3.5rem', maxWidth: '420px' }}>
            Technologies I work with, grouped by discipline.
          </p>
        </div>

        {/* Tab row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem',
        }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.45rem 1rem', borderRadius: '0.55rem',
                background: active === c.id ? `${c.accent}14` : 'transparent',
                border: `1px solid ${active === c.id ? c.accent + '40' : '#0f2030'}`,
                color: active === c.id ? c.accent : '#2a4055',
                fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: active === c.id ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <i className={`fas ${c.icon}`} style={{ fontSize: '0.7rem' }} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Active category panel */}
        <div
          key={active}
          style={{
            borderRadius: '1.25rem',
            background: '#070f1a',
            border: `1px solid ${cat.accent}1a`,
            padding: 'clamp(1.25rem, 4vw, 2rem)',
            boxShadow: `0 0 60px -20px ${cat.accent}18`,
          }}
        >
          {/* Panel header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{
              width: '2.4rem', height: '2.4rem', borderRadius: '0.65rem',
              background: `${cat.accent}14`, border: `1px solid ${cat.accent}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={`fas ${cat.icon}`} style={{ color: cat.accent, fontSize: '0.9rem' }} />
            </div>
            <div>
              <p style={{ color: cat.accent, fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                {cat.label}
              </p>
              <p style={{ color: '#1a3045', fontSize: '0.7rem', margin: 0, fontFamily: 'monospace' }}>
                {cat.skills.length} technologies
              </p>
            </div>
          </div>

          {/* Skill chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {cat.skills.map(({ icon, color, label }, i) => (
              <div
                key={label}
                className="skill-chip"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.65rem 1.1rem', borderRadius: '0.75rem',
                  background: `${color}0c`, border: `1px solid ${color}22`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px -6px ${color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className={icon} style={{ color, fontSize: '1.05rem' }} />
                <span style={{ color: '#8bafc8', fontSize: '0.82rem', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
