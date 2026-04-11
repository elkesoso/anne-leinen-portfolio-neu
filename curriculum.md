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

---

## 2026-04-06 — Tailwind CDN: Opacity-Modifier auf Custom-Farben funktionieren nicht

**Symptom:** Die Klasse `bg-surface/90` (90 % Deckkraft der Custom-Farbe `surface`) hatte keine sichtbare Wirkung. Der Hintergrund war entweder vollständig deckend oder komplett transparent.

**Ursache:** Der Tailwind-CDN-Modus (Play CDN) generiert CSS nur für Klassen, die er beim Scannen des HTML vorfindet. Opacity-Modifier auf Custom-Farben (z. B. `/90`) werden dabei **nicht** zuverlässig generiert – das ist ein bekanntes Einschränkung des CDN-Modus gegenüber einem echten Build-Step.

**Lösung:** Für alle transparenten Hintergründe direkt `rgba()`-Werte per `style`-Attribut oder CSS-Regel verwenden:
```html
<!-- FALSCH (CDN generiert bg-surface/90 nicht) -->
<nav class="bg-surface/90">

<!-- RICHTIG -->
<nav style="background-color: rgba(255, 248, 247, 0.9);">
```

**Merksatz:** Opacity-Modifier auf Custom-Farben → immer `rgba()` direkt einsetzen.

---

## 2026-04-06 — CSS-Spezifität: Tailwind-Klasse auf Element schlägt `<style>`-Block-Regel

**Symptom:** Eine `nav { background-color: #F3E8E2 !important; }`-Regel im `<style>`-Block hatte keine Wirkung – die Tailwind-Klasse `bg-nav-bg` auf dem `<nav>`-Element gewann.

**Ursache:** Tailwind generiert Klassen wie `.bg-nav-bg { background-color: #77591f; }`. Diese Klasse ist direkt auf dem Element und hat dadurch (je nach Spezifität und Reihenfolge) oft höhere Priorität als eine Element-Regel im `<style>`-Block. Auch `!important` half nicht, weil Tailwind ebenfalls `!important` generieren kann.

**Lösung:** Das inline `style`-Attribut direkt auf dem Element setzen – das schlägt **immer** sowohl CSS-Klassen als auch `<style>`-Block-Regeln:
```html
<nav style="background-color: rgba(255, 248, 247, 0.9);">
```
Zusätzlich die Tailwind-Background-Klasse vom Element entfernen.

**Merksatz:** Reihenfolge der Spezifität: `style=""` > Tailwind-Klasse > `<style>`-Block > externe CSS.

---

## 2026-04-06 — Modal-Overlay: Tailwind opacity-Transition verursacht Durchscheinen

**Symptom:** Beim Öffnen der Lightbox schien kurz der Seiteninhalt durch das Overlay – die Hintergrundfarbe erschien verzögert, obwohl sie gesetzt war.

**Ursache:** Eine `transition: opacity 0.3s` auf dem Overlay-Hintergrund selbst führte dazu, dass der Hintergrund bei `opacity: 0` startete und langsam einfadete. In diesen ~300ms war die Seite dahinter sichtbar.

**Lösung:** Das Overlay (`#modal-overlay`) bekommt **keine** opacity-Transition. Die Farbe muss sofort blickdicht sein:
```css
/* RICHTIG */
#modal-overlay { background-color: #8C7B72 !important; }
/* Nur der Inhalts-Kasten darf faden */
#modal-content { opacity: 0; transition: opacity 0.3s ease-in-out; }
```

**Merksatz:** Overlay-Hintergrund = sofort blickdicht. Nur `modal-content` darf per opacity faden.

---

## 2026-04-06 — Modal-Overlay: Scrollbar-Shift beim Öffnen

**Symptom:** Beim Öffnen des Modals sprang die Seite kurz zur Seite, weil die Scrollbar verschwand.

**Ursache:** `body.style.overflow = 'hidden'` entfernt die Scrollbar, deren Breite (~17px) dann als Leerraum fehlt – der Inhalt springt nach rechts.

**Lösung:** Zwei Maßnahmen:
1. `html { scrollbar-gutter: stable; }` in jeder Seite – reserviert dauerhaft Platz für die Scrollbar
2. `body.style.overflowY = 'hidden'` statt `overflow = 'hidden'` verwenden, und beim Schließen `overflowY = ''` (leerer String, nicht `'auto'`)

**Merksatz:** `scrollbar-gutter: stable` muss auf jeder Seite stehen. Nie `overflow: hidden` auf body – immer `overflowY`.

---

## 2026-04-06 — Formular-Erfolg: Weißer Blitz beim Crossfade

