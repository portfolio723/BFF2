
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
  { id: "1", title: "Ancient History", downloadUrl: "https://mega.nz/file/ypBRnD5T#qVTEUPR8Ge7hIsz04RMlnkpBJcyFuxsUr5VGxJD6HJM", author: "RS Sharma", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "2", title: "Art and Culture", downloadUrl: "https://mega.nz/file/2pZhUIgL#a2NY44Lq4aUvDQoQiol1jBA6WqVEX4vRnGTLMt4eCpc", author: "Nitin Singhania", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "3", title: "Certificate Physical and Human Geography", downloadUrl: "https://mega.nz/file/6wZzDAAS#yWy96pCsLHUbS1q99Gr6c_3Jnb-PGsf0WQCAV1Xboa0", author: "Goh Cheng Leong", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "4", title: "Indian Economy", downloadUrl: "https://mega.nz/file/6tQFkA4Z#5OsoGtcac9erpWbKSCVsf7xbts1uMXMrU_7xi4bL-yU", author: "Sanjiv Verma", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
  { id: "5", title: "Indian Polity", downloadUrl: "https://mega.nz/file/70YnBKgI#R5DmIrmigbLfQEjfOa36Ec_SoxdguMN-eSAUPpdKXiE", author: "M. Laxmikanth", category: "UPSC", description: "", coverImage: {url: "", hint: ""} },
];

export const spacePdfs: Pdf[] = [
    { id: "sa1", title: "Awareness", author: "Anthony de Mello", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa2", title: "Astrophysics For People In A Hurry", author: "Neil deGrasse Tyson", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa3", title: "Death by Black Hole And Other Cosmic Quandaries", author: "Neil deGrasse Tyson", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa4", title: "Cosmos", author: "Carl Sagan", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa5", title: "A Brief History of Time", author: "Stephen Hawking", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa6", title: "The Fabric of the Cosmos", author: "Brian Greene", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa7", title: "The Milky Way Galaxy", author: "N/A", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa8", title: "The Universe in a Nutshell", author: "Stephen Hawking", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa9", title: "The Right Stuff", author: "Tom Wolfe", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa10", title: "Welcome to the Universe", author: "Neil deGrasse Tyson, Michael A. Strauss, J. Richard Gott", downloadUrl: "#", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
];

export const selfDevelopmentPdfs: Pdf[] = [];

export const psychologyPdfs: Pdf[] = [];

export const christianPdfs: Pdf[] = [];

export const historyPdfs: Pdf[] = [];

export const ncertPdfs: Pdf[] = [];
