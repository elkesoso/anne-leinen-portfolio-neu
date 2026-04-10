# CLAUDE.md – Anne Leinen Portfolio

Projektspezifische Regeln für Claude Code. Ergänzt die globale ~/CLAUDE.md.

## Tech-Stack
- Tailwind CSS via CDN (kein Build-Schritt)
- Design-Tokens in `tokens.js` (Tailwind-Config + CSS-Custom-Properties auf :root)
- Vercel Serverless Functions (`api/send.js`)
- Reines HTML/CSS/JS – keine Frameworks

## Tailwind CDN: Bekannte Fallstricke
- **Opacity-Modifier auf Custom-Farben funktionieren NICHT** (z.B. `bg-surface/90`)
  → Immer direkten Hex-Wert im CSS verwenden
- **Keine willkürlichen Werte für kritische Farben** – nur Token-Klassen oder CSS-Regeln
- Nach jeder Tailwind-Änderung prüfen ob die Klasse tatsächlich generiert wird

## Modals / Overlays – Pflichtregeln
- Hintergrundfarbe IMMER als `background-color: #HEX !important` direkt in der CSS-ID-Regel
- KEINE opacity-Transition auf dem Overlay selbst – Hintergrund muss sofort blickdicht sein
- Nur `modal-content` darf per opacity faden (0.3s ease-in-out)
- Zustand über `.is-open`-Klasse steuern – NICHT über Tailwind `opacity-0`/`invisible`
- Beim Öffnen: `transition: visibility 0s linear 0s` (sofort sichtbar)
- Beim Schließen: `transition: visibility 0s linear 0.15s` (150ms Nachlaufzeit)
- JS-Reihenfolge beim Schließen: erst `content.style.opacity = '0'`, dann nach 350ms `.is-open` entfernen

## Layout-Stabilität
- `html { scrollbar-gutter: stable; }` muss in JEDER Seite gesetzt sein
- `body.style.overflow` → NIEMALS `overflow: hidden` – stattdessen `overflowY: 'hidden'`
  und beim Schließen `overflowY: ''` (leerer String, nicht 'auto')
- Modal-Overlay mit `fixed inset-0` (kein `100vw`) – verhindert Scrollbar-Überlappung

## Galerie / gallery.js
- Bilder-HTML wird dynamisch erzeugt – CSS-Änderungen an Bildern gehören in gallery.js
- GPU-Rendering für alle Galeriebilder: `will-change: transform, opacity; backface-visibility: hidden`
- Platzhintergrund für ladende Bilder: `bg-secondary-fixed/20` (warmes Beige, kein Weiß-Blitzen)
- Cache-Bust nach jeder gallery.js-Änderung: Versionsnummer in `?v=YYYYMMDDHHII` erhöhen
  (gilt für artworks.html UND index.html)

## Farb-System
- Tokens in `tokens.js` – dort ändern, nicht in den HTML-Dateien
- Für Modal/Overlay: eigene Variable `--color-modal-overlay` in tokens.js
- Für direkte CSS-Nutzung: CSS-Custom-Properties werden per JS auf `:root` gesetzt
  → Achtung: beim ersten CSS-Parse noch undefined! Deshalb kritische Farben hart kodieren

## Versionierung
- Nach jeder Änderung: git add → commit → push (keine Ausnahme)
- Versionsnummer in Script-Tags erhöhen wenn gallery.js oder data.js geändert wurde
- Commit-Nachricht: Was geändert, warum
