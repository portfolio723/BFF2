"use client";

import type { Book, CartItem } from "@/lib/types";
import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";


export interface CartItem extends Book {
  type: "rent" | "buy";
  quantity: number;
}

interface AppContextType {
  wishlist: Book[];
  cart: CartItem[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  isBookInWishlist: (bookId: string) => boolean;
  addToCart: (book: Book, type: 'buy' | 'rent') => void;
  removeFromCart: (bookId: string) => void;
  updateCartQuantity: (bookId: string, quantity: number) => void;
  isBookInCart: (bookId: string) => boolean;
  clearCart: () => void;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "hyderabad-reads-wishlist";
const CART_STORAGE_KEY = "hyderabad-reads-cart";


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  
  const [wishlist, setWishlist] = useState<Book[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    setLoading(false);
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    setLoading(false);
  }, [cart]);


  const addToWishlist = (book: Book) => {
    if (!wishlist.find((item) => item.id === book.id)) {
      setWishlist((prev) => [...prev, book]);
      toast({
        title: "Added to Wishlist",
        description: `"${book.title}" has been added to your wishlist.`,
      });
    } else {
        toast({
            title: "Already in Wishlist",
            description: `"${book.title}" is already in your wishlist.`,
        });
    }
  };

  const removeFromWishlist = (bookId: string) => {
     const bookToRemove = wishlist.find(item => item.id === bookId);
     if (bookToRemove) {
       setWishlist((prev) => prev.filter((item) => item.id !== bookId));
       toast({
         title: "Removed from Wishlist",
         description: "The book has been removed from your wishlist.",
       });
     }
  };
  
  const isBookInWishlist = (bookId: string) => wishlist.some((item) => item.id === bookId);

  const addToCart = (book: Book, type: 'buy' | 'rent') => {
    const existingItem = cart.find(
      (i) => i.id === book.id && i.type === type
    );

    if (existingItem) {
       setCart((prev) =>
        prev.map((i) =>
          i.id === book.id && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
       toast({
        title: "Cart updated",
        description: `Quantity for "${book.title}" updated.`,
      });

    } else {
        const cartItem: CartItem = { ...book, type, quantity: 1 };
        setCart((prev) => [...prev, cartItem]);
        toast({
            title: "Added to Cart",
            description: `"${book.title}" has been added to your cart for ${type}.`,
        });
    }
  };
  
  const removeFromCart = (bookId: string) => {
     const itemToRemove = cart.find(item => item.id === bookId);
     if (itemToRemove) {
       setCart((prev) => prev.filter((item) => item.id !== bookId));
       toast({
          title: "Removed from Cart",
          description: "The book has been removed from your cart.",
       });
     }
  };

  const updateCartQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.id === bookId ? { ...i, quantity } : i
      )
    );
  };

  const isBookInCart = (bookId: string) => cart.some((item) => item.id === bookId);

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);
  
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.type === 'rent' ? item.rentalPrice || 0 : item.price;
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);


  return (
    <AppContext.Provider
      value={{
        wishlist,
        cart,
        addToWishlist,
        removeFromWishlist,
        isBookInWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isBookInCart,
        clearCart,
        cartCount,
        wishlistCount,
        cartTotal,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useStore must be used within an AppProvider");
  }
  return context;
};
