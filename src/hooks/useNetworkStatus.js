import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   useNetworkStatus — knows two things about the visitor:

     online : false the moment the browser loses connection
              (listens to the window online/offline events)
     slow   : true when the Network Information API reports a
              2g / slow-2g class connection or Data Saver mode.
              (Chrome/Edge/Android support it; on browsers that
              don't, `slow` simply stays false — safe default.)

   Use it anywhere:
     const { online, slow } = useNetworkStatus();
     if (!online) …show offline notice…
     if (slow)   …skip heavy images / autoplay…
   ───────────────────────────────────────────────────────────── */

const getConnection = () =>
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const isSlow = () => {
  const c = getConnection();
  if (!c) return false;
  return c.saveData === true || /(^|-)2g$/.test(c.effectiveType || "");
};

export default function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [slow, setSlow] = useState(isSlow());

  useEffect(() => {
    const goOnline  = () => setOnline(true);
    const goOffline = () => setOnline(false);
    const onChange  = () => setSlow(isSlow());

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    const c = getConnection();
    if (c) c.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      if (c) c.removeEventListener("change", onChange);
    };
  }, []);

  return { online, slow };
}
