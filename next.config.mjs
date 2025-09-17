/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // for Google profile pics
      },
      {
        protocol: "https",
        hostname: "etrtkxcpxuqvfddjkrda.supabase.co", // your Supabase bucket
        pathname: "/storage/v1/object/public/**", // allow everything inside "public"
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*", // apply to all routes
  //       headers: [
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
  //         { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
  //       ],
  //     },
  //   ];
  // },
  async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
      ],
    },
  ];
}

};

export default nextConfig;
