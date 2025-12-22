
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
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  }
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
  order_id: string;
  book_id: string;
  quantity: number;
  price_at_purchase: number;
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

// Supabase-specific types have been removed.

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
