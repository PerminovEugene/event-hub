import { EnvironmentManager } from './environment-manager';
import { DotenvConfigOptions, config } from 'dotenv';
import { NODE_ENV, SIDE } from './types';

export class ServerEnvironmentManager extends EnvironmentManager {
  public loadEnv = (options: DotenvConfigOptions) => {
    const envSource = config(options);
    if (envSource.error) {
      throw envSource.error;
    }
    // TODO may be add some validations by enum?
    this.env = {
      side: envSource.parsed.SIDE as SIDE,
      nodeEnv: envSource.parsed.NODE_ENV as NODE_ENV,
    };
  };

  public loadEnvAsync = async (options: DotenvConfigOptions) => {
    return new Promise((resolve, reject) => {
      const envSource = config(options);
      if (envSource.error) {
        throw envSource.error;
      }
      // TODO may be add some validations by enum?
      this.env = {
        side: envSource.parsed.SIDE as SIDE,
        nodeEnv: envSource.parsed.NODE_ENV as NODE_ENV,
      };

      // TODO -_- you know what to do
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
}
