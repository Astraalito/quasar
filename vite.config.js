import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert(), glsl()],
  server: {
    https: true,     // active HTTPS
    host: true       // permet l'accès via IP locale (ex: 192.168.X.X)
  }
})
