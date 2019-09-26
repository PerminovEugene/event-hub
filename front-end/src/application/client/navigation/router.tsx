import * as React from 'react';
import { Switch, Route, Router, StaticRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import routes from './routes';
import { PublicRoute } from './routes';
import { generateNodeKey } from '../../../framework/generators/string-generator';

const SwitchWrapper = () => (
  <Switch>
    {routes.publicRoutes.map((route: PublicRoute) => (
      <Route
        exact
        path={route.path}
        component={route.component}
        key={generateNodeKey(route.path)}
      />
    ))}
    <Route component={routes.notFound.component} />
  </Switch>
);

export const ServerRouter = () => (
  <StaticRouter>
    <SwitchWrapper />
  </StaticRouter>
);

export const ClientRouter = () => (
  <BrowserRouter>
    <SwitchWrapper />
  </BrowserRouter>
);
