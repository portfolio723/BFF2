
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
    { id: "geo1", title: "Certificate Physical And Human Geography", author: "GC Leong", downloadUrl: "https://mega.nz/file/bxZlCACJ#ZuP2egHe0CFLEWVn9ur1Nd0DyCHpMh6e1cOuQXpzgTo", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo2", title: "Oxford School Spelling punctuation and grammar dictionary", author: "Oxford University Press", downloadUrl: "https://mega.nz/file/LxI3TIqI#iAf906vrj3zHa5G9tKJ-GPG_WUW_dJXpqk-_oS3IPLU", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo3", title: "Physical geography", author: "Savindra singh", downloadUrl: "https://mega.nz/file/f5Yizbpa#RnhtP6b2ir-WB7skznjdksrN7dFRpWFr7DqiGvItH0c", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo4", title: "Class 11 Fundamentals of Physical Geography", author: "N/A", downloadUrl: "https://mega.nz/file/igoFlZRJ#KntsLZ2CIBm5dZKOtx_jyCijOv3AZ_VF0fBVrAsnSxI", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo5", title: "Climatology and Meteorology", author: "N/A", downloadUrl: "https://mega.nz/file/ysghkJCZ#uidy5fYcgjvjLLkaXjOtLJ0bCME3uZ8rjorF2wF8ElM", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo6", title: "Fundamentals of Geomorphology", author: "Routledge", downloadUrl: "https://mega.nz/file/CgZDTZiC#gKdhQreeYTCbJ1C9d4lv1a0BfWGfcgtJoSta8FE88fQ", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
    { id: "geo7", title: "Human geography", author: "N/A", downloadUrl: "https://mega.nz/file/b9gAGIpY#-LIPBJ3qDHB7aY5EgMyC7ZUeXFNcXsE6pYlkVJH_JZI", category: "Geography", description: "", coverImage: {url: "", hint: ""} },
];

export const historyPdfs: Pdf[] = [
    { id: "hist1", title: "A Comprehensive Outline of World History", author: "N/A", downloadUrl: "https://mega.nz/file/ihoCCBIb#MQSfXaDq0HGBXiYvTXh0AHpdlRIwHzVfXjVj1krDvQk", category: "History", description: "", coverImage: {url: "", hint: ""} },
    { id: "hist2", title: "A first book in American History", author: "N/A", downloadUrl: "https://mega.nz/file/exBXUKzb#AKQouQ7_cKDIZF4zSUCVbXGp9-ykSWhxCe3aHBxlLzE", category: "History", description: "", coverImage: {url: "", hint: ""} },
    { id: "hist3", title: "Ancient history and rome", author: "N/A", downloadUrl: "https://mega.nz/file/qtoDVCwT#gxrYXrVPAcLhG6YT4YJr3ai8UyYt_4coLCkvlsteE7o", category: "History", description: "", coverImage: {url: "", hint: ""} },
    { id: "hist4", title: "Great Events by Famous Historians", author: "N/A", downloadUrl: "https://mega.nz/file/y8gkCZKb#59-yr3QwDB-QZX5ngjYHRPdaLaOPfg_mVpFKCkwoJPE", category: "History", description: "", coverImage: {url: "", hint: ""} },
    { id: "hist5", title: "Heritage", author: "N/A", downloadUrl: "https://mega.nz/file/K55zHaoK#6pwwv7sQovTq76xK9OWBT8olk7nOx3183TXCzVaQltI", category: "History", description: "", coverImage: {url: "", hint: ""} },
    { id: "hist6", title: "history of nations", author: "N/A", downloadUrl: "https://mega.nz/file/b5oxyRIZ#JQKERmyIfLHpWt7fzG4cs7m4mTuhj22Yirfw-ptpsvw", category: "History", description: "", coverImage: {url: "", hint: ""} },
];

