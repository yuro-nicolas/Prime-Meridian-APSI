import { useState } from "react";
import { STATUSES, CATEGORIES, STYLES } from "./propertyFormConstants";
import "./PropertyForm.css";

const NUMERIC_FIELDS = ["price", "lot_area_sqm", "floor_area_sqm", "beds", "baths"];

/**
 * Molecule. A controlled form for creating or editing a property.
 * Every field is optional on purpose — a broker filling this in
 * gradually shouldn't be blocked by anything. `mode` is "add" or
 * "edit"; `initialValues` seeds the fields.
 */
export function PropertyForm({ mode, initialValues, onSubmit, onCancel, error }) {
  const [values, setValues] = useState(initialValues);

  function set(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...values };
    for (const field of NUMERIC_FIELDS) {
      payload[field] = payload[field] === "" ? null : Number(payload[field]);
    }
    // Trim every text field so stray whitespace doesn't sneak in.
    for (const key of Object.keys(payload)) {
      if (typeof payload[key] === "string") payload[key] = payload[key].trim();
    }
    onSubmit(payload);
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h3>{mode === "edit" ? "Edit listing" : "Add a listing"}</h3>
      <p className="property-form__hint">
        Every field below is optional — fill in what you have now and add the rest later.
      </p>

      <label className="visibility-toggle">
        <input
          type="checkbox"
          checked={values.is_public}
          onChange={(e) => set("is_public", e.target.checked)}
        />
        <span>
          <strong>{values.is_public ? "Public" : "Private"}</strong>
          {" — "}
          {values.is_public
            ? "visible to visitors on the live site"
            : "hidden from the site; only visible here in Admin"}
        </span>
      </label>

      <fieldset className="property-form__section">
        <legend>Identity</legend>
        <div className="property-form__grid">
          <div className="form-field">
            <label htmlFor="pf-code">Property code</label>
            <input id="pf-code" placeholder="e.g. 0001" value={values.property_code} onChange={(e) => set("property_code", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-title">Title (optional name)</label>
            <input id="pf-title" placeholder="Leave blank to use the code or address" value={values.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-type">Property type</label>
            <input id="pf-type" placeholder="e.g. 2-Storey House and Lot" value={values.property_type} onChange={(e) => set("property_type", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-category">Category</label>
            <select id="pf-category" value={values.category} onChange={(e) => set("category", e.target.value)}>
              <option value="">Not set</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="property-form__section">
        <legend>Location</legend>
        <div className="property-form__grid">
          <div className="form-field">
            <label htmlFor="pf-address">Address / location</label>
            <input id="pf-address" value={values.address} onChange={(e) => set("address", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-city">City</label>
            <input id="pf-city" value={values.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-map">Google Maps link</label>
            <input id="pf-map" type="url" placeholder="https://maps.google.com/..." value={values.map_url} onChange={(e) => set("map_url", e.target.value)} />
          </div>
        </div>
      </fieldset>

      <fieldset className="property-form__section">
        <legend>Transaction</legend>
        <div className="property-form__grid">
          <div className="form-field">
            <label htmlFor="pf-price">Price (₱)</label>
            <input id="pf-price" type="number" min="0" value={values.price} onChange={(e) => set("price", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-status">Status</label>
            <select id="pf-status" value={values.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="property-form__section">
        <legend>Size</legend>
        <div className="property-form__grid">
          <div className="form-field">
            <label htmlFor="pf-lot">Lot area (sqm)</label>
            <input id="pf-lot" type="number" min="0" value={values.lot_area_sqm} onChange={(e) => set("lot_area_sqm", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-floor">Floor area (sqm)</label>
            <input id="pf-floor" type="number" min="0" value={values.floor_area_sqm} onChange={(e) => set("floor_area_sqm", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-beds">Bedrooms</label>
            <input id="pf-beds" type="number" min="0" value={values.beds} onChange={(e) => set("beds", e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="pf-baths">Bathrooms (T&amp;B)</label>
            <input id="pf-baths" type="number" min="0" value={values.baths} onChange={(e) => set("baths", e.target.value)} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="pf-features">Other features</label>
          <input id="pf-features" placeholder="e.g. Corner Lot, Morning sun" value={values.other_features} onChange={(e) => set("other_features", e.target.value)} />
          <span className="form-field__note">Separate short features with commas.</span>
        </div>
      </fieldset>

      <fieldset className="property-form__section">
        <legend>Photos &amp; video</legend>
        <div className="form-field">
          <label htmlFor="pf-photos">Photo links</label>
          <textarea id="pf-photos" rows={3} placeholder={"One image URL per line"} value={values.photo_urls} onChange={(e) => set("photo_urls", e.target.value)} />
          <span className="form-field__note">
            Paste one link per line (host the photos anywhere — Google Drive, Facebook, Imgur —
            and paste the direct image link). Leave blank to show a placeholder illustration instead.
          </span>
        </div>
        <div className="form-field">
          <label htmlFor="pf-video">Video link</label>
          <input id="pf-video" type="url" placeholder="YouTube or Facebook video link" value={values.video_url} onChange={(e) => set("video_url", e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="pf-style">Placeholder illustration style</label>
          <select id="pf-style" value={values.style} onChange={(e) => set("style", e.target.value)}>
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="form-field__note">Only shown when no photo links are given above.</span>
        </div>
      </fieldset>

      <fieldset className="property-form__section">
        <legend>Description</legend>
        <div className="form-field">
          <label htmlFor="pf-blurb">Short blurb (shown on cards)</label>
          <input id="pf-blurb" value={values.blurb} onChange={(e) => set("blurb", e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="pf-description">Full description</label>
          <textarea id="pf-description" rows={4} value={values.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="pf-other-info">Other information buyers should know</label>
          <textarea id="pf-other-info" rows={3} value={values.other_info} onChange={(e) => set("other_info", e.target.value)} />
        </div>
      </fieldset>

      <div className="property-form__actions">
        <button type="submit" className="btn btn--primary">
          {mode === "edit" ? "Save changes" : "Add listing"}
        </button>
        {mode === "edit" && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        )}
      </div>
      {error && <div className="empty empty--error">{error}</div>}
    </form>
  );
}
