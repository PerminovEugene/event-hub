import { join } from 'path';
import { AppUserModule } from './../../app-user/app-user.module';
import { AuthModule } from './../../auth/auth.module';
import { EventModule } from './../../event/event.module';
import { corsOptions } from './../cors';
import { GqlModuleOptions } from '@nestjs/graphql';

debugger;
console.log(join(__dirname, '../../../../shared/transport/graphql.ts'));

export const graphqlConfig: GqlModuleOptions = {
  context: (req, res) => {
    return req;
  },
  debug: false, // TODO add configuration
  playground: true, // TODO add configuration // http://localhost:3000/graphql
  typePaths: [`${__dirname}/**/*.graphql`],
  definitions: {
    // dist/src/../../shared
    path: join(__dirname, '../../../../shared/transport/graphql.ts'),
    outputAs: 'class',
  },
  include: [AppUserModule, AuthModule, EventModule],
  cors: corsOptions,
};
