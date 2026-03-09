const SERVICES = [
  {
    title: 'Cloud Architecture',
    description: 'Design scalable and resilient cloud infrastructure tailored to your business needs.',
    gradient: 'from-blue-500 to-cyan-500',
    icon: 'fas fa-cloud',
  },
  {
    title: 'Cloud Migration',
    description: 'Seamless migration of applications and data to cloud platforms with minimal downtime.',
    gradient: 'from-purple-500 to-pink-500',
    icon: 'fas fa-exchange-alt',
  },
  {
    title: 'DevOps Implementation',
    description: 'Automate deployment pipelines and infrastructure with modern DevOps practices.',
    gradient: 'from-orange-500 to-red-500',
    icon: 'fas fa-cogs',
  },
  {
    title: 'Cost Optimization',
    description: 'Reduce cloud spending while maintaining performance through strategic optimization.',
    gradient: 'from-green-500 to-emerald-500',
    icon: 'fas fa-chart-line',
  },
];

function ServiceCard({ title, description, gradient, icon }) {
  return (
    <div className="card rounded-2xl md:rounded-3xl p-5 md:p-8 hover:scale-105 transition-all group">
      <div
        className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}
      >
        <i className={`${icon} text-white text-xl md:text-2xl`} />
      </div>
      <h3 className="text-lg md:text-xl font-display mb-2 md:mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 scroll-reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">WHAT I OFFER</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display mb-4">
            Cloud Solutions &amp; <span className="italic gradient-text">Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map(s => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
