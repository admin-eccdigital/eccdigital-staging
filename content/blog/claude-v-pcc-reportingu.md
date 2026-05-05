---
title: "Jak používáme Claude v každodenním PPC reportingu"
slug: "claude-v-pcc-reportingu"
date: "2026-04-28"
category: "AI"
image: "/images/blog/claude-ppc-reporting.webp"
excerpt: "Konkrétní use-case: od přípravy zadání pro klienta po automatickou analýzu výkonu kampaní napříč platformami."
readingMinutes: 6
draft: false
author:
  name: "Petr Štěpán"
  title: "Vedoucí výkonnostních kampaní a analytiky"
---

PPC reporting býval jednou z nejméně oblíbených částí naší práce. Nikoli proto, že bychom si nestáli za výsledky kampaní — naopak, často to byla přesně ta část měsíce, kdy jsme měli klientům co ukázat. Problém byl jinde: než jsme dali dohromady čísla z Meta Ads, Google Ads, Skliku a Heureky, sjednotili pohled, doplnili komentář a zarámovali to do srozumitelného příběhu, padl na to vždy celý jeden pracovní den. A někdy dva.

Posledního půl roku to vypadá jinak. Velkou část té rutiny dnes obstarává Claude — používáme ho jako analytického parťáka, který umí zpracovat exporty, najít v datech anomálie a sepsat první verzi shrnutí, kterou pak my jen doladíme. Ne všechno, co LLM napíše, dává smysl pustit ven. Ale přesně proto je důležité mít dobře nastavený proces.

V tomhle článku popisujeme, jak konkrétně náš měsíční reporting probíhá, co Claudeovi posíláme, co naopak musí zůstat na člověku a kde jsme udělali chyby, které stojí za to neopakovat.

## Co Claude reálně dělá a co ne

Hned na začátku je dobré zbavit se romantické představy, že AI „udělá report za vás". Neudělá. Co ale Claude dělá výborně, je práce s velkými objemy strukturovaných dat a jejich převod do srozumitelného textu. Když mu dáme CSV exporty z jednotlivých platforem za dva srovnatelné měsíce, do několika sekund identifikuje největší meziměsíční rozdíly a navrhne tři až čtyři hypotézy, proč k nim mohlo dojít.

Druhá silná oblast je rutinní psaní. Komentáře typu „v dubnu jsme navýšili rozpočet o 18 % a CPA kleslo o 7 % díky přesunu do Performance Max" píšeme každý měsíc dvacetkrát s drobnými variacemi. Claude je v tom rychlejší a paradoxně i konzistentnější než my.

Co naopak nedělá — a co by ani neměl — je tvorba doporučení pro klienta. Strategická rozhodnutí stojí na kontextu, který v exportu nikdy nebude: aktuální dostupnost zboží, plánovaná offline kampaň, nálada v týmu klienta, sezóna. To zůstává stoprocentně na nás.

## Pracovní postup krok za krokem

Náš měsíční reporting má dnes čtyři kroky. Vypadá jednoduše, ale dospěli jsme k němu po několika nezdařených pokusech, kdy jsme buď AI důvěřovali příliš, nebo naopak málo.

- **Sběr dat** — exportujeme stejnou sadu metrik ze všech platforem ve standardizovaném formátu. Bez tohohle kroku to nemá cenu zkoušet.
- **Strukturovaný prompt** — Claude dostává jasné zadání: jaký klient, jaký měsíc, jaké KPI sledujeme, co je business kontext. Na konci je instrukce „neuhýbej, pokud něco nedává smysl".
- **Lidská revize** — kolega projde výstup a zaměří se hlavně na čísla a doporučení. AI občas přehodí desetinnou čárku.
- **Finalizace** — komentáře dostanou náš tón, klientský kontext a finální podobu reportu.

> **Poznámka z praxe:** Největší přínos jsme získali ve chvíli, kdy jsme přestali Claudea používat jako pisálka a začali ho brát jako druhý pár očí nad daty. Hypotézy, které vyplivne, často vedou k otázkám, které bychom si jinak nepoložili.

## Co se nám osvědčilo a co ne

Osvědčilo se nám držet jednu šablonu promptu pro všechny klienty a měnit jen kontextovou část. Konzistence výstupu je díky tomu vysoká a kolega, který report přebírá, ví, co kde hledat.

Naopak se nám neosvědčilo nechávat Claudea generovat přímo grafy a vizualizace. Tabulky a grafy si nadále stavíme sami v Looker Studiu, protože tam máme plnou kontrolu nad tím, jak se data zobrazí. AI je v tomhle směru mnohem méně spolehlivá než dobře navržený dashboard.

Pokud zvažujete, jestli LLM zapojit do svého reportingového procesu, doporučujeme začít od malého — zkuste si na jednom klientovi za jeden měsíc projít celý cyklus a porovnat, kolik času jste reálně ušetřili. U nás to vyšlo na čtyři až šest hodin měsíčně na klienta. Při portfoliu přes dvacet účtů je to rozdíl, který je vidět.
