import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createServer } from 'vite';
import { join } from 'path';
import { readFileSync } from 'fs';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { RoutePrefetchService } from './route-prefetch.config';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  private vite: any;
  private isProd = process.env.NODE_ENV === 'production';
  private distPath = join(__dirname, '..', '..', '..', 'client', 'dist');
  private srcPath = join(__dirname, '..', '..', '..', 'client');

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly routePrefetchService: RoutePrefetchService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;
    const cacheKey = `ssr:${url}`;

    // 只在生产环境使用缓存
    if (this.isProd) {
      // 尝试从缓存中获取页面
      const cachedPage = await this.cacheManager.get<string>(cacheKey);
      if (cachedPage) {
        console.log('缓存命中');
        return res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .end(cachedPage);
      }
    }

    // 如果请求路径以 /api 开头，直接调用 next() 跳过 SSR 处理
    if (req.path.startsWith('/api')) {
      return next();
    }

    try {
      let template: string;
      let render: (
        url: string,
        preloadData: any,
      ) => Promise<{
        html: string;
        ctx: any;
        headTags: string;
        htmlAttrs: string;
        bodyAttrs: string;
      }>;

      if (!this.isProd) {
        if (!this.vite) {
          this.vite = await createServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: this.srcPath,
          });
        }

        template = readFileSync(join(this.srcPath, 'index.html'), 'utf-8');
        template = await this.vite.transformIndexHtml(url, template);
        render = (await this.vite.ssrLoadModule('/src/entry-server.ts')).render;
      } else {
        template = readFileSync(
          join(this.distPath, 'client', 'index.html'),
          'utf-8',
        );
        render = require(
          join(this.distPath, 'server', 'entry-server.cjs'),
        ).render;
      }

      try {
        const prefetchData =
          await this.routePrefetchService.getPrefetchData(url);
        const {
          html: appHtml,
          ctx,
          headTags,
          htmlAttrs,
          bodyAttrs,
        } = await render(url, prefetchData);
        const preloadStateScript = `<script>window.__PRELOAD_STATE__ = ${JSON.stringify(ctx.preloadState)}</script>`;
        const html = template
          .replace('<html>', `<html ${htmlAttrs}>`)
          .replace('<body>', `<body ${bodyAttrs}>`)
          .replace('</head>', `${headTags}</head>`)
          .replace(`<!--ssr-outlet-->`, appHtml)
          .replace(`<!--preload-state-->`, preloadStateScript);
        const renderedPage = html;
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);

        // 只在生产环境缓存页面
        if (this.isProd) {
          await this.cacheManager.set(
            cacheKey,
            renderedPage,
            60 * 60 * 24 * 1000,
          );
        }
      } catch (renderError) {
        console.error('SSR Render Error:', renderError);
        // 降级为 CSR
        const html = template.replace(`<!--ssr-outlet-->`, '');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e) {
      if (!this.isProd && this.vite) {
        this.vite.ssrFixStacktrace(e);
      }
      console.error('SSR Middleware Error:', e);
      next(e);
    }
  }
}
