import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interseptor';
import csrf from './csrf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    doubleCsrfProtection,
  } = csrf;

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.use(
    session({
      secret: 'secrettokenforuser',
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
