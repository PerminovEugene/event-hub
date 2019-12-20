import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Normalize } from 'styled-normalize';
import GlobalStyles from './styles/global';
import theme from './styles/theme';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

export interface ApplicationProps {
  store: any;
  client: any;
  url?: string;
  context?: any;
}

export default class Application extends React.Component<ApplicationProps, {}> {
  render() {
    const { client, children } = this.props;
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ThemeProvider theme={theme}>
            <Normalize />
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
