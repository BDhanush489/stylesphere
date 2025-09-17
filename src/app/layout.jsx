import "./globals.css";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Stylesphere",
  description: "Discover fashion that fits your style ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <GoogleOAuthProvider clientId="1043471859432-57jsco645009nnmaqt9s0a6blqpc707u.apps.googleusercontent.com">
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main > {/* Push content below navbar */}
                {children}
              </main>
            </CartProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
