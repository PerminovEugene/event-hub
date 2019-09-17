import * as React from 'react';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import routes from './routes';
import { PublicRoute } from './routes';

const customHistory = createBrowserHistory();

const RouterComponent = () => (
  <Router history={customHistory}>
    <Switch>
      {routes.publicRoutes.map((route: PublicRoute) => (
        <Route exact path={route.path} component={route.component} />
      ))}
      <Route component={routes.notFound.component} />
    </Switch>
  </Router>
);
export default RouterComponent;
