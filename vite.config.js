import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './frontend/fidmind/dist',  // Ensure this points to the correct output folder
    chunkSizeWarningLimit: 2000,  // Set your desired chunk size warning limit in kB
  },
});
