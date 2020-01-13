import * as React from 'react';
import gql from 'graphql-tag';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes, { LayoutRoutes, ViewRoute } from './routes.config';
import { generateNodeKey } from '../../../framework/generators/string-generator';
import { useQuery } from '@apollo/react-hooks';
import { isUserHasRights } from '@calendar/shared';
import { AuthContext } from '../contexts/auth.context';
// import NoAccessPage from '../features/system/no-access/no-access.page';

const GET_SESSION_DATA = gql`
  query GetMyself {
    me @client {
      role
      email
      status
    }
  }
`;

export const Router = ({ routes, role }: any) => {
  return routes.map((route: ViewRoute) => {
    return isUserHasRights({ role, resource: route.resource, action: route.action }) ? (
      <Route exact={route.exact} path={route.path} component={route.component} key={generateNodeKey(route.path)} />
    ) : (
      <Redirect to="/" from={route.path} key={generateNodeKey(route.path)} />
    );
  });
};

export const SwitchWrapper = () => {
  const { loading, data } = useQuery(GET_SESSION_DATA);
  if (loading) {
    return <div>loading </div>;
  }
  const { role, email, status } = data.me;

  return (
    <AuthContext.Provider
      value={{
        user: { role, email, status },
        isLoggedIn: !!email,
      }}
    >
      <Switch>
        {/*
        We have to return array, beacuse switch doesn't understand nested components :/ 
       */}
        {Router({ routes: routes.noLayout, role: role })}
        {routes.withLayout.map((layoutRoutes: LayoutRoutes) => (
          <layoutRoutes.layoutComponent key={generateNodeKey(layoutRoutes.layoutName)}>
            <Router routes={layoutRoutes.routes} role={role} />
          </layoutRoutes.layoutComponent>
        ))}
        <Route component={routes.notFound.component} />
      </Switch>
    </AuthContext.Provider>
  );
};
