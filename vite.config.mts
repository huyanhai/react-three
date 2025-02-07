import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';
import lygia from 'vite-plugin-lygia';
import topLevelAwait from 'vite-plugin-top-level-await';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      topLevelAwait(),
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
      }),
      // mode !== 'development' &&
      //   viteCompression({
      //     verbose: true, // 是否在控制台输出压缩结果
      //     disable: false, // 默认 false, 设置为 true 来禁用压缩
      //     threshold: 5120, // 只处理大于此大小的资源（单位：字节）。默认值为 0。
      //     algorithm: 'gzip', // 使用 brotli 压缩
      //     ext: '.gz', // 输出文件的扩展名
      //     deleteOriginFile: true, // 删除源文件
      //     filter: /\.(js|mjs|json|css|html|glb|gltf|exr|hdr)$/
      //   })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    optimizeDeps: {
      exclude: ['lygia']
    },
    worker: { plugins: () => [react()] }
  });
};
