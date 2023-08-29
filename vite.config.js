import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
const path = require('path')

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

  base: '/finances/',

  build: {
    manifest: true,
    outDir: 'dist/finances',
  },

  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: {
        'name': 'My Finances',
        'short_name': 'MyFin',
        'description': 'Privacy-focused expenses record keeper',
        'display': 'fullscreen',
        'start_url': '/finances/index.html',
        'theme_color': '#232323',
        'background_color': '#232323',
        'icons': [
          {
            'src': './img/icons/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': './img/icons/android-chrome-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          },
          {
            'src': './img/icons/android-chrome-maskable-192x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'maskable'
          },
          {
            'src': './img/icons/android-chrome-maskable-512x512.png',
            'sizes': '512x512',
            'type': 'image/png',
            'purpose': 'maskable'
          }
        ]
      }
    })
  ],
}
