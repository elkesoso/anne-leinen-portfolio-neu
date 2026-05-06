// data.js – Single Source of Truth für Galerie und Slider
// Namespace-Pattern: alle Daten unter window.AnneLeinen
window.AnneLeinen = window.AnneLeinen || {};

// ─── SLIDER-DATEN (index.html) ────────────────────────────────────────────
// Nur die 6 Highlight-Bilder für den Startseiten-Slider.
window.AnneLeinen.sliderData = [
  {
    titel: "Metamorphosis",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Metamorphosis.webp"
  },
  {
    titel: "Vibrant Energy",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Vibrant Energy.webp"
  },
  {
    titel: "Epizentrum",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Epizentrum.webp"
  },
  {
    titel: "Dance of Tides",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Dance of Tides.webp"
  },
  {
    titel: "Voices Like Storms",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Voices Like Storms.webp"
  },
  {
    titel: "Self-Confidence in Color",
    pfad:  "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Self-Confidence in Color_Alive. True. You..webp"
  }
];

// ─── GALERIE-DATEN (artworks.html) ───────────────────────────────────────
// Vollständige Daten für das Bento-Grid.
window.AnneLeinen.galleryData = [
  {
    titel: "Metamorphosis",
    beschreibung: "Dieses Werk entstand unter Einbezug eines recycelten Materials: ein kleines Angelnetz, das ganz allein auf dem Asphalt lag, wurde von mir aufgesammelt und in das Werk eingebettet. Es trägt die Spuren seines früheren Lebens. Spürst du seine Geschichte? Die Farben – Blau, Gold, Braun, Schwarz und Grau – wurden bewusst gewählt, um Kontraste und Harmonien zu erzeugen, während kantige Strukturen Spannung und Energie schaffen. Die einzige fast kreisförmige Form im Bild symbolisiert Wiederverwertung und Transformation: Aus Altem entsteht Neues. Das kleine Angelnetz verweist subtil auf Nachhaltigkeit und die unsichtbare Verbindung zwischen Mensch und Umwelt. Jede Linie, jede Fläche erinnert daran, dass wir als Künstlerinnen und Künstler die Möglichkeit haben, aus gefundenen Materialien neue Geschichten und Werte zu erschaffen. Mixed Media: Acryl, Strukturpaste und Tusche | Leinwand 40x50 cm | August 2025",
    pfad: "INHALTE/kunstwerke/alle-gemaelde/webp/Metamorphosis.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Metamorphosis.webp",
    mockupPfad: "INHALTE/kunstwerke/mockups/metamorphosis.webp",
    meta: "Mixed Media | 40x50 cm",
    layoutClass: "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
  },
  {
    titel: "Vibrant Energy",
    beschreibung: "Farben, die tanzen – Violett, Pink, Türkis und Gold wirbeln frei über die Leinwand und verweben sich zu einer farbenfrohen, harmonischen Komposition. Ein Bild voller Bewegung und Leichtigkeit, das die Lebensenergie spürbar macht – unbeschwert, frei, lebendig. Die Mischung aus Acrylfarben, Recycling-Materialien, Epoxidharzpulver und handgemachten Strukturpasten gibt dem Werk Tiefe und Charakter. Jeder Blick entdeckt neue Details, wie einzelne Tanzschritte in einem großen, fließenden Rhythmus. Mein Gemälde ist ein Fest der Farben – eine Einladung, die Freude am Leben, am Ausdruck und an der eigenen Freiheit zu feiern. Mixed Media: Acryl, Recycling-Materialien, Epoxidharzpulver & selbstgemachte Strukturpasten | Leinwand 80x60 cm | September 2025",
    pfad: "INHALTE/kunstwerke/alle-gemaelde/webp/Vibrant Energy.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Vibrant Energy.webp",
    mockupPfad: "INHALTE/kunstwerke/mockups/Vibrant Energy.webp",
    meta: "Mixed Media | 80x60 cm",
    layoutClass: "col-span-1 row-span-2"
  },
  {
    titel: "Epizentrum",
    beschreibung: "Rot wie glühende Lava, Orange wie brennende Hitze, Braun wie verbrannte Erde. Schwarz und Grün verdichten sich im Kern – dort, wo das Beben beginnt. Mit verschiedenen Strukturen habe ich das Spannungsfeld zwischen Energie und Kraft geschaffen. Im Zentrum pulsiert das Epizentrum – Sinnbild für die Reaktion der Erde auf den Klimawandel. Die aufgebrochene 3D Oberfläche steht für Druck, Erschütterung und die innere Wucht. Mein Werk thematisiert die Klimakrise als Naturgewalt. „Epizentrum“ ist Teil meiner Serie über Umweltzerstörung, Klimawandel und die fragile Verbindung zwischen Mensch und Erde. Mixed Media: Acryl, selbstgemachte Strukturpasten, Epoxidharz & Recycling-Materialien | Leinwand 70x50 | September 2025",
    pfad: "INHALTE/kunstwerke/alle-gemaelde/webp/Epizentrum.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Epizentrum.webp",
    mockupPfad: "INHALTE/kunstwerke/mockups/Epizentrum.webp",
    meta: "Mixed Media | 70x50 cm",
    layoutClass: "col-span-1 row-span-1"
  },
  {
    titel:         "Dance of Tides",
    beschreibung:  "Rhythmus des Meeres in abstrakten Formen – der ewige Tanz von Ebbe und Flut.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Dance of Tides.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Dance of Tides.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-2 row-span-1"
  },
  {
    titel:         "Voices Like Storms",
    beschreibung:  "Stimmen, die wie Stürme durch die Seele ziehen. Wuchtig und zart zugleich.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Voices Like Storms.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Voices Like Storms.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-1"
  },
  {
    titel:         "Self-Confidence in Color",
    beschreibung:  "Selbstvertrauen in seiner reinsten Form – ausgedrückt in Farbe, Textur und Licht.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Self-Confidence in Color_Alive. True. You..webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Self-Confidence in Color_Alive. True. You..webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-1"
  },
  {
    titel:         "Aurora Bloom",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Aurora Bloom.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Aurora Bloom.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Awakening in Pastel",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Awakening in Pastel.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Awakening in Pastel.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Crystalline Breath",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Crystalline Breath.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Crystalline Breath.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Embedded",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Embedded.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Embedded.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Feminine Galaxy",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Feminine Galaxy.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Feminine Galaxy.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Fire dance ",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Fire dance .webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Fire dance .webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Her Current",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Her Current.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Her Current.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Her Momentum",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Her Momentum.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Her Momentum.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Infinite Future",
    beschreibung:  "Mein Gemälde verkörpert Bewegung als unendliche Möglichkeit — ein Zusammenspiel von Farbe, Linie und Raum.\n\nAcryl, Pastellkreide und Sprühtechniken verschmelzen in dynamischen Schichten und erzeugen eine visuelle Tiefe, die stetigen Wandel und offene Wege evoziert.\n\nDie sanften Farbverläufe, kontrastiert durch kräftige Akzente, symbolisieren den ewigen Fluss von Gedanken, Visionen und Entwicklungen — und laden den Betrachter ein, in ihre eigene Vorstellung einer grenzenlosen Zukunft einzutauchen.\n\nMixed Media: Acryl, Pastellkreide und Spray | Leinwand 80 × 60 cm | November 2024",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Infinite Future.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Infinite Future.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Life Energy",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Life Energy.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Life Energy.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "OlorN_ervuD",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/OlorN_ervuD.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/OlorN_ervuD.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Rainbow Home",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Rainbow Home.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Rainbow Home.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Solyra – Deep yet Light",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Solyra – Deep yet Light.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Solyra – Deep yet Light.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Spring fever",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Spring fever.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Spring fever.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Synapse Deep Blue REMSTAGE",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Synapse Deep Blue REMSTAGE.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Synapse Deep Blue REMSTAGE.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "System Split (1)",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/System Split (1).webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/System Split (1).webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Tightrope walking",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Tightrope walking.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Tightrope walking.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Utopia of Rhythm",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Utopia of Rhythm.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Utopia of Rhythm.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Violet Tale",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Violet Tale.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Violet Tale.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Visibility",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Visibility.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Visibility.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Voices in color",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Voices in color.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Voices in color.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Whispers of the Sea",
    beschreibung:  "Text folgt...",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Whispers of the Sea.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Whispers of the Sea.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-2"
  }
];

