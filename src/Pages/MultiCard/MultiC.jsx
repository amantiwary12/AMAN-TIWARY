import React from "react";
import { Link } from "react-router-dom";
import { SkeletonImage } from "../../Component/Skeleton/Skeleton";

const projects = [
  {
    id: 1,
    title: "Wedding Family Tree",
    desc: "Full-stack MERN app to create and manage dynamic, multi-generational family tree structures with deeply nested hierarchical data.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    tags: ["MERN", "MongoDB", "REST APIs"],
    live: "https://famtree.live/",
    accent: "#ee5b2e",
  },
  {
    id: 2,
    title: "Finance Management System",
    desc: "SaaS expense tracking platform with role-based permissions, automated financial summaries, and secure transaction APIs.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tags: ["MERN", "SaaS", "RBAC"],
    live: "https://finance-management-fm.vercel.app/landing",
    accent: "#e0b464",
  },
  {
    id: 3,
    title: "Aartech BTS — IoT Dashboard",
    desc: "Real-time industrial IoT relay monitoring dashboard delivering live operational visibility to field engineers.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["React", "REST APIs", "Real-time"],
    live: "http://aartechbts.com/",
    accent: "#d98a6a",
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ProjectCard = ({ p, index }) => (
  <article
    className="card reveal group overflow-hidden"
    style={{ transitionDelay: `${index * 0.1}s` }}
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ height: "200px" }}>
      <SkeletonImage
        src={p.image}
        alt={p.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(13,12,10,0.75)" }}
      >
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
          style={{ background: p.accent }}
        >
          Live Demo <ArrowIcon />
        </a>
      </div>
      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
      />
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e0b464] transition-colors">
        {p.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {p.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {p.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Footer link */}
      <a
        href={p.live}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
        style={{ color: "var(--muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e0b464")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        Visit Live Site
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </article>
);

const MultiC = () => (
  <div>
    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} p={p} index={i} />
      ))}
    </div>

    {/* View all */}
    <div className="text-center mt-12 reveal reveal-delay-4">
      <Link to="/projects" className="btn-outline">
        View All Projects
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  </div>
);

export default MultiC;
