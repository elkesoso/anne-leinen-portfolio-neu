// gallery.js – Renderer für Hybrid-Galerie, Slider und Modal
// Nutzt window.AnneLeinen.galleryData aus data.js

(function () {
  'use strict';

  window.AnneLeinen = window.AnneLeinen || {};
  var AL = window.AnneLeinen;

  // ─── MODAL ───────────────────────────────────────────────────────────────

  AL.openModal = function (index) {
    var item = AL.galleryData[index];
    if (!item) return;

    // Reset-Guard: immer mit Werkansicht starten
    var img    = document.getElementById('modal-img');
    var toggle = document.getElementById('modal-view-toggle');
    var btnWork   = document.getElementById('btn-view-work');
    var btnMockup = document.getElementById('btn-view-mockup');

    img.src = item.pfad;
    img.alt = item.titel;
    document.getElementById('modal-titel').textContent       = item.titel;
    document.getElementById('modal-beschreibung').textContent = item.beschreibung;

    // View-Toggle nur zeigen wenn mockupPfad vorhanden und nicht leer
    if (item.mockupPfad) {
      toggle.classList.remove('hidden');
      // Werk-Button als aktiv markieren
      btnWork.classList.add('bg-primary', 'text-on-primary');
      btnWork.classList.remove('border-on-surface-variant', 'text-on-surface-variant');
      btnWork.setAttribute('aria-pressed', 'true');
      btnMockup.classList.remove('bg-primary', 'text-on-primary');
      btnMockup.classList.add('border-on-surface-variant', 'text-on-surface-variant');
      btnMockup.setAttribute('aria-pressed', 'false');

      // Switch-Logik: Werk
      btnWork.onclick = function () {
        img.src = item.pfad;
        btnWork.classList.add('bg-primary', 'text-on-primary');
        btnWork.classList.remove('border-on-surface-variant', 'text-on-surface-variant');
        btnWork.setAttribute('aria-pressed', 'true');
        btnMockup.classList.remove('bg-primary', 'text-on-primary');
        btnMockup.classList.add('border-on-surface-variant', 'text-on-surface-variant');
        btnMockup.setAttribute('aria-pressed', 'false');
      };

      // Switch-Logik: Mockup (lädt erst beim Klick – lazy)
      btnMockup.onclick = function () {
        img.src = item.mockupPfad;
        btnMockup.classList.add('bg-primary', 'text-on-primary');
        btnMockup.classList.remove('border-on-surface-variant', 'text-on-surface-variant');
        btnMockup.setAttribute('aria-pressed', 'true');
        btnWork.classList.remove('bg-primary', 'text-on-primary');
        btnWork.classList.add('border-on-surface-variant', 'text-on-surface-variant');
        btnWork.setAttribute('aria-pressed', 'false');
      };
    } else {
      toggle.classList.add('hidden');
      btnWork.onclick = null;
      btnMockup.onclick = null;
    }

    var overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('opacity-0', 'invisible', 'pointer-events-none', 'is-minimal');
    document.body.style.overflow = 'hidden';
    // Virtuellen History-Schritt setzen → Browser-Zurück schließt Modal, verlässt Seite nicht
    history.pushState({ modalOpen: true }, '');
  };

  // Öffnet das Modal anhand eines Namens-Fragments (Titel oder Pfad-Substring).
  // Robuster als Index-basierter Aufruf – funktioniert auch nach Umsortierung.
  AL.openModalByName = function (name) {
    var found = -1;
    AL.galleryData.forEach(function (item, i) {
      if (found !== -1) return;
      if (item.titel === name || item.pfad.indexOf(name) !== -1) {
        found = i;
      }
    });
    if (found !== -1) {
      AL.openModal(found);
    } else {
      console.warn('openModalByName: kein Eintrag gefunden für "' + name + '"');
    }
  };

  // Flag: verhindert Doppel-Zurück wenn closeModal() und popstate gleichzeitig feuern
  var _modalClosing = false;

  // Interne Schließ-Logik – KEIN history.back(), wird von popstate und direkt aufgerufen
  function _doCloseModal() {
    _modalClosing = false;
    var overlay = document.getElementById('modal-overlay');
    overlay.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    overlay.classList.remove('is-minimal');
    document.body.style.overflow = 'auto';
    document.getElementById('modal-img').src = '';
    if (_lastSliderFocus && typeof _lastSliderFocus.focus === 'function') {
      _lastSliderFocus.focus();
      _lastSliderFocus = null;
    }
  }

  // Öffentliche API: schließt über history.back() wenn ein Modal-State existiert,
  // damit der Browser-Zurück-Button sauber entfernt wird (kein Doppel-Schritt).
  AL.closeModal = function () {
    if (_modalClosing) return;  // Bereits ein history.back() im Gange → ignorieren
    if (history.state && history.state.modalOpen) {
      _modalClosing = true;
      history.back();           // → löst popstate aus → _doCloseModal()
    } else {
      _doCloseModal();          // Kein Modal-State (z.B. nach Seiten-Reload) → direkt
    }
  };

  function initModal() {
    var overlay = document.getElementById('modal-overlay');
    var content = document.getElementById('modal-content');
    var closeBtn = document.getElementById('modal-close');
    var imgEl    = document.getElementById('modal-img');
    if (!overlay) return;

    // Schließen per ╳-Button
    closeBtn.addEventListener('click', AL.closeModal);

    // Schließen per Klick auf dunkles Overlay oder direkt aufs Bild
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === imgEl) AL.closeModal();
    });

    // Ausnahme: Klicks im Inhalt (Buttons, Text) stoppen Propagation → schließen nicht
    content.addEventListener('click', function (e) {
      // Nur stoppen wenn NICHT das Bild selbst geklickt wurde
      if (e.target !== imgEl) e.stopPropagation();
    });

    // Schließen per Escape (Barrierefreiheit)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') AL.closeModal();
    });

    // Browser-Zurück-Button: popstate feuert wenn history.back() ausgelöst wird.
    // _doCloseModal() direkt aufrufen (NICHT AL.closeModal), um history.back()-Loop zu vermeiden.
    // Deep-Link-Schutz: Geister-Modal nach F5 nicht möglich, da history.state nach
    // Reload null ist und das Modal nie auto-geöffnet wird.
    window.addEventListener('popstate', function () {
      _modalClosing = false;  // Flag zurücksetzen (back() ist abgeschlossen)
      var modalOverlay = document.getElementById('modal-overlay');
      if (modalOverlay && !modalOverlay.classList.contains('invisible')) {
        _doCloseModal();      // Modal ist offen → schließen, ohne erneut back() zu rufen
      }
      // Modal bereits geschlossen → nichts tun, Browser navigiert normal
    });
  }

  // ─── HYBRID-GALERIE (artworks.html) ──────────────────────────────────────

  // Escape-Helfer: sicher für onclick-Strings, alt-Attribute und HTML-Inhalt
  function escQ(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function escA(s) { return String(s).replace(/"/g, '&quot;'); }
  function escH(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function initGalleryGrid() {
    // Schutz-Abfrage: Nicht auf Seiten ohne Galerie ausführen (z.B. exhibitions.html).
    // Verhindert unnötige DOM-Suchen und mögliche Folgefehler auf fremden Seiten.
    if (!document.getElementById('highlight-grid')) return;

    var highlightGrid = document.getElementById('highlight-grid');
    var catalogGrid   = document.getElementById('catalog-grid');

    // ── Highlight-Sektion: Bilder 0–2 (groß, Overlay-Design) ────────────────
    if (highlightGrid) {
      var HIGHLIGHT_COUNT = 3;
      var hHtml = '';
      AL.galleryData.slice(0, HIGHLIGHT_COUNT).forEach(function (item, i) {
        var label = i === 0 ? 'Highlight' : 'Kollektion';
        var badge = item.mockupPfad
          ? '<span class="font-label text-xs text-on-surface-variant/70 mt-1 block">🏠 Raumansicht verfügbar</span>'
          : '';
        hHtml += '<div class="gallery-item relative overflow-hidden cursor-pointer group aspect-[4/5] md:aspect-auto md:h-[80vh]"'
               + ' onclick="AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')"'
               + ' role="button" tabindex="0"'
               + ' aria-label="' + escA(item.titel) + ' – Bild vergrößern"'
               + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')">'
               + '<img src="' + item.pfad + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' decoding="async"'
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="absolute inset-0 w-full h-full object-cover bg-secondary-fixed/20 group-hover:scale-[1.02] transition-all duration-500 ease-in-out">'
               + '<div class="absolute bottom-0 left-0 right-0'
               + ' md:bottom-10 md:left-10 md:right-auto md:max-w-xs'
               + ' bg-white/85 backdrop-blur-sm shadow-xl p-6 md:p-8">'
               + '<span class="font-label text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">' + label + '</span>'
               + '<h3 class="font-headline text-2xl md:text-3xl text-on-surface italic">' + escH(item.titel) + '</h3>'
               + badge
               + '</div>'
               + '</div>';
      });
      highlightGrid.innerHTML = hHtml;
    }

    // ── Katalog-Sektion: Index 3 bis Ende (kompaktes Grid, Card-Design) ──────
    // INITIAL_TOTAL = 15: 3 Highlights + 12 Katalog
    // 12 ist durch 2 (Mobile), 3 (Tablet) und 4 (Desktop) teilbar → keine Lücken
    if (catalogGrid) {
      var INITIAL_TOTAL   = 15;
      var HIGHLIGHT_COUNT = 3;
      var catalogItems    = AL.galleryData.slice(HIGHLIGHT_COUNT);
      var cHtml = '';

      catalogItems.forEach(function (item, i) {
        var globalIdx = i + HIGHLIGHT_COUNT;
        var isHidden  = globalIdx >= INITIAL_TOTAL;
        var lazyAttr  = globalIdx >= 5 ? 'loading="lazy" decoding="async"' : 'decoding="async"';
        var hiddenCls = isHidden ? ' hidden' : '';

        cHtml += '<div class="gallery-item cursor-pointer group' + hiddenCls + '"'
               + ' onclick="AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')"'
               + ' role="button" tabindex="0"'
               + ' aria-label="' + escA(item.titel) + ' – Bild vergrößern"'
               + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')">'
               + '<div class="overflow-hidden aspect-[3/4] min-h-[200px]">'
               + '<img src="' + item.thumbnailPfad + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' ' + lazyAttr
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="w-full h-full object-cover bg-secondary-fixed/20 group-hover:scale-105 transition-all duration-500 ease-in-out">'
               + '</div>'
               + '<div class="pt-3">'
               + '<h4 class="font-headline italic text-secondary-fixed text-sm md:text-base leading-tight">' + escH(item.titel) + '</h4>'
               + '</div>'
               + '</div>';
      });

      catalogGrid.innerHTML = cHtml;

      // Werkanzahl anzeigen
      var countEl = document.getElementById('catalog-count');
      if (countEl) countEl.textContent = catalogItems.length + ' Werke';

      // "Mehr ansehen"-Button: nur einblenden wenn versteckte Elemente vorhanden
      var hiddenItems  = catalogGrid.querySelectorAll('.hidden');
      var btnContainer = document.getElementById('btn-mehr-container');
      var btnMehr      = document.getElementById('btn-mehr-ansehen');

      if (hiddenItems.length > 0 && btnContainer) {
        btnContainer.classList.remove('hidden');
        if (btnMehr) {
          btnMehr.addEventListener('click', function () {
            hiddenItems.forEach(function (el) { el.classList.remove('hidden'); });
            btnContainer.classList.add('hidden');
          });
        }
      }
    }
  }

  // ─── SLIDER-MODAL (index.html) ───────────────────────────────────────────

  var _lastSliderFocus = null; // Fokus-Merker für closeModal

  AL.openSliderModal = function (index) {
    var sliderItem = AL.sliderData[index];
    if (!sliderItem) return;

    // Vollständige Infos aus galleryData per Titel-Lookup (für Beschreibung)
    var fullItem = null;
    if (AL.galleryData) {
      AL.galleryData.forEach(function (g) {
        if (g.titel === sliderItem.titel) fullItem = g;
      });
    }

    var img = document.getElementById('modal-img');
    img.src = fullItem ? fullItem.pfad : sliderItem.pfad;
    img.alt = sliderItem.titel;
    document.getElementById('modal-titel').textContent       = sliderItem.titel;
    document.getElementById('modal-beschreibung').textContent =
      fullItem ? fullItem.beschreibung : '';

    // Mockup-Toggle immer ausblenden im Slider-Kontext
    var toggle = document.getElementById('modal-view-toggle');
    if (toggle) toggle.classList.add('hidden');

    // Fokus-Merker setzen (für Rückgabe beim Schließen)
    _lastSliderFocus = document.activeElement;

    var overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    overlay.classList.add('is-minimal');  // minimal = kein Textbereich
    document.body.style.overflow = 'hidden';
    history.pushState({ modalOpen: true }, '');
  };

  // ─── SCROLL-SNAP SLIDER (index.html) ─────────────────────────────────────

  AL.scrollSlider = function (direction) {
    var viewport = document.getElementById('al-slider-viewport');
    if (!viewport) return;
    var slide = viewport.querySelector('.al-slide');
    var slideWidth = slide ? slide.offsetWidth + 16 : 300; // +16px gap
    viewport.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
  };

  function initSlider() {
    var viewport = document.getElementById('al-slider-viewport');
    if (!viewport) return;

    // Slides aus sliderData – Klick öffnet Modal via openSliderModal
    var slidesHtml = '';
    AL.sliderData.forEach(function (item, index) {
      slidesHtml += '<div'
                  + ' class="gallery-item al-slide flex-none w-[85vw] md:w-1/4 h-[350px] md:h-[500px] overflow-hidden cursor-pointer"'
                  + ' style="scroll-snap-align: start;"'
                  + ' role="button"'
                  + ' tabindex="0"'
                  + ' aria-label="' + item.titel + ' – Bild vergrößern"'
                  + ' onclick="AnneLeinen.openSliderModal(' + index + ')"'
                  + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openSliderModal(' + index + ')">'
                  + '<img'
                  + ' src="'     + item.pfad + '"'
                  + ' alt="'     + item.titel + '"'
                  + ' loading="lazy"'
                  + ' decoding="async"'
                  + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
                  + ' class="w-full h-full object-cover bg-secondary-fixed/20 hover:scale-105 transition-all duration-500 ease-in-out"'
                  + '>'
                  + '</div>';
    });
    viewport.innerHTML = slidesHtml;

    // Pfeil-Buttons verdrahten
    var prevBtn = document.getElementById('slider-prev');
    var nextBtn = document.getElementById('slider-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { AL.scrollSlider(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { AL.scrollSlider(1); });
  }

  // ─── SCROLL-ANIMATIONEN (Bento-Grid, Fallback) ───────────────────────────

  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.bento-item').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var items = Array.from(document.querySelectorAll('.bento-item'));
        var pos   = items.indexOf(entry.target);
        var delay = (pos % 3) * 80;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-item').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── INIT ────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    initModal();
    initGalleryGrid();
    initSlider();
    initScrollAnimations();
  });

}());
