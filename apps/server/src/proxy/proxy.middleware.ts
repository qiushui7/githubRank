import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  private target = this.configService.get('SERVICE_URL');
  private proxy = createProxyMiddleware({
    target: this.target,
    changeOrigin: true,
    pathRewrite: {
      '^/service': '', // 移除 /service 前缀
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/service')) {
      return this.proxy(req, res, next);
    }
    next();
  }
}
