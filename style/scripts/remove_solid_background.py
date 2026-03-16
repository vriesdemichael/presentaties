from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image


def parse_hex_color(value: str) -> tuple[int, int, int]:
    color = value.strip().lstrip("#")
    if len(color) != 6:
        raise ValueError("Color must be in #RRGGBB format")
    return tuple(int(color[i : i + 2], 16) for i in (0, 2, 4))


def detect_edge_color(rgb: np.ndarray, alpha: np.ndarray, min_alpha: int) -> tuple[int, int, int]:
    top = rgb[0, :, :]
    bottom = rgb[-1, :, :]
    left = rgb[:, 0, :]
    right = rgb[:, -1, :]

    top_a = alpha[0, :]
    bottom_a = alpha[-1, :]
    left_a = alpha[:, 0]
    right_a = alpha[:, -1]

    edge_rgb = np.concatenate([top, bottom, left, right], axis=0)
    edge_alpha = np.concatenate([top_a, bottom_a, left_a, right_a], axis=0)

    valid = edge_alpha >= min_alpha
    if np.any(valid):
        samples = edge_rgb[valid]
    else:
        samples = edge_rgb

    median = np.median(samples, axis=0)
    return int(median[0]), int(median[1]), int(median[2])


def build_candidate_mask(rgb: np.ndarray, target: tuple[int, int, int], tolerance: int) -> np.ndarray:
    target_arr = np.array(target, dtype=np.int16)
    diff = np.abs(rgb.astype(np.int16) - target_arr[None, None, :])
    return np.max(diff, axis=2) <= tolerance


def flood_from_edges(mask: np.ndarray, connectivity: int) -> np.ndarray:
    height, width = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        if mask[0, x]:
            queue.append((0, x))
            visited[0, x] = True
        if mask[height - 1, x] and not visited[height - 1, x]:
            queue.append((height - 1, x))
            visited[height - 1, x] = True

    for y in range(height):
        if mask[y, 0] and not visited[y, 0]:
            queue.append((y, 0))
            visited[y, 0] = True
        if mask[y, width - 1] and not visited[y, width - 1]:
            queue.append((y, width - 1))
            visited[y, width - 1] = True

    if connectivity == 8:
        neighbors = [
            (-1, 0),
            (1, 0),
            (0, -1),
            (0, 1),
            (-1, -1),
            (-1, 1),
            (1, -1),
            (1, 1),
        ]
    else:
        neighbors = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while queue:
        y, x = queue.popleft()
        for dy, dx in neighbors:
            ny, nx = y + dy, x + dx
            if ny < 0 or ny >= height or nx < 0 or nx >= width:
                continue
            if visited[ny, nx] or not mask[ny, nx]:
                continue
            visited[ny, nx] = True
            queue.append((ny, nx))

    return visited


def apply_background_replacement(
    rgba: np.ndarray,
    remove_mask: np.ndarray,
    mode: str,
) -> np.ndarray:
    out = rgba.copy()

    if mode == "transparent":
        out[remove_mask, 3] = 0
    else:
        out[remove_mask, 0:3] = 255
        out[remove_mask, 3] = 255

    return out


def default_output_path(input_path: Path, mode: str) -> Path:
    suffix = "-transparent" if mode == "transparent" else "-white-bg"
    return input_path.with_name(f"{input_path.stem}{suffix}.png")


def process_image(
    input_path: Path,
    output_path: Path,
    mode: str,
    tolerance: int,
    color: tuple[int, int, int] | None,
    connectivity: int,
    min_alpha: int,
) -> dict[str, str | int]:
    with Image.open(input_path) as image:
        rgba_img = image.convert("RGBA")
        rgba = np.array(rgba_img)

    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]

    target = color if color is not None else detect_edge_color(rgb, alpha, min_alpha=min_alpha)
    candidates = build_candidate_mask(rgb, target=target, tolerance=tolerance)
    remove_mask = flood_from_edges(candidates, connectivity=connectivity)

    result = apply_background_replacement(rgba, remove_mask=remove_mask, mode=mode)

    output_img = Image.fromarray(result, mode="RGBA")
    output_img.save(output_path)

    removed_pixels = int(np.count_nonzero(remove_mask))
    total_pixels = int(remove_mask.size)
    removed_pct = round((removed_pixels / total_pixels) * 100, 2)

    return {
        "input": str(input_path),
        "output": str(output_path),
        "mode": mode,
        "target_color": f"#{target[0]:02X}{target[1]:02X}{target[2]:02X}",
        "tolerance": tolerance,
        "connectivity": connectivity,
        "removed_pixels": removed_pixels,
        "removed_percent": removed_pct,
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Remove a solid edge-connected background from a single image using flood fill. "
            "Background color is auto-detected from the image edges unless --color is provided."
        )
    )
    parser.add_argument("input", type=Path, help="Input image path")
    parser.add_argument("--output", type=Path, default=None, help="Output image path (default: derived .png)")
    parser.add_argument(
        "--mode",
        choices=["transparent", "white"],
        default="transparent",
        help="Background replacement mode",
    )
    parser.add_argument(
        "--tolerance",
        type=int,
        default=24,
        help="Per-channel color tolerance (0-255), default 24",
    )
    parser.add_argument(
        "--color",
        type=str,
        default=None,
        help="Background color override in #RRGGBB format",
    )
    parser.add_argument(
        "--connectivity",
        type=int,
        choices=[4, 8],
        default=4,
        help="Flood fill connectivity",
    )
    parser.add_argument(
        "--min-alpha",
        type=int,
        default=10,
        help="Ignore nearly transparent edge pixels when auto-detecting edge color",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    input_path: Path = args.input
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    tolerance = max(0, min(255, int(args.tolerance)))

    color = parse_hex_color(args.color) if args.color else None
    output_path = args.output if args.output else default_output_path(input_path, args.mode)

    if args.mode == "transparent" and output_path.suffix.lower() != ".png":
        output_path = output_path.with_suffix(".png")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    report = process_image(
        input_path=input_path,
        output_path=output_path,
        mode=args.mode,
        tolerance=tolerance,
        color=color,
        connectivity=args.connectivity,
        min_alpha=args.min_alpha,
    )

    print("Background removal complete:")
    for key, value in report.items():
        print(f"- {key}: {value}")


if __name__ == "__main__":
    main()
