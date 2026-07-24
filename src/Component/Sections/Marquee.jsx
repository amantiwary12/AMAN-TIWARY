import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Infinite sideways marquee (adko.in style).
 * - Loops forever using two copies of the content.
 * - Reacts to scroll: flips direction with scroll direction and
 *   speeds up with scroll velocity, then eases back to base speed.
 */
const Marquee = ({
  items,
  baseSpeed = 8,        // percent of track width per second
  direction = 1,        // 1 = leftwards, -1 = rightwards
  outlined = false,
  separator = "✦",
}) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const wrap = gsap.utils.wrap(-50, 0);
    let x = 0;
    let dir = direction;
    let boost = 0;

    const st = ScrollTrigger.create({
      onUpdate(self) {
        dir = self.direction === 1 ? direction : -direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 800, 4);
      },
    });

    const tick = (time, deltaMS) => {
      const dt = deltaMS / 1000;
      x -= dir * baseSpeed * dt * (1 + boost);
      boost *= 0.94;
      gsap.set(track, { xPercent: wrap(x) });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [baseSpeed, direction]);

  const row = (keyPrefix) =>
    items.map((item, i) => (
      <span key={`${keyPrefix}-${i}`} className="marquee-item">
        <span className={outlined ? "marquee-text-outline" : "marquee-text"}>
          {item}
        </span>
        <span className="marquee-sep">{separator}</span>
      </span>
    ));

  return (
    <div className="marquee" aria-hidden="true">
      <div ref={trackRef} className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
};

export default Marquee;
