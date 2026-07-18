"""Derive aligned runtime color and ink layers from hand-drawn scene masters."""

from pathlib import Path
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw


ROOT = Path(__file__).resolve().parents[2]
SOURCE_DIR = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "design-references" / "handdraw-story" / "masters"
OUTPUT_DIR = ROOT / "starter" / "app" / "public" / "handdraw-story"
QC_DIR = ROOT / "qc"
RUNTIME_SIZE = (720, 960)
PAPER = "#f8f3e8"
INK = "#302922"


def derive_layers(source_path: Path) -> tuple[Image.Image, Image.Image]:
    with Image.open(source_path) as source:
        color = ImageOps.fit(source.convert("RGB"), RUNTIME_SIZE, method=Image.Resampling.LANCZOS)

    gray = ImageOps.grayscale(color).filter(ImageFilter.GaussianBlur(0.55))
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.autocontrast(edges, cutoff=1)
    edges = ImageEnhance.Contrast(edges).enhance(1.34)
    line_mask = ImageOps.invert(edges)
    line = ImageOps.colorize(line_mask, black=INK, white=PAPER)
    line = ImageEnhance.Contrast(line).enhance(1.08)
    return color, line


def make_contact_sheet(pairs: list[tuple[Image.Image, Image.Image]]) -> None:
    tile_width, tile_height = 240, 320
    gap = 8
    sheet = Image.new("RGB", (gap + len(pairs) * (tile_width + gap), gap + 2 * (tile_height + gap)), "#14110e")
    draw = ImageDraw.Draw(sheet)
    for column, (color, line) in enumerate(pairs):
        x = gap + column * (tile_width + gap)
        sheet.paste(color.resize((tile_width, tile_height), Image.Resampling.LANCZOS), (x, gap))
        sheet.paste(line.resize((tile_width, tile_height), Image.Resampling.LANCZOS), (x, gap * 2 + tile_height))
        draw.rectangle((x, gap, x + tile_width - 1, gap + tile_height - 1), outline="#eee4d0")
    QC_DIR.mkdir(parents=True, exist_ok=True)
    sheet.save(QC_DIR / "handdraw-layer-contact-sheet.jpg", quality=92)


def main() -> None:
    sources = sorted(SOURCE_DIR.glob("scene-??-color.png"))
    if len(sources) != 5:
        raise SystemExit(f"Expected five hand-drawn color masters, found {len(sources)} in {SOURCE_DIR}")

    pairs = []
    for source_path in sources:
        scene_id = source_path.stem.split("-")[1]
        color, line = derive_layers(source_path)
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        color.save(OUTPUT_DIR / f"scene-{scene_id}-runtime.webp", "WEBP", quality=90, method=6)
        line.save(OUTPUT_DIR / f"scene-{scene_id}-line.webp", "WEBP", quality=88, method=6)
        pairs.append((color, line))
        print(f"derived scene {scene_id} from {source_path.name}")

    make_contact_sheet(pairs)
    print(f"wrote {QC_DIR / 'handdraw-layer-contact-sheet.jpg'}")


if __name__ == "__main__":
    main()
