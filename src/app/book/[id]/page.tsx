"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { books } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Share2, ChevronLeft, Award, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/AppProvider";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import { BookCard } from "@/components/BookCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const book = books.find((b) => b.id === id);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!book) {
    notFound();
  }
  
  const inWishlist = isMounted ? isInWishlist(id) : false;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(book);
    }
  };

  const relatedBooks = books
    .filter((b) => b.genre.id === book.genre.id && b.id !== book.id)
    .slice(0, 4);

  return (
    <section className="py-12 lg:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" onClick={() => router.back()} className="mb-8 gap-2">
            <ChevronLeft className="w-4 h-4"/>
            Back to books
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto bg-secondary rounded-2xl shadow-lg overflow-hidden">
               <Image
                src={book.coverImage.url}
                alt={book.title}
                data-ai-hint={book.coverImage.hint}
                fill
                className="object-cover"
              />
              {book.availability === 'out-of-stock' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-base px-4 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="flex flex-col"
          >
            <div className="flex-grow">
              <Badge variant="secondary" className="mb-3">{book.genre.name}</Badge>
              <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-semibold">
                {book.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                by <Link href="#" className="text-foreground font-medium hover:underline">{book.author.name}</Link>
              </p>

              <div className="flex items-center gap-4 mt-4">
                 <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                 </div>
                 <span className="text-sm text-muted-foreground">(256 Reviews)</span>
              </div>
              
              <div className="my-8 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                    <Tag className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Buy New</p>
                        <p className="font-heading text-3xl font-semibold">₹{book.price}</p>
                    </div>
                </div>
                 {book.rentalPrice && (
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                        <Award className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Rent (1 Month)</p>
                            <p className="font-heading text-3xl font-semibold">₹{book.rentalPrice}</p>
                        </div>
                    </div>
                 )}
              </div>

              <p className="leading-relaxed text-muted-foreground">
                {book.description}
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 rounded-full h-14 text-base"
                  onClick={() => addToCart(book, 'buy')}
                  disabled={book.availability === 'out-of-stock'}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                {book.rentalPrice && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 rounded-full h-14 text-base"
                    onClick={() => addToCart(book, 'rent')}
                    disabled={book.availability === 'out-of-stock'}
                  >
                    Rent
                  </Button>
                )}
                 <Button
                    size="icon"
                    variant="outline"
                    className={cn("h-14 w-14 rounded-full", inWishlist && "bg-foreground text-background")}
                    onClick={handleToggleWishlist}
                    disabled={!isMounted}
                 >
                    <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                 </Button>
                 <Button size="icon" variant="outline" className="h-14 w-14 rounded-full">
                    <Share2 className="w-5 h-5" />
                 </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
            <div className="mt-20 lg:mt-28">
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold mb-8">
                    Related Books
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {relatedBooks.map((relatedBook) => (
                       <BookCard key={relatedBook.id} book={relatedBook} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </section>
  );
}
