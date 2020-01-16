import { EnvironmentManager } from './environment-manager';
import { DotenvConfigOptions, config } from 'dotenv';

export class ServerEnvironmentManager extends EnvironmentManager {
  public loadEnv = (options: DotenvConfigOptions) => {
    const envSource = config(options);
    if (envSource.error) {
      throw envSource.error;
    }
    console.log(envSource);
    this.fillEnv(envSource.parsed);
  };

  public loadEnvAsync = async (options: DotenvConfigOptions) => {
    return new Promise((resolve, reject) => {
      this.loadEnv(options);

      // TODO -_- you know what to do
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
}
