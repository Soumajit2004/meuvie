import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as process from 'process';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interseptor';
import csrfInstance from './utils/csrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { doubleCsrfProtection } = csrfInstance;

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());

  app.use(doubleCsrfProtection);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
