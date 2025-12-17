import type { Book, Author, Genre, CommunityPost } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found
    return { url: "https://picsum.photos/seed/default/400/600", hint: "image" };
  }
  return { url: image.imageUrl, hint: image.imageHint };
};

export const authors: Author[] = [
  { id: '1', name: 'Arundhati Roy' },
  { id: '2', name: 'Vikram Seth' },
  { id: '3', name: 'Amitav Ghosh' },
  { id: '4', name: 'Jhumpa Lahiri' },
];

export const genres: Genre[] = [
  { id: '1', name: 'Fiction' },
  { id: '2', name: 'Non-Fiction' },
  { id: '3', name: 'Science Fiction' },
  { id: '4', name: 'Fantasy' },
  { id: '5', name: 'Mystery' },
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The God of Small Things',
    author: authors[0],
    genre: genres[0],
    price: 399,
    rentalPrice: 99,
    coverImage: getImage('book-cover-1'),
    description: 'A story about the childhood experiences of fraternal twins whose lives are destroyed by the "Love Laws" that lay down "who should be loved, and how. And how much."',
    availability: 'in-stock',
  },
  {
    id: '2',
    title: 'A Suitable Boy',
    author: authors[1],
    genre: genres[0],
    price: 899,
    rentalPrice: 199,
    coverImage: getImage('book-cover-2'),
    description: 'Set in a newly independent India, the novel follows the story of four families over a period of 18 months, and centers on Mrs. Rupa Mehra\'s efforts to arrange the marriage of her younger daughter, Lata, to a "suitable boy".',
    availability: 'in-stock',
  },
  {
    id: '3',
    title: 'The Glass Palace',
    author: authors[2],
    genre: genres[1],
    price: 599,
    coverImage: getImage('book-cover-3'),
    description: 'The novel is set in Burma, Bengal, India, and Malaya, spans a century from the fall of the Konbaung Dynasty in Mandalay, to the modern era.',
    availability: 'out-of-stock',
  },
  {
    id: '4',
    title: 'The Namesake',
    author: authors[3],
    genre: genres[0],
    price: 450,
    rentalPrice: 120,
    coverImage: getImage('book-cover-4'),
    description: 'The novel examines the intricacies of immigrant life, the conflicts of assimilation, and the tangled ties between generations.',
    availability: 'in-stock',
  },
  {
    id: '5',
    title: 'Sea of Poppies',
    author: authors[2],
    genre: genres[0],
    price: 650,
    rentalPrice: 150,
    coverImage: getImage('book-cover-5'),
    description: 'The first book of the Ibis trilogy, this novel is set in the first half of the 19th century, on the banks of the holy river Ganges, and on the ebb and tide of the Indian Ocean.',
    availability: 'in-stock',
  },
  {
    id: '6',
    title: 'The Ministry of Utmost Happiness',
    author: authors[0],
    genre: genres[0],
    price: 499,
    coverImage: getImage('book-cover-6'),
    description: 'The novel weaves together the stories of people from different backgrounds in India, exploring themes of love, identity, and politics.',
    availability: 'out-of-stock',
  },
    {
    id: '7',
    title: 'Dune',
    author: {id: '5', name: 'Frank Herbert'},
    genre: genres[2],
    price: 799,
    rentalPrice: 180,
    coverImage: getImage('book-cover-7'),
    description: 'A mythic and emotionally charged hero\'s journey, "Dune" tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding.',
    availability: 'in-stock',
  },
  {
    id: '8',
    title: 'Foundation',
    author: {id: '6', name: 'Isaac Asimov'},
    genre: genres[2],
    price: 550,
    rentalPrice: 130,
    coverImage: getImage('book-cover-8'),
    description: 'For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future.',
    availability: 'in-stock',
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    title: 'What is everyone reading this week?',
    author: {
      name: 'Priya Sharma',
      avatar: getImage('user-avatar-1'),
    },
    content: 'Just finished "The God of Small Things" and it was breathtaking. Looking for recommendations for my next read! Preferably something in the non-fiction space about Hyderabad.',
    timestamp: '2 hours ago',
    replies: 5,
  },
  {
    id: '2',
    title: 'Book club meeting for "A Suitable Boy" - Discussion',
    author: {
      name: 'Rohan Reddy',
      avatar: getImage('user-avatar-2'),
    },
    content: 'Let\'s discuss the themes and characters of Vikram Seth\'s masterpiece. What did you all think of Lata\'s final choice? We will be meeting at Lamakaan this Saturday at 5 PM.',
    timestamp: '1 day ago',
    replies: 12,
  },
  {
    id: '3',
    title: 'Best places to read in Hyderabad?',
    author: {
      name: 'Anika Singh',
      avatar: getImage('user-avatar-3'),
    },
    content: 'Looking for some quiet cafes or parks in Hyderabad to spend an afternoon reading. Any hidden gems I should know about? I\'ve tried all the usual spots.',
    timestamp: '3 days ago',
    replies: 8,
  },
];
