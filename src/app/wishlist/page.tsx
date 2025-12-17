"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, X, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useStore as useCartStore } from "@/context/AppProvider";
import { useToast } from "@/hooks/use-toast";
import type { Book } from "@/lib/types";


export default function WishlistPage() {
  const { items: wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (item: Book, type: "rent" | "buy") => {
    addToCart(item, type);
  };

  return (
    <section className="pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6" />
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
              My Wishlist
            </h1>
          </div>
          <p className="text-muted-foreground">
            {wishlist.length} book(s) saved for later
          </p>
        </motion.div>

        {wishlist.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-[3/4] bg-secondary">
                  <Image
                    src={item.coverImage.url}
                    alt={item.title}
                    data-ai-hint={item.coverImage.hint}
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 hover:bg-destructive hover:text-background"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <h3 className="font-heading text-lg font-medium line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {item.author.name}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Rent from</p>
                      <p className="font-semibold">₹{item.rentalPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Buy for</p>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full gap-1 text-xs"
                      onClick={() => handleAddToCart(item, "rent")}
                      disabled={!item.rentalPrice || item.availability === 'out-of-stock'}
                    >
                      Rent
                    </Button>
                    <Button
                      className="flex-1 rounded-full gap-1 text-xs"
                      onClick={() => handleAddToCart(item, "buy")}
                      disabled={item.availability === 'out-of-stock'}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Buy
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Save books you love to read later.
            </p>
            <Link href="/books">
              <Button className="rounded-full px-8 gap-2">
                <ShoppingBag className="w-4 h-4" />
                Explore Books
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
