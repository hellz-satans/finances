import vue from '@vitejs/plugin-vue'
const path = require('path')

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  alias: [
    { find: '@', replacement: path.resolve(__dirname, 'src') },
  ],

  build: {
    outDir: 'dist/finances',
  },

  plugins: [vue()],
}
