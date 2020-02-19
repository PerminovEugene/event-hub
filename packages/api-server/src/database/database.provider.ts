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
  console.log({
    type: 'postgres',
    host: configService.get(EnvField.DB_HOST),
    port: parseInt(configService.get(EnvField.DB_PORT)),
    username: configService.get(EnvField.DB_USERNAME),
    password: configService.get(EnvField.DB_PASSWORD),
    database: configService.get(EnvField.DB_NAME),
    synchronize: configService.get(EnvField.DB_SYNC),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    dropSchema: configService.get(EnvField.DB_DROP_SCHEMA),
    logging: configService.get(EnvField.DB_LOGGING),
  });
  return {
    type: 'postgres',
    host: configService.get(EnvField.DB_HOST),
    port: parseInt(configService.get(EnvField.DB_PORT)),
    username: configService.get(EnvField.DB_USERNAME),
    password: configService.get(EnvField.DB_PASSWORD),
    database: configService.get(EnvField.DB_NAME),
    synchronize: configService.get(EnvField.DB_SYNC),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    dropSchema: configService.get(EnvField.DB_DROP_SCHEMA),
    logging: configService.get(EnvField.DB_LOGGING),
  };
};
