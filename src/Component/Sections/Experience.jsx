import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Career history rendered as a git history — each chapter is a commit. */
const commits = [
  {
    hash: "a7f3c91",
    refs: ["HEAD -> main", "origin/main"],
    type: "feat",
    scope: "career",
    date: "Feb 2026 — Present",
    role: "MERN Stack Developer (Trainee)",
    org: "Aartech Solonics Limited",
    place: "Mandideep, Madhya Pradesh",
    points: [
      "Developing real-time industrial IoT dashboards for relay monitoring systems, delivering live operational visibility to field engineers.",
      "Engineering REST API endpoints connecting frontend modules with backend services for reliable real-time data flow.",
      "Implementing JWT-based authentication and role-based access control (RBAC) to secure enterprise-grade applications.",
      "Building ERP and SaaS application modules for internal business operations across company teams.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
  },
  {
    hash: "4b2e08d",
    refs: ["tag: v1.0"],
    type: "feat",
    scope: "intern",
    date: "Aug 2025 — Jan 2026",
    role: "Frontend Developer Intern",
    org: "Aartech Solonics Limited",
    place: "Mandideep, Madhya Pradesh",
    points: [
      "Built reusable, responsive React.js UI components for industrial monitoring dashboards across desktop and mobile.",
      "Implemented API-driven real-time data visualization and system status tracking, enabling operators to detect issues faster.",
    ],
    stack: ["React.js", "REST APIs", "Data Visualization", "IoT Dashboards"],
  },
  {
    hash: "0e91af6",
    refs: ["tag: v0.1", "root"],
    type: "init",
    scope: "education",
    date: "2022 — 2026",
    role: "B.Tech, Computer Science",
    org: "Radharaman Institute of Technology & Science",
    place: "Bhopal, Madhya Pradesh",
    points: [
      "Focused on full-stack engineering, component architecture and modern JavaScript.",
      "AWS Solutions Architecture Job Simulation — Forage (2023).",
      "Frontend Development Internship Certification — Aartech Solonics Limited (2026).",
    ],
    stack: ["Computer Science", "AWS", "MERN Stack"],
  },
];

const COMMAND = 'git log --graph --decorate --author="Aman Tiwary"';

const Experience = () => {
  const sectionRef = useRef(null);
  const cmdRef = useRef(null);
  const logRef = useRef(null);
  const spineRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* window itself tilts up into place */
      gsap.from(".tm-window", {
        y: 70,
        opacity: 0,
        rotateX: reduced ? 0 : 8,
        transformOrigin: "50% 100%",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tm-window", start: "top 85%" },
      });

      /* the command types itself out, one character at a time */
      if (!reduced && cmdRef.current) {
        gsap.fromTo(
          cmdRef.current,
          { width: 0 },
          {
            width: `${COMMAND.length}ch`,
            duration: 1.5,
            ease: `steps(${COMMAND.length})`,
            scrollTrigger: { trigger: ".tm-window", start: "top 72%" },
          }
        );
      }

      /* graph spine draws downward as you scroll the log */
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: logRef.current,
            start: "top 78%",
            end: "bottom 72%",
            scrub: 0.6,
            onUpdate: (self) => {
              if (pctRef.current) {
                pctRef.current.textContent = `${Math.round(self.progress * 100)}%`;
              }
            },
          },
        }
      );

      /* each commit "prints" to the terminal line by line */
      gsap.utils.toArray(".tm-commit").forEach((commit) => {
        gsap.from(commit.querySelector(".tm-node"), {
          scale: 0,
          duration: 0.5,
          ease: "back.out(3)",
          scrollTrigger: { trigger: commit, start: "top 82%" },
        });

        gsap.from(commit.querySelectorAll(".tm-print"), {
          opacity: 0,
          x: -14,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: commit, start: "top 80%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14">
          <span className="section-label">Journey</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-3 leading-none">
            Experience &amp;
          </h2>
          <h2 className="g-text text-4xl md:text-6xl leading-tight">Education</h2>
          <p className="mt-4 text-sm max-w-md" style={{ color: "var(--muted)" }}>
            My career, committed to history — one chapter at a time.
          </p>
        </div>

        <div className="tm-wrap">
          <div className="tm-window">
            {/* ── title bar ── */}
            <div className="tm-bar">
              <span className="tm-dot" style={{ background: "#ff5f57" }} />
              <span className="tm-dot" style={{ background: "#febc2e" }} />
              <span className="tm-dot" style={{ background: "#28c840" }} />
              <span className="tm-title">aman@portfolio — ~/career — zsh</span>
            </div>

            {/* ── output ── */}
            <div className="tm-body">
              <div className="tm-cmdline">
                <span className="tm-prompt">
                  <b>aman@dev</b>
                  <i>:</i>
                  <u>~/career</u>
                  <em>(main)</em> $
                </span>
                <span ref={cmdRef} className="tm-cmd">
                  {COMMAND}
                </span>
              </div>

              <div ref={logRef} className="tm-log">
                <span ref={spineRef} className="tm-spine" />

                {commits.map((c) => (
                  <article key={c.hash} className="tm-commit">
                    <span className="tm-node" />

                    <p className="tm-print tm-headline">
                      <span className="tm-kw">commit</span>{" "}
                      <span className="tm-hash">{c.hash}</span>{" "}
                      <span className="tm-refs">
                        (
                        {c.refs.map((r, ri) => (
                          <React.Fragment key={r}>
                            {ri > 0 && <span className="tm-sep">, </span>}
                            <span className={r.includes("HEAD") ? "tm-ref-head" : "tm-ref-tag"}>
                              {r}
                            </span>
                          </React.Fragment>
                        ))}
                        )
                      </span>
                    </p>

                    <p className="tm-print tm-meta">
                      Author: <span className="tm-val">Aman Tiwary</span>{" "}
                      <span className="tm-dim">&lt;amantiwary2505@gmail.com&gt;</span>
                    </p>
                    <p className="tm-print tm-meta">
                      Date:&nbsp;&nbsp; <span className="tm-val">{c.date}</span>
                    </p>

                    <p className="tm-print tm-subject">
                      <span className="tm-type">{c.type}</span>
                      <span className="tm-scope">({c.scope})</span>
                      <span className="tm-colon">:</span> {c.role}
                    </p>
                    <p className="tm-print tm-at">
                      @ {c.org} <span className="tm-dim">· {c.place}</span>
                    </p>

                    <ul className="tm-print-group">
                      {c.points.map((p, pi) => (
                        <li key={pi} className="tm-print tm-point">
                          <span className="tm-plus">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="tm-print tm-stack">
                      <span className="tm-dim">stack:</span>
                      {c.stack.map((s) => (
                        <span key={s} className="tm-pkg">
                          {s}
                        </span>
                      ))}
                    </p>
                  </article>
                ))}

                <p className="tm-end">
                  <span className="tm-prompt">
                    <b>aman@dev</b>
                    <i>:</i>
                    <u>~/career</u>
                    <em>(main)</em> $
                  </span>
                  <span className="tm-caret" />
                </p>
              </div>
            </div>

            {/* ── status bar ── */}
            <div className="tm-status">
              <span>
                <span className="tm-status-branch">⎇ main</span> · {commits.length} commits
              </span>
              <span>
                reading <span ref={pctRef}>0%</span>
              </span>
            </div>

            <div className="tm-scan" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
