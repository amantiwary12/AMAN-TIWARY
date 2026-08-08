import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "../../Accest/myphoto.jpg";
import AnimeMe from "../../Accest/animated.me.png";

gsap.registerPlugin(ScrollTrigger);

/* Mask on the FRONT photo: transparent circle at the cursor (--mx/--my)
   punches a soft-edged hole through it, showing the photo behind.
   When the cursor is outside, --mx/--my sit far off-canvas → no hole. */
const REVEAL_MASK =
  "radial-gradient(circle 130px at var(--mx, -400px) var(--my, -400px), transparent 0 58%, rgba(0,0,0,0.45) 80%, #000 100%)";

const infoRows = [
  { label: "Name",     value: "Aman Tiwary" },
  { label: "Based in", value: "Jamshedpur, Jharkhand · India" },
  { label: "Email",    value: "amantiwary2505@gmail.com" },
  { label: "Focus",    value: "MERN Stack · REST APIs · Real-time Dashboards" },
  { label: "Status",   value: "Open to opportunities" },
];

const AboutMe = () => {
  const sectionRef = useRef(null);
  const photoWrapRef = useRef(null);
  const photoDriftRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const revealRef = useRef(null);

  /* track the cursor inside the photo — the mask reads --mx/--my */
  const handleRevealMove = (e) => {
    const el = revealRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const handleRevealLeave = () => {
    const el = revealRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "-400px");
    el.style.setProperty("--my", "-400px");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading lines slide up from a mask */
      gsap.from(headingRef.current.children, {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });

      /* Photo slides in sideways with a clip-path reveal */
      gsap.fromTo(
        photoWrapRef.current,
        { x: -160, opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Continuous sideways drift while scrolling through the section */
      gsap.fromTo(
        photoDriftRef.current,
        { x: -40 },
        {
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      /* Text column slides in from the opposite side */
      gsap.from(textRef.current.children, {
        x: 90,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 78%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Huge ghost word in the background */}
      <span
        className="absolute top-8 left-0 whitespace-nowrap select-none pointer-events-none font-black uppercase marquee-text-outline"
        style={{ fontSize: "clamp(2.75rem, 14vw, 12rem)", opacity: 0.35, lineHeight: 1 }}
      >
        About · About · About
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <span className="section-label">Who I Am</span>
          <div ref={headingRef} className="mt-3 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              A full-stack developer who loves
            </h2>
            <h2 className="text-4xl md:text-5xl font-black leading-tight g-text">
              clean APIs &amp; clean interfaces.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Sliding photo panel ── */}
          <div ref={photoDriftRef} className="flex justify-center lg:justify-start">
            <div ref={photoWrapRef} className="relative w-full max-w-md">
              {/* Offset frame behind the photo */}
              <div
                className="absolute -top-2 -left-2 sm:-top-5 sm:-left-5 w-full h-full rounded-2xl"
                style={{ border: "1px solid rgba(238,91,46,0.35)" }}
              />
              <div
                className="absolute -bottom-2 -right-2 sm:-bottom-5 sm:-right-5 w-full h-full rounded-2xl"
                style={{ background: "rgba(238,91,46,0.07)" }}
              />
              <div
                ref={revealRef}
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)", cursor: "crosshair" }}
                onPointerMove={handleRevealMove}
                onPointerLeave={handleRevealLeave}
              >
                {/* Anime portrait underneath — shows through the cursor hole */}
                <img
                  src={AnimeMe}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Front photo — masked with a soft hole that follows the mouse */}
                <img
                  src={Photo}
                  alt="Aman Tiwary"
                  draggable={false}
                  className="relative w-full object-cover"
                  style={{
                    aspectRatio: "4/5",
                    WebkitMaskImage: REVEAL_MASK,
                    maskImage: REVEAL_MASK,
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Aman+Tiwary&background=ee5b2e&color=fff&size=640";
                  }}
                />
                {/* Bottom gradient + caption */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(13,12,10,0.85), transparent)" }}
                >
                  <p className="text-white font-bold">Aman Tiwary</p>
                  <p className="text-xs" style={{ color: "var(--cyan)" }}>
                    MERN Stack Developer
                  </p>
                </div>
                {/* Hint */}
                <span
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full pointer-events-none"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    background: "rgba(13,12,10,0.6)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  ( hover — anime me )
                </span>
              </div>
            </div>
          </div>

          {/* ── About text ── */}
          <div ref={textRef}>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "var(--text)" }}>
              Hi! I'm <span className="font-bold g-text">Aman</span> — a MERN Stack Developer from
              Jamshedpur with 11+ months of hands-on industry experience turning complex
              problems into secure, production-ready web applications.
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              I'm currently a MERN Stack Developer (Trainee) at{" "}
              <span className="text-white font-semibold">Aartech Solonics Limited</span>, where I
              build <span className="text-white font-semibold">real-time industrial IoT
              dashboards, ERP modules and SaaS platforms</span> — designing secure REST APIs,
              implementing JWT-based role-based access control, and shipping responsive React
              frontends backed by Node.js, Express and MongoDB.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              I'm pursuing my B.Tech in Computer Science at Radharaman Institute of Technology
              &amp; Science, Bhopal (2022–2026). Outside of work I build things like a
              multi-generational family-tree platform, a SaaS finance tracker, and a travel
              discovery platform — because the best way to learn is to ship.
            </p>

            {/* Info rows */}
            <div className="space-y-3">
              {infoRows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-baseline gap-4 pb-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase w-24 shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    {r.label}
                  </span>
                  <span className="text-sm text-white/90">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
