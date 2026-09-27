import crypto from "crypto";
import { hashPassword } from "../middleware/adminAuth.js";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-password-hash.js <your-password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = hashPassword(password, salt);

console.log("\nAdd this line to server/.env:\n");
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}\n`);
