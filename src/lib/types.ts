import type { User } from 'firebase/auth';

export type Author = {
  id: string;
  name: string;
};

export type Genre = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  title: string;
  author: Author;
  genre: Genre;
  price: number;
  coverImage: {
    url: string;
    hint: string;
  };
  description: string;
  availability: 'in-stock' | 'out-of-stock';
  rentalPrice?: number;
};

export type CommunityPost = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: {
      url: string;
      hint: string;
    };
  };
  content: string;
  timestamp: string;
  replies: number;
};

export type CartItem = {
  book: Book;
  type: 'buy' | 'rent';
};

export interface AppUser extends User {
  isKycVerified?: boolean;
}
