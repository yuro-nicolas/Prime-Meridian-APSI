import { PHONE, PHONE_HREF } from "../../lib/contact";
import "./Footer.css";

/** Organism. Shared footer, identical on every page. */
export function Footer() {
  return (
    <footer className="site-footer" data-footer-boundary>
      <div className="shell site-footer__row">
        <span>&copy; {new Date().getFullYear()} Prime Meridian Realty. Licensed real estate brokerage.</span>
        <a href={PHONE_HREF} className="site-footer__phone">{PHONE}</a>
      </div>
    </footer>
  );
}
