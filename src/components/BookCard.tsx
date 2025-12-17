
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/AppProvider";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  isNew?: boolean;
  isFeatured?: boolean;
}

export function BookCard({
  book,
  isNew = false,
  isFeatured = false,
}: BookCardProps) {
  const { id, title, author, coverImage, price, rentalPrice, genre, availability } = book;
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inWishlist = isMounted ? isInWishlist(id) : false;

  const handleAddToCart = (e: React.MouseEvent, type: 'buy' | 'rent') => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, type);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <Link href={`/book/${id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-lg">
          <Image
            src={coverImage.url}
            alt={title}
            data-ai-hint={coverImage.hint}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isFeatured && (
              <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400/90 text-xs">
                Featured
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-foreground text-background hover:bg-foreground text-xs">
                New
              </Badge>
            )}
             {availability === 'out-of-stock' && (
                <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex gap-2 justify-end">
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0",
                inWishlist && "bg-foreground text-background hover:bg-foreground/90"
              )}
              onClick={handleToggleWishlist}
              disabled={!isMounted}
            >
              <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
              onClick={(e) => handleAddToCart(e, 'buy')}
              disabled={availability === 'out-of-stock'}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-2 mt-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {genre.name}
          </span>
          <h3 className="font-heading text-base font-medium mt-1 line-clamp-1 group-hover:text-muted-foreground transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            by {author.name}
          </p>
          <div className="flex items-baseline justify-between mt-2">
             <div className="flex items-baseline gap-2">
                <p className="text-xs text-muted-foreground">Rent from</p>
                <p className="font-semibold text-lg">₹{rentalPrice || 'N/A'}</p>
             </div>
             <div className="flex items-baseline gap-2">
                <p className="text-xs text-muted-foreground">Buy for</p>
                <p className="font-semibold text-lg">₹{price}</p>
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
