import { pool } from "./pool.js";

export async function create({ propertyId, name, email, phone, interestedIn, message }) {
  const { rows } = await pool.query(
    `INSERT INTO inquiries (property_id, name, email, phone, interested_in, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [propertyId || null, name, email, phone || null, interestedIn || null, message]
  );
  return rows[0];
}

export async function getAll() {
  const { rows } = await pool.query(
    `SELECT inquiries.*, properties.address, properties.city
     FROM inquiries
     LEFT JOIN properties ON properties.id = inquiries.property_id
     ORDER BY inquiries.created_at DESC`
  );
  return rows;
}

export async function setRead(id, isRead) {
  const { rows } = await pool.query(
    `UPDATE inquiries SET is_read = $1 WHERE id = $2 RETURNING *`,
    [isRead, id]
  );
  return rows[0] || null;
}

export async function remove(id) {
  const { rows } = await pool.query(
    "DELETE FROM inquiries WHERE id = $1 RETURNING id",
    [id]
  );
  return rows[0] || null;
}

// Deletes every message that is read (isRead = true) or unread
// (isRead = false), never both at once.
export async function removeAllByReadState(isRead) {
  const { rows } = await pool.query(
    "DELETE FROM inquiries WHERE is_read = $1 RETURNING id",
    [isRead]
  );
  return rows.length;
}
