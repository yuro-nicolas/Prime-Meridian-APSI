import { Router } from "express";
import * as Properties from "../db/properties.js";
import { requireAdmin, isAdminRequest } from "../middleware/adminAuth.js";
import { VALID_STATUSES, VALID_CATEGORIES } from "../db/properties.js";

export const propertiesRouter = Router();

// Every field is optional by design (see schema.sql) — a broker
// filling this in gradually shouldn't be blocked by missing fields.
// The only things worth validating are the two fields with a CHECK
// constraint at the database level.
function validate(body) {
  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return `status must be one of: ${VALID_STATUSES.join(", ")}`;
  }
  if (body.category && !VALID_CATEGORIES.includes(body.category)) {
    return `category must be one of: ${VALID_CATEGORIES.join(", ")}`;
  }
  return null;
}

// `admin=1` is how the Admin page asks to see private listings too —
// but it's only honored when a valid admin session token is actually
// present (see isAdminRequest). Without one, this silently falls back
// to public-only results rather than erroring, since a public visitor
// might harmlessly have this in a shared/bookmarked URL.
function wantsPrivate(req) {
  return req.query.admin === "1" && isAdminRequest(req);
}

// GET /properties?status=For+Sale&category=Residential&minPrice=1000000&maxPrice=6000000&sort=asc&admin=1
propertiesRouter.get("/", async (req, res, next) => {
  try {
    const { status, sort, category, minPrice, maxPrice } = req.query;
    const properties = await Properties.getAll({
      status, sort, category, minPrice, maxPrice,
      includePrivate: wantsPrivate(req),
    });
    res.json(properties);
  } catch (err) {
    next(err);
  }
});

// GET /properties/:id?admin=1
propertiesRouter.get("/:id", async (req, res, next) => {
  try {
    const property = await Properties.getById(req.params.id, { includePrivate: wantsPrivate(req) });
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
});

// POST /properties — admin only
propertiesRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).json({ error });
    const created = await Properties.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /properties/:id — admin only
propertiesRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).json({ error });
    const updated = await Properties.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Property not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /properties/:id — admin only
propertiesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Properties.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Property not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
