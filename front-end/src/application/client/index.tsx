import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Application } from './application';
import { clientRestoreData } from './client-restore-data';
import { ClientEnvironmentManager } from '../../framework/configuration/client-environment-manager';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';

const manager = new ClientEnvironmentManager();
manager.loadEnv();
saveEnvManager(manager);

export class EntryPoint {
  public start = (store: any) => {
    const rootElement = document.getElementById('root');

    if (rootElement) {
      ReactDOM.hydrate(<Application store={store} />, rootElement);
    }
  };
}

const entryPoint = new EntryPoint();

export function reducer(state: any, action: any) {
  if (!action) {
    return state;
  }

  if (action.type === 'UPDATE_STORE') {
    return action.payload;
  }

  return state;
}

let store = createStore(
  reducer,
  clientRestoreData(),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
entryPoint.start(store);
