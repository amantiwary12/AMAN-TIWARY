import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

const FIRST = "AMAN".split("");
const LAST = "TIWARY".split("");

export default function Preloader({ onComplete, onReveal }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete();
        },
      });

      tl.to(".pl-badge", {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      })
        .to(
          counter,
          {
            val: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.val)
                ).padStart(3, "0");
              }
            },
          },
          "<"
        )
        .to(".pl-progress-fill", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, "<")
        .to(
          ".pl-letter",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.06,
          },
          "-=0.75"
        )
        .to(".pl-counter, .pl-progress", { opacity: 0, duration: 0.35 }, "-=0.9")
        .to(".pl-line", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.55")
        .to(".pl-sub", { opacity: 1, letterSpacing: "0.6em", duration: 0.9 }, "-=0.5")
        .to(".pl-name", { "--shine": "150%", duration: 1, ease: "power2.inOut" }, "-=0.35")
        .to({}, { duration: 0.35 }) // hold
        .call(() => onReveal && onReveal(), [], "outro")
        .to(".pl-badge", { opacity: 0, y: -20, duration: 0.4 }, "outro")
        .to(
          ".pl-letter",
          {
            y: "-115%",
            opacity: 0,
            duration: 0.55,
            stagger: 0.025,
            ease: "power3.in",
          },
          "outro"
        )
        .to(".pl-line, .pl-sub", { opacity: 0, duration: 0.3 }, "outro")
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "outro+=0.15"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete, onReveal]);

  return (
    <div className="pl-overlay" ref={rootRef}>
      <div className="pl-aura pl-aura-1" />
      <div className="pl-aura pl-aura-2" />

      <div className="pl-center">
        <div className="pl-badge">
          <span>A</span>
          <span className="pl-badge-dot">·</span>
          <span>T</span>
        </div>

        <h1 className="pl-name">
          <span className="pl-word">
            {FIRST.map((ch, i) => (
              <span className="pl-letter-mask" key={`f${i}`}>
                <span className="pl-letter">{ch}</span>
              </span>
            ))}
          </span>
          <span className="pl-word pl-word-last">
            {LAST.map((ch, i) => (
              <span className="pl-letter-mask" key={`l${i}`}>
                <span className="pl-letter">{ch}</span>
              </span>
            ))}
          </span>
        </h1>

        <div className="pl-line" />
        <p className="pl-sub">PORTFOLIO</p>

        <div className="pl-progress">
          <span className="pl-counter" ref={counterRef}>000</span>
          <div className="pl-progress-track">
            <div className="pl-progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
