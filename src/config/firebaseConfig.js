// src/config/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let authInstance = null;

// Lazy and defensive on purpose: initializing Firebase with a missing or
// invalid API key throws immediately. Doing this eagerly at module scope
// used to crash the entire production build — Next.js prerenders this "use
// client" page's initial HTML on the server too, so importing this module
// anywhere took the whole build down whenever Firebase env vars weren't
// configured. Only call getFirebaseAuth() from a browser event handler.
export function getFirebaseAuth() {
  if (authInstance) return authInstance;
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is only available in the browser.");
  }
  if (!firebaseConfig.apiKey) {
    throw new Error("Phone verification isn't configured yet (missing Firebase credentials).");
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  authInstance = getAuth(app);
  return authInstance;
}

export { RecaptchaVerifier, signInWithPhoneNumber };
