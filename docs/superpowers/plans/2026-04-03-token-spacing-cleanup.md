# Token Spacing & UI Konsistenz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tailwind-Config in eine gemeinsame `_tokens.js` auslagern, hartcodierte Hex-Farben durch Tokens ersetzen und Spacing vereinheitlichen — ohne das visuelle Erscheinungsbild zu verändern.

**Architecture:** Eine neue Datei `_tokens.js` enthält alle 16 Farb-Tokens. Sie wird in allen 4 HTML-Dateien **vor** dem Tailwind-CDN-Script geladen. Anschließend werden inline-Hex-Farben, Spacing-Ausreißer und Body-Klassen vereinheitlicht.

**Tech Stack:** HTML, Tailwind CSS (CDN), kein Build-System

---

## Datei-Übersicht

| Datei | Aktion |
|---|---|
| `_tokens.js` | **Neu erstellen** — gemeinsamer Token-Block |
| `index.html` | Modifizieren — Config-Block ersetzen, Farben/Spacing/Body/Fonts bereinigen |
| `artworks.html` | Modifizieren — Config-Block ersetzen, Farben/Spacing/Body/Fonts bereinigen |
| `exhibitions.html` | Modifizieren — Config-Block ersetzen, Farben/Spacing/Body/Fonts bereinigen |
| `contact.html` | Modifizieren — Config-Block ersetzen, Farben/Spacing/Body/Fonts bereinigen |

---

## Task 1: `_tokens.js` erstellen

**Dateien:**
- Erstellen: `_tokens.js`

- [ ] **Schritt 1: Datei erstellen**

Inhalt von `_tokens.js`:

```js
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Primär (Weinrot) */
        "primary":                    "#914756",
        "primary-container":          "#ed93a3",
        "on-primary":                 "#ffffff",
        "on-primary-container":       "#6d2a39",
        "on-primary-fixed-variant":   "#74303f",
        /* Sekundär (Goldbraun) */
        "secondary-container":        "#fdd48d",
        "secondary-fixed":            "#ffdea7",
        "secondary-fixed-dim":        "#e8c17c",
        "on-secondary-fixed":         "#271900",
        "on-secondary-fixed-variant": "#5d4207",
        /* Surface (fast Weiß / Rosa) */
        "surface":                    "#fff8f7",
        "surface-container":          "#fbeaeb",
        "on-surface":                 "#22191a",
        "on-surface-variant":         "#534345",
        /* Layout */
        "nav-bg":                     "#77591f",
        "footer-bg":                  "#6b4f1b"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body":     ["Manrope", "sans-serif"],
        "label":    ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg":      "0px",
        "xl":      "0px",
        "full":    "9999px"
      },
    },
  },
}
```

- [ ] **Schritt 2: Verifizieren**

```bash
grep -c "primary" _tokens.js
```
Erwartete Ausgabe: `5` (primary kommt 5× vor)

- [ ] **Schritt 3: Commit**

```bash
git add _tokens.js
git commit -m "feat: add shared _tokens.js with 16 design tokens"
```

---

## Task 2: `index.html` bereinigen

**Dateien:**
- Modifizieren: `index.html`

- [ ] **Schritt 1: Font-Links + Config-Block ersetzen**

Im `<head>` den bisherigen Font-Link und `<script id="tailwind-config">` Block ersetzen durch:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Manrope:wght@200;300;400;500;600;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="_tokens.js"></script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

**Wichtig:** `_tokens.js` muss **vor** dem Tailwind-CDN-Script stehen.

- [ ] **Schritt 2: Body-Klasse vereinheitlichen**

```html
<!-- Vorher -->
<body class="font-body selection:bg-primary-container selection:text-on-primary-container">

<!-- Nachher (unverändert — index.html ist bereits korrekt) -->
<body class="font-body selection:bg-primary-container selection:text-on-primary-container">
```

*Kein Handlungsbedarf bei index.html.*

- [ ] **Schritt 3: Nav-Hintergrund — Token ersetzen**

```html
<!-- Vorher -->
<nav class="fixed top-0 w-full z-50 bg-[#77591f]/90 backdrop-blur-xl ...">

<!-- Nachher -->
<nav class="fixed top-0 w-full z-50 bg-nav-bg/90 backdrop-blur-xl ...">
```

- [ ] **Schritt 4: Logo-Farbe — Token ersetzen (Desktop + Mobile)**

```html
<!-- Vorher (Desktop Nav) -->
<a href="index.html" class="font-['Noto_Serif'] text-2xl italic text-[#fdd48d]">Anne Leinen</a>

<!-- Nachher (Desktop Nav) -->
<a href="index.html" class="font-headline text-2xl italic text-secondary-container">Anne Leinen</a>
```

- [ ] **Schritt 5: Nav-Links Container + einzelne Links — Tokens ersetzen**

```html
<!-- Vorher (Desktop Nav Container) -->
<div class="hidden md:flex gap-10 font-['Noto_Serif'] text-lg tracking-wide">

<!-- Nachher -->
<div class="hidden md:flex gap-10 font-headline text-lg tracking-wide">
```

