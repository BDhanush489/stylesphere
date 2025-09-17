export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white">Stylesphere</h2>
          <p className="mt-3 text-sm">
            Your one-stop destination for fashion-forward clothing. Trendy,
            affordable, and stylish.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/collections" className="hover:text-white">Collections</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold text-white">Stay Updated</h2>
          <p className="mt-3 text-sm">Subscribe to our newsletter for the latest offers.</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-purple-600 px-4 rounded-r-md text-white hover:bg-purple-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Stylesphere. All rights reserved.
      </div>
    </footer>
  );
}
