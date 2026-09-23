/* ---------------------------------------------------------
   API layer — talks to the Express + PostgreSQL backend.
   API_BASE comes from Vite's env system so it can differ
   between local dev and a deployed build without touching code.
   Set VITE_API_BASE in a .env file (see .env.example).
---------------------------------------------------------- */
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const TOKEN_KEY = "pm-admin-token";

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}
function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function apiRequest(path, options = {}) {
  const token = getAdminToken();
  const res = await fetch(API_BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      /* response wasn't JSON — keep the generic message */
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Admin login/logout. The token is checked server-side on every
  // admin-only route (see server/middleware/adminAuth.js) — this
  // replaces the old client-side-only passcode.
  adminLogin: async (username, password) => {
    const { token } = await apiRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setAdminToken(token);
    return token;
  },
  adminLogout: async () => {
    try { await apiRequest("/admin/logout", { method: "POST" }); }
    finally { clearAdminToken(); }
  },

  // `includePrivate: true` is how the Admin page sees private
  // listings too — the server only honors this when a valid admin
  // token is attached (see routes/properties.js), so it's now a
  // real permission check, not just a convention.
  listProperties: (query = {}, { includePrivate = false } = {}) => {
    const params = { ...query };
    if (includePrivate) params.admin = "1";
    const qs = new URLSearchParams(params).toString();
    return apiRequest("/properties" + (qs ? `?${qs}` : ""));
  },
  getProperty: (id, { includePrivate = false } = {}) =>
    apiRequest(`/properties/${id}${includePrivate ? "?admin=1" : ""}`),
  createProperty: (data) => apiRequest("/properties", { method: "POST", body: JSON.stringify(data) }),
  updateProperty: (id, data) => apiRequest(`/properties/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProperty: (id) => apiRequest(`/properties/${id}`, { method: "DELETE" }),
  createInquiry: (data) => apiRequest("/inquiries", { method: "POST", body: JSON.stringify(data) }),
  listInquiries: () => apiRequest("/inquiries"),
  markInquiryRead: (id, isRead = true) => apiRequest(`/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ isRead }) }),
  deleteInquiry: (id) => apiRequest(`/inquiries/${id}`, { method: "DELETE" }),
  deleteAllInquiries: () => apiRequest("/inquiries", { method: "DELETE" }),
};

export const STATUS_CLASS = {
  "For Sale": "status--for-sale",
  "For Rent": "status--for-sale",
  "Pending": "status--pending",
  "Sold": "status--sold",
  "Rented": "status--sold",
};

// Prices are in Philippine pesos — Intl.NumberFormat handles the ₱
// symbol and comma grouping. Returns null (rather than "₱0") when
// there's no price at all, since price is optional now.
export function fmtPrice(n) {
  if (n === null || n === undefined || n === "") return null;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

// Splits the newline-separated photo_urls field into a clean array.
export function parsePhotoUrls(raw) {
  if (!raw) return [];
  return raw.split("\n").map((s) => s.trim()).filter(Boolean);
}

// Splits a comma-separated "other features" string into an array of tags.
export function parseFeatures(raw) {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

// The display name for a property, in priority order: a real title,
// then the broker's own property code, then the address, then a
// last-resort fallback so a card never renders with no heading at all.
export function propertyName(p) {
  return p.title || (p.property_code ? `Property ${p.property_code}` : null) || p.address || "Untitled listing";
}
