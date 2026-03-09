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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

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

      {/* ── MOBILE NAVBAR MODULE ── */}
      <div className="md:hidden nav-entrance" style={{
        position: "fixed",
        top: "16px", left: "16px", right: "16px",
        zIndex: 50,
        pointerEvents: "none",
      }}>
        {/* Mobile Island */}
        <div style={{
          pointerEvents: "auto",
          background: "transparent",
          padding: "10px 16px 10px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo (Removed per request) */}
          <div style={{ width: "32px", pointerEvents: "none" }} />

          {/* Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "50%",
              width: "40px", height: "40px",
              cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "5px",
              transition: "background 0.3s ease",
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#0f172a", borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#0f172a", borderRadius: "2px",
              transition: "all 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "18px", height: "2px",
              background: "#0f172a", borderRadius: "2px",
              transition: "all 0.3s ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <div style={{
          position: "absolute",
          top: "100%", left: 0, right: 0,
          marginTop: "12px",
          pointerEvents: menuOpen ? "auto" : "none",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "24px",
          padding: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)",
          opacity: menuOpen ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "top center",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive = active === href;
              return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  color: isActive ? "#f97316" : "#0f172a",
                  fontSize: "1.1rem",
                  fontWeight: isActive ? 600 : 500,
                  transition: "all 0.2s ease",
                  transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                  opacity: menuOpen ? 1 : 0,
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", left: "20%", right: "20%", top: "5px", bottom: "5px", width: "60%", height: "calc(100% - 10px)", overflow: "visible", color: "#f97316", pointerEvents: "none", zIndex: -1 }}>
                  <path 
                    d="M 12,32 C 2,22 10,4 50,4 C 85,4 98,12 95,25 C 90,40 20,40 10,25 C 5,15 15,6 30,5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{
                      strokeDasharray: "250",
                      strokeDashoffset: isActive ? "0" : "250",
                      transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                    }}
                  />
                </svg>
                <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
              </a>
            )})}
          </div>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              color: "#fff",
              fontSize: "1.05rem",
              fontWeight: 700,
              padding: "12px",
              margin: "16px",
              borderRadius: "999px",
              background: "linear-gradient(to right, #14c785, #08addb)",
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              opacity: menuOpen ? 1 : 0,
              transition: "all 0.3s ease",
              transitionDelay: `${NAV_LINKS.length * 0.05}s`,
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
}
