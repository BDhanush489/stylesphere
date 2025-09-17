"use client";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function GoogleLoginButton({ redirectAfter = "/" }) {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (!credentialResponse.credential) return;
        
        const userInfo = jwtDecode(credentialResponse.credential);
        console.log("User Info:", userInfo);

        // Update global auth context
        login(userInfo);

        // Persist login
        localStorage.setItem("user", JSON.stringify(userInfo));

        // Redirect
        router.push(redirectAfter);
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
