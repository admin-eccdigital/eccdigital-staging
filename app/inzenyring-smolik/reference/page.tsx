"use client"

import { PageShell, T, SectionLabel, useFadeUp, BASE } from "../_components/shared"

type Project = {
  title: string
  photos: { src: string; note?: string }[]
}

const projekty: Project[] = [
  {
    title: "Stará varna Pilsner Urquell",
    photos: [
      { src: "stara-varna-01.jpg" },
      { src: "stara-varna-02.jpg" },
      { src: "stara-varna-03.jpg" },
      { src: "stara-varna-04.jpg" },
      { src: "stara-varna-05.jpg" },
    ],
  },
  {
    title: "Bytový dům — Šeříkova ulice, Plzeň",
    photos: [
      { src: "serikova-01.jpg" },
      { src: "serikova-02.jpg" },
      { src: "serikova-03.jpg" },
      { src: "serikova-04.jpg" },
      { src: "serikova-05.jpg" },
    ],
  },
  {
    title: "Fasáda U tržiště, Plzeň",
    photos: [
      { src: "fasada-u-trziste-pred-01.jpg", note: "Před rekonstrukcí" },
      { src: "fasada-u-trziste-01.jpg" },
      { src: "fasada-u-trziste-02.jpg" },
    ],
  },
  {
    title: "Pilsner Urquell — Kroftovy domy",
    photos: [
      { src: "kroftovy-domy-01.jpg" },
      { src: "kroftovy-domy-02.jpg" },
    ],
  },
  {
    title: "Rodinný dům, Starý Plzenec",
    photos: [
      { src: "rodinny-dum-stary-plzenec-01.jpg" },
      { src: "rodinny-dum-stary-plzenec-02.jpg" },
      { src: "rodinny-dum-stary-plzenec-03.jpg" },
    ],
  },
]

const realizace: Project[] = [
  {
    title: "Hotel U Zvonu, Plzeň",
    photos: [
      { src: "hotel-u-zvonu-01.jpg", note: "Exteriér" },
      { src: "hotel-u-zvonu-02.jpg", note: "Koupelna" },
      { src: "hotel-u-zvonu-03.jpg", note: "Lobby" },
      { src: "hotel-u-zvonu-04.jpg", note: "Bar" },
      { src: "hotel-u-zvonu-05.jpg", note: "Recepce" },
      { src: "hotel-u-zvonu-06.jpg", note: "Pokoj" },
      { src: "hotel-u-zvonu-07.jpg", note: "Lobby shora" },
      { src: "hotel-u-zvonu-08.jpg", note: "Pokoj" },
    ],
  },
  {
    title: "Pivovarské muzeum — rekonstrukce, Plzeň",
    photos: [
      { src: "pivovarske-muzeum-01.jpg", note: "Exteriér" },
      { src: "pivovarske-muzeum-02.jpg", note: "Na Parkánu" },
      { src: "pivovarske-muzeum-03.jpg", note: "Šenk" },
      { src: "pivovarske-muzeum-04.jpg", note: "Interiér" },
      { src: "pivovarske-muzeum-05.jpg", note: "Expozice" },
      { src: "pivovarske-muzeum-06.jpg", note: "Bar" },
      { src: "pivovarske-muzeum-07.jpg", note: "Restaurace" },
      { src: "pivovarske-muzeum-08.jpg", note: "Historická místnost" },
      { src: "pivovarske-muzeum-09.jpg", note: "Chodba" },
    ],
  },
  {
    title: "Supermarket Lidl, Plzeň",
    photos: [
      { src: "lidl-plzen-01.jpg" },
      { src: "lidl-plzen-02.jpg" },
      { src: "lidl-plzen-03.jpg" },
      { src: "lidl-plzen-04.jpg" },
    ],
  },
  {
    title: "Archiv Knihovny / SVK, Plzeň",
    photos: [
      { src: "archiv-knihovny-01.jpg", note: "Exteriér" },
      { src: "archiv-knihovny-02.jpg", note: "Archiv" },
    ],
  },
  {
    title: "Bytový dům — rekonstrukce, Rokycany",
    photos: [
      { src: "bytovy-dum-rokycany-01.jpg", note: "Exteriér" },
      { src: "bytovy-dum-rokycany-02.jpg", note: "Schodiště" },
    ],
  },
  {
    title: "TJ Orel — novostavba, Plzeň",
    photos: [{ src: "tj-orel-01.jpg" }],
  },
  {
    title: "Bytový dům Šeříkova — interiér",
    photos: [{ src: "serikova-interier-01.jpg" }],
  },
  {
    title: "Kuchyně — interiér",
    photos: [{ src: "kuchyne-01.jpg" }],
  },
]

