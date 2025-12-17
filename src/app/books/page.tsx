
"use client";
import { useState, useMemo } from "react";
import { BookCard } from "@/components/BookCard";
import { books, genres } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Book } from "@/lib/types";
import { Search } from "lucide-react";

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState<[number]>([1000]);

  const maxPrice = useMemo(() => Math.max(...books.map((b) => b.price), 1000), []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchMatch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const genreMatch = genre === "all" || book.genre.id === genre;
      const availabilityMatch =
        availability === "all" || book.availability === availability;
      const priceMatch = book.price <= priceRange[0];

      return searchMatch && genreMatch && availabilityMatch && priceMatch;
    });
  }, [searchTerm, genre, availability, priceRange]);

  return (
    <div className="container-custom">
      <header className="py-12 md:py-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight">
          Book Catalog
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Browse our collection of books available for rent or purchase. Use the filters to find your next great read.
        </p>
      </header>

      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <aside className="lg:col-span-1 bg-card p-6 rounded-2xl border self-start sticky top-24">
            <h3 className="font-heading text-lg font-semibold mb-6">Filters</h3>
            <div className="space-y-6">
                <div>
                    <Label>Search by Title</Label>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                        placeholder="e.g. The God of Small Things"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        />
                    </div>
                </div>

                <Separator />
                
                <div>
                    <Label>Genre</Label>
                    <Select value={genre} onValueChange={setGenre}>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Filter by Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Genres</SelectItem>
                            {genres.map((g) => (
                            <SelectItem key={g.id} value={g.id}>
                                {g.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Label>Max Price</Label>
                        <span className="text-sm font-medium">₹{priceRange[0]}</span>
                    </div>
                    <Slider
                        defaultValue={[1000]}
                        max={maxPrice}
                        step={50}
                        onValueChange={setPriceRange}
                    />
                </div>

                <Separator />

                <div>
                    <Label>Availability</Label>
                    <Select value={availability} onValueChange={setAvailability}>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Filter by Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="in-stock">In Stock</SelectItem>
                            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </aside>

        <main className="lg:col-span-3">
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 lg:py-32 bg-card rounded-2xl border border-dashed">
                <h2 className="text-2xl font-bold font-heading">No Books Found</h2>
                <p className="text-muted-foreground mt-2">
                    Try adjusting your filters to find what you're looking for.
                </p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
