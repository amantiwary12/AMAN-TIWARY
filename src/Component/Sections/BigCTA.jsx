import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   BigCTA — pinned scroll-assembly finale.

   Same DNA as the Hero3D fly-through: the section pins to the
   screen and the scrollbar drives a scrubbed timeline. The
   letters of "Have an idea?" start scattered deep in 3D space
   (random z / x / y / rotation, blurred) and fly together into
   the headline as you scroll. Then "Let's build it together."
   rises word-by-word out of masks, and finally the badge +
   buttons fade up. A star field drifts and a pointer tilt
   sells the depth — just like the hero.
   ───────────────────────────────────────────────────────────── */

const LINE1 = "Have an idea?";
const LINE2_WORDS = ["Let's", "build", "it", "together."];

/* deterministic pseudo-random so the layout is identical every load */
const makeRand = () => {
  let s = 7;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const BigCTA = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  /* background star field */
  const stars = useMemo(() => {
    const r = makeRand();
    return Array.from({ length: 34 }, () => ({
      x: r() * 100,
      y: r() * 100,
      s: 1.5 + r() * 2.5,
      warm: r() < 0.25,
      tw: 2 + r() * 3.5,
      drift: 40 + r() * 120, /* px of upward parallax across the pin */
    }));
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return; /* content renders in its final state, no pin */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* 1 — letters fly in from scattered deep space */
      tl.from(".cta-ltr", {
        z: () => gsap.utils.random(-1600, -500),
        x: () => gsap.utils.random(-420, 420),
        y: () => gsap.utils.random(-260, 260),
        rotateX: () => gsap.utils.random(-95, 95),
        rotateY: () => gsap.utils.random(-95, 95),
        opacity: 0,
        filter: "blur(7px)",
        ease: "power2.out",
        stagger: { each: 0.09, from: "random" },
        duration: 2.2,
      })
        /* 2 — second line rises out of its masks word-by-word */
        .from(
          ".cta-word",
          {
            yPercent: 130,
            rotate: 5,
            ease: "power3.out",
            stagger: 0.18,
            duration: 1,
          },
          "-=0.7"
        )
        /* 3 — label, badge & buttons fade up */
        .from(
          ".cta-fade",
          {
            y: 42,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.14,
            duration: 0.9,
          },
          "-=0.35"
        )
        /* glow breathes open across the whole journey */
        .to(".cta-glow", { opacity: 1, scale: 1.25, ease: "none", duration: 3.4 }, 0)
        /* the scroll hint dies as soon as the journey starts */
        .to(".cta-hint", { opacity: 0, duration: 0.25 }, 0);

      /* star parallax — each star drifts up a different amount, scrubbed */
      stars.forEach((st, i) => {
        tl.to(`.cta-star-${i}`, { y: -st.drift, ease: "none", duration: 3.4 }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stars]);

  /* pointer tilt, same feel as the hero fly-through */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(stage, {
        rotateY: x * 3.5,
        rotateX: -y * 2.5,
        transformPerspective: 1100,
        duration: 0.7,
        ease: "power2.out",
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden dot-grid">
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "100vh", perspective: "1100px" }}
      >
        {/* glow */}
        <div
          className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] h-[55vw] max-h-[420px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(238,91,46,0.13) 0%, transparent 70%)",
            opacity: 0.35,
          }}
        />

        {/* star field */}
        {stars.map((st, i) => (
          <span
            key={i}
            className={`cta-star cta-star-${i}`}
            style={{
              left: `${st.x.toFixed(1)}%`,
              top: `${st.y.toFixed(1)}%`,
              width: st.s,
              height: st.s,
              "--tw": `${st.tw.toFixed(2)}s`,
              background: st.warm ? "#ee5b2e" : "rgba(236,231,222,0.85)",
              boxShadow: st.warm ? "0 0 6px rgba(238,91,46,0.8)" : "none",
            }}
          />
        ))}

        {/* tilting stage */}
        <div ref={stageRef} className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          <span className="cta-fade section-label justify-center">Next Step</span>

          {/* availability badge */}
          <div className="cta-fade mt-5 flex justify-center">
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

          {/* line 1 — letters assemble from 3D space */}
          <h2
            className="mt-8 font-black text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)", transformStyle: "preserve-3d" }}
          >
            {LINE1.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <span key={i} className="cta-ltr">{ch}</span>
              )
            )}
          </h2>

          {/* line 2 — words rise out of masks */}
          <h2
            className="g-text leading-[1.08]"
            style={{ fontSize: "clamp(2.2rem, 5.8vw, 4.4rem)" }}
          >
            {LINE2_WORDS.map((w, i) => (
              <span key={i} className="cta-wordmask" style={{ marginRight: "0.24em" }}>
                <span className="cta-word">{w}</span>
              </span>
            ))}
          </h2>

          {/* CTAs */}
          <div className="cta-fade mt-10 flex flex-wrap gap-4 justify-center">
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

        {/* scroll hint */}
        <div className="cta-hint absolute bottom-24 left-1/2 -translate-x-1/2">
          scroll — the idea takes shape
        </div>

        {/* sideways-scrolling band pinned to the bottom of the stage */}
        <div className="absolute bottom-0 left-0 right-0 pb-4">
          <Marquee
            items={["LET'S WORK TOGETHER", "OPEN TO OPPORTUNITIES", "MERN STACK DEVELOPER"]}
            baseSpeed={10}
            direction={-1}
            outlined
          />
        </div>
      </div>
    </section>
  );
};

export default BigCTA;
