import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "Redux", "Tailwind CSS", "GSAP", "Responsive UI Design", "Component Architecture", "Data Visualization"],
    accent: "#6366f1",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST API Development", "JWT Authentication", "bcrypt", "RBAC", "Middleware", "WebSockets"],
    accent: "#22d3ee",
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose", "Schema Design", "Query Optimization", "Aggregation Pipelines"],
    accent: "#f472b6",
  },
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "JSON"],
    accent: "#34d399",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "Firebase", "Vercel", "Render", "Figma", "Browser DevTools"],
    accent: "#fbbf24",
  },
  {
    title: "Core Concepts",
    skills: ["MERN Stack", "SaaS Development", "ERP Systems", "API Integration", "State Management", "Auth & Authorization", "Performance Optimization", "Agile Development"],
    accent: "#a78bfa",
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Cards slide in sideways, alternating direction */
      gsap.utils.toArray(gridRef.current.children).forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 dot-grid ox-clip">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14">
          <span className="section-label">Toolbox</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Skills &amp; <span className="g-text">Technologies</span>
          </h2>
          <p className="mt-3 max-w-lg" style={{ color: "var(--muted)" }}>
            The tools I reach for when building full-stack, real-time, production-ready applications.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((g, gi) => (
            <div key={g.title} className="card p-7">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs font-black w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${g.accent}1f`, color: g.accent, border: `1px solid ${g.accent}44` }}
                >
                  0{gi + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-300 cursor-default"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = g.accent;
                      e.currentTarget.style.color = g.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text)";
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
