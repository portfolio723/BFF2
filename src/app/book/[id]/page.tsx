
"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Star, Share2, ChevronRight, Award, Tag, Truck, ShieldCheck, Undo2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/AppProvider";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import { BookCard } from "@/components/BookCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import type { Book } from "@/lib/types";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const firestore = useFirestore();
  const bookRef = useMemoFirebase(() => doc(firestore, 'books', id), [firestore, id]);
  const { data: book, isLoading: isBookLoading } = useDoc<Book>(bookRef);

  // For related books, we'll just use the mock data for now.
  // A proper implementation would fetch this from Firestore based on genre.
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [isMounted, setIsMounted] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState<'rent' | 'buy'>('rent');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isBookLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    )
  }

  if (!book && !isBookLoading) {
    notFound();
  }
  
  const inWishlist = isMounted && book ? isInWishlist(book.id) : false;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!book) return;
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const handleAddToCart = () => {
    if (book) {
        addToCart(book, purchaseOption);
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-4 h-4"/>
          <Link href="/books" className="hover:text-foreground">Explore</Link>
          <ChevronRight className="w-4 h-4"/>
          <span className="text-foreground font-medium line-clamp-1">{book?.title}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto bg-secondary rounded-2xl shadow-lg overflow-hidden">
               {book?.coverImage && <Image
                src={book.coverImage.url}
                alt={book.title}
                data-ai-hint={book.coverImage.hint}
                fill
                className="object-cover"
              />}
              {book?.availability === 'out-of-stock' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-base px-4 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'On rentals' },
                { icon: ShieldCheck, label: 'Quality Assured', sub: 'Verified condition' },
                { icon: Undo2, label: 'Easy Returns', sub: '7-day policy' },
              ].map(item => (
                <div key={item.label} className="bg-card border border-border rounded-lg p-3 text-center">
                  <item.icon className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="flex flex-col"
          >
              <Badge variant="secondary" className="mb-3 w-fit">{book?.genre.name}</Badge>
              <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-semibold">
                {book?.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                by <Link href="#" className="text-foreground font-medium hover:underline">{book?.author.name}</Link>
              </p>

              <div className="flex items-center gap-4 mt-4">
                 <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                 </div>
                 <span className="font-medium">4.8</span>
                 <span className="text-sm text-muted-foreground">(2,453 Reviews)</span>
              </div>
              
              <p className="leading-relaxed text-muted-foreground mt-6 text-sm">
                {book?.description}
              </p>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Choose Option</h3>
                <div className="grid grid-cols-2 gap-3">
                  {book?.rentalPrice && (
                    <button 
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        purchaseOption === 'rent' ? "border-foreground bg-secondary" : "border-border"
                      )}
                      onClick={() => setPurchaseOption('rent')}
                    >
                      <p className="text-sm">Rent for 30 days</p>
                      <p className="font-heading text-2xl font-semibold">₹{book.rentalPrice}</p>
                      <p className="text-xs text-muted-foreground">+ delivery</p>
                    </button>
                  )}
                   {book && <button 
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        purchaseOption === 'buy' ? "border-foreground bg-secondary" : "border-border"
                      )}
                      onClick={() => setPurchaseOption('buy')}
                   >
                      <p className="text-sm">Buy to own</p>
                      <p className="font-heading text-2xl font-semibold">₹{book.price}</p>
                      <p className="text-xs text-muted-foreground line-through">₹{Math.round(book.price * 1.2)}</p>
                   </button>}
                </div>
                 <p className="text-sm text-green-600 mt-3">In Stock - 5 copies available</p>
              </div>
            
            <div className="mt-8 flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 rounded-full h-14 text-base"
                  onClick={handleAddToCart}
                  disabled={book?.availability === 'out-of-stock'}
                >
                  {purchaseOption === 'rent' ? 'Rent Now' : 'Buy Now'}
                </Button>
                
                 <Button
                    size="icon"
                    variant="outline"
                    className={cn("h-14 w-14 rounded-full", inWishlist && "bg-foreground text-background")}
                    onClick={handleToggleWishlist}
                    disabled={!isMounted}
                 >
                    <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                 </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-medium mb-4">Book Details</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Publisher</span> <span>Jaico Publishing</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Published</span> <span>2020</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Language</span> <span>English</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pages</span> <span>252</span></div>
                    <div className="flex justify-between col-span-2"><span className="text-muted-foreground">ISBN</span> <span>978-9390166268</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Condition</span> <Badge variant="outline">Like New</Badge></div>
                </div>
            </div>

          </motion.div>
        </div>
        
        {/* Description & Reviews Tabs */}
        <div className="mt-20 lg:mt-28">
            <Tabs defaultValue="description">
                <TabsList className="bg-transparent border-b border-border rounded-none p-0 w-full justify-start">
                    <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">Description</TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">Reviews (2,453)</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-8">
                    <div className="prose prose-sm lg:prose-base max-w-none text-muted-foreground">
                        <p>In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.</p>
                        <p>Morgan Housel's brilliant storytelling illuminates how and why money means so much to us, and why smart people make terrible financial decisions. The book is filled with fascinating case studies of people who have made and lost fortunes, and explains why everyone's relationship with money is different.</p>
                        <h4 className="font-semibold text-foreground">Key themes include:</h4>
                        <ul>
                            <li>Why some people save compulsively while others spend everything</li>
                            <li>The role of luck vs skill in financial success</li>
                            <li>Why we make irrational financial decisions</li>
                            <li>How to build lasting wealth through behavior changes</li>
                        </ul>
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-8">
                    <div className="text-center text-muted-foreground">
                        <p>Reviews will be shown here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
        
        {/* Related Books */}
        {relatedBooks.length > 0 && (
            <div className="mt-20 lg:mt-28">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-heading text-2xl lg:text-3xl font-semibold">
                        You May Also Like
                    </h2>
                    <Link href="/books">
                        <Button variant="ghost">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </Link>
                </div>
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
