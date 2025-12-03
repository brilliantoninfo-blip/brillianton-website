export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Brillianton Global Education',
    url: 'https://brilliantonedu.com',
    logo: 'https://brilliantonedu.com/logo.png',
    description: 'Global mentoring platform connecting students with international opportunities and expert mentors worldwide.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Malappuram',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-97781-17553',
      contactType: 'Customer Service',
      email: 'brilliantoninfo@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.instagram.com/brilliantonglobal?igsh=OWZ1ZzM5NmNqZ2h3',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brillianton Global Education',
    url: 'https://brilliantonedu.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://brilliantonedu.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
