# CMS-Refactor-Plan: Anne Leinen Portfolio

Stand: 06.05.2026

Arbeitskopie:

`/Users/elkekastl/Downloads/anne-leinen-portfolio-cms-refactor`

Ziel dieses Plans ist nicht, die bestehende Website sofort komplett neu zu bauen. Ziel ist eine saubere Vorbereitung fuer einen spaeteren CMS-Umbau: Sektionen sollen klar getrennt, Inhalte strukturiert und wiederverwendbare Komponenten sichtbar werden.

## Ausgangslage

Die Website ist aktuell eine statische HTML/CSS/JavaScript-Seite ohne Build-Prozess.

Starke Punkte:

- Visuelle Richtung ist bereits klar: ruhig, editorial, artwork-led.
- `tokens.js` existiert als zentrale Design-Grundlage.
- `data.js` buendelt bereits viele Kunstwerk- und Ausstellungsdaten.
- `gallery.js` enthaelt die zentrale Galerie-, Slider- und Modal-Logik.
- `exhibitions.js` rendert Ausstellungsdaten bereits datenbasiert.

Hauptprobleme fuer CMS-Faehigkeit:

- Navigation, Mobile-Menue und Footer sind in mehreren HTML-Dateien dupliziert.
- Viele Sektionen sind direkt in den HTML-Dateien verschachtelt und nicht einzeln austauschbar.
- Statische Inhalte der Startseite sind noch nicht konsequent als Datenmodell beschrieben.
- Galerie-Daten, Filterlogik und Renderinglogik sind teilweise eng gekoppelt.
- Kontaktformular-Markup und Erfolgszustand sind doppelt auf Startseite und Kontaktseite vorhanden.
- Es gibt noch keine klare Trennung zwischen Seiten, Sektionen, Inhaltsdaten und UI-Verhalten.

## Zielbild

Die Website soll intern so strukturiert werden, dass spaeter ein CMS angebunden werden kann, ohne das Design neu zu erfinden.

Gewuenschte Eigenschaften:

- Jede Seite besteht aus klar benannten Sektionen.
- Jede Sektion hat ein eigenes Inhaltsmodell.
- Wiederkehrende UI-Bloecke sind nicht mehr kopiert, sondern zentral erzeugt.
- Kunstwerke, Ausstellungen, Startseiteninhalte und Kontaktinformationen sind getrennte Datenbereiche.
- Ein CMS kann spaeter die Daten liefern, waehrend Rendering und Design stabil bleiben.
- Die bestehende statische Website bleibt lokal testbar und braucht weiterhin keinen Build-Schritt, solange kein CMS ausgewaehlt ist.

## Nicht-Ziele in Phase 1

- Kein sofortiger Wechsel zu WordPress, Sanity, Storyblok oder einem anderen CMS.
- Kein komplettes Redesign.
- Keine Framework-Einfuehrung nur fuer Ordnung.
- Kein Deployment aus der Arbeitskopie auf `main`, bevor Struktur und Richtung bewusst entschieden sind.
- Keine Entfernung der bestehenden Galerie- und Modal-Logik ohne Ersatz.

## Empfohlene Zielstruktur

Vorerst statisch, aber modularer:

```text
anne-leinen-portfolio-cms-refactor/
├── index.html
├── artworks.html
├── exhibitions.html
├── contact.html
├── impressum.html
├── datenschutz.html
├── tokens.js
├── data/
│   ├── site.js
│   ├── pages.js
│   ├── artworks.js
│   ├── exhibitions.js
│   └── contact.js
├── scripts/
│   ├── app.js
│   ├── layout.js
│   ├── sections.js
│   ├── gallery.js
│   ├── modal.js
│   ├── slider.js
│   ├── filters.js
│   ├── exhibitions.js
│   └── contact-form.js
├── styles/
│   ├── base.css
│   ├── layout.css
│   ├── sections.css
│   ├── gallery.css
│   └── modal.css
├── assets/
├── INHALTE/
└── api/
```

Diese Struktur ist ein Zielbild. Sie muss schrittweise entstehen, nicht in einem riskanten Komplettschnitt.

## Datenmodelle

### Site

Globale Daten, die auf mehreren Seiten gebraucht werden:

- Kuenstlerinnenname
- Markenname `ARTFUL_ANNE`
- Logo
- Navigation
- Instagram-Link
- Footer-Links
- Copyright
- Basis-SEO

### Page

Pro Seite:

- Slug
- Titel
- Meta Description
- aktive Navigation
- Sektionen in Reihenfolge
- optionale SEO-/Open-Graph-Bilder

### Section

Jede Startseiten-Sektion bekommt einen eindeutigen Typ:

- `hero`
- `artistIntro`
- `testimonials`
- `artworkSlider`
- `materialProcess`
- `contactCta`

Moegliche Felder:

- `id`
- `type`
- `eyebrow`
- `title`
- `body`
- `image`
- `video`
- `cta`
- `items`
- `isVisible`

### Artwork

Bestehendes Modell aus `data.js` erweitern, aber nicht sofort brechen:

