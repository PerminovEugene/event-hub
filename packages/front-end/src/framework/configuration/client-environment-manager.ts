import { SIDE, NODE_ENV } from './env.types';
import { EnvironmentManager } from './environment-manager';

export class ClientEnvironmentManager extends EnvironmentManager {
  public loadEnv = () => {
    // process.env filled by webpack
    this.fillEnv({
      SIDE: process.env.SIDE,
      NODE_ENV: process.env.NODE_ENV,
      DEBUG_I18N: process.env.DEBUG_I18N,
      BACKEND_API_URL: process.env.BACKEND_API_URL,
    });
  };
}
