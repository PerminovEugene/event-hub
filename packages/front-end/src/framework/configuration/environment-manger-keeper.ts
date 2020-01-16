import { EnvironmentManager } from './environment-manager';

let currentEnvManager: EnvironmentManager;

export const saveEnvManager = (mananger: EnvironmentManager) => {
  currentEnvManager = mananger;
};

export const getEnvManager = (): EnvironmentManager => {
  return currentEnvManager;
};
