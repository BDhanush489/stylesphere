import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/components/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "StyleSphere",
  description: "A premium fashion destination — discover brands, explore collections, and try before you buy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <GoogleOAuthProvider clientId="1043471859432-57jsco645009nnmaqt9s0a6blqpc707u.apps.googleusercontent.com">
          <AuthProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
