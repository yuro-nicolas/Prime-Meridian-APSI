import { useParams } from "react-router-dom";
import { useProperty } from "../hooks/useProperty";
import { ListingDetailBody } from "../components/properties/ListingDetailBody";
import { Button } from "../components/ui/Button";

export function ListingDetail() {
  const { id } = useParams();
  const { property, status, error } = useProperty(id);

  return (
    <section className="section">
      <div className="shell">
        <Button to="/listings" variant="ghost" className="detail__back">&larr; Back to listings</Button>

        {status === "loading" && <div className="empty">Loading listing…</div>}

        {status === "error" && error?.status === 404 && (
          <div className="empty">
            <h2>Listing not found</h2>
            <Button to="/listings" variant="ghost">Back to listings</Button>
          </div>
        )}
        {status === "error" && error?.status !== 404 && (
          <div className="empty empty--error">Couldn't load this listing</div>
        )}

        {status === "ready" && property && <ListingDetailBody property={property} />}
      </div>
    </section>
  );
}
