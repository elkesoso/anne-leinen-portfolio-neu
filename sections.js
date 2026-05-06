// sections.js - CMS-vorbereitete Renderer fuer einzelne Seiten-Sektionen
window.AnneLeinen = window.AnneLeinen || {};

(function () {
  var AL = window.AnneLeinen;

  function escH(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escA(value) {
    return escH(value).replace(/"/g, '&quot;');
  }

  function findHomeSection(id) {
    var sections = AL.pageData && AL.pageData.home && AL.pageData.home.sections;
    if (!sections) return null;
    return sections.find(function (section) {
      return section.id === id && section.isVisible !== false;
    }) || null;
  }

  function renderAvatar(item) {
    if (item.image && item.image.src) {
      return '<img src="' + escA(item.image.src) + '"'
        + ' alt="' + escA(item.image.alt || item.name) + '"'
        + ' class="w-16 h-16 rounded-full object-cover object-top mx-auto mb-4"'
        + ' loading="lazy"'
        + ' width="' + escA(item.image.width || 64) + '"'
        + ' height="' + escA(item.image.height || 64) + '"/>';
    }

    return '<div class="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mx-auto mb-4">'
      + '<span class="font-headline text-2xl text-secondary-fixed">' + escH(item.initials || String(item.name || '').charAt(0)) + '</span>'
      + '</div>';
  }

  function renderQuoteParagraphs(quote) {
    var paragraphs = Array.isArray(quote) ? quote : [quote];
    return paragraphs.map(function (paragraph) {
      return '<p>' + escH(paragraph) + '</p>';
    }).join('');
  }

  function renderBodyParagraphs(body) {
    var paragraphs = Array.isArray(body) ? body : [body];
    return paragraphs.map(function (paragraph) {
      return '<p class="font-body text-secondary-container leading-relaxed mb-8">' + escH(paragraph) + '</p>';
    }).join('');
  }

  function renderArtistIntro() {
    var root = document.querySelector('[data-section-render="artist-intro"]');
    var section = findHomeSection('artist-intro');
    if (!root || !section || !section.image || !section.image.src) return;

    var cta = section.cta && section.cta.href && section.cta.label
      ? '<div class="mt-12">'
        + '<a href="' + escA(section.cta.href) + '" class="inline-block bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-xs hover:bg-primary-container transition-colors duration-300">' + escH(section.cta.label) + '</a>'
        + '</div>'
      : '';

    root.innerHTML = '<div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">'
      + '<div class="order-2 md:order-1">'
      + '<h2 class="font-headline text-3xl text-secondary-fixed mb-8">' + escH(section.title) + '</h2>'
      + '<div class="font-body text-secondary-container leading-relaxed space-y-6">'
      + (Array.isArray(section.body) ? section.body : [section.body]).map(function (paragraph) {
        return '<p>' + escH(paragraph) + '</p>';
      }).join('')
      + '</div>'
      + cta
      + '</div>'
      + '<div class="order-1 md:order-2 overflow-hidden aspect-[3/4] max-w-[220px] md:max-w-xs mx-auto">'
      + '<img alt="' + escA(section.image.alt || section.title) + '"'
      + ' class="w-full h-full object-cover"'
      + ' src="' + escA(section.image.src) + '"'
      + ' loading="lazy"'
      + ' width="' + escA(section.image.width || '') + '"'
      + ' height="' + escA(section.image.height || '') + '"/>'
      + '</div>'
      + '</div>';
  }

  function renderCollectorVoices() {
    var root = document.querySelector('[data-section-render="collector-voices"]');
    var section = findHomeSection('collector-voices');
    if (!root || !section) return;

    var items = section.items || [];
    var html = '<h2 class="font-headline text-center text-secondary-fixed text-4xl mb-20 italic">' + escH(section.title) + '</h2>'
      + '<div class="grid grid-cols-1 md:grid-cols-3 gap-12">';

    items.forEach(function (item, index) {
      var offsetClass = index % 2 === 1 ? ' md:translate-y-12' : '';
      html += '<div class="text-center p-8 bg-secondary-fixed-dim/5' + offsetClass + '">'
        + renderAvatar(item)
        + '<div class="font-body text-secondary-container text-base italic mb-6 text-left space-y-3">'
        + renderQuoteParagraphs(item.quote)
        + '</div>'
        + '<p class="font-label text-secondary-container/50 text-xs mb-3 not-italic">' + escH(item.context) + '</p>'
        + '<p class="font-label text-secondary-fixed font-bold tracking-widest uppercase text-xs">— ' + escH(item.name) + '</p>'
        + '</div>';
    });

    html += '</div>';
    root.innerHTML = html;
  }

  function renderArtInRoom() {
    var root = document.querySelector('[data-section-render="art-in-room"]');
    var section = findHomeSection('art-in-room');
    if (!root || !section || !section.image || !section.image.src) return;

    var title = section.linkedArtworkTitle || section.title || '';
    var imageAlt = section.image.alt || title || section.title;

    root.innerHTML = '<div class="px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">'
      + '<div class="order-2 lg:order-1">'
      + '<div class="p-12 bg-secondary-fixed/5 border-l-4 border-secondary-fixed">'
      + '<h2 class="font-headline text-3xl text-secondary-fixed mb-6">' + escH(section.title) + '</h2>'
      + renderBodyParagraphs(section.body)
      + '<p class="font-label text-secondary-container/60 uppercase tracking-widest text-xs">' + escH(section.note) + '</p>'
      + '</div>'
      + '</div>'
      + '<div class="relative z-10 order-1 lg:order-2 overflow-hidden shadow-2xl max-w-sm mx-auto cursor-pointer group"'
      + ' data-open-artwork="' + escA(title) + '"'
      + ' role="button"'
      + ' tabindex="0"'
      + ' aria-label="' + escA(imageAlt + ' - Bild vergroessern') + '">'
      + '<img alt="' + escA(imageAlt) + '"'
      + ' class="w-full h-auto hover:scale-105 transition-transform duration-500"'
      + ' loading="lazy"'
      + ' width="' + escA(section.image.width || '') + '"'
      + ' height="' + escA(section.image.height || '') + '"'
      + ' src="' + escA(section.image.src) + '"/>'
      + '<div class="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-white rounded-full px-3 py-1 border border-white/20 group-hover:bg-black/50 transition-colors duration-300">'
      + '<span class="text-xs">Groß ansehen</span>'
      + '</div>'
      + '</div>'
      + '</div>';

    var trigger = root.querySelector('[data-open-artwork]');
    if (!trigger) return;

    function openArtwork() {
      if (AL.openModalByName) AL.openModalByName(trigger.getAttribute('data-open-artwork'));
    }

    trigger.addEventListener('click', openArtwork);
    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openArtwork();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderArtistIntro();
    renderCollectorVoices();
    renderArtInRoom();
  });
})();
