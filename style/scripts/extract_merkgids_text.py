from pathlib import Path
import re
import fitz  # PyMuPDF

PDF_PATH = Path(r"c:\Users\vries\Projects\presentaties\style-example\merkgids-1.1-mei-2022.pdf")
OUT_TXT = Path(r"c:\Users\vries\Projects\presentaties\Agentic coding\merkgids_1_1_extracted.txt")
OUT_RULES = Path(r"c:\Users\vries\Projects\presentaties\Agentic coding\merkgids_1_1_candidate_rules.txt")

KEYWORDS = [
    "gebruik", "gebruikte", "altijd", "nooit", "zorg", "vermijd", "moet", "moeten",
    "kleur", "typografie", "lettertype", "logo", "beeld", "icoon", "witruimte",
    "toon", "schrijf", "toegankelijk", "contrast", "hiërarchie", "vorm", "kader"
]


def normalize(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def main():
    doc = fitz.open(PDF_PATH)
    pages = []
    candidate_lines = []

    for i, page in enumerate(doc, start=1):
        text = page.get_text("text")
        lines = [normalize(l) for l in text.splitlines() if normalize(l)]
        pages.append((i, lines))

        for line in lines:
            low = line.lower()
            if any(k in low for k in KEYWORDS):
                if len(line) >= 25:
                    candidate_lines.append((i, line))

    with OUT_TXT.open("w", encoding="utf-8") as f:
        for p, lines in pages:
            f.write(f"\n=== PAGE {p} ===\n")
            for line in lines:
                f.write(line + "\n")

    # de-duplicate near-identical lines
    seen = set()
    filtered = []
    for p, line in candidate_lines:
        key = line.lower()
        if key not in seen:
            seen.add(key)
            filtered.append((p, line))

    with OUT_RULES.open("w", encoding="utf-8") as f:
        for p, line in filtered:
            f.write(f"[p.{p}] {line}\n")

    print(f"Wrote extracted text: {OUT_TXT}")
    print(f"Wrote candidate lines: {OUT_RULES}")
    print(f"Pages: {len(pages)} | Candidate lines: {len(filtered)}")


if __name__ == "__main__":
    main()
