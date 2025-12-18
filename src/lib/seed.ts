
'use client';

import { collection, doc, writeBatch, Firestore, serverTimestamp } from 'firebase/firestore';
import { books as mockBooks, pdfs as mockPdfs } from './data';
import type { Book, Address } from './types';

export const DUMMY_USER_ID = "seed-user-12345";

const dummyAddress: Address = {
  id: 'addr-1',
  type: 'Home',
  firstName: 'Demo',
  lastName: 'User',
  address: '123, Jubilee Hills',
  address2: 'Near Film Nagar',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500033',
  phone: '9876543210',
}

/**
 * Seeds the 'books' collection in Firestore with mock data.
 * This function will overwrite any existing books with the same ID.
 * @param db The Firestore instance.
 */
export async function seedDatabase(db: Firestore) {
  const batch = writeBatch(db);

  // 1. Seed Books
  const booksCollection = collection(db, 'books');
  mockBooks.forEach((book: Book) => {
    const docRef = doc(booksCollection, book.id);
    const bookData = {
      id: book.id,
      title: book.title,
      price: book.price,
      rentalPrice: book.rentalPrice ?? null,
      description: book.description,
      availability: book.availability,
      coverImageUrl: book.coverImage.url,
      coverImageHint: book.coverImage.hint,
      authorId: book.author.id,
      authorName: book.author.name,
      genreId: book.genre.id,
      genreName: book.genre.name,
    };
    batch.set(docRef, bookData);
  });

  // 2. Seed a dummy user
  const userRef = doc(db, 'users', DUMMY_USER_ID);
  batch.set(userRef, {
      id: DUMMY_USER_ID,
      userName: "Demo User",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User",
      phoneNumber: "+919876543210"
  });

  // 3. Seed user's wishlist
  const wishlistCollection = collection(db, 'users', DUMMY_USER_ID, 'wishlist_items');
  const wishlistedBook = mockBooks[5];
  const wishlistItemRef = doc(wishlistCollection, wishlistedBook.id);
  batch.set(wishlistItemRef, {
      id: wishlistedBook.id,
      userId: DUMMY_USER_ID,
      bookId: wishlistedBook.id,
      addedDate: serverTimestamp(),
      bookTitle: wishlistedBook.title,
      bookAuthor: wishlistedBook.author.name,
      bookCoverImage: wishlistedBook.coverImage.url,
  });

  // 4. Seed user's downloaded PDFs
  const downloadedPdfsCollection = collection(db, 'users', DUMMY_USER_ID, 'user_downloaded_pdfs');
  const downloadedPdf = mockPdfs[0];
  const downloadedPdfRef = doc(downloadedPdfsCollection);
  batch.set(downloadedPdfRef, {
      userId: DUMMY_USER_ID,
      pdfId: downloadedPdf.id,
      pdfTitle: downloadedPdf.title,
      downloadDate: serverTimestamp(),
  });
  
  // 5. Seed user's orders
  const ordersCollection = collection(db, 'users', DUMMY_USER_ID, 'orders');
  const orderRef = doc(ordersCollection, 'order-1');
  const orderBook1 = mockBooks[1];
  const orderBook2 = mockBooks[2];
  batch.set(orderRef, {
      id: 'order-1',
      userId: DUMMY_USER_ID,
      orderDate: new Date('2024-05-10T10:00:00Z').toISOString(),
      totalAmount: (orderBook1.price) + (orderBook2.rentalPrice || 0),
      status: 'Delivered',
      deliveryAddress: dummyAddress,
      items: [
        {
          id: orderBook1.id,
          bookId: orderBook1.id,
          title: orderBook1.title,
          author: orderBook1.author.name,
          coverImage: orderBook1.coverImage.url,
          quantity: 1,
          price: orderBook1.price,
          type: 'buy'
        },
        {
          id: orderBook2.id,
          bookId: orderBook2.id,
          title: orderBook2.title,
          author: orderBook2.author.name,
          coverImage: orderBook2.coverImage.url,
          quantity: 1,
          price: orderBook2.rentalPrice,
          type: 'rent'
        }
      ]
  });


  // Commit the batch
  await batch.commit();
  console.log('Database seeded successfully!');
}
