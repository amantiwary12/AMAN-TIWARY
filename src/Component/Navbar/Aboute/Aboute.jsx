import React, { useEffect, useRef } from "react";
import Photo from "../../../Accest/myphoto.jpg";

const skills = [
  { name: "React.js",           pct: 90 },
  { name: "Node.js & Express",  pct: 85 },
  { name: "MongoDB & Mongoose", pct: 85 },
  { name: "JavaScript (ES6+)",  pct: 88 },
  { name: "REST APIs & JWT",    pct: 88 },
  { name: "TailwindCSS",        pct: 95 },
  { name: "HTML / CSS",         pct: 95 },
  { name: "Git & GitHub",       pct: 85 },
];

const achievements = [
  {
    icon: "☁️",
    title: "AWS Solutions Architecture",
    desc: "Job Simulation — Forage (2023).",
    tint: "rgba(34,211,238,0.12)",
  },
  {
    icon: "🏅",
    title: "Frontend Internship Certification",
    desc: "Aartech Solonics Limited (2026).",
    tint: "rgba(99,102,241,0.12)",
  },
  {
    icon: "🏆",
    title: "HackMivo Hackathon",
    desc: "Built an innovative solution under a competitive hackathon setting.",
    tint: "rgba(251,191,36,0.12)",
  },
];

const highlights = [
  { icon: "⚡", text: "Real-time IoT Dashboards" },
  { icon: "🔐", text: "Secure REST APIs & JWT" },
  { icon: "🧩", text: "ERP & SaaS Modules" },
  { icon: "🎨", text: "Pixel-perfect UI" },
];

const hobbies = [
  { icon: "✈️", name: "Traveling" },
  { icon: "✍️", name: "Blogging" },
  { icon: "🌐", name: "Open Source" },
  { icon: "📸", name: "Photography" },
  { icon: "🎮", name: "Gaming" },
  { icon: "📚", name: "Reading" },
  { icon: "🎬", name: "Content Creation" },
];

const SkillBar = ({ name, pct }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("animated"); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="font-medium text-white">{name}</span>
        <span className="font-semibold" style={{ color: "#a5b4fc" }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{ transform: `scaleX(${pct / 100})`, transitionDuration: "1.2s" }}
        />
      </div>
    </div>
  );
};

const SectionHead = ({ label, title, sub }) => (
  <div className="reveal mb-10">
    <span className="section-label">{label}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">{title}</h2>
    {sub && (
      <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {sub}
      </p>
    )}
  </div>
);

