// "use client";

// import { useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// async function addProduct() {
//   const { data, error } = await supabase
//     .from('products')
//     .insert([
//       { name: 'Test Product', description: 'Testing', price: 100 }
//     ]);

//   if (error) console.log('Error:', error);
//   else console.log('Success:', data);
// }

// export default function AdminPage() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // addProduct();
  
//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!imageFile) {
//       setMessage("Please select an image!");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1️⃣ Upload image to Supabase Storage
//       const fileName = `${Date.now()}-${imageFile.name}`;
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("product-images") // your bucket name
//         .upload(fileName, imageFile);

//       if (uploadError) throw uploadError;

//       // 2️⃣ Get public URL of the uploaded image
//       const { publicUrl, error: urlError } = supabase.storage
//         .from("product-images")
//         .getPublicUrl(fileName);

//       if (urlError) throw urlError;

//       // 3️⃣ Insert product into table
//       const { data, error: insertError } = await supabase
//         .from("products")
//         .insert([
//           {
//             name,
//             description,
//             price,
//             image_url: publicUrl,
//           },
//         ]);

//       if (insertError) throw insertError;

//       setMessage("Product added successfully!");
//       setName("");
//       setDescription("");
//       setPrice("");
//       setImageFile(null);
//     } catch (error) {
//       console.error(error);
//       setMessage("Error: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="border p-2"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//           className="border p-2"
//         />
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           {loading ? "Uploading..." : "Add Product"}
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
// import products from "razorpay/dist/types/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("shirts"); // default option
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage("Please select an image!");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Define the upload path inside selected bucket
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = `images/${fileName}`; // ✅ always "images" folder

      // 2️⃣ Upload image to selected bucket (shirts / tshirts / jackets)
      const { data: uploadData, error: uploadError } = await supabase.storage
          .from(category) // ✅ dynamically use selected category bucket
          .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 3️⃣ Get public URL of the uploaded image
      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from(category)
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      // 4️⃣ Insert product into products table
      const { data, error: insertError } = await supabase
        .from("products")
        .insert([
          {
            name,
            description,
            price,
            image_url: publicUrl,
            category, // save which bucket/category
          },
        ]);

      if (insertError) throw insertError;

      setMessage("✅ Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setCategory("shirts"); // reset to default
    } catch (error) {
      console.error(error);
      setMessage("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2"
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        >
          <option value="shirts">Shirt</option>
          <option value="tshirts">T-Shirt</option>
          <option value="jackets">Jacket</option>
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
