import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 当请求路径以 `/api` 开头时，将请求代理到目标服务器
      '/api': {
        target: 'http://localhost:9000', // 目标服务器的地址
        changeOrigin: true, // 设置 `changeOrigin` 为 true 时，将请求头中的 Host 改为目标服务器
        rewrite: (path) => path.replace(/^\/api/, ''), // 去除请求路径中的 `/api`
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist/client',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
