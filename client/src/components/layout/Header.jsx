import { NavLink } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu";
import { useRouteTransition } from "../../hooks/useRouteTransition";
import "./Header.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/listings", label: "Listings" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

/**
 * Organism. Site header + nav, shared by every page via Layout.
 * Hamburger + logo pinned to the shell's left edge, links pinned to
 * the shell's right edge — so the header's outer edges line up with
 * the same .shell column used everywhere else on the site (including
 * the wordmark in the footer/WorkWithUs banner below).
 *
 * The links are briefly (400ms) unclickable right after a navigation
 * — see useRouteTransition — so mashing multiple links in a row
 * can't queue up more route changes than the app has settled from.
 */
export function Header() {
  const isTransitioning = useRouteTransition();

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav__cluster">
          <HamburgerMenu />
          <NavLink to="/" className="logo-placeholder" aria-label="Prime Meridian Realty — Home">
            PM
          </NavLink>
        </div>

        <ul className={`nav__links ${isTransitioning ? "is-buffering" : ""}`}>
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
