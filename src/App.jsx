import React, { useState, useCallback, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Preloader from "./Component/Preloader/Preloader";
import { IntroReadyProvider } from "./Component/Preloader/IntroContext";
import Navbar from "./Component/Navbar/Navqbar";
import RouteFallback from "./Component/Skeleton/RouteFallback";
import NetworkBanner from "./Component/Skeleton/NetworkBanner";

/* ── Code-split every page ──
   Each page becomes its own JS chunk that only downloads when the
   visitor opens that route. While the chunk downloads (noticeable on
   slow networks), <Suspense> shows the matching page skeleton from
   RouteFallback instead of a blank screen. */
const Home         = lazy(() => import("./Component/Home"));
const Aboute       = lazy(() => import("./Component/Navbar/Aboute/Aboute"));
const Contact      = lazy(() => import("./Component/Navbar/Contact/Contact"));
const Login        = lazy(() => import("./Component/Navbar/Login/Login"));
const Applevisiop  = lazy(() => import("./Component/Navbar/Project/Applevisiop"));
const Securesphere = lazy(() => import("./Pages/Projects/SecureSphere"));
const MindSTrategy = lazy(() => import("./Pages/Projects/MindStrategy"));
const Projects     = lazy(() => import("./Pages/Projects/Projects"));

function App() {
  const [loading, setLoading] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const handlePreloaderDone = useCallback(() => setLoading(false), []);
  const handlePreloaderReveal = useCallback(() => setIntroReady(true), []);

  return (
    <Router>
      {loading && (
        <Preloader onComplete={handlePreloaderDone} onReveal={handlePreloaderReveal} />
      )}
      <IntroReadyProvider ready={introReady}>
        <Navbar />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<Aboute />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Applevisiop" element={<Applevisiop/>} />
            <Route path="/MindSTrategy" element={<MindSTrategy/>} />
            <Route path="/secure" element={<Securesphere/>} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
        <NetworkBanner />
      </IntroReadyProvider>
    </Router>
  );
}

export default App;
