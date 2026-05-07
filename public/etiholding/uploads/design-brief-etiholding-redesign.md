# Design Brief: Redesign webu etiholding.cz

## 1. O projektu

**Klient:** ETI Holding a.s.
**Web:** https://www.etiholding.cz/
**Platforma:** WordPress + YooTheme Pro (verze 4.4.5)
**Aktuální šablona:** morgan-consulting:white-dove

ETI Holding je česká holdingová skupina zastřešující několik značek z různých oborů. Web slouží jako centrální rozcestník k jednotlivým značkám a prezentace holdingu jako celku.

---

## 2. Současný stav webu (co nefunguje)

### Struktura současné stránky:
1. **Header** — logo Etiholding (ikona + text), centrované
2. **Hero sekce** — 4 karty značek v mřížce 2×2 (tmavě modré boxy s názvem a kategorií):
   - Apartmány Borská — Ubytování
   - JProgress Group — Personalistika
   - AZ Factory — Stavebnictví
   - Jídelna U Koně — Gastronomie
3. **Dekorativní přechod** — geometrický síťový pattern (nodes/connections)
4. **Společné principy** — 4 hodnotové karty s ikonami (Společný cíl, Vyváženost, Růst zavazuje, Vždy připraveni)
5. **Naše Značky** — loga všech 4 značek vedle sebe s tlačítkem "Více"
6. **Spojte se s námi** — kontaktní sekce (fotka muže s telefonem + tmavě modrý box), zatím placeholdery "doplnit email?" a "doplnit telefon?"

