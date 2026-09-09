import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { trackEvent, productToItem } from "@/lib/analytics";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("rooh_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("rooh_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rooh_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("rooh_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((product, { size, color, qty = 1 } = {}) => {
    setItems((prev) => {
      const key = `${product.id}-${size || "default"}-${color || "default"}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          category: product.category || "",
          price: product.price,
          image: product.images?.[0],
          size: size || (product.sizes?.[0] ?? "Free Size"),
          color: color || (product.colors?.[0] ?? "Default"),
          qty,
        },
      ];
    });
    setIsOpen(true);
    trackEvent("add_to_cart", {
      items: [productToItem(product, { qty, color })],
      value: (product.price || 0) * (qty || 1),
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQty,
        wishlist,
        toggleWishlist,
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}