'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import type { FormData, DonatedBook } from '@/app/donate/page';
import { motion, AnimatePresence } from 'framer-motion';

interface BookDetailsStepProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  nextStep: () => void;
}

export function BookDetailsStep({ formData, onUpdate, nextStep }: BookDetailsStepProps) {
  const [books, setBooks] = useState<DonatedBook[]>(formData.books);

  const handleBookChange = (index: number, field: keyof DonatedBook, value: string | number) => {
    const newBooks = [...books];
    (newBooks[index] as any)[field] = value;
    setBooks(newBooks);
  };

  const addBook = () => {
    setBooks([...books, { title: '', author: '', genre: '', quantity: 1 }]);
  };

  const removeBook = (index: number) => {
    if (books.length > 1) {
      const newBooks = books.filter((_, i) => i !== index);
      setBooks(newBooks);
    }
  };

  const handleNext = () => {
    // Basic validation
    if (books.some(book => !book.title || !book.author)) {
      alert("Please fill in at least the title and author for each book.");
      return;
    }
    onUpdate({ books });
    nextStep();
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold mb-2 text-center">
        Book Details
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Tell us about the book(s) you are donating.
      </p>

      <div className="space-y-6">
        <AnimatePresence>
        {books.map((book, index) => (
          <motion.div 
            key={index}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-4 border rounded-lg space-y-4 relative bg-secondary/30"
          >
            {books.length > 1 && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -top-3 -right-3 h-7 w-7 bg-background rounded-full"
                    onClick={() => removeBook(index)}
                >
                    <X className="w-4 h-4 text-muted-foreground" />
                </Button>
            )}
            <div>
              <Label htmlFor={`title-${index}`}>Book Title</Label>
              <Input
                id={`title-${index}`}
                value={book.title}
                onChange={(e) => handleBookChange(index, 'title', e.target.value)}
                placeholder="e.g., The Great Gatsby"
              />
            </div>
            <div>
              <Label htmlFor={`author-${index}`}>Author</Label>
              <Input
                id={`author-${index}`}
                value={book.author}
                onChange={(e) => handleBookChange(index, 'author', e.target.value)}
                placeholder="e.g., F. Scott Fitzgerald"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`genre-${index}`}>Genre (Optional)</Label>
                <Input
                  id={`genre-${index}`}
                  value={book.genre}
                  onChange={(e) => handleBookChange(index, 'genre', e.target.value)}
                  placeholder="e.g., Fiction"
                />
              </div>
              <div>
                <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  value={book.quantity}
                  onChange={(e) => handleBookChange(index, 'quantity', parseInt(e.target.value, 10) || 1)}
                  min="1"
                />
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>

        <Button variant="outline" onClick={addBook} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Book
        </Button>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
