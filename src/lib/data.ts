
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
    { id: "sa1", title: "Awareness", author: "Anthony de Mello", downloadUrl: "https://mega.nz/file/DggXAbgC#IyTY958WuXLm4ac6YfsjHmvRlk1iH9J1ppzC4P-oY14", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa2", title: "Astrophysics For People In A Hurry", author: "Neil deGrasse Tyson", downloadUrl: "https://mega.nz/file/2sxARAzA#yzBua2lM7XC43ca1M4U8y9TZ7YaNXEKUaY4owh-zGkc", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa3", title: "Death by Black Hole And Other Cosmic Quandaries", author: "Neil deGrasse Tyson", downloadUrl: "https://mega.nz/file/LtpmSZYB#CU4XGvS565vU9MkyTPqHn4NrhD_NaC7un1SAU6qCv2E", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa4", title: "Cosmos", author: "Carl Sagan", downloadUrl: "https://mega.nz/file/i1ImlaBZ#z8IHOeBqw2-KRuq_QbOgo_NcCcS4ExjJC6PkvCry0ww", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa5", title: "A Brief History of Time", author: "Stephen Hawking", downloadUrl: "https://mega.nz/file/msQwhLrb#lxVOXfzopErCcvClIz28wHmugYC628K66PxebjEmHRY", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa6", title: "The Fabric of the Cosmos", author: "Brian Greene", downloadUrl: "https://mega.nz/file/ishjQQBb#k6NwyRG9qsTnWIXGZo4TptOX6iWX_WanDr32k2uscq8", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa7", title: "The Milky Way Galaxy", author: "N/A", downloadUrl: "https://mega.nz/file/2xJgCCAB#2YVk5h-WLLQqDZYDBrFlerfFr9OkF-J2cPv8YBPZ2Ko", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa8", title: "The Universe in a Nutshell", author: "Stephen Hawking", downloadUrl: "https://mega.nz/file/X9hGHZwb#KD7LmdJphLk2I1XKJ29grEsaWgkXcFYvLQCd0SyadBg", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa9", title: "The Right Stuff", author: "Tom Wolfe", downloadUrl: "https://mega.nz/file/qghhyT4C#hs5IdY0Yl-NsXFPnfJjg4U0EJOVJ5tHnM-GWGicJN3Y", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
    { id: "sa10", title: "Welcome to the Universe", author: "Neil deGrasse Tyson, Michael A. Strauss, J. Richard Gott", downloadUrl: "https://mega.nz/file/P8YEnTDK#mzz2U0mO5QeilV6cshyIabjNCCIfcYsWW_5dJ8J68Wk", category: "Space & Astronomy", description: "", coverImage: {url: "", hint: ""} },
];

export const selfDevelopmentPdfs: Pdf[] = [
    { id: "sd1", title: "The Alchemist", author: "Paulo Coelho", downloadUrl: "https://mega.nz/file/3842xABY#qilU_uHcVxQpf84r3cAi2pXAzRRABV3hlW_Lt8pOar4", category: "Self Development", description: "", coverImage: {url: "", hint: ""} },
    { id: "sd2", title: "Grit: The Power of Passion and Perseverance", author: "Angela Duckworth", downloadUrl: "https://mega.nz/file/OgRVyaQS#v_cZNe2qQn6-cXYhKwYN89usRjVu6V2pfD2UPdzRoKs", category: "Self Development", description: "", coverImage: {url: "", hint: ""} },
    { id: "sd3", title: "Awareness: The Perils and Opportunities of Reality", author: "Anthony de Mello", downloadUrl: "https://mega.nz/file/ihph0JDb#IyTY958WuXLm4ac6YfsjHmvRlk1iH9J1ppzC4P-oY14", category: "Self Development", description: "", coverImage: {url: "", hint: ""} },
    { id: "sd4", title: "Atomic Habits", author: "James Clear", downloadUrl: "https://mega.nz/file/Hs4XUapT#YON7PfyPaP3QtwKcHt2qz2njldJtpdBCMf7HLyKXWPI", category: "Self Development", description: "", coverImage: {url: "", hint: ""} },
    { id: "sd5", title: "Awaken the Giant Within", author: "Anthony Robbins", downloadUrl: "https://mega.nz/file/vkgQkIwC#P8A0fGEBj8E_dnD7AFII4gCYli874tW7DUjcsrjoP4E", category: "Self Development", description: "", coverImage: {url: "", hint: ""} },
];