```html
<!-- Vorher (inaktive Links, Desktop + Mobile) -->
class="text-[#ffdea7]/70 hover:text-white transition-colors duration-300"

<!-- Nachher -->
class="text-secondary-fixed/70 hover:text-white transition-colors duration-300"
```

```html
<!-- Vorher (Mobile Menu Links) -->
<a href="..." onclick="closeMenu()" class="font-['Noto_Serif'] text-3xl text-[#ffdea7]">

<!-- Nachher -->
<a href="..." onclick="closeMenu()" class="font-headline text-3xl text-secondary-fixed">
```

- [ ] **Schritt 6: Mobile-Menu-Hintergrund — Token ersetzen**

```html
<!-- Vorher -->
<div id="mobile-menu" class="... bg-[#77591f] ...">

<!-- Nachher -->
<div id="mobile-menu" class="... bg-nav-bg ...">
```

- [ ] **Schritt 7: Hero-Button — Spacing korrigieren**

```html
<!-- Vorher -->
<a href="#artworks" class="... px-8 py-4 ...">Kunstwerke entdecken</a>

<!-- Nachher -->
<a href="#artworks" class="... px-10 py-4 ...">Kunstwerke entdecken</a>
```

- [ ] **Schritt 8: Kontaktformular-Button — Spacing korrigieren**

```html
<!-- Vorher -->
<button class="bg-primary text-on-primary px-16 py-4 ...">Senden</button>

<!-- Nachher -->
<button class="bg-primary text-on-primary w-full py-5 ...">Senden</button>
```

- [ ] **Schritt 9: Footer — Tokens ersetzen**

```html
<!-- Vorher -->
<footer class="bg-[#6b4f1b] ...">
  <div class="font-['Noto_Serif'] italic text-lg text-[#ffdea7]">Anne Leinen</div>
  <div class="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-[#ffdea7]/50 ...">© 2024 ...</div>
  <a href="#" class="font-['Manrope'] text-[10px] ... text-[#ffdea7]/50 ...">Impressum</a>
  <a href="#" class="font-['Manrope'] text-[10px] ... text-[#ffdea7]/50 ...">Datenschutz</a>

<!-- Nachher -->
<footer class="bg-footer-bg ...">
  <div class="font-headline italic text-lg text-secondary-fixed">Anne Leinen</div>
  <div class="font-label text-[10px] tracking-[0.2em] uppercase text-secondary-fixed/50 ...">© 2024 ...</div>
  <a href="#" class="font-label text-[10px] ... text-secondary-fixed/50 ...">Impressum</a>
  <a href="#" class="font-label text-[10px] ... text-secondary-fixed/50 ...">Datenschutz</a>
```

- [ ] **Schritt 10: Verifizieren — keine Hex-Werte mehr**

```bash
grep -n '\[#' index.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 11: Verifizieren — kein inline Config-Block mehr**

```bash
grep -n 'tailwind.config' index.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 12: Commit**

```bash
git add index.html
git commit -m "refactor(index): use _tokens.js, replace hardcoded hex values"
```

---

## Task 3: `artworks.html` bereinigen

**Dateien:**
- Modifizieren: `artworks.html`

- [ ] **Schritt 1: Font-Links + Config-Block ersetzen**

Identisch wie Task 2 Schritt 1:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Manrope:wght@200;300;400;500;600;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="_tokens.js"></script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

- [ ] **Schritt 2: Body-Klasse vereinheitlichen**

```html
<!-- Vorher -->
<body class="font-body text-on-secondary-fixed selection:bg-primary-container selection:text-on-primary-container">

<!-- Nachher -->
<body class="font-body selection:bg-primary-container selection:text-on-primary-container">
```

- [ ] **Schritt 3: Nav + Mobile Menu — Tokens ersetzen**

Alle Ersetzungen wie in Task 2 Schritte 3–5:
- `bg-[#77591f]/90` → `bg-nav-bg/90` (Nav-Hintergrund)
- `bg-[#77591f]` → `bg-nav-bg` (Mobile Menu Hintergrund)
- `font-['Noto_Serif']` → `font-headline` (Logo + Nav Container + Mobile Links)
- `text-[#fdd48d]` → `text-secondary-container` (Logo-Farbe)
- `text-[#ffdea7]/70` → `text-secondary-fixed/70` (inaktive Links)
- `text-[#ffdea7]` → `text-secondary-fixed` (Mobile Menu Links)

- [ ] **Schritt 4: Spacing — px-6 md:px-12 korrigieren**

In der asymmetrischen Layout-Sektion:

```html
<!-- Vorher -->
<section class="px-6 md:px-12 mb-32">

<!-- Nachher -->
<section class="px-8 md:px-16 mb-32">
```

- [ ] **Schritt 5: Footer — Tokens ersetzen**

Identisch wie Task 2 Schritt 9.

- [ ] **Schritt 6: Verifizieren**

