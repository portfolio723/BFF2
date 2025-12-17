
"use client";

import type { Book } from "@/lib/types";
import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from "react";
import { toast } from "sonner";


export interface CartItem extends Book {
  type: "rent" | "buy";
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (book: Book, type: 'buy' | 'rent') => void;
  removeFromCart: (bookId: string, type: 'buy' | 'rent') => void;
  updateCartQuantity: (bookId: string, type: "rent" | "buy", quantity: number) => void;
  isBookInCart: (bookId: string, type: "rent" | "buy") => boolean;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryCharge: () => number;
  getTotal: () => number;
  items: CartItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = "hyderabad-reads-cart";


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    setLoading(false);
  }, [cart]);


  const addToCart = (book: Book, type: 'buy' | 'rent') => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === book.id && i.type === type
      );

      if (existingItem) {
        toast.success(`${book.title} quantity updated in cart!`);
        return prevCart.map((i) =>
          i.id === book.id && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        const cartItem: CartItem = { ...book, type, quantity: 1 };
        toast.success(`${book.title} added to cart!`);
        return [...prevCart, cartItem];
      }
    });
  };
  
  const removeFromCart = (bookId: string, type: "rent" | "buy") => {
     const itemToRemove = cart.find(item => item.id === bookId && item.type === type);
     if (itemToRemove) {
       toast.info(`${itemToRemove.title} removed from cart.`);
       setCart((prev) => prev.filter((item) => !(item.id === bookId && item.type === type)));
     }
  };

  const updateCartQuantity = (bookId: string, type: "rent" | "buy", quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId, type);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.id === bookId && i.type === type ? { ...i, quantity } : i
      )
    );
  };

  const isBookInCart = (bookId: string, type: 'rent' | 'buy') => cart.some((item) => item.id === bookId && item.type === type);

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.type === 'rent' ? item.rentalPrice || 0 : item.price;
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  const getItemCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const getSubtotal = () => cart.reduce((sum, item) => {
      const price = item.type === "rent" ? item.rentalPrice || 0 : item.price;
      return sum + (price || 0) * item.quantity;
    }, 0);

  const getDeliveryCharge = () => {
    const hasRental = cart.some((item) => item.type === "rent");
    if (cart.length === 0) return 0;
    const subtotal = getSubtotal();
    if (subtotal > 500) return 0; // Free delivery over 500
    return hasRental ? 40 : 0; // Delivery charge only for rentals under 500
  };

  const getTotal = () => getSubtotal() + getDeliveryCharge();


  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isBookInCart,
        clearCart,
        cartCount,
        cartTotal,
        loading,
        items: cart,
        getItemCount,
        getSubtotal,
        getDeliveryCharge,
        getTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useCart must be used within an AppProvider");
  }
  return context;
};

// Kept for compatibility with other components that might still use useStore
export const useStore = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useStore must be used within an AppProvider");
    }
    return context;
}
