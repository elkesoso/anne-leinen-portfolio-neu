// contact-form.js - gemeinsame Formularlogik fuer Startseite und Kontaktseite
window.AnneLeinen = window.AnneLeinen || {};

(function () {
  'use strict';

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var nameField = document.getElementById('field-name');
    var emailField = document.getElementById('field-email');
    var subjectField = document.getElementById('field-subject');
    var messageField = document.getElementById('field-message');
    var honeypot = document.getElementById('website');
    var submitBtn = document.getElementById('submit-btn');
    var errorEl = document.getElementById('form-error');
    var container = document.getElementById('form-container');
    var success = document.getElementById('form-success');
    var header = document.getElementById('form-header');
    var subjectChoices = document.querySelectorAll('input[name="subject-choice"]');

    if (!nameField || !emailField || !submitBtn || !errorEl) return;

    function updateSubmitState() {
      submitBtn.disabled = !(nameField.value.trim() && emailField.value.trim() && emailField.validity.valid);
    }

    function showError(message) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    function showSuccess() {
      if (!container || !success || !header) return;

      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      header.style.opacity = '0';

      setTimeout(function () {
        container.style.visibility = 'hidden';
        header.style.visibility = 'hidden';
        success.style.opacity = '1';
        success.style.pointerEvents = 'auto';
      }, 400);
    }

    Array.prototype.forEach.call(subjectChoices, function (choice) {
      choice.addEventListener('change', function () {
        if (choice.checked && subjectField) subjectField.value = choice.value;
      });
    });

    nameField.addEventListener('input', updateSubmitState);
    emailField.addEventListener('input', updateSubmitState);
    updateSubmitState();

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (honeypot && honeypot.value) return;

      var name = nameField.value.trim();
      var email = emailField.value.trim();
      var subject = subjectField ? subjectField.value.trim() : '';
      var message = messageField ? messageField.value.trim() : '';

      if (!name || !email) {
        showError('Bitte füllen Sie Name und E-Mail aus.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';
      hideError();

      fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, subject: subject, message: message, website: '' })
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) throw new Error(data.error || 'Unbekannter Fehler.');
            return data;
          });
        })
        .then(showSuccess)
        .catch(function (err) {
          submitBtn.textContent = 'Nachricht senden';
          updateSubmitState();
          showError(err.message || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
        });
    });
  }

  document.addEventListener('DOMContentLoaded', initContactForm);
  window.AnneLeinen.initContactForm = initContactForm;
})();
