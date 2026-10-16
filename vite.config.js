import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const pages = [
  'index.html',
  'about.html',
  'modal3d.html',
  'eprium.html',
  'drivexr.html',
  'insightxr.html',
  'defence-security.html',
  'case-study-xr-readiness.html',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace('.html', ''), resolve(import.meta.dirname, page)]),
      ),
    },
  },
})
