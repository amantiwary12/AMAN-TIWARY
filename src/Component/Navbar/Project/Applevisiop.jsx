import React from "react";
import { Link } from "react-router-dom";

const Applevisiop = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-lg">
        <span className="section-label justify-center mb-4">Case Study</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4">
          Apple Vision Pro Clone
        </h1>
        <p className="leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
          A 3D UI clone of Apple's Vision Pro marketing site with immersive scenes
          and scroll-driven animations. A detailed write-up for this project is coming soon.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://amantiwary12.github.io/Apple-vision-copy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View Live Demo
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Link to="/projects" className="btn-outline">
            Back to Projects
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applevisiop;
