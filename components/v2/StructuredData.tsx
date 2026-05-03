// Server component (no "use client") so JSON-LD lands directly in the
// pre-rendered HTML — no JS needed for crawlers to read it.
//
// Schema.org graph for the homepage:
//   - ProfessionalService (the agency itself, with contact + services)
//   - WebSite (canonical site identity for sitelink search box etc.)
//   - Person (Petr Štěpán, the named contact / org employee)
//   - ItemList of references (each as CreativeWork client work)
// Production lives at https://eccdigital.cz; staging on GitHub Pages
// references the same production URLs so structured data stays valid
// once content moves to prod.

const SITE_URL = "https://eccdigital.cz"
const LOGO = `${SITE_URL}/images/ecc-digital-logo.png`

const SERVICES = [
  {
    name: "Výkonnostní kampaně (PPC)",
    description:
      "Správa reklamy na Meta Ads, Google Ads, Sklik, TikTok Ads, LinkedIn Ads, Microsoft Ads a srovnávačích Heureka / Zboží.cz.",
  },
  {
    name: "Tvorba webů a e-shopů",
    description:
      "Návrh a vývoj firemních webů a e-shopů na WordPress, WooCommerce, Shoptetu a Next.js — včetně vícejazyčných řešení.",
  },
  {
    name: "Digitální strategie",
    description: "Audity, plány a roadmapy digitálního růstu postavené na datech.",
  },
  {
    name: "Analytika a měření",
    description: "Implementace GA4, GTM, server-side trackingu a reportingu v Looker Studiu.",
  },
  {
    name: "Školení týmů",
    description:
      "Praktická školení pro marketéry — výkonnostní reklama, analytika a využití AI v každodenní práci.",
  },
  {
    name: "Konzultace",
    description:
      "Hodinové i dlouhodobé konzultace pro majitele a marketingové ředitele.",
  },
]

const REFERENCES: { name: string; url: string; description: string }[] = [
  {
    name: "Klimahome",
    url: "https://klimahome.cz",
    description:
      "Web, výkonnostní kampaně a strategie pro instalátora tepelných čerpadel.",
  },
  {
    name: "Escoflooring",
    url: "https://escoflooring.com",
    description:
      "Trojjazyčný web ve spolupráci s nizozemským studiem pro mezinárodní brand Decospan.",
  },
  {
    name: "Marksys",
    url: "https://marksys.cz",
    description:
      "Web a online marketing pro největšího EU distributora Telesis značicích technologií.",
  },
  {
    name: "Florea.cz",
    url: "https://florea.cz",
    description: "PPC kampaně a řízení online marketingu pro český e-shop.",
  },
  {
    name: "Profikas.cz",
    url: "https://profikas.cz",
    description:
      "Cesta od tvorby webu k celostátním zakázkám — kompletní digitální růst.",
  },
  {
    name: "Falkensteiner — Dovolená Zadar",
    url: "https://dovolena-zadar.cz",
    description:
      "Landing page pro mezinárodní hotelový řetězec, realizovaná s chorvatskou partnerskou agenturou S.T.A.R. Digital.",
  },
]

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1) The agency — ProfessionalService is more specific than Organization
      // and signals to Google this is a B2B service business.
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: "ECC Digital",
        alternateName: "Educate · Create · Care Digital",
        description:
          "Česká digitální agentura. Strategický partner pro výkonnostní kampaně, tvorbu webů, analytiku a školení.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: LOGO,
          contentUrl: LOGO,
        },
        image: LOGO,
        foundingDate: "2015",
        slogan: "Pomáháme firmám v digitálním růstu",
        areaServed: [
          { "@type": "Country", name: "Česká republika" },
          { "@type": "Country", name: "Slovensko" },
        ],
        availableLanguage: ["cs", "en"],
        knowsAbout: [
          "PPC reklama",
          "Meta Ads",
          "Google Ads",
          "Sklik",
          "Heureka",
          "Zboží.cz",
          "TikTok Ads",
          "LinkedIn Ads",
          "Tvorba webů",
          "E-shop",
          "WordPress",
          "WooCommerce",
          "Shoptet",
          "Next.js",
          "GA4",
          "Google Tag Manager",
          "Server-side tracking",
          "Looker Studio",
          "Digitální strategie",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+420 724 443 968",
          email: "admin@eccdigital.cz",
          contactType: "sales",
          availableLanguage: ["cs", "en"],
          areaServed: ["CZ", "SK"],
        },
        email: "admin@eccdigital.cz",
        telephone: "+420 724 443 968",
        sameAs: [
          // Add real profile URLs once known:
          // "https://www.linkedin.com/company/ecc-digital",
          // "https://www.facebook.com/ECCDigital",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Služby ECC Digital",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          })),
        },
        employee: {
          "@id": `${SITE_URL}/#person-petr-stepan`,
        },
      },

      // 2) Site identity
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ECC Digital",
        inLanguage: "cs-CZ",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },

      // 3) Webpage (homepage)
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "ECC Digital — Strategický partner pro digitální projekty",
        description:
          "Česká digitální agentura. Správa Meta, Google Ads, Sklik, srovnávačů. Tvorba webů a e-shopů.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "cs-CZ",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: LOGO,
        },
      },

      // 4) Named contact person
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person-petr-stepan`,
        name: "Petr Štěpán",
        honorificPrefix: "Ing.",
        givenName: "Petr",
        familyName: "Štěpán",
        jobTitle: "Vedoucí výkonnostních kampaní a analytiky",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        telephone: "+420 724 443 968",
        email: "admin@eccdigital.cz",
        image: `${SITE_URL}/images/team/petr-stepan-circle.webp`,
        knowsAbout: [
          "PPC reklama",
          "Google Ads",
          "Meta Ads",
          "Sklik",
          "GA4",
          "Server-side tracking",
          "Projektové řízení",
        ],
      },

      // 5) References — ItemList of CreativeWork (client projects)
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#references`,
        name: "Vybrané reference",
        itemListElement: REFERENCES.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: r.name,
            url: r.url,
            description: r.description,
            creator: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
