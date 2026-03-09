import { useEffect } from "react";
import dynamic from "next/dynamic";
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Cursor spotlight
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -10px 0px" }
    );
    document.querySelectorAll(".scroll-reveal, .card-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ overflowX: 'hidden', position: 'relative', width: '100%' }}>
      {/* Vanta CLOUDS2 background */}
      <ParticleBackground />

      {/* Aurora background orbs */}
      <div className="aurora-root" aria-hidden="true" style={{ overflow: 'hidden' }}>
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />

        {/* Cursor spotlight */}
        <div className="cursor-spotlight" />

        {/* Floating particles */}
        <div className="particles">
          {[
            { left:'7%',  s:2, dur:'13s', del:'0s'   },
            { left:'16%', s:3, dur:'19s', del:'2.1s' },
            { left:'25%', s:2, dur:'15s', del:'4.8s' },
            { left:'34%', s:2, dur:'22s', del:'1.4s' },
            { left:'46%', s:3, dur:'14s', del:'6.2s' },
            { left:'55%', s:2, dur:'18s', del:'3.5s' },
            { left:'63%', s:2, dur:'12s', del:'8s'   },
            { left:'72%', s:3, dur:'20s', del:'0.7s' },
            { left:'81%', s:2, dur:'16s', del:'5.3s' },
            { left:'90%', s:2, dur:'11s', del:'2.9s' },
            { left:'11%', s:2, dur:'24s', del:'9.1s' },
            { left:'42%', s:3, dur:'17s', del:'4s'   },
          ].map((p, i) => (
            <span key={i} className="particle" style={{
              left: p.left, bottom: '-6px',
              width: `${p.s}px`, height: `${p.s}px`,
              background: i % 3 === 0
                ? 'rgba(34,211,238,0.75)'
                : i % 3 === 1
                ? 'rgba(129,140,248,0.7)'
                : 'rgba(74,222,128,0.65)',
              animationDuration: p.dur,
              animationDelay: p.del,
            }} />
          ))}
        </div>

        {/* Page-load scan line */}
      </div>
      <div className="content">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
