// PROTOTYPE PERSISTENCE: inquiries are written to a JSON file on disk
// (.data/inquiries.json) rather than a real database.
//
// This has to be file-backed rather than a plain in-memory array: Next.js
// bundles Route Handlers and Server Component pages into separate module
// graphs, so a module-level array here would NOT actually be shared between
// `POST /api/inquiries` and the `/admin` page — each gets its own instance,
// and the admin dashboard would silently show stale/empty data. A file on
// disk is visible to both. This still won't survive a redeploy or work
// across multiple server instances — swap it for a real `inquiries` table
// before relying on it in production. Every reader/writer goes through this
// module, so that swap won't touch any callers.
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(inquiries) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
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
