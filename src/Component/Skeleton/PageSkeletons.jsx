import React from "react";
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonButton, SkeletonCard } from "./Skeleton";

/* ─────────────────────────────────────────────────────────────
   Page-level skeletons.

   Each one mirrors the real page's layout (hero, grids, forms…)
   so that when the actual page pops in, nothing jumps around.
   They are shown:
     1. while a lazy route's JS chunk is still downloading
        (see RouteFallback.jsx + Suspense in App.jsx), and
     2. anywhere you fetch data and want a placeholder — just
        render the matching skeleton while `loading` is true.
   ───────────────────────────────────────────────────────────── */

/* a reusable project-card shaped placeholder */
const ProjectCardSkeleton = () => (
  <SkeletonCard style={{ padding: 0, overflow: "hidden" }}>
    <Skeleton h="220px" style={{ borderRadius: 0 }} />
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <Skeleton w="70%" h="20px" />
      <SkeletonText lines={2} h="12px" />
      <div style={{ display: "flex", gap: "8px" }}>
        <Skeleton w="64px" h="24px" pill />
        <Skeleton w="80px" h="24px" pill />
        <Skeleton w="56px" h="24px" pill />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
        <SkeletonButton w="110px" h="38px" />
        <SkeletonButton w="110px" h="38px" />
      </div>
    </div>
  </SkeletonCard>
);

/* ── Home ("/") — hero + stats + card grid ── */
export const HomeSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-page-inner">
      {/* hero: text left, photo right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <Skeleton w="180px" h="30px" pill />           {/* badge */}
          <Skeleton w="90%" h="56px" />                  {/* big title line 1 */}
          <Skeleton w="65%" h="56px" />                  {/* big title line 2 */}
          <Skeleton w="50%" h="24px" />                  {/* typing subtitle */}
          <SkeletonText lines={3} h="13px" />            {/* description */}
          <div style={{ display: "flex", gap: "14px", marginTop: "6px" }}>
            <SkeletonButton />
            <SkeletonButton />
          </div>
          <div style={{ display: "flex", gap: "36px", marginTop: "16px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Skeleton w="64px" h="30px" />
                <Skeleton w="90px" h="12px" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton w="min(340px, 80vw)" h="min(420px, 90vw)" style={{ borderRadius: "24px" }} />
        </div>
      </div>

      {/* marquee strip */}
      <Skeleton h="56px" style={{ margin: "48px 0", borderRadius: "12px" }} />

      {/* featured cards */}
      <div className="skeleton-grid">
        {[0, 1, 2].map((i) => <ProjectCardSkeleton key={i} />)}
      </div>
    </div>
  </div>
);

/* ── About ("/about") — photo + bio, skill bars, achievement cards ── */
export const AboutSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-page-inner">
      <Skeleton w="260px" h="42px" style={{ margin: "0 auto 48px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* photo + bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Skeleton h="380px" style={{ borderRadius: "20px" }} />
          <SkeletonText lines={4} h="13px" />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} w="150px" h="34px" pill />)}
          </div>
        </div>

        {/* skill bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <Skeleton w="140px" h="24px" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton w="140px" h="13px" />
                <Skeleton w="36px" h="13px" />
              </div>
              <Skeleton h="8px" pill />
            </div>
          ))}
        </div>
      </div>

      {/* achievements */}
      <div className="skeleton-grid" style={{ marginTop: "56px" }}>
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <SkeletonCircle size="44px" />
              <Skeleton w="75%" h="18px" />
              <SkeletonText lines={2} h="12px" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  </div>
);

/* ── Contact ("/contact") — info column + form column ── */
export const ContactSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-page-inner">
      <Skeleton w="300px" h="42px" style={{ margin: "0 auto 12px" }} />
      <Skeleton w="420px" h="14px" style={{ margin: "0 auto 48px", maxWidth: "90%" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* contact info + socials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <SkeletonCircle size="40px" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Skeleton w="70px" h="12px" />
                  <Skeleton w="70%" h="14px" />
                </div>
              </div>
            </SkeletonCard>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {[0, 1, 2, 3].map((i) => <SkeletonCircle key={i} size="44px" />)}
          </div>
        </div>

        {/* form */}
        <SkeletonCard>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <Skeleton h="46px" style={{ flex: 1, borderRadius: "10px" }} />
              <Skeleton h="46px" style={{ flex: 1, borderRadius: "10px" }} />
            </div>
            <Skeleton h="46px" style={{ borderRadius: "10px" }} />
            <Skeleton h="140px" style={{ borderRadius: "10px" }} />
            <SkeletonButton w="100%" h="48px" />
          </div>
        </SkeletonCard>
      </div>
    </div>
  </div>
);

/* ── Projects ("/projects") — heading, filter pills, card grid ── */
export const ProjectsSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-page-inner">
      <Skeleton w="280px" h="42px" style={{ margin: "0 auto 12px" }} />
      <Skeleton w="440px" h="14px" style={{ margin: "0 auto 36px", maxWidth: "90%" }} />

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} w="96px" h="38px" pill />)}
      </div>

      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    </div>
  </div>
);

/* ── Project detail (/MindSTrategy, /secure, /Applevisiop) —
      big hero image, title, tags, feature blocks ── */
export const ProjectDetailSkeleton = () => (
  <div className="skeleton-page" style={{ paddingLeft: 0, paddingRight: 0 }}>
    <Skeleton h="50vh" style={{ borderRadius: 0 }} />
    <div className="skeleton-page-inner" style={{ padding: "40px 24px 0" }}>
      <Skeleton w="min(420px, 80%)" h="40px" style={{ marginBottom: "16px" }} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} w="90px" h="28px" pill />)}
      </div>
      <SkeletonText lines={4} h="13px" />
      <div className="skeleton-grid" style={{ marginTop: "40px" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Skeleton w="60%" h="16px" />
              <SkeletonText lines={2} h="11px" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  </div>
);

/* ── Login ("/login") — centered auth card ── */
export const LoginSkeleton = () => (
  <div className="skeleton-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <SkeletonCard style={{ width: "min(420px, 92vw)", padding: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <Skeleton w="140px" h="28px" style={{ margin: "0 auto" }} />
        <Skeleton w="220px" h="13px" style={{ margin: "0 auto 8px" }} />
        <Skeleton h="46px" style={{ borderRadius: "10px" }} />
        <Skeleton h="46px" style={{ borderRadius: "10px" }} />
        <SkeletonButton w="100%" h="48px" />
      </div>
    </SkeletonCard>
  </div>
);

/* generic fallback for any route without a dedicated skeleton */
export const GenericPageSkeleton = () => (
  <div className="skeleton-page">
    <div className="skeleton-page-inner">
      <Skeleton w="300px" h="40px" style={{ marginBottom: "28px" }} />
      <SkeletonText lines={5} h="14px" />
      <div className="skeleton-grid" style={{ marginTop: "40px" }}>
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i}>
            <Skeleton h="160px" style={{ marginBottom: "16px" }} />
            <SkeletonText lines={2} />
          </SkeletonCard>
        ))}
      </div>
    </div>
  </div>
);
