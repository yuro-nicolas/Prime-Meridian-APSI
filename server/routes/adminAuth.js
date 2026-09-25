import { Router } from "express";
import { login, logout } from "../middleware/adminAuth.js";

export const adminAuthRouter = Router();

// POST /admin/login  { username, password }
adminAuthRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = login(username, password, req.ip);
  if (result.error) {
    return res.status(401).json({ error: result.error });
  }
  res.json({ token: result.token });
});

// POST /admin/logout  (Authorization: Bearer <token>)
adminAuthRouter.post("/logout", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) logout(token);
  res.status(204).send();
});
