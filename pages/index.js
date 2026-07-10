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
      <ParticleBackground />
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
