export default function ParticleBackground() {
  const layers = [
    { tone: "code" },
    { tone: "build" },
    { tone: "registry" },
    { tone: "deploy" },
  ];

  const lanes = [
    { className: "hero-workflow-lane--top", top: "23%", left: "13%", width: "74%" },
    { className: "hero-workflow-lane--middle", top: "35%", left: "18%", width: "62%" },
    { className: "hero-workflow-lane--bottom", top: "47%", left: "24%", width: "50%" },
  ];

  const containers = [
    { tone: "code", top: "20%", left: "10%", delay: "-0s" },
    { tone: "build", top: "32%", left: "10%", delay: "-1.6s" },
    { tone: "deploy", top: "44%", left: "10%", delay: "-3.1s" },
  ];

  const signals = [
    { className: "hero-workflow-signal--one", top: "22%", left: "18%", width: "18%" },
    { className: "hero-workflow-signal--two", top: "34%", left: "38%", width: "20%" },
    { className: "hero-workflow-signal--three", top: "46%", left: "56%", width: "14%" },
  ];

  return (
    <div className="hero-cloud-bg" aria-hidden="true">
      <div className="hero-cloud-bg__base" />
      <div className="hero-cloud-bg__grid" />
      <div className="hero-cloud-bg__grid hero-cloud-bg__grid--soft" />
      <div className="hero-cloud-bg__glow hero-cloud-bg__glow--left" />
      <div className="hero-cloud-bg__glow hero-cloud-bg__glow--right" />

      <div className="hero-cloud-bg__center-clear" />

      <div className="hero-cloud-bg__clouds">
        <div className="hero-cloud-bg__cloud hero-cloud-bg__cloud--one" />
        <div className="hero-cloud-bg__cloud hero-cloud-bg__cloud--two" />
        <div className="hero-cloud-bg__cloud hero-cloud-bg__cloud--three" />
      </div>

      <div className="hero-cloud-bg__workflow">
        <div className="hero-cloud-bg__workflow-track" />
        {lanes.map((lane) => (
          <span
            key={lane.className}
            className={`hero-workflow-lane ${lane.className}`}
            style={{ top: lane.top, left: lane.left, width: lane.width }}
          />
        ))}

        {containers.map((container) => (
          <div key={`${container.tone}-${container.delay}`} className={`hero-workflow-container hero-workflow-container--${container.tone}`} style={{ top: container.top, left: container.left, animationDelay: container.delay }}>
            <span className="hero-workflow-container__icon" />
          </div>
        ))}

        {signals.map((signal) => (
          <span key={signal.className} className={`hero-workflow-signal ${signal.className}`} style={{ top: signal.top, left: signal.left, width: signal.width }} />
        ))}
      </div>

      <div className="hero-cloud-bg__infra">
        {layers.map((layer) => (
          <div key={layer.tone} className={`hero-cloud-bg__infra-card hero-cloud-bg__infra-card--${layer.tone}`} />
        ))}
      </div>

      <div className="hero-cloud-bg__panel hero-cloud-bg__panel--left" />
      <div className="hero-cloud-bg__panel hero-cloud-bg__panel--right" />

      <div className="hero-cloud-bg__vignette" />
    </div>
  );
}
