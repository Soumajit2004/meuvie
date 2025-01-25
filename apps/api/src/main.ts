import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interseptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
