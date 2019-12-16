import * as React from 'react';
import { Provider } from 'react-redux';
import { getEnvManager } from '../../framework/configuration/environment-manger-keeper';
import { ServerRouter } from './navigation/router';
import { ClientRouter } from './navigation/router';
import { Normalize } from 'styled-normalize';
import GlobalStyles from './styles/global';
import { ThemeProvider } from '@material-ui/styles';
import theme from './styles/theme';
import { ApolloProvider } from '@apollo/react-hooks';

export interface ApplicationProps {
  store: any;
  client: any;
  url?: string;
  context?: any;
}

export const Application = ({ store, url, context, client }: ApplicationProps) => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Normalize />
        <GlobalStyles />
        {getEnvManager().isServerSide() && <ServerRouter url={url} context={context} />}
        {getEnvManager().isClientSide() && <ClientRouter />}
      </Provider>
    </ApolloProvider>
  </ThemeProvider>
);
