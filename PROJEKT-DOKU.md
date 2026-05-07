# Projekt-Doku: Anne Leinen Portfolio

Stand: 06.05.2026

Diese Datei beschreibt den aktuellen Aufbau der Website und die wichtigsten Arbeitsregeln. Sie ist die praktische Projektkarte fuer lokale Arbeit, GitHub und spaetere Aenderungen.

## Kurzueberblick

Die Website ist eine statische HTML/CSS/JavaScript-Seite ohne Build-Prozess.

- Hosting: Vercel
- GitHub-Repo: `elkesoso/anne-leinen-portfolio-neu`
- Hauptbranch: `main`
- Lokales Projekt: `/Users/elkekastl/Downloads/anne-leinen-portfolio`
- CMS-Refactor-Kopie: `/Users/elkekastl/Downloads/anne-leinen-portfolio-cms-refactor`
- Design-System: `tokens.js`
- Bild- und Inhaltsdaten: `data.js`
- Galerie/Modal/Slider-Logik: `gallery.js`

## Wichtige Dateien

| Datei | Aufgabe |
| --- | --- |
| `index.html` | Startseite mit Hero, Slider, Kontaktbereich und Modal-Struktur |
| `artworks.html` | Kunstwerke-Seite mit Highlights, Alle-Werke-Grid, Filter und Modal-Struktur |
| `data.js` | Zentrale Datenquelle fuer Slider, Kunstwerke und Ausstellungen |
| `gallery.js` | Rendert Galerie, Highlights, Katalog, Slider und Modal-Verhalten |
| `tokens.js` | Farben, Schriften und Tailwind-Konfiguration |
| `exhibitions.html` | Ausstellungsseite |
| `exhibitions.js` | Rendert Ausstellungsdaten |
| `api/send.js` | Kontaktformular ueber Vercel Serverless Function |
| `README.md` | Allgemeine Projektuebersicht |
| `CLAUDE.md` | Technische Regeln fuer KI-/Code-Arbeit |

## Seitenstruktur

### Startseite

`index.html` nutzt:

- `tokens.js`
- `data.js`
- `gallery.js`

Die Startseite enthaelt unter anderem den Slider. Der Slider greift auf `window.AnneLeinen.sliderData` in `data.js` zu.

Hinweis zum CMS-Refactor: In der Refactor-Kopie wird der Startseiten-Slider nicht mehr ueber eine separate `sliderData`-Pflegeliste gespeist, sondern ueber `pageData.home.sections.featured-artworks.artworkIds` mit Werken aus `galleryData`.

### Kunstwerke-Seite

`artworks.html` ist aktuell strikt getrennt:

- `#highlights`: die ersten drei kuratierten Mockup-Bilder
- `#all-works`: eigenstaendige Sektion mit Filter-Bar und komplettem Katalog-Grid

Wichtige Container:

- `#highlight-grid`: wird durch `gallery.js` mit den ersten drei Werken befuellt
- `#catalog-grid`: wird durch `gallery.js` mit allen weiteren Werken befuellt
- `#mood-filter-bar`: Filter fuer `Alle`, `Dynamik`, `Stille`, `Weite`, `Materie`
- `#mood-description`: dynamischer Stimmungstext unter der Filter-Bar

## data.js

`data.js` ist die zentrale Inhaltsdatei. Wenn ein Text, Titel, Bildpfad oder Werkdetail geaendert werden soll, ist meist diese Datei richtig.

Wichtige Bereiche:

- `window.AnneLeinen.sliderData`: Bilder fuer den Startseiten-Slider
- `window.AnneLeinen.galleryData`: alle Kunstwerke fuer `artworks.html`
- weitere Ausstellungsdaten fuer die Ausstellungsseite

Ein Kunstwerk in `galleryData` sieht ungefaehr so aus:

```js
{
  titel: "Infinite Future",
  beschreibung: "Text...",
  pfad: "INHALTE/kunstwerke/alle-gemaelde/webp/Infinite Future.webp",
  thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Infinite Future.webp",
  mockupPfad: "",
  layoutClass: "col-span-1 row-span-2"
}
```

