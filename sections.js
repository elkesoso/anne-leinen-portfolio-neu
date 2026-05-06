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

  document.addEventListener('DOMContentLoaded', function () {
    renderCollectorVoices();
  });
})();
