import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createServer } from 'vite';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class SsrMiddleware implements NestMiddleware {
  private vite: any;
  private isProd = process.env.NODE_ENV === 'production';
  private distPath = join(__dirname, '..', '..', '..', 'client', 'dist');
  private srcPath = join(__dirname, '..', '..', '..', 'client');

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const url = req.originalUrl;
      let template: string;
      let render: (url: string) => Promise<{ html: string; ctx: any }>;

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
        template = readFileSync(join(this.distPath, 'client', 'index.html'), 'utf-8');
        render = require(join(this.distPath, 'server', 'entry-server.js')).render;
      }

      const { html: appHtml, ctx } = await render(url);
    
      
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!this.isProd && this.vite) {
        this.vite.ssrFixStacktrace(e);
      }
      console.error(e);
      next(e);
    }
  }
}
