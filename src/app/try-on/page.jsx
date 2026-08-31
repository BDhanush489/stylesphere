"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Upload, Sparkles, RefreshCw, Download, Share2, Info, X } from "lucide-react";
import { generateTryOnPreview, validateUploadedImage } from "@/services/virtualTryOnService";

const DEMO_MODEL_IMAGE = "/tryon/demo-model.png";

function TryOnExperience() {
  const searchParams = useSearchParams();
  const preselectSlug = searchParams.get("product");

  const [personImageSrc, setPersonImageSrc] = useState(null);
  const [personSource, setPersonSource] = useState(null); // 'upload' | 'demo'
  const [garments, setGarments] = useState([]);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null); // { mode, resultImage }
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    fetch(`/api/products?limit=8&sort=newest`)
      .then((res) => res.json())
      .then(({ items }) => setGarments(items || []))
      .catch(() => setGarments([]));
  }, []);

  useEffect(() => {
    if (!preselectSlug) return;
    fetch(`/api/products/${preselectSlug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((product) => {
        if (!product) return;
        setSelectedGarment(product);
        setGarments((prev) => (prev.some((g) => g.slug === product.slug) ? prev : [product, ...prev]));
      })
      .catch(() => {});
  }, [preselectSlug]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const error = validateUploadedImage(file);
    if (error) {
      toast.error(error);
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPersonImageSrc(url);
    setPersonSource("upload");
    setResult(null);
  };

  const handleUseDemoModel = () => {
    setPersonImageSrc(DEMO_MODEL_IMAGE);
    setPersonSource("demo");
    setResult(null);
  };

  const handleRemovePhoto = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPersonImageSrc(null);
    setPersonSource(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!personImageSrc || !selectedGarment) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const outcome = await generateTryOnPreview({
        personImageSrc,
        garmentImageSrc: selectedGarment.image,
      });
      setResult(outcome);
    } catch {
      toast.error("Couldn't generate a preview. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!result?.resultImage) return;
    const link = document.createElement("a");
    link.href = result.resultImage;
    link.download = "stylesphere-try-on.png";
    link.click();
  };

  const handleShare = async () => {
    if (!result?.resultImage) return;
    try {
      if (navigator.share && navigator.canShare) {
        const blob = await (await fetch(result.resultImage)).blob();
        const file = new File([blob], "stylesphere-try-on.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "My StyleSphere Try-On" });
          return;
        }
      }
      toast("Sharing isn't supported on this browser — use Save instead.");
    } catch {
      // user cancelled share sheet; no-op
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-pink-400 font-semibold mb-3">
            <Sparkles className="w-4 h-4" /> StyleSphere Virtual Try-On
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">See It On You Before You Buy</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upload a photo or use our demo model, pick a piece from the catalog, and preview the look.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            This preview is an AI-generated (or, until a provider is connected, illustrative demo) visualization and
            may not perfectly represent actual fit, drape, or color. Your uploaded photo is processed in your browser
            and is not stored or shared unless you choose to save or share your result.
          </p>
        </div>

        {/* Step 1: Photo */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Choose a photo</h2>
          {personImageSrc ? (
            <div className="flex items-center gap-4">
              <img src={personImageSrc} alt="Selected" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {personSource === "demo" ? "Using the StyleSphere demo model." : "Using your uploaded photo."}
                </p>
                <button
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-pink-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-700">Upload your photo</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP, up to 8MB</span>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              <button
                onClick={handleUseDemoModel}
                className="flex-1 border-2 border-gray-200 hover:border-gray-900 rounded-xl p-6 flex flex-col items-center justify-center transition-colors"
              >
                <img src={DEMO_MODEL_IMAGE} alt="Demo model" className="w-12 h-12 object-cover rounded-full mb-2" />
                <span className="text-sm font-medium text-gray-700">Use our demo model</span>
                <span className="text-xs text-gray-400 mt-1">No photo? Try it this way first</span>
              </button>
            </div>
          )}
        </section>

        {/* Step 2: Garment */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Pick something to try on</h2>
          {garments.length === 0 ? (
            <p className="text-gray-500 text-sm">Loading pieces from the catalog…</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {garments.map((garment) => (
                <button
                  key={garment.slug}
                  onClick={() => {
                    setSelectedGarment(garment);
                    setResult(null);
                  }}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedGarment?.slug === garment.slug ? "border-pink-600 ring-2 ring-pink-200" : "border-gray-200 hover:border-gray-400"
                  }`}
                  title={garment.name}
                >
                  <img src={garment.image} alt={garment.name} className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          )}
          {selectedGarment && (
            <p className="text-sm text-gray-600 mt-3">
              Selected: <span className="font-medium text-gray-900">{selectedGarment.name}</span> by {selectedGarment.brandName}
            </p>
          )}
        </section>

        {/* Generate */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!personImageSrc || !selectedGarment || isGenerating}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${
              !personImageSrc || !selectedGarment || isGenerating
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black text-white"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Generating preview…
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Preview
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <section className="border-t border-gray-200 pt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your preview</h2>
              <span
                className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                  result.mode === "ai" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {result.mode === "ai" ? "AI Generated" : "Demo Preview"}
              </span>
            </div>
            <div className="max-w-md mx-auto">
              <img src={result.resultImage} alt="Try-on preview" className="w-full rounded-xl border border-gray-200 shadow-lg" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4 max-w-md mx-auto">
              {result.mode === "ai"
                ? "Generated by our connected AI try-on provider. Fit and color may vary from the real product."
                : "No AI try-on provider is connected yet — this is an illustrative placeholder overlay, not a real fitted result."}
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 hover:border-gray-900 rounded-lg font-medium text-gray-700"
              >
                <Download className="w-4 h-4" /> Save
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 hover:border-gray-900 rounded-lg font-medium text-gray-700"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              {selectedGarment && (
                <Link
                  href={`/enquire?product=${selectedGarment.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium"
                >
                  Enquire About This Piece
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function TryOnPage() {
  return (
    <Suspense fallback={null}>
      <TryOnExperience />
    </Suspense>
  );
}
