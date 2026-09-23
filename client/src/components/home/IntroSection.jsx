import { Button } from "../ui/Button";
import { useParallax } from "../../hooks/useParallax";
import "./IntroSection.css";

/**
 * Organism. The old hero headline/lede/buttons, now its own photo
 * section — swapped with ServicesSection, which is plain/white and
 * sits first. Uses images/services-bg.jpg (the file already dropped
 * in for this slot before the swap); rename/replace it in
 * IntroSection.css whenever you'd rather point at a different file.
 * The background moves with a safe (transform-based, not
 * background-attachment:fixed) parallax effect — see useParallax.js.
 */
export function IntroSection() {
  const bgRef = useParallax(0.15);

  return (
    <section className="intro-section">
      <div ref={bgRef} className="intro-section__bg" />
      <div className="intro-section__scrim" />
      <div className="shell intro-section__content">
        <h2>Buying, selling, or untangling a dispute — one broker, start to finish.</h2>
        <p className="intro-section__lede">
          Marcus Reyes handles residential and commercial transactions and, when a deal or a
          title runs into conflict, the dispute resolution that follows — so you're never
          handed off partway through.
        </p>
        <div className="intro-section__actions">
          <Button to="/about-us" variant="brass">Meet the broker</Button>
        </div>
      </div>
    </section>
  );
}
