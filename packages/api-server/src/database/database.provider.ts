import { ConnectionOptions, createConnection } from 'typeorm';
import { EnvField, getConfigService } from './../config/environment/service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return await createConnection(getConnectionOptions());
    },
  },
];

export const getConnectionOptions = (): ConnectionOptions => {
  const configService = getConfigService();
  return {
    type: 'postgres',
    host: 'localhost',
    port: parseInt(configService.get(EnvField.DB_PORT)),
    username: configService.get(EnvField.DB_USERNAME),
    password: configService.get(EnvField.DB_PASSWORD),
    database: configService.get(EnvField.DB_NAME),
    synchronize: configService.get(EnvField.DB_SYNC) === 'true',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  };
};
