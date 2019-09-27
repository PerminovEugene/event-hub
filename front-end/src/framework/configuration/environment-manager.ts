import { Environment, SIDE, NODE_ENV } from './types';

export interface IEnvironmentManager {
  readonly loadEnv: (options?: any) => void;

  readonly isServerSide: () => boolean;
  readonly isClientSide: () => boolean;
  readonly isDevelopment: () => boolean;
}

export class EnvironmentManager implements IEnvironmentManager {
  protected env: Environment;

  public loadEnv = (options: any) => {};

  public isServerSide = () => this.env.side === SIDE.server;
  public isClientSide = () => this.env.side === SIDE.client;

  public isDevelopment = () => this.env.nodeEnv === NODE_ENV.development;
}
