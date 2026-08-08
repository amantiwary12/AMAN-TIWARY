import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const INDEX_PROJECTS = [
  {
    num: "01",
    title: "Wedding Family Tree",
    desc: "Multi-generational family trees with deeply nested hierarchical data.",
    meta: "MERN · MongoDB · REST APIs",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    live: "https://famtree.live/",
  },
  {
    num: "02",
    title: "Finance Management",
    desc: "SaaS expense tracking with role-based permissions & automated summaries.",
    meta: "MERN · SaaS · RBAC",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    live: "https://finance-management-fm.vercel.app/landing",
  },
  {
    num: "03",
    title: "Aartech BTS — IoT",
    desc: "Real-time industrial relay monitoring for field engineers.",
    meta: "React · REST APIs · Real-time",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    live: "http://aartechbts.com/",
  },
  {
    num: "04",
    title: "Pardex — AutoCaption Pro",
    desc: "Local-first video editor with AI-generated captions in English, Hindi & Hinglish.",
    meta: "React · Whisper AI · IndexedDB",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    live: "https://pardex-video-editor.vercel.app",
  },
];

const ArrowUpRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
  </svg>
);

/* ══════════ Numbered editorial index with cursor-following preview ══════════ */
const MultiC = () => {
  const floatRef = useRef(null);
  const indexRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewOn, setPreviewOn] = useState(false);

  const handleMove = useCallback((e) => {
    if (floatRef.current) {
      floatRef.current.style.transform = `translate3d(${e.clientX - 145}px, ${e.clientY - 210}px, 0)`;
    }
  }, []);

  /* scroll-in: each row plays its entrance choreography when it enters the viewport */
  useEffect(() => {
    const rows = indexRef.current?.querySelectorAll(".fw-row") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" }
    );
    rows.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <div ref={indexRef} className="fw-index" onMouseMove={handleMove}>
        {INDEX_PROJECTS.map((p, i) => (
          <a
            key={p.num}
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-row"
            style={{ "--d": `${i * 0.1}s` }}
            onMouseEnter={() => { setPreviewSrc(p.image); setPreviewOn(true); }}
            onMouseLeave={() => setPreviewOn(false)}
          >
            <span className="fw-row-num fw-el fw-el-num">/{p.num}</span>
            <div className="flex-1 min-w-0">
              <div className="fw-titlewrap">
                <h3 className="fw-row-title fw-el fw-el-title">{p.title}</h3>
              </div>
              <p className="fw-row-desc fw-el fw-el-fade">{p.desc}</p>
            </div>
            <span className="fw-row-meta fw-el fw-el-fade hidden md:block">{p.meta}</span>
            <span className="fw-row-arrow fw-el fw-el-fade"><ArrowUpRight /></span>
          </a>
        ))}

        {/* floating image preview (desktop only) */}
        <div ref={floatRef} className="fw-float hidden lg:block">
          <div className={`fw-float-card ${previewOn ? "on" : ""}`}>
            {previewSrc && <img src={previewSrc} alt="" />}
          </div>
        </div>
      </div>

      {/* View all */}
      <div className="text-center mt-14 reveal reveal-delay-2">
        <Link to="/projects" className="btn-outline">
          View All Projects
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MultiC;
