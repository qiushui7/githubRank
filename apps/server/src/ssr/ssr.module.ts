import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  OnModuleInit,
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
export class SsrModule implements NestModule, OnModuleInit {
  constructor(private readonly ssrMiddleware: SsrMiddleware) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SsrMiddleware)
      .exclude(
        { path: 'api/(.*)', method: RequestMethod.ALL },
        { path: 'assets/(.*)', method: RequestMethod.ALL },
        { path: 'service/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.GET, // 只处理 GET 请求
      });
  }

  async onModuleInit() {
    // 在应用启动时清除所有 SSR 缓存
    try {
      await this.ssrMiddleware.clearCache();
      console.log('SSR cache cleared on startup');
    } catch (error) {
      console.error('Failed to clear SSR cache on startup:', error);
    }
  }
}
