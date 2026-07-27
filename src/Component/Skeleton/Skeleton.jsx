import React, { useState } from "react";
import "./Skeleton.css";

/* ─────────────────────────────────────────────────────────────
   Skeleton primitives — the building blocks.

   <Skeleton />        a shimmering block. Size it with w / h props
                       (any CSS value) or className.
   <SkeletonText />    a group of text-like lines (last one shorter).
   <SkeletonCircle />  avatar / icon placeholder.
   <SkeletonButton />  pill-shaped button placeholder.
   <SkeletonCard />    a bordered card shell you can put blocks inside.
   <SkeletonImage />   a REAL <img> that shows shimmer until the file
                       actually finishes downloading — this is the one
                       that helps most on slow networks.
   ───────────────────────────────────────────────────────────── */

export const Skeleton = ({ w = "100%", h = "16px", circle = false, pill = false, className = "", style = {} }) => (
  <div
    aria-hidden="true"
    className={`skeleton ${circle ? "skeleton--circle" : ""} ${pill ? "skeleton--pill" : ""} ${className}`}
    style={{ width: w, height: h, ...style }}
  />
);

export const SkeletonText = ({ lines = 3, h = "14px", gap = "10px", className = "" }) => (
  <div className={`skeleton-text-group ${className}`} style={{ gap }} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} h={h} />
    ))}
  </div>
);

export const SkeletonCircle = ({ size = "48px", className = "" }) => (
  <Skeleton w={size} h={size} circle className={className} />
);

export const SkeletonButton = ({ w = "140px", h = "44px", className = "" }) => (
  <Skeleton w={w} h={h} pill className={className} />
);

export const SkeletonCard = ({ children, className = "", style = {} }) => (
  <div aria-hidden="true" className={`skeleton--card ${className}`} style={{ padding: "20px", ...style }}>
    {children}
  </div>
);

/*
  SkeletonImage — drop-in replacement for <img>.
  Renders the real image invisibly, keeps a shimmer on top,
  and cross-fades the image in once the browser has it.
  On a slow connection the user sees a clean shimmer instead of
  a blank box or an image painting in ugly horizontal strips.

  Usage:  <SkeletonImage src={p.image} alt={p.title}
                         className="w-full h-full object-cover" />
  Extra:  wrapClassName / wrapStyle style the wrapper div
          (the wrapper fills whatever box you give it).
*/
export const SkeletonImage = ({ src, alt = "", className = "", wrapClassName = "", wrapStyle = {}, ...imgProps }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`skeleton-img-wrap ${loaded ? "loaded" : ""} ${wrapClassName}`}
      style={{ width: "100%", height: "100%", ...wrapStyle }}
    >
      <div className="skeleton skeleton-img-shimmer" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...imgProps}
      />
    </div>
  );
};

export default Skeleton;
