from pathlib import Path

import numpy as np
from PIL import Image

TARGET_DIR = Path(
    r"c:\Users\vries\Projects\presentaties\style\rijksoverheid-huisstijl\Preview-Rijksillustratieset-Achtergronden-v1.0-0523-RGB-ww"
)
OUT_CSV = TARGET_DIR / "descriptions.csv"
OUT_MD = TARGET_DIR / "descriptions.md"


def load_rgb(path: Path) -> np.ndarray:
    with Image.open(path) as img:
        arr = np.array(img.convert("RGB").resize((480, 270), Image.Resampling.BILINEAR))
    return arr.astype(np.float32)


def brightness_label(gray: np.ndarray) -> str:
    m = float(gray.mean())
    if m < 80:
        return "donkere"
    if m < 165:
        return "midden"
    return "lichte"


def hue_label(rgb: np.ndarray) -> str:
    pixels = rgb.reshape(-1, 3) / 255.0
    r, g, b = pixels[:, 0], pixels[:, 1], pixels[:, 2]
    maxc = np.max(pixels, axis=1)
    minc = np.min(pixels, axis=1)
    diff = maxc - minc
    sat = np.where(maxc == 0, 0, diff / maxc)
    vivid = sat > 0.15

    if vivid.mean() < 0.12:
        return "neutrale tint"

    hue = np.zeros_like(maxc)
    mask = diff != 0
    idx = (maxc == r) & mask
    hue[idx] = (60 * ((g[idx] - b[idx]) / diff[idx]) + 360) % 360
    idx = (maxc == g) & mask
    hue[idx] = 60 * ((b[idx] - r[idx]) / diff[idx]) + 120
    idx = (maxc == b) & mask
    hue[idx] = 60 * ((r[idx] - g[idx]) / diff[idx]) + 240
    h = float(np.median(hue[vivid]))

    if h < 20 or h >= 340:
        return "rode tint"
    if h < 45:
        return "oranje tint"
    if h < 70:
        return "gele tint"
    if h < 160:
        return "groene tint"
    if h < 200:
        return "cyaan tint"
    if h < 255:
        return "blauwe tint"
    if h < 300:
        return "paarse tint"
    return "roze tint"


def gradient_type(gray: np.ndarray) -> tuple[str, float]:
    row_mean = gray.mean(axis=1)
    col_mean = gray.mean(axis=0)
    y_trend = float(abs(row_mean[-1] - row_mean[0]))
    x_trend = float(abs(col_mean[-1] - col_mean[0]))

    yy, xx = np.mgrid[0 : gray.shape[0], 0 : gray.shape[1]]
    cy, cx = gray.shape[0] / 2, gray.shape[1] / 2
    rr = np.sqrt((yy - cy) ** 2 + (xx - cx) ** 2)
    radial_corr = float(np.corrcoef(rr.reshape(-1), gray.reshape(-1))[0, 1])

    if abs(radial_corr) > 0.28:
        return "radiaal verloop", abs(radial_corr)
    if y_trend > x_trend and y_trend > 16:
        return "verticaal verloop", y_trend
    if x_trend > 16:
        return "horizontaal verloop", x_trend
    return "geen duidelijk verloop", max(x_trend, y_trend)


def texture_type(gray: np.ndarray) -> tuple[str, float]:
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))
    edge = float((gx.mean() + gy.mean()) / 2)

    smooth = np.array(Image.fromarray(gray.astype(np.uint8)).resize((120, 68), Image.Resampling.BILINEAR))
    rough = np.array(Image.fromarray(smooth.astype(np.uint8)).resize((480, 270), Image.Resampling.NEAREST))
    detail = gray - rough.astype(np.float32)
    detail_strength = float(np.std(detail))

    score = (edge + detail_strength) / 2
    if score < 7:
        return "effen", score
    if score < 13:
        return "zacht textuur", score
    if score < 20:
        return "fijne textuur", score
    return "drukke textuur", score


def abstract_shape_type(rgb: np.ndarray) -> tuple[str, float]:
    small = np.array(Image.fromarray(rgb.astype(np.uint8)).resize((120, 68), Image.Resampling.BILINEAR)).astype(np.float32)
    flat = small.reshape(-1, 3)
    center = flat[np.random.default_rng(42).choice(flat.shape[0], size=4, replace=False)]

    for _ in range(8):
        d = np.sum((flat[:, None, :] - center[None, :, :]) ** 2, axis=2)
        labels = np.argmin(d, axis=1)
        for i in range(4):
            pts = flat[labels == i]
            if len(pts) > 0:
                center[i] = pts.mean(axis=0)

    dominant = np.bincount(labels, minlength=4) / labels.size
    entropy = float(-np.sum(np.where(dominant > 0, dominant * np.log2(dominant), 0)))

    if entropy < 1.0:
        return "met weinig vormen", entropy
    if entropy < 1.6:
        return "met enkele zachte vormen", entropy
    return "met meerdere organische vormen", entropy


def describe_image(path: Path) -> str:
    rgb = load_rgb(path)
    gray = rgb.mean(axis=2)

    licht = brightness_label(gray)
    kleur = hue_label(rgb)
    verloop, _ = gradient_type(gray)
    textuur, _ = texture_type(gray)
    vormen, _ = abstract_shape_type(rgb)

    if verloop == "geen duidelijk verloop":
        return f"{licht.capitalize()} achtergrond in {kleur}, {textuur}, {vormen}."
    return f"{licht.capitalize()} achtergrond in {kleur} met {verloop}, {textuur}, {vormen}."


def main() -> None:
    files = sorted(TARGET_DIR.glob("*.png"))
    if not files:
        raise FileNotFoundError(f"No PNG files found in: {TARGET_DIR}")

    rows: list[tuple[str, str]] = []
    for path in files:
        description = describe_image(path)
        rows.append((path.name, description))

    csv_lines = ["file,description"]
    csv_lines += [f'"{name}","{desc}"' for name, desc in rows]
    OUT_CSV.write_text("\n".join(csv_lines), encoding="utf-8")

    md_lines = ["# Achtergronden beschrijvingen", ""]
    md_lines += [f"- **{name}**: {desc}" for name, desc in rows]
    OUT_MD.write_text("\n".join(md_lines), encoding="utf-8")

    print(f"Wrote {len(rows)} descriptions to:")
    print(f"- {OUT_CSV}")
    print(f"- {OUT_MD}")


if __name__ == "__main__":
    main()