import { SIDE, NODE_ENV } from './types';
import { EnvironmentManager } from './environment-manager';

export class ClientEnvironmentManager extends EnvironmentManager {
  public loadEnv = () => {
    this.env = {
      side: process.env.SIDE as SIDE,
      nodeEnv: process.env.NODE_ENV as NODE_ENV
    };
  };
}