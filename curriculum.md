# Curriculum – Anne Leinen Portfolio

Lernprotokoll: Fehler, Ursachen, Lösungen.

---

## 2026-04-04 — Tailwind-Token nicht sichtbar nach Auslagerung in _tokens.js

**Symptom:** Nach dem Auslagern der Farb-Token in eine externe `_tokens.js` waren alle Farben weg – Hintergrund weiß, Schriftfarben falsch, Buttons ohne Farbe.

**Ursache:** Die Ladereihenfolge war falsch:
```html
<!-- FALSCH -->
<script src="_tokens.js"></script>
<script src="https://cdn.tailwindcss.com..."></script>
```
`_tokens.js` lief bevor die Tailwind-CDN geladen war. Das Objekt `window.tailwind` existierte noch nicht. Der Befehl `tailwind.config = {...}` warf einen JavaScript-TypeError – die Config wurde nie gesetzt, Tailwind startete ohne Token.

**Lösung:** CDN zuerst laden, dann `_tokens.js`:
```html
<!-- RICHTIG -->
<script src="https://cdn.tailwindcss.com..."></script>
<script src="_tokens.js"></script>
```
Die CDN erstellt zuerst `window.tailwind`, danach kann `_tokens.js` die Config darauf setzen.

**Merksatz:** Tailwind CDN muss immer VOR der Config-Datei geladen werden.

---

## 2026-04-04 — Hintergrundfarbe fehlte trotz Tailwind-Token

**Symptom:** Der Seiten-Hintergrund war kurz weiß beim Laden.

**Ursache:** Die ursprüngliche CSS-Regel `body { background-color: #77591f; }` im `<style>`-Block wurde entfernt und durch die Tailwind-Klasse `bg-nav-bg` ersetzt. CSS im `<style>`-Block wirkt sofort – Tailwind-Klassen erst nachdem JavaScript ausgeführt wurde.

**Lösung:** Beides parallel verwenden:
- `body { background-color: #77591f; }` im `<style>`-Block als sofortiger CSS-Fallback
- `bg-nav-bg` auf dem `<body>`-Tag für Tailwind-Konsistenz

**Merksatz:** Bei Tailwind CDN (Play CDN) immer einen CSS-Fallback für kritische Hintergrundfarben setzen.
