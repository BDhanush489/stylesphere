// import fs from "fs";
// import path from "path";

// export async function GET(req, { params }) {
//   const { id } =await params;

//   const dir = path.join(process.cwd(), "public/shirts/images");
//   const files = fs.readdirSync(dir);

//   const file = files.find((f) => path.parse(f).name === id);

//   if (!file) {
//     return new Response(JSON.stringify({ error: "Shirt not found" }), { status: 404 });
//   }

//   const product = {
//     id,
//     name: `Shirt ${id}`,
//     price: 2999,
//     originalPrice: 3999,
//     image: `/shirts/images/${file}`,
//     category: "Shirts",
//     sizes: ["S", "M", "L", "XL"],
//     inStock: true,
//     rating: 4.5,
//     reviews: 50,
//     isNew: true,
//     color: "Black",
//   };

//   return Response.json(product);
// }


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req, { params }) {
  const { id } = await params;

  // List files inside "images" folder
  const { data, error } = await supabase.storage
    .from("shirts")
    .list("images", { limit: 100 });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  // ✅ Match file by full name or by base name
  const file = data.find(
    (f) => f.name === id || f.name.split(".")[0] === id
  );

  if (!file) {
    return new Response(JSON.stringify({ error: "Shirt not found" }), {
      status: 404,
    });
  }

  // Generate public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("shirts").getPublicUrl(`images/${file.name}`);

  const product = {
    id: file.name, // keep filename for uniqueness
    name: `Shirt ${file.name.split(".")[0]}`,
    price: 2999,
    originalPrice: 3999,
    image: publicUrl,
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.5,
    reviews: 50,
    isNew: true,
    color: "Black",
  };

  return new Response(JSON.stringify(product), { status: 200 });
}
