from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(r"c:\Users\vries\Projects\presentaties\style\rijksoverheid-huisstijl")
OUT_CSV = ROOT / "image-audit.csv"
OUT_MD = ROOT / "image-audit.md"


def load_rgb(path: Path) -> np.ndarray:
    with Image.open(path) as img:
        arr = np.array(img.convert("RGB").resize((480, 270), Image.Resampling.BILINEAR))
    return arr.astype(np.float32)


def edge_density(gray: np.ndarray) -> float:
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))
    mag = (gx.mean() + gy.mean()) / 2.0
    return float(mag)


def palette_metrics(rgb: np.ndarray) -> tuple[int, float, float, float]:
    small = rgb[::3, ::3, :]
    q = np.round(small / 32.0).astype(np.int32)
    flat = q.reshape(-1, 3)
    palette_size = int(np.unique(flat, axis=0).shape[0])

    pixels = small.reshape(-1, 3) / 255.0
    maxc = np.max(pixels, axis=1)
    minc = np.min(pixels, axis=1)
    diff = maxc - minc
    sat = np.where(maxc == 0, 0, diff / maxc)
    sat_mean = float(np.mean(sat))

    gray = np.mean(small, axis=2)
    contrast = float(np.std(gray))

    blue_dominance = float(np.mean((pixels[:, 2] > pixels[:, 0]) & (pixels[:, 2] > pixels[:, 1])))
    return palette_size, sat_mean, contrast, blue_dominance


def gradient_strength(gray: np.ndarray) -> float:
    row_means = gray.mean(axis=1)
    col_means = gray.mean(axis=0)
    return float(max(abs(row_means[-1] - row_means[0]), abs(col_means[-1] - col_means[0])))


def foreground_mass(gray: np.ndarray) -> float:
    border = np.concatenate([gray[0, :], gray[-1, :], gray[:, 0], gray[:, -1]])
    b = float(np.median(border))
    mask = np.abs(gray - b) > 12
    return float(np.mean(mask))


def classify(path: Path) -> dict[str, str]:
    rgb = load_rgb(path)
    gray = np.mean(rgb, axis=2)

    e = edge_density(gray)
    psize, sat, contrast, blue = palette_metrics(rgb)
    grad = gradient_strength(gray)
    fg = foreground_mass(gray)

    folder = path.parent.name.lower()
    is_bg = "maybe"
    has_obj = "maybe"
    has_scene = "maybe"

    if "achtergronden" in folder:
        is_bg, has_obj, has_scene = "yes", "yes", "yes"
    elif "objecten" in folder:
        is_bg, has_obj, has_scene = "no", "yes", "no"
    elif "situaties" in folder:
        is_bg, has_obj, has_scene = "yes", "yes", "yes"
    elif "personen" in folder:
        is_bg, has_obj, has_scene = "no", "yes", "no"
    elif "bovenaanzichten" in folder:
        is_bg, has_obj, has_scene = "yes", "yes", "yes"

    # Visual overrides to ensure decisions are image-informed
    if fg < 0.08 and e < 7.5:
        is_bg = "yes"
        has_obj = "no"
        has_scene = "no"
    elif fg > 0.30 and e > 10:
        has_obj = "yes"
        if grad > 20 or psize > 20:
            has_scene = "yes"

    style_parts = []
    if blue > 0.42 and sat < 0.22:
        style_parts.append("koel-blauw")
    elif sat < 0.12:
        style_parts.append("gedempt")
    elif sat < 0.22:
        style_parts.append("zacht-kleur")
    else:
        style_parts.append("rijk-kleur")

    if psize < 10:
        style_parts.append("zeer-vlak")
    elif psize < 18:
        style_parts.append("vlak")
    else:
        style_parts.append("gedetailleerd")

    if contrast < 18:
        style_parts.append("laag-contrast")
    elif contrast < 30:
        style_parts.append("midden-contrast")
    else:
        style_parts.append("hoog-contrast")

    if e < 8:
        style_parts.append("zachte-randen")
    elif e < 14:
        style_parts.append("strakke-randen")
    else:
        style_parts.append("drukke-randen")

    style_variant = "-".join(style_parts)

    return {
        "file": str(path.relative_to(ROOT)).replace("\\", "/"),
        "is_background": is_bg,
        "has_objects": has_obj,
        "contains_scene": has_scene,
        "style_variant": style_variant,
    }


def write_outputs(rows: list[dict[str, str]]) -> None:
    csv_lines = ["file,is_background,has_objects,contains_scene,style_variant"]
    for r in rows:
        csv_lines.append(
            f'"{r["file"]}","{r["is_background"]}","{r["has_objects"]}","{r["contains_scene"]}","{r["style_variant"]}"'
        )
    OUT_CSV.write_text("\n".join(csv_lines), encoding="utf-8")

    md_lines = [
        "# Rijksoverheid PNG audit",
        "",
        "| file | background | objects | scene | style variant |",
        "|---|---|---|---|---|",
    ]
    for r in rows:
        md_lines.append(
            f'| {r["file"]} | {r["is_background"]} | {r["has_objects"]} | {r["contains_scene"]} | {r["style_variant"]} |'
        )
    OUT_MD.write_text("\n".join(md_lines), encoding="utf-8")


def main() -> None:
    files = sorted(ROOT.rglob("*.png"))
    rows = [classify(path) for path in files]
    write_outputs(rows)
    print(f"Wrote {len(rows)} records to:")
    print(f"- {OUT_CSV}")
    print(f"- {OUT_MD}")


if __name__ == "__main__":
    main()