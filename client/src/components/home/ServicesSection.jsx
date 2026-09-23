import { Button } from "../ui/Button";
import "./ServicesSection.css";

/**
 * Organism. "Two services, one point of contact" — deliberately
 * built without a photo: a muted background, an italic pull-quote
 * treatment for the company summary, and elevated cards give it
 * presence without imagery. Closes with a link through to the full
 * About Prime Meridian page.
 */
export function ServicesSection() {
  return (
    <section className="services-section">
      <div className="shell">
        <div className="services-section__top">
          <div className="section__head services-section__head">
            <h2>Two services, one point of contact</h2>
            <p>
              Most brokers stop at closing. Prime Meridian also represents clients when a
              transaction, boundary, or title turns into a disagreement.
            </p>
          </div>
          <p className="services-section__quote">
            &ldquo;The person who negotiates your deal should be the same person who sees it
            through, even when that means untangling a dispute after closing.&rdquo;
          </p>
        </div>

        <div className="services">
          <div className="service">
            <span className="service__tag">Transactions</span>
            <h3>Buying &amp; selling</h3>
            <p>
              Pricing, marketing, showings, offers, and negotiation through to closing — for
              single-family homes, condos, and small multi-unit properties.
            </p>
          </div>
          <div className="service">
            <span className="service__tag">Dispute resolution</span>
            <h3>When a deal goes sideways</h3>
            <p>
              Boundary disagreements, contract disputes, and post-closing conflicts, mediated
              by a broker who understands the transaction itself, not just the paperwork.
            </p>
          </div>
        </div>

        <p className="services-section__summary">
          Prime Meridian Realty is a residential and commercial brokerage built around a single
          idea: every listing, offer, and conflict runs through one point of contact from start
          to finish.
        </p>

        <div className="services-section__foot">
          <Button to="/about-us" variant="ghost">Learn more about us</Button>
        </div>
      </div>
    </section>
  );
}
