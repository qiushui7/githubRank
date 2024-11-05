import { createApp } from './main';
import { createVueRouter } from './router';
import { renderToString } from 'vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';
import { PreloadState } from './utils/preload';

export async function render(url: string, preloadData: any, manifest: any) {
  const { app, preloadStore, head } = createApp();

  const router = createVueRouter('server');

  app.use(router);

  // 设置服务器端路由位置
  await router.push(url);
  // 等待路由解析完成
  await router.isReady();

  preloadStore.setPreloadData(preloadData);

  const ctx: { modules?: string[]; preloadState?: PreloadState } = {
    preloadState: preloadStore.state as PreloadState,
  };

  const html = await renderToString(app, ctx);

  const { headTags, htmlAttrs, bodyAttrs } = await renderSSRHead(head);

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return { html, ctx, headTags, htmlAttrs, bodyAttrs, preloadLinks };
}

/**
 * 解析需要预加载的链接
 */
function renderPreloadLinks(
  modules: undefined | string[],
  manifest: Record<string, string[]>,
): string {
  let links = '';
  const seen = new Set();
  if (modules === undefined) throw new Error();
  modules?.forEach((id) => {
    const files: any = manifest[id];
    if (files) {
      links += renderPreloadLink(files.file);
      files.css.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

/**
 * 预加载的对应的地址
 * 下面的方法只针对了 js 和 css，如果需要处理其它文件，自行添加即可
 */
function renderPreloadLink(file: string): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return '';
  }
}