Wichtig:

- `titel` muss exakt zum Dateinamen bzw. zur Mood-Zuordnung passen.
- `beschreibung` wird im Modal angezeigt.
- `pfad` ist das grosse Bild.
- `thumbnailPfad` ist das kleine Grid-Bild.
- `mockupPfad` wird fuer Highlights genutzt, wenn vorhanden.
- Nach Aenderungen an `data.js` muss der Cache-Bust in HTML-Seiten erhoeht werden, z. B. `data.js?v=1.10`.

## gallery.js

`gallery.js` erzeugt dynamisch grosse Teile der Galerie. Deshalb stehen viele sichtbare UI-Texte nicht direkt in `artworks.html`, sondern werden dort per JavaScript eingefuegt.

Aktuelle Logik:

- Die ersten drei Eintraege aus `galleryData` werden als Highlights gerendert.
- Alle Werke ab Index 3 werden in `#catalog-grid` gerendert.
- Highlight-Klicks oeffnen das Modal mit Scope `highlight`.
- Katalog-Klicks oeffnen das Modal mit Scope `catalog`.
- Modal-Navigation ist begrenzt:
  - Highlights: kein Endloskreis, nur innerhalb der drei Highlights.
  - Alle Werke: kein Endloskreis, Navigation innerhalb der sichtbaren Katalogreihe.
  - Bei aktiver Filteransicht zaehlen nur sichtbare gefilterte Werke.
- Das Modal verwendet einen festen 4:5-Bildrahmen.
- Katalogkarten zeigen aktuell den Buttontext `Mehr erfahren`.

Nach Aenderungen an `gallery.js` muss der Cache-Bust in HTML-Seiten erhoeht werden, z. B. `gallery.js?v=4.3`.

## Mood-Filter

Der Filter gilt nur fuer `#all-works`, nicht fuer die Highlights.

Mood-Kategorien in `gallery.js`:

- `dynamik`
- `stille`
- `weite`
- `materie`

Die Zuordnung erfolgt in `MOOD_BY_TITLE`. Neue Werke muessen dort eingetragen werden, wenn sie in einem Filter erscheinen sollen.

Hinweis: Werke ohne Mood-Zuordnung erscheinen nur bei `Alle`.

## Modal

Das Modal existiert in `index.html` und `artworks.html`. Beide Seiten nutzen dieselbe `gallery.js`-Logik.

Aktuelle Regeln:

- Oeffnen ueber `AnneLeinen.openModalByName(...)`
- Schliessen ueber X, Overlay/Bild-Klick, Escape oder Browser-Zurueck
- Body-Scroll wird beim Oeffnen mit `document.body.style.overflowY = 'hidden'` gesperrt
- Beim Schliessen wird `overflowY` wieder auf `''` gesetzt
- Overlay bleibt sofort blickdicht
- Nur `#modal-content` fadet per Opacity
- Bildbereich im normalen Kunstwerk-Modal ist auf 4:5 fixiert
- Desktop-Pfeile liegen ausserhalb des Bildrahmens.
- Im Startseiten-Slider-Modal (`is-minimal`) nutzen die aeusseren Desktop-Pfeile die Slider-Navigation; im normalen Kunstwerk-Modal nutzen sie die Kunstwerk-Navigation.
- Das Startseiten-Slider-Modal hat kein Textfeld. Der sichtbare Minimal-Modal-Rahmen orientiert sich am Bild.
- Die Desktop-Pfeile im Startseiten-Slider-Modal orientieren sich an den tatsaechlichen Bildkanten, nicht an einem Text-/Content-Bereich.
- Auf Mobile bleiben die inneren Bild-Pfeile sichtbar, die aeusseren Desktop-Pfeile bleiben ausgeblendet.

Letzte Modal-Aenderung am 06.05.2026:

