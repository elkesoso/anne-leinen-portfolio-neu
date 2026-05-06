// gallery.js – Renderer für Hybrid-Galerie, Slider und Modal
// Nutzt window.AnneLeinen.galleryData aus data.js

(function () {
  'use strict';

  window.AnneLeinen = window.AnneLeinen || {};
  var AL = window.AnneLeinen;

  // ─── MODAL ───────────────────────────────────────────────────────────────

  var _currentGalleryIndex = -1;
  var _currentModalScope = 'all';

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

  function getModalScopeIndices(scope) {
    var total = AL.galleryData ? AL.galleryData.length : 0;
    if (scope === 'highlight') return getHighlightIndices();
    if (scope === 'catalog') {
      var catalogGrid = document.getElementById('catalog-grid');
      if (catalogGrid) {
        var visibleCatalogItems = catalogGrid.querySelectorAll('[data-catalog-item="true"]:not(.hidden)');
        var visibleIndices = Array.prototype.map.call(visibleCatalogItems, function (item) {
          return parseInt(item.getAttribute('data-gallery-index'), 10);
        }).filter(function (index) {
          return !isNaN(index) && index >= 0 && index < total;
        });
        if (visibleIndices.length) return visibleIndices;
      }

      return getCatalogIndices().filter(function (index) { return index >= 0 && index < total; });
    }

    var allIndices = [];
    for (var j = 0; j < total; j++) allIndices.push(j);
    return allIndices;
  }

  function updateArtworkNavigationState() {
    var scopeIndices = getModalScopeIndices(_currentModalScope);
    var currentPosition = scopeIndices.indexOf(_currentGalleryIndex);
    var isBoundedScope = _currentModalScope === 'highlight' || _currentModalScope === 'catalog';
    var atStart = isBoundedScope && currentPosition <= 0;
    var atEnd = isBoundedScope && currentPosition >= scopeIndices.length - 1;
    var prevButtons = [
      document.getElementById('modal-slider-prev'),
      document.getElementById('modal-desktop-prev')
    ];
    var nextButtons = [
      document.getElementById('modal-slider-next'),
      document.getElementById('modal-desktop-next')
    ];

    function setDisabled(buttons, disabled) {
      buttons.forEach(function (button) {
        if (!button) return;
        button.disabled = disabled;
        button.setAttribute('aria-hidden', disabled ? 'true' : 'false');
        button.classList.toggle('modal-nav-disabled', disabled);
      });
    }

    setDisabled(prevButtons, atStart);
    setDisabled(nextButtons, atEnd);
  }

  function renderArtworkModal(index, scope) {
    var item = AL.galleryData[index];
    if (!item) return false;

    _currentGalleryIndex = index;
    if (scope) _currentModalScope = scope;

    var img     = document.getElementById('modal-img');
    var content = document.getElementById('modal-content');
    var toggle  = document.getElementById('modal-view-toggle');
    var btnWork   = document.getElementById('btn-view-work');
    var btnMockup = document.getElementById('btn-view-mockup');

    img.classList.remove('object-contain', 'bg-white', 'bg-surface');
    img.classList.add('object-cover', 'object-center');

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
    updateArtworkNavigationState();

    return true;
  }

  // Das Modal zeigt immer das Originalbild mit dem passenden Werktext.
  AL.openModal = function (index, startView, scope) {
    _currentModalScope = scope || 'all';
    if (!renderArtworkModal(index, _currentModalScope)) return;

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
  AL.openModalByName = function (name, startView, scope) {
    var found = -1;
    AL.galleryData.forEach(function (item, i) {
      if (found !== -1) return;
      if (item.titel === name || item.pfad.indexOf(name) !== -1) {
        found = i;
      }
    });
    if (found !== -1) {
      AL.openModal(found, startView, scope);
    } else {
      console.warn('openModalByName: kein Eintrag gefunden für "' + name + '"');
    }
  };

  AL.navigateArtworkModal = function (direction) {
    if (!AL.galleryData || !AL.galleryData.length || _currentGalleryIndex < 0) return;
    var scopeIndices = getModalScopeIndices(_currentModalScope);
    if (!scopeIndices.length) return;

    var currentPosition = scopeIndices.indexOf(_currentGalleryIndex);
    if (currentPosition === -1) currentPosition = 0;
    if (_currentModalScope === 'highlight' || _currentModalScope === 'catalog') {
      if (direction < 0 && currentPosition === 0) return;
      if (direction > 0 && currentPosition === scopeIndices.length - 1) return;
    }

    var nextPosition = (currentPosition + direction + scopeIndices.length) % scopeIndices.length;
    renderArtworkModal(scopeIndices[nextPosition], _currentModalScope);
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
    var desktopPrevBtn = document.getElementById('modal-desktop-prev');
    var desktopNextBtn = document.getElementById('modal-desktop-next');
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
    if (desktopPrevBtn) desktopPrevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      AL.navigateArtworkModal(-1);
    });
    if (desktopNextBtn) desktopNextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      AL.navigateArtworkModal(1);
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

  var MOOD_BY_TITLE = {
    'fire dance': 'dynamik',
    'self-confidence in color': 'dynamik',
    'spring fever': 'dynamik',
    'infinite future': 'dynamik',
    'life energy': 'dynamik',
    'utopia of rhythm': 'dynamik',
    'dance of tides': 'stille',
    'embedded': 'stille',
    'synapse deep blue remstage': 'stille',
    'tightrope walking': 'stille',
    'visibility': 'stille',
    'solyra – deep yet light': 'stille',
    'aurora bloom': 'weite',
    'awakening in pastel': 'weite',
    'feminine galaxy': 'weite',
    'her current': 'weite',
    'her momentum': 'weite',
    'violet tale': 'weite',
    'voices in color': 'weite',
    'whispers of the sea': 'materie',
    'crystalline breath': 'materie',
    'rainbow home': 'materie',
    'metamorphosis': 'materie',
    'epizentrum': 'materie'
  };

  var MOOD_DESCRIPTIONS = {
    dynamik: 'Energie in Farbe und Form. Diese Werke fangen den Moment der Bewegung ein.',
    stille: 'Ein Rückzug in die Tiefe. Getragen von kühlen Blau- und Erdtönen.',
    weite: 'Sphärische Welten ohne Grenzen. Raum für Träume und Visionen.',
    materie: 'Die Haptik des Seins. Werke, die die raue Schönheit von Strukturen zelebrieren.'
  };

  function normalizeTitle(title) {
    return String(title || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function getArtworkMood(item) {
    return (item && item.mood) || MOOD_BY_TITLE[normalizeTitle(item && item.titel)] || '';
  }

  function getArtworkSortOrder(index) {
    var item = AL.galleryData && AL.galleryData[index];
    if (item && typeof item.sortOrder === 'number') return item.sortOrder;
    return (index + 1) * 10;
  }

  function sortArtworkIndices(indices) {
    return indices.slice().sort(function (a, b) {
      var orderDiff = getArtworkSortOrder(a) - getArtworkSortOrder(b);
      if (orderDiff !== 0) return orderDiff;
      return a - b;
    });
  }

  function getAllArtworkIndices() {
    var total = AL.galleryData ? AL.galleryData.length : 0;
    var indices = [];
    for (var i = 0; i < total; i++) indices.push(i);
    return sortArtworkIndices(indices);
  }

  function getHighlightIndices() {
    var total = AL.galleryData ? AL.galleryData.length : 0;
    var indices = [];
    for (var i = 0; i < total; i++) {
      if (AL.galleryData[i] && AL.galleryData[i].isHighlight) indices.push(i);
    }
    if (indices.length) return sortArtworkIndices(indices);
    return getAllArtworkIndices().slice(0, Math.min(3, total));
  }

  function getCatalogIndices() {
    var highlightLookup = {};
    getHighlightIndices().forEach(function (index) { highlightLookup[index] = true; });

    return getAllArtworkIndices().filter(function (index) {
      return !highlightLookup[index];
    });
  }

  function initMoodFilters(catalogGrid, countEl) {
    var filterBar = document.getElementById('mood-filter-bar');
    var moodDescription = document.getElementById('mood-description');
    if (!filterBar || !moodDescription || !catalogGrid) return;

    var filterButtons = Array.prototype.slice.call(filterBar.querySelectorAll('[data-mood-filter]'));

    function updateCount() {
      if (!countEl) return;
      var visibleItems = catalogGrid.querySelectorAll('[data-catalog-item]:not(.hidden)').length;
      countEl.textContent = visibleItems + ' Werke';
    }

    function setActiveButton(activeMood) {
      filterButtons.forEach(function (button) {
        var isActive = button.getAttribute('data-mood-filter') === activeMood;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    function applyMoodFilter(activeMood) {
      setActiveButton(activeMood);
      catalogGrid.classList.add('is-fading');
      moodDescription.classList.add('is-fading');

      setTimeout(function () {
        var items = catalogGrid.querySelectorAll('[data-catalog-item]');
        items.forEach(function (item) {
          if (activeMood === 'all') {
            item.classList.remove('hidden');
          } else {
            item.classList.toggle('hidden', item.getAttribute('data-mood') !== activeMood);
          }
        });

        if (activeMood === 'all') {
          moodDescription.textContent = '';
          moodDescription.classList.add('hidden');
        } else {
          moodDescription.textContent = MOOD_DESCRIPTIONS[activeMood] || '';
          moodDescription.classList.remove('hidden');
        }

        updateCount();

        window.requestAnimationFrame(function () {
          catalogGrid.classList.remove('is-fading');
          moodDescription.classList.remove('is-fading');
        });
      }, 180);
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        applyMoodFilter(button.getAttribute('data-mood-filter') || 'all');
      });
    });

    updateCount();
  }

  function initGalleryGrid() {
    // Schutz-Abfrage: Nicht auf Seiten ohne Galerie ausführen (z.B. exhibitions.html).
    // Verhindert unnötige DOM-Suchen und mögliche Folgefehler auf fremden Seiten.
    if (!document.getElementById('highlight-grid')) return;

    var highlightGrid = document.getElementById('highlight-grid');
    var catalogGrid   = document.getElementById('catalog-grid');

    // ── Highlight-Sektion: isHighlight=true, sortiert ueber sortOrder ────────
    if (highlightGrid) {
      var hHtml = '';
      getHighlightIndices().forEach(function (globalIdx) {
        var item = AL.galleryData[globalIdx];
        var highlightSrc = item.mockupPfad || item.pfad;
        var badge = item.meta
          ? '<span class="font-label text-xs md:text-[11px] leading-snug uppercase tracking-[1.5px] md:tracking-[2px] text-on-surface-variant/70 mt-2 md:mt-3 block text-left">' + escH(item.meta) + '</span>'
          : '';
        hHtml += '<div class="gallery-item relative overflow-visible cursor-pointer group md:aspect-[3/2] bg-surface md:bg-transparent"'
               + ' onclick="AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\', null, \'highlight\')"'
               + ' role="button" tabindex="0"'
               + ' aria-label="' + escA(item.titel) + ' – Bild vergrößern"'
               + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\', null, \'highlight\')">'
               + '<div class="relative aspect-[3/2] overflow-hidden img-gold-placeholder md:absolute md:inset-0">'
               + '<img src="' + highlightSrc + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' decoding="async"'
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500 ease-in-out">'
               + '</div>'
               + '<div class="relative flex items-end justify-between gap-2 pt-6 px-[10%] pb-8 bg-surface'
               + ' md:absolute md:block md:left-0 md:bottom-0 md:w-[30%] md:min-w-[240px] md:max-w-[340px] md:translate-y-1/2'
               + ' md:bg-white/88 md:backdrop-blur-sm md:shadow-[0_18px_45px_rgba(34,25,26,0.18)] md:p-6">'
               + '<div class="min-w-0 flex-1">'
               + '<h3 class="font-headline text-xl md:text-[20px] leading-tight text-on-surface italic text-left">' + escH(item.titel) + '</h3>'
               + badge
               + '</div>'
               + '<div class="mt-5 flex justify-end md:justify-start">'
               + '<span class="w-fit font-label text-[11px] tracking-normal uppercase text-primary bg-secondary-fixed/15 border border-secondary-fixed/30 px-4 py-2 rounded-[20px] whitespace-nowrap transition-colors duration-300 group-hover:bg-secondary-fixed/25">Mehr erfahren</span>'
               + '</div>'
               + '</div>'
               + '</div>';
      });
      highlightGrid.innerHTML = hHtml;
    }

    // ── Katalog-Sektion: alle Nicht-Highlights, sortiert ueber sortOrder ─────
    if (catalogGrid) {
      var catalogIndices = getCatalogIndices();
      var cHtml = '';

      catalogIndices.forEach(function (globalIdx) {
        var item = AL.galleryData[globalIdx];
        var lazyAttr  = globalIdx >= 5 ? 'loading="lazy" decoding="async"' : 'decoding="async"';
        var mood      = getArtworkMood(item);

        cHtml += '<div class="gallery-item cursor-pointer group"'
               + ' data-catalog-item="true"'
               + ' data-gallery-index="' + globalIdx + '"'
               + ' data-mood="' + escA(mood) + '"'
               + ' onclick="AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\', null, \'catalog\')"'
               + ' role="button" tabindex="0"'
               + ' aria-label="' + escA(item.titel) + ' – Bild vergrößern"'
               + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \')AnneLeinen.openModalByName(\'' + escQ(item.titel) + '\', null, \'catalog\')">'
               + '<div class="relative overflow-hidden aspect-[3/4] min-h-[200px] img-gold-placeholder">'
               + '<img src="' + item.thumbnailPfad + '"'
               + ' alt="' + escA(item.titel) + '"'
               + ' ' + lazyAttr
               + ' style="will-change:transform,opacity;backface-visibility:hidden;"'
               + ' class="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-in-out">'
               + '<div class="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#6f5a4f]/88 backdrop-blur-md text-surface rounded-[20px] px-4 py-2 border border-secondary-fixed/25 group-hover:bg-[#5b473d] transition-colors duration-300">'
               + '<span class="font-label text-[11px] uppercase tracking-normal whitespace-nowrap">Mehr erfahren</span>'
               + '</div>'
               + '</div>'
               + '<div class="pt-3">'
               + '<h4 class="font-headline italic text-secondary-fixed text-sm md:text-base leading-tight">' + escH(item.titel) + '</h4>'
               + '</div>'
               + '</div>';
      });

      catalogGrid.innerHTML = cHtml;

      var countEl = document.getElementById('catalog-count');
      initMoodFilters(catalogGrid, countEl);
    }
  }

  // ─── SLIDER-MODAL (index.html) ───────────────────────────────────────────

  var _lastSliderFocus = null; // Fokus-Merker für closeModal
  var _currentSliderIndex = -1;
  var _sliderItems = null;

  function findHomeSection(id) {
    var sections = AL.pageData && AL.pageData.home && AL.pageData.home.sections;
    if (!sections) return null;
    return sections.find(function (section) {
      return section.id === id && section.isVisible !== false;
    }) || null;
  }

  function getSliderItems() {
    if (_sliderItems) return _sliderItems;

    var section = findHomeSection('featured-artworks');
    var artworkIds = section && section.artworkIds;
    var galleryData = AL.galleryData || [];

    if (Array.isArray(artworkIds) && artworkIds.length) {
      var byId = {};
      galleryData.forEach(function (item) {
        if (item && item.id) byId[item.id] = item;
      });

      _sliderItems = artworkIds.map(function (id) {
        var item = byId[id];
        if (!item) return null;
        return {
          id: item.id,
          titel: item.titel,
          pfad: item.thumbnailPfad || item.pfad,
          fullItem: item
        };
      }).filter(Boolean);

      if (_sliderItems.length) return _sliderItems;
    }

    _sliderItems = (AL.sliderData || []).map(function (item) {
      var fullItem = null;
      galleryData.forEach(function (galleryItem) {
        if (galleryItem.titel === item.titel) fullItem = galleryItem;
      });
      return {
        titel: item.titel,
        pfad: item.pfad,
        fullItem: fullItem
      };
    });

    return _sliderItems;
  }

  function renderSliderModal(index) {
    var sliderItems = getSliderItems();
    var sliderItem = sliderItems[index];
    if (!sliderItem) return false;

    _currentSliderIndex = index;
    var fullItem = sliderItem.fullItem;

    var img     = document.getElementById('modal-img');
    var content = document.getElementById('modal-content');

    img.classList.remove('object-contain', 'bg-white', 'bg-surface');
    img.classList.add('object-cover', 'object-center');

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
    var sliderItems = getSliderItems();
    if (!sliderItems.length || _currentSliderIndex < 0) return;
    var total = sliderItems.length;
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

    var sliderItems = getSliderItems();

    // Slides aus pageData.featured-artworks.artworkIds, Fallback: sliderData
    var slidesHtml = '';
    sliderItems.forEach(function (item, index) {
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
