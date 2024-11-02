import { createApp } from './main';
import { createVueRouter } from './router';
import { renderToString } from 'vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';
import { PreloadState } from './utils/preload';

export async function render(url: string, preloadData: any) {
  const { app, preloadStore, head } = createApp();

  const router = createVueRouter('server');

  app.use(router);

  // 设置服务器端路由位置
  await router.push(url);
  // 等待路由解析完成
  await router.isReady();

  preloadStore.setPreloadData(preloadData);

  const ctx = {
    preloadState: preloadStore.state as PreloadState,
  };

  const html = await renderToString(app, ctx);

  const { headTags, htmlAttrs, bodyAttrs } = await renderSSRHead(head);

  return { html, ctx, headTags, htmlAttrs, bodyAttrs };
}
