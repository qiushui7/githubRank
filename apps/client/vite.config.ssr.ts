import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 当请求路径以 `/api` 开头时，将请求代理到目标服务器
      '/service': {
        target: 'http://49.232.63.254:9000', // 目标服务器的地址
        changeOrigin: true, // 设置 `changeOrigin` 为 true 时，将请求头中的 Host 改为目标服务器
        rewrite: (path) => path.replace(/^\/service/, ''), // 去除请求路径中的 `/api`
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    ssr: true,
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.ts',
      output: {
        format: 'cjs', // 改为 CommonJS 格式
      },
    },
  },
});
