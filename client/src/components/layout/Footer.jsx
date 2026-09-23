import "./Footer.css";

/** Organism. Shared footer, identical on every page. */
export function Footer() {
  return (
    <footer className="site-footer" data-footer-boundary>
      <div className="shell site-footer__row">
        <span>&copy; {new Date().getFullYear()} Prime Meridian Realty. Licensed real estate brokerage.</span>
        <span>Transactions &amp; dispute resolution, handled by one broker.</span>
      </div>
    </footer>
  );
}