**Symptom:** Nach dem Absenden des Kontaktformulars blitzte kurz ein weißer Kasten auf, bevor die Erfolgsmeldung erschien.

**Ursache:** Das Formular wurde per `display: none` versteckt und die Erfolgsmeldung per `display: block` eingeblendet. Dieser Layout-Toggle verursachte einen Reflow mit kurzem Weißblitz.

**Lösung:** CSS-Grid-Stacking: Beide Divs (Formular + Erfolgsmeldung) liegen im selben Grid-Bereich übereinander. Keins davon wird je versteckt (`display: none`) – nur die `opacity` wechselt:
```css
/* Container */
display: grid;
grid-template-areas: 'stack';

/* Beide Kinder */
grid-area: stack;
transition: opacity 0.5s ease-in-out;
```
Beim Erfolg: `form.style.opacity = '0'`, nach 400ms `success.style.opacity = '1'`.

**Merksatz:** Nie `display: none` für Crossfades – immer CSS-Grid-Stacking mit opacity-Transition.

---

## 2026-04-08 — Logo-Pfad: Absolut vs. Relativ

**Symptom:** Das Logo war lokal nicht sichtbar, funktionierte aber auf Vercel.

**Ursache:** Der Pfad `/assets/logo.png` (absolut, mit führendem `/`) funktioniert nur auf einem Webserver, der weiß wo Root ist. Beim lokalen Öffnen via `file://` wird `/assets/logo.png` als Pfad vom Laufwerk-Root interpretiert – dort existiert die Datei nicht.

**Lösung:** Relativen Pfad ohne führendes `/` verwenden:
```html
<!-- FALSCH (bricht lokal) -->
<img src="/assets/logo.png">

<!-- RICHTIG (funktioniert lokal und auf Server) -->
<img src="assets/logo.png">
```

**Merksatz:** Relative Pfade (`assets/...`) für alle Assets – dann funktioniert lokal und deployed.

---

## 2026-04-08 — .gitignore: Ausnahme für spezifische Datei

**Symptom:** Das Logo (`assets/logo.png`) wurde von Git ignoriert und fehlte im Repository – obwohl es für die Website gebraucht wird.

**Ursache:** Die `.gitignore` hatte die Regel `**/*.png` (alle PNG-Dateien ignorieren), die auch das Logo traf.

**Lösung:** Eine Ausnahme-Regel mit `!` hinzufügen, **nach** der Ignore-Regel:
```gitignore
**/*.png          # alle PNGs ignorieren
!assets/logo.png  # AUSNAHME: Logo darf ins Repo
```
Reihenfolge ist entscheidend: Die Ausnahme muss nach der allgemeinen Regel stehen.

**Merksatz:** In `.gitignore`: `!pfad/datei` macht eine Ausnahme. Ausnahme muss nach der Ignore-Regel stehen.

---

## 2026-04-08 — Logo-Filter: `invert(1)` allein invertiert Goldfarbe zu Blau

