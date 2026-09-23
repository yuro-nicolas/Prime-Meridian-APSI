import { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import { PropertyGallery } from "../components/properties/PropertyGallery";
import { ListingDetailModal } from "../components/properties/ListingDetailModal";
import { VideoHero } from "../components/home/VideoHero";
import { ServicesSection } from "../components/home/ServicesSection";
import { IntroSection } from "../components/home/IntroSection";
import { WorkWithUs } from "../components/home/WorkWithUs";
import "./Home.css";

// Background refresh interval for pages left open in a tab — invisible
// to the person browsing (see useProperties.js), just keeps listings
// from going stale without anyone having to hit reload.
const POLL_MS = 45000;

export function Home() {
  const { properties, status } = useProperties({}, { pollMs: POLL_MS });
  const active = properties.filter((p) => p.status !== "Sold" && p.status !== "Rented");
  const [viewingId, setViewingId] = useState(null);

  return (
    <>
      <VideoHero />

      <section className="section listings-section">
        <div className="shell">
          <div className="section__head">
            <h2>Current listings</h2>
            <p>A sample of what's active right now.</p>
          </div>

          {status === "loading" && <div className="empty">Loading listings…</div>}
          {status === "error" && <div className="empty empty--error">Couldn't load listings</div>}
          {status === "ready" && active.length === 0 && (
            <div className="empty">No active listings right now.</div>
          )}
          {status === "ready" && active.length > 0 && (
            <PropertyGallery properties={active} viewAllTo="/listings" onView={setViewingId} />
          )}
        </div>
      </section>

      <ServicesSection />
      <IntroSection />
      <WorkWithUs />

      {viewingId && <ListingDetailModal propertyId={viewingId} onClose={() => setViewingId(null)} />}
    </>
  );
}
