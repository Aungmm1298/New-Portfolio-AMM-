const STATS = [
  { value: '8+', label: 'Certifications', icon: 'fas fa-certificate' },
  { value: '#1', label: 'Grand Prize', icon: 'fas fa-trophy' },
  { value: 'AWS', label: 'Cloud Expert', icon: 'fab fa-aws' },
  { value: '∞', label: 'Curiosity', icon: 'fas fa-brain' },
];

export default function About() {
  return (
    <section id="about" className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal" style={{ overflowX: 'hidden' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-num">01 /</span>
          <h2 className="text-2xl md:text-3xl">About Me</h2>
          <div className="flex-1" style={{ height: '1px', background: '#1e293b' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-lg leading-relaxed mb-5" style={{ color: '#000' }}>
              I&apos;m a passionate{' '}
              <span style={{ color: '#000', fontWeight: 600 }}>Junior Cloud Developer</span>
              {' '}with expertise in AWS, Huawei Cloud, and modern DevOps practices.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: '#000', fontSize: '0.95rem' }}>
              I enjoy building scalable, reliable infrastructure and turning complex challenges into
              elegant cloud solutions. Currently pursuing a degree in Computer Engineering while
              stacking certifications and real-world cloud experience.
            </p>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-sm transition-all"
              style={{ color: '#22d3ee', fontFamily: 'monospace' }}
            >
              <span>explore_projects</span>
              <i className="fas fa-arrow-right" />
            </a>
          </div>

          {/* Right: profile + stats */}
          <div>
            <div className="flex items-center gap-5 mb-8">
              <div
                className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: '1px solid #1e293b' }}
              >
                <img src="/images/IMG_5239.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg" style={{ color: '#000' }}>Aung Myint Myat</h3>
                <p className="text-sm mt-0.5" style={{ color: '#000' }}>Junior Cloud Developer · Thailand 🇹🇭</p>
                <a
                  href="https://www.linkedin.com/in/aung-myint-myat-305316189/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs card rounded-lg px-3 py-1.5"
                  style={{ color: '#64748b' }}
                >
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 stagger-parent">
              {STATS.map(({ value, label, icon }) => (
                <div key={label} className="card rounded-xl p-5">
                  <i className={`${icon} mb-3`} style={{ color: '#22d3ee', fontSize: '1.1rem' }} />
                  <div className="text-2xl">{value}</div>
                  <div className="text-sm mt-1" style={{ color: '#7a9ab5' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