```bash
grep -n '\[#' artworks.html
```
Erwartete Ausgabe: *keine Treffer*

```bash
grep -n 'tailwind.config' artworks.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 7: Commit**

```bash
git add artworks.html
git commit -m "refactor(artworks): use _tokens.js, replace hardcoded hex values, fix spacing"
```

---

## Task 4: `exhibitions.html` bereinigen

**Dateien:**
- Modifizieren: `exhibitions.html`

- [ ] **Schritt 1: Font-Links + Config-Block ersetzen**

Identisch wie Task 2 Schritt 1.

- [ ] **Schritt 2: Body-Klasse vereinheitlichen**

```html
<!-- Vorher -->
<body class="font-body text-on-secondary-fixed selection:bg-primary-container selection:text-on-primary-container">

<!-- Nachher -->
<body class="font-body selection:bg-primary-container selection:text-on-primary-container">
```

- [ ] **Schritt 3: Nav + Mobile Menu — Tokens ersetzen**

Alle Ersetzungen wie in Task 2 Schritte 3–5:
- `bg-[#77591f]/90` → `bg-nav-bg/90`
- `bg-[#77591f]` → `bg-nav-bg`
- `font-['Noto_Serif']` → `font-headline`
- `text-[#fdd48d]` → `text-secondary-container`
- `text-[#ffdea7]/70` → `text-secondary-fixed/70`
- `text-[#ffdea7]` → `text-secondary-fixed`

- [ ] **Schritt 4: Button — Spacing korrigieren**

```html
<!-- Vorher (RSVP + Katalog Buttons) -->
<button class="... py-5 px-10 ...">

<!-- Nachher -->
<button class="... px-10 py-4 ...">
```

Beide Buttons auf der Seite korrigieren.

- [ ] **Schritt 5: Footer — Tokens ersetzen**

Identisch wie Task 2 Schritt 9.

- [ ] **Schritt 6: Verifizieren**

```bash
grep -n '\[#' exhibitions.html
```
Erwartete Ausgabe: *keine Treffer*

```bash
grep -n 'tailwind.config' exhibitions.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 7: Commit**

```bash
git add exhibitions.html
git commit -m "refactor(exhibitions): use _tokens.js, replace hardcoded hex values, fix spacing"
```

---

## Task 5: `contact.html` bereinigen

**Dateien:**
- Modifizieren: `contact.html`

- [ ] **Schritt 1: Font-Links + Config-Block ersetzen**

Identisch wie Task 2 Schritt 1.

- [ ] **Schritt 2: Body-Klasse vereinheitlichen**

```html
<!-- Vorher -->
<body class="font-body text-on-secondary-fixed selection:bg-primary-container selection:text-on-primary-container">

<!-- Nachher -->
<body class="font-body selection:bg-primary-container selection:text-on-primary-container">
```

- [ ] **Schritt 3: Nav + Mobile Menu — Tokens ersetzen**

Alle Ersetzungen wie in Task 2 Schritte 3–5:
- `bg-[#77591f]/90` → `bg-nav-bg/90`
- `bg-[#77591f]` → `bg-nav-bg`
- `font-['Noto_Serif']` → `font-headline`
- `text-[#fdd48d]` → `text-secondary-container`
- `text-[#ffdea7]/70` → `text-secondary-fixed/70`
- `text-[#ffdea7]` → `text-secondary-fixed`

- [ ] **Schritt 4: Footer — Tokens ersetzen**

Identisch wie Task 2 Schritt 9. Zusätzlich: Footer hat `mt-24` — das bleibt unverändert.

- [ ] **Schritt 5: Verifizieren**

```bash
grep -n '\[#' contact.html
```
Erwartete Ausgabe: *keine Treffer*

```bash
grep -n 'tailwind.config' contact.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 6: Commit**

```bash
git add contact.html
git commit -m "refactor(contact): use _tokens.js, replace hardcoded hex values"
```

---

## Task 6: Abschluss-Verifikation

- [ ] **Schritt 1: Keine Hex-Werte mehr in keiner Datei**

```bash
grep -rn '\[#' index.html artworks.html exhibitions.html contact.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 2: Kein inline Config-Block mehr**

```bash
grep -rn 'tailwind.config' index.html artworks.html exhibitions.html contact.html
```
Erwartete Ausgabe: *keine Treffer*

- [ ] **Schritt 3: _tokens.js wird in allen Dateien geladen**

```bash
grep -rn '_tokens.js' index.html artworks.html exhibitions.html contact.html
```
Erwartete Ausgabe: 4 Treffer (eine Zeile pro Datei)

- [ ] **Schritt 4: Spec-Dokument aktualisieren — artworks2/exhibitions2 Erwähnung entfernen**

In `docs/superpowers/specs/2026-04-03-anne-leinen-token-spacing-design.md` prüfen ob noch Verweise auf die gelöschten Dateien vorhanden sind.

- [ ] **Schritt 5: Abschluss-Commit**

```bash
git add docs/
git commit -m "docs: finalize token-spacing spec after cleanup"
```
