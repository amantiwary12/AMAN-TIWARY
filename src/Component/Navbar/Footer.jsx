import React from "react";
import { Link } from "react-router-dom";

const GH = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LI = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YT = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const IG = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const socials = [
  { href: "https://github.com/amantiwary12",                 label: "GitHub",    Icon: GH },
  { href: "https://www.linkedin.com/in/aman-tiwary12",      label: "LinkedIn",  Icon: LI },
  { href: "https://www.youtube.com/@amantiwary12",            label: "YouTube",   Icon: YT },
  { href: "https://www.instagram.com/aman_tiwary12",         label: "Instagram", Icon: IG },
];

const navLinks = [
  { to: "/",        label: "Home" },
  { to: "/about",   label: "About" },
  { to: "/projects",label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => (
  <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-baseline gap-0.5 mb-4">
            <span
              className="text-2xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "var(--text)" }}
            >
              Aman Tiwary
            </span>
            <span
              className="text-3xl leading-none"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "var(--accent)" }}
            >
              .
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
            MERN Stack Developer building secure REST APIs, real-time dashboards, and pixel-perfect web experiences.
          </p>
          <div className="flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "rgba(238,91,46,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Navigation</h4>
          <ul className="space-y-2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Get In Touch</h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--muted)" }}>
            <li>
              <a
                href="mailto:amantiwary2505@gmail.com"
                className="transition-colors hover:text-white"
              >
                amantiwary2505@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919835383246" className="transition-colors hover:text-white">
                +91 98353 83246
              </a>
            </li>
            <li>Jamshedpur, Jharkhand · India</li>
          </ul>
          <a
            href="https://drive.google.com/file/d/1J67mlGL7mS59eIX50SAaKfbZYAjYjoRZ/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5"
            style={{ padding: "9px 20px", fontSize: "0.82rem" }}
          >
            Download Resume
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        <span>© {new Date().getFullYear()} Aman Tiwary. All rights reserved.</span>
        <span>Built with React &amp; TailwindCSS</span>
      </div>
    </div>
  </footer>
);

export default Footer;
