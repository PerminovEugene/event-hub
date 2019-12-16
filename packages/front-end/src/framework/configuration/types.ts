export enum NODE_ENV {
  development = 'development',
  test = 'test',
  production = 'production'
}

export enum SIDE {
  server = 'server',
  client = 'client'
}

export type Environment = {
  side: SIDE;
  nodeEnv: NODE_ENV;
};
