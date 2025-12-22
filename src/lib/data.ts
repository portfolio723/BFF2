
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

export const communityPosts: CommunityPost[] = [
    {
      id: '1',
      created_at: '2024-08-10T10:00:00Z',
      title: 'What is everyone reading this week?',
      content: 'I just started "Dune" and I am absolutely hooked. The world-building is incredible. Curious to know what other books have captured your attention recently!',
      user_id: 'user-123',
      profiles: {
        full_name: 'Bookworm_Reader',
        avatar_url: 'https://i.pravatar.cc/150?u=user-123',
      },
    },
    {
      id: '2',
      created_at: '2024-08-09T15:30:00Z',
      title: 'Seeking recommendations for good mystery novels',
      content: 'I love a good whodunit! I have already read most of Agatha Christie\'s work. Any suggestions for modern mystery authors or standalone books?',
      user_id: 'user-456',
      profiles: {
        full_name: 'Mystery_Fan',
        avatar_url: 'https://i.pravatar.cc/150?u=user-456',
      },
    },
];

export const pdfs: Pdf[] = [];

export const upscPdfs: Pdf[] = [];

export const spacePdfs: Pdf[] = [];

export const selfDevelopmentPdfs: Pdf[] = [];

export const psychologyPdfs: Pdf[] = [];

export const christianPdfs: Pdf[] = [];

export const historyPdfs: Pdf[] = [];

export const ncertPdfs: Pdf[] = [];
