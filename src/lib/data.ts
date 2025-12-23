
import type { Book, Author, Genre, CommunityPost, Pdf } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found
    return { url: "https://picsum.photos/seed/default/400/600", hint: "image" };
  }
  return { url: image.imageUrl, hint: image.imageHint };
};

export const authors: Author[] = [];

export const genres: Genre[] = [
  { id: '1', name: 'Fiction' },
  { id: '2', name: 'Non-Fiction' },
  { id: '3', name: 'Science Fiction' },
  { id: '4', name: 'Fantasy' },
  { id: '5', name: 'Mystery' },
  { id: '6', name: 'Biography' },
  { id: '7', name: 'Self-Help' },
  { id: '8', name: 'Thriller' },
  { id: '9', name: 'Finance' },
  { id: '10', name: 'History' },
];

export const books: Book[] = [];

export const communityPosts: CommunityPost[] = [];

export const pdfs: Pdf[] = [];

export const upscPdfs: Pdf[] = [
  { id: "1", title: "Ancient History", downloadUrl: "#", author: "RS Sharma", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "2", title: "Art and Culture", downloadUrl: "#", author: "Nitin Singhania", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "3", title: "Certificate Physical and Human Geography", downloadUrl: "#", author: "Goh Cheng Leong", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "4", title: "Indian Economy", downloadUrl: "#", author: "Sanjiv Verma", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "5", title: "Indian Polity", downloadUrl: "#", author: "M. Laxmikanth", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
];

export const spacePdfs: Pdf[] = [];

export const selfDevelopmentPdfs: Pdf[] = [];

export const psychologyPdfs: Pdf[] = [];

export const christianPdfs: Pdf[] = [];

export const historyPdfs: Pdf[] = [];

export const ncertPdfs: Pdf[] = [];
