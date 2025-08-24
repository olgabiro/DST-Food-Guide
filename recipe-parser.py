#!/usr/bin/env python3
import os
import re
from pathlib import Path

# This script parses recipe text files in src/assets/dishes and generates
# corresponding TypeScript files exporting Dish arrays similar to dishes-general.ts.
# Mapping rules:
#  - heapsOfFood-general.txt      -> src/app/dish/dishes-general.ts      (GENERAL_DISHES)
#  - heapsOfFood-hamlet.txt       -> src/app/dish/dishes-hamlet.ts       (HAMLET_DISHES)
#  - heapsOfFood-keg.txt          -> src/app/dish/dishes-shipwrecked.ts  (SHIPWRECKED_DISHES)
#
# Text entry format per dish (blank-line separated):
#   <Name>
#   Requires ...            # optional, used as requirements
#   Health: X | Hunger: Y | Sanity: Z  # X -> healthValue, Y -> hungerValue, Z -> sanityValue
#   Takes: N Days ...       # optional, sets cookingTime = N
#   Effects: ...            # optional, sets effects
#
# The parser is tolerant of minor format variations (optional colons, signs, etc.).

ROOT = Path(__file__).resolve().parent
ASSETS_DIR = ROOT / 'src' / 'assets' / 'dishes'
OUTPUT_DIR = ROOT / 'src' / 'app' / 'dish'

FILE_MAP = {
    'heapsOfFood-general.txt': ('dishes-general.ts', 'GENERAL_DISHES'),
    'heapsOfFood-gorge.txt': ('dishes-gorge.ts', 'GORGE_DISHES'),
    'heapsOfFood-hallowedNights.txt': ('dishes-hallowedNights.ts', 'HALLOWED_NIGHTS_DISHES'),
    'heapsOfFood-hamlet.txt': ('dishes-hamlet.ts', 'HAMLET_DISHES'),
    'heapsOfFood-keg.txt': ('dishes-keg.ts', 'KEG_DISHES'),
    'heapsOfFood-preserves.txt': ('dishes-preserves.ts', 'PRESERVES_DISHES'),
    'heapsOfFood-shipwrecked.txt': ('dishes-shipwrecked.ts', 'SHIPWRECKED_DISHES'),
    'heapsOfFood-warly.txt': ('dishes-warly.ts', 'WARLY_DISHES'),
    'heapsOfFood-winterFeast.txt': ('dishes-winterFeast.ts', 'WINTER_FEAST_DISHES'),
}

# Regexes (case-insensitive) to parse lines
RE_REQUIRES = re.compile(r'^\s*Requires\s*(.*)\s*\.?\s*$', re.IGNORECASE)
# Allow optional colons after labels; capture signed/unsigned floats
RE_HHS = re.compile(
    r'^\s*Health\s*:?\s*([+\-]?\d+(?:\.\d+)?)\s*\|\s*Hunger\s*:?\s*([+\-]?\d+(?:\.\d+)?)\s*\|\s*Sanity\s*:?\s*([+\-]?\d+(?:\.\d+)?)\s*$',
    re.IGNORECASE
)
RE_TAKES = re.compile(r'^\s*Takes\s*:?\s*(\d+)\s*Days?', re.IGNORECASE)
RE_EFFECTS = re.compile(r'^\s*Effects\s*:?\s*(.*)\s*$', re.IGNORECASE)


def ts_string(s: str) -> str:
    """Escape a Python string for inclusion as a single-quoted TypeScript string literal."""
    # Normalize whitespace: collapse internal newlines into spaces
    s = s.replace('\r', '')
    s = ' '.join(s.split())
    # Escape backslashes and single quotes
    s = s.replace('\\', r'\\').replace("'", r"\'")
    return s


def fmt_num(n: float) -> str:
    # Prefer integers when possible, else keep decimal as-is
    if n.is_integer():
        return str(int(n))
    # Normalize to avoid trailing zeros issues; keep as original-like float
    return (f"{n}" if '.' in f"{n}" else f"{n:.2f}").rstrip('0').rstrip('.')


def parse_entry(entry: str):
    name = None
    requirements = None
    effects = None
    cooking_time = None
    health = hunger = sanity = None

    # Split lines, keep non-empty for robustness but also evaluate original order
    lines = [ln.strip() for ln in entry.splitlines() if ln.strip()]
    if not lines:
        return None

    name = lines[0]
    for ln in lines[1:]:
        m = RE_REQUIRES.match(ln)
        if m:
            # Keep trailing punctuation as-is from the source capture
            requirements = m.group(1).strip()
            # If the original line ended with a period and it wasn't captured, ensure consistency
            if ln.rstrip().endswith('.') and not requirements.endswith('.'):
                requirements += '.'
            continue
        m = RE_HHS.match(ln)
        if m:
            try:
                health = float(m.group(1))
                hunger = float(m.group(2))
                sanity = float(m.group(3))
            except ValueError:
                pass
            continue
        m = RE_TAKES.match(ln)
        if m:
            try:
                cooking_time = int(m.group(1))
            except ValueError:
                pass
            continue
        m = RE_EFFECTS.match(ln)
        if m:
            effects = m.group(1).strip()
            continue

    if name is None or health is None or hunger is None or sanity is None:
        # Incomplete entry
        print(f"[WARN] Incomplete entry skipped: {entry[:30]}...")
        return None

    return {
        'name': name,
        'hungerValue': hunger,
        'sanityValue': sanity,
        'healthValue': health,
        'cookingTime': cooking_time,
        'requirements': requirements,
        'effects': effects,
    }


def generate_ts(const_name: str, items: list) -> str:
    lines = ["import { Dish } from './dish.service';", '', f'export const {const_name}: Dish[] = [']
    for it in items:
        parts = [
            f"name: '{ts_string(it['name'])}'",
            f"hungerValue: {fmt_num(it['hungerValue'])}",
            f"sanityValue: {fmt_num(it['sanityValue'])}",
            f"healthValue: {fmt_num(it['healthValue'])}",
        ]
        if it.get('cookingTime') is not None:
            parts.append(f"cookingTime: {it['cookingTime']}")
        if it.get('requirements'):
            parts.append(f"requirements: '{ts_string(it['requirements'])}'")
        if it.get('effects'):
            parts.append(f"effects: '{ts_string(it['effects'])}'")
        line = '  { ' + ', '.join(parts) + ' },'
        lines.append(line)
    lines.append('];')
    lines.append('')
    return '\n'.join(lines)


def process_file(txt_path: Path, out_path: Path, const_name: str):
    text = txt_path.read_text(encoding='utf-8')
    # Split entries by blank lines (two or more newlines); stay robust to varying counts
    raw_entries = re.split(r'\n\s*\n+', text.strip(), flags=re.MULTILINE)
    items = []
    for raw in raw_entries:
        parsed = parse_entry(raw)
        if parsed:
            items.append(parsed)
    ts_code = generate_ts(const_name, items)
    out_path.write_text(ts_code, encoding='utf-8')
    print(f"Wrote {out_path} with {len(items)} items from {txt_path.name}")


def main():
    if not ASSETS_DIR.exists():
        raise SystemExit(f"Assets directory not found: {ASSETS_DIR}")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Process mapped files if they exist
    for src_name, (dst_name, const_name) in FILE_MAP.items():
        src_path = ASSETS_DIR / src_name
        if not src_path.exists():
            print(f"[WARN] Source file not found: {src_path}")
            continue
        out_path = OUTPUT_DIR / dst_name
        process_file(src_path, out_path, const_name)

if __name__ == '__main__':
    main()
