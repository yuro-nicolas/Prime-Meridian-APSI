import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteTransition } from "../../hooks/useRouteTransition";
import "./HamburgerMenu.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Listings" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

/**
 * Organism. A second, larger way to navigate: an icon that morphs
 * into an × and opens a full-screen menu, alongside (not replacing)
 * the spread-out links in Header. Rendered inline as part of the
 * header's centered nav cluster — only the overlay itself is
 * full-screen/fixed.
 */
export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isTransitioning = useRouteTransition();

  // Force-close whenever the route changes — covers browser
  // back/forward navigation and any other route change that doesn't
  // go through the links' own onClick below, so the overlay (and
  // its scroll lock) can never get left open on top of a different
  // page than the one it was opened on.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the overlay is open, and allow Escape to close it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="hamburgerOverlay"
        disabled={isTransitioning}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="hamburgerOverlay" className={`hamburger-overlay ${open ? "is-open" : ""}`}>
        <nav className={`shell hamburger-overlay__nav ${isTransitioning ? "is-buffering" : ""}`}>
          {LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `hamburger-overlay__link ${isActive ? "is-active" : ""}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="shell hamburger-overlay__footer">
          <div className="hamburger-overlay__brand">Prime Meridian Realty</div>
          <div className="hamburger-overlay__meta">Transactions &amp; dispute resolution, handled by one broker.</div>
        </div>
      </div>
    </>
  );
}
