import { useState } from 'react';

const CERTS = [
  { num: '01', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', tag: 'Cloud', icon: 'fa-aws', img: '/images/AWS-Certified-Cloud-Practitioner.jpg', accent: '#fb923c', fab: true },
  { num: '02', name: 'HCIA-Cloud Service', issuer: 'Huawei', tag: 'Cloud', icon: 'fa-cloud', img: '/images/HCIA-Cloud-Service.jpg', accent: '#f87171' },
  { num: '03', name: 'HCIA-IoT', issuer: 'Huawei', tag: 'IoT', icon: 'fa-microchip', img: '/images/HCIA-IoT.jpg', accent: '#60a5fa' },
  { num: '04', name: 'HCCDA Cloud Native', issuer: 'Huawei', tag: 'Cloud Native', icon: 'fa-cubes', img: '/images/HCCDA-Cloud-Native.png', accent: '#a78bfa' },
  { num: '05', name: 'HCCDP Cloud Migration', issuer: 'Huawei', tag: 'Migration', icon: 'fa-right-left', img: '/images/HCCDP-Cloud-Migration.png', accent: '#22d3ee' },
  { num: '06', name: 'HCCDP Solution Architect', issuer: 'Huawei', tag: 'Architecture', icon: 'fa-diagram-project', img: '/images/HCCDP-solution-architect.png', accent: '#818cf8' },
  { num: '07', name: 'HCCDA Tech Essential', issuer: 'Huawei', tag: 'Essentials', icon: 'fa-bolt', img: '/images/HWDCTEDA233144.png', accent: '#f472b6' },
  { num: '08', name: 'HCCDA AI', issuer: 'Huawei', tag: 'AI', icon: 'fa-brain', img: '/images/HWENDCAIDA666269.png', accent: '#facc15' },
];

function CertModal({ cert, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.95)'
      }}
      onClick={onClose}
    >
      <div
        style={{ position: 'relative', maxWidth: '56rem', width: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-2rem',
            right: 0,
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-times" />
        </button>

        <img
          src={cert.img}
          alt={cert.name}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '0.75rem'
          }}
        />

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p style={{ color: '#e2e8f0', fontWeight: 600 }}>{cert.name}</p>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{cert.issuer}</p>
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

  const getOffset = (i) => {
    let d = i - current;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section
      id="certificates"
      className="py-16 lg:py-32 px-4 sm:px-6"
      style={{ overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold">
            Certifications
          </h2>
        </div>

        {/* 3D Carousel */}
        <div
          style={{
            position: 'relative',
            height: '420px',
            perspective: '1200px'
          }}
        >

          {CERTS.map((c, i) => {

            const offset = getOffset(i);
            const isActive = offset === 0;

            const rotateY = offset * -40;
            const translateX = offset * 260;
            const translateZ = isActive ? 0 : -180;

            const zIndex = isActive ? 10 : 5 - Math.abs(offset);

            const faClass = c.fab ? 'fab' : 'fas';

            return (
              <div
                key={c.num}
                onClick={() => isActive ? setModalCert(c) : setCurrent(i)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '280px',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                  `,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(.19,1,.22,1)',
                  cursor: 'pointer',
                  borderRadius: '1.2rem',
                  overflow: 'hidden',
                  background: '#070f1c',
                  border: `1px solid ${isActive ? c.accent + '55' : '#0d1e30'}`,
                  zIndex,
                  boxShadow: isActive
                    ? `0 30px 80px ${c.accent}30`
                    : '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >

                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isActive ? 'brightness(0.8)' : 'brightness(0.45)',
                      transition: 'filter 0.5s'
                    }}
                  />
                </div>

                {/* Body */}
                <div style={{ padding: '1rem' }}>

                  <p
                    style={{
                      color: '#ddeeff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      marginBottom: '0.4rem'
                    }}
                  >
                    {c.name}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >

                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: `${c.accent}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className={`${faClass} ${c.icon}`} style={{ color: c.accent }} />
                    </div>

                    <span
                      style={{
                        color: '#64748b',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace'
                      }}
                    >
                      {c.issuer}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}
        >
          <button onClick={prev}>
            <i className="fas fa-chevron-left" />
          </button>

          <button onClick={next}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>

      </div>

      {modalCert && <CertModal cert={modalCert} onClose={() => setModalCert(null)} />}

    </section>
  );
}