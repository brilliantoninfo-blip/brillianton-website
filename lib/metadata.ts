import { Metadata } from 'next';

export const siteConfig = {
  name: 'Brillianton Global Education',
  description: 'Global mentoring platform connecting students with international opportunities, student exchange programs, and expert mentors worldwide.',
  url: 'https://brilliantonedu.com',
  ogImage: 'https://brilliantonedu.com/og-image.jpg',
  links: {
    instagram: 'https://www.instagram.com/brilliantonglobal?igsh=OWZ1ZzM5NmNqZ2h3',
  },
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: keywords?.join(', '),
    authors: [{ name: 'Brillianton Global Education' }],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}
