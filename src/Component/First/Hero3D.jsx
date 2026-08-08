import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import HangingPhoto from "./HangingPhoto";
import Typing from "../../UI/Typing";
import { useIntroReady } from "../Preloader/IntroContext";

/* ─────────────────────────────────────────────────────────────
   Hero3D — dungyov.com-style 3D scroll fly-through.

   Instead of WebGL, this uses plain CSS 3D transforms: a sticky
   full-screen "stage" with `perspective`, a `preserve-3d` scene,
   and content sections pinned at different depths along -Z.

   As the visitor scrolls, the scene translates forward along Z:
   the section that's up next comes at you from the distance,
   grows through the middle of the screen, and once it passes the
   camera it keeps growing until it scrolls out of the frame.
   The section list loops — after the last section the intro
   comes forward again before the hero hands off to the rest of
   the page. A pointer tilt + floating particles sell the depth.

   Fully self-contained: only used by the home hero. Nothing else
   in the app is touched.
   ───────────────────────────────────────────────────────────── */

const stats = [
  { n: "06+", label: "Projects Built" },
  { n: "01+", label: "Years Exp." },
  { n: "15+", label: "Technologies" },
];

const techStack = ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "Git"];

const TRAVEL = 2400; /* depth between sections — bigger gap = longer, slower approach */

/* base layout: each section sits one TRAVEL unit deeper along -Z,
   with a small x/y drift so the camera path meanders like dungyov */
const LAYOUT = [
  { key: "intro", label: "Intro", x: 0, y: 0 },
  { key: "about", label: "About", x: 26, y: -56 },
  { key: "stats", label: "Stats", x: -34, y: 44 },
  { key: "photo", label: "Photo", x: 16, y: -34 },
  { key: "outro", label: "How I work", x: 0, y: 26 },
];

/* ── the sections, plus a duplicate intro at the very end so the
      journey loops back to the start ── */
const SECTIONS = [
  ...LAYOUT.map((s, i) => ({ ...s, z: -i * TRAVEL })),
  { ...LAYOUT[0], key: "intro-loop", z: -LAYOUT.length * TRAVEL },
];

/* fade window around the camera plane. A section is:
     invisible   while far away              (eff < APPROACH_FAR)
     fading in   as it approaches from space (APPROACH_FAR → APPROACH_NEAR)
     fully open  while it reads              (APPROACH_NEAR → PASS_START)
     fading out  as you cross THROUGH it     (PASS_START → PASS_END)

   The "cross through it" feeling comes from the exit window: content
   stays fully open until it has grown to ~2.4x (which fills the whole
   screen, so you're inside it), then keeps zooming to ~6x as it blows
   past the camera and scrolls out past every edge of the screen.
   With a 1200px perspective the scale at position `eff` is
   `1200 / (1200 - eff)`. */
const APPROACH_FAR = -2000;
const APPROACH_NEAR = -850;
const PASS_START = 700;
const PASS_END = 1000;

const TOTAL = -SECTIONS[SECTIONS.length - 1].z + PASS_END; /* travel + room for the loop section to blow past too */

const smoothstep = (t) => t * t * (3 - 2 * t);

