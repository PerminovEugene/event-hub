import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { resolve } from 'path';

export type EnvConfig = Record<string, string>;

export enum EnvField {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  FRONT_END_DOMAIN = 'FRONT_END_DOMAIN',
  COOKIE_SECRET = 'COOKIE_SECRET',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  DB_SYNC = 'DB_SYNC',
  DB_DROP_SCHEMA = 'DB_DROP_SCHEMA',
  DB_LOGGING = 'DB_LOGGING',
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    let config: any;
    if (process.env.ENV_SOURCE) {
      console.log('CURRENT ENV SOURCE: ', process.env.ENV_SOURCE);
      console.log('Expected environment variables: ', Object.keys(EnvField));
      config = Object.keys(EnvField).reduce(
        (accumulator: any, value: string) => {
          accumulator[value] = process.env[value];
          return accumulator;
        },
        {},
      );
    } else {
      config = dotenv.parse(fs.readFileSync(filePath));
    }
    this.envConfig = this.validateInput(config);
  }

  get(key: EnvField): any {
    return this.envConfig[key];
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      COOKIE_SECRET: Joi.string().required(),

      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),

      DB_SYNC: Joi.boolean(),
      DB_DROP_SCHEMA: Joi.boolean(),
      DB_LOGGING: Joi.boolean(),

      FRONT_END_DOMAIN: Joi.string(), // It doesn't need for tests
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

const buildConfigFilePath = (filePrefix: string = '') =>
  resolve(__dirname, `../../../env/${filePrefix}.env`);

let instance: ConfigService = null;

type ConfigSericeOptions = {
  filePrefix?: string;
};

export const initConfigService = (
  options?: ConfigSericeOptions,
): ConfigService => {
  if (instance) return instance;
  instance = new ConfigService(
    resolve(buildConfigFilePath(options?.filePrefix)),
  );
  return instance;
};

export const getConfigService = (): ConfigService => {
  return instance;
};
