
"use client";
import { useState, useMemo, useEffect } from "react";
import { BookCard } from "@/components/BookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Book as BookType } from "@/lib/types"; 
import { Search, LayoutGrid, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import type { Genre } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
        toast.error("Database connection failed", { description: "Please check your Supabase credentials." });
        setIsLoading(false);
        return;
    }
    
    const fetchBooks = async (supabase: SupabaseClient) => {
      setIsLoading(true);
      const { data, error } = await supabase.from('books').select(`
        id,
        title,
        price,
        rental_price,
        cover_image_url,
        cover_image_hint,
        description,
        availability,
        author:authors (id, name),
        genre:genres (id, name)
      `);
      
      if (error) {
        toast.error("Failed to fetch books", { description: error.message });
        setBooks([]);
      } else {
        const formattedBooks = data.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: { id: book.author.id, name: book.author.name },
          genre: { id: book.genre.id, name: book.genre.name },
          price: book.price,
          rentalPrice: book.rental_price,
          coverImage: {
            url: book.cover_image_url,
            hint: book.cover_image_hint,
          },
          description: book.description,
          availability: book.availability,
        }));
        setBooks(formattedBooks);
      }
      setIsLoading(false);
    };
    
    const fetchGenres = async (supabase: SupabaseClient) => {
        const { data, error } = await supabase.from('genres').select('*');
        if (!error && data) {
            setGenres(data);
        }
    }

    fetchBooks(supabase);
    fetchGenres(supabase);
  }, []);

  const filteredBooks = useMemo(() => {
    if (!books) return [];

    let filtered = books.filter((book) => {
      const searchMatch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      const genreMatch = genre === "all" || book.genre.id === genre;
      return searchMatch && genreMatch;
    });

    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    // "newest" is default, no specific sorting logic for now.

    return filtered;
  }, [searchTerm, genre, sortBy, books]);

  return (
    <div className="container-custom">
      <header className="py-12 md:py-16">
        <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight">
          Explore Books
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Discover thousands of books to rent or buy.
        </p>
      </header>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 w-full bg-secondary border-0"
              />
            </div>
            <div className="flex gap-4">
              <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="w-full md:w-[180px] h-12 bg-secondary border-0">
                      <SelectValue placeholder="All Genres" />
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
               <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] h-12 bg-secondary border-0">
                      <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
              </Select>
              <div className="hidden md:flex gap-1 bg-secondary p-1 rounded-lg">
                <Button variant={view === 'grid' ? 'ghost' : 'ghost'} size="icon" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-background' : ''}>
                    <LayoutGrid className="w-5 h-5"/>
                </Button>
                <Button variant={view === 'list' ? 'ghost' : 'ghost'} size="icon" onClick={() => setView('list')} className={view === 'list' ? 'bg-background' : ''}>
                    <List className="w-5 h-5"/>
                </Button>
              </div>
            </div>
        </div>
        {!isLoading && <p className="text-sm text-muted-foreground mt-4">Showing {filteredBooks.length} books</p>}
      </div>

      <main className="mb-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredBooks.map((book, index) => (
              <BookCard 
                key={book.id} 
                book={book} 
                isNew={index < 3} // Example logic for 'New' badge
                isFeatured={index === 0 || index === 2} // Example logic for 'Featured' badge
              />
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

       <div className="text-center mb-20">
          <Button variant="outline" className="px-8 h-12 rounded-full">Load More Books</Button>
        </div>
    </div>
  );
}
