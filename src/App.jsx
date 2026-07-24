import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Preloader from "./Component/Preloader/Preloader";
import { IntroReadyProvider } from "./Component/Preloader/IntroContext";
import Navbar from "./Component/Navbar/Navqbar";
import Login from "./Component/Navbar/Login/Login";
import Home from "./Component/Home"
import Aboute from "./Component/Navbar/Aboute/Aboute";
import Contact from "./Component/Navbar/Contact/Contact";
import Applevisiop from "./Component/Navbar/Project/Applevisiop";
import Securesphere from "./Pages/Projects/SecureSphere";
import MindSTrategy from "./Pages/Projects/MindStrategy";
import Projects from "./Pages/Projects/Projects";

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
      </IntroReadyProvider>
    </Router>
  );
}

export default App;
