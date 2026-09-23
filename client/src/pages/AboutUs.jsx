import { HouseIllustration } from "../components/ui/HouseIllustration";
import { Button } from "../components/ui/Button";
import "./AboutUs.css";

const SERVICES = [
  {
    title: "Brokerage",
    body: "Buying, selling, and leasing of real estate properties.",
  },
  {
    title: "Documentation",
    body: "Transfer of title, extrajudicial settlement, donation, and related documentation.",
  },
  {
    title: "Due Diligence",
    body: "Professional assistance in reviewing property and transaction matters.",
  },
  {
    title: "Mediation",
    body: "Amicable settlement of real estate disputes through mediation.",
  },
];

const CREDENTIALS = [
  "Licensed Real Estate Broker — License #RE-048213",
  "Certified Residential Specialist (CRS)",
  "Accredited Real Estate Mediator, State Association of Realtors",
  "14 years in residential and commercial transactions",
  "Member, National Association of Realtors",
];

// Combines what used to be two separate pages — "About Prime Meridian"
// (/about-us) and "About the Broker" (/about) — into one About Us
// screen. A visitor gets the company and the person behind it in a
// single scroll instead of having to find a second page.
export function AboutUs() {
  return (
    <>
      <section className="section about-company__intro">
        <div className="shell about-company__intro-grid">
          <div>
            <div className="section__head">
              <h2>About Prime Meridian Realty</h2>
              <p className="about-company__established">Established July 28, 2015</p>
            </div>
            <p className="about-company__lede">
              Prime Meridian Realty is a real estate professional-services firm providing
              assistance in property transactions, real estate documentation, title transfer, and
              amicable settlement of real estate disputes.
            </p>
            <p className="about-company__lede">
              The firm is committed to ethical practice, regulatory compliance, and professional
              service in the real estate sector. Its approach combines real estate brokerage with
              practical guidance in property-related documentation and dispute resolution.
            </p>
          </div>
          <div className="about-company__photo" aria-hidden="true" />
        </div>
      </section>

      <section className="section about-company__services">
        <div className="shell">
          <div className="section__head">
            <h2>Our Services</h2>
            <p>Professional assistance for property transactions and related real estate concerns.</p>
          </div>
          <div className="about-services">
            {SERVICES.map((s) => (
              <div className="about-service" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-company__approach">
        <div className="shell">
          <h2>Our professional-services approach</h2>
          <p>
            Prime Meridian Realty provides more than commission-based brokerage. The firm
            combines real estate transaction assistance, documentation, and mediation-related
            services to help clients address property matters professionally and responsibly.
          </p>
        </div>
      </section>

      <section className="section about-us__broker">
        <div className="shell broker">
          <div className="broker__portrait">
            <HouseIllustration style="colonial" />
          </div>
          <div>
            <div className="section__head">
              <h2>Meet the broker</h2>
            </div>
            <h3 className="broker__name">Marcus Reyes</h3>
            <div className="broker__title">Principal Broker, Prime Meridian Realty</div>
            <p className="broker__bio">
              Marcus has spent fourteen years on both sides of the closing table — negotiating
              transactions and, when they go sideways, resolving the disputes that come after.
              That dual view shapes how he prices, markets, and papers every deal he touches.
            </p>
            <ul className="credential-list">
              {CREDENTIALS.map((c) => (
                <li key={c}><span className="dot" /><span>{c}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-company__cta">
        <div className="about-company__cta-bg" aria-hidden="true" />
        <div className="about-company__cta-scrim" aria-hidden="true" />
        <div className="shell about-company__cta-content">
          <h3>Ready to talk about a property?</h3>
          <Button to="/contact" variant="ghost">Get in touch</Button>
        </div>
      </section>
    </>
  );
}
