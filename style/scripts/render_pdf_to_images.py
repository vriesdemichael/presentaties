from pathlib import Path

import fitz  # PyMuPDF

PDF_DIR = Path(r"c:\Users\vries\Projects\presentaties\style\rijksoverheid-huisstijl")
REDACT_TEXT = "Voorbeeld"
SCALE = 2.0


def redact_text(page: fitz.Page, text: str) -> int:
    rects = page.search_for(text)
    for rect in rects:
        page.add_redact_annot(rect, fill=False)
    if rects:
        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_NONE,
            text=fitz.PDF_REDACT_TEXT_REMOVE,
        )
    return len(rects)


def render_pdf(pdf_path: Path) -> tuple[int, int]:
    out_dir = pdf_path.parent / pdf_path.stem
    out_dir.mkdir(parents=True, exist_ok=True)

    redactions = 0
    matrix = fitz.Matrix(SCALE, SCALE)

    doc = fitz.open(pdf_path)
    for idx, page in enumerate(doc, start=1):
        redactions += redact_text(page, REDACT_TEXT)
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        out = out_dir / f"Page{idx:03d}.png"
        pix.save(out)
    doc.close()

    return len(list(out_dir.glob("Page*.png"))), redactions


def main() -> None:
    pdf_files = sorted(PDF_DIR.glob("*.pdf"))
    if not pdf_files:
        print(f"No PDFs found in: {PDF_DIR}")
        return

    for pdf_path in pdf_files:
        page_count, redactions = render_pdf(pdf_path)
        print(
            f"Processed {pdf_path.name}: {page_count} pages exported to {pdf_path.stem}/, "
            f"removed {redactions} '{REDACT_TEXT}' matches"
        )


if __name__ == "__main__":
    main()
