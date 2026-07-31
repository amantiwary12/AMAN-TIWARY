import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

const BigCTA = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(linesRef.current.children, {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.14,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden dot-grid">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[55vw] max-h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(238,91,46,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <span className="section-label justify-center">Next Step</span>

        {/* availability badge — tells visitors instantly that reaching out is welcome */}
        <div className="mt-5 flex justify-center">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text)",
              background: "rgba(238, 91, 46, 0.06)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
            />
            Open to full-time roles &amp; freelance projects
          </span>
        </div>

        <div ref={linesRef} className="mt-6 mb-10 overflow-hidden">
          <h2
            className="font-black text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Have an idea?
          </h2>
          <h2
            className="font-black leading-[1.05] tracking-tight g-text"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Let's build it together.
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="btn-primary" style={{ padding: "14px 34px" }}>
            Get In Touch
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="mailto:amantiwary2505@gmail.com"
            className="btn-outline"
            style={{ padding: "14px 34px" }}
          >
            amantiwary2505@gmail.com
          </a>
        </div>
      </div>

      {/* Sideways-scrolling band */}
      <div className="mt-24">
        <Marquee
          items={["LET'S WORK TOGETHER", "OPEN TO OPPORTUNITIES", "MERN STACK DEVELOPER"]}
          baseSpeed={10}
          direction={-1}
          outlined
        />
      </div>
    </section>
  );
};

export default BigCTA;
