import { roIconsPlugin } from '../../theme/lib/vite-plugin-ro-icons'

export default {
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: false,
      allow: ['../..'],
    },
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  plugins: [
    roIconsPlugin(),
  ],
}