- `main`: Commit `9aa7273` (`Align slider modal arrows to image bounds`)
- `cms-refactor`: Commit `e893264` (`Align slider modal arrows to image bounds`)
- CMS-Testkopie `cms-refactor-plan`: Commit `e893264`

Geprueft wurden `node -c gallery.js`, `git diff --check` und ein manueller Browser-Test durch die Nutzerin.

## Branches

Aktueller Stand:

- `main`: oeffentliche Version, synchron mit GitHub
- `cms-refactor`: Refactor-Branch im Live-Repo `elkesoso/anne-leinen-portfolio-neu`
- `cms-refactor-plan`: Arbeitsbranch in der CMS-Testkopie `elkesoso/anne-leinen-portfolio-cms-test`
- `local-scroll-close-test`: lokaler Testbranch mit Scroll-to-close-Experiment fuer Highlight-Modals
- `fix/desktop-modal-overlay-arrows`: alter Fix-Branch, nicht aktueller Arbeitsstand
- `fix/modal-image-navigation-wrapper`: alter Fix-Branch, nicht aktueller Arbeitsstand
- `feature/cls-optimization`: alter Feature-Branch
- `feature/final-optimization`: alter Feature-Branch

Wichtig:

- `main` ist die oeffentliche saubere Version.
- `cms-refactor` ist der Branch fuer die CMS-Vorbereitung im bestehenden Live-Repo.
- `cms-refactor-plan` ist die isolierte Test-/Arbeitskopie fuer den Refactor.
- Experimente sollten nicht direkt auf `main` gepusht werden.
- Wenn etwas nur lokal getestet werden soll, eigenen Branch verwenden.

## Lokales Testen

Im Projektordner:

```bash
cd /Users/elkekastl/Downloads/anne-leinen-portfolio
python3 -m http.server 8000
```

Dann im Browser:

```text
http://localhost:8000/
http://localhost:8000/artworks.html
```

Bei Cache-Problemen:

- harte Aktualisierung: `Cmd + Shift + R`
- oder Test-Parameter anhaengen, z. B. `?test=1`

## Checks vor Commit

Nach JavaScript-Aenderungen:

```bash
node -c data.js
node -c gallery.js
git diff --check
git status --short --branch
```

Nur pushen, wenn der Stand wirklich auf GitHub/Vercel landen soll.

## Git-Workflow

Lokalen Status pruefen:

```bash
git status --short --branch
```

Lokalen Commit erstellen:

```bash
git add datei1 datei2
git commit -m "Kurze Beschreibung"
```

Nach GitHub pushen:

```bash
git push origin main
```

Wenn nur lokal getestet werden soll:

```bash
git switch -c name-des-testbranches
```

## Deployment

Push auf `main` landet auf GitHub und loest danach das Deployment bei Vercel aus.

Wichtig:

- GitHub/Vercel ist die oeffentliche Version.
- Lokale Tests gehoeren erst auf GitHub, wenn sie bewusst veroeffentlicht werden sollen.
- DNS/Domain liegt ausserhalb des Codes und wird bei Hostinger/Vercel verwaltet.

## Zuletzt wichtige Aenderungen

- Highlights und Alle Werke wurden strikt getrennt.
- Die ersten drei Werke sind kuratierte Highlights mit Mockups.
- Die Alle-Werke-Sektion hat einen Mood-Filter.
- Die Modal-Pfeile springen nicht mehr endlos weiter.
- Das Modal hat einen festen 4:5-Bildrahmen.
- `Infinite Future` hat einen vollstaendigen Beschreibungstext erhalten.
- Scroll-to-close wurde testweise entwickelt, aber auf `main` wieder revertiert. Die Testversion liegt lokal auf `local-scroll-close-test`.

## Offene Punkte

- Mobile Detailansicht weiter visuell pruefen.
- Entscheiden, ob Scroll-to-close ueberhaupt sinnvoll ist.
- Mood-Zuordnung fuer Werke ohne Kategorie pruefen.
- Alte Branches spaeter aufraeumen, wenn sicher ist, dass sie nicht mehr gebraucht werden.
