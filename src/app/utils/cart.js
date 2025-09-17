// utils/cart.js
// Utility functions for cart management

export const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      addedAt: new Date().toISOString()
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      item => item.id === cartItem.id && 
               item.size === cartItem.size && 
               item.color === cartItem.color
    );
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { cart: existingCart } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

export const removeFromCart = (productId, size, color) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter(
      item => !(item.id === productId && item.size === size && item.color === color)
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { cart: updatedCart } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const updateCartQuantity = (productId, size, color, newQuantity) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = existingCart.findIndex(
      item => item.id === productId && item.size === size && item.color === color
    );
    
    if (itemIndex >= 0) {
      if (newQuantity <= 0) {
        existingCart.splice(itemIndex, 1);
      } else {
        existingCart[itemIndex].quantity = newQuantity;
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { cart: existingCart } 
      }));
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return false;
  }
};

export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const clearCart = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { cart: [] } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};