export default function About() {
  /* reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflow: "hidden" }} className="pt-24 pb-24 relative">
      {/* Decorative gradient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-120px", right: "-120px", width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%", left: "-160px", width: "420px", height: "420px",
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* ── Page header ── */}
        <header className="mb-20 reveal">
          <span className="section-label">About</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-3 leading-tight">
            Turning Ideas Into <span className="g-text">Experiences</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            MERN Stack Developer crafting real-time dashboards, secure APIs, and
            production-ready web apps — with an obsession for clean code and detail.
          </p>
        </header>

        {/* ── Intro grid ── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-28">
          {/* Photo */}
          <div className="lg:col-span-2 reveal">
            <div className="relative inline-block">
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: "conic-gradient(from 180deg, rgba(99,102,241,0.5), rgba(34,211,238,0.3), rgba(99,102,241,0.5))",
                  filter: "blur(18px)",
                  opacity: 0.7,
                }}
              />
              <img
                src={Photo}
                alt="Aman Tiwary"
                className="relative rounded-2xl object-cover w-full max-w-xs"
                style={{ border: "1px solid rgba(99,102,241,0.35)" }}
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=Aman+Tiwary&background=6366f1&color=fff&size=400";
                }}
              />
              <span
                className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                🟢 Open to work
              </span>
              <span
                className="absolute -top-3 -left-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg"
                style={{ background: "var(--surface-2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
              >
                ⚡ MERN Stack Dev
              </span>
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-3 space-y-5 reveal reveal-delay-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Hi, I'm <span className="g-text">Aman Tiwary</span> 👋
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
              I'm a <strong className="text-white">MERN Stack Developer</strong> with 11+ months of hands-on
              industry experience building real-time industrial IoT dashboards, ERP modules, and SaaS-based
              finance platforms at Aartech Solonics Limited. Currently pursuing my B.Tech in Computer Science
              at Radharaman Institute of Technology &amp; Science, Bhopal (2022–2026).
            </p>
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
              I'm proficient in React.js, Node.js, Express.js, and MongoDB, with a proven record of designing
              secure REST APIs, implementing JWT-based role-based access control, and shipping responsive,
              production-ready applications from design to deployment.
            </p>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {highlights.map((h) => (
                <span
                  key={h.text}
                  className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.22)",
                    color: "#c7d2fe",
                  }}
                >
                  <span>{h.icon}</span> {h.text}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
              {[
                { v: "06+", l: "Projects Built" },
                { v: "01+", l: "Years Experience" },
                { v: "15+", l: "Technologies" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="card text-center py-4 sm:py-5 px-1 sm:px-2 rounded-xl"
                >
                  <div className="text-2xl sm:text-3xl font-black g-text">{s.v}</div>
                  <div className="text-[0.65rem] sm:text-xs mt-1" style={{ color: "var(--muted)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="mb-28">
          <SectionHead
            label="Experience"
            title="Work History"
            sub="Where I've shipped real products for real users."
          />

          <div className="relative pl-8 reveal reveal-delay-1">
            <div className="timeline-line" />
            <div
              className="absolute -left-1.5 top-0 w-4 h-4 rounded-full border-2"
              style={{ background: "var(--accent)", borderColor: "var(--bg)", boxShadow: "0 0 16px rgba(99,102,241,0.7)" }}
            />

            <div className="card rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">MERN Stack Developer (Trainee)</h3>
                  <p style={{ color: "var(--accent)" }} className="text-sm font-medium">
                    Aartech Solonics Limited · Feb 2026 – Present
                  </p>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full self-start sm:self-auto"
                  style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  📍 Mandideep, Madhya Pradesh
                </span>
              </div>
              <ul className="space-y-2 text-sm mb-5" style={{ color: "var(--muted)" }}>
                {[
                  "Developing real-time industrial IoT dashboards for relay monitoring systems.",
                  "Engineering secure REST APIs with JWT authentication and role-based access control.",
                  "Building ERP and SaaS application modules for internal business operations.",
                  "Previously Frontend Developer Intern (Aug 2025 – Jan 2026) — built reusable React.js components and real-time data visualization for industrial monitoring dashboards.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Node.js", "Express", "MongoDB", "JWT", "WebSockets"].map((t) => (
                  <span key={t} className="tag text-xs px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section className="mb-28">
          <SectionHead label="Education" title="Academic Background" />

          <div className="card reveal reveal-delay-1 rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-6">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              🎓
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">B.Tech — Computer Science &amp; Engineering</h3>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>
                Radharaman Institute of Technology &amp; Science, Bhopal · 2022 – 2026
              </p>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--muted)" }}>
                Building a strong foundation in data structures, algorithms, databases, and software
                engineering — while shipping real-world projects on the side.
              </p>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-28">
          <SectionHead
            label="Skills"
            title="Technical Expertise"
            sub="The tools I reach for every day — battle-tested in production."
          />

          <div className="card rounded-2xl p-8 reveal reveal-delay-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              {skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Achievements ── */}
        <section className="mb-28">
          <SectionHead label="Achievements" title="Recognition" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <div
                key={a.title}
                className="card reveal p-7"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: a.tint, border: "1px solid var(--border)" }}
                >
                  {a.icon}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hobbies ── */}
        <section className="mb-28">
          <SectionHead label="Personal" title="Beyond the Code" />

          <div className="flex flex-wrap gap-3 reveal reveal-delay-1">
            {hobbies.map((h) => (
              <span key={h.name} className="tag text-sm px-4 py-2 flex items-center gap-2">
                <span>{h.icon}</span> {h.name}
              </span>
            ))}
          </div>
        </section>

        {/* ── Quote ── */}
        <section className="reveal">
          <div
            className="relative rounded-3xl px-8 py-14 text-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.10), rgba(34,211,238,0.05))",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <span
              className="absolute top-4 left-8 text-8xl font-black select-none"
              style={{ color: "rgba(99,102,241,0.15)", fontFamily: "Georgia, serif" }}
            >
              "
            </span>
            <blockquote
              className="relative text-2xl md:text-3xl font-light italic max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              Building the future, one line of code at a time.
            </blockquote>
            <cite className="relative block mt-5 text-sm font-semibold not-italic" style={{ color: "var(--accent)" }}>
              — Aman Tiwary
            </cite>
          </div>
        </section>
      </div>
    </main>
  );
}