### Hlavní problémy:
- **Barevnost** — klient je nespokojený s celkovou probarveností (tmavě modrá #373B66 + zlatá/copper #D2A477). Působí těžkopádně a levně.
- **Loga značek** — aktuálně jsou tam loga AZ Factory a JProgress, která je potřeba nahradit vlastními logy klienta
- **Kontaktní údaje** — chybí reálné kontakty, jen placeholdery
- **Celkový dojem** — web nepůsobí prémiově, chybí mu elegance a "šmrnc"
- **Geometrický background pattern** — zastaralý, působí jako generický korporátní web z roku 2018
- **Nedostatečný footer** — chybí sídlo firmy, IČO, mapa

---

## 3. Cíle redesignu

### Hlavní cíl:
Vytvořit čistý, elegantní a prémiově působící web, který bude fungovat jako reprezentativní rozcestník holdingové skupiny. Web musí působit **draze, čistě a profesionálně** — inspirace stylem webu viladomyhajecek.cz.

### Konkrétní požadavky klienta:
1. **Přidat prostor pro novou (5.) značku** — "Kancelářský dům v Plzni" (s wellness a fitness) — zatím jako placeholder/připravená pozice
2. **Kontakt:** info@etigroup.cz (email) — telefon ODSTRANIT
3. **Nahradit loga** AZ Factory a JProgress za vlastní loga klienta (budou dodána)
4. **Doplnit firemní údaje:**
   - ETI Holding a.s.
   - Sídlo: Dlouhá 715/38, Staré Město, 110 00 Praha
   - IČO: 21176451
5. **Přidat mapu** (jako na webu jprogress.cz)
6. **Zlepšit barevnost** — pryč od těžké tmavě modré, směrem k čistému a elegantnějšímu schématu
7. **Zvážit nové logo** — případný refresh loga ETI Holding

---

## 4. Inspirace a vizuální směr

### Referenční web: viladomyhajecek.cz
Co se klientovi líbí (viz přiložený screenshot `inspirace-libi-se-klientovi.png`):
- **Čistý bílý základ** s velkým množstvím whitespace
- **Velké, kvalitní fotografie** nemovitostí jako hlavní vizuální prvek
- **Minimalistická typografie** — tenké, elegantní fonty
- **Subtilní barevnost** — neutrální tóny, žádné křiklavé barvy
- **Prémiový dojem** — působí jako luxusní developerský projekt
- **Sekce s klíčovými čísly** (2 budovy, 140 m², 2 zahrady)
- **Plynulé scrollování** s prokládáním textu a vizuálů
- **Kontaktní sekce** je čistá a přehledná

### Doporučený vizuální směr pro ETI Holding:
- **Převážně bílé/světlé pozadí** — čistota a vzdušnost
- **Akcentní barva** — tlumená navy/tmavě modrá NEBO elegantní tmavě zelená/antracit jako sekundární barva (ne jako dominanta)
- **Zlatá/bronzová** pouze jako jemný accent (linka, detail) — ne jako plochy
- **Velké, kvalitní fotografie** projektů/nemovitostí místo generických ikon
- **Moderní bezpatkový font** — čistý, čitelný (Inter, Outfit, DM Sans apod.)

---

## 5. Navrhovaná struktura stránky

### 5.1 Header / Navigace
- Logo ETI Holding (případně refreshnuté) vlevo
- Jednoduchá navigace: O nás | Naše značky | Kontakt
- Sticky header s transparentním pozadím při scrollu

### 5.2 Hero sekce
- Fullwidth hero s kvalitní fotografií (nemovitost/architektura) nebo sofistikovaným vizuálem
- Velký headline: např. "Budujeme hodnoty, které rostou"
- Krátký popis holdingu (1–2 věty)
- CTA tlačítko směřující na sekci značek

### 5.3 O holdingu
- Krátký odstavec o filosofii a zaměření ETI Holding
- Možnost doplnit klíčová čísla/statistiky (počet značek, rok založení apod.)
- Čistý, vzdušný layout

### 5.4 Naše značky (hlavní rozcestník)
- Každá značka jako elegantní karta s:
  - Fotografie/vizuál značky
  - Logo značky
  - Název + krátký popis (1 věta)
  - Odkaz na web značky
- Layout: grid 3 sloupce (s možností rozšíření na 5 značek)
- **Aktuální značky:**
  1. Apartmány Borská — Ubytování
  2. JProgress Group — Personalistika
  3. AZ Factory — Stavebnictví
  4. Jídelna U Koně — Gastronomie
  5. *(Připravit pozici)* Kancelářský dům v Plzni — Wellness & Fitness (plánovaný)
- Hover efekty — jemné, elegantní (zoom fotky, overlay)

### 5.5 Společné principy / Hodnoty
- Přepracovat do modernějšího formátu
- 3–4 hodnoty s ikonami nebo minimalistickými ilustracemi
- Případně jako horizontální sekce s velkým textem

### 5.6 Kontakt + Footer
- **Email:** info@etigroup.cz (jako hlavní kontaktní prvek)
- **BEZ telefonu**
- **Firemní údaje:**
  - ETI Holding a.s.
  - Dlouhá 715/38, Staré Město, 110 00 Praha
  - IČO: 21176451
- **Mapa** — Google Maps embed se sídlem firmy (Dlouhá 715/38, Praha)
- Čistý, minimalistický footer

---

## 6. Technické poznámky

- Web běží na **WordPress + YooTheme Pro** — redesign by měl být realizovatelný v rámci YooTheme builderu
- Aktuální barvy v LESS:
  - Primary: `#D2A477` (zlatá/copper)
  - Secondary: `#373B66` (tmavě modrá)
- Zvážit změnu šablony/stylu v rámci YooTheme nebo úpravu custom LESS
- Web musí být plně **responzivní** (mobilní breakpoint aktuálně na "l")
- **WebP** podpora je zapnutá
- Cookie bar je aktivní (styl: bar, pozice: bottom)

---

## 7. Dodané podklady

| Soubor | Popis |
|--------|-------|
| `logo/logo_basic.png` | Aktuální logo ETI Holding a.s. (tmavě modrá, symbol + text) |
| `logo/animation_fadeSmooth_InvertedHex1_0d4exw5zs.gif` | Animované logo |
| `logo/animation_sync_Contrast_0d4exw5zs.gif` | Animované logo (sync varianta) |
| `logo/customcolor/` | Logo v custom barvách (varianty: full, icon, text) |
| `logo/package_print_0d4exw5z/` | Tisková verze loga |
| `inspirace-libi-se-klientovi.png` | Screenshot inspiračního webu viladomyhajecek.cz |
| `yootheme-www.etiholding.cz.json` | Exportovaná konfigurace aktuálního YooTheme |

---

## 8. Pokyny pro designéra: Sample obsah

Současný web má extrémně málo textu — prakticky jen názvy značek a pár vět o principech. **Návrh musí obsahovat realistický ukázkový obsah (sample text + sample fotografie),** aby klient viděl, jak web bude působit s plnohodnotným obsahem. Cílem je klienta motivovat k dodání vlastních textů a fotografií.

### Sample texty — co vygenerovat:

**Hero sekce:**
- Hlavní headline (claim holdingu, např. o budování hodnot, růstu, vizi)
- Podtitulek (2–3 věty představující holding jako celek)

**O holdingu:**
- 2–3 odstavce o historii, vizi a filosofii ETI Holding
- Klíčová čísla: rok založení, počet značek, počet zaměstnanců, počet projektů (vymyslet realistické placeholder hodnoty)
- Krátký odstavec o tom, co značky spojuje

**Karty značek — ke každé značce vygenerovat:**
- Krátký popis (2–3 věty) vysvětlující zaměření značky
- Podtitul/slogan
- Pro 5. značku (Kancelářský dům v Plzni s wellness a fitness) vytvořit placeholder kartu s textem typu "Připravujeme" / "Coming soon" s krátkým teaserEM

**Hodnoty/Principy:**
- Přeformulovat stávající 4 principy do modernějšího, stručnějšího jazyka
- Případně doplnit nebo nahradit relevantnějšími hodnotami

**Kontaktní sekce:**
- Krátký uvítací text k sekci kontaktu
- Výzva k akci (CTA)

### Sample fotografie — co použít:

Protože klient zatím nedodal vlastní fotografie, použít **kvalitní stock fotografie** odpovídající oboru každé značky:

| Sekce | Typ fotografie | Styl |
|-------|---------------|------|
| Hero | Moderní architektura / budova / cityscape | Vzdušné, světlé, prémiové |
| Apartmány Borská | Interiér/exteriér apartmánu, ubytování | Útulné, moderní bydlení |
| JProgress Group | Kancelářské prostředí, tým, recruitment | Profesionální, lidské |
| AZ Factory | Stavba, rekonstrukce, řemeslo | Kvalitní materiály, preciznost |
| Jídelna U Koně | Gastro, jídlo, restaurace | Autentické, apetitní |
| Kancelářský dům Plzeň | Moderní kancelářská budova, wellness | Prémiové, vizionářské |
| O holdingu | Panorama Prahy nebo business prostředí | Reprezentativní |

**Styl všech fotografií:** Světlé, vzdušné, neutrální tóny — konzistentní s celkovým prémiový dojmem webu. Žádné tmavé, přesycené nebo genericky korporátní fotky.

> **Poznámka pro klienta:** Všechny texty a fotografie v návrhu jsou ukázkové (placeholder). Finální obsah dodá klient. Cílem je ukázat, jak web bude působit s plnohodnotným obsahem.

---

## 9. Co je potřeba dodat od klienta

- [ ] Nová loga značek (náhrada za AZ Factory a JProgress)
- [ ] Kvalitní fotografie projektů/nemovitostí pro hero a karty značek
- [ ] Rozhodnutí, zda chce i refresh loga ETI Holding
- [ ] Texty/popisy k jednotlivým značkám (pokud se mají změnit)
- [ ] Potvrzení finální struktury a barevného směru
- [ ] Informace k nové značce (Kancelářský dům v Plzni) — název, popis, vizuály

---

## 10. Shrnutí priorit

1. **Barevnost a celkový vizuální dojem** — čisté, prémiové, vzdušné
2. **Struktura pro 5 značek** — flexibilní grid
3. **Kontaktní údaje a mapa** — reálné info místo placeholderů
4. **Nahrazení log** — vlastní loga místo cizích
5. **Responzivita a moderní feel** — inspirace viladomyhajecek.cz
