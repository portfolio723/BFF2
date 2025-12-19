
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

// This type can be removed or kept for reference, but is no longer sourced from Firestore
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
  rentalPrice: number | null;
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
  user_id: string;
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

export type WishlistItem = {
  id: string;
  user_id: string;
  book_id: string;
  added_date: any; 
  book_title: string;
  book_author: string;
  book_cover_image: string;
};

export type OrderItem = {
  id: string;
  book_id: string;
  quantity: number;
  price: number;
  type: 'rent' | 'buy';
};

export type Order = {
  id: string;
  user_id: string;
  created_at: any; 
  total_amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  delivery_address: string; // address id
  order_items: OrderItem[];
};

export type UserDownloadedPdf = {
  id: string;
  userId: string;
  pdfId: string;
  pdfTitle: string;
  downloadDate: any;
};
