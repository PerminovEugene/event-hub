import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
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
