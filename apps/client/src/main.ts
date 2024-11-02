declare global {
  interface Window {
    __INITIAL_STATE__?: any;
  }
}

import { createSSRApp } from 'vue';
import { createHead } from '@unhead/vue';
import App from './App.vue';
import { lazyLoad } from './utils/lazyLoad';
import { createPreloadStore } from './utils/preload';

export function createApp() {
  const app = createSSRApp(App);
  const head = createHead();
  const preloadStore = createPreloadStore();

  app.use(head);
  app.provide('preloadStore', preloadStore);
  // 使用 lazyLoad 指令
  app.directive('lazy', lazyLoad);

  return { app, preloadStore, head };
}
