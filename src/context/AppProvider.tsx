"use client";

import type { Book, CartItem, AppUser } from "@/lib/types";
import React, { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { doc, onSnapshot, runTransaction, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";
import { useFirestore }from "@/firebase";


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
  const { user } = useUser() as { user: AppUser | null };
  const firestore = useFirestore();
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user && firestore) {
      setLoading(true);
      const userDocRef = doc(firestore, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setWishlist(userData.wishlist || []);
          setCart(userData.cart || []);
        } else {
          // Create the user document if it doesn't exist
          setDoc(userDocRef, { wishlist: [], cart: [] });
          setWishlist([]);
          setCart([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching user data:", error);
        toast({ title: "Error", description: "Could not fetch your data.", variant: "destructive" });
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Not logged in
      setWishlist([]);
      setCart([]);
      setLoading(false);
    }
  }, [user, firestore, toast]);

  const addToWishlist = async (book: Book) => {
    if (!user || !firestore) {
      toast({ title: "Please sign in", description: "You need to be logged in to add to wishlist.", variant: "destructive" });
      return;
    }
    if (!wishlist.find((item) => item.id === book.id)) {
      const userDocRef = doc(firestore, "users", user.uid);
      try {
        await runTransaction(firestore, async (transaction) => {
          const userDoc = await transaction.get(userDocRef);
          if (!userDoc.exists()) {
             transaction.set(userDocRef, { wishlist: [book], cart: [] });
          } else {
             transaction.update(userDocRef, { wishlist: arrayUnion(book) });
          }
        });
        toast({
          title: "Added to Wishlist",
          description: `"${book.title}" has been added to your wishlist.`,
        });
      } catch (error) {
        console.error("Error adding to wishlist: ", error);
        toast({ title: "Error", description: "Could not add to wishlist.", variant: "destructive" });
      }
    }
  };

  const removeFromWishlist = async (bookId: string) => {
     if (!user || !firestore) return;
     const bookToRemove = wishlist.find(item => item.id === bookId);
     if (bookToRemove) {
       const userDocRef = doc(firestore, "users", user.uid);
        try {
          await runTransaction(firestore, async (transaction) => {
            transaction.update(userDocRef, { wishlist: arrayRemove(bookToRemove) });
          });
          toast({
            title: "Removed from Wishlist",
            description: "The book has been removed from your wishlist.",
          });
        } catch (error) {
           console.error("Error removing from wishlist: ", error);
           toast({ title: "Error", description: "Could not remove from wishlist.", variant: "destructive" });
        }
     }
  };
  
  const isBookInWishlist = (bookId: string) => wishlist.some((item) => item.id === bookId);

  const addToCart = async (book: Book, type: 'buy' | 'rent') => {
    if (!user || !firestore) {
       toast({ title: "Please sign in", description: "You need to be logged in to add to cart.", variant: "destructive" });
       return;
    }
    if (!cart.find((item) => item.book.id === book.id)) {
      const userDocRef = doc(firestore, "users", user.uid);
      const cartItem: CartItem = { book, type };
       try {
        await runTransaction(firestore, async (transaction) => {
           const userDoc = await transaction.get(userDocRef);
           if (!userDoc.exists()) {
             transaction.set(userDocRef, { cart: [cartItem], wishlist: [] });
           } else {
             transaction.update(userDocRef, { cart: arrayUnion(cartItem) });
           }
        });
        toast({
          title: "Added to Cart",
          description: `"${book.title}" has been added to your cart for ${type}.`,
        });
       } catch (error) {
         console.error("Error adding to cart: ", error);
         toast({ title: "Error", description: "Could not add to cart.", variant: "destructive" });
       }
    }
  };
  
  const removeFromCart = async (bookId: string) => {
     if (!user || !firestore) return;
     const itemToRemove = cart.find(item => item.book.id === bookId);
     if (itemToRemove) {
       const userDocRef = doc(firestore, "users", user.uid);
        try {
           await runTransaction(firestore, async (transaction) => {
              transaction.update(userDocRef, { cart: arrayRemove(itemToRemove) });
           });
           toast({
              title: "Removed from Cart",
              description: "The book has been removed from your cart.",
           });
        } catch (error) {
           console.error("Error removing from cart: ", error);
           toast({ title: "Error", description: "Could not remove from cart.", variant: "destructive" });
        }
     }
  };

  const isBookInCart = (bookId: string) => cart.some((item) => item.book.id === bookId);

  const clearCart = async () => {
    if (!user || !firestore) return;
    const userDocRef = doc(firestore, "users", user.uid);
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.update(userDocRef, { cart: [] });
      });
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
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
