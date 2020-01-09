import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes, { LayoutRoutes, Route as RouteConfig } from './routes';
import { generateNodeKey } from '../../../framework/generators/string-generator';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isUserHasRights } from '@calendar/shared';
// import NoAccessPage from '../features/system/no-access/no-access.page';

const GET_SESSION_DATA = gql`
  query GetMyself {
    me @client {
      role
    }
  }
`;

export const RouterD = ({ routes, role }: any) => {
  return routes.map((route: RouteConfig) => {
    return isUserHasRights({ role, resource: route.resource, action: route.action }) ? (
      <Route exact={route.exact} path={route.path} component={route.component} key={generateNodeKey(route.path)} />
    ) : (
      <Redirect to="/" from={route.path} key={generateNodeKey(route.path)} />
    );
  });
};

export const SwitchWrapper = () => {
  const { data } = useQuery(GET_SESSION_DATA);
  console.log('Rerender switch', data);
  const role = 'guest';
  return (
    <Switch>
      {/*
        We have to return array, beacuse switch doesn't understand nested components :/ 
       */}
      {RouterD({ routes: routes.noLayout, role: role })}
      {routes.withLayout.map((layoutRoutes: LayoutRoutes) => (
        <layoutRoutes.layoutComponent key={generateNodeKey(layoutRoutes.layoutName)}>
          <RouterD routes={layoutRoutes.routes} role={role} />
        </layoutRoutes.layoutComponent>
      ))}
      <Route component={routes.notFound.component} />
    </Switch>
  );
};
