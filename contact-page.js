// contact-page.js - CMS-vorbereitete Renderer fuer die Kontaktseite
window.AnneLeinen = window.AnneLeinen || {};

(function () {
  'use strict';

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

  function getContactPage() {
    return AL.pageData && AL.pageData.contact;
  }

  function getSubjectLabel(subject) {
    if (subject === 'Allgemeine Frage zu meiner Kunst') return 'Allgemeine Frage';
    if (subject === 'Zusammenarbeit oder Ideen austauschen') return 'Zusammenarbeit';
    return subject;
  }

  function renderHeader() {
    var root = document.querySelector('[data-contact-render="header"]');
    var page = getContactPage();
    if (!root || !page || !page.header) return;

    root.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">'
      + '<div class="md:col-span-8">'
      + '<span class="font-label text-xs uppercase tracking-[0.3em] text-secondary-container/60 mb-6 block">' + escH(page.header.eyebrow) + '</span>'
      + '<h1 class="font-headline text-5xl md:text-8xl text-secondary-fixed leading-tight italic">' + escH(page.header.title) + '</h1>'
      + '</div>'
      + '<div class="md:col-span-4 pb-4">'
      + '<p class="font-body text-lg leading-relaxed text-secondary-container/80 border-l border-secondary-fixed/30 pl-6">' + escH(page.header.intro) + '</p>'
      + '</div>'
      + '</div>';
  }

  function renderForm() {
    var root = document.querySelector('[data-contact-render="form"]');
    var page = getContactPage();
    if (!root || !page || !page.form) return;

    var subjects = page.form.subjects && page.form.subjects.length ? page.form.subjects : ['Kaufinteresse'];
    var defaultSubject = subjects[0];
    var subjectHtml = subjects.map(function (subject, index) {
      return '<label class="subject-radio cursor-pointer">'
        + '<input class="sr-only" type="radio" name="subject-choice" value="' + escA(subject) + '"' + (index === 0 ? ' checked' : '') + '>'
        + '<span class="block border border-on-secondary-fixed/25 px-4 py-3 font-body text-sm text-on-secondary-fixed transition-colors">' + escH(getSubjectLabel(subject)) + '</span>'
        + '</label>';
    }).join('');

    var success = page.form.success || {};
    var successTitle = escH(success.title || 'Vielen Dank für Ihre Nachricht.').replace(/\s+Ihre Nachricht/, '<br>Ihre Nachricht');

    root.innerHTML = '<div class="bg-secondary-fixed px-6 py-8 md:px-12 md:py-16">'
      + '<div id="form-header" style="transition:opacity 0.5s ease-in-out;"></div>'
      + '<div style="display:grid;grid-template-areas:\'stack\';">'
      + '<div id="form-container" style="grid-area:stack;transition:opacity 0.5s ease-in-out;">'
      + '<form id="contact-form" class="space-y-5 md:space-y-10" novalidate autocomplete="off">'
      + '<div aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;">'
      + '<label for="website">Website leer lassen</label>'
      + '<input type="text" id="website" name="website" tabindex="-1" autocomplete="off">'
      + '</div>'
      + '<div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">'
      + '<div class="flex flex-col">'
      + '<label for="field-name" class="font-label text-[10px] uppercase tracking-widest text-on-secondary-fixed mb-2">Name <span class="normal-case tracking-normal opacity-70">(Pflichtfeld)</span></label>'
      + '<input id="field-name" name="name" autocomplete="off" class="bg-transparent border-0 border-b border-on-secondary-fixed/30 focus:ring-0 focus:border-on-secondary-fixed text-on-secondary-fixed font-body py-2 placeholder-on-secondary-fixed/40" placeholder="Ihr Name" type="text" required/>'
      + '</div>'
      + '<div class="flex flex-col">'
      + '<label for="field-email" class="font-label text-[10px] uppercase tracking-widest text-on-secondary-fixed mb-2">E-Mail <span class="normal-case tracking-normal opacity-70">(Pflichtfeld)</span></label>'
      + '<input id="field-email" name="email" autocomplete="off" class="bg-transparent border-0 border-b border-on-secondary-fixed/30 focus:ring-0 focus:border-on-secondary-fixed text-on-secondary-fixed font-body py-2 placeholder-on-secondary-fixed/40" placeholder="ihre@email.de" type="email" required/>'
      + '</div>'
      + '</div>'
      + '<div class="flex flex-col">'
      + '<span class="font-label text-[10px] uppercase tracking-widest text-on-secondary-fixed mb-3">Anlass der Anfrage</span>'
      + '<input id="field-subject" name="subject" type="hidden" value="' + escA(defaultSubject) + '">'
      + '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Anlass der Anfrage">'
      + subjectHtml
      + '</div>'
      + '</div>'
      + '<div class="flex flex-col">'
      + '<label for="field-message" class="font-label text-[10px] uppercase tracking-widest text-on-secondary-fixed mb-2">Ihre Nachricht <span class="normal-case tracking-normal opacity-70">(optional)</span></label>'
      + '<textarea id="field-message" name="message" autocomplete="off" class="bg-transparent border-0 border-b border-on-secondary-fixed/30 focus:ring-0 focus:border-on-secondary-fixed text-on-secondary-fixed font-body py-2 placeholder-on-secondary-fixed/40 resize-none leading-relaxed" placeholder="" rows="1"></textarea>'
      + '</div>'
      + '<div class="pt-2 md:pt-4">'
      + '<button id="submit-btn" class="contact-submit w-full bg-primary text-on-primary py-5 font-label uppercase tracking-widest text-xs hover:brightness-110 hover:shadow-md transition-all duration-300 disabled:cursor-not-allowed" type="submit" disabled>Nachricht senden</button>'
      + '<p id="form-error" class="hidden font-body text-sm text-red-300 mt-4 text-center"></p>'
      + '</div>'
      + '</form>'
      + '</div>'
      + '<div id="form-success" class="py-16 text-center space-y-6" style="grid-area:stack;opacity:0;pointer-events:none;transition:opacity 0.5s ease-in-out;">'
      + '<p class="font-headline text-3xl md:text-4xl italic text-on-secondary-fixed leading-relaxed">„' + successTitle + '"</p>'
      + '<p class="font-body text-on-secondary-fixed-variant leading-relaxed">' + escH(success.body) + '</p>'
      + '<p class="font-label text-xs uppercase tracking-[0.25em] text-on-secondary-fixed/50 pt-2">— ' + escH(success.signature) + '</p>'
      + '</div>'
      + '</div>'
      + '</div>';

    if (AL.initContactForm) AL.initContactForm();
  }

  function renderIcon(item) {
    if (item.icon === 'phone') {
      return '<svg class="w-6 h-6 text-secondary-container mt-1 flex-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.05 9.88a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92z"/>'
        + '</svg>';
    }

    return '<span class="material-symbols-outlined text-secondary-container text-2xl mt-1">' + escH(item.icon) + '</span>';
  }

  function renderContactInfo() {
    var root = document.querySelector('[data-contact-render="info"]');
    var page = getContactPage();
    var info = page && page.contactInfo;
    if (!root || !info) return;

    var logo = info.logo || {};
    var itemsHtml = (info.items || []).map(function (item) {
      var value = item.href
        ? '<a href="' + escA(item.href) + '" class="font-headline text-xl text-secondary-fixed hover:text-secondary-container transition-colors">' + escH(item.value) + '</a>'
        : '<p class="font-headline text-xl text-secondary-fixed">' + escH(item.value) + '</p>';

      return '<div class="flex items-start gap-6">'
        + renderIcon(item)
        + '<div>'
        + '<p class="font-label text-[10px] uppercase tracking-widest text-secondary-container/60 mb-1">' + escH(item.label) + '</p>'
        + value
        + '</div>'
        + '</div>';
    }).join('');

    var quote = info.quote || {};

    root.innerHTML = '<div class="flex flex-col h-full">'
      + '<div class="flex-none mb-12">'
      + '<img src="' + escA(logo.src) + '" alt="' + escA(logo.alt) + '" style="width: 180px; filter: brightness(0) invert(1);" class="mb-10 mx-auto md:mx-0" width="' + escA(logo.width || 200) + '" height="' + escA(logo.height || 201) + '">'
      + '<div class="space-y-8">'
      + itemsHtml
      + '</div>'
      + '</div>'
      + '<div class="mt-auto border-l-4 border-secondary-fixed pl-8 py-1">'
      + '<p class="font-headline text-2xl italic text-secondary-fixed leading-tight">"' + escH(quote.text) + '"</p>'
      + '<p class="font-label text-xs uppercase tracking-widest text-secondary-container/60 mt-4">' + escH(quote.signature) + '</p>'
      + '</div>'
      + '</div>';
  }

  function renderCommission() {
    var root = document.querySelector('[data-contact-render="commission"]');
    var page = getContactPage();
    var section = page && page.commissionInfo;
    if (!root || !section) return;

    var itemsHtml = (section.items || []).map(function (item) {
      return '<div class="flex items-center gap-3">'
        + '<span class="material-symbols-outlined text-primary text-sm">check_circle</span>'
        + '<span class="font-body text-sm text-secondary-container">' + escH(item) + '</span>'
        + '</div>';
    }).join('');

    root.innerHTML = '<div class="bg-secondary-fixed/10 p-10 border border-secondary-fixed/20 text-center">'
      + '<h2 class="font-headline text-2xl text-secondary-fixed mb-4">' + escH(section.title) + '</h2>'
      + '<p class="font-body text-secondary-container/80 leading-relaxed mb-6">' + escH(section.body) + '</p>'
      + '<div class="space-y-3 inline-flex flex-col items-start">'
      + itemsHtml
      + '</div>'
      + '</div>';
  }

  function renderFaq() {
    var root = document.querySelector('[data-contact-render="faq"]');
    var page = getContactPage();
    var faq = page && page.faq;
    if (!root || !faq) return;

    var itemsHtml = faq.map(function (item) {
      return '<details class="group border-b border-secondary-fixed/20">'
        + '<summary class="flex justify-between items-center py-5 cursor-pointer" style="list-style:none;">'
        + '<span class="font-headline text-lg text-secondary-fixed">' + escH(item.question) + '</span>'
        + '<span class="ml-6 shrink-0 font-light text-2xl leading-none transition-transform duration-200 group-open:rotate-45" style="color:#a38d5b;">+</span>'
        + '</summary>'
        + '<p class="font-body text-secondary-container/80 leading-relaxed pb-5 max-w-2xl">' + escH(item.answer) + '</p>'
        + '</details>';
    }).join('');

    root.innerHTML = '<h2 class="font-headline text-2xl text-secondary-fixed mb-8">Häufige Fragen</h2>'
      + '<div class="border-t border-secondary-fixed/20">'
      + itemsHtml
      + '</div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderForm();
    renderContactInfo();
    renderCommission();
    renderFaq();
  });
})();
