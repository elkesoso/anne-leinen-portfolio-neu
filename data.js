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
    titel:         "Metamorphosis",
    beschreibung:  "Eine kraftvolle Transformation in Schichten aus Pigment und Metall. Das Werk lädt ein, den eigenen Wandel zu spüren.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Metamorphosis.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Metamorphosis.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
  },
  {
    titel:         "Vibrant Energy",
    beschreibung:  "Lebendige Energie in Goldtönen – ein Werk, das den Raum zum Leuchten bringt.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Vibrant Energy.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Vibrant Energy.webp",
    mockupPfad:    "INHALTE/startseite/04_kunst-im-raum/Vibrant Energy G.webp",
    layoutClass:   "col-span-1 row-span-2"
  },
  {
    titel:         "Epizentrum",
    beschreibung:  "Im Zentrum liegt die Stille. Dieses Werk erkundet die Spannung zwischen Bewegung und Beständigkeit.",
    pfad:          "INHALTE/kunstwerke/alle-gemaelde/webp/Epizentrum.webp",
    thumbnailPfad: "INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/Epizentrum.webp",
    mockupPfad:    "",
    layoutClass:   "col-span-1 row-span-1"
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
    beschreibung:  "Text folgt...",
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
    titel:        "Lange Nacht der Bilder 2025",
    typ:          "Vernissage",
    ort:          "Galerie der oskar",
    datum:        "05. September 2025",
    uhrzeit:      "18:00 Uhr",
    beschreibung: "Ein immersiver Abend zum Erkunden der neuesten Serie taktiler Ölkompositionen. Die 'Lange Nacht der Bilder' feiert die lebendige Kunstszene Berlins.",
    bildPfad:     "INHALTE/kunstwerke/alle-gemaelde/webp/Dance of Tides.webp",
    bildAlt:      "Dance of Tides – Ausstellungsansicht",
    bildName:     "Dance of Tides",
    ctaText:      "RSVP Event",
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
    titel:        "hinschauen Festival 2024",
    typ:          "Gruppenausstellung",
    ort:          "Kunstmeile Berlin",
    datum:        "14. Juli 2024",
    uhrzeit:      "11:00 Uhr",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "KunstKrebs Charity Ausstellung",
    typ:          "Gruppenausstellung",
    ort:          "Berlin",
    datum:        "12. Oktober 2023",
    uhrzeit:      "18:00 Uhr",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  },
  {
    titel:        "Epizentrum – Einzelausstellung",
    typ:          "Einzelausstellung",
    ort:          "Galerie der oskar, Berlin",
    datum:        "März 2022",
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
    titel:        "Frühe Studien",
    typ:          "Gruppenausstellung",
    ort:          "Atelierhaus Berlin",
    datum:        "September 2018",
    uhrzeit:      "",
    beschreibung: "",
    bildPfad:     "",
    bildAlt:      "",
    bildName:     "",
    ctaText:      "",
    ctaIcon:      "",
    archiv:       true
  }
];
