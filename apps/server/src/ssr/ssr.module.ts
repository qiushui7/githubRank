import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SsrMiddleware } from './ssr.middleware';
import { RoutePrefetchService } from './route-prefetch.config';

@Module({
  imports: [
    HttpModule.register({
      proxy: false, // 全局禁用代理
      maxRedirects: 5,
      timeout: 5000,
    }),
  ],
  providers: [SsrMiddleware, RoutePrefetchService],
  exports: [SsrMiddleware, RoutePrefetchService],
})
export class SsrModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SsrMiddleware)
      .exclude(
        { path: 'api/(.*)', method: RequestMethod.ALL },
        { path: 'assets/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.GET, // 只处理 GET 请求
      });
  }
}
