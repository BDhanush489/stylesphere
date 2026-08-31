"use client";
import { useState } from "react";
import { getFirebaseAuth, RecaptchaVerifier, signInWithPhoneNumber } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState("enterPhone"); // enterPhone | enterOtp

  // Lazy on purpose — see src/config/firebaseConfig.js. Never create this (or
  // the Supabase client below) at module/render scope; only inside a
  // browser event handler like this one.
  async function syncUserToSupabase(user) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase isn't configured — skipping profile sync.");
      return;
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const { uid, email, phoneNumber, photoURL } = user;

    localStorage.setItem("userId", uid);

    const { error } = await supabase.from("profiles").upsert(
      {
        id: uid, // Firebase UID as primary key
        email: email || storedUser.email || null,
        phone: phoneNumber || storedUser.phone || null,
        profile_picture_url: photoURL || storedUser.picture || null,
        updated_at: new Date(),
        full_name: storedUser.name,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Error syncing profile:", error);
    }
  }

  const sendOtp = async () => {
    try {
      const auth = getFirebaseAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setStep("enterOtp");
    } catch (err) {
      console.error("Error sending OTP", err);
      toast.error(err.message?.includes("configured") ? err.message : "Failed to send OTP. Check number format (+91...)");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      localStorage.setItem("phone_verified", "true");
      toast.success("Phone verified successfully!");

      await syncUserToSupabase(user);

      router.push("/");
    } catch (err) {
      console.error("OTP Verification failed", err);
      toast.error("Invalid OTP, try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">One last step</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your mobile number to verify.</p>

        {step === "enterPhone" ? (
          <>
            <input
              type="text"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <div id="recaptcha-container"></div>
            <button
              onClick={sendOtp}
              className="w-full bg-yellow-700 text-white py-3 rounded-lg font-semibold hover:bg-yellow-800 transition"
            >
              SEND OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              VERIFY OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
