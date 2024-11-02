import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    ssr: true,
    outDir: 'dist/server',
    ssrManifest: true,
    rollupOptions: {
      input: 'src/entry-server.ts',
      output: {
        format: 'cjs', // 改为 CommonJS 格式
      },
    },
  },
});
