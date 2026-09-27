import { pool } from "./pool.js";

export const VALID_STATUSES = ["For Sale", "For Rent", "For Lease", "Pending", "Sold", "Rented", "Leased"];
export const VALID_CATEGORIES = ["Residential", "Commercial", "Industrial", "Lot / Land", "Agricultural", "Special Purpose", "Mixed-Use"];

export const PUBLIC_STATUSES = ["For Sale", "For Rent", "For Lease"];

const FIELDS = [
  "property_code", "title", "property_type", "category",
  "address", "city", "map_url",
  "price", "status",
  "lot_area_sqm", "floor_area_sqm", "beds", "baths", "other_features",
  "photo_urls", "video_url",
  "blurb", "description", "other_info",
  "style",
  "is_public",
];

function toRow(data) {
  return FIELDS.map((field) => {
    if (field === "is_public") return data.is_public === false ? false : true;
    if (field === "style") return data.style || "cottage";
    if (field === "status") return data.status || "For Sale";
    const value = data[field];
    return value === undefined || value === "" ? null : value;
  });
}

export async function getAll({ status, sort, category, minPrice, maxPrice, includePrivate } = {}) {
  const clauses = [];
  const values = [];

  if (!includePrivate) {
    clauses.push("is_public = true");
    values.push(PUBLIC_STATUSES);
    clauses.push(`status = ANY($${values.length})`);
  }
  if (status && VALID_STATUSES.includes(status) && (includePrivate || PUBLIC_STATUSES.includes(status))) {
    values.push(status);
    clauses.push(`status = $${values.length}`);
  }
  if (category && VALID_CATEGORIES.includes(category)) {
    values.push(category);
    clauses.push(`category = $${values.length}`);
  }
  if (minPrice !== undefined && minPrice !== "" && !Number.isNaN(Number(minPrice))) {
    values.push(Number(minPrice));
    clauses.push(`price >= $${values.length}`);
  }
  if (maxPrice !== undefined && maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
    values.push(Number(maxPrice));
    clauses.push(`price <= $${values.length}`);
  }

  let query = "SELECT * FROM properties";
  if (clauses.length) query += " WHERE " + clauses.join(" AND ");

  if (sort === "asc") query += " ORDER BY price ASC NULLS LAST";
  else if (sort === "desc") query += " ORDER BY price DESC NULLS LAST";
  else query += " ORDER BY updated_at DESC";

  const { rows } = await pool.query(query, values);
  return rows;
}

export async function getById(id, { includePrivate } = {}) {
  const { rows } = await pool.query(
    "SELECT * FROM properties WHERE id = $1",
    [id]
  );
  const property = rows[0] || null;
  if (!property) return null;

  if (!property.is_public && !includePrivate) return null;

  if (!includePrivate && !PUBLIC_STATUSES.includes(property.status)) return null;
  return property;
}

export async function create(data) {
  const values = toRow(data);
  const placeholders = FIELDS.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO properties (${FIELDS.join(", ")})
     VALUES (${placeholders})
     RETURNING *`,
    values
  );
  return rows[0];
}

export async function update(id, data) {
  const values = toRow(data);
  const setClause = FIELDS.map((field, i) => `${field} = $${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `UPDATE properties SET ${setClause}, updated_at = NOW()
     WHERE id = $${FIELDS.length + 1}
     RETURNING *`,
    [...values, id]
  );
  return rows[0] || null;
}

export async function remove(id) {
  const { rows } = await pool.query(
    "DELETE FROM properties WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
}