// ─── CMS-VORBEREITUNG: KUNSTWERK-METADATEN ───────────────────────────────
// Nicht-brechende Anreicherung der bestehenden Galerie-Daten. Bestehende Felder
// bleiben erhalten; neue Felder machen Highlights, Filter und Sortierung spaeter
// explizit ansteuerbar.
window.AnneLeinen.artworkMetaByTitle = {
  "Metamorphosis": { id: "metamorphosis", slug: "metamorphosis", mood: "materie", isHighlight: true, sortOrder: 10 },
  "Vibrant Energy": { id: "vibrant-energy", slug: "vibrant-energy", mood: "dynamik", isHighlight: true, sortOrder: 20 },
  "Epizentrum": { id: "epizentrum", slug: "epizentrum", mood: "materie", isHighlight: true, sortOrder: 30 },
  "Dance of Tides": { id: "dance-of-tides", slug: "dance-of-tides", mood: "stille", isHighlight: false, sortOrder: 40 },
  "Voices Like Storms": { id: "voices-like-storms", slug: "voices-like-storms", isHighlight: false, sortOrder: 50 },
  "Self-Confidence in Color": { id: "self-confidence-in-color", slug: "self-confidence-in-color", mood: "dynamik", isHighlight: false, sortOrder: 60 },
  "Aurora Bloom": { id: "aurora-bloom", slug: "aurora-bloom", mood: "weite", isHighlight: false, sortOrder: 70 },
  "Awakening in Pastel": { id: "awakening-in-pastel", slug: "awakening-in-pastel", mood: "weite", isHighlight: false, sortOrder: 80 },
  "Crystalline Breath": { id: "crystalline-breath", slug: "crystalline-breath", mood: "materie", isHighlight: false, sortOrder: 90 },
  "Embedded": { id: "embedded", slug: "embedded", mood: "stille", isHighlight: false, sortOrder: 100 },
  "Feminine Galaxy": { id: "feminine-galaxy", slug: "feminine-galaxy", mood: "weite", isHighlight: false, sortOrder: 110 },
  "Fire dance ": { id: "fire-dance", slug: "fire-dance", mood: "dynamik", isHighlight: false, sortOrder: 120 },
  "Her Current": { id: "her-current", slug: "her-current", mood: "weite", isHighlight: false, sortOrder: 130 },
  "Her Momentum": { id: "her-momentum", slug: "her-momentum", mood: "weite", isHighlight: false, sortOrder: 140 },
  "Infinite Future": { id: "infinite-future", slug: "infinite-future", mood: "dynamik", isHighlight: false, sortOrder: 150 },
  "Life Energy": { id: "life-energy", slug: "life-energy", mood: "dynamik", isHighlight: false, sortOrder: 160 },
  "OlorN_ervuD": { id: "olorn-ervud", slug: "olorn-ervud", isHighlight: false, sortOrder: 170 },
  "Rainbow Home": { id: "rainbow-home", slug: "rainbow-home", mood: "materie", isHighlight: false, sortOrder: 180 },
  "Solyra – Deep yet Light": { id: "solyra-deep-yet-light", slug: "solyra-deep-yet-light", mood: "stille", isHighlight: false, sortOrder: 190 },
  "Spring fever": { id: "spring-fever", slug: "spring-fever", mood: "dynamik", isHighlight: false, sortOrder: 200 },
  "Synapse Deep Blue REMSTAGE": { id: "synapse-deep-blue-remstage", slug: "synapse-deep-blue-remstage", mood: "stille", isHighlight: false, sortOrder: 210 },
  "System Split (1)": { id: "system-split-1", slug: "system-split-1", isHighlight: false, sortOrder: 220 },
  "Tightrope walking": { id: "tightrope-walking", slug: "tightrope-walking", mood: "stille", isHighlight: false, sortOrder: 230 },
  "Utopia of Rhythm": { id: "utopia-of-rhythm", slug: "utopia-of-rhythm", mood: "dynamik", isHighlight: false, sortOrder: 240 },
  "Violet Tale": { id: "violet-tale", slug: "violet-tale", mood: "weite", isHighlight: false, sortOrder: 250 },
  "Visibility": { id: "visibility", slug: "visibility", mood: "stille", isHighlight: false, sortOrder: 260 },
  "Voices in color": { id: "voices-in-color", slug: "voices-in-color", mood: "weite", isHighlight: false, sortOrder: 270 },
  "Whispers of the Sea": { id: "whispers-of-the-sea", slug: "whispers-of-the-sea", mood: "materie", isHighlight: false, sortOrder: 280 }
};