/* deterministic pseudo-random so the tunnel looks the same every load */
const makeRand = () => {
  let s = 42;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const Hero3D = () => {
  const outerRef = useRef(null); /* the scroll spacer             */
  const sceneRef = useRef(null); /* preserve-3d scene             */
  const introInnerRef = useRef(null);
  const hintRef = useRef(null);
  const fillRef = useRef(null);
  const layerRefs = useRef({});
  const labelRefs = useRef({});
  const tlRef = useRef(null);
  const introReady = useIntroReady();

  /* star field — lives INSIDE the 3D scene, spread along the whole
     journey's depth, so every star approaches, zooms past the camera
     and fades exactly like the content layers do */
  const stars = useMemo(() => {
    const r = makeRand();
    return Array.from({ length: 140 }, () => ({
      x: r() * 100,                      /* viewport %                    */
      y: r() * 100,
      z: -r() * (TOTAL + PASS_END),      /* depth along the flight path   */
      s: 1.2 + r() * 2.6,                /* px — perspective does the rest */
      o: 0.45 + r() * 0.5,
      warm: r() < 0.22,                  /* some accent-coloured stars    */
      tw: 2.2 + r() * 3.5,               /* twinkle duration              */
      delay: r() * 4,
      el: null,
    }));
  }, []);

  /* flight-path trail — a dotted line winding from the first section to
     the last. Sine waves make it meander left/right and up/down instead
     of going straight, and because it sits inside the scene it only
     travels when you scroll. */
  const trail = useMemo(() => {
    const COUNT = 120;
    const DEPTH = LAYOUT.length * TRAVEL; /* first → last content */
    return Array.from({ length: COUNT }, (_, i) => {
      const t = i / (COUNT - 1);
      return {
        x: 50 + Math.sin(t * Math.PI * 3.2) * 16 + Math.sin(t * Math.PI * 7.1) * 5,
        y: 50 + Math.cos(t * Math.PI * 2.4) * 13 + Math.sin(t * Math.PI * 5.3) * 6,
        z: -t * DEPTH,
        s: 3.5 + Math.sin(t * Math.PI * 11) * 1.2, /* gentle size ripple */
        el: null,
      };
    });
  }, []);

  /* ── entrance ── mirrors the old hero: built paused on mount so
     the hidden from-state renders behind the preloader (no flash),
     then plays when the preloader curtain starts lifting ── */
  useEffect(() => {
    const scope = introInnerRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const one = (sel) => scope.querySelector(sel);
      const many = (sel) => scope.querySelectorAll(sel);

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      tl.from(one(".h3d-badge"), { y: -16, opacity: 0, duration: 0.5 })
        .from(
          one(".hero-script"),
          { y: 40, opacity: 0, rotate: -12, scale: 0.8, duration: 0.8 },
          "-=0.2"
        )
        .from(
          many(".hero-letter"),
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
        .from(one(".h3d-typing"), { y: 30, opacity: 0 }, "-=0.5")
        .pause(0);

      tlRef.current = tl;
    }, scope);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (introReady) tlRef.current?.play();
  }, [introReady]);

  /* ── scroll driver: progress → scene Z, layer fade, HUD state ── */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let p = 0;           /* smoothed progress 0..1     */
    let mx = 0, my = 0;  /* smoothed pointer           */
    let tx = 0, ty = 0;  /* raw pointer                */

    const onPointer = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const tick = () => {
      const outer = outerRef.current;
      if (outer) {
        const rect = outer.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const raw = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
        p += (raw - p) * 0.09;

        const z = p * TOTAL;
        mx += ((reduce ? 0 : tx) - mx) * 0.045;
        my += ((reduce ? 0 : ty) - my) * 0.045;
        scene.style.transform = `translateZ(${z.toFixed(2)}px) rotateY(${(mx * 1.8).toFixed(3)}deg) rotateX(${(-my * 1.4).toFixed(3)}deg)`;

        /* HUD active section — wraps around so "Intro" lights up
           again when the loop brings it back */
        const active = Math.round(p * (SECTIONS.length - 1)) % LAYOUT.length;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p.toFixed(3)})`;
        if (hintRef.current) hintRef.current.style.opacity = p > 0.02 ? "0" : "1";
        LAYOUT.forEach((_, i) => {
          const lbl = labelRefs.current[i];
          if (lbl) lbl.classList.toggle("active", i === active);
        });

        SECTIONS.forEach((s, i) => {
          const el = layerRefs.current[i];
          if (!el) return;
          const eff = z + s.z; /* depth relative to the camera plane */
          let o;
          if (eff < APPROACH_FAR) o = 0;
          else if (eff < APPROACH_NEAR) o = (eff - APPROACH_FAR) / (APPROACH_NEAR - APPROACH_FAR);
          else if (eff < PASS_START) o = 1;
          else if (eff < PASS_END) o = 1 - (eff - PASS_START) / (PASS_END - PASS_START);
          else o = 0;
          o = smoothstep(o);

          el.style.opacity = o.toFixed(3);
          el.style.transform = `translateX(${s.x}px) translateY(${s.y}px) translateZ(${s.z}px)`;
          el.style.visibility = o < 0.01 ? "hidden" : "visible";
          el.style.pointerEvents = o > 0.5 ? "auto" : "none";
        });

        /* stars ride the scene's Z-translate for free (they're inside
           it) — here we only fade them out as they cross the camera
           plane, so they streak past and vanish instead of popping */
        stars.forEach((st) => {
          const el = st.el;
          if (!el) return;
          const eff = z + st.z; /* depth relative to the camera plane */
          let o;
          if (eff > 1000) o = 0;                                  /* blown past  */
          else if (eff > 650) o = 1 - (eff - 650) / 350;          /* flying past */
          else o = 1;                                             /* approaching */
          o = smoothstep(o) * st.o;
          el.style.opacity = o.toFixed(3);
          el.style.visibility = o < 0.01 ? "hidden" : "visible";
        });

        /* trail: only a window of the path around the camera is lit —
           dots ahead fade in from the distance, dots you've flown past
           fade out behind you, so the line appears to travel with you */
        trail.forEach((pt) => {
          const el = pt.el;
          if (!el) return;
          const eff = z + pt.z; /* depth relative to the camera plane */
          let o;
          if (eff > 300) o = 0;                                        /* passed      */
          else if (eff > 60) o = 1 - (eff - 60) / 240;                 /* passing now */
          else if (eff > -3000) o = 1;                                 /* lit ahead   */
          else if (eff > -4200) o = (eff + 4200) / 1200;               /* emerging    */
          else o = 0;
          o = smoothstep(o) * 0.7;
          el.style.opacity = o.toFixed(3);
          el.style.visibility = o < 0.01 ? "hidden" : "visible";
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [stars, trail]);

  const jumpTo = (i) => {
    const outer = outerRef.current;
    if (!outer) return;
    const scrollable = outer.offsetHeight - window.innerHeight;
    const top = outer.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (i / (LAYOUT.length - 1)) * scrollable,
      behavior: "smooth",
    });
  };

  const renderIntro = (withEntranceRef) => (
    <div className="h3d-inner">
      <div className="h3d-badge">
        <span className="h3d-dot" />
        Available for work
      </div>
      <div>
        <span className="hero-script block mb-2">Hi, I'm</span>
        <h1 className="hero-name leading-[1.02]" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
          <span className="block">
            {"Aman".split("").map((ch, i) => (
              <span key={i} className="hero-letter hero-letter-grad">{ch}</span>
            ))}
          </span>
          <span className="block text-white">
            {"Tiwary.".split("").map((ch, i) => (
              <span key={i} className={`hero-letter${ch === "." ? " hero-letter-grad" : ""}`}>{ch}</span>
            ))}
          </span>
        </h1>
      </div>
      <div className="h3d-typing">
        <Typing />
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="h3d-inner">
      <span className="section-label">About</span>
      <h2 className="h3d-title">
        Building <span className="g-text">products</span> end to end
      </h2>
      <p className="h3d-sub">
        MERN Stack Developer building real-time industrial IoT dashboards, ERP modules,
        and SaaS platforms at Aartech Solonics. I ship secure REST APIs and
        pixel-perfect, production-ready applications from design to deployment.
      </p>
      <div className="h3d-ctas">
        <Link to="/projects" className="btn-primary">
          View Projects
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <a
          href="https://drive.google.com/file/d/1O9NydPWWoIWNvhaj0189e3DPErG83Mly/view?usp=drive_link"
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
    </div>
  );

  const renderStats = () => (
    <div className="h3d-inner">
      <span className="section-label">By the numbers</span>
      <h2 className="h3d-title">A snapshot</h2>
      <div className="h3d-stats">
        {stats.map((s) => (
          <div key={s.n} className="h3d-stat">
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
  );

  const renderPhoto = () => (
    <div className="h3d-inner">
      <span className="section-label">A little about me</span>
      <HangingPhoto />
      <div className="h3d-chips">
        {techStack.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );

  const renderOutro = () => (
    <div className="h3d-inner">
      <span className="section-label">How I work</span>
      <p className="h3d-quote">
        "Clean code. Real products.
        <br />
        Relentless improvement."
      </p>
      <p className="h3d-sub">Scroll on — there's more below.</p>
    </div>
  );

  return (
    <div ref={outerRef} className="h3d">
      <div className="h3d-stage">
        {/* soft galaxy glow so the journey reads like space */}
        <div className="h3d-glow" />

        <div ref={sceneRef} className="h3d-scene">
          {/* ── star field — inside the scene so it flies with the content ── */}
          {stars.map((st, i) => (
            <div
              key={i}
              className="h3d-star"
              ref={(el) => (st.el = el)}
              style={{
                left: `${st.x.toFixed(1)}%`,
                top: `${st.y.toFixed(1)}%`,
                transform: `translate(-50%, -50%) translateZ(${st.z.toFixed(0)}px)`,
              }}
            >
              <span
                className={`h3d-star-core${st.warm ? " warm" : ""}`}
                style={{
                  width: st.s,
                  height: st.s,
                  animationDuration: `${st.tw.toFixed(2)}s`,
                  animationDelay: `-${st.delay.toFixed(2)}s`,
                }}
              />
            </div>
          ))}

          {/* ── flight-path trail — winds from first to last section ── */}
          {trail.map((pt, i) => (
            <div
              key={`t${i}`}
              className="h3d-trail"
              ref={(el) => (pt.el = el)}
              style={{
                left: `${pt.x.toFixed(2)}%`,
                top: `${pt.y.toFixed(2)}%`,
                width: pt.s,
                height: pt.s,
                transform: `translate(-50%, -50%) translateZ(${pt.z.toFixed(0)}px)`,
              }}
            />
          ))}

          {/* ── 01 · INTRO ── */}
          <div ref={(el) => (layerRefs.current[0] = el)} className="h3d-layer">
            <div ref={introInnerRef}>{renderIntro()}</div>
          </div>

          {/* ── 02 · ABOUT ── */}
          <div ref={(el) => (layerRefs.current[1] = el)} className="h3d-layer">
            {renderAbout()}
          </div>

          {/* ── 03 · STATS ── */}
          <div ref={(el) => (layerRefs.current[2] = el)} className="h3d-layer">
            {renderStats()}
          </div>

          {/* ── 04 · PHOTO ── */}
          <div ref={(el) => (layerRefs.current[3] = el)} className="h3d-layer">
            {renderPhoto()}
          </div>

          {/* ── 05 · HOW I WORK ── */}
          <div ref={(el) => (layerRefs.current[4] = el)} className="h3d-layer">
            {renderOutro()}
          </div>

          {/* ── 06 · INTRO AGAIN (loop) ── */}
          <div ref={(el) => (layerRefs.current[5] = el)} className="h3d-layer">
            {renderIntro()}
          </div>
        </div>

        {/* hint */}
        <div ref={hintRef} className="h3d-hint">
          <span>scroll to fly</span>
          <div className="line" />
        </div>

        {/* right rail: progress + section nav */}
        <div className="h3d-progress">
          <div ref={fillRef} className="h3d-progress-fill" />
        </div>
        <nav className="h3d-hud">
          {LAYOUT.map((s, i) => (
            <button key={s.key} ref={(el) => (labelRefs.current[i] = el)} onClick={() => jumpTo(i)}>
              <i>{String(i + 1).padStart(2, "0")}</i> {s.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Hero3D;
