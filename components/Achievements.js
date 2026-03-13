import { useState } from 'react';

const ACHIEVEMENTS = [
  {
    title: 'Joint International Workshop & Competition 2024',
    award: 'Winner up',
    description:
      'Won the Joint International Workshop & Competition 2024 by developing an innovative technology solution with a team, demonstrating strong technical expertise, collaboration, and problem-solving skills in an international competition.',
    img: '/images/JIWC.jpg',
  },
  {
    title: 'Code for Hope Hackathon 2025',
    award: '1st Runner-Up',
    description:
      'Achieved 1st Runner-Up by developing an innovative technology solution with a team, demonstrating strong problem-solving, collaboration, and rapid development skills.',
    img: '/images/IMG_2589.jpg',
  },
  {
    title: 'Joint International Workshop & Competition 2025',
    award: '2nd Runner-Up',
    description:
      'Achieved 2nd Runner-Up by collaborating with an international team to develop an innovative technology solution, demonstrating strong technical skills, teamwork, and problem-solving in a competitive environment.',
    img: '/images/JIWC2025.jpg',
  },
  {
    title: '2025-26 Huawei ICT Competition',
    award: 'Grand Prize',
    description:
      'Awarded the Grand Prize at the Huawei ICT Competition for demonstrating outstanding performance in cloud computing, networking, and ICT problem-solving, competing against top university teams at the national level.',
    img: '/images/IMG_6558.jpg',
  },
];

function getAwardIcon(award) {
  if (award === 'Winner') return '🥇';
  if (award === 'Grand Prize') return '🏆';
  if (award === '1st Runner-Up') return '🥈';
  if (award === '2nd Runner-Up') return '🥉';
  return '🏅';
}

function AchievementModal({ achievement, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 transition"
          style={{ color: '#64748b' }}
          aria-label="Close"
        >
          ✕
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
    <section
      id="achievements"
      className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal reveal-left"
      style={{ overflowX: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-num">04 /</span>
          <h2 className="text-2xl md:text-3xl">Achievements</h2>
          <div className="flex-1" style={{ height: '1px', background: '#1e293b' }} />
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              className="card rounded-xl overflow-hidden group"
            >

              {/* Image */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setSelected(a)}
              >
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ height: '170px' }}
                />

                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 100%)',
                  }}
                >
                  <span
                    style={{
                      color: '#22d3ee',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                    }}
                  >
                    Click to enlarge ↗
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">

                {/* Award Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: '0.9rem' }}>
                    {getAwardIcon(a.award)}
                  </span>

                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#facc15', fontFamily: 'monospace' }}
                  >
                    {a.award}
                  </span>
                </div>

                <h3
                  className="mb-2 leading-snug"
                  style={{ fontSize: '0.85rem' }}
                >
                  {a.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#64748b' }}
                >
                  {a.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {selected && (
        <AchievementModal
          achievement={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}