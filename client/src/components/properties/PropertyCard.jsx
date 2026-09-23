import { fmtPrice, propertyName, parsePhotoUrls } from "../../lib/api";
import { HouseIllustration } from "../ui/HouseIllustration";
import { StatusBadge } from "../ui/StatusBadge";
import "./PropertyCard.css";

/**
 * Molecule. One property, rendered identically wherever it appears
 * (Home's gallery, the Listings grid). Every card is the same fixed
 * size regardless of how much text a listing has — long fields
 * truncate with an ellipsis rather than growing the card. Clicking
 * anywhere on the card, or the "View Details" button specifically,
 * both open the detail popup via `onView(property.id)`.
 */
export function PropertyCard({ property, onView }) {
  const p = property;
  const photos = parsePhotoUrls(p.photo_urls);
  const price = fmtPrice(p.price);
  const location = [p.address, p.city].filter(Boolean).join(", ");
  const facts = [
    p.beds ? `${p.beds} bed` : null,
    p.baths ? `${p.baths} bath` : null,
    p.floor_area_sqm ? `${p.floor_area_sqm} sqm` : null,
  ].filter(Boolean);

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onView(p.id);
    }
  }

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => onView(p.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="card__figure">
        {photos[0]
          ? <img src={photos[0]} alt="" loading="lazy" />
          : <HouseIllustration style={p.style || "cottage"} />}
      </div>
      <div className="card__body">
        {p.status && <StatusBadge status={p.status} size="sm" />}
        {price && <div className="card__price">{price}</div>}
        <div className="card__addr">{propertyName(p)}</div>
        {location && <div className="card__city">{location}</div>}
        {facts.length > 0 && (
          <div className="card__meta">
            {facts.map((f) => <span key={f}>{f}</span>)}
          </div>
        )}
        <div className="card__foot">
          <button
            type="button"
            className="card__view-details"
            onClick={(e) => { e.stopPropagation(); onView(p.id); }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
