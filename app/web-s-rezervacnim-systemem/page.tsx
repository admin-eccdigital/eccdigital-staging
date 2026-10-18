import type { Metadata } from "next"
import { Nav } from "@/components/v2/Nav"
import { Footer } from "@/components/v2/Footer"
import { LeadModal } from "@/components/v2/LeadModal"
import { CookieBar } from "@/components/v2/CookieBar"
import { FloatingActions } from "@/components/v2/FloatingActions"
import { ArrowRight } from "@/components/v2/shared"

const BASE = "/eccdigital-staging"
const IMG = `${BASE}/images/reference/nexus-recovery`
const PROD = "https://eccdigital.cz"
const URL = `${PROD}/web-s-rezervacnim-systemem/`

export const metadata: Metadata = {
  title: "Web s rezervačním systémem pro salony, wellness a penziony",
  description:
    "Postavíme vám web, na kterém si zákazník sám vybere termín, zaplatí a dostane potvrzení. Napojíme rezervační systém, který už používáte, nebo vybereme nový.",
  alternates: { canonical: URL },
  // Draft na stagingu — do indexu nepatří, ostrá verze bude na eccdigital.cz
  robots: { index: false, follow: false },
}

const SEGMENTS = [
  {
    t: "Salony a kadeřnictví",
    kw: "Rezervační systém pro salony",
    d: "Zákazník si vybere službu, kadeřnici a čas. Vy nemusíte od křesla k telefonu a do kalendáře nic nepřepisujete.",
  },
  {
    t: "Wellness a privátní sauny",
    kw: "Rezervační systém pro wellness",
    d: "Rezervace na hodinové bloky, platba předem, dárkové poukazy. Když chcete, i vstup kódem bez recepce.",
  },
  {
    t: "Penziony a malé hotely",
    kw: "Rezervační systém pro penziony",
    d: "Volné pokoje a ceny přímo na vašem webu. Host rezervuje u vás, ne přes zprostředkovatele s provizí.",
  },
  {
    t: "Studia a služby na termín",
    kw: "Rezervace lekcí a termínů",
    d: "Jóga, fitness, masáže, poradenství. Kapacita lekce, permanentky a připomínky se hlídají samy.",
  },
]

