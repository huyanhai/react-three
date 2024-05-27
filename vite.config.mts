import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';
import lygia from './plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // glsl({
    //   include: [
    //     '**/*.glsl',
    //     '**/*.wgsl',
    //     '**/*.vert',
    //     '**/*.frag',
    //     '**/*.vs',
    //     '**/*.fs'
    //   ]
    // }),
    lygia()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    // exclude: ['lygia']
  }
});
