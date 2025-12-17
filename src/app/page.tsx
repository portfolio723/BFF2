import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { books } from "@/lib/data";
import { BookCard } from "@/components/BookCard";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Discover Your Next Chapter
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200">
            Your local destination for renting and buying books in Hyderabad.
            Join our community of readers and share the love for stories.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200">
              <Link href="/books">Browse Books</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/donate">Donate a Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Featured Books
            </h2>
            <Button variant="link" asChild>
                <Link href="/books">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
