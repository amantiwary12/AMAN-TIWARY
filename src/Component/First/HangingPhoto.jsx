import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Photo from "../../Accest/myphoto.jpg";

/* ─────────────────────────────────────────────────────────────
   HangingPhoto — polaroid on a cord.

   The photo hangs from a nail by a rope and sways gently.
   Grab it and drag it anywhere — the rope stretches and bends
   with it — and when you release, framer-motion's spring physics
   snap it back to its resting spot with a rubber-band wobble
   (dragSnapToOrigin + dragTransition).
   ───────────────────────────────────────────────────────────── */

const W = 340;          // container width
const ROPE_LEN = 96;    // rope rest length
const ANCHOR_X = W / 2; // nail position
const ANCHOR_Y = 12;
const CARD_W = 280;
const CARD_TOP = ANCHOR_Y + ROPE_LEN;

const HangingPhoto = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /* card tilts as you pull it sideways — like a real hanging frame */
  const rotate = useTransform(x, [-260, 260], [-24, 24]);

  /* rope path: nail → card eyelet, with slack that bends as you drag */
  const ropePath = useTransform([x, y], ([xv, yv]) => {
    const ex = ANCHOR_X + xv;            // eyelet x
    const ey = CARD_TOP + 4 + yv;        // eyelet y
    const cx = ANCHOR_X + xv * 0.32;     // control point gives the curve
    const cy = ANCHOR_Y + (ey - ANCHOR_Y) * 0.58;
    return `M ${ANCHOR_X} ${ANCHOR_Y} Q ${cx} ${cy} ${ex} ${ey}`;
  });

  return (
    <div
      className="hang-sway relative select-none"
      style={{ width: W, height: 520 }}
    >
      {/* rope — swings together with the card */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={W}
        height={520}
        style={{ overflow: "visible", zIndex: 5 }}
      >
        {/* nail head */}
        <circle cx={ANCHOR_X} cy={ANCHOR_Y} r="7" fill="var(--surface-2)" stroke="rgba(233,225,210,0.25)" strokeWidth="1.5" />
        <circle cx={ANCHOR_X} cy={ANCHOR_Y} r="2.5" fill="var(--accent)" />
        <motion.path
          d={ropePath}
          fill="none"
          stroke="#a08c6a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* the polaroid card */}
      <motion.div
        drag
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 220, bounceDamping: 9 }}
        whileDrag={{ scale: 1.03, cursor: "grabbing" }}
        whileHover={{ scale: 1.01 }}
        style={{
          x,
          y,
          rotate,
          position: "absolute",
          top: CARD_TOP,
          left: (W - CARD_W) / 2,
          width: CARD_W,
          zIndex: 10,
          cursor: "grab",
          touchAction: "none",
          transformOrigin: "50% 0%",
        }}
      >
        {/* eyelet the rope hooks into */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: -7,
            width: 16,
            height: 16,
            border: "3px solid #a08c6a",
            background: "var(--bg)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        />

        {/* polaroid body */}
        <div
          style={{
            background: "#ece7de",
            padding: "12px 12px 0",
            borderRadius: 6,
            boxShadow: "0 24px 48px -16px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={Photo}
            alt="Aman Tiwary"
            draggable={false}
            className="w-full object-cover"
            style={{
              aspectRatio: "4/5",
              filter: "saturate(0.92) contrast(1.05)",
              borderRadius: 2,
              pointerEvents: "none",
            }}
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=Aman+Tiwary&background=ee5b2e&color=fff&size=400";
            }}
          />
          {/* handwritten-style caption strip */}
          <div className="flex items-baseline justify-between px-1" style={{ height: 54 }}>
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.35rem",
                color: "#2a2620",
                lineHeight: "54px",
              }}
            >
              Aman Tiwary
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: "#8a8071",
                textTransform: "uppercase",
              }}
            >
              MERN Stack Dev
            </span>
          </div>
        </div>
      </motion.div>

      {/* hint */}
      <span
        className="absolute"
        style={{
          top: CARD_TOP - 14,
          right: -8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          color: "var(--muted)",
          transform: "rotate(6deg)",
        }}
      >
        ( drag me )
      </span>
    </div>
  );
};

export default HangingPhoto;
