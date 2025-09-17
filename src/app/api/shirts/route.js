// import fs from "fs";
// import path from "path";

// export async function GET() {
//   const dir = path.join(process.cwd(), "public/shirts/images");
//   const files = fs.readdirSync(dir);

//   const products = files.map((file) => {
//     const id = path.parse(file).name;
//     return {
//       id,
//       name: `Shirt ${id}`,
//       price: 2999,
//       originalPrice: 3999,
//       image: `/shirts/images/${file}`,
//       category: "Shirts",
//       sizes: ["S", "M", "L", "XL"],
//       inStock: true,
//       rating: 4.5,
//       reviews: 50,
//       isNew: true,
//       color: "Black",
//     };
//   });

//   return Response.json(products);
// }

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET() {
  try {
    console.log("Supabase URL:", SUPABASE_URL);
    console.log("Anon Key present:", !!SUPABASE_ANON_KEY);

    // 1️⃣ List files inside the "images" folder of Shirts bucket
    const { data: files, error } = await supabase.storage
      .from("shirts")   // 👈 bucket name
      .list("images", { limit: 100 });

    if (error) throw error;

    if (!files || files.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // 2️⃣ Map to public URLs
    const products = files.map((file) => {
      const { data } = supabase.storage
        .from("shirts")
        .getPublicUrl(`images/${file.name}`);

      return {
        id: file.name,
        name: `Shirt ${file.name.split(".")[0]}`,
        price: 2999,
        originalPrice: 3999,
        image: data.publicUrl,
        category: "Shirts",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        rating: 4.5,
        reviews: 50,
        isNew: true,
        color: "Black",
      };
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error("Error in shirts route:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
