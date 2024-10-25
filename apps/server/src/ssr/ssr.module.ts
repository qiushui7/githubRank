import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SsrMiddleware } from './ssr.middleware';

@Module({})
export class SsrModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SsrMiddleware).forRoutes('*');
  }
}
