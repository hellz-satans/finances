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
        name: 'My Finances',
        short_name: 'MyFin',
        description: 'Privacy-focused expenses record keeper',
        display: 'fullscreen',
        start_url: '/finances/index.html',
        theme_color: '#232323',
        background_color: '#232323',
        icons: [
          {
            src: './img/icons/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: './img/icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './img/icons/apple-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: './img/icons/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    })
  ],
}
