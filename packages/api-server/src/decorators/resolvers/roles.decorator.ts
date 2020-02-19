import { Action, Resource } from '@event-hub/shared';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum MetaFields {
  routeInfo = 'routeInfo',
}

export type RouteInfo = {
  resource: Resource;
  action: Action;
};

/*
  Decorator for handling roles. Use getRouteInfo in guard
*/
export const Permission = (resource: Resource, action: Action) =>
  SetMetadata(MetaFields.routeInfo, { resource, action });

/*
  It needs for handling roles in guards
*/
export const getRouteInfo = (
  reflector: Reflector,
  context: ExecutionContext,
): RouteInfo => {
  return reflector.get<RouteInfo>(MetaFields.routeInfo, context.getHandler());
};
