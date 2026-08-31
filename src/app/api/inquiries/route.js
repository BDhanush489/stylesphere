import { createInquiry, listInquiries } from "@/services/inquiryService";

export async function GET() {
  const items = listInquiries();
  return Response.json({ items, total: items.length });
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { error, inquiry } = createInquiry(body || {});
  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json({ success: true, id: inquiry.id });
}
