
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Book } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/AppProvider";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart, isBookInCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const inWishlist = isInWishlist(book.id);
  const inCart = isBookInCart(book.id);
  
  const user = { isKycVerified: false }; 

  const handleAddToCart = (type: 'buy' | 'rent') => {
    if (type === 'rent' && !user.isKycVerified) {
        toast({ title: "KYC Required", description: "Please complete KYC verification to rent books.", variant: "destructive" });
        return;
    }
    if (book.availability === 'in-stock') {
      addToCart(book, type);
    }
  }
  
  const handleAddToWishlist = () => {
    if (!inWishlist) {
        addToWishlist({
            id: book.id,
            title: book.title,
            author: book.author,
            coverImage: book.coverImage,
            price: book.price,
            rentalPrice: book.rentalPrice,
            availability: book.availability,
            genre: book.genre,
            description: book.description,
        });
    }
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.coverImage.url}
            alt={`Cover of ${book.title}`}
            data-ai-hint={book.coverImage.hint}
            fill
            className="object-cover"
          />
          {book.availability === 'out-of-stock' && (
             <Badge variant="destructive" className="absolute top-2 left-2">Out of Stock</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-bold leading-snug tracking-tight mb-1 font-headline">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold">₹{book.price}</p>
          {book.rentalPrice && (
             <p className="text-sm text-muted-foreground">Rent: ₹{book.rentalPrice}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full"
              disabled={!isMounted || book.availability === 'out-of-stock' || inCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isMounted && inCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddToCart('buy')} disabled={book.availability === 'out-of-stock'}>Buy for ₹{book.price}</DropdownMenuItem>
            {book.rentalPrice && (
              <DropdownMenuItem onClick={() => handleAddToCart('rent')} disabled={book.availability === 'out-of-stock'}>Rent for ₹{book.rentalPrice}</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={handleAddToWishlist}
          disabled={!isMounted || inWishlist}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${isMounted && inWishlist ? 'fill-destructive text-destructive' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}
