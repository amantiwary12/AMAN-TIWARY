import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonImage } from "../../Component/Skeleton/Skeleton";
import mind   from "../../Accest/mind.png";
import secure from "../../Accest/secure.png";

const ALL_PROJECTS = [
  {
    id: 100,
    title: "Pardex — AutoCaption Pro",
    desc: "Local-first AI video editor that auto-generates captions in English, Hindi & Hinglish with Whisper — all user data stays in the browser.",
    fullDesc: "Pardex (AutoCaption Pro) is a startup video editor focused on automatic captioning. A Premiere-Pro-style editor — tool rail, canvas preview, and a timeline with video/caption/audio tracks — with clip split/trim/delete, undo/redo, karaoke and word-by-word caption styles, and ffmpeg-powered audio effects. Whisper AI transcribes speech server-side statelessly, while every project, caption, and video lives in the browser via IndexedDB: nothing is ever stored on a server.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    tags: ["React 18", "Whisper AI", "IndexedDB", "ffmpeg", "Express", "Tailwind"],
    live: "https://pardex-video-editor.vercel.app",
    github: "https://github.com/amantiwary12",
    category: "ai",
    accent: "#ec4899",
  },
  {
    id: 101,
    title: "Wedding Family Tree",
    desc: "Full-stack MERN app for creating and managing dynamic, multi-generational family tree structures.",
    fullDesc: "A full-stack MERN application enabling users to create and manage dynamic, multi-generational family trees. REST APIs handle user relationships and deeply nested hierarchical data, with MongoDB schemas optimized for querying large nested family datasets.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    live: "https://famtree.live/",
    github: "https://github.com/amantiwary12",
    category: "fullstack",
    accent: "#ee5b2e",
  },
  {
    id: 102,
    title: "Finance Management System",
    desc: "SaaS expense tracking platform with role-based permissions and automated financial summary reporting.",
    fullDesc: "A full-stack SaaS expense tracking platform for managing income, expenses, and project budgets. Secure REST APIs power transaction management and automated weekly/monthly financial summaries, with Admin/Manager role-based permissions and automated financial calculations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tags: ["MERN", "SaaS", "RBAC", "REST APIs"],
    live: "https://finance-management-fm.vercel.app/landing",
    github: "https://github.com/amantiwary12",
    category: "fullstack",
    accent: "#8fb27c",
  },
  {
    id: 103,
    title: "Aartech BTS — IoT Dashboard",
    desc: "Real-time industrial IoT relay monitoring dashboard built at Aartech Solonics Limited.",
    fullDesc: "Real-time industrial IoT dashboard for relay monitoring systems, delivering live operational visibility to field engineers. Features REST API integration, JWT-based authentication with role-based access control, and real-time data visualization.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["React", "REST APIs", "JWT", "Real-time"],
    live: "https://rp-frontend-eight.vercel.app",
    github: "https://github.com/amantiwary12",
    category: "fullstack",
    accent: "#e0b464",
  },
  {
    id: 1,
    title: "Mind Strategy",
    desc: "Full-featured tour package website with smooth GSAP animations, responsive layouts, and dynamic content.",
    fullDesc: "Mind Strategy is a modern tour package website built with React and GSAP for buttery-smooth animations. Features dynamic content loading, fully responsive design, and high-performance rendering.",
    image: mind,
    tags: ["React", "TailwindCSS", "GSAP", "Responsive"],
    live: "https://mind-strategys.vercel.app/",
    github: "https://github.com/amantiwary12",
    path: "/MindSTrategy",
    category: "web",
    accent: "#ee5b2e",
  },
  {
    id: 2,
    title: "Secure Sphere",
    desc: "Security solutions platform with real-time Firebase sync, user authentication, and a dashboard.",
    fullDesc: "Secure Sphere provides real-time security monitoring and alerts. Built on React and Firebase for seamless data synchronisation and user management.",
    image: secure,
    tags: ["React", "Firebase", "TailwindCSS", "Real-time"],
    live: "https://secure-sphere-rosy.vercel.app/",
    github: "https://github.com/amantiwary12",
    path: "/secure",
    category: "web",
    accent: "#e0b464",
  },
  {
    id: 3,
    title: "Apple Vision Pro Clone",
    desc: "3D UI clone of Apple's Vision Pro website with immersive scenes and scroll-driven animations.",
    fullDesc: "A stunning 3-D clone of Apple Vision Pro's marketing site using Three.js and React. Features immersive 3-D model rendering and performance-optimised scroll animations.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    tags: ["React", "Three.js", "Framer Motion", "3D"],
    live: "https://amantiwary12.github.io/Apple-vision-copy",
    github: "https://github.com/amantiwary12",
    path: "/Applevisiop",
    category: "3d",
    accent: "#d98a6a",
  },
];

const FILTERS = ["all", "ai", "fullstack", "web", "3d"];

const ExternalIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GHIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const ProjectCard = ({ p, index, onClick }) => (
  <article
    className="card reveal group overflow-hidden cursor-pointer"
    style={{ transitionDelay: `${index * 0.08}s` }}
    onClick={onClick}
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ height: "220px" }}>
      <SkeletonImage
        src={p.image}
        alt={p.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Accent bar at bottom of image */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
      />
      {/* Hover overlay with links */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(13,12,10,0.8)" }}
      >
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white"
          style={{ background: p.accent }}
        >
          Live <ExternalIcon />
        </a>
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <GHIcon /> Code
        </a>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold text-white group-hover:text-[#e0b464] transition-colors">
          {p.title}
        </h3>
        <span className="tag ml-2 flex-shrink-0 capitalize">{p.category}</span>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {p.tags.slice(0, 3).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
        {p.tags.length > 3 && (
          <span className="tag">+{p.tags.length - 3}</span>
        )}
      </div>
    </div>
  </article>
);

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filter]);

  const filtered = filter === "all"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === filter);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }} className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <header className="mb-14 reveal">
          <span className="section-label">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3">
            My <span className="g-text">Projects</span>
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ color: "var(--muted)" }}>
            A showcase of my work — full-stack MERN platforms, real-time dashboards, and web experiences.
          </p>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12 reveal reveal-delay-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200"
              style={
                filter === f
                  ? { background: "var(--accent)", color: "#fff" }
                  : { background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }
              }
            >
              {f === "all" ? "All Projects" : f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                onClick={() =>
                  p.path
                    ? navigate(p.path)
                    : window.open(p.live, "_blank", "noopener,noreferrer")
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 reveal" style={{ color: "var(--muted)" }}>
            <p className="text-xl font-medium">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;
