import { Module } from '@nestjs/common';
import { AppUserResolver } from './app-user.resolver';
import { Connection, Repository } from 'typeorm';
import { AppUser } from './app-user.entity';
import { AppUserService } from './app-user.service';
import { DatabaseModule } from '../database/database.module';
@Module({
  // imports: [
  //   GraphQLModule.forRoot({
  //     debug: false, // TODO add configuration
  //     playground: true, // TODO add configuration // http://localhost:3000/graphql
  //     typePaths: ['./**/*.graphql'],
  //     definitions: {
  //       path: join(process.cwd(), 'src/user/graphql.ts'),
  //       outputAs: 'class',
  //     },
  //     include: [UserResolver],
  //   }),
  // ],
  // controllers: [AppController],
  // providers: [AppService],
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'APP_USER_REPOSITORY', // TODO
      useFactory: (connection: Connection) => connection.getRepository(AppUser),
      inject: ['DATABASE_CONNECTION'],
    },
    AppUserService,
    AppUserResolver,
  ],
})
export class AppUserModule {}
