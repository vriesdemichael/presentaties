import type { App } from 'vue'
import { withBase } from '../lib/with-base'

/**
 * Expose $withBase as a global template helper so slide markdown can rewrite
 * public-folder paths for non-root base URL deployments (gh-pages).
 *
 * Usage in slides:
 *   <img :src="$withBase('/images/foo.png')" />
 */
export default function setup({ app }: { app: App }) {
  app.config.globalProperties.$withBase = withBase
}
