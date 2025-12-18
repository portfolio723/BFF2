
'use client';

import { collection, doc, writeBatch, Firestore } from 'firebase/firestore';
import { books as mockBooks } from './data';
import type { Book } from './types';

/**
 * Seeds the 'books' collection in Firestore with mock data.
 * This function will overwrite any existing books with the same ID.
 * @param db The Firestore instance.
 */
export async function seedDatabase(db: Firestore) {
  const booksCollection = collection(db, 'books');
  const batch = writeBatch(db);

  mockBooks.forEach((book: Book) => {
    // We use the book's existing ID to create a document reference
    const docRef = doc(booksCollection, book.id);
    
    // Flatten the book object for Firestore compatibility
    const bookData = {
      id: book.id,
      title: book.title,
      price: book.price,
      rentalPrice: book.rentalPrice,
      description: book.description,
      availability: book.availability,
      coverImageUrl: book.coverImage.url,
      coverImageHint: book.coverImage.hint,
      // Flatten author and genre objects
      authorId: book.author.id,
      authorName: book.author.name,
      genreId: book.genre.id,
      genreName: book.genre.name,
    };
    
    batch.set(docRef, bookData);
  });

  // Commit the batch
  await batch.commit();
  console.log('Database seeded successfully!');
}
