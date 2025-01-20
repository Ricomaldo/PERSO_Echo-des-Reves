import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(), // Ajout du plugin pour SVG en tant que composant React
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'), // Alias optionnel pour simplifier les chemins
    },
  },
});
