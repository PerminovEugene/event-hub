import * as React from 'react';
import { Provider } from 'react-redux';
import { getEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerRouter } from './navigation/router';
import { ClientRouter } from './navigation/router';

export interface ApplicationProps {
  store: any;
  url?: string;
  context?: any;
}

export const Application = ({ store, url, context }: ApplicationProps) => (
  <Provider store={store}>
    {getEnvManager().isServerSide() && <ServerRouter url={url} context={context} />}
    {getEnvManager().isClientSide() && <ClientRouter />}
  </Provider>
);
