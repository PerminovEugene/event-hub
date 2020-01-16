import { Environment, SIDE, NODE_ENV } from './env.types';

export abstract class EnvironmentManager {
  protected env: Environment;

  public abstract loadEnv(options: any): void;

  public getSide = () => this.env.side;
  public getNodeEnv = () => this.env.nodeEnv;
  public getBackendApiUrl = () => this.env.backendApiUrl;
  public getDebugI18n = () => this.env.debugI18n;

  public isServerSide = () => this.env.side === SIDE.server;
  public isClientSide = () => this.env.side === SIDE.client;

  public isDevelopment = () => this.env.nodeEnv === NODE_ENV.development;

  protected fillEnv = (env: any) => {
    this.env = {
      side: env.SIDE as SIDE,
      nodeEnv: env.NODE_ENV as NODE_ENV,
      debugI18n: env.DEBUG_I18N === 'true',
      backendApiUrl: env.BACKEND_API_URL,
    };
  };
}
