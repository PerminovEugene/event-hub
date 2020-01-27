import { GqlModuleOptions } from '@nestjs/graphql';
import { TagModule } from '../../domain/tag/tag.module';
import { AppUserModule } from './../../domain/app-user/app-user.module';
import { AuthModule } from './../../domain/auth/auth.module';
import { EventModule } from './../../domain/event/event.module';
import { getCorsOptions } from './../cors';

export const getGraphqlConfig = (): GqlModuleOptions => ({
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
  include: [AppUserModule, AuthModule, EventModule, TagModule],
  cors: getCorsOptions(),
});
