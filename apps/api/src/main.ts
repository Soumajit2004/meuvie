import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { TransformInterceptor } from 'src/utils/transform.interseptor';
import csrfInstance from './utils/csrf';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();

  const { doubleCsrfProtection } = csrfInstance(configService);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());

  app.use(doubleCsrfProtection);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
