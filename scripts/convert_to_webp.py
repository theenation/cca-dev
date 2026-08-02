#!/usr/bin/env python3
"""Convert all .jpg/.jpeg files under a directory to .webp in place.

Originals are copied into a backup folder (preserving the source directory's
relative structure) before being deleted, so nothing is lost even though the
source file is replaced.

Usage:
    python3 convert_to_webp.py [--src DIR] [--backup DIR] [--quality N] [--dry-run]

Requires Pillow: pip install Pillow
"""

import argparse
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Missing dependency: Pillow. Install it with `pip install Pillow` (or `pip install --break-system-packages Pillow`, or use a venv) and re-run.")

JPEG_EXTENSIONS = {".jpg", ".jpeg"}


def convert_directory(src: Path, backup: Path, quality: int, dry_run: bool) -> None:
    if not src.is_dir():
        sys.exit(f"Source directory does not exist: {src}")

    jpeg_files = sorted(p for p in src.rglob("*") if p.is_file() and p.suffix.lower() in JPEG_EXTENSIONS)
    if not jpeg_files:
        print(f"No .jpg/.jpeg files found under {src}")
        return

    total_before = 0
    total_after = 0
    converted = 0
    skipped = []

    for src_file in jpeg_files:
        rel_path = src_file.relative_to(src)
        webp_file = src_file.with_suffix(".webp")

        if webp_file.exists():
            print(f"SKIP  {rel_path} — {webp_file.name} already exists")
            skipped.append(rel_path)
            continue

        before_size = src_file.stat().st_size
        backup_file = backup / rel_path

        print(f"{'[dry-run] ' if dry_run else ''}{rel_path} -> {webp_file.name}  ({before_size / 1024:.0f} KB)")

        if dry_run:
            continue

        backup_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_file, backup_file)

        try:
            with Image.open(src_file) as img:
                # webp doesn't support CMYK; flatten to RGB (drop alpha isn't
                # needed here since source is jpeg, which has no alpha channel).
                if img.mode not in ("RGB", "L"):
                    img = img.convert("RGB")
                img.save(webp_file, "WEBP", quality=quality, method=6)
        except Exception as exc:
            print(f"  ERROR converting {rel_path}: {exc} — leaving original in place")
            webp_file.unlink(missing_ok=True)
            skipped.append(rel_path)
            continue

        after_size = webp_file.stat().st_size
        total_before += before_size
        total_after += after_size
        converted += 1

        src_file.unlink()

    print()
    print(f"Converted: {converted}")
    if skipped:
        print(f"Skipped:   {len(skipped)} ({', '.join(str(p) for p in skipped)})")
    if not dry_run and converted:
        saved_pct = (1 - total_after / total_before) * 100 if total_before else 0
        print(f"Size:      {total_before / 1024:.0f} KB -> {total_after / 1024:.0f} KB  ({saved_pct:.0f}% smaller)")
        print(f"Originals backed up to: {backup}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--src", default="apps/web/public/images", help="Directory to scan recursively (default: apps/web/public/images)")
    parser.add_argument("--backup", default=None, help="Backup directory for originals (default: <src>-jpeg-backup, sibling of src)")
    parser.add_argument("--quality", type=int, default=82, help="WebP quality 1-100 (default: 82)")
    parser.add_argument("--dry-run", action="store_true", help="Preview what would happen without changing any files")
    args = parser.parse_args()

    src = Path(args.src).resolve()
    backup = Path(args.backup).resolve() if args.backup else src.parent / f"{src.name}-jpeg-backup"

    convert_directory(src, backup, args.quality, args.dry_run)


if __name__ == "__main__":
    main()
