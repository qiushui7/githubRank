import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createServer as createViteServer } from 'vite';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      root: join(__dirname, '..', '..', 'client'),
    });

    app.use(vite.middlewares);
  } else {
    app.useStaticAssets(join(__dirname, '..', '..', 'client', 'dist', 'client'), { prefix: '/' });
  }

  await app.listen(4777);
}
bootstrap();
