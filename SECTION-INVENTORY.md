# Section Inventory: Anne Leinen Portfolio

Stand: 06.05.2026

Dieses Inventar beschreibt, welche sichtbaren Bereiche aktuell existieren, wo ihre Inhalte liegen und wie sie spaeter fuer ein CMS gedacht werden koennen.

## Wiederkehrende globale Bloecke

| Block | Aktuell | Spaeteres Ziel |
| --- | --- | --- |
| Navigation | In jeder HTML-Datei dupliziert | Zentrale Layout-Komponente oder statisch generiertes Template |
| Mobile-Menue | In jeder HTML-Datei dupliziert | Zentrale Layout-Komponente mit gemeinsamer Menue-Logik |
| Footer | In jeder HTML-Datei dupliziert | Zentrale Layout-Komponente |
| Modal | In `index.html` und `artworks.html` dupliziert | Eigenes Modal-Modul mit einem Markup-Vertrag |
| Kontaktformular | In `index.html` und `contact.html` aehnlich/doppelt | Ein Formularmodell, eine Formularlogik |
| Design-Tokens | `tokens.js` | Beibehalten, spaeter ggf. CMS-Theme-Mapping |

## `index.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Hero | HTML, Video direkt im Markup | Video, Eyebrow, H1, Kurztext | `video`, `eyebrow`, `title`, `subtitle`, `cta`, `alt/label` |
| Ueber mich | HTML | Zwei Textabsaetze, Button, Bild | `title`, `body`, `image`, `cta`, `artistBioShort` |
| Stimmen | HTML | Drei Zitate/Karten | `testimonials[]` mit Text, Name, Kontext, Sichtbarkeit |
| Kunstwerke-Slider | HTML-Container + `gallery.js` + `data.js` | Slider wird aus `sliderData` gerendert | `featuredArtworks[]`, Reihenfolge, Titel, CTA |
| Kunst im Raum | HTML | Statischer Raum-/Mockup-Abschnitt | Wahrscheinlich ersetzen durch `materialProcess` |
| Kontaktformular | HTML + `contact-form.js` + API | Anfrageformular mit Erfolgsmeldung | Formular-Konfiguration, Empfaenger, Betreffoptionen |
| Modal Lightbox | HTML + `gallery.js` | Bildmodal fuer Slider/Galerie | Zentrales Modal-Modul |

Empfohlene neue Startseiten-Dramaturgie:

1. Hero
2. Kuenstlerischer Einstieg
3. Ausgewaehlte Werke
4. Material & Prozess
5. Ueber Anne
6. Stimmen oder Eindruecke
7. Ausstellungshinweis
8. Kontakt / Anfrage

Status:

- `window.AnneLeinen.pageData.home.sections` bildet die aktuelle Startseite jetzt als Datenmodell ab.
- `artist-intro` wird ueber `sections.js` aus `pageData` gerendert.
- `collector-voices` wird ueber `sections.js` aus `pageData` gerendert.
- `art-in-room` wird ebenfalls ueber `sections.js` aus `pageData` gerendert.
- Die uebrigen Startseiten-Sektionen rendern noch statisch in `index.html`.
- Das Kontaktformular-Markup ist noch statisch, nutzt aber dieselbe Formularlogik wie `contact.html` ueber `contact-form.js`.
- Naechster Umbaupunkt waere, die Formular-Konfiguration und Texte als Datenmodell vorzubereiten.

## `artworks.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Header | HTML | Seitentitel, Einleitung | `pageTitle`, `intro`, `seo` |
| Highlights | HTML-Container + `gallery.js` | Eintraege mit `isHighlight`, sortiert ueber `sortOrder` | `artworks.where(isHighlight)`, Sortierung |
| Trennlinie | HTML | Visuelle Trennung | Layout-only |
| Alle Werke | HTML-Container + `gallery.js` | Nicht-Highlights, sortiert ueber `sortOrder` | `artworks[]`, Sortierung, Sichtbarkeit |
| Mood-Filter | HTML + `gallery.js` | Filter ueber `MOOD_BY_TITLE` | `artwork.mood` als Datenfeld |
| Modal Lightbox | HTML + `gallery.js` | Detailansicht mit Navigation | Zentrales Modal-Modul |

