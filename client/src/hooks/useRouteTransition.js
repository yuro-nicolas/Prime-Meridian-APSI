import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const BUFFER_MS = 400;

export function useRouteTransition() {
  const { pathname } = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), BUFFER_MS);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return isTransitioning;
}
