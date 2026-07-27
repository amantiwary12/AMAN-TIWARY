import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HangingPhoto from "./HangingPhoto";
import Typing from "../../UI/Typing";
import MultiC from "../../Pages/MultiCard/MultiC";
import Footer from "../Navbar/Footer";
import Marquee from "../Sections/Marquee";
import AboutMe from "../Sections/AboutMe";
import Skills from "../Sections/Skills";
import Experience from "../Sections/Experience";
import BigCTA from "../Sections/BigCTA";
import { useIntroReady } from "../Preloader/IntroContext";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { n: "06+", label: "Projects Built" },
  { n: "01+", label: "Years Exp." },
  { n: "15+", label: "Technologies" },
];

const techStack = ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "Git"];

const Firstpage = () => {
  const heroRef   = useRef(null);
  const badgeRef  = useRef(null);
  const h1Ref     = useRef(null);
  const subRef    = useRef(null);
  const descRef   = useRef(null);
  const ctaRef    = useRef(null);
  const statsRef  = useRef(null);
  const photoRef  = useRef(null);
  const stackRef  = useRef(null);
  const introReady = useIntroReady();
  const heroTlRef = useRef(null);

  /* ── Hero entrance ── built paused, immediately on mount, so GSAP's
     immediateRender hides the elements right away (no flash of static
     content behind the preloader). It only *plays* once the preloader
     curtain starts lifting, so the page visibly animates into place
     as the name clears instead of sitting there already finished. ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Built running (not paused: true) so GSAP synchronously renders
      // frame 0 — the hidden "from" state — right here, before the
      // browser paints. Pausing immediately after freezes it there
      // until .play() is called on reveal.
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

      tl.from(badgeRef.current, { y: -16, opacity: 0, duration: 0.5 })
        .from(
          h1Ref.current.querySelector(".hero-script"),
          { y: 40, opacity: 0, rotate: -12, scale: 0.8, duration: 0.8 },
          "-=0.2"
        )
        .from(
          h1Ref.current.querySelectorAll(".hero-letter"),
          {
            y: 90,
            opacity: 0,
            rotateX: -85,
            transformPerspective: 700,
            filter: "blur(8px)",
            stagger: 0.05,
            duration: 1,
            clearProps: "transform,opacity,filter",
          },
          "-=0.45"
        )
        .from(subRef.current, { y: 30, opacity: 0 }, "-=0.5")
        .from(descRef.current, { y: 20, opacity: 0 }, "-=0.6")
        .from(ctaRef.current.children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.5")
        .from(statsRef.current.children, { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.35")
        .from(photoRef.current, { scale: 0.82, opacity: 0, rotate: -4, duration: 1.2 }, "-=1.3")
        .from(stackRef.current.children, { y: 10, opacity: 0, stagger: 0.06, duration: 0.4 }, "-=0.6")
        .pause(0);

      heroTlRef.current = tl;
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (introReady) heroTlRef.current?.play();
  }, [introReady]);

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
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center dot-grid overflow-hidden pt-16"
      >
        {/* Subtle glow blobs — static, no animation */}
        <div
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-96 max-h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(238,91,46,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] max-w-80 max-h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(224,180,100,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Content ── */}
            <div>
              {/* Available badge */}
              <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#34d399" }}
                >
                  Available for work
                </span>
              </div>

              {/* Heading */}
              <div ref={h1Ref} className="mb-2" style={{ perspective: "800px" }}>
                <span className="hero-script block mb-2">Hi, I'm</span>
                <h1
                  className="hero-name hero-reflect leading-[1.02]"
                  style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
                >
                  <span className="block">
                    {"Aman".split("").map((ch, i) => (
                      <span
                        key={i}
                        className="hero-letter hero-letter-grad"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                  <span className="block text-white">
                    {"Tiwary.".split("").map((ch, i) => (
                      <span
                        key={i}
                        className={`hero-letter${ch === "." ? " hero-letter-grad" : ""}`}
                        style={ch === "." ? { animationDelay: `${(i + 4) * 0.12}s` } : undefined}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>

              {/* Typing */}
              <div ref={subRef} className="mb-5">
                <Typing />
              </div>

              {/* Description */}
              <p ref={descRef} className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "var(--muted)" }}>
                MERN Stack Developer building real-time industrial IoT dashboards, ERP modules,
                and SaaS platforms at Aartech Solonics. I ship secure REST APIs and
                pixel-perfect, production-ready applications from design to deployment.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-wrap gap-3 mb-12">
                <Link to="/projects" className="btn-primary">
                  View Projects
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://drive.google.com/file/d/1Y8Ppa4AaT1RGtoHPC04PkJpQ1wngPiJK/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Download Resume
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="flex flex-wrap gap-8">
                {stats.map((s) => (
                  <div key={s.n}>
                    <div className="stat-num">
                      {s.n.replace("+", "")}<em>+</em>
                    </div>
                    <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: "var(--muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Photo + stack ── */}
            <div className="flex flex-col items-center lg:items-end gap-8">
              {/* Photo — polaroid hanging on a rope; drag it and it
                  springs back (see HangingPhoto.jsx) */}
              <div ref={photoRef}>
                <HangingPhoto />
              </div>

              {/* Tech stack chips */}
              <div ref={stackRef} className="flex flex-wrap gap-2 justify-center lg:justify-end max-w-xs">
                {techStack.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "var(--muted)" }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </section>

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

      {/* ══════════════ BIG CTA ══════════════ */}
      <BigCTA />

      {/* ══════════════ FOOTER ══════════════ */}
      <Footer />
    </div>
  );
};

export default Firstpage;