- `id`
- `titel`
- `slug`
- `beschreibung`
- `pfad`
- `thumbnailPfad`
- `mockupPfad`
- `jahr`
- `technik`
- `masse`
- `mood`
- `status`
- `isHighlight`
- `sortOrder`
- `seoTitle`
- `seoDescription`
- `altText`

Wichtig: Die aktuelle Titel-basierte Mood-Zuordnung in `gallery.js` sollte spaeter in die Kunstwerkdaten wandern. Dann muss Filterlogik nicht mehr Titel vergleichen.

### Exhibition

Bestehende Ausstellungsdaten bleiben datenbasiert, sollten aber langfristig klarere Felder bekommen:

- `id`
- `titel`
- `ort`
- `stadt`
- `datumVon`
- `datumBis`
- `anzeigeDatum`
- `beschreibung`
- `bild`
- `link`
- `archiv`
- `sortOrder`

Status: begonnen. Die bestehenden Eintraege wurden nicht-brechend um diese Felder erweitert.

## Refactor-Phasen

### Phase 0: Arbeitskopie absichern

Status: erledigt

- Projektkopie erstellt.
- Eigener Branch `cms-refactor-plan` in der Kopie angelegt.
- Bestehende Doku und Konzeptnotizen gelesen.

### Phase 1: Bestandsaufnahme und Inventar

Ziel: Erst verstehen, dann umbauen.

Aufgaben:

- Alle Seiten in Sektionen inventarisieren.
- Wiederholte Bloecke markieren: Nav, Mobile-Menue, Footer, Modal, Kontaktformular.
- Datenquellen erfassen: statisch im HTML vs. `data.js`.
- CSS-Orte erfassen: Inline-Styles pro Seite vs. wiederverwendbare Regeln.
- JavaScript-Verantwortlichkeiten erfassen: Galerie, Slider, Modal, Filter, Form.

Ergebnis:

- Eine `SECTION-INVENTORY.md` mit Seiten, Sektionen, Datenquelle und spaeterem CMS-Feldbedarf.

### Phase 2: Datenmodell stabilisieren

Status: begonnen

Ziel: Inhalte aus dem Markup loesen, ohne das Rendering gross zu veraendern.

Aufgaben:

- `data.js` in klarere Datenbereiche aufteilen oder intern sauberer strukturieren. Begonnen: Kunstwerkdaten werden nicht-brechend mit `id`, `slug`, `mood`, `isHighlight`, `sortOrder` und `altText` angereichert.
- Startseiteninhalte als Datenmodell erfassen. Begonnen: `window.AnneLeinen.pageData.home.sections` beschreibt Hero, Ueber-mich, Stimmen, Slider, Kunst-im-Raum und Kontakt als einzelne Sektionen.
- Startseiten-Slider an Kunstwerkdaten anbinden. Begonnen: `featured-artworks.artworkIds` referenziert Werke aus `galleryData`; `sliderData` bleibt als Legacy-Fallback.
- Kunstwerkdaten um CMS-relevante Felder vorbereiten.
- Mood-Zuordnung aus `gallery.js` in die Kunstwerkdaten verschieben. Begonnen: `gallery.js` liest zuerst `item.mood` und nutzt das alte Titel-Mapping nur noch als Fallback.
- Highlight- und Katalog-Trennung in `gallery.js` datenbasiert machen. Erledigt: Highlights nutzen `isHighlight`, Highlights und Katalog sortieren ueber `sortOrder`.
- Ausstellungsdaten normalisieren. Begonnen: `exhibitionData` enthaelt jetzt `id`, strukturierte Ortsfelder, `datumVon`, `datumBis`, `anzeigeDatum` und `sortOrder`; `exhibitions.js` nutzt diese Felder mit Fallbacks auf alte Anzeigenfelder.

Risiko:

- Cache-Busting fuer `data.js` muss auf allen betroffenen Seiten aktualisiert werden.

### Phase 3: Wiederkehrendes Layout zentralisieren

Ziel: Duplikate abbauen, ohne sichtbare Flicker-Probleme zu erzeugen.

Aufgaben:

- Navigation als zentrales Template in JavaScript erzeugen oder per bewusstem statischem Build-Schritt vorbereiten.
- Footer als zentrales Template vorbereiten.
- Mobile-Menue-Logik in eigenes Script verschieben.
- Modal-Markup und Modal-Logik entkoppeln.

Wichtige Entscheidung:

Da die aktuelle Seite ohne Build-Prozess arbeitet, darf Navigation/Footer nicht per `fetch()` nachgeladen werden, wenn dadurch sichtbarer Aufbau-Flicker entsteht. Entweder bleibt die Duplikation bis zur CMS-Phase bestehen oder es wird ein kleiner statischer Generierungsprozess eingefuehrt.

### Phase 4: Sektionen renderbar machen

Status: begonnen

Ziel: Seiten bestehen aus ansteuerbaren Sektionen.

Aufgaben:

