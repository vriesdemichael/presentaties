import { roIconsPlugin } from '../../theme/lib/vite-plugin-ro-icons'

export default {
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  plugins: [
    roIconsPlugin(),
  ],
}
