"use client";

import type { Book, CartItem, AppUser } from "@/lib/types";
import React, { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  wishlist: Book[];
  cart: CartItem[];
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
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false); // No initial loading without Firebase
  const { toast } = useToast();
  
  // Mock user for KYC checks, as Firebase is removed
  const mockUser = { isKycVerified: false };

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
    // Basic auth simulation: in a real non-Firebase app, you'd have a different auth system.
    // For now, we assume user is "logged in" for cart but check KYC for rentals.
    if (type === 'rent' && !mockUser.isKycVerified) {
        toast({ title: "KYC Required", description: "Please complete KYC verification to rent books.", variant: "destructive" });
        return;
    }
    if (!cart.find((item) => item.book.id === book.id)) {
      const cartItem: CartItem = { book, type };
      setCart((prev) => [...prev, cartItem]);
      toast({
        title: "Added to Cart",
        description: `"${book.title}" has been added to your cart for ${type}.`,
      });
    }
  };
  
  const removeFromCart = (bookId: string) => {
     const itemToRemove = cart.find(item => item.book.id === bookId);
     if (itemToRemove) {
       setCart((prev) => prev.filter((item) => item.book.id !== bookId));
       toast({
          title: "Removed from Cart",
          description: "The book has been removed from your cart.",
       });
     }
  };

  const isBookInCart = (bookId: string) => cart.some((item) => item.book.id === bookId);

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.length, [cart]);
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);
  
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.type === 'rent' && item.book.rentalPrice ? item.book.rentalPrice : item.book.price;
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
