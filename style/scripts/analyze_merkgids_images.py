from pathlib import Path
import json
import numpy as np
from PIL import Image

IMG_DIR = Path(r"c:\Users\vries\Projects\presentaties\style-example\images\merkgids-1.1-mei-2022")
OUT = Path(r"c:\Users\vries\Projects\presentaties\Agentic coding\style_analysis_merkgids_1_1.json")


def luminance(arr):
    c = arr / 255.0
    return 0.2126 * c[..., 0] + 0.7152 * c[..., 1] + 0.0722 * c[..., 2]


def edge_density(gray):
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))
    g = np.pad(gx, ((0, 0), (0, 1)), mode="constant") + np.pad(gy, ((0, 1), (0, 0)), mode="constant")
    return float((g > 0.12).mean())


def analyze(path: Path):
    arr = np.array(Image.open(path).convert("RGB"))
    lum = luminance(arr)
    dark_ratio = float((lum < 0.25).mean())
    light_ratio = float((lum > 0.85).mean())
    near_white = np.linalg.norm(arr.astype(float) - np.array([255, 255, 255], dtype=float), axis=2) < 18
    occupancy = float((~near_white).mean())
    top_band_lum = float(luminance(arr[: int(arr.shape[0] * 0.18), :, :]).mean())

    return {
        "image": path.name,
        "dark_ratio": round(dark_ratio, 4),
        "light_ratio": round(light_ratio, 4),
        "occupancy": round(occupancy, 4),
        "edge_density": round(edge_density(lum), 4),
        "top_band_luminance": round(top_band_lum, 4),
    }


def classify(m):
    if m["occupancy"] < 0.15 and m["light_ratio"] > 0.5:
        return "minimal_statement"
    if m["edge_density"] > 0.05:
        return "dense_information"
    return "standard_content"


def main():
    images = sorted(IMG_DIR.glob("*.png"))
    metrics = [analyze(p) for p in images]
    for m in metrics:
        m["archetype"] = classify(m)

    out = {
        "set": "merkgids-1.1-mei-2022",
        "image_count": len(metrics),
        "avg_occupancy": round(float(np.mean([m["occupancy"] for m in metrics])) if metrics else 0.0, 4),
        "avg_edge_density": round(float(np.mean([m["edge_density"] for m in metrics])) if metrics else 0.0, 4),
        "archetype_counts": {
            "standard_content": sum(1 for m in metrics if m["archetype"] == "standard_content"),
            "minimal_statement": sum(1 for m in metrics if m["archetype"] == "minimal_statement"),
            "dense_information": sum(1 for m in metrics if m["archetype"] == "dense_information"),
        },
        "max_occupancy": max(metrics, key=lambda x: x["occupancy"], default=None),
        "min_occupancy": min(metrics, key=lambda x: x["occupancy"], default=None),
        "max_edge_density": max(metrics, key=lambda x: x["edge_density"], default=None),
        "images": metrics,
    }

    OUT.write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")
    print(f"Images analyzed: {len(metrics)}")
    print(f"Archetypes: {out['archetype_counts']}")


if __name__ == "__main__":
    main()
