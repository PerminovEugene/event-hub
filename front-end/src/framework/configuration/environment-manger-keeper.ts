import { IEnvironmentManager } from './environment-manager';

let currentEnvManager: IEnvironmentManager;

export const saveEnvManager = (mananger: IEnvironmentManager) => {
  currentEnvManager = mananger;
};

export const getEnvManager = (): IEnvironmentManager => {
  return currentEnvManager;
};
