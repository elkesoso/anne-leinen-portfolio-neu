#!/usr/bin/env python3
"""
batch_process.py – Einmaliger Batch-Prozess für neue Kunstwerke.
1. Konvertiert alle JPG/PNG in INHALTE/kunstwerke/alle-gemaelde/ nach WebP
2. Erkennt Seitenverhältnis → automatische Bento-layoutClass
3. Ergänzt fehlende Einträge in data.js
4. Archiviert Originale in originals_archive/
"""

import os, re, json, shutil, subprocess, datetime
from pathlib import Path

# ─── Pfade ────────────────────────────────────────────────────────────────────
BASE      = Path(__file__).parent
SRC_DIR   = BASE / "INHALTE/kunstwerke/alle-gemaelde"
FULL_DIR  = SRC_DIR / "webp"
THUMB_DIR = SRC_DIR / "webp/thumbs"
ARCH_DIR  = SRC_DIR / "originals_archive"
DATA_JS   = BASE / "data.js"

FULL_DIR.mkdir(parents=True, exist_ok=True)
THUMB_DIR.mkdir(parents=True, exist_ok=True)
ARCH_DIR.mkdir(parents=True, exist_ok=True)

# ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

def get_dimensions(path):
    """Bildgröße via ffprobe auslesen."""
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height",
         "-of", "csv=p=0", str(path)],
        capture_output=True, text=True
    )
    try:
        w, h = result.stdout.strip().split(",")
        return int(w), int(h)
    except Exception:
        return 1, 1

def bento_class(w, h, is_first):
    """Bento-layoutClass basierend auf Seitenverhältnis bestimmen."""
    if is_first:
        return "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
    ratio = w / h
    if ratio > 1.2:   # Querformat
        return "col-span-2 row-span-1"
    elif ratio < 0.85:  # Hochformat
        return "col-span-1 row-span-2"
    else:               # Quadratisch
        return "col-span-1 row-span-1"

def stem(filename):
    """Dateiname ohne Endung."""
    return Path(filename).stem

def webp_name(filename):
    return stem(filename) + ".webp"

# ─── Schritt 1 + 2: Konvertierung ─────────────────────────────────────────────

originals = sorted([
    f for f in SRC_DIR.iterdir()
    if f.is_file() and f.suffix.lower() in (".jpg", ".jpeg", ".png")
])

converted = 0
skipped   = 0
new_entries = []  # (name, layoutClass) für data.js

for i, src in enumerate(originals):
    full_out  = FULL_DIR  / webp_name(src.name)
    thumb_out = THUMB_DIR / webp_name(src.name)

    # Seitenverhältnis bestimmen
    w, h = get_dimensions(src)
    layout = bento_class(w, h, is_first=(i == 0 and True))

    # Vollbild konvertieren
    if not full_out.exists():
        r = subprocess.run(
            ["ffmpeg", "-y", "-i", str(src),
             "-q:v", "75", str(full_out),
             "-hide_banner", "-loglevel", "error"],
            capture_output=True
        )
        if r.returncode == 0:
            print(f"  ✓ Vollbild:   {full_out.name}")
            converted += 1
        else:
            print(f"  ✗ FEHLER:     {src.name}")
            continue
    else:
        print(f"  ⏩ Vollbild existiert: {full_out.name}")
        skipped += 1

    # Thumbnail konvertieren
    if not thumb_out.exists():
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(src),
             "-vf", "scale='min(800,iw)':-1",
             "-q:v", "70", str(thumb_out),
             "-hide_banner", "-loglevel", "error"],
            capture_output=True
        )
        print(f"  ✓ Thumbnail:  {thumb_out.name}")

    new_entries.append({
        "stem":   stem(src.name),
        "pfad":   f"INHALTE/kunstwerke/alle-gemaelde/webp/{webp_name(src.name)}",
        "thumb":  f"INHALTE/kunstwerke/alle-gemaelde/webp/thumbs/{webp_name(src.name)}",
        "layout": layout,
    })

# ─── Schritt 2b: Verwaiste galleryData-Einträge bereinigen ────────────────────

raw = DATA_JS.read_text(encoding="utf-8")

