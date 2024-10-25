import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { SsrMiddleware } from './ssr/ssr.middleware';

@Module({
  controllers: [AppController],
  providers: [SsrMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SsrMiddleware).forRoutes('*');
  }
}
