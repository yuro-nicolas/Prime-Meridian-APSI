import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { AdminInventory } from "../../components/properties/AdminInventory";
import { FilterBar } from "../../components/properties/FilterBar";
import { Button } from "../../components/ui/Button";
import { ACTIVE_STATUSES, ARCHIVE_STATUSES } from "../../components/properties/propertyFormConstants";

const DEFAULT_FILTERS = { status: "all", category: "all", minPrice: "", maxPrice: "", sort: "default", visibility: "all" };

export function AdminListings() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState("loading");
  const [view, setView] = useState("active"); // "active" | "archive"
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const list = await api.listProperties({}, { includePrivate: true });
      setProperties(list);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  function set(field, value) {
    setFilters((f) => ({ ...f, [field]: value }));
  }

  const visible = useMemo(() => {
    const statusSet = view === "active" ? ACTIVE_STATUSES : ARCHIVE_STATUSES;
    return properties.filter((p) => {
      if (!statusSet.includes(p.status)) return false;
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (filters.visibility === "public" && !p.is_public) return false;
      if (filters.visibility === "private" && p.is_public) return false;
      if (filters.minPrice && Number(p.price) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(p.price) > Number(filters.maxPrice)) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sort === "asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (filters.sort === "desc") return (b.price ?? -Infinity) - (a.price ?? -Infinity);
      return 0;
    });
  }, [properties, view, filters]);

  const statusOptions = view === "active" ? ACTIVE_STATUSES : ARCHIVE_STATUSES;

  async function handleToggleVisibility(id) {
    const property = properties.find((p) => p.id === id);
    if (!property) return;
    try {
      await api.updateProperty(id, { ...property, is_public: !property.is_public });
      await refresh();
    } catch (err) {
      window.alert("Couldn't update visibility: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this listing? This can't be undone.")) return;
    try {
      await api.deleteProperty(id);
      await refresh();
    } catch (err) {
      window.alert("Couldn't delete: " + err.message);
    }
  }

  const activeCount = properties.filter((p) => ACTIVE_STATUSES.includes(p.status)).length;
  const archiveCount = properties.filter((p) => ARCHIVE_STATUSES.includes(p.status)).length;

  return (
    <div className="shell">
      <div className="admin-page__head">
        <div className="section__head" style={{ marginBottom: 0 }}>
          <h2>Listings</h2>
          <p>Public listings show up on the live site; private ones only show up here.</p>
        </div>
        <Button onClick={() => navigate("/admin/listings/new")}>Add new listing</Button>
      </div>

      <div className="admin-subtabs">
        <button
          className={`admin-subtab ${view === "active" ? "is-active" : ""}`}
          onClick={() => { setView("active"); setFilters(DEFAULT_FILTERS); }}
        >
          Active ({activeCount})
        </button>
        <button
          className={`admin-subtab ${view === "archive" ? "is-active" : ""}`}
          onClick={() => { setView("archive"); setFilters(DEFAULT_FILTERS); }}
        >
          Archive — Sold / Rented / Leased ({archiveCount})
        </button>
      </div>

      <FilterBar
        statusOptions={statusOptions}
        status={filters.status} onStatusChange={(v) => set("status", v)}
        category={filters.category} onCategoryChange={(v) => set("category", v)}
        minPrice={filters.minPrice} onMinPriceChange={(v) => set("minPrice", v)}
        maxPrice={filters.maxPrice} onMaxPriceChange={(v) => set("maxPrice", v)}
        sort={filters.sort} onSortChange={(v) => set("sort", v)}
        showVisibility
        visibility={filters.visibility} onVisibilityChange={(v) => set("visibility", v)}
        resultCount={visible.length}
        onClear={() => setFilters(DEFAULT_FILTERS)}
      />

      {status === "loading" && <div className="empty">Loading listings…</div>}
      {status === "error" && <div className="empty empty--error">Couldn't load listings</div>}
      {status === "ready" && (
        <AdminInventory
          properties={visible}
          onEdit={(id) => navigate(`/admin/listings/${id}/edit`)}
          onToggleVisibility={handleToggleVisibility}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
