import { useState } from 'react';

const ACHIEVEMENTS = [
  {
    title: '2025-26 Huawei ICT Competition (Grand Prize)',
    description:
      'Awarded the Grand Prize at the Huawei ICT Competition for demonstrating outstanding performance in cloud computing, networking, and ICT problem-solving, competing against top university teams at the national level.',
    img: '/images/IMG_6558.jpg',
  },
];

function AchievementModal({ achievement, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 transition"
          style={{ color: '#64748b' }}
          aria-label="Close"
        >
          <i className="fas fa-times text-xl" />
        </button>
        <img
          src={achievement.img}
          alt={achievement.title}
          className="max-w-full max-h-[80vh] object-contain rounded-xl block mx-auto"
        />
        <p className="text-center mt-5" style={{ color: '#e2e8f0' }}>
          {achievement.title}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="py-24 lg:py-32 px-6 scroll-reveal reveal-left">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-num">04 /</span>
          <h2 className="text-2xl md:text-3xl">Achievements</h2>
          <div className="flex-1" style={{ height: '1px', background: '#1e293b' }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} className="card rounded-xl overflow-hidden group">
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setSelected(a)}
              >
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full object-cover transition-transform duration-500"
                  style={{ height: '220px', transform: 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 100%)' }}
                >
                  <span style={{ color: '#22d3ee', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    Click to enlarge ↗
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <i className="fas fa-trophy text-sm" style={{ color: '#facc15' }} />
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#facc15', fontFamily: 'monospace' }}
                  >
                    Grand Prize
                  </span>
                </div>
                <h3 className="mb-2 leading-snug" style={{ fontSize: '0.95rem' }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <AchievementModal achievement={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
