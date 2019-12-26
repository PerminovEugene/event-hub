import { join } from 'path';
import { AppUserModule } from './../../app-user/app-user.module';
import { AuthModule } from './../../auth/auth.module';
import { EventModule } from './../../event/event.module';
import { corsOptions } from './../cors';
import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlConfig: GqlModuleOptions = {
  context: (req, res) => {
    return req;
  },
  debug: true, // TODO add configuration
  playground: true, // TODO add configuration // http://localhost:3000/graphql
  // typePaths: [`${__dirname}/src/**/*.graphql`],
  typePaths: ['./**/*.graphql'],


  // definitions: {
  //   // dist/src/../../shared
  //   // path: join(__dirname, '../../graphql.ts'),
  //   path: join(process.cwd(), 'src/graphql.ts'),
  //   outputAs: 'class',
  // },
  include: [AppUserModule, AuthModule, EventModule],
  cors: corsOptions,
};