Status:

Die Trennung `erste drei Werke = Highlights` ist ersetzt: `gallery.js` liest `isHighlight` und `sortOrder`, mit einem Fallback auf die ersten drei sortierten Werke, falls keine Highlights gepflegt sind.

```js
{
  id: "infinite-future",
  titel: "Infinite Future",
  isHighlight: true,
  sortOrder: 10,
  mood: "weite"
}
```

## `exhibitions.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Header | HTML | Eyebrow, H1 | `pageTitle`, `eyebrow`, `intro` |
| Ausstellungs-Liste | `exhibitions.js` + `data.js` | Aktuelle/nicht archivierte Ausstellungen, mit normalisierten Datums- und Ortsfeldern | `exhibitions.where(!archive)` |
| Kuratorinnen-Zitat | HTML | Statisches Zitat | `quote.text`, `quote.author/label`, Sichtbarkeit |
| Ausstellungen 2025 | `exhibitions.js` + `data.js` | Archiv nach Monat, gruppiert ueber `datumVon` | `exhibitions.where(archive)`, Jahr/Monat |

Guter Kandidat fuer fruehen CMS-Test, weil die Seite bereits datenbasiert arbeitet.

Status:

- `exhibitionData` enthaelt jetzt `id`, strukturierte Ortsfelder, `datumVon`, `datumBis`, `anzeigeDatum` und `sortOrder`.
- `exhibitions.js` bevorzugt die normalisierten Felder und nutzt alte Felder weiter als Fallback.

## `contact.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Page Header | HTML | Titel und Intro | `pageTitle`, `intro`, `seo` |
| Kontaktformular | HTML + `contact-form.js` + `api/send.js` | Formularfelder, Honeypot, Erfolgsmeldung | Feldkonfiguration, Mailtexte, Betreffoptionen |
| Kontaktinfo | HTML | E-Mail, Instagram, Ort | `contact.email`, `socials[]`, `location` |
| Auftragsarbeiten | HTML | Infotext | `commissionInfo.title`, `body`, `cta` |
| FAQ | HTML | Fragen/Antworten | `faq[]` |

Wichtigster Refactor:

Startseite und Kontaktseite nutzen jetzt dieselbe Formularlogik ueber `contact-form.js`. Als naechster Schritt kann die Formular-Konfiguration aus `pageData` oder einem eigenen Kontakt-Datenbereich gespeist werden.

## `impressum.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Page Header | HTML | Titel | Rechtstext eher statisch lassen |
| Content | HTML | Impressumsangaben | Rechtstext statisch oder separater Legal-Datenbereich |

Empfehlung: Nicht frueh modularisieren. Rechtliche Inhalte stabil lassen.

## `datenschutz.html`

| Sektion | Aktueller Ort | Inhalt aktuell | CMS-Felder spaeter |
| --- | --- | --- | --- |
| Page Header | HTML | Titel | Rechtstext eher statisch lassen |
| Content | HTML | Datenschutzabschnitte | Rechtstext statisch oder separater Legal-Datenbereich |

Empfehlung: Nicht frueh modularisieren. Nur globale Nav/Footer spaeter zentralisieren.

## Prioritaet fuer den Umbau

1. Startseite, weil dort Sektionen und Erzaehlung am wichtigsten sind.
2. Kunstwerke, weil hier die Datenstruktur fuer CMS entscheidend ist.
3. Ausstellungen, weil die Seite bereits datenbasiert ist und als Pilot dienen kann.
4. Kontakt, weil Formularlogik dupliziert ist.
5. Impressum/Datenschutz zuletzt, nur Layout-Duplikate entfernen.
