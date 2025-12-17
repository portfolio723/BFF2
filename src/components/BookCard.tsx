
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye, BookMarked } from "lucide-react";
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
            className="card-book cursor-pointer"
        >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={coverImage.url}
            alt={title}
            data-ai-hint={coverImage.hint}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-foreground text-background hover:bg-foreground text-xs">
                New
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-gold text-foreground hover:bg-gold text-xs">
                Featured
              </Badge>
            )}
             {availability === 'out-of-stock' && (
                <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <Button 
              size="icon" 
              variant="secondary"
              className={cn(
                "w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background",
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
              className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // We are already in a link, so we can just let the default behavior happen
                // or programmatically navigate if needed, but for now, it's just visual
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Add to Cart & Rent Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
            <Button 
              className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm"
              onClick={(e) => handleAddToCart(e, 'buy')}
              disabled={availability === 'out-of-stock'}
            >
              <ShoppingCart className="w-4 h-4" />
              Buy
            </Button>
            {rentalPrice && (
              <Button 
                variant="secondary"
                className="flex-1 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background gap-2 text-sm border border-border"
                onClick={(e) => handleAddToCart(e, 'rent')}
                disabled={availability === 'out-of-stock'}
              >
                <BookMarked className="w-4 h-4" />
                Rent
              </Button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {genre.name}
          </span>
          <h3 className="font-heading text-lg font-medium mt-1 line-clamp-1 group-hover:text-muted-foreground transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            by {author.name}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Rent from</p>
              <p className="font-semibold">₹{rentalPrice || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Buy for</p>
              <p className="font-semibold">₹{price}</p>
            </div>
          </div>
        </div>
        </motion.div>
      </Link>
  );
};
