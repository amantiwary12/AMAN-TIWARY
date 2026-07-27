# Skeleton Loading System — How It Works & How To Use It

This portfolio now has a complete loading system with three layers:

1. **Page skeletons** — grey shimmering placeholders shaped like each page,
   shown while that page's code is still downloading.
2. **Image skeletons** — every project image shimmers until the actual
   picture finishes downloading (biggest win on slow networks).
3. **Network awareness** — a floating banner tells the visitor when they
   are offline, on a very slow (2G / data-saver) connection, or back online.

---

## Where everything lives

```
src/
├── Component/Skeleton/
│   ├── Skeleton.jsx        ← building blocks (Skeleton, SkeletonText,
│   │                          SkeletonCircle, SkeletonButton,
│   │                          SkeletonCard, SkeletonImage)
│   ├── Skeleton.css        ← shimmer animation + all skeleton styles
│   ├── PageSkeletons.jsx   ← one ready-made skeleton per page
│   ├── RouteFallback.jsx   ← picks the right page skeleton from the URL
│   └── NetworkBanner.jsx   ← offline / slow / back-online pill
├── hooks/
│   └── useNetworkStatus.js ← { online, slow } hook
└── App.jsx                 ← lazy routes + <Suspense> wiring
```

---

## Layer 1 — Page skeletons (automatic, already wired)

In `App.jsx` every page is now **lazy loaded**:

```jsx
const Projects = lazy(() => import("./Pages/Projects/Projects"));
```

That means each page is a separate JS file that only downloads when the
visitor opens it. While it downloads, `<Suspense>` shows the fallback:

```jsx
<Suspense fallback={<RouteFallback />}>
  <Routes>…</Routes>
</Suspense>
```

`RouteFallback` looks at the URL and renders the matching skeleton:

| URL                                    | Skeleton shown          |
| -------------------------------------- | ----------------------- |
| `/`                                    | `HomeSkeleton`          |
| `/about`                               | `AboutSkeleton`         |
| `/contact`                             | `ContactSkeleton`       |
| `/projects`                            | `ProjectsSkeleton`      |
| `/login`                               | `LoginSkeleton`         |
| `/MindSTrategy`, `/secure`, `/Applevisiop` | `ProjectDetailSkeleton` |
| anything else                          | `GenericPageSkeleton`   |

On fast Wi-Fi the skeleton may only flash for a few milliseconds.
On slow 3G/4G it holds the page shape until the code arrives — no blank
white screen, no layout jumping.

**Adding a new page?** Three steps:
1. Add the route as `lazy(() => import(...))` in `App.jsx`.
2. Build a skeleton for it in `PageSkeletons.jsx` (copy an existing one).
3. Register it in the `SKELETONS` map in `RouteFallback.jsx`
   (key must be the lowercase path).

---

## Layer 2 — Image skeletons (`SkeletonImage`)

`SkeletonImage` is a drop-in replacement for `<img>`. It renders the real
image invisibly, keeps a shimmer on top, and cross-fades the photo in once
the browser actually has it:

```jsx
import { SkeletonImage } from "../../Component/Skeleton/Skeleton";

<SkeletonImage
  src={p.image}
  alt={p.title}
  className="w-full h-full object-cover"
/>
```

Already applied to:
- Project cards on **/projects** (Unsplash images — remote, often slow)
- Project cards on the **home page** (`MultiC.jsx`)
- Hero images on **Mind Strategy** and **Secure Sphere** detail pages

Notes:
- The wrapper `div` fills its parent (`width/height: 100%`), so give the
  *parent* the size — exactly how the cards already work.
- Pass `wrapClassName` / `wrapStyle` if you need to style the wrapper.
- If the image fails, the shimmer stops instead of spinning forever.

---

## Layer 3 — Network awareness

### `useNetworkStatus()` hook

```jsx
import useNetworkStatus from "./hooks/useNetworkStatus";

const { online, slow } = useNetworkStatus();
```

- `online` — flips to `false` instantly when the connection drops.
- `slow` — `true` on 2G / slow-2G connections or when Data Saver is on
  (uses the Network Information API; browsers that don't support it just
  report `false`, which is safe).

Use it to skip heavy work on weak connections, e.g. don't autoplay video,
or load a lighter image variant when `slow` is true.

### `<NetworkBanner />` (already mounted in App.jsx)

A small pill at the bottom of the screen:
- 🔴 **"You're offline — check your connection"** while disconnected
- 🟡 **"Slow connection — content may take a moment"** on 2G/data-saver
- 🟢 **"Back online"** for 3 seconds after reconnecting

---

## Building your own skeletons — the primitives

```jsx
import {
  Skeleton, SkeletonText, SkeletonCircle,
  SkeletonButton, SkeletonCard,
} from "./Component/Skeleton/Skeleton";

<Skeleton w="70%" h="20px" />          // one shimmering bar
<Skeleton w="64px" h="24px" pill />    // pill/tag shape
<SkeletonText lines={3} />             // paragraph (last line shorter)
<SkeletonCircle size="48px" />         // avatar / icon
<SkeletonButton w="140px" />           // button shape
<SkeletonCard> …blocks… </SkeletonCard> // bordered card shell
```

Rules of thumb for good skeletons:
- **Match the real layout** — same heights, same grid, same spacing, so
  the page doesn't jump when the content pops in.
- **Less is more** — represent the big shapes (image, title, 2–3 text
  lines), not every element.
- They're `aria-hidden` and non-interactive by design; screen readers
  skip them.
- The shimmer respects `prefers-reduced-motion` automatically.

---

## How to test it

Chrome DevTools → **Network** tab:
1. **Throttling → Slow 3G**, then hard-refresh and click between pages —
   you'll see each page's skeleton hold the layout while its chunk and
   images download.
2. **Throttling → Offline** — the red offline pill appears; switch back
   to *No throttling* and the green "Back online" pill flashes.
3. `npm run build` output now shows several small chunk files instead of
   one big `main.js` — that's the code-splitting working.
