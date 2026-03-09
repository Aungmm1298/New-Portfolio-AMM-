import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "#home",         label: "Home" },
  { href: "#about",        label: "About" },
  { href: "#work",         label: "Work" },
  { href: "#skills",       label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState(null);

  /* Active section tracker */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { threshold: 0.35, rootMargin: "-80px 0px -20% 0px" }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);



  return (
    <>
      {/* ── DESKTOP SEPARATED ISLANDS ── */}
      <div
        className="hidden md:flex flex-col nav-entrance"
        style={{
          position: "fixed",
          top: "24px", left: 0, right: 0,
          zIndex: 50,
          pointerEvents: "none",
          alignItems: "center",
        }}
      >
        <div style={{
          width: "100%",
          maxWidth: "1340px",
          padding: "0 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}>
          
          {/* LEFT ISLAND: Logo (Removed per request, kept placeholder for centering) */}
          <div style={{ width: "150px", pointerEvents: "none" }} />

          {/* CENTER ISLAND: Navigation Links */}
          <nav
            style={{
              position: "relative",
              pointerEvents: "auto",
              background: "transparent",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = active === href;
              const isHovered = hovered === href;
              return (
                <a
                  key={href}
                  href={href}
                  data-href={href}
                  style={{
                    position: "relative", zIndex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "10px 24px",
                    color: (isActive || isHovered) ? "#f97316" : "#0f172a",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: (isActive || isHovered) ? 600 : 500,
                    transition: "color 0.2s ease, font-weight 0.2s ease",
                  }}
                  onMouseEnter={() => setHovered(href)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", color: "#f97316", pointerEvents: "none", zIndex: -1 }}>
                    <path 
                      d="M 12,32 C 2,22 10,4 50,4 C 85,4 98,12 95,25 C 90,40 20,40 10,25 C 5,15 15,6 30,5" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      style={{
                        strokeDasharray: "250",
                        strokeDashoffset: (isActive || isHovered) ? "0" : "250",
                        transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </svg>
                  <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT ISLAND: CTA Button */}
          <div
            style={{
              pointerEvents: "auto",
              padding: "6px",
            }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.05rem",
                fontWeight: 700,
                padding: "10px 26px",
                borderRadius: "999px",
                background: "linear-gradient(to right, #14c785, #08addb)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.background = "linear-gradient(to right, #10b981, #06b6d4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "linear-gradient(to right, #14c785, #08addb)";
              }}
            >
              Let's Talk
            </a>
          </div>

        </div>
      </div>

    </>
  );
}
