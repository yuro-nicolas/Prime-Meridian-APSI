import crypto from "crypto";

/* ---------------------------------------------------------
   A deliberately simple session store: valid tokens live in a
   plain in-memory Map (token -> expiry timestamp). This is a real
   improvement over the old client-side-only passcode — the actual
   check now happens here, on the server, never in the browser
   bundle — but it's intentionally not a production-grade auth
   system: tokens are lost on server restart (fine for one admin
   account; would need a real sessions table for multiple staff).
---------------------------------------------------------- */
const SESSION_HOURS = 12;
const sessions = new Map(); // token -> expiresAt (ms since epoch)

function pruneExpired() {
  const now = Date.now();
  for (const [token, expiresAt] of sessions) {
    if (expiresAt < now) sessions.delete(token);
  }
}

/* ---------------------------------------------------------
   Password hashing — scrypt, built into Node's own crypto module
   (no bcrypt/argon2 dependency needed). ADMIN_PASSWORD_HASH in .env
   is stored as "salt:hash", generated once with
   scripts/generate-password-hash.js. crypto.timingSafeEqual compares
   the two hashes in constant time, so the comparison itself can't
   leak information via response-time differences.
---------------------------------------------------------- */
export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password, storedHash) {
  const [salt, hash] = (storedHash || "").split(":");
  if (!salt || !hash) return false;
  const candidate = hashPassword(password, salt);
  const hashBuffer = Buffer.from(hash, "hex");
  const candidateBuffer = Buffer.from(candidate, "hex");
  if (hashBuffer.length !== candidateBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, candidateBuffer);
}

/* ---------------------------------------------------------
   Rate limiting — a plain in-memory Map (same style as the session
   store above) tracking failed attempts per IP. After 5 failures,
   that IP is blocked from trying again for 15 minutes. This is a
   basic defense against a script guessing passwords repeatedly; it
   resets on server restart, which is an accepted tradeoff for a
   project this size.
---------------------------------------------------------- */
const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 15;
const failedAttempts = new Map(); // ip -> { count, blockedUntil }

function checkRateLimit(ip) {
  const record = failedAttempts.get(ip);
  if (record?.blockedUntil && record.blockedUntil > Date.now()) {
    return { blocked: true, retryAfterMinutes: Math.ceil((record.blockedUntil - Date.now()) / 60000) };
  }
  return { blocked: false };
}

function recordFailedAttempt(ip) {
  const record = failedAttempts.get(ip) || { count: 0, blockedUntil: null };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.blockedUntil = Date.now() + BLOCK_MINUTES * 60 * 1000;
    record.count = 0;
  }
  failedAttempts.set(ip, record);
}

function clearFailedAttempts(ip) {
  failedAttempts.delete(ip);
}

// Returns { token } on success, or { error } on failure — the route
// decides what status code to send.
export function login(username, password, ip) {
  const rate = checkRateLimit(ip);
  if (rate.blocked) {
    return { error: `Too many failed attempts. Try again in ${rate.retryAfterMinutes} minute(s).` };
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);

  if (validUsername && validPassword) {
    clearFailedAttempts(ip);
    pruneExpired();
    const token = crypto.randomUUID();
    sessions.set(token, Date.now() + SESSION_HOURS * 60 * 60 * 1000);
    return { token };
  }

  recordFailedAttempt(ip);
  return { error: "Incorrect username or password" };
}

export function logout(token) {
  sessions.delete(token);
}

function isValid(token) {
  if (!token) return false;
  const expiresAt = sessions.get(token);
  if (!expiresAt) return false;
  if (expiresAt < Date.now()) {
    sessions.delete(token);
    return false;
  }
  return true;
}

// Express middleware: blocks the request with 401 unless a valid
// token is present in the Authorization header ("Bearer <token>").
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!isValid(token)) {
    return res.status(401).json({ error: "Admin login required" });
  }
  next();
}

// Same check, but for GET routes where being "not admin" just means
// "treat this like a public request" instead of an outright 401 —
// used for the private-listings visibility flag.
export function isAdminRequest(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  return isValid(token);
}
