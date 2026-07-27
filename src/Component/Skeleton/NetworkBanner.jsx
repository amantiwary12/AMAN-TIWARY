import React, { useEffect, useRef, useState } from "react";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import "./Skeleton.css";

/* ─────────────────────────────────────────────────────────────
   NetworkBanner — small floating pill at the bottom of the page.

     offline      → red    "You're offline — check your connection"
     slow (2G /
     data saver)  → yellow "Slow connection — content may take longer"
     reconnected  → green  "Back online" (auto-hides after 3s)

   Mounted once in App.jsx so it works on every page.
   ───────────────────────────────────────────────────────────── */

const NetworkBanner = () => {
  const { online, slow } = useNetworkStatus();
  const [showBack, setShowBack] = useState(false);
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!online) {
      wasOffline.current = true;
      setShowBack(false);
      return;
    }
    if (wasOffline.current) {
      wasOffline.current = false;
      setShowBack(true);
      const t = setTimeout(() => setShowBack(false), 3000);
      return () => clearTimeout(t);
    }
  }, [online]);

  if (!online) {
    return (
      <div className="network-banner network-banner--offline" role="status">
        <span className="dot" />
        You&apos;re offline — check your connection
      </div>
    );
  }

  if (showBack) {
    return (
      <div className="network-banner network-banner--back" role="status">
        <span className="dot" />
        Back online
      </div>
    );
  }

  if (slow) {
    return (
      <div className="network-banner network-banner--slow" role="status">
        <span className="dot" />
        Slow connection — content may take a moment
      </div>
    );
  }

  return null;
};

export default NetworkBanner;
