import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载根目录下的 .env 文件
  const rootEnv = loadEnv(mode, resolve(__dirname, '../../'));

  process.env = { ...process.env, ...rootEnv };

  return {
    plugins: [
      vue(),
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist/client',
      assetsDir: 'assets',
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            'echarts-core': ['echarts/core'],
            'echarts-components': [
              'echarts/components',
              'echarts/charts',
              'echarts/renderers',
            ],
            'vue-vendor': ['vue', 'vue-router', 'vue-i18n'],
            'date-vendor': ['date-fns', 'date-fns/locale'],
          },
          chunkFileNames: (chunkInfo) => {
            const prefix = chunkInfo.name.includes('vendor')
              ? 'vendor'
              : 'chunk';
            return `assets/js/${prefix}-[name]-[hash].js`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      cssCodeSplit: true,
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vue-i18n', 'echarts/core', 'date-fns'],
    },
  };
});
