# Design-Spec: Galerie-Pipeline & Bento-Grid-System
**Datum:** 2026-04-07
**Projekt:** Anne Leinen Portfolio
**Status:** Genehmigt

---

## 1. Ziel

Aufbau einer performanten, statischen Bild-Pipeline und eines Bento-Grid-Galeriesystems für die Portfolio-Webseite. Keine externen Bibliotheken. Keine Build-Tools. Alles läuft im Browser mit nativem JS und Tailwind CDN.

---

## 2. Asset-Pipeline (`optimize_images.sh`)

**Eingabe:** Alle JPEG/JPG-Dateien in `INHALTE/kunstwerke/alle-gemaelde/` (inkl. zukünftig hinzugefügte Bilder).

**Ausgabe:**
- `INHALTE/kunstwerke/alle-gemaelde/webp/` → Vollbilder, WebP, Qualität `-q:v 75`
- `INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/` → Thumbnails, WebP, max. 800px Breite

**Regeln:**
- Das Script prüft vor der Konvertierung, ob die Zieldatei bereits existiert (kein doppeltes Konvertieren).
- Dateinamen bleiben erhalten, nur die Endung wechselt zu `.webp`.
- Das Script gibt nach jedem Bild eine Statuszeile aus (`✓ Dateiname.webp`).
- Nach Abschluss: `ls -lh` beider Output-Ordner zur Verifikation.

---

## 3. Datenstruktur (`data.js`)

**Namespace-Pattern** – eine einzige globale Variable:

```js
window.AnneLeinen = window.AnneLeinen || {};
window.AnneLeinen.galleryData = [
  {
    titel:         "Werktitel",
    beschreibung:  "Kurzbeschreibung des Werks",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/dateiname.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/dateiname.webp",
    layoutClass:   "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
  },
];
```

**Felder:**

| Feld | Pflicht | Beschreibung |
|---|---|---|
| `titel` | ✓ | Werktitel, wird im Modal angezeigt |
| `beschreibung` | ✓ | Kurzer Text zum Werk, erscheint im Modal rechts |
| `pfad` | ✓ | Pfad zum WebP-Vollbild |
| `thumbnailPfad` | ✓ | Pfad zum WebP-Thumbnail (für Grid und Slider) |
| `layoutClass` | ✓ | Tailwind-Klassen für die Bento-Größe (Mobile + Desktop) |

**Bento-Größen-Konvention:**

| layoutClass | Mobile | Desktop | Verwendung |
|---|---|---|---|
| `"col-span-2 row-span-2 md:col-span-2 md:row-span-2"` | 2×2 Felder | 2×2 Felder | Großes Highlight-Bild (Fokuskachel) |
| `"col-span-1 row-span-1"` | 1×1 Feld | 1×1 Feld | Standard-Kachel |
| `"col-span-2 row-span-1"` | volle Breite | 2/3 Breite | Breites Querformat-Bild |
| `"col-span-1 row-span-2"` | halbe Breite, doppelte Höhe | 1/3 Breite, doppelte Höhe | Hochformat-Bild |

**Ladereihenfolge in HTML:**
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="tokens.js"></script>
<script src="data.js"></script>
<script src="gallery.js"></script>
```

---

## 4. Bento-Grid-Galerie (`artworks.html`)

**Grid-Container (Responsive 2-auf-3 Spalten):**
```html
<div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[150px] md:auto-rows-[300px]"></div>
```

- Mobile: 2 Spalten, 150px Zeilenhöhe, 12px Abstände
- Desktop: 3 Spalten, 300px Zeilenhöhe, 24px Abstände

**JS-Renderer (in `gallery.js`):**
- Iteriert `window.AnneLeinen.galleryData`
- Baut per `innerHTML` für jedes Objekt eine Kachel
- Wendet `layoutClass` direkt auf den Container-`div` an
- Jedes `<img>` muss `object-cover w-full h-full` erhalten
- Jedes `<img>` erhält: `loading="lazy" decoding="async"`
- Jede Kachel ist per `onclick="AnneLeinen.openModal(index)"` klickbar
- Hover-Effekt: Titel-Overlay (`opacity-0 group-hover:opacity-100 transition-opacity duration-300`)

---

## 5. Startseiten-Slider (`index.html`)

**Konzept:** Unendlich laufendes horizontales Karussell via CSS `@keyframes translateX`. GPU-Beschleunigung durch `will-change: transform` – verhindert Ghosting auf Retina-Displays.

**Klon-Pflicht:** JS rendert Bilder aus `galleryData` einmalig, klont dann den gesamten Track und hängt die Kopie direkt dahinter. Animation schiebt von `0` auf `-50%`, springt unsichtbar zurück – wirkt nahtlos endlos.

**CSS-Animation:**
```css
@keyframes al-slide {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.al-slider-track {
  animation: al-slide 30s linear infinite;
  will-change: transform;
}
.al-slider-track:hover {
  animation-play-state: paused;
}
```

**Klick:** Öffnet `AnneLeinen.openModal(index)` mit dem entsprechenden Bild.

---

## 6. Modal-System (Lightbox)

**Geteilt** zwischen `artworks.html` und `index.html` – implementiert in `gallery.js`, in beiden Seiten eingebunden.

**Layout:** Desktop: Bild links (60%), Text rechts (40%). Mobile: Bild oben, Text unten.

**`AnneLeinen.openModal(index)`:**
- Füllt Modal-Elemente aus `galleryData[index]`
- Entfernt `hidden` vom Overlay
- Setzt `document.body.style.overflow = 'hidden'`

**`AnneLeinen.closeModal()`:**
- Fügt `hidden` dem Overlay hinzu
- Setzt `document.body.style.overflow = 'auto'`

**Drei Schließmechanismen (alle Pflicht):**
1. ╳-Button
2. Klick auf Overlay-Hintergrund (nicht auf Modal-Content)
3. Escape-Taste

---

## 7. Abnahmekriterien via Terminal

### Check 1 – WebP-Dateien vorhanden
```bash
ls -R INHALTE/ | grep .webp
```
**Erwartung:** Muss WebP-Pfade ausgeben.

### Check 2 – Syntax korrekt
```bash
node -c data.js
```
**Erwartung:** `data.js is ok`

### Check 3 – Thumbnails klein genug
```bash
du -sh INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/
```
**Erwartung:** KB bis niedriger MB-Bereich.

### Check 4 – Keine externen Bibliotheken
```bash
grep -n "jquery\|lodash\|bootstrap\|swiper" artworks.html index.html
```
**Erwartung:** Keine Treffer.

### Check 5 – Pfade in data.js existieren wirklich
```bash
node -e "eval(require('fs').readFileSync('data.js','utf8')); AnneLeinen.galleryData.forEach(d => { const fs=require('fs'); if(!fs.existsSync(d.pfad)) console.log('FEHLT:', d.pfad); })"
```
**Erwartung:** Keine Ausgabe.

---

## 8. Nicht im Scope dieser Phase

- Kein Backend, kein Kontaktformular-Versand
- Keine Filter-Buttons in der Galerie
- Kein Dark Mode Toggle
- Kein CMS-Anschluss
- `exhibitions.html` und `contact.html` bleiben unverändert
