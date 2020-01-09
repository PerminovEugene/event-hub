import * as React from 'react';
import { PagePath } from './pathes';
import Calendar from '../features/domain/calendar/calendar.page';
import NotFound from '../features/system/not-found/not-found.page';
import Registration from '../features/auth/registration/registration.page';
import Login from '../features/auth/login/login.page';
import CreateEventPage from '../features/domain/event-managment/create-event/create-event.page';
import { Action, Resource } from '@calendar/shared';
import Dashboard from '../layout/dashboard/dashboard.component';

export type Route = {
  component: React.ComponentType;
  path: PagePath;
  exact?: true;

  action: Action;
  resource: Resource;
};

export type LayoutRoutes = {
  routes: Array<Route>;
  layoutComponent: React.ComponentType;
  layoutName: string;
};

type NotFoundRoute = {
  component: React.ComponentType;
};

export type Routes = {
  withLayout: Array<LayoutRoutes>;
  noLayout: Array<Route>;
  notFound: NotFoundRoute;
};

const routes: Routes = {
  withLayout: [
    {
      layoutName: 'Dashboard',
      layoutComponent: Dashboard,
      routes: [
        {
          component: Calendar,
          path: PagePath.root,
          exact: true,
          action: Action.read,
          resource: Resource.event,
        },
        {
          component: CreateEventPage,
          path: PagePath.createEvent,
          action: Action.create,
          resource: Resource.event,
        },
      ],
    },
  ],
  noLayout: [
    {
      component: Registration,
      path: PagePath.registration,
      action: Action.registration,
      resource: Resource.auth,
    },
    {
      component: Login,
      path: PagePath.login,
      action: Action.login,
      resource: Resource.auth,
    },
  ],
  notFound: {
    component: NotFound,
  },
};
export default routes;
