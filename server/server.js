import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { propertiesRouter } from "./routes/properties.js";
import { inquiriesRouter } from "./routes/inquiries.js";
import { adminAuthRouter } from "./routes/adminAuth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Render (and most hosts) sit behind a proxy/load balancer. Without
// this, req.ip would always show the proxy's address instead of the
// real visitor's — which would make the login rate limiter useless,
// since every request would appear to come from the same "IP".
app.set("trust proxy", 1);

// Allow the frontend's origin to call this API. In dev, CORS_ORIGIN
// defaults to "*" so you can open the HTML file directly; set it to
// your real frontend URL before deploying.
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// simple request logger - handy while developing
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/properties", propertiesRouter);
app.use("/inquiries", inquiriesRouter);
app.use("/admin", adminAuthRouter);

// 404 for anything else
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Prime Meridian API listening on http://localhost:${PORT}`);
});
