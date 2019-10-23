import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false, // TODO add configuration
      playground: true, // TODO add configuration // http://localhost:3000/graphql
      typePaths: ['./**/*.graphql'],
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [AppResolver],
})
export class AppModule {}
