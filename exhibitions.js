// exhibitions.js – Renderer für Ausstellungs-Seite
// Nutzt window.AnneLeinen.exhibitionData aus data.js

(function () {
  'use strict';

  window.AnneLeinen = window.AnneLeinen || {};
  var AL = window.AnneLeinen;

  // ─── ESCAPE-HELFER ────────────────────────────────────────────────────────
  // Identisch zu gallery.js – sichert onclick-Strings, Attribute und HTML-Inhalt
  function escQ(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function escA(s) { return String(s).replace(/"/g, '&quot;'); }
  function escH(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ─── AKTUELLE AUSSTELLUNGEN ───────────────────────────────────────────────
  // Rendert alle Einträge mit archiv: false.
  // Jede zweite Ausstellung ist gespiegelt (Bild rechts statt links).

  function renderExhibitions() {
    var container = document.getElementById('exhibitions-list');
    if (!container) return;
    var data = AL.exhibitionData || [];
    var current = data.filter(function (e) { return !e.archiv; });

    var html = '';
    current.forEach(function (item, i) {
      // Debug: Mapping aus data.js sichtbar machen
      console.log('Rendering Exhibition:', item.titel, '| Path:', item.bildPfad, '| bildName:', item.bildName);

      // Abwechselnde Richtung: gerade = Bild links (flex-row), ungerade = Bild rechts (flex-row-reverse)
      var flexDir = i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row';

      // Bildblock – nicht klickbar (keine Lightbox auf dieser Seite)
      var imgBlock = '';
      if (item.bildPfad) {
        imgBlock = '<div class="w-full md:w-7/12 aspect-[4/5] overflow-hidden" style="cursor:default;">'
          + '<img class="w-full h-full object-cover"'
          + ' src="'  + escA(item.bildPfad) + '"'
          + ' alt="'  + escA(item.bildAlt)  + '"'
          + ' decoding="async"/>'
          + '</div>';
      }

      // CTA-Button – nur wenn ctaText vorhanden
      var ctaBlock = '';
      if (item.ctaText) {
        ctaBlock = '<button class="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label text-sm uppercase tracking-widest px-10 py-4 transition-all self-start flex items-center gap-3">'
          + escH(item.ctaText)
          + ' <span class="material-symbols-outlined text-sm">' + escH(item.ctaIcon) + '</span>'
          + '</button>';
      }

      // Uhrzeit anhängen wenn vorhanden
      var datumStr = escH(item.datum) + (item.uhrzeit ? ', ' + escH(item.uhrzeit) : '');

      // Textbreite: 5/12 wenn Bild vorhanden, sonst volle Breite
      var textWidth = item.bildPfad ? 'md:w-5/12' : '';

      html += '<article class="flex flex-col ' + flexDir + ' items-center gap-12 md:gap-24 px-8 md:px-24">'
        + imgBlock
        + '<div class="w-full ' + textWidth + ' flex flex-col">'
          // Typ-Badge
          + '<div class="bg-primary-container inline-block px-4 py-1 self-start mb-6">'
            + '<span class="font-label text-xs font-bold uppercase tracking-widest text-on-primary-container">' + escH(item.typ) + '</span>'
          + '</div>'
          // Titel
          + '<h2 class="font-headline text-4xl md:text-5xl text-secondary-container leading-tight mb-8">' + escH(item.titel) + '</h2>'
          // Meta: Ort + Datum
          + '<div class="space-y-6 mb-10">'
            + '<div class="flex items-start gap-4">'
              + '<span class="material-symbols-outlined text-secondary-container mt-1">location_on</span>'
              + '<div>'
                + '<p class="font-label text-xs uppercase tracking-widest text-secondary-fixed-dim">Location</p>'
                + '<p class="font-headline text-xl text-secondary-container">' + escH(item.ort) + '</p>'
              + '</div>'
            + '</div>'
            + '<div class="flex items-start gap-4">'
              + '<span class="material-symbols-outlined text-secondary-container mt-1">calendar_today</span>'
              + '<div>'
                + '<p class="font-label text-xs uppercase tracking-widest text-secondary-fixed-dim">Datum &amp; Uhrzeit</p>'
                + '<p class="font-headline text-xl text-secondary-container">' + datumStr + '</p>'
              + '</div>'
            + '</div>'
          + '</div>'
          // Beschreibung (optional)
          + (item.beschreibung ? '<p class="font-body text-secondary-container opacity-80 leading-relaxed mb-10 max-w-md">' + escH(item.beschreibung) + '</p>' : '')
          // CTA
          + ctaBlock
        + '</div>'
      + '</article>';
    });

    container.innerHTML = html;
  }

  // ─── ARCHIV ───────────────────────────────────────────────────────────────
  // Rendert einmalig – nach erstem Klick auf den Archiv-Link.
  // Sortiert nach Jahr (absteigend), innerhalb des Jahres chronologisch.

  var _archiveRendered = false;

  function renderArchive() {
    if (_archiveRendered) return;
    _archiveRendered = true;

    var container = document.getElementById('archive-list');
    if (!container) return;
    var data = AL.exhibitionData || [];
    var archive = data.filter(function (e) { return e.archiv; });

    // Jahr aus Datumsstring extrahieren (z.B. "14. Juli 2024" → "2024")
    var byYear = {};
    archive.forEach(function (ex) {
      var match = ex.datum.match(/\d{4}/);
      var year  = match ? match[0] : 'Sonstige';
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(ex);
    });

    // Jahre absteigend sortieren (neueste zuerst)
    var years = Object.keys(byYear).sort(function (a, b) { return Number(b) - Number(a); });

    var html = '';
    years.forEach(function (year) {
      html += '<div class="mb-10">'
        + '<h4 class="font-headline text-xl text-secondary-container mb-4 border-b border-secondary-container/20 pb-2">'
          + year
        + '</h4>'
        + '<ul class="space-y-4">';

      byYear[year].forEach(function (ex) {
        html += '<li class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">'
          + '<span class="font-label text-xs uppercase tracking-widest text-secondary-container/50 w-36 shrink-0">'
            + escH(ex.typ)
          + '</span>'
          + '<span class="font-headline text-lg text-secondary-container">' + escH(ex.titel) + '</span>'
          + '<span class="font-body text-secondary-container/60 text-sm sm:ml-auto shrink-0">' + escH(ex.ort) + '</span>'
        + '</li>';
      });

      html += '</ul></div>';
    });

    container.innerHTML = html;
  }

  // ─── INIT ────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    renderExhibitions();

    // Archiv-Link: Toggle zwischen Ein- und Ausblenden
    var archiveLink    = document.getElementById('archive-link');
    var archiveSection = document.getElementById('archive-section');

    if (archiveLink && archiveSection) {
      archiveLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (archiveSection.classList.contains('hidden')) {
          archiveSection.classList.remove('hidden');
          renderArchive();  // nur beim ersten Öffnen rendern
          archiveLink.textContent = 'Archiv ausblenden';
        } else {
          archiveSection.classList.add('hidden');
          // Originaltext wiederherstellen
          archiveLink.innerHTML = 'Archiv 2018&#8202;—&#8202;2024 ansehen';
        }
      });
    }
  });

}());
