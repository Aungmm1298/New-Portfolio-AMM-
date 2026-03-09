const SOCIALS = [
  {
    name: 'LinkedIn',
    sub: 'Professional Network',
    href: 'https://www.linkedin.com/in/aung-myint-myat-305316189/',
    icon: 'fab fa-linkedin',
    hoverColor: '#60a5fa',
  },
  {
    name: 'LINE',
    sub: '@aungdoublem',
    href: 'https://line.me/ti/p/aungdoublem',
    icon: 'fab fa-line',
    hoverColor: '#4ade80',
  },
  {
    name: 'WhatsApp',
    sub: '+66 98 454 4058',
    href: 'https://wa.me/+66984544058',
    icon: 'fab fa-whatsapp',
    hoverColor: '#34d399',
  },
  {
    name: 'Email',
    sub: 'aungmyintmyatchauk@gmail.com',
    href: 'mailto:aungmyintmyatchauk@gmail.com',
    icon: 'fas fa-envelope',
    hoverColor: '#22d3ee',
  },
  {
    name: 'GitHub',
    sub: 'Code Respositories',
    href: 'https://github.com/Aungmm1298',
    icon: 'fab fa-github',
    hoverColor: '#cbd5e1',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-32 px-4 sm:px-6 scroll-reveal reveal-scale">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-num">06 /</span>
          <h2 className="text-2xl md:text-3xl">Contact</h2>
          <div className="flex-1" style={{ height: '1px', background: '#1e293b' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left */}
          <div>
            <h3 className="text-2xl mb-4">Let&apos;s work together</h3>
            <p className="leading-relaxed mb-10 max-w-md" style={{ color: '#050505ff' }}>
              Whether you have a cloud project, a collaboration opportunity, or just want to say
              hello — my inbox is always open.
            </p>
          </div>

          {/* Right */}
          <div>
            <p
              className="text-sm mb-6"
              style={{ color: '#475569', fontFamily: 'monospace' }}
            >
              Social Links
            </p>
            <div className="flex flex-wrap gap-4 stagger-parent">
              {SOCIALS.map(({ name, href, icon, hoverColor }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: '#131b2c',
                    border: '1px solid transparent',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = hoverColor;
                    e.currentTarget.style.boxShadow = `0 4px 25px ${hoverColor}25, 0 0 0 1px ${hoverColor}25`;
                    e.currentTarget.style.background = `${hoverColor}10`;
                    e.currentTarget.querySelector('.social-icon').style.color = hoverColor;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                    e.currentTarget.style.background = '#131b2c';
                    e.currentTarget.querySelector('.social-icon').style.color = '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i
                    className={`${icon} text-[1.4rem] social-icon transition-colors duration-300`}
                    style={{ color: '#94a3b8' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
