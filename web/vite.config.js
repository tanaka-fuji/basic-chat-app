import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    port: 80,
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
