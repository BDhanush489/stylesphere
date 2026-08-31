"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "shopping_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setCart(Array.isArray(storedCart) ? storedCart : []);
    } catch {
      setCart([]);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever cart changes (skip the initial empty render)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isLoaded]);

  // Add to cart (increments quantity if the same product+size is already in the bag)
  const addToCart = (product, size, type = "product") => {
    const cartId = `${product.id}-${size}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartId === cartId);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

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
          type,
        },
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
