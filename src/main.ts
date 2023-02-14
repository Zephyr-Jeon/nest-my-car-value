import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Move middlewares to app.module since main.ts does not run in testing environment
  // const cookieSession = require('cookie-session');
  // app.use(
  //   cookieSession({
  //     keys: ['asdf'],
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );

  await app.listen(3000);
}

bootstrap();
