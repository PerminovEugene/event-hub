import {
  EnvField,
  getConfigService,
  initConfigService,
} from './config/environment/service';
import { AppBuilder } from './core/app/app.builder';
import { AppType, Director } from './core/app/app.director';
import { AppModule } from './core/app/app.module';

async function bootstrap() {
  initConfigService();

  const builder = new AppBuilder(AppModule);
  const director = new Director(builder);
  await director.make(AppType.simple);
  const app = builder.getApp();

  // const app = await NestFactory.create(AppModule);
  // app.enableCors(getCorsOptions());
  // app.use(cookieParser());
  // app.useGlobalFilters(new AllExceptionsFilter());

  // app.use(
  //   session({
  //     // store: new RedisStore({client: redisClient}),
  //     secret: getConfigService().get(EnvField.COOKIE_SECRET),
  //     resave: true,
  //     rolling: true,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 10 * 60 * 1000,
  //       httpOnly: false,
  //     },
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(getConfigService().get(EnvField.PORT));
}
bootstrap();