export const competitiveExamsPdfs: Pdf[] = [
  { id: "ce1", title: "Objective Computer Knowledge And Literacy", author: "Kiran", downloadUrl: "https://mega.nz/file/D4x1mQyb#5nrHcor5I2cW1k870C9zrsEefylDCv7MLYK685zbAN0", category: "Competitive Exams", description: "", coverImage: {url: "", hint: ""} },
  { id: "ce2", title: "High School English Grammar and Composition", author: "Wren & Martin", downloadUrl: "https://mega.nz/file/StxAiLjb#-7N5ewz3JcJFah8WKxM2fxlUfqbLl0ry7BF-tXsOm8s", category: "Competitive Exams", description: "", coverImage: {url: "", hint: ""} },
  { id: "ce3", title: "Word Power Made Easy", author: "Norman Lewis", downloadUrl: "https://mega.nz/file/aoIjXYwK#3oH6yhM3XovBMranmyg0kSD_Lek1VanGM6izh5L8k1U", category: "Competitive Exams", description: "", coverImage: {url: "", hint: ""} },
];

export const biographyPdfs: Pdf[] = [
    { id: "bio1", title: "Agni Ki Udan", author: "N/A", downloadUrl: "https://mega.nz/file/fpInRRRC#WMqUwv5f9t479l2iXBxV4FvIZrtPod0FNQajtV_6XHU", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
    { id: "bio2", title: "12th Fail Novel", author: "N/A", downloadUrl: "https://mega.nz/file/m8YiWKwZ#VHIlSjjwxGN9WrDvMjNFGdFjXeJCV3wmB-yQ0_lJGIw", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
    { id: "bio3", title: "A Teacher's Lot", author: "N/A", downloadUrl: "https://mega.nz/file/71ggTSpQ#65t-92zUNuoan8-r_Hz1sJyvBKZcZIuRYAIPlk7DpeE", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
    { id: "bio4", title: "Autobiography of Helen Keller", author: "N/A", downloadUrl: "https://mega.nz/file/zhownLZY#oTpRbvUSyqizOqxSTr_fHdm-_zE1dbF1pafvEmQWzeM", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
    { id: "bio5", title: "Benjamin Franklin Ki Atmakatha", author: "N/A", downloadUrl: "https://mega.nz/file/2pR1xTZT#MUWr1ys670k4biHRVdbo_3OwZMDAqhIEpkFlVYieAvg", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
    { id: "bio6", title: "Bhagat Singh Biography", author: "N/A", downloadUrl: "https://mega.nz/file/G1AzkJDY#RK8uZbDHAhhz44RMRrXlT-Mo8uiryxkTceYa62n7TiA", category: "Biography", description: "", coverImage: {url: "", hint: ""} },
];

export const anthropologyPdfs: Pdf[] = [
    { id: "anth1", title: "Archaeology and Anthropology", author: "N/A", downloadUrl: "https://mega.nz/file/2gBHSbxJ#GAD1Cta1ks7W_PgaGGypqgN9q6HLBQ_FeA3P7gW_h-E", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth2", title: "Biological Anthropology", author: "Augustin Fuentes", downloadUrl: "https://mega.nz/file/mlgyxLhS#xXqtMHb1TXm_K8tX5PAZM8i07xMkT9eOuqDPk2IsUco", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth3", title: "Yanomamo: The Fierce People", author: "Chagnon", downloadUrl: "https://mega.nz/file/nsBnFQgS#AYxKa6eQyX9AUMrTLAv9ip-4Y11nPWZNgq05jEPAWEU", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth4", title: "Coming of age in Samoa", author: "Margaret Mead", downloadUrl: "https://mega.nz/file/ah4FzYDD#Kx9FDU3A4TBeyP9qcoS0xHs8BSu9qOqXydog1Gvrwg0", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth5", title: "Debt", author: "David Graeber", downloadUrl: "https://mega.nz/file/z5ZixISA#li_0NLVSEiFnGVvVn_uepjCMkxRuXKN2AFNBdX6BSwM", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth6", title: "Evolutions Bite", author: "Peter Ungar", downloadUrl: "https://mega.nz/file/HpRHjQzL#g1z4I0QaKGK40Dfp79Du9lCrQ-bGTjUzHki84yR217A", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
    { id: "anth7", title: "Floods, Famines, And Emperors: El Nino And The Fate Of Civilizations", author: "Brian M Fagan", downloadUrl: "https://mega.nz/file/vl5DSIgZ#vpXDuBCk1TTjRvecCuEgAIMoDGLgzc6GbEnC4uncl5U", category: "Anthropology", description: "", coverImage: {url: "", hint: ""} },
];

export const ncertPdfs: Pdf[] = [];

export const ncertClass11Pdfs: Pdf[] = [
  { id: "ncert11-1", title: "Accountancy - Financial Accounting I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-2", title: "Accountancy - II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-3", title: "Biotechnology", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-4", title: "Business Studies", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-5", title: "Chemistry - Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-6", title: "Chemistry - Part II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-7", title: "Computer Science", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-8", title: "Economics - Indian Economic Development", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-9", title: "Economics - Statistics for Economics", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-10", title: "English - Hornbill", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-11", title: "English - Snapshots", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-12", title: "English - Woven Words", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-13", title: "Geography - Fundamental of Physical Geography", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-14", title: "Health and Physical Education", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-15", title: "History - Themes in World History", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-16", title: "Home Science - Human Ecology and Family Sciences Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-17", title: "Home Science - Human Ecology and Family Sciences Part II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-18", title: "Introducing Sociology", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-19", title: "Mathematics", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert11-20", title: "Physics - Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 11", description: "", coverImage: {url: "", hint: ""} },
];

export const ncertClass12Pdfs: Pdf[] = [
  { id: "ncert12-1", title: "Accountancy - Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-2", title: "Accountancy - Part II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-3", title: "Biotechnology", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-4", title: "Business Studies - Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-5", title: "Business Studies - Part II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-6", title: "Chemistry - Part I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-7", title: "Chemistry - Part II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-8", title: "Computer Science", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-9", title: "Economics - Introductory Macroeconomics", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-10", title: "Economics - Introductory Microeconomics", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-11", title: "English - Flamingo", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-12", title: "English - Kaliedoscope", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-13", title: "English - Vistas", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-14", title: "Geography - Fundamentals of Human Geography", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-15", title: "History - Themes in Indian History I", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-16", title: "History - Themes in Indian History II", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
  { id: "ncert12-17", title: "History - Themes in Indian History III", author: "NCERT", downloadUrl: "#", category: "NCERT Class 12", description: "", coverImage: {url: "", hint: ""} },
];
    
export const businessManagementPdfs: Pdf[] = [
    { id: "bm1", title: "Execution", author: "Larry Bossidy", downloadUrl: "https://mega.nz/file/LoYFUATB#GYp2UYjYwqEGTyyaca7Pd1DfuPR55E3x-_b9bcy-Ldw", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm2", title: "Good to great", author: "Jim Collins", downloadUrl: "https://mega.nz/file/vkwVVJrB#9bn627HAxxNx0MKx22PKDlPArhNx46ygLRboQvXadkg", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm3", title: "How To Win Friends And Influence People", author: "Dale Carnegie", downloadUrl: "https://mega.nz/file/PsIWCL5Q#jw9vjKxQiC0gw6YIMfLAhb4w7PfyLCpYOGeuEzjqinE", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm4", title: "Leaders Eat Last", author: "Simon Sinek", downloadUrl: "https://mega.nz/file/voBkxYgA#1b7Mg6XMv62L2KAD9GamCuNH5Ar67YCLu7PhfH5dDJQ", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm5", title: "Measure What Matters", author: "John Doerr", downloadUrl: "https://mega.nz/file/iwo3BToa#xqLo4NajPcdl-SAXZJd3W383VdEIQA0KTR0BVrDT_gU", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm6", title: "Principles for Success", author: "Ray Dalio", downloadUrl: "https://mega.nz/file/j9ZlyBDQ#ccB20L0_0KwzaHq_MeK10bQ8DUuFVyRr7KnKRxiLj1I", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
    { id: "bm7", title: "Resilience", author: "Harvard Business Review", downloadUrl: "https://mega.nz/file/35ZxDQKZ#0Uh64jiThF0HTlIwFivOJAhP1lDIXBAevvZXsZ74bh4", category: "Business Management", description: "", coverImage: {url: "", hint: ""} },
];

export const computerSciencePdfs: Pdf[] = [
  { id: "cs1", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", downloadUrl: "https://mega.nz/file/G1pwAISJ#Xhd8XQbeuZuBLJK_j5ndJUGE__aIFsK9pTWsCPL653w", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs2", title: "Bandit Algorithms", author: "Tor Lattimore", downloadUrl: "https://mega.nz/file/OsZWkL5I#uB0gIoGWti1CEzToZrJ9a39Q6y3oHfZN4NddBG2t3XQ", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs3", title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", downloadUrl: "https://mega.nz/file/n9oBkQ6Y#1oL57e4z7glMHpxjIW0UVLCQFUDc8fAKJ1tsxex4dKA", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs4", title: "Code: The Hidden Language of Computer Hardware and Software", author: "Charles Petzold", downloadUrl: "https://mega.nz/file/esQiWTID#o5z99b0ExnYKF61A6etFSEE261xN21aZNGim7ednZQ0", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs5", title: "Compilers: Principles, Techniques, and Tools", author: "Jeffrey D. Ullman", downloadUrl: "https://mega.nz/file/e84RyYgJ#r-w0jRgpoxtRZdMy_D1LXNVhxBVAyWtG5HD-_u0UYD0", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs6", title: "Computer Networking: A Top-Down Approach", author: "James Kurose", downloadUrl: "https://mega.nz/file/CoZwCJBT#JSUEKffCxs7XEqdiDJC5nN5FsGWQbTEZNjU6V-f9byk", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs7", title: "Computer Organization and Design Fundamentals", author: "David Tarnoff", downloadUrl: "https://mega.nz/file/f052Daia#EoddtwKTUeRh4izO0dkjXtyS_JP1vsBpaoIfS0qKuLg", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
  { id: "cs8", title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", downloadUrl: "https://mega.nz/file/y8IT1Y7A#qg2MIfHGHo_Ipy_vAWdfq2PdO0eC58uSyV2MJr_MbKM", category: "Computer Science", description: "", coverImage: {url: "", hint: ""} },
];
    
export const crimeMysteryPdfs: Pdf[] = [
    { id: "cm1", title: "Gone Girl", author: "Gillian Flynn", downloadUrl: "https://mega.nz/file/mkIj2AyS#4M982DBKpe0QKvepUjko2BABs0frFilYGmRyt2n5tbQ", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
    { id: "cm2", title: "I'll Be Gone in the Dark", author: "Michelle McNamara", downloadUrl: "https://mega.nz/file/CxxjAKIa#ECGAnfciWli3EzRt61ahSfx602kLdnAascCYoUakZ_Q", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
    { id: "cm3", title: "In Cold Blood", author: "Truman Capote", downloadUrl: "https://mega.nz/file/24hhzLhD#TWtX9PA82BaQR2gf8BY9VqTMZcP7hMpa8Vac3i8IrO4", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
    { id: "cm4", title: "In the Woods", author: "Tana French", downloadUrl: "https://mega.nz/file/i9BDQBKD#qNEupE7jWtcsje85Mow0DSZrgqTDrx9uRYJQj0i9s5A", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
    { id: "cm5", title: "Murder on the Orient Express", author: "Agatha Christie", downloadUrl: "https://mega.nz/file/m4ARTLoA#0sHvhwFPYNzHyQlhlKevVZ3YMKL_3Kk6k8OUkZrOifY", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
    { id: "cm6", title: "Postmortem", author: "Patricia Cornwell", downloadUrl: "https://mega.nz/file/X9IGHaiA#Z1rbt5zoDd6---GcYDGf6cTLB4-OMEysMiOJMy4u3DE", category: "Crime & Mystery", description: "", coverImage: {url: "", hint: ""} },
];
    

