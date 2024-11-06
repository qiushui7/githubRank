import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
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
          const prefix = chunkInfo.name.includes('vendor') ? 'vendor' : 'chunk';
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
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vue-i18n', 'echarts/core', 'date-fns'],
  },
});
