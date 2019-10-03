import * as React from 'react';
import { PagePath } from './pathes';
import Root from '../pages/root';
import NotFound from '../pages/not-found/not-found.component';

type Route = {
  component: React.ComponentType;
  path: PagePath;
};

enum UserRole { //TODO mock, later should be in core
  guest = 'guest',
  authorised = 'authorised',
  admin = 'admin',
}

export type PrivateRoute =
  | Route
  | {
      accessRights: Array<UserRole>; // TODO
    };

type NotFoundRoute = {
  component: React.ComponentType;
};

export type PublicRoute = Route;

type Routes = {
  publicRoutes: Array<PublicRoute>;
  privateRoutes: Array<PrivateRoute>;
  notFound: NotFoundRoute;
};

const routes: Routes = {
  publicRoutes: [
    {
      component: Root,
      path: PagePath.root,
    },
  ],
  privateRoutes: [],
  notFound: {
    component: NotFound,
  },
};
export default routes;
