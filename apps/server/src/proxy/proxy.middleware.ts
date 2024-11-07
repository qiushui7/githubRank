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
    on: {
      proxyReq: (proxyReq, req: Request & { body: any }, res) => {
        if (req.method === 'POST' && req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      error: (err, req, res) => {
        console.error('Proxy Error:', err);
      },
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/service')) {
      return this.proxy(req, res, next);
    }
    next();
  }
}
