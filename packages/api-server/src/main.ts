import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions-filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import * as passport from 'passport';
import { corsOptions } from './config/cors';
import { configService, EnvField } from './config/environment/service';

import { test } from '@calendar/shared/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.warn(test());
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      // store: new RedisStore({client: redisClient}),
      secret: configService.get(EnvField.COOKIE_SECRET),
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: false,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.get(EnvField.PORT));
}
bootstrap();
