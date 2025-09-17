import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="rounded-xl shadow hover:shadow-lg transition p-3 bg-white">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={600}
        className="rounded-lg object-cover"
        loading="lazy"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">₹{product.price}</p>
    </div>
  );
}

// ClientID="1043471859432-57jsco645009nnmaqt9s0a6blqpc707u.apps.googleusercontent.com"