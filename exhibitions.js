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

  function getLocationLabel(item) {
    var parts = [];
    if (item.locationName) parts.push(item.locationName);
    if (item.strasse) parts.push(item.strasse);
    if (item.plz || item.stadtteil || item.stadt) {
      var place = item.stadtteil || item.stadt;
      var locationIncludesPlace = item.locationName && place
        && item.locationName.toLowerCase().indexOf(place.toLowerCase()) !== -1;
      if (!locationIncludesPlace) {
        parts.push([item.plz, place].filter(Boolean).join(' '));
      }
    }
    return parts.filter(Boolean).join(', ') || item.ort || '';
  }

  function getDateLabel(item) {
    return item.anzeigeDatum || item.datum || '';
  }

  function getDateTimeLabel(item) {
    var dateLabel = getDateLabel(item);
    return dateLabel + (item.uhrzeit ? ', ' + item.uhrzeit : '');
  }

  function getSortValue(item, fallbackIndex) {
    if (typeof item.sortOrder === 'number') return item.sortOrder;
    if (item.datumVon) return Number(item.datumVon.replace(/-/g, ''));
    return fallbackIndex;
  }

  // ─── AKTUELLE AUSSTELLUNGEN ───────────────────────────────────────────────
  // Rendert alle Einträge mit archiv: false.
  // Jede zweite Ausstellung ist gespiegelt (Bild rechts statt links).

  function renderExhibitions() {
    var container = document.getElementById('exhibitions-list');
    if (!container) return;
    var data = AL.exhibitionData || [];
    var current = data.filter(function (e) { return !e.archiv; }).sort(function (a, b) {
      return getSortValue(a, 0) - getSortValue(b, 0);
    });

    var html = '';
    current.forEach(function (item, i) {
      // Abwechselnde Richtung: gerade = Bild links (flex-row), ungerade = Bild rechts (flex-row-reverse)
      var flexDir = i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row';

      // Bildblock – nicht klickbar (keine Lightbox auf dieser Seite)
      var imgBlock = '';
      if (item.bildPfad) {
        imgBlock = '<div class="w-full md:w-7/12 aspect-[4/5] overflow-hidden" style="cursor:default;">'
          + '<img class="w-full h-full object-contain"'
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

      var datumStr = getDateTimeLabel(item);
      var locationLabel = getLocationLabel(item);

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
                + '<p class="font-headline text-xl text-secondary-container">' + escH(locationLabel) + '</p>'
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

  // ─── AUSSTELLUNGEN 2025 (Monats-Archiv) ──────────────────────────────────
  // Rendert alle archiv:true Einträge, gruppiert nach Monat, aufsteigend sortiert.

  var MONATE_DE = {
    'Januar': 1, 'Februar': 2, 'März': 3, 'April': 4,
    'Mai': 5, 'Juni': 6, 'Juli': 7, 'August': 8,
    'September': 9, 'Oktober': 10, 'November': 11, 'Dezember': 12
  };
  var MONATE_DE_BY_NUMBER = [
    '',
    'Januar', 'Februar', 'März', 'April',
    'Mai', 'Juni', 'Juli', 'August',
    'September', 'Oktober', 'November', 'Dezember'
  ];

  function parseIsoMonth(dateString) {
    var match = /^(\d{4})-(\d{2})-\d{2}$/.exec(dateString || '');
    if (!match) return null;
    var year = parseInt(match[1], 10);
    var monthNum = parseInt(match[2], 10);
    return {
      sortKey: match[1] + '-' + match[2],
      label: MONATE_DE_BY_NUMBER[monthNum] + ' ' + year,
      year: year
    };
  }

  function parseDatum(datumsStr) {
    var parts = (datumsStr || '').split(' ');
    var year = 0, monthNum = 0, monthName = '';
    parts.forEach(function (p) {
      var y = parseInt(p, 10);
      if (y > 2000) year = y;
      if (MONATE_DE[p]) { monthName = p; monthNum = MONATE_DE[p]; }
    });
    var sortKey = year + '-' + (monthNum < 10 ? '0' : '') + monthNum;
    return { sortKey: sortKey, label: monthName + ' ' + year, year: year };
  }

  function getArchiveMonthInfo(item) {
    return parseIsoMonth(item.datumVon) || parseDatum(item.datum);
  }

  function renderArchive() {
    var container = document.getElementById('archive-list');
    if (!container) return;
    var data = AL.exhibitionData || [];
    // Nur archiv:true Einträge aus 2025 (archiv:false = oben als Bild-Blöcke, gehören nicht hierher)
    var archive = data.filter(function (e) {
      var info = getArchiveMonthInfo(e);
      return e.archiv && info.year === 2025;
    }).sort(function (a, b) {
      return getSortValue(b, 0) - getSortValue(a, 0);
    });

    // Nach Monat gruppieren
    var byMonth = {};
    var monthKeys = [];
    archive.forEach(function (ex) {
      var info = getArchiveMonthInfo(ex);
      if (!byMonth[info.sortKey]) {
        byMonth[info.sortKey] = { label: info.label, items: [] };
        monthKeys.push(info.sortKey);
      }
      byMonth[info.sortKey].items.push(ex);
    });

    // Absteigend (neueste zuerst: Oktober → August → Juni → Mai)
    monthKeys.sort().reverse();

    var html = '';
    monthKeys.forEach(function (key) {
      var group = byMonth[key];
      // Monats-Header mit goldenem Akzentbalken
      html += '<div class="mb-10">'
        + '<div class="flex items-center gap-3 mb-5">'
          + '<div style="width:2px;height:1.25rem;background-color:rgba(163,141,91,0.75);flex-shrink:0;"></div>'
          + '<span class="font-label text-xs uppercase tracking-[0.25em]" style="color:rgba(163,141,91,0.9);">' + escH(group.label) + '</span>'
        + '</div>'
        + '<ul class="space-y-4 pl-5">';

      group.items.forEach(function (ex) {
        var locationLabel = getLocationLabel(ex);
        html += '<li class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">'
          + '<span class="font-label text-xs uppercase tracking-widest text-secondary-container/50 w-36 shrink-0">' + escH(ex.typ) + '</span>'
          + '<span class="font-headline text-lg text-secondary-container">' + escH(ex.titel) + '</span>'
          + '<span class="font-body text-secondary-container/60 text-sm sm:ml-auto shrink-0">' + escH(locationLabel) + '</span>'
        + '</li>';
      });

      html += '</ul></div>';
    });

    container.innerHTML = html;
  }

  // ─── INIT ────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    renderExhibitions();
    renderArchive();  // direkt rendern – kein Toggle mehr
  });

}());