# galleryData-Block isolieren
gallery_match = re.search(
    r'(window\.AnneLeinen\.galleryData\s*=\s*\[)(.*?)(\];)',
    raw, re.DOTALL
)
removed_titles = []
if gallery_match:
    prefix  = gallery_match.group(1)
    block   = gallery_match.group(2)
    suffix  = gallery_match.group(3)

    # Jeden Eintrag { … } einzeln extrahieren (galleryData-Einträge sind flach)
    entry_re = re.compile(r'\{[^{}]+?\}', re.DOTALL)
    entries  = entry_re.findall(block)

    valid_blocks = []
    for entry in entries:
        # Nur das erste pfad:-Feld treffen (nicht thumbnailPfad)
        pfad_match = re.search(r'(?<![a-z])pfad:\s*"([^"]+)"', entry)
        if pfad_match:
            pfad_str  = pfad_match.group(1)
            full_path = BASE / pfad_str
            if full_path.exists():
                valid_blocks.append(entry)
            else:
                titel_m = re.search(r'titel:\s*"([^"]+)"', entry)
                titel   = titel_m.group(1) if titel_m else pfad_str
                removed_titles.append(titel)
                print(f"  ✗ Verwaist:   {titel}")
        else:
            valid_blocks.append(entry)  # kein pfad-Feld → behalten

    new_gallery = ",\n  ".join(valid_blocks)
    new_gallery_section = prefix + "\n  " + new_gallery + "\n" + suffix
    raw = raw[:gallery_match.start()] + new_gallery_section + raw[gallery_match.end():]
    DATA_JS.write_text(raw, encoding="utf-8")
    if removed_titles:
        print(f"  ✓ {len(removed_titles)} verwaiste Einträge entfernt.")
    else:
        print(f"  ✓ Keine verwaisten Einträge gefunden.")

# ─── Schritt 3: data.js synchronisieren ───────────────────────────────────────

raw = DATA_JS.read_text(encoding="utf-8")

# Bestehende Einträge: Titel aus galleryData extrahieren
existing_titles = set(re.findall(r'titel:\s+"([^"]+)"', raw))

added = 0
new_js_entries = []

for entry in new_entries:
    if entry["stem"] in existing_titles:
        continue  # bereits vorhanden
    block = f"""  {{
    titel:         "{entry['stem']}",
    beschreibung:  "Text folgt...",
    pfad:          "{entry['pfad']}",
    thumbnailPfad: "{entry['thumb']}",
    mockupPfad:    "",
    layoutClass:   "{entry['layout']}"
  }}"""
    new_js_entries.append(block)
    added += 1

if new_js_entries:
    # Vor dem letzten ]; einfügen
    insert = ",\n" + ",\n".join(new_js_entries)
    raw = re.sub(r'(\]\s*;?\s*)$', insert + r'\n\1', raw.rstrip(), flags=re.MULTILINE)
    DATA_JS.write_text(raw, encoding="utf-8")
    print(f"\n  ✓ data.js: {added} Einträge ergänzt")
else:
    print(f"\n  ✓ data.js: alle Einträge bereits vorhanden")

# ─── Schritt 4: Originale archivieren ─────────────────────────────────────────

archived = 0
for src in originals:
    dest = ARCH_DIR / src.name
    if not dest.exists():
        shutil.move(str(src), str(dest))
        archived += 1

# ─── Schritt 5: Cache-Busting – Versionsstempel in HTML-Dateien aktualisieren ──

version = datetime.datetime.now().strftime("%Y%m%d%H%M")
html_files = [BASE / "artworks.html", BASE / "index.html"]
for html_path in html_files:
    if not html_path.exists():
        continue
    html = html_path.read_text(encoding="utf-8")
    # data.js?v=... und gallery.js?v=... ersetzen (oder erstmals anhängen)
    html = re.sub(r'src="data\.js(\?v=[^"]*)?"',    f'src="data.js?v={version}"',    html)
    html = re.sub(r'src="gallery\.js(\?v=[^"]*)?(")', f'src="gallery.js?v={version}"', html)
    html_path.write_text(html, encoding="utf-8")
    print(f"  ✓ Cache-Busting: {html_path.name} → ?v={version}")

# ─── Abschlussbericht ─────────────────────────────────────────────────────────

print(f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{converted} Bilder konvertiert, {skipped} übersprungen.
{len(removed_titles)} verwaiste Einträge bereinigt.
{added} Einträge in data.js ergänzt.
{archived} Originale nach originals_archive/ verschoben.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
""")
