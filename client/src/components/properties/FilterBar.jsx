import { CATEGORIES } from "./propertyFormConstants";
import "./FilterBar.css";

/**
 * Molecule. Shared between the public Listings page and Admin
 * Listings — status, category, price range, sort, and a Clear
 * button. Admin additionally gets a Public/Private visibility
 * filter via `showVisibility`; everything else is identical, so the
 * two pages feel like the same tool with one extra control.
 */
export function FilterBar({
  statusOptions,
  status, onStatusChange,
  category, onCategoryChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange,
  sort, onSortChange,
  showVisibility = false,
  visibility, onVisibilityChange,
  resultCount,
  onClear,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__grid">
        <div className="field">
          <label htmlFor="statusFilter">Status</label>
          <select id="statusFilter" value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="all">All statuses</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="categoryFilter">Category</label>
          <select id="categoryFilter" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="field field--price">
          <label htmlFor="minPrice">Price range (₱)</label>
          <div className="filter-bar__price-row">
            <input
              id="minPrice"
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
            />
            <span>–</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              aria-label="Max price"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="sortOrder">Sort by price</label>
          <select id="sortOrder" value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="default">Featured</option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>

        {showVisibility && (
          <div className="field">
            <label htmlFor="visibilityFilter">Visibility</label>
            <select id="visibilityFilter" value={visibility} onChange={(e) => onVisibilityChange(e.target.value)}>
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        )}

        <button type="button" className="btn btn--ghost filter-bar__clear" onClick={onClear}>
          Clear filters
        </button>
      </div>

      <div className="filter-bar__count">
        {resultCount} {resultCount === 1 ? "property" : "properties"}
      </div>
    </div>
  );
}
