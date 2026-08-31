"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

const STORAGE_KEY = "wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setWishlist(Array.isArray(stored) ? stored : []);
    } catch {
      setWishlist([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  const isWishlisted = (productId) => wishlist.some(item => item.id === productId);

  const addToWishlist = (product, size, type = "product") => {
    if (isWishlisted(product.id)) return false;

    setWishlist(prev => [
      ...prev,
      {
        id: product.id,
        cartId: size ? `${product.id}-${size}` : `${product.id}`,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        selectedSize: size || null,
        type,
        dateAdded: new Date().toISOString(),
      },
    ]);
    return true;
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Adds if absent, removes if present. Returns true when the item ends up wishlisted.
  const toggleWishlist = (product, size, type = "product") => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
      return false;
    }
    addToWishlist(product, size, type);
    return true;
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
