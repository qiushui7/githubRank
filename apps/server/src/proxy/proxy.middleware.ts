import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'http://49.232.63.254:9000',
    changeOrigin: true,
    pathRewrite: {
      '^/service': '', // 移除 /service 前缀
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/service')) {
      console.log(req.cookies);
      return this.proxy(req, res, next);
    }
    next();
  }
}
