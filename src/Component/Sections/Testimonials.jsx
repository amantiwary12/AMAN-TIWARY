import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Testimonials — social proof from people I've actually worked
   with. Far more convincing to recruiters than any like count.

   ⚠ PLACEHOLDER QUOTES — replace each entry below with a real
   quote from a real colleague/lead before deploying. Ask them:
   "Could you write 2–3 lines about what it was like working
   with me?" and paste their words here verbatim.
   ───────────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "Aman took ownership of our real-time IoT dashboard end to end — from React components to the REST APIs behind them — and delivered clean, reliable work every sprint.",
    name: "Your Team Lead", // TODO: real name
    role: "Project Lead, Aartech Solonics",
    accent: "#ee5b2e",
  },
  {
    quote:
      "What stands out is how fast he learns. He went from intern to building production ERP modules with authentication and role-based access in a few months.",
    name: "Your Senior Colleague", // TODO: real name
    role: "Senior Developer, Aartech Solonics",
    accent: "#e0b464",
  },
  {
    quote:
      "Easy to work with, communicates clearly, and cares about the details — the kind of developer you want on your team.",
    name: "Your Colleague", // TODO: real name
    role: "Frontend Developer, Aartech Solonics",
    accent: "#ee5b2e",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(gridRef.current.children).forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotate: i % 2 === 0 ? -2 : 2,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 ox-clip">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14 text-center">
          <span className="section-label justify-center">Kind Words</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            What people <span className="g-text">say</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            From the people I've built things with.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.role}
              className="card p-7 flex flex-col"
              style={{ borderTop: `2px solid ${t.accent}` }}
            >
              {/* big decorative quote mark */}
              <span
                aria-hidden="true"
                className="font-black leading-none select-none"
                style={{ fontSize: "3rem", color: t.accent, opacity: 0.85 }}
              >
                &ldquo;
              </span>
              <blockquote
                className="text-sm leading-relaxed flex-1 -mt-3"
                style={{ color: "var(--text)" }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
