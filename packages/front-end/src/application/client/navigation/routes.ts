import { PagePath } from './pathes';
import { Action, Resource } from '@calendar/shared';

export type Route = {
  path: PagePath;
  action: Action;
  resource: Resource;
};

export const allEventsRoute: Route = {
  path: PagePath.root,
  action: Action.read,
  resource: Resource.event,
};
export const createEventRoute: Route = {
  path: PagePath.createEvent,
  action: Action.create,
  resource: Resource.event,
};
