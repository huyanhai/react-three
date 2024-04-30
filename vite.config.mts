import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
