import { useRouteTransition } from "../../hooks/useRouteTransition";
import "./RouteProgressBar.css";

/**
 * A thin bar across the very top of the viewport that animates in
 * during the brief buffer after clicking a nav link — gives visible
 * feedback that the click registered, rather than the nav just
 * silently going quiet for a moment.
 */
export function RouteProgressBar() {
  const isTransitioning = useRouteTransition();
  return <div className={`route-progress ${isTransitioning ? "is-active" : ""}`} aria-hidden="true" />;
}
