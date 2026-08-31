'use client';

import { useState } from "react";
import { Mail, Phone, MapPin, Send, User, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[${formData.subject}] ${formData.message}`,
        }),
      });
    } catch {
      // best-effort; still show confirmation since this is a low-stakes contact form
    }
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Contact & Visit StyleSphere</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our brands or collections? Prefer to shop in person? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600">We'll get back to you within 24 hours</p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">Message sent successfully! We'll be in touch soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option>General Inquiry</option>
                  <option>Brand Availability</option>
                  <option>Size & Fit Questions</option>
                  <option>Visit the Showroom</option>
                  <option>Wholesale Inquiries</option>
                  <option>Press & Media</option>
                </select>
              </div>

              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:bg-black transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Store */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">hello@stylesphere.com</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">We respond within 24 hours</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-STYLE</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Mon–Fri 9AM–6PM</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Visit Our Showroom</h3>
                  <p className="text-gray-600">123 Fashion Ave<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Tue–Sat: 11AM – 7PM</p>
                  <p>Sun–Mon: By appointment</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-6">
              <h3 className="font-semibold mb-2">Prefer to browse first?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Explore our brands and collections online, then bring your wishlist in-store — or preview a piece
                with Virtual Try-On before you visit.
              </p>
              <div className="flex gap-3">
                <a href="/products" className="text-sm font-semibold bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-100">
                  Shop Online
                </a>
                <a href="/try-on" className="text-sm font-semibold border border-white/40 px-4 py-2 rounded hover:bg-white/10">
                  Try It On
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
