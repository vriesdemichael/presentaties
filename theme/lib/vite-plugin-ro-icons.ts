/**
 * Vite plugin: RO Icons as Iconify-compatible components + virtual name list.
 *
 * Two virtual APIs are provided:
 *
 * 1. `~icons/ro/<icon-name>` (Iconify API)
 *    Auto-resolved by unplugin-vue-components' IconsResolver, so components
 *    like <RoManVooraanzicht /> work out of the box.
 *    Renders: <span class="bd-ro-icon">man_vooraanzicht</span>
 *
 * 2. `virtual:ro-icons/names` — exports string[] of all known icon names.
 *    Used by RoIconGallery to render the scrollable grid.
 *    Populated from the committed cache (theme/ro-icons-cache.json) at
 *    startup, then updated from the CDN SVG if reachable.
 */

import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const CDN_SVG_URL =
  'https://download.belastingdienst.nl/assets/fonts/rhsiconfont/rhsiconfont.svg?e5c4eddf5a76f7a571fc09fd4ba15a56'

const VIRTUAL_NAMES = 'virtual:ro-icons/names'
const RESOLVED_NAMES = '\0virtual:ro-icons/names'
const ICONS_PREFIX = '~icons/ro/'

function cacheFilePath(): string {
  const dir = dirname(fileURLToPath(import.meta.url))
  return join(dir, '..', 'ro-icons-cache.json')
}

function typeFilePath(): string {
  const dir = dirname(fileURLToPath(import.meta.url))
  return join(dir, '..', 'types', 'ro-icon-names.ts')
}

function loadCache(): string[] {
  const file = cacheFilePath()
  if (existsSync(file)) {
    try {
      return JSON.parse(readFileSync(file, 'utf-8'))
    } catch {
      return []
    }
  }
  return []
}

async function fetchNamesFromCDN(): Promise<string[] | null> {
  try {
    const res = await fetch(CDN_SVG_URL, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const svg = await res.text()
    const pattern = /glyph-name="\d{4}_([^"]+)"/g
    const names: string[] = []
    let m: RegExpExecArray | null
    while ((m = pattern.exec(svg)) !== null) {
      names.push(m[1])
    }
    return names.length > 0 ? names : null
  } catch {
    return null
  }
}

function writeCache(names: string[]): void {
  try {
    writeFileSync(cacheFilePath(), JSON.stringify(names, null, 2), 'utf-8')
  } catch {
    // read-only filesystem in some CI envs — not fatal
  }
}

function writeTypeFile(names: string[]): void {
  const union = names.map((n) => `  | '${n}'`).join('\n')
  const content = `// AUTO-GENERATED — do not edit manually.
// Updated automatically at dev/build startup from:
// ${CDN_SVG_URL}

export type RoIconName =\n${union};\n`
  try {
    writeFileSync(typeFilePath(), content, 'utf-8')
  } catch {
    // not fatal
  }
}

/** Convert Iconify icon-name convention (hyphens) back to RO ligature name (underscores). */
function toGlyphName(iconifyName: string): string {
  return iconifyName.replace(/-/g, '_')
}

function makeComponentCode(glyphName: string): string {
  return `import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'Ro${glyphName}',
  render() {
    return h('span', { class: 'bd-ro-icon' }, '${glyphName}')
  }
})
`
}

export function roIconsPlugin(): Plugin {
  let names: string[] = loadCache()

  return {
    name: 'vite-plugin-ro-icons',
    enforce: 'pre',

    async buildStart() {
      const fresh = await fetchNamesFromCDN()
      if (fresh && fresh.length > 0 && fresh.length !== names.length) {
        names = [...fresh].sort((a, b) => a.localeCompare(b))
        writeCache(names)
        writeTypeFile(names)
        console.info(`[ro-icons] Updated: ${names.length} icons cached from CDN.`)
      } else if (fresh && fresh.length > 0) {
        names = [...fresh].sort((a, b) => a.localeCompare(b))
      } else if (names.length > 0) {
        console.info(`[ro-icons] CDN unreachable — using ${names.length} cached icons.`)
      } else {
        console.warn('[ro-icons] No icon names available (offline + no cache).')
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_NAMES) return RESOLVED_NAMES
      if (id.startsWith(ICONS_PREFIX)) return '\0' + id
    },

    load(id) {
      if (id === RESOLVED_NAMES) {
        return `export default ${JSON.stringify(names)}`
      }
      if (id.startsWith('\0' + ICONS_PREFIX)) {
        const iconifyName = id.slice(('\0' + ICONS_PREFIX).length)
        const glyphName = toGlyphName(iconifyName)
        return makeComponentCode(glyphName)
      }
    },
  }
}
