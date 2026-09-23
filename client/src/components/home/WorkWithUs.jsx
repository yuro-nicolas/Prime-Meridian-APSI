import { Button } from "../ui/Button";
import { useParallax } from "../../hooks/useParallax";
import "./WorkWithUs.css";

const VALUE_PROPS = [
  {
    tag: "Experience",
    title: "Years of Experience",
    body: "With years of experience in real estate, Prime Meridian Realty brings valuable market knowledge and professional guidance to every transaction.",
  },
  {
    tag: "Local Knowledge",
    title: "Market Expertise",
    body: "With a strong understanding of the market, we help clients make informed decisions.",
  },
  {
    tag: "Smooth Process",
    title: "Seamless Transactions",
    body: "From property viewing and negotiation to documentation and closing, we make the process smooth, straightforward, and hassle-free.",
  },
  {
    tag: "End-to-End Assistance",
    title: "Complete Real Estate Service",
    body: "From finding the right property to title transfer and final documentation, we guide you through every important step of the transaction.",
  },
];

/**
 * Organism. The Home page's closing section: a teaser paragraph, four
 * value-prop cards, then a photo banner (wordmark + "Work With Us"),
 * then a solid-color footer strip immediately below it with zero
 * gap — "combined with the footer" means touching, not sharing one
 * photo background. The footer strip uses the same color as the nav
 * bar and carries a data-footer-boundary flag so FloatingConnect
 * knows to get out of its way. Every other page gets the standalone
 * Footer instead — see Layout.jsx.
 */
export function WorkWithUs() {
  const bgRef = useParallax(0.15);

  return (
    <section className="work-with-us">
      <div className="shell work-with-us__intro">
        <h2>Thinking about your next move?</h2>
        <p>
          Whether you're listing a property, searching for the right one, or need a steady
          hand through a dispute, Prime Meridian is one call away.
        </p>
      </div>

      <div className="shell work-with-us__props">
        {VALUE_PROPS.map((v) => (
          <div className="value-prop" key={v.title}>
            <span className="value-prop__tag">{v.tag}</span>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </div>
        ))}
      </div>

      <div className="work-with-us__banner">
        <div ref={bgRef} className="work-with-us__banner-bg" />
        <div className="work-with-us__banner-scrim" />
        <div className="work-with-us__banner-content">
          <div className="work-with-us__wordmark">Prime Meridian Realty</div>
          <p className="work-with-us__tagline">Transactions &amp; dispute resolution, handled by one broker.</p>
          <Button to="/contact" variant="ghost" className="work-with-us__cta">
            Work With Us
          </Button>
        </div>
      </div>

      <div className="work-with-us__footer-strip" data-footer-boundary>
        <div className="shell work-with-us__footer-row">
          <span>&copy; {new Date().getFullYear()} Prime Meridian Realty. Licensed real estate brokerage.</span>
          <a href="tel:+14155550148" className="work-with-us__phone">(415) 555-0148</a>
        </div>
      </div>
    </section>
  );
}
