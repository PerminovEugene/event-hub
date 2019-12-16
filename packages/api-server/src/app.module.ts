import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppUserModule } from './app-user/app-user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { ConfigService, configService } from './config/environment/service';
import { graphqlConfig } from './config/app/graphql.config';

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlConfig),
    AppUserModule,
    AuthModule,
    EventModule,
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: configService,
    },
  ],
})
export class AppModule {}
