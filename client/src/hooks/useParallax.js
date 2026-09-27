import { useEffect, useRef } from "react";

export function useParallax(speed = 0.25) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;
    let active = false;

    function update() {
      ticking = false;
      if (!active) return;
      const rect = layer.parentElement.getBoundingClientRect();
      // Offset relative to the viewport center — 0 when the section
      // is centered on screen, growing as it scrolls away from that.
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      layer.style.transform = `translateY(${offset}px)`;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(layer.parentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return layerRef;
}
