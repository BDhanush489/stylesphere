import { Lock } from "lucide-react";
import { getCatalogStats, getBrands, getCollections } from "@/services/catalogService";
import { listInquiries } from "@/services/inquiryService";

export const metadata = { title: "Admin | StyleSphere" };

// Inquiries change at request time (in-memory store) — without this, Next.js
// would statically prerender this page once at build time and the counts
// would never update.
export const dynamic = "force-dynamic";

// FOUNDATION ONLY: this dashboard is read-only. There is no authentication
// guard here yet and no working create/edit/delete flow — see
// docs/PRODUCT_STATUS.md. Do not expose this route publicly before both are
// in place.
function DisabledButton({ children }) {
  return (
    <button
      disabled
      title="Coming soon — connect this section to a database to enable editing"
      className="text-xs font-semibold border border-gray-300 text-gray-400 px-3 py-1.5 rounded cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default async function AdminPage() {
  const stats = getCatalogStats();
  const brands = getBrands();
  const collections = getCollections();
  const inquiries = listInquiries();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">StyleSphere</p>
          <h1 className="font-display text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Foundation only — no auth guard yet, and editing isn't wired to a database.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Brands", value: stats.brandCount },
            { label: "Products", value: stats.productCount },
            { label: "Collections", value: stats.collectionCount },
            { label: "Inquiries", value: inquiries.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Brands */}
        <section className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Brands</h2>
            <DisabledButton>+ Add Brand</DisabledButton>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-2">Name</th>
                <th className="px-5 py-2">Aesthetic</th>
                <th className="px-5 py-2">Products</th>
                <th className="px-5 py-2" />
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.slug} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">{brand.name}</td>
                  <td className="px-5 py-3 text-gray-600">{brand.aesthetic}</td>
                  <td className="px-5 py-3 text-gray-600">{brand.productCount}</td>
                  <td className="px-5 py-3 text-right"><DisabledButton>Edit</DisabledButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Collections */}
        <section className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Collections</h2>
            <DisabledButton>+ Add Collection</DisabledButton>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-2">Name</th>
                <th className="px-5 py-2">Products</th>
                <th className="px-5 py-2" />
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.slug} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">{collection.name}</td>
                  <td className="px-5 py-3 text-gray-600">{collection.productCount}</td>
                  <td className="px-5 py-3 text-right"><DisabledButton>Edit</DisabledButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Products placeholder */}
        <section className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-900">Products ({stats.productCount})</h2>
            <DisabledButton>+ Add Product</DisabledButton>
          </div>
          <p className="text-sm text-gray-500">
            Products are currently generated from bundled photography (see src/lib/catalog). Once a real products
            table exists, this section lists and edits inventory directly.
          </p>
        </section>

        {/* Inquiries */}
        <section className="bg-white border border-gray-200 rounded-lg">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Enquiries ({inquiries.length})</h2>
          </div>
          {inquiries.length === 0 ? (
            <p className="text-sm text-gray-500 p-5">No enquiries yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-5 py-2">Name</th>
                  <th className="px-5 py-2">Contact</th>
                  <th className="px-5 py-2">Product</th>
                  <th className="px-5 py-2">Received</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 20).map((inquiry) => (
                  <tr key={inquiry.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">{inquiry.name}</td>
                    <td className="px-5 py-3 text-gray-600">{inquiry.email || inquiry.phone}</td>
                    <td className="px-5 py-3 text-gray-600">{inquiry.productName || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{new Date(inquiry.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="text-xs text-gray-400 p-5 pt-0">
            Enquiries are stored in memory for this server session only — connect a database to persist them.
          </p>
        </section>
      </div>
    </div>
  );
}
