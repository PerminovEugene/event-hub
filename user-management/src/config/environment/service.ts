import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { resolve } from 'path';

export type EnvConfig = Record<string, string>;

export enum EnvField {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  FRONT_END_DOMAIN = 'FRONT_END_DOMAIN',
  COOKIE_SECRET = 'COOKIE_SECRET',
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: EnvField): string {
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
      FRONT_END_DOMAIN: Joi.string().required(),
      COOKIE_SECRET: Joi.string().required(),
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
export const configService = new ConfigService(
  resolve(__dirname, `../../../env/.env`),
);
