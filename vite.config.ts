import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://gateway.panomete.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  envPrefix: 'FLUMOU_',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'app') },
    ],
  }
})