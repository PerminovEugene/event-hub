import { GqlModuleOptions } from '@nestjs/graphql';
import { getCorsOptions } from './../cors';

export const getGraphqlConfig = (): GqlModuleOptions => {
  return {
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

    // TODO if include option is required, we have to refactor AuthModule.forRoot(authConfig) as any, it doesn't work now.
    // II suppose because it should be the same instance as in app module
    // include: [
    //   AppUserModule,
    //   AuthModule.forRoot(authConfig) as any,
    //   EventModule,
    //   TagModule,
    // ],
    cors: getCorsOptions(),
  };
};
