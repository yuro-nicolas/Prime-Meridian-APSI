import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { PropertyForm } from "../../components/properties/PropertyForm";
import { EMPTY_PROPERTY } from "../../components/properties/propertyFormConstants";
import { Button } from "../../components/ui/Button";

// A raw database row can have nulls anywhere (every field is
// optional), but a controlled <input> needs a string, not null, or
// React will complain about switching between controlled/uncontrolled.
function toFormValues(row) {
  const values = { ...EMPTY_PROPERTY };
  for (const key of Object.keys(values)) {
    if (key === "is_public") {
      values.is_public = row.is_public !== false;
    } else {
      values[key] = row[key] ?? "";
    }
  }
  return values;
}

export function AdminListingEditor({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(mode === "add" ? EMPTY_PROPERTY : null);
  const [loadStatus, setLoadStatus] = useState(mode === "add" ? "ready" : "loading");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (mode !== "edit") return;
    let cancelled = false;
    api.getProperty(id, { includePrivate: true })
      .then((row) => {
        if (cancelled) return;
        setInitialValues(toFormValues(row));
        setLoadStatus("ready");
      })
      .catch(() => { if (!cancelled) setLoadStatus("error"); });
    return () => { cancelled = true; };
  }, [mode, id]);

  async function handleSubmit(data) {
    setFormError(null);
    try {
      if (mode === "edit") {
        await api.updateProperty(id, data);
      } else {
        await api.createProperty(data);
      }
      navigate("/admin/listings");
    } catch (err) {
      setFormError(err.message);
    }
  }

  return (
    <div className="shell admin-editor">
      <Button variant="ghost" onClick={() => navigate("/admin/listings")} className="admin-editor__back">
        &larr; Back to listings
      </Button>

      {loadStatus === "loading" && <div className="empty">Loading listing…</div>}
      {loadStatus === "error" && <div className="empty empty--error">Couldn't load this listing</div>}
      {loadStatus === "ready" && (
        <PropertyForm
          mode={mode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/listings")}
          error={formError}
        />
      )}
    </div>
  );
}
