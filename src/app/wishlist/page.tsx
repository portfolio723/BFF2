"use client";

import { useStore } from "@/context/AppProvider";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Your Wishlist
        </h1>
        <p className="text-muted-foreground mt-2">
          Books you're dreaming of.
        </p>
      </header>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {wishlist.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg border border-dashed">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Looks like you haven't added any books to your wishlist yet. Start exploring to find your next favorite read!
          </p>
          <Button asChild className="mt-6">
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
