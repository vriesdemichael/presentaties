/**
 * Resolves a public asset path to be relative to the Vite base URL.
 *
 * When Slidev builds for gh-pages with `--base /repo/deck/`, Vite does NOT
 * rewrite absolute paths like `/images/foo.png` that reference `public/`
 * files — they stay as-is and point to the domain root instead of the
 * base-relative path. This utility applies the base prefix so images render
 * correctly in deployed builds as well as in local dev (where BASE_URL is `/`).
 *
 * Only rewrites root-relative paths (starting with `/`). Absolute URLs
 * (`http://...`), data URIs and relative paths are returned unchanged.
 */
export function withBase(path: string): string {
  if (!path) return path
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path
  if (path.startsWith('/')) return import.meta.env.BASE_URL + path.slice(1)
  return path
}
