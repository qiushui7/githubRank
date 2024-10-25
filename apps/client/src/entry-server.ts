import { createApp } from './main'
import { createVueRouter } from './router'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const app = createApp()
  
  const router = createVueRouter('server')

  app.use(router)

  // 设置服务器端路由位置
  await router.push(url)
  // 等待路由解析完成
  await router.isReady()
  console.log(url,app);
  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html, ctx }
}
