
'use client';

import { collection, doc, writeBatch, Firestore } from 'firebase/firestore';
import { books as mockBooks } from './data';

/**
 * Seeds the 'books' collection in Firestore with mock data.
 * This function will overwrite any existing books with the same ID.
 * @param db The Firestore instance.
 */
export async function seedDatabase(db: Firestore) {
  const booksCollection = collection(db, 'books');
  const batch = writeBatch(db);

  mockBooks.forEach((book) => {
    // We use the book's existing ID to create a document reference
    const docRef = doc(booksCollection, book.id);
    
    // The book object is directly used as the data to be written.
    // We are now storing the author and genre as objects.
    const bookData = {
        ...book,
        // The mock data `book` object already has author and genre as objects.
        // No need to transform them.
    };
    
    batch.set(docRef, bookData);
  });

  // Commit the batch
  await batch.commit();
  console.log('Database seeded successfully!');
}
