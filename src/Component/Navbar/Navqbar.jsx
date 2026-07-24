import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { label: "Home",     to: "/" },
    { label: "About",    to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Contact",  to: "/contact" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg,#6366f1,#22d3ee)" }}
            >
              AT
            </span>
            <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
              Aman Tiwary
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: isActive(l.to) ? "#a5b4fc" : "#9ca3af" }}
                onMouseEnter={(e) => { if (!isActive(l.to)) e.currentTarget.style.color = "#e8eaf8"; }}
                onMouseLeave={(e) => { if (!isActive(l.to)) e.currentTarget.style.color = "#9ca3af"; }}
              >
                {l.label}
                {isActive(l.to) && (
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px rounded-full"
                    style={{ background: "linear-gradient(90deg,#6366f1,#22d3ee)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:amantiwary2505@gmail.com"
              className="btn-primary"
              style={{ padding: "8px 20px", fontSize: "0.82rem" }}
            >
              Hire Me
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-5 bg-white/70 transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "" }}
            />
            <span
              className="block h-px w-5 bg-white/70 transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-5 bg-white/70 transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "" }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          background: "rgba(5,5,8,0.97)",
          backdropFilter: "blur(20px)",
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-3xl font-bold transition-colors"
              style={{ color: isActive(l.to) ? "#a5b4fc" : "#e8eaf8" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:amantiwary2505@gmail.com"
            className="btn-primary mt-4"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
