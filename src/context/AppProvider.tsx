"use client";

import type { Book } from "@/lib/types";
import React, { createContext, useState, useContext, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  wishlist: Book[];
  cart: { book: Book; type: 'buy' | 'rent' }[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  isBookInWishlist: (bookId: string) => boolean;
  addToCart: (book: Book, type: 'buy' | 'rent') => void;
  removeFromCart: (bookId: string) => void;
  isBookInCart: (bookId: string) => boolean;
  clearCart: () => void;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [cart, setCart] = useState<{ book: Book; type: 'buy' | 'rent' }[]>([]);
  const { toast } = useToast();

  const addToWishlist = (book: Book) => {
    if (!wishlist.find((item) => item.id === book.id)) {
      setWishlist((prev) => [...prev, book]);
      toast({
        title: "Added to Wishlist",
        description: `"${book.title}" has been added to your wishlist.`,
      });
    }
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== bookId));
    toast({
      title: "Removed from Wishlist",
      description: "The book has been removed from your wishlist.",
      variant: "destructive",
    });
  };

  const isBookInWishlist = (bookId: string) => {
    return wishlist.some((item) => item.id === bookId);
  };

  const addToCart = (book: Book, type: 'buy' | 'rent') => {
    if (!cart.find((item) => item.book.id === book.id)) {
      setCart((prev) => [...prev, { book, type }]);
       toast({
        title: "Added to Cart",
        description: `"${book.title}" has been added to your cart for ${type}.`,
      });
    }
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    toast({
      title: "Removed from Cart",
      description: "The book has been removed from your cart.",
      variant: "destructive",
    });
  };

  const isBookInCart = (bookId: string) => {
    return cart.some((item) => item.book.id === bookId);
  };

  const clearCart = () => {
    setCart([]);
  }

  const cartCount = useMemo(() => cart.length, [cart]);
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);
  
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.type === 'rent' ? item.book.rentalPrice : item.book.price;
      return total + (price || 0);
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
        isBookInCart,
        clearCart,
        cartCount,
        wishlistCount,
        cartTotal
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
