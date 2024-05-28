import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';
import lygia from 'vite-plugin-lygia';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    lygia({ libraryPath: '' }),
    glsl({
      include: [
        '**/*.glsl',
        '**/*.wgsl',
        '**/*.vert',
        '**/*.frag',
        '**/*.vs',
        '**/*.fs'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    exclude: ['lygia']
  }
});
