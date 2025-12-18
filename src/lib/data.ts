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

export const pdfs: Pdf[] = [
  // Classic Literature
  { id: 'pdf-cl1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic Literature', description: 'A novel about the American dream, decadence, and the roaring twenties.', coverImage: getImage('pdf-cover-1'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl2', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic Literature', description: 'A novel about the seriousness of racial inequality in the American South.', coverImage: getImage('pdf-cl2-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl3', title: '1984', author: 'George Orwell', category: 'Classic Literature', description: 'A dystopian novel set in a totalitarian society under constant surveillance.', coverImage: getImage('pdf-cl3-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl4', title: 'Moby Dick', author: 'Herman Melville', category: 'Classic Literature', description: 'The saga of Captain Ahab and his relentless pursuit of the great white whale.', coverImage: getImage('pdf-cl4-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Classic Literature', description: 'A story about teenage angst and alienation.', coverImage: getImage('pdf-cl5-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl6', title: 'Brave New World', author: 'Aldous Huxley', category: 'Classic Literature', description: 'A dystopian novel about a future society driven by technology and science.', coverImage: getImage('pdf-cl6-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl7', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', category: 'Classic Literature', description: 'A novel about a man who remains young while his portrait ages.', coverImage: getImage('pdf-cl7-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl8', title: 'Frankenstein', author: 'Mary Shelley', category: 'Classic Literature', description: 'A scientist creates a sentient creature in an unorthodox scientific experiment.', coverImage: getImage('pdf-cl8-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl9', title: 'Don Quixote', author: 'Miguel de Cervantes', category: 'Classic Literature', description: 'A Spanish nobleman who reads so many chivalric romances that he loses his sanity.', coverImage: getImage('pdf-cl9-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cl10', title: 'War and Peace', author: 'Leo Tolstoy', category: 'Classic Literature', description: 'A novel that chronicles the history of the French invasion of Russia.', coverImage: getImage('pdf-cl10-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },

  // Classic Romance
  { id: 'pdf-cr1', title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Classic Romance', description: 'A romantic novel of manners that satirizes the societal expectations of women.', coverImage: getImage('pdf-cover-2'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr2', title: 'Jane Eyre', author: 'Charlotte Brontë', category: 'Classic Romance', description: 'The story of a young, orphaned governess who falls in love with her employer.', coverImage: getImage('pdf-cr2-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr3', title: 'Wuthering Heights', author: 'Emily Brontë', category: 'Classic Romance', description: 'A tale of passionate, yet thwarted, love between Catherine Earnshaw and Heathcliff.', coverImage: getImage('pdf-cr3-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr4', title: 'Sense and Sensibility', author: 'Jane Austen', category: 'Classic Romance', description: 'The story of two sisters, Elinor and Marianne Dashwood, and their different approaches to love.', coverImage: getImage('pdf-cr4-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr5', title: 'Anna Karenina', author: 'Leo Tolstoy', category: 'Classic Romance', description: 'A tragic story of a married aristocrat and her affair with the affluent Count Vronsky.', coverImage: getImage('pdf-cr5-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr6', title: 'Gone with the Wind', author: 'Margaret Mitchell', category: 'Classic Romance', description: 'A sweeping romantic story set in the American South during the Civil War.', coverImage: getImage('pdf-cr6-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr7', title: 'The Age of Innocence', author: 'Edith Wharton', category: 'Classic Romance', description: 'A tale of a young lawyer and his fiancée in the rigid high society of 1870s New York.', coverImage: getImage('pdf-cr7-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr8', title: 'Romeo and Juliet', author: 'William Shakespeare', category: 'Classic Romance', description: 'A tragedy about two young star-crossed lovers whose deaths ultimately reconcile their feuding families.', coverImage: getImage('pdf-cr8-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr9', title: 'Persuasion', author: 'Jane Austen', category: 'Classic Romance', description: 'Austen\'s last completed novel, a story of second chances.', coverImage: getImage('pdf-cr9-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-cr10', title: 'Emma', author: 'Jane Austen', category: 'Classic Romance', description: 'A novel about youthful hubris and the perils of misconstrued romance.', coverImage: getImage('pdf-cr10-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },

  // Strategy & Philosophy
  { id: 'pdf-sp1', title: 'The Art of War', author: 'Sun Tzu', category: 'Strategy & Philosophy', description: 'An ancient Chinese military treatise applicable to many fields.', coverImage: getImage('pdf-cover-3'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp2', title: 'Meditations', author: 'Marcus Aurelius', category: 'Strategy & Philosophy', description: 'A series of personal writings by the Roman Emperor, exploring Stoic philosophy.', coverImage: getImage('pdf-sp2-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp3', title: 'The Prince', author: 'Niccolò Machiavelli', category: 'Strategy & Philosophy', description: 'A 16th-century political treatise on how a prince should rule.', coverImage: getImage('pdf-sp3-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp4', title: 'The Republic', author: 'Plato', category: 'Strategy & Philosophy', description: 'A Socratic dialogue concerning justice, the order and character of the just city-state and the just man.', coverImage: getImage('pdf-sp4-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp5', title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', category: 'Strategy & Philosophy', description: 'A critique of past philosophers who, he argues, lacked critical sense.', coverImage: getImage('pdf-sp5-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp6', title: 'The Analects', author: 'Confucius', category: 'Strategy & Philosophy', description: 'A collection of sayings and ideas attributed to the Chinese philosopher Confucius.', coverImage: getImage('pdf-sp6-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp7', title: 'Discourse on Method', author: 'René Descartes', category: 'Strategy & Philosophy', description: 'An autobiographical treatise about the search for truth in the sciences.', coverImage: getImage('pdf-sp7-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp8', title: 'The Social Contract', author: 'Jean-Jacques Rousseau', category: 'Strategy & Philosophy', description: 'A work on political philosophy that discusses the best way to establish a political community.', coverImage: getImage('pdf-sp8-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp9', title: 'On Liberty', author: 'John Stuart Mill', category: 'Strategy & Philosophy', description: 'A philosophical work that supports Mill\'s ethical system of utilitarianism.', coverImage: getImage('pdf-sp9-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-sp10', title: 'Tao Te Ching', author: 'Laozi', category: 'Strategy & Philosophy', description: 'A fundamental text for both philosophical and religious Taoism.', coverImage: getImage('pdf-sp10-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  
  // Historical Fiction
  { id: 'pdf-hf1', title: 'A Tale of Two Cities', author: 'Charles Dickens', category: 'Historical Fiction', description: 'A historical novel set in London and Paris before and during the French Revolution.', coverImage: getImage('pdf-cover-4'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf2', title: 'The Name of the Rose', author: 'Umberto Eco', category: 'Historical Fiction', description: 'A historical murder mystery set in an Italian monastery in the year 1327.', coverImage: getImage('pdf-hf2-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf3', title: 'I, Claudius', author: 'Robert Graves', category: 'Historical Fiction', description: 'An autobiography of the Roman Emperor Claudius.', coverImage: getImage('pdf-hf3-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf4', title: 'Wolf Hall', author: 'Hilary Mantel', category: 'Historical Fiction', description: 'A fictionalised biography documenting the rapid rise to power of Thomas Cromwell.', coverImage: getImage('pdf-hf4-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf5', title: 'The Pillars of the Earth', author: 'Ken Follett', category: 'Historical Fiction', description: 'A historical novel about the building of a cathedral in the fictional town of Kingsbridge, England.', coverImage: getImage('pdf-hf5-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf6', title: 'The Three Musketeers', author: 'Alexandre Dumas', category: 'Historical Fiction', description: 'A historical adventure novel set in 17th-century France.', coverImage: getImage('pdf-hf6-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf7', title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', category: 'Historical Fiction', description: 'An adventure novel that takes place in France, Italy, and islands in the Mediterranean during 1815–1839.', coverImage: getImage('pdf-hf7-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf8', title: 'Ben-Hur: A Tale of the Christ', author: 'Lew Wallace', category: 'Historical Fiction', description: 'A novel about a fictional Jewish prince from Jerusalem who is enslaved by the Romans.', coverImage: getImage('pdf-hf8-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf9', title: 'The Scarlet Pimpernel', author: 'Baroness Orczy', category: 'Historical Fiction', description: 'A classic adventure novel set during the French Revolution.', coverImage: getImage('pdf-hf9-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
  { id: 'pdf-hf10', title: 'Ivanhoe', author: 'Sir Walter Scott', category: 'Historical Fiction', description: 'A historical novel set in 12th-century England, an example of the historical romance genre.', coverImage: getImage('pdf-hf10-cover'), downloadUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf' },
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
