import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { getCorsOptions } from './config/cors';
import {
  EnvField,
  getConfigService,
  initConfigService,
} from './config/environment/service';
import { AllExceptionsFilter } from './exceptions-filters/all-exceptions.filter';

async function bootstrap() {
  initConfigService();

  const app = await NestFactory.create(AppModule);
  app.enableCors(getCorsOptions());
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      // store: new RedisStore({client: redisClient}),
      secret: getConfigService().get(EnvField.COOKIE_SECRET),
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

  await app.listen(getConfigService().get(EnvField.PORT));
}
bootstrap();
