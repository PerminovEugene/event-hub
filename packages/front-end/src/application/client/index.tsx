import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './application';
import { ClientEnvironmentManager } from '../../framework/configuration/client-environment-manager';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { getTransport } from '../../provider/transport';
import { getOptions } from '../../provider/transport.client-options';
import { ClientRouter } from './navigation/client-router';

const manager = new ClientEnvironmentManager();
manager.loadEnv();
saveEnvManager(manager);

export class EntryPoint {
  public start = () => {
    const rootElement = document.getElementById('root');
    const client = getTransport(getOptions());
    if (rootElement) {
      ReactDOM.hydrate(
        <Application client={client}>
          <ClientRouter />
        </Application>,
        rootElement,
      );
    }
  };
}

const entryPoint = new EntryPoint();

entryPoint.start();
