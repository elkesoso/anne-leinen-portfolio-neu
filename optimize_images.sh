#!/bin/bash
# optimize_images.sh
# Konvertiert alle JPEGs in INHALTE/kunstwerke/alle-gemaelde/ nach WebP.
# Legt Vollbilder (q:v 75) und Thumbnails (max. 800px Breite) an.
# Bereits konvertierte Dateien werden übersprungen.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$SCRIPT_DIR/INHALTE/kunstwerke/alle-gemaelde"
FULL_DIR="$SRC_DIR/webp"
THUMB_DIR="$SRC_DIR/webp/thumbs"

# Zielordner anlegen
mkdir -p "$FULL_DIR"
mkdir -p "$THUMB_DIR"

# Zähler
COUNT=0
SKIPPED=0

# Alle JPG/JPEG suchen (Groß- und Kleinschreibung)
while IFS= read -r -d '' FILE; do
  BASENAME=$(basename "$FILE")
  NAME="${BASENAME%.*}"

  FULL_OUT="$FULL_DIR/${NAME}.webp"
  THUMB_OUT="$THUMB_DIR/${NAME}.webp"

  # Vollbild: überspringen wenn bereits vorhanden
  if [ -f "$FULL_OUT" ]; then
    echo "⏩ Übersprungen (existiert): ${NAME}.webp"
    SKIPPED=$((SKIPPED + 1))
  else
    if ffmpeg -y -i "$FILE" -q:v 75 "$FULL_OUT" -hide_banner -loglevel error; then
      echo "✓ Vollbild:   ${NAME}.webp"
    else
      echo "✗ FEHLER bei: ${NAME}.webp" >&2
    fi
  fi

  # Thumbnail: überspringen wenn bereits vorhanden
  if [ ! -f "$THUMB_OUT" ]; then
    if ffmpeg -y -i "$FILE" -vf "scale='min(800,iw)':-1" -q:v 75 "$THUMB_OUT" -hide_banner -loglevel error; then
      echo "✓ Thumbnail:  thumbs/${NAME}.webp"
      COUNT=$((COUNT + 1))
    else
      echo "✗ FEHLER Thumbnail: thumbs/${NAME}.webp" >&2
    fi
  fi

done < <(find "$SRC_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Fertig: $COUNT Bilder konvertiert, $SKIPPED übersprungen."
echo ""

echo "📁 Vollbilder:"
ls -lh "$FULL_DIR"/*.webp 2>/dev/null || echo "  (keine Vollbilder gefunden)"
echo ""
echo "📁 Thumbnails:"
ls -lh "$THUMB_DIR"/*.webp 2>/dev/null || echo "  (keine Thumbnails gefunden)"
