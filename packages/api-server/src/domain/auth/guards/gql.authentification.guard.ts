import { isUserHasRights } from '@calendar/shared';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRouteInfo } from '../../../decorators/resolvers/roles.decorator';
import { getRequest, getResponse } from './gql.guard-methods';

@Injectable()
export class GqlAuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const isAuthenticated = request.isAuthenticated();

    if (!isAuthenticated) {
      // cookies are obsolete
      const response = getResponse(context);
      response.clearCookie('user');
      response.clearCookie('connect.sid');
      return false;
    }

    return isUserHasRights({
      role: request.user.role,
      ...getRouteInfo(this.reflector, context),
    });
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }
}
