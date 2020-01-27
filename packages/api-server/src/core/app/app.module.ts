import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { getGraphqlConfig } from './../../config/app/graphql.config';
import { getConfigService } from './../../config/environment/service';
import { AppUserModule } from './../../domain/app-user/app-user.module';
import { AuthModule } from './../../domain/auth/auth.module';
import { EventModule } from './../../domain/event/event.module';
import { TagModule } from './../../domain/tag/tag.module';

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
    TagModule,
    EventModule,
  ],
  providers: [configServiceFactory],
})
export class AppModule {}
