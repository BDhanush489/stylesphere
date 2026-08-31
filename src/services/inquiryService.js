// PROTOTYPE PERSISTENCE: inquiries are written to a JSON file under the
// OS temp directory rather than a real database.
//
// Two deliberate choices here, both learned the hard way:
//  1. File-backed, not a module-level array — Next.js bundles Route
//     Handlers and Server Component pages into separate module graphs, so a
//     plain in-memory array would NOT actually be shared between
//     `POST /api/inquiries` and the `/admin` page (each gets its own
//     instance, and the dashboard would silently show stale/empty data).
//  2. os.tmpdir(), not a project-relative folder — Vercel's serverless
//     functions have a read-only filesystem outside of `/tmp`; writing to
//     `process.cwd()/.data` throws EROFS in production even though it
//     works fine under `next dev`/`next start` locally.
//
// This still won't survive a redeploy, a cold start on a fresh instance, or
// work across multiple concurrent server instances. Swap it for a real
// `inquiries` table before relying on it in production — every reader/writer
// goes through this module, so that swap won't touch any callers.
import fs from "fs";
import os from "os";
import path from "path";

const DATA_FILE = path.join(os.tmpdir(), "stylesphere-inquiries.json");

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(inquiries) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error("[inquiry] failed to persist inquiry:", err);
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function createInquiry({ name, email, phone, message, productSlug, productName }) {
  if (!name?.trim()) {
    return { error: "Name is required" };
  }
  if (!email?.trim() && !phone?.trim()) {
    return { error: "An email or phone number is required" };
  }
  if (email?.trim() && !isValidEmail(email.trim())) {
    return { error: "That email address doesn't look right" };
  }

  const inquiry = {
    id: `inq-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    name: name.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    message: message?.trim() || null,
    productSlug: productSlug || null,
    productName: productName || null,
    createdAt: new Date().toISOString(),
  };

  const inquiries = readAll();
  inquiries.unshift(inquiry);
  writeAll(inquiries);

  console.log("[inquiry] new enquiry received:", inquiry.id, inquiry.name);

  return { inquiry };
}

export function listInquiries() {
  return readAll();
}
