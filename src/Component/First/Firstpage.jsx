import React, { useEffect } from "react";
import Hero3D from "./Hero3D";
import HeroClassic from "./HeroClassic";
import MultiC from "../../Pages/MultiCard/MultiC";
import Footer from "../Navbar/Footer";
import Marquee from "../Sections/Marquee";
import AboutMe from "../Sections/AboutMe";
import Skills from "../Sections/Skills";
import Experience from "../Sections/Experience";
import Testimonials from "../Sections/Testimonials";
import BigCTA from "../Sections/BigCTA";

const Firstpage = () => {
  /* ── Scroll reveal for sections below hero ── */
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* ══════════════ HERO ══════════════ */}
      {/* Mobile → the original static hero; Desktop → 3D fly-through */}
      <div className="lg:hidden">
        <HeroClassic />
      </div>
      <div className="hidden lg:block">
        <Hero3D />
      </div>

      {/* ══════════════ SIDEWAYS MARQUEE BAND ══════════════ */}
      <div className="py-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Marquee
          items={["MERN STACK DEVELOPER", "REACT.JS", "NODE.JS", "MONGODB", "REST APIS", "REAL-TIME DASHBOARDS"]}
          baseSpeed={9}
        />
      </div>

      {/* ══════════════ ABOUT ME — sliding photo ══════════════ */}
      <AboutMe />

      {/* ══════════════ SKILLS ══════════════ */}
      <Skills />

      {/* ══════════════ EXPERIENCE ══════════════ */}
      <Experience />

      {/* ══════════════ FEATURED PROJECTS ══════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
        <div className="reveal mb-12">
          <span className="section-label">Work</span>
          <h2 className="text-4xl font-bold text-white mt-3">
            Featured <span className="g-text">Projects</span>
          </h2>
          <p className="mt-3 max-w-lg" style={{ color: "var(--muted)" }}>
            A selection of recent work — full-stack SaaS platforms, industrial IoT dashboards, and more.
          </p>
        </div>
        <MultiC />
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <Testimonials />

      {/* ══════════════ BIG CTA ══════════════ */}
      <BigCTA />

      {/* ══════════════ FOOTER ══════════════ */}
      <Footer />
    </div>
  );
};

export default Firstpage;
