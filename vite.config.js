import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
const path = require('path')

const BASE_PATH = '/finances';
const ICONS_DIR = `${BASE_PATH}/img/icons`;

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },

  base: `${BASE_PATH}/`,

  build: {
    outDir: 'dist/finances',
  },

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },

      devOptions: {
        enabled: true
      },

      manifest: {
        name: 'My Finances',
        short_name: 'Finances',
        description: 'Privacy-focused expenses record keeper',
        display: 'standalone',
        start_url: '/finances/index.html',
        theme_color: '#232323',
        background_color: '#232323',
        icons: [
          {
            src: `${ICONS_DIR}/apple-touch-icon-180x180.png`,
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: `${ICONS_DIR}/finances-192x192.png`,
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: `${ICONS_DIR}/maskable-finances-512x512.png`,
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: `${ICONS_DIR}/finances-512x512.png`,
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: `${ICONS_DIR}/finances-64x64.png`,
            sizes: '64x64',
            type: 'image/png'
          }
        ]
      }
    })
  ],
}
