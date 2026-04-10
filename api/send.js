// Vercel Serverless Function – Kontaktformular via Resend
// Umgebungsvariable: RESEND_API_KEY (in Vercel Dashboard setzen)

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, website } = req.body ?? {};

  // Honeypot: Bots füllen dieses Feld aus – wir lehnen still ab
  if (website) {
    return res.status(200).json({ ok: true });
  }

  // Pflichtfelder prüfen
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
  }

  // E-Mail-Format prüfen
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY nicht gesetzt');
    return res.status(500).json({ error: 'Serverkonfigurationsfehler.' });
  }

  const emailSubject = subject?.trim()
    ? `Anfrage: ${subject.trim()}`
    : `Neue Anfrage von ${name.trim()}`;

  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; color: #1a1a1a;">
      <h2 style="font-weight: normal; font-style: italic; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
        Neue Anfrage über anneleinen.art
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 16px 8px 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; white-space: nowrap; vertical-align: top;">Name</td>
          <td style="padding: 8px 0; color: #1a1a1a;">${escHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px 8px 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; white-space: nowrap; vertical-align: top;">E-Mail</td>
          <td style="padding: 8px 0; color: #1a1a1a;"><a href="mailto:${escHtml(email)}" style="color: #77591f;">${escHtml(email)}</a></td>
        </tr>
        ${subject?.trim() ? `
        <tr>
          <td style="padding: 8px 16px 8px 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; white-space: nowrap; vertical-align: top;">Betreff</td>
          <td style="padding: 8px 0; color: #1a1a1a;">${escHtml(subject)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 16px 8px 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; white-space: nowrap; vertical-align: top;">Nachricht</td>
          <td style="padding: 8px 0; color: #1a1a1a; white-space: pre-wrap; line-height: 1.7;">${escHtml(message)}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['elke.kastl@web.de'],
        reply_to: email.trim(),
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API Fehler:', response.status, errorText);
      return res.status(500).json({ error: 'Die E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Netzwerkfehler:', err);
    return res.status(500).json({ error: 'Verbindungsfehler. Bitte versuchen Sie es später erneut.' });
  }
}