export const psychologyPdfs: Pdf[] = [
    { id: "psy1", title: "Attachment in Psychotherapy (or Attached)", author: "Amir Levine & Rachel Heller", downloadUrl: "https://mega.nz/file/PxhmiIIa#2Ps-_FSgnFXM_hCHUiOGWrgiwF2MyQzLCVdqbx5FtcA", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
    { id: "psy2", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", downloadUrl: "https://mega.nz/file/a95DGLLJ#AW3VvVJAprXhPobQp34JiX2E1Rfvg-dz6p548JS9sDY", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
    { id: "psy3", title: "Flow: The Psychology of Optimal Experience", author: "Mihaly Csikszentmihalyi", downloadUrl: "https://mega.nz/file/Xk4zXBSZ#fVZp-zBKTrirt0Q9rj3Lur8fV9kj3CcpqBPX2LbtufM", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
    { id: "psy4", title: "Man's Search for Meaning", author: "Viktor E. Frankl", downloadUrl: "https://mega.nz/file/WsZ3hSJQ#TxGkWVaM6MCJNK2JLqZ8_uux-3oezIlfPAscGYUb4QE", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
    { id: "psy5", title: "Predictably Irrational", author: "Dan Ariely", downloadUrl: "https://mega.nz/file/fwwHkbAY#iFISi6iRlIFLa7kNJ6bAC9g7qcfVPykm8C9cVXb6PLM", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
    { id: "psy6", title: "Quiet: The Power of Introverts in a World That Can't Stop Talking", author: "Susan Cain", downloadUrl: "https://mega.nz/file/r4Q00ITA#_9TSRmkCjx6D9tAg3dDMZ2ynI_ScmBc58XeWICMi2ZE", category: "Psychology", description: "", coverImage: {url: "", hint: ""} },
];

export const christianPdfs: Pdf[] = [
    { id: "b1", title: "100 Ways to Motivate Others", author: "N/A", downloadUrl: "https://mega.nz/file/LgRCwBAI#ieI9C-w8MlTDEW9fDkN6WxdQ1LmPCk6NtDUGwJIVP10", category: "Bible", description: "", coverImage: {url: "", hint: ""} },
    { id: "b2", title: "1928 Book of Common Prayer", author: "N/A", downloadUrl: "https://mega.nz/file/71g0lQoD#1AjB-9YrA24LyIxsVJwsK2wmuQRsBNs_PU4y7ez275s", category: "Bible", description: "", coverImage: {url: "", hint: ""} },
    { id: "b3", title: "A Brief Bible History", author: "N/A", downloadUrl: "https://mega.nz/file/3thnFbQS#Ul2JwQBSN8B4Njl7qXUbk8wfw9SXSzds5Ozsfi9BOkM", category: "Bible", description: "", coverImage: {url: "", hint: ""} },
    { id: "b4", title: "A Christian in a Non Christian World", author: "N/A", downloadUrl: "https://mega.nz/file/qwwTxSBR#pJGiGMKqg3fHBixBGVej1hsY8YJMhtTFKg5JwgYOUwI", category: "Bible", description: "", coverImage: {url: "", hint: ""} },
    { id: "b5", title: "A Complete Guide to Web Design", author: "N/A", downloadUrl: "https://mega.nz/file/3pRgzaST#B1UgNl91QUPP_IA11KGGMO115b1wJm9Bi5Y4C2aG_ZA", category: "Bible", description: "", coverImage: {url: "", hint: ""} },
];

export const fantasyPdfs: Pdf[] = [
    { id: "fan1", title: "American Gods Illustrated", author: "Neil Gaiman and Dave McKean", downloadUrl: "https://mega.nz/file/agRj0AYR#FeacbqkmfZc4_RemGLNYY7Qxe8zjwUDqOl0k-k_xJ0M", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
    { id: "fan2", title: "Eragons Guide to Alagaesia", author: "Christopher Paolini", downloadUrl: "https://mega.nz/file/n9IAQIKA#ORq6bTzzhBrxNnFJGL6i9jz6oeMGKXJWlJbt7eQwagw", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
    { id: "fan3", title: "Game of Thrones Graphic 1.1-6", author: "George R R Martin", downloadUrl: "https://mega.nz/file/bpAiyR6Y#AzH2FINJ6ZFf6fZPhY-3pq6aCr4uaq2trf-2EndpLFk", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
    { id: "fan4", title: "Good Omens", author: "Terry Pratchett and Neil Gaiman", downloadUrl: "https://mega.nz/file/XxgmER5J#quIbiyHczjVJsXwS03lDn-knipdA9Qr4gX17gVoAT68", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
    { id: "fan5", title: "Gunslinger", author: "Stephen King", downloadUrl: "https://mega.nz/file/u0J0xYoY#5GHv_cFPAF9abVvAxrSWVg2tn5ylgqRoUqSmYI4dd3A", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
    { id: "fan6", title: "Harry Potter Philosophers Stone", author: "JK Rowling", downloadUrl: "https://mega.nz/file/zkoBTRRC#-Uf8blnQTKCAG2poB6HNwkCPzDJ6KSFFOWTm4odVZ4M", category: "Fantasy", description: "", coverImage: {url: "", hint: ""} },
];

export const geographyPdfs: Pdf[] = [
    { id: "geo1", title: "Certificate Physical And Human Geography", author: "GC Leong", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo2", title: "Oxford School Spelling punctuation and grammar dictionary", author: "Oxford University Press", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo3", title: "Physical geography", author: "Savindra singh", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo4", title: "Class 11 Fundamentals of Physical Geography", author: "N/A", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo5", title: "Climatology and Meteorology", author: "N/A", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo6", title: "Fundamentals of Geomorphology", author: "Routledge", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo7", title: "Human geography", author: "N/A", downloadUrl: "#", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
];

export const historyPdfs: Pdf[] = [];

export const ncertPdfs: Pdf[] = [];
