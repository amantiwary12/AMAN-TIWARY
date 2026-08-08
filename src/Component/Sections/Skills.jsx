import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SunsetArt from "../../Accest/efdf9159-7ffe-4592-87b7-db3fc6eb3d17.png";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "Redux", "Tailwind CSS", "GSAP", "Responsive UI Design", "Component Architecture", "Data Visualization"],
    accent: "#ee5b2e",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST API Development", "JWT Authentication", "bcrypt", "RBAC", "Middleware", "WebSockets"],
    accent: "#e0b464",
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose", "Schema Design", "Query Optimization", "Aggregation Pipelines"],
    accent: "#ee5b2e",
  },
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "JSON"],
    accent: "#e0b464",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "Firebase", "Vercel", "Render", "Figma", "Browser DevTools"],
    accent: "#ee5b2e",
  },
  {
    title: "Core Concepts",
    skills: ["MERN Stack", "SaaS Development", "ERP Systems", "API Integration", "State Management", "Auth & Authorization", "Performance Optimization", "Agile Development"],
    accent: "#e0b464",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const Skills = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        horizontal: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        vertical: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { horizontal } = context.conditions;
        const track = trackRef.current;
        const panels = gsap.utils.toArray(track.children);

        if (horizontal) {
          const getScroll = () => track.scrollWidth - window.innerWidth;
          const total = panels.length;

          /* velocity skew — the whole track leans while you scroll fast,
             then eases back upright when you stop */
          const skewProxy = { skew: 0 };
          const skewSetter = gsap.quickSetter(track, "skewX", "deg");
          const clampSkew = gsap.utils.clamp(-5, 5);

          const tween = gsap.to(track, {
            x: () => -getScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => "+=" + getScroll(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
                if (counterRef.current) {
                  const idx = Math.round(self.progress * (total - 1)) + 1;
                  counterRef.current.textContent = `${pad(idx)} / ${pad(total)}`;
                }
                const skew = clampSkew(self.getVelocity() / -260);
                if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
                  skewProxy.skew = skew;
                  gsap.to(skewProxy, {
                    skew: 0,
                    duration: 0.7,
                    ease: "power3",
                    overwrite: true,
                    onUpdate: () => skewSetter(skewProxy.skew),
                  });
                }
              },
            },
          });

          panels.forEach((panel) => {
            /* ghost numeral drifts against the scroll — parallax depth */
            const ghost = panel.querySelector(".sk-ghost");
            if (ghost) {
              gsap.fromTo(
                ghost,
                { xPercent: 30 },
                {
                  xPercent: -30,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }

            /* titles slide up out of a mask as the panel arrives —
               scrubbed so a mid-scroll refresh can never leave them stuck */
            panel.querySelectorAll(".sk-title").forEach((title) => {
              gsap.from(title, {
                yPercent: 120,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 95%",
                  end: "left 60%",
                  scrub: true,
                },
              });
            });

            /* chips cascade up as the panel travels across the screen */
            const chips = panel.querySelectorAll(".sk-chip");
            if (chips.length) {
              gsap.from(chips, {
                y: 50,
                opacity: 0,
                stagger: 0.06,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 95%",
                  end: "left 45%",
                  scrub: true,
                },
              });
            }

            /* closing artwork slowly un-zooms while it crosses the screen */
            const art = panel.querySelector(".sk-art");
            if (art) {
              gsap.fromTo(
                art,
                { xPercent: -10, scale: 1.2 },
                {
                  xPercent: 0,
                  scale: 1.02,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: tween,
                    start: "left right",
                    end: "right right",
                    scrub: true,
                  },
                }
              );
            }
          });
        } else {
          /* mobile — panels rise in with a soft tilt, chips stagger */
          panels.forEach((panel) => {
            gsap.from(panel, {
              y: 60,
              opacity: 0,
              rotate: 1.5,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 88%" },
            });
            const chips = panel.querySelectorAll(".sk-chip");
            if (chips.length) {
              gsap.from(chips, {
                y: 24,
                opacity: 0,
                duration: 0.5,
                stagger: 0.035,
                ease: "power2.out",
                scrollTrigger: { trigger: panel, start: "top 80%" },
              });
            }
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative" style={{ background: "var(--bg)" }}>
      <div className="sk-viewport dot-grid">
        <div ref={trackRef} className="sk-track">
          {/* ── Panel 1 — intro ── */}
          <div className="sk-panel sk-panel-intro">
            <span className="sk-ghost">STACK</span>
            <div className="relative z-10">
              <span className="section-label">Toolbox</span>
              <div className="overflow-hidden mt-4">
                <h2 className="sk-title text-5xl md:text-7xl font-black text-white leading-none">
                  Skills &amp;
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="sk-title g-text text-5xl md:text-7xl leading-tight">Technologies</h2>
              </div>
              <p className="mt-5 max-w-md" style={{ color: "var(--muted)" }}>
                The tools I reach for when building full-stack, real-time, production-ready
                applications.
              </p>
              <div className="sk-scroll-hint mt-10">
                <span>keep scrolling</span>
                <span className="sk-hint-line" />
              </div>
            </div>
          </div>

          {/* ── Panels 2–7 — skill groups ── */}
          {skillGroups.map((g, gi) => (
            <div key={g.title} className="sk-panel sk-card" style={{ "--chip-accent": g.accent }}>
              <span className="sk-ghost">{pad(gi + 1)}</span>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 overflow-hidden">
                  <span
                    className="sk-index"
                    style={{ color: g.accent, borderColor: `${g.accent}55`, background: `${g.accent}14` }}
                  >
                    {pad(gi + 1)}
                  </span>
                  <h3 className="sk-title text-3xl md:text-4xl font-black text-white">{g.title}</h3>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="flex flex-wrap gap-3">
                    {g.skills.map((s) => (
                      <span key={s} className="sk-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="mt-auto pt-8 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--border)", marginTop: "auto" }}
                >
                  <span className="sk-meta">{g.skills.length} tools</span>
                  <span className="sk-meta" style={{ color: g.accent }}>
                    ●
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* ── Final panel — closing artwork ── */}
          <div className="sk-panel sk-panel-art">
            <img
              src={SunsetArt}
              alt="Anime artwork of Aman overlooking a sunset city"
              className="sk-art"
              draggable={false}
              loading="lazy"
            />
            <div className="sk-art-overlay" />
            <div className="relative z-10 mt-auto p-8 md:p-10">
              <span className="section-label">Mindset</span>
              <div className="overflow-hidden">
                <p className="sk-title sk-quote mt-3">
                  Dream in colour,
                  <br />
                  build in code.
                </p>
              </div>
              <p className="mt-4 text-sm" style={{ color: "rgba(236,231,222,0.75)" }}>
                Still learning, still building, still grateful.
              </p>
            </div>
          </div>
        </div>

        {/* ── progress rail (desktop only) ── */}
        <div className="sk-rail">
          <span ref={counterRef} className="sk-counter">
            01 / {pad(skillGroups.length + 2)}
          </span>
          <div className="sk-progress">
            <div ref={progressRef} className="sk-progress-fill" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
