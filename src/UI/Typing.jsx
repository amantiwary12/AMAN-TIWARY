import React, { useEffect, useState } from "react";

const TEXTS = [
  "MERN Stack Developer",
  "React.js Developer",
  "Node.js & Express Backend",
  "REST API Architect",
  "Problem Solver",
];

const Typing = () => {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = TEXTS[textIdx];

    const delay = deleting
      ? 40
      : charIdx === current.length
      ? 1800
      : 90;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((i) => i + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((i) => i - 1);
      } else {
        setDeleting(false);
        setTextIdx((i) => (i + 1) % TEXTS.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx]);

  return (
    <p className="text-xl md:text-2xl font-medium" style={{ color: "#94a3b8", minHeight: "2rem" }}>
      <span className="g-text font-semibold">{displayed}</span>
      <span
        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
        style={{
          background: "#ee5b2e",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </p>
  );
};

export default Typing;
