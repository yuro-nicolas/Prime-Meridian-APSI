import { useEffect, useRef, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { Button } from "../ui/Button";
import "./PropertyGallery.css";

const MAX_VISIBLE = 4;
const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 420;

// Mirrors the breakpoints this component sizes for — keep in sync
// with the media queries below if you change them.
function getVisibleCount() {
  if (typeof window === "undefined") return MAX_VISIBLE;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 980) return 2;
  if (window.innerWidth <= 1200) return 3;
  return MAX_VISIBLE;
}

/**
 * Organism. A horizontal, auto-advancing carousel of property cards —
 * loops seamlessly in BOTH directions, pauses on hover/focus, and
 * always respects prefers-reduced-motion. Falls back to a plain grid
 * when there aren't enough properties to make a carousel meaningful.
 *
 * Looping approach: clones sit on both ends of the real items —
 * MAX_VISIBLE copies of the last few properties before the real
 * list, and MAX_VISIBLE copies of the first few after it. That lets
 * up to MAX_VISIBLE consecutive clicks in either direction animate
 * normally; only stepping past that buffer needs an instant,
 * invisible snap back to the equivalent real position. (An earlier
 * version only cloned forward, so the very first backward press from
 * the start was always an instant unanimated jump — this fixes that.)
 *
 * Sizing note: the track's width and each slide's width are set
 * explicitly (inline styles, computed from the actual item count)
 * rather than left to percentage-of-container flex-basis math — see
 * the git history for why that matters (it was a real bug once).
 *
 * Performance note: autoplay only runs while the gallery is actually
 * in (or near) the viewport, via IntersectionObserver.
 */
export function PropertyGallery({ properties, onView, viewAllTo = "/listings" }) {
  const canLoop = properties.length > MAX_VISIBLE;
  const startIndex = canLoop ? MAX_VISIBLE : 0;

  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onResize() { setVisibleCount(getVisibleCount()); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "10% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clones on both sides: [last MAX_VISIBLE items] + [real items] + [first MAX_VISIBLE items].
  const items = canLoop
    ? [...properties.slice(-MAX_VISIBLE), ...properties, ...properties.slice(0, MAX_VISIBLE)]
    : properties;

  // Each slide takes up exactly 1/visibleCount of the viewport, no
  // matter how many total items exist — the track is sized wider
  // than the viewport to fit all of them, and each slide is sized as
  // a fraction of the track's own (wider) width.
  const trackWidthPct = (items.length / visibleCount) * 100;
  const slideWidthPct = 100 / items.length;

  useEffect(() => {
    if (!canLoop || paused || !inView) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MAX_VISIBLE + properties.length));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [canLoop, paused, inView, properties.length]);

  // Past the last real item (into the suffix clones) → after the
  // slide finishes, silently snap back to the equivalent real
  // position with no transition.
  useEffect(() => {
    if (!canLoop) return;
    if (index !== MAX_VISIBLE + properties.length) return;
    const timeout = setTimeout(() => {
      setWithTransition(false);
      setIndex(MAX_VISIBLE);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [index, canLoop, properties.length]);

  // Past the first real item, back into the prefix clones → same
  // idea, mirrored: once we've stepped back past all the prefix
  // clones, silently snap to the equivalent real position.
  useEffect(() => {
    if (!canLoop) return;
    if (index !== -1) return;
    const timeout = setTimeout(() => {
      setWithTransition(false);
      setIndex(MAX_VISIBLE + properties.length - 1);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [index, canLoop, properties.length]);

  // Re-enable the transition on the next frame after a silent snap-back.
  useEffect(() => {
    if (withTransition) return;
    const raf = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [withTransition]);

  function goTo(delta) {
    if (!canLoop) {
      setIndex((i) => Math.max(0, Math.min(i + delta, properties.length - 1)));
      return;
    }
    // Clamp to exactly the wrap-trigger boundaries (-1 and
    // MAX_VISIBLE + properties.length) — reachable, but never past —
    // so rapid clicking can't overshoot the clone buffer and land on
    // blank space before the snap-back effect has a chance to fire.
    const maxIndex = MAX_VISIBLE + properties.length;
    setIndex((i) => Math.max(-1, Math.min(i + delta, maxIndex)));
  }

  if (!canLoop) {
    // Not enough listings to justify a carousel — a plain grid reads better.
    return (
      <div ref={rootRef}>
        <div className="listing-grid">
          {properties.map((p) => <PropertyCard key={p.id} property={p} onView={onView} />)}
        </div>
        <div className="section__foot">
          <Button to={viewAllTo} variant="ghost" className="gallery__view-all">See all listings</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="gallery__viewport">
        <div
          className="gallery__track"
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(-${index * slideWidthPct}%)`,
            transition: withTransition ? `transform ${TRANSITION_MS / 1000}s cubic-bezier(.4,0,.2,1)` : "none",
          }}
        >
          {items.map((p, i) => (
            <div className="gallery__slide" style={{ width: `${slideWidthPct}%` }} key={`${p.id}-${i}`}>
              <PropertyCard property={p} onView={onView} />
            </div>
          ))}
        </div>
      </div>

      <div className="gallery__controls">
        <div className="gallery__arrows">
          <button className="gallery__arrow" onClick={() => goTo(-1)} aria-label="Previous listings">
            &#8592;
          </button>
          <button className="gallery__arrow" onClick={() => goTo(1)} aria-label="Next listings">
            &#8594;
          </button>
        </div>
        <Button to={viewAllTo} variant="ghost" className="gallery__view-all">See all listings</Button>
      </div>
    </div>
  );
}
