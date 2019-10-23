import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { AppUserModule } from './app-user/app-user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false, // TODO add configuration
      playground: true, // TODO add configuration // http://localhost:3000/graphql
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      include: [AppUserModule],
    }),
    AppUserModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [AppResolver],
})
export class AppModule {}
