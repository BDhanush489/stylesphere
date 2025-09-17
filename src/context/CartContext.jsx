"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const CartContext = createContext();

// Hook for easy usage
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("shopping_cart") || "[]");
    setCart(storedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product, size) => {
    const cartId = `${product.id}-${size}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartId === cartId);

      if (existingIndex > -1) {
        // Update quantity
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            cartId,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            selectedSize: size,
            quantity: 1,
            type: "shirt", // you can make this dynamic
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Count total items
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