(function enrichArtworkData() {
  function normalizeTitle(title) {
    return String(title || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function slugify(title) {
    return normalizeTitle(title)
      .replace(/[–—]/g, '-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var metaByNormalizedTitle = {};
  Object.keys(window.AnneLeinen.artworkMetaByTitle).forEach(function (title) {
    metaByNormalizedTitle[normalizeTitle(title)] = window.AnneLeinen.artworkMetaByTitle[title];
  });

  window.AnneLeinen.galleryData.forEach(function (item, index) {
    var meta = metaByNormalizedTitle[normalizeTitle(item.titel)] || {};
    item.id = item.id || meta.id || slugify(item.titel);
    item.slug = item.slug || meta.slug || item.id;
    item.mood = item.mood || meta.mood || '';
    item.isHighlight = typeof item.isHighlight === 'boolean' ? item.isHighlight : !!meta.isHighlight;
    item.sortOrder = typeof item.sortOrder === 'number' ? item.sortOrder : (meta.sortOrder || ((index + 1) * 10));
    item.altText = item.altText || item.titel;
  });
})();

// ─── AUSSTELLUNGS-DATEN (exhibitions.html) ────────────────────────────────
// archiv: false = aktuelle/kommende Ausstellungen | archiv: true = Vergangenheit
window.AnneLeinen.exhibitionData = [
  {
    titel:        "2. Kreativmarkt im Hubertusbad",
    typ:          "Kreativmarkt",
    ort:          "Hubertusbad, Berlin-Lichtenberg",
    datum:        "25. April 2026",
    uhrzeit:      "11:00 – 17:00 Uhr",
    beschreibung: "Am 25. April verwandelt sich das historische Hubertusbad in ein buntes Paradies – Anne Leinen ist mit einem eigenen Stand vor Ort. Originalwerke entdecken, ins Gespräch kommen und eine lebendige Berliner Kunstszene erleben.",
    bildPfad:     "INHALTE/ausstellungen/bilder/kreativmarkt-hubertusbad.webp",
    bildAlt:      "2. Kreativmarkt im Hubertusbad – Lichtenberg Berlin",
    bildName:     "Dance of Tides",
    ctaText:      "Kostenloser Eintritt",
    ctaIcon:      "arrow_forward",
    archiv:       false
  },
  {
    titel:        "Not an Advent Art Sale – Finissage",
    typ:          "Finissage",
    ort:          "Envision Berlin, Parkstraße 11, 13086 Berlin-Weißensee",
    datum:        "28. November 2025",
    uhrzeit:      "19:00 Uhr",
    beschreibung: "Herzlich eingeladen zur Finissage von Envision Berlins erstem jährlichen 'Not an Advent Sale' – über 70 Werke von Dutzenden Berliner Künstlerinnen und Künstlern, alle für 250 Euro oder weniger. Ein bedeutungsvolles Kunstgeschenk finden und gleichzeitig die lokale Berliner Kunstszene unterstützen. Mehrere Künstler sprechen während der Veranstaltung über ihre Werke.",
    bildPfad:     "INHALTE/ausstellungen/bilder/envision-berlin-finissage.webp",
    bildAlt:      "Not an Advent Art Sale – Finissage bei Envision Berlin",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       false
  },
  {
    titel:        "KOMPASS-Haus",
    typ:          "Ausstellung",
    ort:          "KOMPASS-Haus, Berlin",
    datum:        "Mai 2025",
    uhrzeit:      "Mai – Juli 2025",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "Künstler gegen Krebs – Kunstwerk-Versteigerung",
    typ:          "Charity-Auktion",
    ort:          "Rathaussaal Malchin",
    datum:        "27. Juni 2025",
    uhrzeit:      "",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "Hinschauen Kultur Festival",
    typ:          "Festival",
    ort:          "Eugeniu-Botanari-Platz, Berlin",
    datum:        "28. August 2025",
    uhrzeit:      "28.–31. August 2025",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "Kunst im Einheizhaus",
    typ:          "Ausstellung",
    ort:          "Einheizhaus, Berlin",
    datum:        "3. Oktober 2025",
    uhrzeit:      "3.–5. Oktober 2025",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "Lange Nacht der Bilder 2025",
    typ:          "Gruppenausstellung",
    ort:          "Galerie der oskar | Freiwilligenagentur Lichtenberg, Weitlingstraße 89, 10317 Berlin",
    datum:        "05. September 2025",
    uhrzeit:      "18:00 Uhr",
    beschreibung: "Im Rahmen der Langen Nacht der Bilder 2025 präsentiert das Oskar-Freiwilligen-Team Interpretationen Lichtenberger Künstlerinnen und Künstler zum Thema 'Urbanes Leben / Urbanes Lebensgefühl'. Die Ausstellung war bis zum 31. Oktober 2025 zu sehen – Di/Mi/Do 10–16 Uhr sowie nach telefonischer Vereinbarung.",
    bildPfad:     "INHALTE/ausstellungen/bilder/lange-nacht-der-bilder.webp",
    bildAlt:      "Lange Nacht der Bilder 2025 – Save the Date Plakat",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       false
  }
];
