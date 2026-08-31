// FUTURE INTEGRATION: no virtual try-on AI provider is configured yet.
// This route defines the contract the frontend already speaks
// (src/services/virtualTryOnService.js) so a real provider can be dropped in
// here later without any frontend changes:
//
//   GET  -> { configured: boolean }  (cheap status check, no image data sent)
//   POST -> receive { personImage, garmentImage }, call the provider
//           server-side (credentials stay in env vars, never reach the
//           client), return { status: "ready", resultImage }
//
// The frontend only uploads image data via POST once GET reports
// configured:true — until then, nothing about the user's photo leaves the
// browser, and the client renders its own clearly-labeled demo preview.
const TRYON_PROVIDER = process.env.TRYON_PROVIDER || null;

export async function GET() {
  return Response.json({ configured: Boolean(TRYON_PROVIDER) });
}

export async function POST(req) {
  if (!TRYON_PROVIDER) {
    return Response.json({
      status: "not_configured",
      message: "Virtual Try-On AI isn't connected yet.",
    });
  }

  // Real provider integration would go here, e.g.:
  // const { personImage, garmentImage } = await req.json();
  // const result = await callTryOnProvider(TRYON_PROVIDER, { personImage, garmentImage });
  // return Response.json({ status: "ready", resultImage: result.url });

  return Response.json({ status: "not_configured", message: "Provider not yet implemented." });
}
