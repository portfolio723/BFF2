"use client";
import { useState } from "react";
import { BookCard } from "@/components/BookCard";
import { books, genres, authors } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Book } from "@/lib/types";

export default function BooksPage() {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");
  const [author, setAuthor] = useState("all");
  const [availability, setAvailability] = useState("all");

  const handleFilterChange = (
    value: string,
    filterType: "search" | "genre" | "author" | "availability"
  ) => {
    let newSearchTerm = searchTerm;
    let newGenre = genre;
    let newAuthor = author;
    let newAvailability = availability;

    switch (filterType) {
      case "search":
        newSearchTerm = value;
        setSearchTerm(value);
        break;
      case "genre":
        newGenre = value;
        setGenre(value);
        break;
      case "author":
        newAuthor = value;
        setAuthor(value);
        break;
      case "availability":
        newAvailability = value;
        setAvailability(value);
        break;
    }

    let tempBooks = books;

    if (newSearchTerm) {
      tempBooks = tempBooks.filter((book) =>
        book.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
    }
    if (newGenre !== "all") {
      tempBooks = tempBooks.filter((book) => book.genre.id === newGenre);
    }
    if (newAuthor !== "all") {
      tempBooks = tempBooks.filter((book) => book.author.id === newAuthor);
    }
    if (newAvailability !== "all") {
      tempBooks = tempBooks.filter(
        (book) => book.availability === newAvailability
      );
    }
    setFilteredBooks(tempBooks);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Book Catalog
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse our collection of books available for rent or purchase.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => handleFilterChange(e.target.value, "search")}
        />
        <Select value={genre} onValueChange={(v) => handleFilterChange(v, 'genre')}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={author} onValueChange={(v) => handleFilterChange(v, 'author')}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Author" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
             {authors.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={availability} onValueChange={(v) => handleFilterChange(v, 'availability')}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No books found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