const dalsiReference = [
  "Centrální sklad ODC v Plzni",
  "Domov důchodců v Plzni",
  "2. zimní stadion v Plzni",
  "Nástavba budov 22. ZŠ v Plzni",
  "Finanční úřad v Klatovech",
  "Bytový komplex Švabinské terasy v Plzni",
  "Muzeum loutek v Plzni",
]

function ProjectGroup({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <div
      data-fade
      style={{
        padding: "40px 0",
        borderTop: index === 0 ? "none" : `1px solid ${T.bone}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 12,
            color: T.fog,
            letterSpacing: "0.08em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          style={{
            fontFamily: T.display,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "-0.015em",
            margin: 0,
            color: T.ink,
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            color: T.fog,
          }}
        >
          {project.photos.length} {project.photos.length === 1 ? "foto" : project.photos.length < 5 ? "fotky" : "fotek"}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            project.photos.length === 1
              ? "1fr"
              : project.photos.length === 2
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
          gap: 12,
        }}
        className="smolik-ref-photo-grid"
      >
        {project.photos.map((photo) => (
          <div key={photo.src}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                background: T.bone,
                backgroundImage: `url(${BASE}/foto/${photo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                overflow: "hidden",
              }}
            >
              {photo.note && (
                <span
                  style={{
                    position: "absolute",
                    left: 8,
                    bottom: 6,
                    fontFamily: T.mono,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  }}
                >
                  {photo.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ReferencePage() {
  const refP = useFadeUp()
  const refR = useFadeUp()

  return (
    <PageShell>
      {/* Page hero */}
      <section
        style={{
          padding: "64px 56px 48px",
          maxWidth: 1440,
          margin: "0 auto",
          borderBottom: `1px solid ${T.bone}`,
          position: "relative",
          overflow: "hidden",
        }}
        className="smolik-section-pad"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${T.steel}0d 1px, transparent 1px), linear-gradient(90deg, ${T.steel}0d 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <SectionLabel label="REFERENCE" />
          <h1
            style={{
              fontFamily: T.display,
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: "16px 0 0",
              color: T.ink,
            }}
            className="smolik-h1"
          >
            Realizované
            <br />
            zakázky<span style={{ color: T.steel }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: T.body,
              fontSize: 16,
              lineHeight: 1.6,
              color: T.slate,
              marginTop: 20,
              maxWidth: 560,
            }}
          >
            Nejdůležitější realizované zakázky s přímým podílem hlavního vedení
            staveb. Kvalitní reference jsou důkazem profesionálního přístupu.
          </p>
        </div>
      </section>

      {/* Projekční činnost */}
      <section
        ref={refP}
        style={{
          padding: "56px 56px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
        className="smolik-section-pad"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 48,
          }}
          className="smolik-sidebar-grid"
        >
          <div>
            <SectionLabel label="—01 PROJEKTY" />
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                color: T.fog,
                marginTop: 8,
              }}
            >
              Projekční činnost
            </div>
          </div>
          <div>
            {projekty.map((p, i) => (
              <ProjectGroup key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Realizace */}
      <section
        ref={refR}
        style={{
          padding: "56px 56px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: `1px solid ${T.bone}`,
        }}
        className="smolik-section-pad"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 48,
          }}
          className="smolik-sidebar-grid"
        >
          <div>
            <SectionLabel label="—02 REALIZACE" />
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                color: T.fog,
                marginTop: 8,
              }}
            >
              Stavební dozor a vedení
            </div>
          </div>
          <div>
            {realizace.map((p, i) => (
              <ProjectGroup key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Další reference (bez fotek) */}
      <section
        style={{
          padding: "56px 56px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: `1px solid ${T.bone}`,
          background: T.bone,
        }}
        className="smolik-section-pad"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 48,
          }}
          className="smolik-sidebar-grid"
        >
          <SectionLabel label="—03 DALŠÍ ZAKÁZKY" />
          <div>
            <p
              style={{
                fontFamily: T.body,
                fontSize: 14,
                color: T.slate,
                margin: "0 0 24px",
              }}
            >
              Další realizované zakázky s přímým podílem na vedení staveb:
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {dalsiReference.map((r, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "10px 0",
                    borderTop: `1px solid rgba(0,0,0,0.08)`,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: T.ink,
                    fontFamily: T.body,
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 11,
                      color: T.fog,
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
