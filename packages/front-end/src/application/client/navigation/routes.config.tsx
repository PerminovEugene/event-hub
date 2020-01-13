import * as React from 'react';
import { PagePath } from './pathes';
import Calendar from '../features/domain/calendar/calendar.page';
import NotFound from '../features/system/not-found/not-found.page';
import Registration from '../features/auth/registration/registration.page';
import Login from '../features/auth/login/login.page';
import CreateEventPage from '../features/domain/event-managment/create-event/create-event.page';
import { Action, Resource } from '@calendar/shared';
import Dashboard from '../layout/dashboard/dashboard.component';
import { allEventsRoute, createEventRoute, Route } from './routes';

export type ViewRoute = Route & {
  component: React.ComponentType;
  exact?: boolean;
  path: PagePath;
};

export type LayoutRoutes = {
  routes: Array<ViewRoute>;
  layoutComponent: React.ComponentType;
  layoutName: string;
};

type NotFoundRoute = {
  component: React.ComponentType;
};

export type Routes = {
  withLayout: Array<LayoutRoutes>;
  noLayout: Array<ViewRoute>;
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
          exact: true,
          ...allEventsRoute,
        },
        {
          component: CreateEventPage,
          ...createEventRoute,
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
