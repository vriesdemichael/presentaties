from pathlib import Path

import numpy as np
from PIL import Image

TARGET_DIR = Path(
    r"c:\Users\vries\Projects\presentaties\style\rijksoverheid-huisstijl\Preview-Rijksillustratieset-Achtergronden-v1.0-0523-RGB-ww"
)


def dominant_color_name(rgb_array: np.ndarray) -> str:
    pixels = rgb_array.reshape(-1, 3).astype(np.float32) / 255.0
    r, g, b = pixels[:, 0], pixels[:, 1], pixels[:, 2]
    maxc = np.max(pixels, axis=1)
    minc = np.min(pixels, axis=1)
    diff = maxc - minc

    hue = np.zeros_like(maxc)
    mask = diff != 0
    idx = (maxc == r) & mask
    hue[idx] = (60 * ((g[idx] - b[idx]) / diff[idx]) + 360) % 360
    idx = (maxc == g) & mask
    hue[idx] = 60 * ((b[idx] - r[idx]) / diff[idx]) + 120
    idx = (maxc == b) & mask
    hue[idx] = 60 * ((r[idx] - g[idx]) / diff[idx]) + 240

    sat = np.where(maxc == 0, 0, diff / maxc)
    vivid = sat > 0.15

    if np.mean(vivid) < 0.2:
        return "neutraal"

    h = float(np.mean(hue[vivid]))
    if h < 20 or h >= 340:
        return "rood"
    if h < 45:
        return "oranje"
    if h < 70:
        return "geel"
    if h < 160:
        return "groen"
    if h < 200:
        return "cyaan"
    if h < 255:
        return "blauw"
    if h < 300:
        return "paars"
    return "roze"


def brightness_name(rgb_array: np.ndarray) -> str:
    gray = np.mean(rgb_array, axis=2)
    value = float(np.mean(gray))
    if value < 85:
        return "donker"
    if value < 170:
        return "midden"
    return "licht"


def texture_name(rgb_array: np.ndarray) -> str:
    gray = np.mean(rgb_array.astype(np.float32), axis=2)
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))
    edge = float((gx.mean() + gy.mean()) / 2.0)

    row_means = gray.mean(axis=1)
    col_means = gray.mean(axis=0)
    trend = max(float(np.std(row_means)), float(np.std(col_means)))

    if trend > 18 and edge < 22:
        return "verloop"
    if edge < 14:
        return "vlak"
    if edge < 28:
        return "zacht"
    return "dynamisch"


def make_slug(image_path: Path, idx: int) -> str:
    with Image.open(image_path) as img:
        rgb = np.array(img.convert("RGB").resize((320, 180), Image.Resampling.BILINEAR))
    kleur = dominant_color_name(rgb)
    toon = brightness_name(rgb)
    stijl = texture_name(rgb)
    return f"achtergrond-{kleur}-{toon}-{stijl}-{idx:02d}.png"


def main() -> None:
    if not TARGET_DIR.exists():
        raise FileNotFoundError(f"Folder not found: {TARGET_DIR}")

    files = sorted(TARGET_DIR.glob("Page*.png"))
    if not files:
        raise FileNotFoundError(f"No Page*.png files found in: {TARGET_DIR}")

    used_names: set[str] = set()
    for idx, old_path in enumerate(files, start=1):
        base_name = make_slug(old_path, idx)
        new_name = base_name
        counter = 2
        while new_name in used_names or (TARGET_DIR / new_name).exists():
            new_name = base_name.replace(".png", f"-{counter}.png")
            counter += 1

        old_path.rename(TARGET_DIR / new_name)
        used_names.add(new_name)
        print(f"{old_path.name} -> {new_name}")


if __name__ == "__main__":
    main()