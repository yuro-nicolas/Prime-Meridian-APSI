import { fmtPrice, propertyName, parsePhotoUrls } from "../../lib/api";
import { HouseIllustration } from "../ui/HouseIllustration";
import { StatusBadge } from "../ui/StatusBadge";
import "./AdminInventory.css";

/**
 * Molecule. The broker's own inventory view — every listing (public
 * and private) as a clickable card, styled like the public site's
 * PropertyCard rather than a plain data table, so managing listings
 * feels like using the actual website instead of a spreadsheet.
 */
export function AdminInventory({ properties, onEdit, onToggleVisibility, onDelete }) {
  if (!properties.length) {
    return <div className="empty">No listings yet — add one above.</div>;
  }

  return (
    <div className="admin-inventory">
      {properties.map((p) => {
        const photos = parsePhotoUrls(p.photo_urls);
        const price = fmtPrice(p.price);
        return (
          <div className="admin-card" key={p.id}>
            <button className="admin-card__figure" onClick={() => onEdit(p.id)} aria-label={`Edit ${propertyName(p)}`}>
              {photos[0]
                ? <img src={photos[0]} alt="" />
                : <HouseIllustration style={p.style || "cottage"} />}
            </button>

            <div className="admin-card__body">
              <div className="admin-card__badges">
                {p.status && <StatusBadge status={p.status} size="sm" />}
                <span className={`visibility-badge ${p.is_public ? "is-public" : "is-private"}`}>
                  {p.is_public ? "Public" : "Private"}
                </span>
              </div>

              <button className="admin-card__name" onClick={() => onEdit(p.id)}>
                {propertyName(p)}
              </button>
              {(p.address || p.city) && (
                <div className="admin-card__location">{[p.address, p.city].filter(Boolean).join(", ")}</div>
              )}
              <div className="admin-card__price">{price || "No price set"}</div>

              <div className="admin-card__actions">
                <button className="btn btn--ghost btn--sm" onClick={() => onEdit(p.id)}>Edit</button>
                <button className="btn btn--ghost btn--sm" onClick={() => onToggleVisibility(p.id)}>
                  {p.is_public ? "Make private" : "Make public"}
                </button>
                <button className="btn btn--ghost btn--sm admin-card__delete" onClick={() => onDelete(p.id)}>Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
