import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
];

function OrbitMark() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let frameId;
    let renderer;
    let scene;
    let geometry;
    let material;

    const start = async () => {
      const module = await import("three");
      const THREE = module.default || module;
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(48, 48, false);

      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.z = 4;

      const positions = [];
      for (let i = 0; i < 42; i += 1) {
        const angle = (i / 42) * Math.PI * 2;
        const radius = 1.15 + Math.sin(i * 2.7) * 0.11;
        positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, Math.sin(i * 1.8) * 0.18);
      }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      material = new THREE.PointsMaterial({ color: "#67e8f9", size: 0.09, transparent: true, opacity: 0.9 });
      const orbit = new THREE.Points(geometry, material);
      scene.add(orbit);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const render = () => {
        if (disposed) return;
        if (!reduceMotion) {
          orbit.rotation.z += 0.014;
          orbit.rotation.x = Math.sin(Date.now() * 0.001) * 0.35;
        }
        renderer.render(scene, camera);
        if (!reduceMotion) frameId = requestAnimationFrame(render);
      };
      render();
    };

    start();
    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width="48" height="48" aria-hidden="true" style={{ width: 48, height: 48, flexShrink: 0 }} />;
}

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { threshold: 0.35, rootMargin: "-80px 0px -20% 0px" }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 28);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const linkStyle = (href) => ({
    color: active === href ? "#cffafe" : "#94a3b8",
    background: active === href ? "rgba(34, 211, 238, 0.12)" : "transparent",
  });

  const showSurface = isScrolled || isHovered;

  return (
    <header
      className="hidden md:block fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6 nav-entrance"
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="mx-auto max-w-7xl rounded-2xl"
        style={{
          background: "transparent",
          border: "none",
          boxShadow: showSurface ? "0 10px 34px rgba(0, 0, 0, 0.22), 0 0 22px rgba(34, 211, 238, 0.06)" : "none",
          backdropFilter: showSurface ? "blur(12px)" : "none",
          transform: showSurface ? "translateY(-3px)" : "translateY(0)",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between h-16 px-3 sm:px-4">
          <a href="#home" className="flex items-center gap-2 min-w-0">
            <OrbitMark />
            <span className="leading-tight">
              <span className="block text-sm font-bold" style={{ color: "#f1f5f9" }}>Aung Myint Myat</span>
              <span className="block text-[0.62rem] tracking-[0.16em]" style={{ color: "#67e8f9" }}>CLOUD ENGINEER</span>
            </span>
          </a>

          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} style={linkStyle(href)} className="rounded-full px-3 py-2 text-sm transition-colors duration-200">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="inline-flex btn-primary" style={{ padding: "0.6rem 1rem" }}>
              Let&apos;s Talk <i className="fas fa-arrow-up-right-from-square text-xs" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
