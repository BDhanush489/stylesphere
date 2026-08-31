// import fs from "fs";
// import path from "path";

// export async function GET(req, { params }) {
//   const { id } =await params;

//   const dir = path.join(process.cwd(), "public/tshirts/images");
//   const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

//   const file = files.find((f) => path.parse(f).name === id);

//   if (!file) {
//     return new Response(JSON.stringify({ error: "T-shirt not found" }), { status: 404 });
//   }

//   const product = {
//     id,
//     name: `T-Shirt ${id}`,
//     price: 2999,
//     originalPrice: 3999,
//     image: `/tshirts/images/${file}`,
//     category: "T-Shirts",
//     sizes: ["S", "M", "L", "XL"],
//     inStock: true,
//     rating: 4.5,
//     reviews: 50,
//     isNew: true,
//     color: "Black",
//   };

//   return new Response(JSON.stringify(product), { status: 200 });
// }



import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req, { params }) {
  const { id } = await params;

  // List files inside "images" folder
  const { data, error } = await supabase.storage
    .from("tshirts")
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
    return new Response(JSON.stringify({ error: "T-Shirt not found" }), {
      status: 404,
    });
  }

  // Generate public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("tshirts").getPublicUrl(`images/${file.name}`);

  const product = {
    id: file.name, // keep filename for uniqueness
    name: `T-Shirt ${file.name.split(".")[0]}`,
    price: 2999,
    originalPrice: 3999,
    image: publicUrl,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    rating: 4.5,
    reviews: 50,
    isNew: true,
    color: "Black",
  };

  return new Response(JSON.stringify(product), { status: 200 });
}
