import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brilliantonedu.com';
  
  const routes = [
    '',
    '/about',
    '/mentoring',
    '/international-collaboration',
    '/student-exchange',
    '/webinars',
    '/opportunities',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
