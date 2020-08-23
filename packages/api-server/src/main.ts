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

  await app.listen(getConfigService().get(EnvField.PORT));
}
bootstrap();

process.on('uncaughtError' as any, (e) => {
  console.log(e)
})