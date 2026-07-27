import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    period: "Feb 2026 — Present",
    role: "MERN Stack Developer (Trainee)",
    org: "Aartech Solonics Limited",
    place: "Mandideep, Madhya Pradesh",
    points: [
      "Developing real-time industrial IoT dashboards for relay monitoring systems, delivering live operational visibility to field engineers.",
      "Engineering REST API endpoints connecting frontend modules with backend services for reliable real-time data flow.",
      "Implementing JWT-based authentication and role-based access control (RBAC) to secure enterprise-grade applications.",
      "Building ERP and SaaS application modules for internal business operations across company teams.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT & RBAC"],
    accent: "#ee5b2e",
  },
  {
    period: "Aug 2025 — Jan 2026",
    role: "Frontend Developer Intern",
    org: "Aartech Solonics Limited",
    place: "Mandideep, Madhya Pradesh",
    points: [
      "Built reusable, responsive React.js UI components for industrial monitoring dashboards across desktop and mobile.",
      "Implemented API-driven real-time data visualization and system status tracking, enabling operators to detect issues faster.",
    ],
    tags: ["React.js", "REST APIs", "Data Visualization", "IoT Dashboards"],
    accent: "#e0b464",
  },
  {
    period: "2022 — 2026",
    role: "B.Tech, Computer Science",
    org: "Radharaman Institute of Technology & Science",
    place: "Bhopal, Madhya Pradesh",
    points: [
      "Focused on full-stack engineering, component architecture and modern JavaScript.",
      "AWS Solutions Architecture Job Simulation — Forage (2023).",
      "Frontend Development Internship Certification — Aartech Solonics Limited (2026).",
    ],
    tags: ["Computer Science", "AWS", "MERN Stack"],
    accent: "#ee5b2e",
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(listRef.current.children).forEach((item, i) => {
        /* Each entry slides in sideways, alternating sides */
        gsap.from(item, {
          x: i % 2 === 0 ? -120 : 120,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });
      });

      /* Timeline spine grows as you scroll */
      gsap.from(".exp-spine", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 ox-clip"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-16 text-center">
          <span className="section-label justify-center">Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Experience &amp; <span className="g-text">Education</span>
          </h2>
        </div>

        <div className="relative">
          {/* Center spine (left on mobile) */}
          <div
            className="exp-spine absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #ee5b2e, rgba(224,180,100,0.5), transparent)" }}
          />

          <div ref={listRef} className="space-y-14">
            {timeline.map((t, i) => (
              <div
                key={t.role}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on the spine */}
                <span
                  className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{ background: t.accent, boxShadow: `0 0 16px ${t.accent}` }}
                />

                {/* Card */}
                <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-14" : "md:pl-14"}`}>
                  <div className="card p-7" style={{ borderTop: `2px solid ${t.accent}` }}>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: t.accent }}
                    >
                      {t.period}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{t.role}</h3>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--cyan)" }}>
                      {t.org}
                    </p>
                    <p className="text-xs mt-0.5 mb-4" style={{ color: "var(--muted)" }}>
                      {t.place}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {t.points.map((p, pi) => (
                        <li
                          key={pi}
                          className="text-sm leading-relaxed flex gap-2"
                          style={{ color: "var(--muted)" }}
                        >
                          <span style={{ color: t.accent }}>▹</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for the other half */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
