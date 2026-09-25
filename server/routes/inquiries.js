import { Router } from "express";
import * as Inquiries from "../db/inquiries.js";
import * as Properties from "../db/properties.js";
import { requireAdmin } from "../middleware/adminAuth.js";

export const inquiriesRouter = Router();

// POST /inquiries  { propertyId, name, email, phone, interestedIn, message }
// Public — anyone visiting the site needs to be able to send a message.
inquiriesRouter.post("/", async (req, res, next) => {
  try {
    const { propertyId, name, email, phone, interestedIn, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }
    if (propertyId) {
      const property = await Properties.getById(propertyId);
      if (!property) return res.status(400).json({ error: "propertyId does not match a known property" });
    }
    const created = await Inquiries.create({ propertyId, name, email, phone, interestedIn, message });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// GET /inquiries — admin only (the inbox)
inquiriesRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const inquiries = await Inquiries.getAll();
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

// DELETE /inquiries — admin only, deletes every message at once.
inquiriesRouter.delete("/", requireAdmin, async (req, res, next) => {
  try {
    await Inquiries.removeAll();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// PATCH /inquiries/:id  { isRead } — admin only
inquiriesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const updated = await Inquiries.setRead(req.params.id, req.body.isRead !== false);
    if (!updated) return res.status(404).json({ error: "Message not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /inquiries/:id — admin only
inquiriesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Inquiries.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Message not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
