import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { getCorsOptions } from './../../config/cors';
import { EnvField, getConfigService } from './../../config/environment/service';
import { AllExceptionsFilter } from './../../exceptions-filters/all-exceptions.filter';

export class AppBuilder {
  protected app: INestApplication;
  protected moduleOptions: any;

  constructor(moduleOptions: any) {
    this.moduleOptions = moduleOptions;
  }

  public reset = async () => {
    this.app = await NestFactory.create(this.moduleOptions);
  };

  public buildCors = () => {
    this.app.enableCors(getCorsOptions());
  };

  public buildCookie = () => {
    this.app.use(cookieParser());
  };

  public buildSession = () => {
    this.app.use(
      session({
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
  };

  public buildPassport = () => {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  };

  public buildGlobalFilters = () => {
    this.app.useGlobalFilters(new AllExceptionsFilter());
  };

  public getApp = () => {
    return this.app;
  };
}