const FAQ = [
  {
    q: "Musím kvůli novému webu měnit rezervační systém?",
    a: "Ne. Napojíme prakticky jakýkoli běžný rezervační systém tak, aby působil jako součást webu. Když žádný nemáte, doporučujeme Reenio, které je pro zákazníky nejpřívětivější a má nejvíc funkcí.",
  },
  {
    q: "Můžou zákazníci platit online předem?",
    a: "Ano, kartou nebo převodem podle toho, co rezervační systém nabízí. Rezervace pak platí až po zaplacení, takže odpadají neomluvené absence.",
  },
  {
    q: "Dají se přes web prodávat dárkové poukazy?",
    a: "Ano. Zákazník poukaz koupí online, dostane ho digitálně nebo v tištěné podobě a obdarovaný zadá jeho kód přímo v rezervaci.",
  },
  {
    q: "Bude rezervace fungovat na mobilu?",
    a: "Web navrhujeme nejdřív pro telefon. Rezervace a kontakt jsou na mobilu vždy po ruce, bez hledání v menu.",
  },
  {
    q: "Kolik stojí web s rezervačním systémem?",
    a: "Kompletní projekt na míru od designu po funkční rezervační systém stojí od 40 000 Kč. Poplatek za samotný rezervační systém v ceně není, platí se jeho provozovateli. Přesnou cenu připravíme po vyplnění krátkého dotazníku v nacenění webu.",
  },
  {
    q: "Jak dlouho trvá spuštění?",
    a: "Nejvíc to ovlivní podklady: fotky, ceník a podmínky. Termín vám řekneme po úvodní konzultaci, až budeme znát rozsah.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "Web s rezervačním systémem",
      serviceType: "Tvorba webu s online rezervacemi",
      description: metadata.description,
      provider: { "@id": `${PROD}/#organization` },
      areaServed: { "@type": "Country", name: "Česká republika" },
      audience: { "@type": "BusinessAudience", name: "Salony, wellness, penziony, studia a služby na termín" },
      offers: {
        "@type": "Offer",
        priceSpecification: { "@type": "PriceSpecification", minPrice: 40000, priceCurrency: "CZK" },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ECC Digital", item: `${PROD}/` },
        { "@type": "ListItem", position: 2, name: "Služby", item: `${PROD}/#sluzby` },
        { "@type": "ListItem", position: 3, name: "Web s rezervačním systémem", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function RezervacniSystemPage() {
  return (
    <>
      <Nav />
      <main className="blog-article-page">
        <article className="light light--first">
          <header className="article-hero">
            <div className="container article-hero-inner">
              <div className="article-cat">Služba</div>
              <h1 className="article-title">Web s rezervačním systémem pro salony, wellness a penziony</h1>
              <p className="lead-light rs-hero-lead">
                Zákazník si na vašem webu vybere termín, zaplatí a dostane potvrzení. Vy mezitím nezvedáte telefon
                a nepřepisujete kalendář.
              </p>
              <div className="cs-cta rs-hero-cta">
                <a href={`${PROD}/naceneni-webu/`} className="btn-primary">
                  Nacenit web <ArrowRight size={18} />
                </a>
                <a href="#" data-lead="audit" className="btn-ghost cs-btn-ghost">
                  Audit zdarma
                </a>
              </div>
            </div>
          </header>

          <div className="container">
            <div className="blog-prose">
              <h2>Pro koho web s rezervacemi stavíme</h2>
              <p>
                Pro každého, kdo prodává čas. Ať je to hodina v sauně, střih, noc v penzionu nebo lekce jógy, princip
                je stejný: zákazník chce vidět volný termín a hned si ho zabrat.
              </p>
              <div className="rs-seg">
                {SEGMENTS.map((s) => (
                  <section key={s.t} className="rs-seg-card">
                    <span className="rs-seg-kw">{s.kw}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </section>
                ))}
              </div>

              <h2>Co dostanete</h2>
              <ul>
                <li>
                  <strong>Web, který prodává.</strong> Postavený na vašich fotkách a službách, s cenou viditelnou hned.
                </li>
                <li>
                  <strong>Online rezervace.</strong> Zákazník vybírá na webu, termín a kapacitu hlídá rezervační
                  systém.
                </li>
                <li>
                  <strong>Platby předem.</strong> Kartou nebo převodem, rezervace platí až po zaplacení.
                </li>
                <li>
                  <strong>Dárkové poukazy.</strong> Prodej online, uplatnění kódem přímo v rezervaci.
                </li>
                <li>
                  <strong>Potvrzovací e-maily</strong>, které projdou každým poštovním programem.
                </li>
                <li>
                  <strong>Volitelně vstup na PIN.</strong> Pro provozy bez stálé recepce, kde si zákazník otevře sám.
                </li>
              </ul>

              <figure className="cs-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}/online-rezervace-wellness-vyber-delky.webp`}
                  alt="Web s rezervačním systémem — výběr délky rezervace a cena na webu Nexus Recovery"
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Výběr termínu na webu, který jsme postavili pro Nexus Recovery v Plzni.</figcaption>
              </figure>

              <h2>Napojíme rezervační systém, který už máte</h2>
              <p>
                Nemusíte začínat od nuly. Pokud už rezervační systém používáte, napojíme ho na nový web tak, aby
                zákazník nepoznal, kde končí jedno a začíná druhé. Když žádný nemáte, pomůžeme vybrat takový, který
                odpovídá vašemu provozu a rozpočtu.
              </p>
              <p>
                Napojit umíme prakticky jakýkoli běžný rezervační systém. Pokud vybíráte nový, doporučujeme{" "}
                <strong>Reenio</strong>: je pro zákazníky nejpřívětivější a nabízí nejvíc funkcí, od plateb předem přes
                poukazy po kapacity a připomínky.
              </p>

              <aside className="cs-tip">
                <p>
                  <strong>💡 Jak to vypadá v praxi?</strong> Privátní wellness v Plzni si u nás nechal postavit web,
                  online rezervace, poukazy i vstup kódem z e-mailu. Přečtěte si{" "}
                  <a href={`${PROD}/reference/nexus-recovery/`}>případovou studii Nexus Recovery</a>.
                </p>
              </aside>

              <h2>Jak spolupráce probíhá</h2>
              <ol>
                <li>
                  <strong>Audit nebo konzultace zdarma.</strong> Podíváme se, jak k vám dnes zákazníci chodí a kde
                  odpadají.
                </li>
                <li>
                  <strong>Návrh a nacenění.</strong> Rozsah, rezervační systém, platby a termín.
                </li>
                <li>
                  <strong>Web a napojení rezervací.</strong> Průběžně vám ukazujeme rozpracovanou verzi.
                </li>
                <li>
                  <strong>Spuštění a péče.</strong> Návod pro personál, hlídání provozu a úpravy podle toho, jak web
                  funguje.
                </li>
              </ol>

              <h2>Kolik stojí web s rezervačním systémem</h2>
              <p>
                Kompletní web s rezervačním systémem na míru stojí <strong>od 40 000 Kč</strong>. V ceně je celý projekt
                od designu po funkční napojení rezervací. Nezahrnuje poplatek za samotný rezervační systém, ten
                platíte přímo jeho provozovateli.
              </p>
              <p>
                Výslednou cenu ovlivní hlavně počet služeb, platby, poukazy a to, jestli napojujeme systém, který už
                máte.
              </p>
              <p>
                Přesnou cenu i termín vám připravíme po vyplnění krátkého dotazníku v{" "}
                <a href={`${PROD}/naceneni-webu/`}>nacenění webu</a>. Nezávazně a zdarma.
              </p>

              <div className="cs-duo cs-duo--reverse">
                <figure className="cs-shot cs-shot--phone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${IMG}/vstup-na-pin-wellness-mobil.webp`}
                    alt="Vstup na PIN kód z potvrzovacího e-mailu na mobilu"
                    width={600}
                    height={1298}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>Vstup kódem z e-mailu. Ukázka s vymyšleným PINem.</figcaption>
                </figure>
                <div className="cs-duo-text">
                  <h3>Provoz bez recepce</h3>
                  <p>
                    Pro sauny, wellness nebo studia bez stálé obsluhy umíme rezervace propojit se vstupem. Po zaplacení
                    přijde zákazníkovi e-mail s PIN kódem, který platí jen po dobu jeho rezervace.
                  </p>
                  <p>
                    Nikdo nemusí předávat klíče ani čekat u dveří. Vy máte přehled, kdo a kdy přišel, v rezervačním
                    systému.
                  </p>
                </div>
              </div>

              <h2>Časté otázky</h2>
              <div className="cs-faq">
                {FAQ.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>

              <h2>Pojďme probrat váš provoz</h2>
              <p>
                Nezávazně se podíváme na váš web a rezervace a řekneme vám, co by se dalo zjednodušit.
              </p>
              <div className="cs-cta">
                <a href="#" data-lead="audit" className="btn-primary">
                  Audit zdarma <ArrowRight size={18} />
                </a>
                <a href={`${PROD}/naceneni-webu/`} className="btn-ghost cs-btn-ghost">
                  Nacenit web
                </a>
              </div>
              <p className="cs-closing">
                Nebo rovnou zavolejte Ing. Petru Štěpánovi na <a href="tel:+420724443968">+420 724 443 968</a>, případně
                napište na <a href="mailto:admin@eccdigital.cz">admin@eccdigital.cz</a>.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <LeadModal />
      <FloatingActions />
      <CookieBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