- Startseiten-Sektionen einzeln benennen und mit stabilen IDs versehen.
- Sektionen als Render-Funktionen vorbereiten. Begonnen: `sections.js` rendert `hero`, `artist-intro`, `collector-voices`, `art-in-room` und `contact` aus `pageData.home.sections`.
- Pro Sektion definieren, welche Daten sie braucht.
- Sichtbarkeit/Reihenfolge ueber Daten steuerbar machen.
- Bestehendes Design exakt beibehalten.

Beispiel:

```js
{
  id: "material-process",
  type: "materialProcess",
  title: "Material & Prozess",
  body: ["..."],
  image: "...",
  isVisible: true
}
```

### Phase 5: Galerie modularisieren

Ziel: Galerie als eigenes wiederverwendbares Modul vorbereiten.

Aufgaben:

- `gallery.js` in kleinere Verantwortlichkeiten trennen:
  - Datenzugriff
  - Grid-Rendering
  - Highlight-Rendering
  - Slider
  - Modal
  - Filter
- Filter nicht mehr ueber Titel-Mapping, sondern ueber Datenfelder.
- Highlight- und Katalog-Reihenfolge ueber `isHighlight` und `sortOrder` steuern. Erledigt.
- Modal-Kontexte erhalten: Highlight, Katalog, Slider.
- Bestehende Regeln fuer Overlay, Body-Scroll und Back-Button beibehalten.

### Phase 6: Kontaktformular entkoppeln

Status: begonnen

Ziel: Formular einmal beschreiben, mehrfach nutzen.

Aufgaben:

- Gemeinsame Formularstruktur fuer Startseite und Kontaktseite definieren.
- Formularlogik in `contact-form.js` kapseln. Begonnen: Startseite und Kontaktseite nutzen dieselbe Submit-, Validierungs-, Honeypot-, Subject- und Erfolgslogik; die Startseiten-Kontaktsektion wird aus `pageData` gerendert.
- Erfolgszustand und Fehlermeldungen zentral verwalten.
- API `api/send.js` erst anfassen, wenn noetig.

### Phase 7: CMS-Auswahl vorbereiten

Ziel: CMS-Entscheidung auf Basis des Datenmodells treffen.

Zu klaeren:

- Soll Anne selbst Kunstwerke pflegen?
- Soll sie Ausstellungen selbst pflegen?
- Soll sie Startseitensektionen selbst sortieren oder nur Inhalte aendern?
- Braucht jedes Kunstwerk eine Detailseite?
- Soll es Verkauf/Anfrage-Status geben?
- Soll das CMS deutsch-only bleiben oder mehrsprachig vorbereitet werden?

Moegliche CMS-Richtungen:

- WordPress: vertrauter fuer viele Kundinnen, aber schwerer sauber in ein individuelles statisches Design zu integrieren.
- Sanity/Storyblok: sehr gut fuer strukturierte Inhalte und modulare Sektionen, aber technisch anspruchsvoller.
- Decap CMS/Git-basiert: passend fuer statische Seiten, aber weniger komfortabel.
- Eigenes JSON/YAML-System: gut fuer lokale Kontrolle, aber kein echtes Kundinnen-CMS.

## Erste konkrete Arbeitspakete

1. `SECTION-INVENTORY.md` erstellen.
2. Startseiten-Sektionen fachlich neu sortieren: Hero, Einstieg, Werke, Material & Prozess, Ueber Anne, Kontakt.
3. Datenmodell fuer Startseite in `data.js` oder `data/pages.js` vorbereiten.
4. Kunstwerkdaten um `id`, `slug`, `mood`, `isHighlight`, `sortOrder` erweitern.
5. Mood-Filter so umbauen, dass er Datenfelder liest.
6. Kontaktformular-Logik aus den HTML-Dateien herausloesen.
7. Danach erst entscheiden, ob ein kleiner Build-Schritt, ein Framework oder ein echtes CMS sinnvoll ist.

## Technische Leitplanken

- Design-Tokens bleiben Quelle fuer Farben und Schriften.
- Keine neue dominante Farbwelt.
- Keine runden Karten oder generische Template-Aesthetik.
- Galerie- und Modal-Verhalten muss nach jedem Schritt getestet werden.
- Nach Aenderungen an `data.js`, `gallery.js` oder neuen Scriptdateien Versionsnummern in HTML aktualisieren.
- Vor Commit mindestens:

```bash
node -c data.js
node -c gallery.js
node -c exhibitions.js
git diff --check
git status --short --branch
```

## Offene Entscheidungen

- Bleibt das Refactor-Projekt dauerhaft statisch oder wird es direkt CMS-Prototyp?
- Welches CMS passt zu Annes Pflegebedarf und Budget?
- Sollen Kunstwerke eigene Detailseiten bekommen?
- Sollen Startseiten-Sektionen im CMS sortierbar sein?
- Wird `Kunst im Raum` ersetzt durch `Material & Prozess`?
- Welche Inhalte kann Anne realistisch selbst liefern?
- Soll die aktuelle Website erst stabil finalisiert werden, bevor der CMS-Umbau weitergeht?
