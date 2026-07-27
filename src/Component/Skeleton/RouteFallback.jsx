import React from "react";
import { useLocation } from "react-router-dom";
import {
  HomeSkeleton,
  AboutSkeleton,
  ContactSkeleton,
  ProjectsSkeleton,
  ProjectDetailSkeleton,
  LoginSkeleton,
  GenericPageSkeleton,
} from "./PageSkeletons";

/* ─────────────────────────────────────────────────────────────
   RouteFallback — the <Suspense> fallback used in App.jsx.

   When a lazy route's JS chunk is still downloading (which is
   exactly what happens on a slow network), Suspense renders this
   component. It looks at the URL being opened and shows the
   skeleton that matches THAT page's layout, so the user sees a
   preview of the page shape instead of a blank screen or spinner.
   ───────────────────────────────────────────────────────────── */

const SKELETONS = {
  "/":             HomeSkeleton,
  "/about":        AboutSkeleton,
  "/contact":      ContactSkeleton,
  "/login":        LoginSkeleton,
  "/projects":     ProjectsSkeleton,
  "/applevisiop":  ProjectDetailSkeleton,
  "/mindstrategy": ProjectDetailSkeleton,
  "/secure":       ProjectDetailSkeleton,
};

const RouteFallback = () => {
  const { pathname } = useLocation();
  const Match = SKELETONS[pathname.toLowerCase()] || GenericPageSkeleton;
  return <Match />;
};

export default RouteFallback;
