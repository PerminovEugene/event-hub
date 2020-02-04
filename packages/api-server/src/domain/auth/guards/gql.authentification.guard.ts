import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { getRequest } from './gql.guard-methods';

@Injectable()
export class GqlAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const request = this.getRequest(ctx);
    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context);
  }
}
