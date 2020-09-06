import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';
import { Connection, createConnection } from 'typeorm';
import { asyncForEach } from '../../framework/utils/async.actions';
import { getConnectionOptions } from '../database.provider';
import { ServiceManager } from './service.manager';

type FixtureConfig = {
  service: any;
  fixtures: Array<any>;
  entitiesDirrectory: string;
};

type FixtureConfigs = Array<FixtureConfig>;

export async function loadFixtures(dbConnection: Connection): Promise<any> {
  const config: FixtureConfigs = [];

  try {
    const entitiesDirrectories = fs.readdirSync(resolve(__dirname, 'entities'));
    await asyncForEach(
      entitiesDirrectories,
      async (entitiesDirrectory: string) => {
        const file: any = yaml.safeLoad(
          fs.readFileSync(
            resolve(__dirname, `entities/${entitiesDirrectory}/fixtures.yaml`),
            'utf8',
          ),
        );
        const module = await import(
          resolve(
            __dirname,
            `entities/${entitiesDirrectory}/service.manager.ts`,
          )
        );
        const imprtedClass = Object.keys(module)[0];
        const service: ServiceManager = new module[imprtedClass](dbConnection);
        config.push({
          service,
          fixtures: file['fixtures'],
          entitiesDirrectory,
        });
      },
    );
    return config;
  } catch (e) {
    console.log('File with fixtures has error: ', e);
  }
}

/**
 * Current version doesn't support relations.
 * It will be expanded when we need ths
 */

const insertFixtures = async (config: FixtureConfigs) => {
  await asyncForEach(config, async (configItem: any) => {
    await asyncForEach(configItem.fixtures, async (fixture: any) => {
      try {
        await configItem.service.insert(fixture);
      } catch (e) {
        console.log(
          'Fixture ',
          fixture,
          ' from dirrectory ',
          configItem.entitiesDirrectory,
          ' inserting was failed',
        );
        console.log('error:', e.sourceError || e);
        throw e;
      }
    });
  });
};

const init = async () => {
  console.log('Fixtures inserting is started');
  const connection = await createConnection(getConnectionOptions());
  console.log('DB connection was created');
  try {
    const config = await loadFixtures(connection);
    console.log('Fixtures were loaded');
    await insertFixtures(config);
    console.log('Fixtures were created');
  } catch (e) {
    console.log('Fixtures creation was failed');
  }
};

init();
