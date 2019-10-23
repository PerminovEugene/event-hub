import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './user.resolver';
import { join } from 'path';

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
  providers: [UserResolver],
})
export class UserModule {}
