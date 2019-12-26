import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes, { PrivateRoute, PublicRoute } from './routes';
import { generateNodeKey } from '../../../framework/generators/string-generator';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NoAccessPage from '../features/system/no-access/no-access.page';

const IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const SwitchWrapper = (a: any) => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_USER_LOGGED_IN);
  return (
    <Switch>
      {routes.publicRoutes.map((route: PublicRoute) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={generateNodeKey(route.path)} />
      ))}
      {routes.privateRoutes.map((route: PrivateRoute) => {
        if (isLoggedIn) {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              component={route.component}
              key={generateNodeKey(route.path)}
            />
          );
        } else {
          return <NoAccessPage key={generateNodeKey(route.path)} />;
        }
      })}
      <Route component={routes.notFound.component} />
    </Switch>
  );
};
