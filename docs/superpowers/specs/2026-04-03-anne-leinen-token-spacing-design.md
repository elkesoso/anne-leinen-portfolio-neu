# Design-Spec: Token Spacing & UI Konsistenz
**Projekt:** Anne Leinen Portfolio  
**Datum:** 03.04.2026  
**Status:** Genehmigt  

---

## Ziel

Die 6 HTML-Dateien des Portfolios vereinheitlichen und für die statische Veröffentlichung bereinigen:

1. Tailwind-Config-Block in eine gemeinsame Datei `_tokens.js` auslagern
2. Token-Drift in `artworks2.html` und `exhibitions2.html` beheben
3. Spacing-Skala vereinheitlichen
4. Hartcodierte Hex-Farben durch Token ersetzen
5. Body-Klassen und Font-Imports vereinheitlichen

**Nicht im Scope:** Nav und Footer bleiben in jeder Datei (kein fetch() um Flackern zu vermeiden).

---

## Teil 1 — Auslagerung: `_tokens.js`

### Was wird erstellt

Neue Datei: `/anne-leinen-portfolio/_tokens.js`

### Inhalt der Datei

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
        /* Layout (ersetzt hartcodierte Hex-Werte) */
        "nav-bg":                     "#77591f",
        "footer-bg":                  "#6b4f1b"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
    },
  },
}
```

### Einbindung in allen 6 HTML-Dateien

**Vorher:**
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
  tailwind.config = { ... 50 Zeilen ... }
</script>
```

**Nachher:**
```html
<script src="_tokens.js"></script>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

**Wichtig:** `_tokens.js` muss **vor** dem Tailwind-CDN-Script stehen, damit Tailwind die Konfiguration beim Initialisieren findet.

---

## Teil 2 — Token-Drift beheben

`artworks2.html` und `exhibitions2.html` haben abweichende Farbwerte für dieselben Token-Namen. Nach Einbindung von `_tokens.js` entfallen ihre eigenen Config-Blöcke — damit ist der Drift automatisch behoben.

### Token-Drift

`artworks2.html` und `exhibitions2.html` wurden **gelöscht** (03.04.2026). Der Token-Drift ist damit hinfällig — kein Handlungsbedarf.

### Body-Klassen vereinheitlichen

Alle 6 Seiten erhalten dieselbe `body`-Klasse:

```html
<body class="font-body text-secondary-fixed selection:bg-primary-container selection:text-on-primary-container">
```

### Font-Imports vereinheitlichen

Alle 6 Seiten erhalten dieselben Font-Import-Links:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Manrope:wght@200;300;400;500;600;800&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

---

## Teil 3 — Spacing-Skala

### Verbindliche Regeln

| Situation | Klasse | Anmerkung |
|---|---|---|
| Seitenränder horizontal | `px-8 md:px-16` | Einheitlich auf allen Seiten |
| Zentrierter Inhalts-Container | `max-w-7xl mx-auto` | Für breite Layouts |
| Schmaler Inhalts-Container | `max-w-4xl mx-auto` | Für Text-Sektionen |
| Sektion-Padding (Standard) | `py-24` | Zwischen Inhaltsblöcken |
| Sektion-Padding (groß) | `py-32` | Hero-Bereiche, besondere Sektionen |
| Abstand unter Sektionen | `mb-24` | Standard-Abstand nach Sektionen |
| Button-Padding | `px-10 py-4` | Alle primären Buttons |
| Button-Padding (Formular-Submit) | `w-full py-5` | Volle Breite im Formular |

### Konkrete Korrekturen

| Datei | Problem | Korrektur |
|---|---|---|
| `artworks.html` | `px-6 md:px-12` in Asymmetrie-Sektion | → `px-8 md:px-16` |
| `index.html` | Button `px-8 py-4` (Hero) | → `px-10 py-4` |
| `index.html` | Button `px-16 py-4` (Formular) | → `w-full py-5` |
| `exhibitions.html` | Button `py-5 px-10` | → `px-10 py-4` |

---

## Teil 4 — Hartcodierte Farben → Tokens

| Wo | Hartcodiert | Ersatz |
|---|---|---|
| Nav-Hintergrund (alle 6) | `bg-[#77591f]/90` | `bg-nav-bg/90` |
| Footer-Hintergrund (alle 6) | `bg-[#6b4f1b]` | `bg-footer-bg` |
| Logo (alle 6) | `text-[#fdd48d]` | `text-secondary-container` |
| Inactive Nav-Links (alle 6) | `text-[#ffdea7]/70` | `text-secondary-fixed/70` |
| Copyright-Text (alle 6) | `text-[#ffdea7]/50` | `text-secondary-fixed/50` |
| Impressum/Datenschutz (alle 6) | `text-[#ffdea7]/50` | `text-secondary-fixed/50` |
| Footer-Logo (alle 6) | `font-['Noto_Serif']` inline | `font-headline` |
| Footer-Text (alle 6) | `font-['Manrope']` inline | `font-label` |

---

## Datei-Übersicht nach Umsetzung

```
anne-leinen-portfolio/
├── _tokens.js          ← NEU: gemeinsamer Token-Block
├── index.html          ← bereinigt
├── artworks.html       ← bereinigt
├── artworks2.html      ← bereinigt + Token-Drift behoben
├── exhibitions.html    ← bereinigt
├── exhibitions2.html   ← bereinigt + Token-Drift behoben
├── contact.html        ← bereinigt
├── INHALTE/
├── PLAN.md
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-03-anne-leinen-token-spacing-design.md
```

---

## Nicht geändert

- Nav-HTML und Mobile Menu bleiben in jeder Datei (bewusste Entscheidung: kein fetch())
- Footer-HTML bleibt in jeder Datei
- Seiteninhalt (Texte, Bilder, Layouts) wird nicht verändert
- Keine neuen Features, keine Design-Änderungen
