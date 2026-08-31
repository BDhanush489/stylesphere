// Abstraction over "generate a virtual try-on preview". Today this always
// falls back to a local, obviously-illustrative composite because no AI
// provider is configured (see src/app/api/try-on/route.js). Once a provider
// is wired up server-side, generateTryOnPreview() starts returning
// { mode: "ai", resultImage } automatically — no caller needs to change.
//
// Privacy: the status check below sends no image data. The user's photo is
// only ever uploaded to the server if a real provider is configured; in the
// current demo mode, compositing happens entirely in the browser via canvas.
export const DEMO_WATERMARK_TEXT = "StyleSphere Demo Preview — Illustrative Only";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawContain(ctx, img, x, y, w, h) {
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

// Composites the garment as an obvious flat badge overlay — deliberately NOT
// a pose-aware fit, so nobody mistakes it for a real AI-generated result.
async function composeDemoPreview({ personImageSrc, garmentImageSrc }) {
  const [personImg, garmentImg] = await Promise.all([loadImage(personImageSrc), loadImage(garmentImageSrc)]);

  const width = personImg.naturalWidth || personImg.width;
  const height = personImg.naturalHeight || personImg.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(personImg, 0, 0, width, height);

  const badgeSize = Math.min(width, height) * 0.3;
  const margin = badgeSize * 0.12;
  const badgeX = width - badgeSize - margin;
  const badgeY = height - badgeSize - margin;

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  roundRect(ctx, badgeX - 8, badgeY - 8, badgeSize + 16, badgeSize + 16, 16);
  ctx.fill();
  drawContain(ctx, garmentImg, badgeX, badgeY, badgeSize, badgeSize);
  ctx.restore();

  const stripHeight = Math.max(28, height * 0.045);
  ctx.fillStyle = "rgba(17, 24, 39, 0.82)";
  ctx.fillRect(0, height - stripHeight, width, stripHeight);
  ctx.fillStyle = "#ffffff";
  ctx.font = `${Math.max(12, Math.round(stripHeight * 0.4))}px sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillText(DEMO_WATERMARK_TEXT, 12, height - stripHeight / 2);

  return canvas.toDataURL("image/png");
}

export async function generateTryOnPreview({ personImageSrc, garmentImageSrc }) {
  try {
    const statusRes = await fetch("/api/try-on");
    const status = await statusRes.json();

    if (status.configured) {
      const res = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personImage: personImageSrc, garmentImage: garmentImageSrc }),
      });
      const data = await res.json();
      if (data.status === "ready" && data.resultImage) {
        return { mode: "ai", resultImage: data.resultImage };
      }
    }
  } catch {
    // Status check failed (offline, dev server down, etc). Fall back below.
  }

  const resultImage = await composeDemoPreview({ personImageSrc, garmentImageSrc });
  return { mode: "demo", resultImage };
}

export function validateUploadedImage(file, { maxSizeMB = 8 } = {}) {
  if (!file) return "Please choose a photo.";
  if (!file.type.startsWith("image/")) return "Please upload an image file (JPG, PNG, or WEBP).";
  if (file.size > maxSizeMB * 1024 * 1024) return `Please upload an image under ${maxSizeMB}MB.`;
  return null;
}
