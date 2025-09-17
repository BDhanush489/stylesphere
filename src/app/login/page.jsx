// "use client";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/AuthContext";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
//           Welcome
//         </h2>

//         {/* Google Login */}
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {

//             const userInfo = jwtDecode(credentialResponse.credential);
//             console.log("User Info:", userInfo);

//             //update context immediately
//             login(userInfo);

//             //persist for refresh
//             localStorage.setItem("user", JSON.stringify(userInfo));

//             router.push("/");
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-purple-600 font-semibold hover:underline">
//             Sign up
//           </a>
//         </p>
        
//       </div>
//     </div>
//   );
// }


import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome
        </h2>

        {/* Google Login */}
        <GoogleLoginButton redirectAfter="/verify-phone" />

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
