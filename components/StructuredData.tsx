import { programmes, site } from "@/lib/site";

/**
 * Site-wide structured data so search engines recognise the brand:
 * the organisation (with its exact name, alternate names, address and profiles),
 * the website itself, and the two flagship programmes as courses.
 */
export default function StructuredData() {
  const orgId = `${site.url}/#organization`;
  const graph = [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": orgId,
      name: site.name,
      alternateName: ["Brillianton", "Brillianton Global", "Brillianton Education"],
      url: site.url,
      logo: `${site.url}/icons/icon-512.png`,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      slogan: "Global vision. Personal guidance.",
      email: site.email,
      telephone: "+91-97781-17553",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: "Kozhikode (Calicut)",
        addressRegion: site.address.region,
        addressCountry: "IN",
      },
      areaServed: [{ "@type": "State", name: "Kerala" }, { "@type": "Country", name: "India" }],
      knowsAbout: [
        "Admission to top global universities",
        "Oxford and Cambridge admissions",
        "Ivy League admissions",
        "QS Top 100 universities",
        "Fulbright Fellowship",
        "Chevening Scholarship",
        "DAAD Scholarship",
        "Erasmus Mundus",
        "Commonwealth Scholarship",
        "Statement of Purpose guidance",
        "Academic mentorship",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-97781-17553",
        email: site.email,
        contactType: "admissions",
        availableLanguage: ["English", "Malayalam"],
      },
      sameAs: [site.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: "Brillianton",
      publisher: { "@id": orgId },
      inLanguage: "en-IN",
    },
    ...programmes.map((p) => ({
      "@type": "Course",
      "@id": `${site.url}/programmes#${p.slug}`,
      name: p.name,
      description: p.summary,
      url: `${site.url}/programmes#${p.slug}`,
      provider: { "@id": orgId },
      educationalLevel: p.audience,
      teaches: p.focus.map((f) => f.title),
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Blended" },
    })),
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
