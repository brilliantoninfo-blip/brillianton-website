import { site } from "@/lib/site";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo-blue.png`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-97781-17553",
      contactType: "Admissions and enquiries",
      email: site.email,
      availableLanguage: ["English", "Malayalam"],
    },
    sameAs: [site.instagram],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />;
}
