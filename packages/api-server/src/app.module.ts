import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppUserModule } from './app-user/app-user.module';
import { AuthModule } from './auth/auth.module';
import { getGraphqlConfig } from './config/app/graphql.config';
import {
  // ConfigService, configService
  getConfigService,
} from './config/environment/service';
import { EventModule } from './event/event.module';

const configServiceFactory = {
  provide: 'CONFIG_SERVICE',
  useFactory: () => {
    return getConfigService();
  },
};

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => getGraphqlConfig(),
    }),
    AppUserModule,
    AuthModule,
    EventModule,
  ],
  providers: [
    // {
    //   provide: ConfigService,
    //   useValue: configService,
    // },
    configServiceFactory,
  ],
})
export class AppModule {}
