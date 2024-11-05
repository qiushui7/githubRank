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
import { i18n } from './utils/i18n';
export function createApp() {
  const app = createSSRApp(App);
  const head = createHead();
  const preloadStore = createPreloadStore();

  app.use(head);
  app.use(i18n);
  app.provide('preloadStore', preloadStore);
  // 使用 lazyLoad 指令
  app.directive('lazy', lazyLoad);
  app.config.globalProperties.$i18n.locale = 'en';
  return { app, preloadStore, head };
}
