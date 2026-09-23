import { useEffect } from "react";
import { useProperty } from "../../hooks/useProperty";
import { ListingDetailBody } from "./ListingDetailBody";
import "./ListingDetailModal.css";

/**
 * A bigger popup (same pattern as ConnectModal, larger) showing a
 * property's full detail — this is what opens when a card is
 * clicked, instead of navigating to /listings/:id. The page route
 * still exists separately for direct links/bookmarks/sharing.
 */
export function ListingDetailModal({ propertyId, onClose }) {
  const { property, status, error } = useProperty(propertyId);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="listing-modal__overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="listing-modal" role="dialog" aria-modal="true">
        <button className="listing-modal__close" onClick={onClose} aria-label="Close">&times;</button>

        {status === "loading" && <div className="empty">Loading listing…</div>}
        {status === "error" && error?.status === 404 && <div className="empty">Listing not found</div>}
        {status === "error" && error?.status !== 404 && <div className="empty empty--error">Couldn't load this listing</div>}
        {status === "ready" && property && <ListingDetailBody property={property} />}
      </div>
    </div>
  );
}
