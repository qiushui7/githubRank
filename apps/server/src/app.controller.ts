import { Controller, All, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProxyMiddleware } from './proxy/proxy.middleware';

@Controller()
export class AppController {
  constructor(private readonly proxyMiddleware: ProxyMiddleware) {}

  @All('service/*')
  async handleAll(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    await this.proxyMiddleware.use(req, res, next);
  }
}
