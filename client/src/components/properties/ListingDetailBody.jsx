import { useState } from "react";
import { fmtPrice, propertyName, parsePhotoUrls, parseFeatures } from "../../lib/api";
import { HouseIllustration } from "../ui/HouseIllustration";
import { StatusBadge } from "../ui/StatusBadge";
import { ConnectModal } from "../connect/ConnectModal";
import "./ListingDetailBody.css";

/**
 * The actual property detail content — photos, facts, description,
 * links, and a "Contact about this property" button. Shared between
 * the standalone /listings/:id page (for direct links/bookmarks) and
 * ListingDetailModal (the popup opened from a card click).
 */
export function ListingDetailBody({ property: p }) {
  const photos = parsePhotoUrls(p.photo_urls);
  const features = parseFeatures(p.other_features);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const price = fmtPrice(p.price);
  const location = [p.address, p.city].filter(Boolean).join(", ");

  const facts = [
    p.lot_area_sqm ? { label: "Lot area", value: `${p.lot_area_sqm} sqm` } : null,
    p.floor_area_sqm ? { label: "Floor area", value: `${p.floor_area_sqm} sqm` } : null,
    p.beds ? { label: "Bedrooms", value: p.beds } : null,
    p.baths ? { label: "Bathrooms (T&B)", value: p.baths } : null,
  ].filter(Boolean);

  return (
    <div className="detail__grid">
      <div>
        <div className="detail__figure">
          {photos.length > 0
            ? <img src={photos[activePhoto]} alt="" />
            : <HouseIllustration style={p.style || "cottage"} />}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="detail__photo-nav detail__photo-nav--prev"
                onClick={() => setActivePhoto((i) => (i === 0 ? photos.length - 1 : i - 1))}
                aria-label="Previous photo"
              >
                &#8592;
              </button>
              <button
                type="button"
                className="detail__photo-nav detail__photo-nav--next"
                onClick={() => setActivePhoto((i) => (i === photos.length - 1 ? 0 : i + 1))}
                aria-label="Next photo"
              >
                &#8594;
              </button>
            </>
          )}
        </div>
        {photos.length > 1 && (
          <div className="detail__thumbs">
            {photos.map((url, i) => (
              <button
                key={url}
                className={`detail__thumb ${i === activePhoto ? "is-active" : ""}`}
                onClick={() => setActivePhoto(i)}
                aria-label={`Photo ${i + 1}`}
              >
                <img src={url} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        {p.property_type && <div className="detail__type">{p.property_type}</div>}
        {p.status && <StatusBadge status={p.status} />}
        {price && <div className="detail__price">{price}</div>}
        <div className="detail__addr">{propertyName(p)}</div>
        {location && <div className="detail__location">{location}</div>}

        {facts.length > 0 && (
          <div className="facts">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="facts__num">{f.value}</div>
                <div className="facts__label">{f.label}</div>
              </div>
            ))}
          </div>
        )}

        {features.length > 0 && (
          <div className="detail__features">
            {features.map((f) => <span key={f} className="detail__feature-tag">{f}</span>)}
          </div>
        )}

        {p.description && <p className="detail__desc">{p.description}</p>}
        {p.other_info && (
          <div className="detail__other-info">
            <strong>Good to know:</strong> {p.other_info}
          </div>
        )}

        <div className="detail__links">
          {p.map_url && (
            <a href={p.map_url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              View on Google Maps
            </a>
          )}
          {p.video_url && (
            <a href={p.video_url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Watch video
            </a>
          )}
        </div>

        <button type="button" className="btn btn--primary" onClick={() => setShowContact(true)}>
          Contact about this property
        </button>
      </div>

      {showContact && (
        <ConnectModal
          onClose={() => setShowContact(false)}
          propertyContext={{ id: p.id, label: propertyName(p) }}
          size="compact"
        />
      )}
    </div>
  );
}
