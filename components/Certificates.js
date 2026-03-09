import { useState } from 'react';

const CERTS = [
  { num: '01', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', tag: 'Cloud',        icon: 'fa-aws',             img: '/images/AWS-Certified-Cloud-Practitioner.jpg', accent: '#fb923c', fab: true },
  { num: '02', name: 'HCIA-Cloud Service',               issuer: 'Huawei',              tag: 'Cloud',        icon: 'fa-cloud',           img: '/images/HCIA-Cloud-Service.jpg',              accent: '#f87171' },
  { num: '03', name: 'HCIA-IoT',                         issuer: 'Huawei',              tag: 'IoT',          icon: 'fa-microchip',       img: '/images/HCIA-IoT.jpg',                        accent: '#60a5fa' },
  { num: '04', name: 'HCCDA Cloud Native',               issuer: 'Huawei',              tag: 'Cloud Native', icon: 'fa-cubes',           img: '/images/HCCDA-Cloud-Native.png',              accent: '#a78bfa' },
  { num: '05', name: 'HCCDP Cloud Migration',            issuer: 'Huawei',              tag: 'Migration',    icon: 'fa-right-left',      img: '/images/HCCDP-Cloud-Migration.png',           accent: '#22d3ee' },
  { num: '06', name: 'HCCDP Solution Architect',         issuer: 'Huawei',              tag: 'Architecture', icon: 'fa-diagram-project', img: '/images/HCCDP-solution-architect.png',        accent: '#818cf8' },
  { num: '07', name: 'HCCDA Tech Essential',             issuer: 'Huawei',              tag: 'Essentials',   icon: 'fa-bolt',            img: '/images/HWDCTEDA233144.png',                  accent: '#f472b6' },
  { num: '08', name: 'HCCDA AI',                         issuer: 'Huawei',              tag: 'AI',           icon: 'fa-brain',           img: '/images/HWENDCAIDA666269.png',                accent: '#facc15' },
];

function CertModal({ cert, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <div style={{ position: 'relative', maxWidth: '56rem', width: '100%' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '-2.2rem', right: 0, background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }} aria-label="Close">
          <i className="fas fa-times" />
        </button>
        <img src={cert.img} alt={cert.name} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '0.75rem', display: 'block', margin: '0 auto' }} />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ color: '#e2e8f0', fontWeight: 600 }}>{cert.name}</p>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [current, setCurrent] = useState(0);
  const [modalCert, setModalCert] = useState(null);
  const total = CERTS.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  // Each card gets a position offset relative to current
  const getOffset = (i) => {
    let d = i - current;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section id="certificates" className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal" style={{ overflowX: 'hidden' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="section-num">05 /</span>
            <h2 className="text-3xl md:text-4xl font-bold">Certifications</h2>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #1e293b, transparent)' }} />
          </div>
          <p style={{ color: '#000', fontSize: '0.85rem', paddingLeft: '3.5rem', maxWidth: '440px' }}>
            Industry-recognized certifications validating cloud infrastructure and ICT expertise.
          </p>
        </div>

        {/* Carousel viewport */}
        <div style={{ position: 'relative', height: 'clamp(300px, 55vw, 440px)', overflow: 'hidden' }}>

          {/* Fade masks */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, #030810 0%, transparent 18%, transparent 82%, #030810 100%)' }} />

          {/* Cards */}
          {CERTS.map((c, i) => {
            const offset = getOffset(i);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            const faClass = c.fab ? 'fab' : 'fas';

            const translateX = offset * 52;     // % shift per step
            const scale = isActive ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.14);
            const opacity = isActive ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.55);
            const zIndex = isActive ? 10 : 5 - Math.abs(offset);

            return (
              <div
                key={c.num}
                onClick={() => isActive ? setModalCert(c) : setCurrent(i)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'min(280px, 85vw)',
                  transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
                  opacity: isVisible ? opacity : 0,
                  zIndex,
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s, box-shadow 0.4s, border-color 0.4s',
                  cursor: 'pointer',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  background: '#070f1c',
                  border: `1px solid ${isActive ? c.accent + '55' : '#0d1e30'}`,
                  boxShadow: isActive
                    ? `0 0 55px ${c.accent}30, 0 20px 60px #00000070`
                    : '0 4px 20px #00000050',
                  visibility: !isActive && Math.abs(offset) >= 2 ? 'hidden' : 'visible',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#040b14' }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      filter: isActive ? 'brightness(0.8)' : 'brightness(0.45)',
                      transition: 'filter 0.5s',
                    }}
                  />
                  {/* bottom fade */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, #070f1c 100%)' }} />
                  {/* accent top bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${c.accent}, transparent)`,
                    opacity: isActive ? 1 : 0.3, transition: 'opacity 0.4s',
                  }} />
                  {/* tag */}
                  <div style={{
                    position: 'absolute', top: '0.6rem', right: '0.6rem',
                    fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.1em',
                    color: c.accent, background: 'rgba(4,11,20,0.8)',
                    backdropFilter: 'blur(6px)', padding: '0.18rem 0.45rem',
                    borderRadius: '0.35rem', border: `1px solid ${c.accent}35`,
                    textTransform: 'uppercase',
                  }}>{c.tag}</div>
                  {/* num */}
                  <div style={{
                    position: 'absolute', top: '0.6rem', left: '0.6rem',
                    fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.1em',
                    color: '#2a4d66', background: 'rgba(4,11,20,0.7)',
                    backdropFilter: 'blur(6px)', padding: '0.18rem 0.45rem',
                    borderRadius: '0.35rem',
                  }}>{c.num}</div>
                  {/* click hint on active */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '2.4rem', height: '2.4rem', borderRadius: '50%',
                        background: `${c.accent}20`, backdropFilter: 'blur(6px)',
                        border: `1px solid ${c.accent}45`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <i className="fas fa-expand" style={{ color: c.accent, fontSize: '0.65rem' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: '0.85rem 1rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      fontSize: '0.42rem', fontFamily: 'monospace', letterSpacing: '0.1em',
                      color: '#4ade80', background: '#4ade8010', border: '1px solid #4ade8025',
                      padding: '0.15rem 0.4rem', borderRadius: '999px',
                    }}>
                      <i className="fas fa-circle-check" style={{ fontSize: '0.36rem' }} /> VERIFIED
                    </span>
                  </div>
                  <p style={{
                    color: isActive ? '#ddeeff' : '#1e3d55',
                    fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.3,
                    margin: '0 0 0.5rem',
                    transition: 'color 0.4s',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{c.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      width: '1.4rem', height: '1.4rem', borderRadius: '0.35rem', flexShrink: 0,
                      background: isActive ? `${c.accent}18` : '#0a1827',
                      border: `1px solid ${isActive ? c.accent + '30' : '#0d1e30'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.4s, border-color 0.4s',
                    }}>
                      <i className={`${faClass} ${c.icon}`} style={{ color: isActive ? c.accent : '#1a3448', fontSize: '0.55rem', transition: 'color 0.4s' }} />
                    </div>
                    <p style={{ color: '#1a3448', fontSize: '0.58rem', fontFamily: 'monospace', margin: 0 }}>{c.issuer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={prev} style={{
            width: '2.6rem', height: '2.6rem', borderRadius: '50%',
            background: '#0a1827', border: `1px solid #0e2035`,
            color: '#3a5f7a', fontSize: '0.7rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s',
          }}>
            <i className="fas fa-chevron-left" />
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            {CERTS.map((c, i) => (
              <button
                key={c.num}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '1.6rem' : '0.4rem',
                  height: '0.4rem', borderRadius: '999px',
                  background: i === current ? CERTS[current].accent : '#0e2035',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.3s, background 0.3s',
                  boxShadow: i === current ? `0 0 8px ${CERTS[current].accent}70` : 'none',
                }}
              />
            ))}
          </div>

          <button onClick={next} style={{
            width: '2.6rem', height: '2.6rem', borderRadius: '50%',
            background: '#0a1827', border: `1px solid #0e2035`,
            color: '#3a5f7a', fontSize: '0.7rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s',
          }}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        {/* Counter */}
        <p style={{ textAlign: 'center', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '0.58rem', color: '#1a3448', letterSpacing: '0.1em' }}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>

      </div>

      {modalCert && <CertModal cert={modalCert} onClose={() => setModalCert(null)} />}
    </section>
  );
}
