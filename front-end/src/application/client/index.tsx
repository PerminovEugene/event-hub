import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Application } from './application';
import { clientRestoreData } from './client-restore-data';
import { ClientEnvironmentManager } from '../../framework/configuration/client-environment-manager';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import './../../framework/i18n/client';
import { getTransport } from '../../provider/transport';
import { options } from '../../provider/transport.client-options';

const manager = new ClientEnvironmentManager();
manager.loadEnv();
saveEnvManager(manager);

export class EntryPoint {
  public start = (store: any) => {
    const rootElement = document.getElementById('root');
    const client = getTransport(options);
    if (rootElement) {
      ReactDOM.hydrate(<Application store={store} client={client} />, rootElement);
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
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
entryPoint.start(store);
