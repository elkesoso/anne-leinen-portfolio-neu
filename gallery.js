// gallery.js – Renderer für Hybrid-Galerie, Slider und Modal
// Nutzt window.AnneLeinen.galleryData aus data.js

(function () {
  'use strict';

  window.AnneLeinen = window.AnneLeinen || {};
  var AL = window.AnneLeinen;

  // ─── MODAL ───────────────────────────────────────────────────────────────

  var _currentGalleryIndex = -1;

  function renderDescriptionHtml(description) {
    var text = String(description || '').trim();
    if (!text) return '';

    var details = '';
    var detailsIndex = text.indexOf('Mixed Media:');
    if (detailsIndex !== -1) {
      details = text.slice(detailsIndex).trim();
      text = text.slice(0, detailsIndex).trim();
    }

    var sentences = text.match(/[^.!?]+[.!?]+(?:["“”„])?/g) || (text ? [text] : []);
    var bodyHtml = '';
    for (var i = 0; i < sentences.length; i += 2) {
      var paragraph = sentences.slice(i, i + 2).join(' ').trim();
      if (paragraph) {
        bodyHtml += '<p>' + escH(paragraph) + '</p>';
      }
    }

    if (details) {
      var parts = details.split('|').map(function (part) { return part.trim(); }).filter(Boolean);
      var detailsHtml = parts.map(function (part) {
        return '<span class="block">' + escH(part) + '</span>';
      }).join('');
      bodyHtml += '<div class="border border-secondary-fixed/20 bg-secondary-fixed/5 px-4 py-3">'
               + '<span class="font-label text-[10px] uppercase tracking-[0.28em] text-primary block mb-2">Werkdaten</span>'
               + '<div class="font-body text-[13px] leading-relaxed text-on-surface-variant">' + detailsHtml + '</div>'
               + '</div>';
    }

    return bodyHtml;
  }

  function stripDescriptionDetails(description) {
    var text = String(description || '').trim();
    var detailsIndex = text.indexOf('Mixed Media:');
    return detailsIndex !== -1 ? text.slice(0, detailsIndex).trim() : text;
  }

  function truncateAtWord(text, maxLength) {
    text = String(text || '').trim();
    if (text.length <= maxLength) return text;

    var truncated = text.slice(0, maxLength);
    var lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 260) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.replace(/[,.!?;:]+$/, '') + '...';
  }

  function setMobileDescription(container, description) {
    var fullHtml = renderDescriptionHtml(description);
    var fullText = stripDescriptionDetails(description);
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;

    container.classList.remove('is-collapsed', 'is-expanded');
    if (!isMobile || fullText.length <= 360) {
      container.innerHTML = fullHtml;
      return;
    }

    var shortHtml = renderDescriptionHtml(truncateAtWord(fullText, 350));
    container.classList.add('is-collapsed');
    container.innerHTML = '<div class="modal-description-copy">' + shortHtml + '</div>'
                        + '<button type="button" class="modal-description-toggle">Mehr lesen</button>';

    var copy = container.querySelector('.modal-description-copy');
    var button = container.querySelector('.modal-description-toggle');
    if (!copy || !button) return;

    button.addEventListener('click', function () {
      if (container.classList.contains('is-expanded')) {
        copy.style.maxHeight = copy.offsetHeight + 'px';
        window.requestAnimationFrame(function () {
          copy.innerHTML = shortHtml;
          container.classList.remove('is-expanded');
          container.classList.add('is-collapsed');
          button.textContent = 'Mehr lesen';
          copy.style.maxHeight = '';
        });
        return;
      }

      var startHeight = copy.offsetHeight;
      copy.style.maxHeight = startHeight + 'px';
      copy.innerHTML = fullHtml;
      container.classList.remove('is-collapsed');
      container.classList.add('is-expanded');
      button.textContent = 'Weniger anzeigen';

      window.requestAnimationFrame(function () {
        copy.style.maxHeight = copy.scrollHeight + 'px';
      });
    });
  }

  function renderArtworkModal(index) {
    var item = AL.galleryData[index];
    if (!item) return false;

    _currentGalleryIndex = index;

    var img     = document.getElementById('modal-img');
    var content = document.getElementById('modal-content');
    var toggle  = document.getElementById('modal-view-toggle');
    var btnWork   = document.getElementById('btn-view-work');
    var btnMockup = document.getElementById('btn-view-mockup');

    img.classList.remove('object-cover', 'bg-white', 'bg-surface');
    img.classList.add('object-contain');

    content.style.opacity = '0';
    img.onload = function () {
      content.style.opacity = '1';
      img.onload = null;
    };

    img.src = item.pfad;
    img.alt = item.titel;

    if (img.complete && img.naturalWidth > 0) {
      content.style.opacity = '1';
    }

    document.getElementById('modal-titel').textContent = item.titel;
    setMobileDescription(document.getElementById('modal-beschreibung'), item.beschreibung);

    if (toggle) toggle.classList.add('hidden');
    if (btnWork) btnWork.onclick = null;
    if (btnMockup) btnMockup.onclick = null;

    return true;
  }

  // Das Modal zeigt immer das Originalbild mit dem passenden Werktext.
  AL.openModal = function (index, startView) {
    if (!renderArtworkModal(index)) return;

    var overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('is-minimal');
    overlay.classList.add('is-open');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflowY = 'hidden';
    // Virtuellen History-Schritt setzen → Browser-Zurück schließt Modal, verlässt Seite nicht
    history.pushState({ modalOpen: true }, '');
  };

  // Öffnet das Modal anhand eines Namens-Fragments (Titel oder Pfad-Substring).
  // Robuster als Index-basierter Aufruf – funktioniert auch nach Umsortierung.
  // startView: 'work' (Standard) oder 'mockup'
  AL.openModalByName = function (name, startView) {
    var found = -1;
    AL.galleryData.forEach(function (item, i) {
      if (found !== -1) return;
      if (item.titel === name || item.pfad.indexOf(name) !== -1) {
        found = i;
      }
    });
    if (found !== -1) {
      AL.openModal(found, startView);
    } else {
      console.warn('openModalByName: kein Eintrag gefunden für "' + name + '"');
    }
  };

  AL.navigateArtworkModal = function (direction) {
    if (!AL.galleryData || !AL.galleryData.length || _currentGalleryIndex < 0) return;
    var total = AL.galleryData.length;
    var nextIndex = (_currentGalleryIndex + direction + total) % total;
    renderArtworkModal(nextIndex);
  };

  // Flag: verhindert Doppel-Zurück wenn closeModal() und popstate gleichzeitig feuern
  var _modalClosing = false;

  // Interne Schließ-Logik – KEIN history.back(), wird von popstate und direkt aufgerufen
  function _doCloseModal() {
    _modalClosing = false;
    var overlay  = document.getElementById('modal-overlay');
    var content  = document.getElementById('modal-content');
    var imgEl    = document.getElementById('modal-img');
    // Content zuerst ausblenden (0.3s Transition)
    content.style.opacity = '0';
    // Overlay erst nach Content-Fade verstecken (300ms Fade + 50ms Puffer)
    setTimeout(function () {
      overlay.classList.remove('is-open', 'is-minimal');
      document.documentElement.classList.remove('modal-open');
      imgEl.src = '';
    }, 350);
    document.body.style.overflowY = '';
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
    var modalPrevBtn = document.getElementById('modal-slider-prev');
    var modalNextBtn = document.getElementById('modal-slider-next');
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
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (overlay.classList.contains('is-minimal')) {
          AL.navigateSliderModal(-1);
        } else {
          AL.navigateArtworkModal(-1);
        }
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (overlay.classList.contains('is-minimal')) {
          AL.navigateSliderModal(1);
        } else {
          AL.navigateArtworkModal(1);
        }
      }
    });

    if (modalPrevBtn) modalPrevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (overlay.classList.contains('is-minimal')) {
        AL.navigateSliderModal(-1);
      } else {
        AL.navigateArtworkModal(-1);
      }
    });
    if (modalNextBtn) modalNextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (overlay.classList.contains('is-minimal')) {
        AL.navigateSliderModal(1);
      } else {
        AL.navigateArtworkModal(1);
      }
    });

    // Browser-Zurück-Button: popstate feuert wenn history.back() ausgelöst wird.
    // _doCloseModal() direkt aufrufen (NICHT AL.closeModal), um history.back()-Loop zu vermeiden.
    // Deep-Link-Schutz: Geister-Modal nach F5 nicht möglich, da history.state nach
    // Reload null ist und das Modal nie auto-geöffnet wird.
    window.addEventListener('popstate', function () {
      _modalClosing = false;  // Flag zurücksetzen (back() ist abgeschlossen)
      var modalOverlay = document.getElementById('modal-overlay');
      if (modalOverlay && modalOverlay.classList.contains('is-open')) {
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
        var highlightSrc = item.mockupPfad || item.pfad;
        var badge = item.meta
          ? '<span class="font-label text-xs md:text-xs leading-snug uppercase tracking-[1.5px] md:tracking-normal text-on-surface-variant/70 mt-2 md:mt-1 block text-left">' + escH(item.meta) + '</span>'
          : '';
        hHtml += '<div class="gallery-item relative overflow-visible md:overflow-hidden cursor-pointer group md:aspect-[3/2] bg-surface md:bg-transparent"'
               + ' onclick="AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')"'
               + ' role="button" tabindex="0"'
               + ' aria-label="' + escA(item.titel) + ' – Bild vergrößern"'
               + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\')">'
               + '<div class="relative aspect-[3/2] overflow-hidden img-gold-placeholder md:absolute md:inset-0">'
               + '<img src="' + highlightSrc + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' decoding="async"'
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500 ease-in-out">'
               + '</div>'
               + '<div class="relative flex items-end justify-between gap-2 pt-6 px-[10%] pb-8 bg-surface'
               + ' md:absolute md:mt-0 md:block md:px-10 md:py-8'
               + ' md:bottom-10 md:left-10 md:max-w-xs'
               + ' md:bg-white/85 md:backdrop-blur-sm md:shadow-xl">'
               + '<div class="min-w-0 flex-1">'
               + '<h3 class="font-headline text-xl md:text-3xl leading-tight text-on-surface italic text-left">' + escH(item.titel) + '</h3>'
               + badge
               + '</div>'
               + '<div class="shrink-0 flex justify-end md:justify-start md:mt-5">'
               + '<span class="w-fit font-label text-[11px] tracking-normal uppercase text-primary bg-secondary-fixed/10 px-3 md:px-5 py-2.5 rounded-[20px] whitespace-nowrap">Mehr erfahren</span>'
               + '</div>'
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
               + '<div class="relative overflow-hidden aspect-[3/4] min-h-[200px] img-gold-placeholder">'
               + '<img src="' + item.thumbnailPfad + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' ' + lazyAttr
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-in-out">'
               + '<div class="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-white rounded-full px-3 py-1 border border-white/20 group-hover:bg-black/50 transition-colors duration-300">'
               + '<span class="text-xs">Groß ansehen</span>'
               + '</div>'
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
  var _currentSliderIndex = -1;

  function renderSliderModal(index) {
    var sliderItem = AL.sliderData[index];
    if (!sliderItem) return false;

    _currentSliderIndex = index;

    // Vollständige Infos aus galleryData per Titel-Lookup (für Beschreibung)
    var fullItem = null;
    if (AL.galleryData) {
      AL.galleryData.forEach(function (g) {
        if (g.titel === sliderItem.titel) fullItem = g;
      });
    }

    var img     = document.getElementById('modal-img');
    var content = document.getElementById('modal-content');

    // Inhalt verstecken bis Bild geladen (kein weißer Kasten-Blitz)
    content.style.opacity = '0';
    img.onload = function () { content.style.opacity = '1'; img.onload = null; };

    img.src = fullItem ? fullItem.pfad : sliderItem.pfad;
    img.alt = sliderItem.titel;

    if (img.complete && img.naturalWidth > 0) content.style.opacity = '1';

    document.getElementById('modal-titel').textContent       = sliderItem.titel;
    document.getElementById('modal-beschreibung').textContent =
      fullItem ? fullItem.beschreibung : '';

    // Mockup-Toggle immer ausblenden im Slider-Kontext
    var toggle = document.getElementById('modal-view-toggle');
    if (toggle) toggle.classList.add('hidden');

    return true;
  }

  AL.openSliderModal = function (index) {
    if (!renderSliderModal(index)) return;

    // Fokus-Merker setzen (für Rückgabe beim Schließen)
    _lastSliderFocus = document.activeElement;

    var overlay = document.getElementById('modal-overlay');
    overlay.classList.add('is-open', 'is-minimal');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflowY = 'hidden';
    history.pushState({ modalOpen: true }, '');
  };

  AL.navigateSliderModal = function (direction) {
    if (!AL.sliderData || !AL.sliderData.length || _currentSliderIndex < 0) return;
    var total = AL.sliderData.length;
    var nextIndex = (_currentSliderIndex + direction + total) % total;
    renderSliderModal(nextIndex);
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
                  + ' class="gallery-item al-slide flex-none w-[85vw] md:w-1/4 h-[350px] md:h-[500px] overflow-hidden cursor-pointer img-gold-placeholder"'
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
                  + ' class="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"'
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
