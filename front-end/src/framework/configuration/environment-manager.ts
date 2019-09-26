import { config, DotenvConfigOptions } from 'dotenv';
import { Environment, SIDE, NODE_ENV } from './types';

export interface IEnvironmentManager {
  readonly loadEnv: (options?: any) => void;

  readonly isServerSide: () => boolean;
  readonly isClientSide: () => boolean;
  readonly isDevelopment: () => boolean;
}

export class EnvironmentManager implements IEnvironmentManager {
  private env: Environment;

  public loadEnv = (options: DotenvConfigOptions) => {
    const envSource = config(options);
    if (envSource.error) {
      throw envSource.error;
    }
    // TODO may be add some validations by enum?
    this.env = {
      side: envSource.parsed.SIDE as SIDE,
      nodeEnv: envSource.parsed.NODE_ENV as NODE_ENV
    };
  };

  public isServerSide = () => this.env.side === SIDE.server;
  public isClientSide = () => this.env.side === SIDE.client;

  public isDevelopment = () => this.env.nodeEnv === NODE_ENV.development;
}
