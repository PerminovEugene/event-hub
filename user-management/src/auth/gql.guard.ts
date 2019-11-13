import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class GqlAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    debugger;
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const request = this.getRequest(ctx);

    // try {
    //   if (request.session.passport.user) {
    //     return true;
    //   }
    // } catch (e) {
    //   return false;
    // }

    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    /*
          I don't know why, but passport couldn't receive username and password from graphql format, it's small hack
        */
    const req = ctx.getContext().req;
    req.query = ctx.getArgs();
    return req;
  }
}
