import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base debe coincidir con el nombre del repositorio para que
// las rutas funcionen al publicar en GitHub Pages (/Frontend1/).
export default defineConfig({
  plugins: [react()],
  base: '/Frontend1/',
})
