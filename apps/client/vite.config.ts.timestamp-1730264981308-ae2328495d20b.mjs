// ../client/vite.config.ts
import { defineConfig } from "file:///E:/githubRank/node_modules/.pnpm/vite@5.4.10_@types+node@20.17.0_less@4.2.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/githubRank/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@20.17.0_less@4.2.0_terser@5.36.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "E:\\githubRank\\apps\\client";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      // 当请求路径以 `/api` 开头时，将请求代理到目标服务器
      "/api": {
        target: "http://localhost:9000",
        // 目标服务器的地址
        changeOrigin: true,
        // 设置 `changeOrigin` 为 true 时，将请求头中的 Host 改为目标服务器
        rewrite: (path2) => path2.replace(/^\/api/, "")
        // 去除请求路径中的 `/api`
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    outDir: "dist/client",
    assetsDir: "assets",
    manifest: true,
    rollupOptions: {
      input: "src/entry-client.ts"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcZ2l0aHViUmFua1xcXFxhcHBzXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0aHViUmFua1xcXFxhcHBzXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZ2l0aHViUmFuay9hcHBzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIC8vIFx1NUY1M1x1OEJGN1x1NkM0Mlx1OERFRlx1NUY4NFx1NEVFNSBgL2FwaWAgXHU1RjAwXHU1OTM0XHU2NUY2XHVGRjBDXHU1QzA2XHU4QkY3XHU2QzQyXHU0RUUzXHU3NDA2XHU1MjMwXHU3NkVFXHU2ODA3XHU2NzBEXHU1MkExXHU1NjY4XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTAwMCcsIC8vIFx1NzZFRVx1NjgwN1x1NjcwRFx1NTJBMVx1NTY2OFx1NzY4NFx1NTczMFx1NTc0MFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgICAgICAgICAgICAgICAgLy8gXHU4QkJFXHU3RjZFIGBjaGFuZ2VPcmlnaW5gIFx1NEUzQSB0cnVlIFx1NjVGNlx1RkYwQ1x1NUMwNlx1OEJGN1x1NkM0Mlx1NTkzNFx1NEUyRFx1NzY4NCBIb3N0IFx1NjUzOVx1NEUzQVx1NzZFRVx1NjgwN1x1NjcwRFx1NTJBMVx1NTY2OFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJykgLy8gXHU1M0JCXHU5NjY0XHU4QkY3XHU2QzQyXHU4REVGXHU1Rjg0XHU0RTJEXHU3Njg0IGAvYXBpYFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbHVnaW5zOiBbdnVlKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0L2NsaWVudCcsXHJcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgbWFuaWZlc3Q6IHRydWUsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiAnc3JjL2VudHJ5LWNsaWVudC50cycsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVEsU0FBUyxvQkFBb0I7QUFDbFMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUNmLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
