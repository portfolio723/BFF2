import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.booksforfoster.org/'; // Replace with your actual domain

  const staticPages = [
    '/',
    '/about',
    '/auth',
    '/cart',
    '/checkout',
    '/community',
    '/donate',
    '/faq',
    '/privacy',
    '/profile',
    '/terms',
    '/wishlist',
    '/pdfs',
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: url === '/' ? 1 : 0.8,
  }));

  const genrePages = [
    '/genre/adventure',
    '/genre/anthropology',
    '/genre/bible',
    '/genre/biography-autobiography',
    '/genre/business-management',
    '/genre/competitve-exams',
    '/genre/computer-science',
    '/genre/crime-mystery',
    '/genre/cultural',
    '/genre/economics',
    '/genre/engineering',
    '/genre/environment',
    '/genre/fantasy',
    '/genre/fashion',
    '/genre/food-and-cooking',
    '/genre/geography',
    '/genre/health-lifestyle',
    '/genre/history',
    '/genre/horror-thriller',
    '/genre/law',
    '/genre/medical',
    '/genre/ncert',
    '/genre/ncert/class-11',
    '/genre/ncert/class-12',
    '/genre/poetry',
    '/genre/psychology',
    '/genre/self-development',
    '/genre/space-and-astronomy',
    '/genre/sports',
    '/genre/upsc',
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...genrePages];
}
