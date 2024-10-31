import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SsrMiddleware } from './ssr/ssr.middleware';
import { AuthModule } from './auth/auth.module';
import { RedisCacheModule } from './cache/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [SsrMiddleware],
})
export class AppModule implements NestModule {
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
