import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { AppUserModule } from './app-user/app-user.module';

// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy';
// import { LocalStrategy } from './auth/local.strategy';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: (req, res) => {
        return req;
      },
      debug: false, // TODO add configuration
      playground: true, // TODO add configuration // http://localhost:3000/graphql
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      include: [AppUserModule, AuthModule, EventModule],
    }),
    AppUserModule,
    AuthModule,
    EventModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
