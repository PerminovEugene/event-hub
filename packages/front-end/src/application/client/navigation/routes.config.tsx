import * as React from 'react';
import { PagePath } from './pathes';
import NotFound from '../features/system/not-found/not-found.page';
import Registration from '../features/auth/registration/registration.page';
import Login from '../features/auth/login/login.page';
import { Action, Resource } from '@calendar/shared';
import Dashboard from '../layout/dashboard/dashboard.component';
import { allEventsRoute, eventRoute, createEventRoute, editEventRoute, Route } from './routes';

import AllEventsPage from '../features/domain/event-managment/all-events/all-events.page';
import EventPage from '../features/domain/event-managment/read-event/read-event.page';
import CreateEventPage from '../features/domain/event-managment/create-event/create-event.page';
import EditEventPage from '../features/domain/event-managment/edit-event/edit.event.page';

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
          component: AllEventsPage,
          exact: true,
          ...allEventsRoute,
        },
        {
          component: EventPage,
          ...eventRoute,
        },
        {
          component: CreateEventPage,
          ...createEventRoute,
        },
        {
          component: EditEventPage,
          ...editEventRoute,
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
