import { initConfigService } from './src/config/environment/service';
import { getConnectionOptions } from './src/database/database.provider';

/**
 * This file required for migrations.
 * Typeorm doesn't provide possibility to setup config file path for cli or another ellegant solution
 */

initConfigService();

const options = getConnectionOptions();
const migrationsPath = 'src/database/migrations';

// why not export default
// https://github.com/typeorm/typeorm/issues/4068
export = {
  ...options,
  migrations: [`${migrationsPath}/*.ts`],
  cli: {
    migrationsDir: migrationsPath,
  },
};
