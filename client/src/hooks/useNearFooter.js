import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useNearFooter() {
  const { pathname } = useLocation();
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-footer-boundary]");
    if (!target) {
      setNearFooter(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();

  }, [pathname]);

  return nearFooter;
}
