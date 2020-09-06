import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './application';
import { ClientEnvironmentManager } from '../../framework/configuration/client-environment-manager';
import { saveEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { getTransport } from '../../provider/transport';
import { getOptions } from '../../provider/transport.client-options';
import { ClientRouter } from './navigation/client-router';
import { useSSR } from 'react-i18next';
import { initI18n } from './../../framework/managers/i18n.manager';

const manager = new ClientEnvironmentManager();
manager.loadEnv();
saveEnvManager(manager);

export function InitSSR({ initialI18nStore, initialLanguage, client }: any) {
  useSSR(initialI18nStore, initialLanguage);
  return (
    <Application client={client}>
      <ClientRouter />
    </Application>
  );
}

export class EntryPoint {
  public start = async () => {
    await initI18n();
    const rootElement = document.getElementById('root');
    const client = getTransport(getOptions());
    if (rootElement) {
      const initialI18nStore = (window as any).initialI18nStore;
      const initialLanguage = (window as any).initialLanguage;

      ReactDOM.hydrate(
        <InitSSR client={client} initialI18nStore={initialI18nStore} initialLanguage={initialLanguage} />,
        rootElement,
      );
    }
  };
}

const entryPoint = new EntryPoint();

entryPoint.start();
