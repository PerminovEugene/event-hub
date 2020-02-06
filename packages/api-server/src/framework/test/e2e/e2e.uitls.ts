import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Connection, getConnection } from 'typeorm';
import { getGraphqlConfig } from '../../../config/app/graphql.config';
import { initConfigService } from '../../../config/environment/service';
import { AppType, Director } from '../../../core/app/app.director';
import { TestE2eAppBuilder } from '../../../core/app/teste2e.app.builder';

type E2eInitSpecRequiredOptions = {
  importedModules: Array<any>;
};

type E2eInitSpecOptionalOptions = {
  setTimeout?: number;
  envFilePrefix?: string;
  appType?: AppType.testE2e;
};

export type E2eInitSpecOptons = E2eInitSpecRequiredOptions &
  E2eInitSpecOptionalOptions;

const defaultOptions: E2eInitSpecOptionalOptions = {
  setTimeout: 300000,
  envFilePrefix: 'test-e2e',
  appType: AppType.testE2e,
};

export const e2eSpecInitalizer = async (
  options: E2eInitSpecOptons,
): Promise<{ app: INestApplication; connection: Connection }> => {
  const mergedOptions = { ...defaultOptions, ...options };
  jest.setTimeout(mergedOptions.setTimeout);
  initConfigService({ filePrefix: mergedOptions.envFilePrefix });

  const builder = new TestE2eAppBuilder({
    imports: [
      ...mergedOptions.importedModules,
      GraphQLModule.forRootAsync({
        useFactory: () => getGraphqlConfig(),
      }),
    ],
  });
  const director = new Director(builder);
  await director.make(mergedOptions.appType);
  const app = builder.getApp();
  await app.init();
  return {
    connection: getConnection('default'),
    app,
  };
};
