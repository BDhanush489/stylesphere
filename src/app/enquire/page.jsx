"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";

function EnquireForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const intent = searchParams.get("intent");

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productSlug) return;
    fetch(`/api/products/${productSlug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setProduct(data);
        setForm((prev) => ({
          ...prev,
          message:
            intent === "availability"
              ? `Hi, I'd like to check availability of the ${data.name} (${data.brandName}).`
              : `Hi, I'm interested in the ${data.name} (${data.brandName}). Could you tell me more?`,
        }));
      })
      .catch(() => {});
  }, [productSlug, intent]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productSlug: product?.slug || null,
          productName: product?.name || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-semibold text-gray-900 mb-2">Enquiry Sent</h1>
          <p className="text-gray-600 mb-8">
            Thanks{form.name ? `, ${form.name}` : ""} — our team will get back to you within 24 hours.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products" className="border-2 border-gray-900 text-gray-900 px-6 py-2.5 font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              Continue Browsing
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-6 py-2.5 font-medium">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-2">
          {intent === "availability" ? "Check Availability" : "Enquire Now"}
        </h1>
        <p className="text-gray-600 mb-8">
          Tell us a little about what you're looking for and we'll follow up — by email, phone, or in person at our
          store.
        </p>

        {product && (
          <div className="flex items-center gap-4 border border-gray-200 p-4 mb-8">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">{product.brandName}</p>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        )}

        {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">Provide at least one — email or phone.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-4 transition-colors disabled:opacity-60"
          >
            <Send className="w-4 h-4" /> {isSubmitting ? "Sending…" : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function EnquirePage() {
  return (
    <Suspense fallback={null}>
      <EnquireForm />
    </Suspense>
  );
}
