import { Action, Resource } from '@event-hub/shared';
import * as React from 'react';
import Login from '../features/auth/login/login.page';
import Registration from '../features/auth/registration/registration.page';
import AllEventsPage from '../features/domain/event-managment/all-events/all-events.page';
import CreateEventPage from '../features/domain/event-managment/create-event/create-event.page';
import EditEventPage from '../features/domain/event-managment/edit-event/edit.event.page';
import EventPage from '../features/domain/event-managment/read-event/read-event.page';
import NotFound from '../features/system/not-found/not-found.page';
import Dashboard from '../layout/dashboard/dashboard.component';
import { PagePath } from './pathes';
import { allEventsRoute, createEventRoute, editEventRoute, eventRoute, Route } from './routes';

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
