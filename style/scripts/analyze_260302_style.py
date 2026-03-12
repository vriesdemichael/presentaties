from pathlib import Path
from collections import Counter
import json
import numpy as np
from PIL import Image

IMAGE_DIR = Path(r"c:\Users\vries\Projects\presentaties\style-example\images\260302-kwartaalmeeting")
OUT_JSON = Path(r"c:\Users\vries\Projects\presentaties\Agentic coding\style_analysis_260302.json")

BRAND = {
    "deep_blue": np.array([0x15, 0x42, 0x73]),
    "light_blue": np.array([0xDD, 0xEF, 0xF8]),
    "accent_blue": np.array([0x8F, 0xCA, 0xE7]),
    "accent_blue_pale": np.array([0xB6, 0xDD, 0xEF]),
    "magenta": np.array([0xA9, 0x00, 0x61]),
    "orange": np.array([0xE1, 0x70, 0x00]),
    "white": np.array([255, 255, 255]),
    "black": np.array([0, 0, 0]),
}


def rgb_to_hex(rgb):
    return "#%02X%02X%02X" % tuple(int(x) for x in rgb)


def nearest_brand_name(color):
    min_name = None
    min_dist = float("inf")
    for name, ref in BRAND.items():
        d = float(np.linalg.norm(color.astype(float) - ref.astype(float)))
        if d < min_dist:
            min_dist = d
            min_name = name
    return min_name, min_dist


def luminance(rgb):
    c = rgb / 255.0
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]


def edge_density(gray):
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))
    g = np.pad(gx, ((0, 0), (0, 1)), mode="constant") + np.pad(gy, ((0, 1), (0, 0)), mode="constant")
    return float((g > 0.12).mean())


def compute_slide_metrics(path: Path):
    img = Image.open(path).convert("RGB")
    arr = np.array(img)
    h, w, _ = arr.shape

    # Downsample for color stats
    sample = np.array(img.resize((w // 4, h // 4), Image.Resampling.BILINEAR))
    pixels = sample.reshape(-1, 3)

    # Quantized top colors
    q = (pixels // 8) * 8
    counts = Counter(map(tuple, q.tolist()))
    top = counts.most_common(8)
    total = sum(counts.values())

    top_colors = []
    for color, count in top:
        color_arr = np.array(color)
        brand_name, brand_dist = nearest_brand_name(color_arr)
        top_colors.append(
            {
                "hex": rgb_to_hex(color),
                "ratio": round(count / total, 4),
                "nearest_brand": brand_name,
                "brand_distance": round(brand_dist, 2),
            }
        )

    # Nearest-brand distribution for all pixels
    brand_hits = {k: 0 for k in BRAND.keys()}
    for px in q:
        name, _ = nearest_brand_name(px)
        brand_hits[name] += 1
    brand_ratio = {k: round(v / len(q), 4) for k, v in brand_hits.items()}

    lum = luminance(arr)
    dark_ratio = float((lum < 0.25).mean())
    light_ratio = float((lum > 0.85).mean())

    gray = lum
    ed = edge_density(gray)

    # Approximate text/shape occupancy by non-background mask
    near_white = np.linalg.norm(arr.astype(float) - np.array([255, 255, 255], dtype=float), axis=2) < 18
    bg_like = near_white
    occupancy = float((~bg_like).mean())

    # Header band intensity proxy
    top_band = arr[: int(h * 0.18), :, :]
    top_lum = float(luminance(top_band).mean())

    return {
        "slide": path.name,
        "top_colors": top_colors,
        "brand_ratio": brand_ratio,
        "dark_ratio": round(dark_ratio, 4),
        "light_ratio": round(light_ratio, 4),
        "edge_density": round(ed, 4),
        "occupancy": round(occupancy, 4),
        "top_band_luminance": round(top_lum, 4),
    }


def classify(slide):
    if slide["dark_ratio"] > 0.45:
        return "dark_cover_or_divider"
    if slide["occupancy"] > 0.48 and slide["edge_density"] > 0.2:
        return "dense_data_or_dashboard"
    if slide["occupancy"] < 0.2 and slide["light_ratio"] > 0.6:
        return "minimal_statement"
    if slide["top_band_luminance"] < 0.45:
        return "header_bar_content"
    return "standard_content"


def main():
    slides = sorted({p.resolve() for p in IMAGE_DIR.glob("*.png")})
    results = [compute_slide_metrics(p) for p in slides]

    for r in results:
        r["archetype"] = classify(r)

    archetypes = Counter(r["archetype"] for r in results)

    aggregate_brand = {k: 0.0 for k in BRAND.keys()}
    for r in results:
        for k, v in r["brand_ratio"].items():
            aggregate_brand[k] += v
    n = max(len(results), 1)
    aggregate_brand = {k: round(v / n, 4) for k, v in aggregate_brand.items()}

    summary = {
        "deck": "260302-kwartaalmeeting",
        "slide_count": len(results),
        "aggregate_brand_ratio": aggregate_brand,
        "archetype_counts": dict(archetypes),
        "avg_edge_density": round(float(np.mean([r["edge_density"] for r in results])) if results else 0.0, 4),
        "avg_occupancy": round(float(np.mean([r["occupancy"] for r in results])) if results else 0.0, 4),
        "slides": results,
    }

    OUT_JSON.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(f"Wrote: {OUT_JSON}")
    print(f"Slides analyzed: {len(results)}")
    print("Archetypes:", dict(archetypes))
    print("Aggregate brand ratio:", aggregate_brand)


if __name__ == "__main__":
    main()
