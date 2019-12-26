import * as React from 'react';
import { PagePath } from './pathes';
import Calendar from '../features/domain/calendar/calendar.page';
import NotFound from '../features/system/not-found/not-found.page';
import Registration from '../features/auth/registration/registration.page';
import Login from '../features/auth/login/login.page';
import CreateEventPage from '../features/domain/event-managment/create-event/create-event.page';

type Route = {
  component: React.ComponentType;
  path: PagePath;
  exact?: true;
};

enum UserRole { //TODO mock, later should be in core
  guest = 'guest',
  authorised = 'authorised',
  admin = 'admin',
}

export type PrivateRoute = Route & {
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
      component: Calendar,
      path: PagePath.root,
      exact: true,
    },
    {
      component: Registration,
      path: PagePath.registration,
    },
    {
      component: Login,
      path: PagePath.login,
    },
  ],
  privateRoutes: [
    {
      component: CreateEventPage,
      path: PagePath.createEvent,
      accessRights: [UserRole.authorised],
    },
  ],
  notFound: {
    component: NotFound,
  },
};
export default routes;
