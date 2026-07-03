"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexus_cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("nexus_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.bookId === item.bookId);
      if (exists) {
        return prev.map(p =>
          p.bookId === item.bookId
            ? { ...p, cantidad: p.cantidad + quantity }
            : p
        );
      }
      return [...prev, { ...item, cantidad: quantity }];
    });
  };

  const increaseQty = (bookId) => {
    setCart(prev =>
      prev.map(item =>
        item.bookId === bookId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decreaseQty = (bookId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.bookId === bookId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.bookId !== bookId));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart
  }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);