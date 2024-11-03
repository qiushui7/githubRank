import { createApp } from './main';
import { createVueRouter } from './router';
import './style.css';

declare global {
  interface Window {
    __PRELOAD_STATE__?: any;
  }
}

const { app, preloadStore } = createApp();
const router = createVueRouter('client');

app.use(router);

// 如果有预加载数据，则使用它
if (window.__PRELOAD_STATE__) {
  preloadStore.setPreloadData(window.__PRELOAD_STATE__);
}

router.isReady().then(() => {
  app.mount('#app');
});
