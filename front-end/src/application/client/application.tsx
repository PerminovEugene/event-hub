import * as React from 'react';
import { Provider } from 'react-redux';
import { getEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerRouter, ClientRouter } from './navigation/router';

export const Application = ({ store, ...props }: any) => (
  <Provider store={store}>
    {getEnvManager().isServerSide() && <ServerRouter {...props} />}
    {getEnvManager().isClientSide() && <ClientRouter {...props} />}
  </Provider>
);
