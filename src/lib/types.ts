
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

export type FirestoreBook = {
  id: string;
  title: string;
  price: number;
  description: string;
  availability: 'in-stock' | 'out-of-stock';
  coverImageUrl: string;
  coverImageHint: string;
  authorId: string;
  authorName: string;
  genreId: string;
  genreName: string;
  rentalPrice?: number;
}

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
  quantity: number;
};

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isKycVerified?: boolean;
}

export type Address = {
  id:string;
  type: 'Home' | 'Work' | 'Other';
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

export type Pdf = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: {
    url: string;
    hint: string;
  };
  downloadUrl: string;
};
