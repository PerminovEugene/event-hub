import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import { PublicRoute } from './routes';
import { generateNodeKey } from '../../../framework/generators/string-generator';

export const SwitchWrapper = (a: any) => {
  return (
    <Switch>
      {routes.publicRoutes.map((route: PublicRoute) => (
        <Route exact={route.exact} path={route.path} component={route.component} key={generateNodeKey(route.path)} />
      ))}
      <Route component={routes.notFound.component} />
    </Switch>
  );
};
