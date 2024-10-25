import { Controller, All, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SsrMiddleware } from './ssr/ssr.middleware';

@Controller()
export class AppController {
  constructor(private readonly ssrMiddleware: SsrMiddleware) {}

  @All('*')
  async handleAll(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    await this.ssrMiddleware.use(req, res, next);
  }
}
