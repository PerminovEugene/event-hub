import { Action, Resource } from '@event-hub/shared';
import { PagePath } from './pathes';

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
export const eventRoute: Route = {
  path: PagePath.event,
  action: Action.read,
  resource: Resource.event,
};
export const createEventRoute: Route = {
  path: PagePath.createEvent,
  action: Action.create,
  resource: Resource.event,
};
export const editEventRoute: Route = {
  path: PagePath.editEvent,
  action: Action.update,
  resource: Resource.event,
};
