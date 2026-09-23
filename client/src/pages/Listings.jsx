import { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import { PropertyCard } from "../components/properties/PropertyCard";
import { ListingDetailModal } from "../components/properties/ListingDetailModal";
import { FilterBar } from "../components/properties/FilterBar";
import { PUBLIC_STATUSES } from "../components/properties/propertyFormConstants";

const POLL_MS = 45000;

const DEFAULT_FILTERS = { status: "all", category: "all", minPrice: "", maxPrice: "", sort: "default" };

export function Listings() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [viewingId, setViewingId] = useState(null);

  const query = {};
  if (filters.status !== "all") query.status = filters.status;
  if (filters.category !== "all") query.category = filters.category;
  if (filters.minPrice) query.minPrice = filters.minPrice;
  if (filters.maxPrice) query.maxPrice = filters.maxPrice;
  if (filters.sort !== "default") query.sort = filters.sort;

  const { properties, status: loadStatus } = useProperties(query, { pollMs: POLL_MS });

  function set(field, value) {
    setFilters((f) => ({ ...f, [field]: value }));
  }

  return (
    <section className="section">
      <div className="shell">
        <div className="section__head">
          <h2>Available properties</h2>
          <p>Live from the database — changing a filter below re-queries the API.</p>
        </div>

        <FilterBar
          statusOptions={PUBLIC_STATUSES}
          status={filters.status} onStatusChange={(v) => set("status", v)}
          category={filters.category} onCategoryChange={(v) => set("category", v)}
          minPrice={filters.minPrice} onMinPriceChange={(v) => set("minPrice", v)}
          maxPrice={filters.maxPrice} onMaxPriceChange={(v) => set("maxPrice", v)}
          sort={filters.sort} onSortChange={(v) => set("sort", v)}
          resultCount={loadStatus === "ready" ? properties.length : 0}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />

        {loadStatus === "loading" && <div className="empty">Loading listings…</div>}
        {loadStatus === "error" && <div className="empty empty--error">Couldn't load listings</div>}
        {loadStatus === "ready" && properties.length === 0 && (
          <div className="empty">No properties match those filters.</div>
        )}
        {loadStatus === "ready" && properties.length > 0 && (
          <div className="listing-grid">
            {properties.map((p) => <PropertyCard key={p.id} property={p} onView={setViewingId} />)}
          </div>
        )}
      </div>

      {viewingId && <ListingDetailModal propertyId={viewingId} onClose={() => setViewingId(null)} />}
    </section>
  );
}