**Symptom:** Das Logo auf dunklem Hintergrund sollte weiß werden. Mit `filter: invert(1)` wurde die Goldfarbe (#77591f) stattdessen bläulich.

**Ursache:** `invert(1)` invertiert alle Farbkanäle. Gold (#77591f) invertiert zu einem bläulichen Ton (#88A6E0), nicht zu Weiß.

**Lösung:** Erst alle Farben auf Schwarz reduzieren, dann invertieren zu Weiß:
```css
/* FALSCH: Gold → Blau */
filter: invert(1);

/* RICHTIG: alle Farben → Schwarz → dann → Weiß */
filter: brightness(0) invert(1);
```

**Merksatz:** Für „Logo reinweiß machen": immer `brightness(0) invert(1)` – nicht nur `invert(1)`.

---

## 2026-04-11 — Burger-Icon unsichtbar: Farbe mit Hintergrund identisch

**Symptom:** Das mobile Burger-Icon war auf mehreren Seiten nicht zu sehen, obwohl der HTML-Code korrekt war.

**Ursache:** Der Button hatte `text-secondary-container` (= `#fdd48d`, goldgelb). Der Nav-Hintergrund ist `rgba(255, 248, 247, 0.9)` (fast weiß). Beide Farben sind sehr hell – der Kontrast war praktisch null.

**Lösung:** Farbe auf `text-on-surface-variant` (= `#534345`, dunkelgrau) geändert – passt semantisch zum hellen Surface-Hintergrund und ist klar sichtbar:
```html
<!-- FALSCH: unsichtbar auf hellem Hintergrund -->
<button class="md:hidden text-secondary-container">

<!-- RICHTIG: kontrastreiche Farbe für hellen Hintergrund -->
<button class="md:hidden text-on-surface-variant">
```
Fix wurde auf alle 6 HTML-Seiten angewendet.

**Merksatz:** Icon-Farbe immer gegen den Hintergrund prüfen. Für helles Nav: `text-on-surface-variant`.

---

## 2026-04-11 — Formular-Pflichtfeld: Client und Server müssen übereinstimmen

**Symptom:** Das Kontaktformular lehnte Einsendungen ohne Nachricht ab – obwohl im HTML kein `required`-Attribut gesetzt war und das JavaScript nur Name + E-Mail prüfte.

**Ursache:** Es gab eine **dritte Validierungsebene**, die vergessen wurde: die Serverless Function (`api/send.js`). Diese prüfte zusätzlich:
```js
// FEHLER: message als Pflichtfeld auf dem Server
if (!name?.trim() || !email?.trim() || !message?.trim()) {
  return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
}
```
Selbst wenn HTML und JS korrekt waren, scheiterte die Anfrage am Server.

**Lösung:** Server-Validierung an die Anforderung angepasst:
```js
// RICHTIG: nur name + email Pflichtfelder
if (!name?.trim() || !email?.trim()) {
  return res.status(400).json({ error: 'Bitte füllen Sie Name und E-Mail aus.' });
}
```

**Merksatz:** Bei Formularen immer drei Ebenen prüfen: HTML (`required`), JavaScript-Validierung, Server-Validierung. Alle drei müssen dieselben Regeln haben.

---

## 2026-04-11 — Browser-Cache: Änderungen nicht sichtbar trotz korrektem Deploy

**Symptom:** Eine Änderung (Label-Text) war im Code korrekt, im GitHub-Repo vorhanden und deployed – aber im Browser nicht sichtbar.

**Ursache:** Der Browser hatte eine ältere Version der Seite im Cache gespeichert und zeigte diese an, ohne den Server erneut zu fragen.

**Lösung:** Hard Refresh: `Cmd + Shift + R` (Mac) bzw. `Ctrl + Shift + R` (Windows/Linux). Alternativ: Seite im privaten/Inkognito-Fenster öffnen.

**Diagnose-Tipp:** Zuerst prüfen ob der Git-Commit wirklich gepusht ist (`git log --oneline`), dann erst Cache als Ursache vermuten.

**Merksatz:** „Änderung nicht sichtbar" ≠ Deploy-Fehler. Immer zuerst Hard Refresh versuchen.

---

## 2026-04-11 — Natives `<select>` lässt sich nicht vollständig stylen

**Symptom:** Das Dropdown-Menü hatte einen hässlichen Browser-Standard-Pfeil, falsche Hintergrundfarbe und Browser-blauer Hover-Effekt auf den Optionen — obwohl `appearance: none` gesetzt war.

**Ursache:** `<option>`-Elemente innerhalb eines nativen `<select>` können in den meisten Browsern (Chrome, Safari, Firefox) **nicht per CSS gestylt werden** — weder Hintergrundfarbe noch Hover-Effekt. Das Betriebssystem rendert das Dropdown nativ und ignoriert CSS weitgehend.

**Lösung:** Native `<select>` durch ein **Custom Dropdown Component** ersetzen:
- Natives `<select>` bleibt im DOM, aber mit `display:none` (für JS-Wert-Zugriff beim Absenden)
- Sichtbares UI: `<button>` (Trigger) + `<div>` (Options-Panel) mit `<button>`-Kindern
- JS synchronisiert den gewählten Wert ins native select
- CSS steuert Farben und Hover vollständig

```html
<!-- Unsichtbares native select -->
<select id="field-subject" style="display:none;">...</select>

<!-- Custom UI -->
<div class="relative">
  <button id="subject-trigger">Kaufinteresse <svg>↓</svg></button>
  <div id="subject-options" class="hidden absolute ...">
    <button class="subject-option" data-value="Kaufinteresse">Kaufinteresse</button>
    ...
  </div>
</div>
```

```css
/* Hover direkt per CSS steuerbar */
.subject-option:hover { background-color: #e8c17c; }
```

```js
// Klick auf Option → native select synchronisieren
btn.addEventListener('click', function() {
  select.value = btn.dataset.value;
  display.textContent = btn.dataset.value;
  panel.classList.add('hidden');
});
// Außerhalb klicken → schließen
document.addEventListener('click', close);
```

**Wichtig:** `select:focus`-Regeln im CSS müssen entfernt werden, da das native select jetzt `display:none` ist und kein Fokus mehr erhält.

**Merksatz:** Natives `<select>` = kaum stylebar. Für Custom-Design immer Custom Dropdown Component bauen.
